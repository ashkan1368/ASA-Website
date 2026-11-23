import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Play,
  RotateCcw,
  FileText,
  Check,
  ShieldCheck,
  History,
  UserCheck,
  Receipt,
  Star,
  MessageSquareHeart,
  Send,
  Download,
  Image as ImageIcon,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Language, CurrencyCode } from '../data/catalogData';
import {
  downloadOfficialAsaDossier,
  generateOfficialStoreReceiptDataUrl,
  downloadOfficialReceiptAsPng,
  downloadOfficialReceiptAsPdf,
  StoreReceiptLineItem,
  OfficialStoreReceiptInput,
} from '../utils/pdfDossierGenerator';
import { useLocalization } from '../i18n/LocalizationContext';

export interface ActiveTrackedOrder {
  referenceCode: string;
  residenceAddress: string;
  deliveryWindow: string;
  itemsCount: number;
  currentStageIndex: number; // 0 to 4
  createdAt: string;
  recipientName?: string;
  passThroughTotalUsd?: number;
  asaServiceFeeUsd?: number;
  personalMessageCard?: string;
  receiptItems?: StoreReceiptLineItem[];
  stewardNameFa?: string;
  stewardNameEn?: string;
}

export interface SubmittedSatisfactionReview {
  id: string;
  referenceCode: string;
  rating: number;
  highlights: string[];
  comment: string;
  createdAt: string;
  approved: boolean;
}

interface OrderTrackingModalProps {
  lang: Language;
  currency?: CurrencyCode;
  isOpen: boolean;
  onClose: () => void;
  activeOrder: ActiveTrackedOrder;
  onAdvanceStage: (nextIndex: number) => void;
  onSubmitReview?: (review: Omit<SubmittedSatisfactionReview, 'id' | 'createdAt' | 'approved'>) => void;
}

interface TimestampHistoryEntry {
  time: string;
  timeFa: string;
  event: string;
  eventFa: string;
  actor: string;
  actorFa: string;
}

interface LifecycleStage {
  id: string;
  shortLabel: string;
  shortLabelFa: string;
  title: string;
  titleFa: string;
  subtitle: string;
  subtitleFa: string;
  timestampOffset: string;
  timestampOffsetFa: string;
  stewardNote: string;
  stewardNoteFa: string;
  historyLogs: TimestampHistoryEntry[];
}

const SATISFACTION_HIGHLIGHTS = [
  {
    id: 'punctuality',
    labelFa: 'وقت‌شناسی دقیق همراه',
    labelEn: 'Punctual Arrival',
  },
  {
    id: 'receipt',
    labelFa: 'تطابق ۱۰۰٪ فاکتور رسمی',
    labelEn: '100% Store-Receipt Match',
  },
  {
    id: 'courtesy',
    labelFa: 'برخورد محترمانه با والدین',
    labelEn: 'Respectful Elder Care',
  },
  {
    id: 'freshness',
    labelFa: 'تازگی و چیدمان منظم در یخچال',
    labelEn: 'Freshness & Fridge Setup',
  },
];

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 'stage-processing',
    shortLabel: '1. Intake & Call',
    shortLabelFa: '۱. ثبت و هماهنگی',
    title: 'Order Intake & Two-Layer Tehran Confirmation',
    titleFa: 'ثبت سفارش و هماهنگی تلفنی محترمانه با منزل والدین در تهران',
    subtitle: 'Scope verified · Substitution rule locked · Recipient time confirmed',
    subtitleFa: 'بررسی دقیق سفارش · ثبت قانون جایگزینی کالا · تایید ساعت مراجعه با والدین',
    timestampOffset: '09:15 AM',
    timestampOffsetFa: '۰۹:۱۵ صبح',
    stewardNote:
      'Roxana Bakhtiari’s coordination desk has confirmed the visit window with your parents in Tehran and briefed the assigned Asa specialist.',
    stewardNoteFa:
      'واحد هماهنگی رکسانا بختیاری ضمن تماس محترمانه با منزل والدین در تهران، ساعت دقیق مراجعه و جزئیات سفارش را تایید نمود.',
    historyLogs: [
      {
        time: '09:04 AM THR',
        timeFa: '۰۹:۰۴ صبح تهران',
        event: 'Order dossier received & non-clinical scope validated.',
        eventFa: 'دریافت سفارش در مرکز عملیات تهران و تایید چارچوب غیربالینی.',
        actor: 'System Ledger',
        actorFa: 'سامانه ثبت آسا',
      },
      {
        time: '09:11 AM THR',
        timeFa: '۰۹:۱۱ صبح تهران',
        event: 'Polite confirmation call completed with recipient residence in Tehran.',
        eventFa: 'تماس تلفنی محترمانه با منزل والدین در تهران و تایید ساعت حضور.',
        actor: 'Roxana Bakhtiari (Ops Lead)',
        actorFa: 'رکسانا بختیاری (مدیر عملیات)',
      },
      {
        time: '09:15 AM THR',
        timeFa: '۰۹:۱۵ صبح تهران',
        event: 'Substitution rules locked and specialist assigned.',
        eventFa: 'ثبت نهایی قانون جایگزینی کالا و تخصیص همراه احراز هویت‌شده.',
        actor: 'Tehran Dispatch Desk',
        actorFa: 'میز اعزام تهران',
      },
    ],
  },
  {
    id: 'stage-curating',
    shortLabel: '2. Sourcing & Audit',
    shortLabelFa: '۲. تامین و فاکتور',
    title: 'Pass-Through Sourcing / Clinic & Meal Preparation',
    titleFa: 'تهیه اقلام تازه با فاکتور رسمی / آماده‌سازی بسته «آسا خوراک» یا نوبت کلینیک',
    subtitle: 'Expiry dates audited · Official store receipt photographed',
    subtitleFa: 'کنترل تاریخ تولید روز · ثبت تصویر فاکتور رسمی فروشگاه بدون حاشیه سود پنهان',
    timestampOffset: '10:30 AM',
    timestampOffsetFa: '۱۰:۳۰ صبح',
    stewardNote:
      'All requested provisions and low-sodium Asa Khoraak meals have been inspected for freshness, and official pass-through store receipts have been uploaded.',
    stewardNoteFa:
      'تمامی اقلام سوپرمارکتی و بسته‌های غذایی کم‌نمک آسا خوراک از نظر تازگی و تاریخ روز کنترل شده و تصویر فاکتور رسمی فروشگاه ثبت گردید.',
    historyLogs: [
      {
        time: '09:50 AM THR',
        timeFa: '۰۹:۵۰ صبح تهران',
        event: 'Low-sodium meal trays sealed at licensed partner kitchen.',
        eventFa: 'پلمپ بهداشتی بسته‌های غذایی کم‌نمک در آشپزخانه مجاز آسا خوراک.',
        actor: 'Chef Dariush Kaviani',
        actorFa: 'سرآشپز داریوش کاویانی',
      },
      {
        time: '10:18 AM THR',
        timeFa: '۱۰:۱۸ صبح تهران',
        event: 'Fresh orchard produce & Sangak bread hand-picked; expiry dates verified.',
        eventFa: 'دست‌چین میوه تازه و نان سنگک داغ؛ بررسی دقیق تاریخ تولید لبنیات.',
        actor: 'Asa Hamrah Shopper',
        actorFa: 'همراه خرید آسا',
      },
      {
        time: '10:30 AM THR',
        timeFa: '۱۰:۳۰ صبح تهران',
        event: 'Official pass-through store receipt photographed ($0 markup audit).',
        eventFa: 'ثبت تصویر فاکتور رسمی فروشگاه در پرونده (تضمین قیمت واقعی بدون کارمزد پنهان).',
        actor: 'Quality Audit Desk',
        actorFa: 'واحد ممیزی فاکتور آسا',
      },
    ],
  },
  {
    id: 'stage-dispatched',
    shortLabel: '3. Dispatched',
    shortLabelFa: '۳. اعزام همراه',
    title: 'Asa Specialist Dispatched in Tehran',
    titleFa: 'اعزام همراه احراز هویت‌شده «آسا» به سمت نشانی خانواده در تهران',
    subtitle: 'Vetted Asa companion en route with ID badge & sealed bags',
    subtitleFa: 'حرکت همراه امین آسا با کارت شناسایی رسمی و بسته‌های پلمپ‌شده',
    timestampOffset: '11:20 AM',
    timestampOffsetFa: '۱۱:۲۰ ظهر',
    stewardNote:
      'Your assigned Asa specialist is en route to your family’s neighborhood in Tehran and will call 15 minutes prior to arrival.',
    stewardNoteFa:
      'همراه اختصاصی آسا در مسیر محله خانواده شما در تهران است و ۱۵ دقیقه پیش از رسیدن، هماهنگی تلفنی با والدین را انجام می‌دهد.',
    historyLogs: [
      {
        time: '11:05 AM THR',
        timeFa: '۱۱:۰۵ صبح تهران',
        event: 'Companion identity badge & safeguarding checklist verified.',
        eventFa: 'کنترل کارت شناسایی رسمی همراه و چک‌لیست ایمنی و حریم خصوصی.',
        actor: 'Tehran Hub',
        actorFa: 'مرکز عملیات تهران',
      },
      {
        time: '11:20 AM THR',
        timeFa: '۱۱:۲۰ ظهر تهران',
        event: 'Dispatched via temperature-controlled vehicle toward District 1.',
        eventFa: 'حرکت خودروی حامل بسته‌های آسا به سمت منطقه محل سکونت والدین.',
        actor: 'Assigned Asa Steward',
        actorFa: 'همراه اختصاصی آسا',
      },
      {
        time: '11:48 AM THR',
        timeFa: '۱۱:۴۸ ظهر تهران',
        event: '15-minute courtesy arrival call placed to recipient landline.',
        eventFa: 'تماس محترمانه ۱۵ دقیقه قبل از رسیدن با تلفن منزل والدین.',
        actor: 'Assigned Asa Steward',
        actorFa: 'همراه اختصاصی آسا',
      },
    ],
  },
  {
    id: 'stage-transit',
    shortLabel: '4. In-Home Care',
    shortLabelFa: '۴. حضور و اجرا',
    title: 'In-Person Service Execution & Respectful Assistance',
    titleFa: 'حضور در کنار والدین، چیدمان اقلام در آشپزخانه یا همراهی در مرکز درمانی',
    subtitle: 'Kitchen arrangement / Medical visit accompaniment in progress',
    subtitleFa: 'انجام محترمانه خدمت در منزل یا همراهی گام‌به‌گام در کلینیک تخصصی',
    timestampOffset: '12:05 PM',
    timestampOffsetFa: '۱۲:۰۵ ظهر',
    stewardNote:
      'Our specialist is currently assisting your family in Tehran—sanitizing and placing groceries inside the refrigerator and completing requested tasks.',
    stewardNoteFa:
      'همراه آسا هم‌اکنون در کنار خانواده شماست؛ اقلام تازه در یخچال و کابینت چیده شده و امور درخواستی با حوصله و احترام در حال انجام است.',
    historyLogs: [
      {
        time: '12:05 PM THR',
        timeFa: '۱۲:۰۵ ظهر تهران',
        event: 'Steward greeted at residence door; ID badge presented to parent.',
        eventFa: 'حضور در درب منزل والدین، ارائه کارت شناسایی و احوال‌پرسی محترمانه.',
        actor: 'Assigned Asa Steward',
        actorFa: 'همراه اختصاصی آسا',
      },
      {
        time: '12:25 PM THR',
        timeFa: '۱۲:۲۵ ظهر تهران',
        event: 'Groceries & dated Asa Khoraak meals sanitized and arranged in fridge.',
        eventFa: 'ضدعفونی و چیدمان منظم میوه‌ها، لبنیات و غذاهای آسا خوراک در یخچال.',
        actor: 'Assigned Asa Steward',
        actorFa: 'همراه اختصاصی آسا',
      },
      {
        time: '12:55 PM THR',
        timeFa: '۱۲:۵۵ ظهر تهران',
        event: 'Companion check-in & clinic appointment reminder card placed on table.',
        eventFa: 'بررسی امور روزمره منزل و قرار دادن کارت یادآوری نوبت پزشک روی میز.',
        actor: 'Assigned Asa Steward',
        actorFa: 'همراه اختصاصی آسا',
      },
    ],
  },
  {
    id: 'stage-delivered',
    shortLabel: '5. Family Update',
    shortLabelFa: '۵. گزارش خانواده',
    title: 'Completed & Consented Factual Family Update Sent',
    titleFa: 'اتمام موفقیت‌آمیز خدمت و ارسال «گزارش واقعی خانواده» به همراه فاکتورها',
    subtitle: 'Visit signed off · Pass-through receipts & factual summary delivered',
    subtitleFa: 'تایید رضایت والدین · ارسال گزارش واقعی، ساعت حضور و تصویر فاکتور رسمی',
    timestampOffset: '01:30 PM',
    timestampOffsetFa: '۱۳:۳۰ ظهر',
    stewardNote:
      'Service completed in Tehran. Your consented Factual Family Update (attendance timestamps, itemized store receipts, and next follow-up notes) is ready.',
    stewardNoteFa:
      'خدمت با رضایت کامل والدین به پایان رسید. «گزارش واقعی خانواده» شامل ساعت دقیق حضور، تصویر فاکتور رسمی فروشگاه و نکات پیگیری بعدی برای شما ارسال شد.',
    historyLogs: [
      {
        time: '01:15 PM THR',
        timeFa: '۱۳:۱۵ بعدازظهر تهران',
        event: 'Recipient satisfaction & consent for Family Update confirmed.',
        eventFa: 'تایید رضایت کامل والدین و اجازه ارسال گزارش به فرزند.',
        actor: 'Recipient & Steward',
        actorFa: 'والدین گرامی و همراه آسا',
      },
      {
        time: '01:24 PM THR',
        timeFa: '۱۳:۲۴ بعدازظهر تهران',
        event: 'Pass-through receipt reconciliation audited by Clara Rostami.',
        eventFa: 'تطبیق نهایی فاکتور رسمی فروشگاه توسط واحد تضمین کیفیت کلارا رستمی.',
        actor: 'Clara Rostami (Trust Lead)',
        actorFa: 'کلارا رستمی (مدیر تضمین کیفیت)',
      },
      {
        time: '01:30 PM THR',
        timeFa: '۱۳:۳۰ بعدازظهر تهران',
        event: 'Consented Factual Family Update dispatched to diaspora family.',
        eventFa: 'ارسال «گزارش واقعی خانواده» به همراه پیوست فاکتورها برای فرزند.',
        actor: 'Asa Family Portal',
        actorFa: 'پورتال گزارش خانواده آسا',
      },
    ],
  },
];

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  lang,
  currency = 'USD',
  isOpen,
  onClose,
  activeOrder,
  onAdvanceStage,
  onSubmitReview,
}) => {
  const { t } = useLocalization();
  const isFa = lang === 'fa';
  const [autoSimulate, setAutoSimulate] = useState<boolean>(false);
  const [showReceiptPreview, setShowReceiptPreview] = useState<boolean>(true);
  const [receiptPreviewUrl, setReceiptPreviewUrl] = useState<string>('');

  // Post-Delivery Family Satisfaction Survey State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([
    'punctuality',
    'receipt',
    'courtesy',
  ]);
  const [commentText, setCommentText] = useState<string>('');
  const [isSurveySubmitted, setIsSurveySubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!autoSimulate || !isOpen) return;
    const timer = setInterval(() => {
      if (activeOrder.currentStageIndex < LIFECYCLE_STAGES.length - 1) {
        onAdvanceStage(activeOrder.currentStageIndex + 1);
      } else {
        setAutoSimulate(false);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [autoSimulate, isOpen, activeOrder.currentStageIndex, onAdvanceStage]);

  const currentStage =
    LIFECYCLE_STAGES[activeOrder.currentStageIndex] || LIFECYCLE_STAGES[0];
  const isFinalStage = activeOrder.currentStageIndex === LIFECYCLE_STAGES.length - 1;

  const completionPercentage =
    ((activeOrder.currentStageIndex + 1) / LIFECYCLE_STAGES.length) * 100;

  // Progress along the horizontal connector bar (0% at stage 0, 100% at stage 4)
  const horizontalLineFillPct =
    (activeOrder.currentStageIndex / (LIFECYCLE_STAGES.length - 1)) * 100;

  const toggleHighlight = (id: string) => {
    setSelectedHighlights((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getRatingCaption = (stars: number) => {
    if (stars >= 5)
      return isFa ? '۵ از ۵ · عالی و فراتر از انتظار خانواده' : '5/5 · Exceptional Stewardship';
    if (stars === 4) return isFa ? '۴ از ۵ · بسیار خوب و محترمانه' : '4/5 · Very Good Service';
    if (stars === 3) return isFa ? '۳ از ۵ · قابل قبول' : '3/5 · Satisfactory';
    if (stars === 2) return isFa ? '۲ از ۵ · نیاز به پیگیری' : '2/5 · Needs Improvement';
    return isFa ? '۱ از ۵ · ناراضی (بررسی فوری مدیریت)' : '1/5 · Escalate to Quality Lead';
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return;
    setIsSurveySubmitted(true);
    if (onSubmitReview) {
      onSubmitReview({
        referenceCode: activeOrder.referenceCode,
        rating,
        highlights: selectedHighlights,
        comment:
          commentText.trim() ||
          (isFa
            ? 'رضایت کامل خانواده از وقت‌شناسی، احترام و تطابق فاکتور رسمی.'
            : 'Full family satisfaction with punctuality and store receipt match.'),
      });
    }
  };

  const buildReceiptInput = (): OfficialStoreReceiptInput => {
    const passUsd = activeOrder.passThroughTotalUsd ?? 44;
    const feeUsd = activeOrder.asaServiceFeeUsd ?? 18;
    const fallbackItems: StoreReceiptLineItem[] = [
      {
        nameFa: 'نان سنگک خشخاشی تازه (نانوایی سنتی آصف)',
        nameEn: 'Fresh Sesame Sangak Flatbread (Assef Bakery)',
        qtyLabelFa: '۲ عدد',
        qtyLabelEn: '2 pcs',
        priceUsd: 4,
      },
      {
        nameFa: 'سبد میوه دست‌چین دماوند (سیب، گلابی و پرتقال)',
        nameEn: 'Hand-Picked Damavand Orchard Fruit Basket',
        qtyLabelFa: '۳ کیلوگرم',
        qtyLabelEn: '3 kg',
        priceUsd: 16,
      },
      {
        nameFa: 'خورشت قورمه‌سبزی خانگی کم‌نمک (آسا خوراک)',
        nameEn: 'Low-Sodium Homemade Ghormeh Sabzi (Asa Khoraak)',
        qtyLabelFa: '۲ پرس شیشه‌ای',
        qtyLabelEn: '2 jars',
        priceUsd: 14,
      },
      {
        nameFa: 'پنیر لیقوان اصل و گردوی تویسرکان',
        nameEn: 'Authentic Lighvan Cheese & Tuyserkan Walnuts',
        qtyLabelFa: '۱ بسته ۴۰۰ گرم',
        qtyLabelEn: '400g pack',
        priceUsd: Math.max(4, passUsd - 34),
      },
    ];

    return {
      referenceCode: activeOrder.referenceCode,
      recipientName:
        activeOrder.recipientName ||
        (isFa ? 'خانم توران راد' : 'Mrs. Touran Rad'),
      residenceAddress: activeOrder.residenceAddress,
      deliveryWindow: activeOrder.deliveryWindow,
      createdAt: activeOrder.createdAt,
      items:
        activeOrder.receiptItems && activeOrder.receiptItems.length > 0
          ? activeOrder.receiptItems
          : fallbackItems,
      passThroughTotalUsd: passUsd,
      asaServiceFeeUsd: feeUsd,
      lang,
      currency,
      stewardNameFa: activeOrder.stewardNameFa,
      stewardNameEn: activeOrder.stewardNameEn,
    };
  };

  useEffect(() => {
    if (!isOpen || !showReceiptPreview) return;
    const url = generateOfficialStoreReceiptDataUrl(buildReceiptInput());
    setReceiptPreviewUrl(url);
  }, [isOpen, showReceiptPreview, activeOrder, lang, currency]);

  const handleDownloadReceiptPng = () => {
    downloadOfficialReceiptAsPng(buildReceiptInput());
  };

  const handleDownloadReceiptPdf = () => {
    downloadOfficialReceiptAsPdf(buildReceiptInput());
  };

  const handleDownloadDossier = () => {
    const passUsd = activeOrder.passThroughTotalUsd ?? 44;
    const feeUsd = activeOrder.asaServiceFeeUsd ?? 18;
    downloadOfficialAsaDossier({
      referenceCode: activeOrder.referenceCode,
      recipientName: activeOrder.recipientName || (isFa ? 'خانم توران راد' : 'Mrs. Touran Rad'),
      residenceAddress: activeOrder.residenceAddress,
      deliveryWindow: activeOrder.deliveryWindow,
      passThroughTotalUsd: passUsd,
      asaServiceFeeUsd: feeUsd,
      grandTotalUsd: passUsd + feeUsd,
      gatewayName: 'ASA Verified Settlement',
      personalMessageCard: activeOrder.personalMessageCard,
      itemsSummary: [
        {
          title: isFa
            ? 'خدمات آسا همراه و اقلام سوپرمارکتی طبق فاکتور رسمی'
            : 'Asa Stewardship & Pass-Through Store Provisions',
          qtyOrType: isFa
            ? `${activeOrder.itemsCount.toLocaleString('fa-IR')} مورد`
            : `${activeOrder.itemsCount} items`,
          priceFormatted: `$${passUsd + feeUsd}`,
        },
      ],
      stageLabel: isFa ? currentStage.shortLabelFa : currentStage.shortLabel,
      lang,
      currency,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/82 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121513] border border-[#C8A96A]/45 max-w-4xl w-full overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.92)] my-6 max-h-[92vh] flex flex-col"
          >
            {/* Top Gold Progress Bar inside Modal */}
            <div className="w-full h-1.5 bg-white/10 overflow-hidden shrink-0">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#C8A96A] via-[#E5C98B] to-[#C8A96A]"
              />
            </div>

            {/* Modal Header */}
            <div className="p-5 sm:p-7 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#151816] shrink-0">
              <div>
                <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-[#C8A96A] mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#3E7B5E] animate-ping" />
                  <span>
                    {isFa
                      ? 'سامانه رهگیری زنده سفارش و تاریخچه زمانی آسا در تهران'
                      : 'Asa Tehran Live Order Lifecycle & Timestamped History'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB]">
                  {isFa
                    ? 'نوار پیشرفت تعاملی و گزارش زمان‌بندی‌شده مراحل خدمت'
                    : 'Interactive Step-Progress & Timestamped Fulfillment Audit'}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setShowReceiptPreview((prev) => !prev)}
                  className={`px-3 py-2 text-xs border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    showReceiptPreview
                      ? 'bg-[#C8A96A]/20 text-[#C8A96A] border-[#C8A96A] font-semibold'
                      : 'bg-[#0D0F0E] text-[#F5F2EB] border-white/20 hover:border-[#C8A96A]'
                  }`}
                >
                  {showReceiptPreview ? (
                    <EyeOff className="w-3.5 h-3.5 text-[#C8A96A]" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-[#C8A96A]" />
                  )}
                  <span>
                    {showReceiptPreview
                      ? t('tracking.hideReceiptBtn')
                      : t('tracking.viewReceiptBtn')}
                  </span>
                </button>

                {!isFinalStage && (
                  <button
                    type="button"
                    onClick={() => onAdvanceStage(LIFECYCLE_STAGES.length - 1)}
                    className="px-3 py-2 text-xs bg-[#2E5A44]/40 hover:bg-[#2E5A44] text-[#F5F2EB] border border-[#3E7B5E] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 text-[#C8A96A] fill-current" />
                    <span>
                      {isFa ? 'مرحله نهایی و نظرسنجی' : 'Final Stage & Survey'}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (activeOrder.currentStageIndex >= LIFECYCLE_STAGES.length - 1) {
                      onAdvanceStage(0);
                    }
                    setAutoSimulate(!autoSimulate);
                  }}
                  className={`px-3.5 py-2 text-xs uppercase tracking-[0.14em] border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    autoSimulate
                      ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] font-semibold'
                      : 'bg-[#0D0F0E] text-[#C8A96A] border-[#C8A96A]/40 hover:border-[#C8A96A]'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>
                    {autoSimulate
                      ? isFa
                        ? 'در حال شبیه‌سازی زنده...'
                        : 'Simulating Live...'
                      : isFa
                      ? 'شبیه‌سازی زنده مراحل'
                      : 'Simulate Live Progress'}
                  </span>
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close tracking modal"
                  className="w-9 h-9 bg-[#0D0F0E] border border-white/15 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] hover:border-[#C8A96A] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-5 sm:p-7 space-y-7">
              {/* Order Metadata Summary Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#0D0F0E] border border-white/10 text-xs">
                <div>
                  <span className="text-[#9E988E] block mb-1">
                    {isFa ? 'کد مرجع سفارش آسا:' : 'Asa Order Reference:'}
                  </span>
                  <span className="font-mono text-sm text-[#C8A96A] font-semibold">
                    {activeOrder.referenceCode}
                  </span>
                </div>
                <div>
                  <span className="text-[#9E988E] block mb-1">
                    {isFa ? 'محله و نشانی خانواده در تهران:' : 'Tehran Family Location:'}
                  </span>
                  <span className="text-[#F5F2EB] flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#C8A96A] shrink-0" />
                    <span className="truncate">{activeOrder.residenceAddress}</span>
                  </span>
                </div>
                <div>
                  <span className="text-[#9E988E] block mb-1">
                    {isFa ? 'بازه زمانی هماهنگ‌شده:' : 'Scheduled Tehran Slot:'}
                  </span>
                  <span className="text-[#F5F2EB] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C8A96A] shrink-0" />
                    <span>{activeOrder.deliveryWindow}</span>
                  </span>
                </div>
              </div>

              {/* Interactive Animated Horizontal Step-Progress Bar */}
              <div className="bg-[#151816] border border-[#C8A96A]/35 p-5 sm:p-6">
                <div className="flex items-center justify-between text-xs text-[#9E988E] mb-6">
                  <span className="uppercase tracking-[0.16em] text-[#C8A96A] font-semibold flex items-center gap-2">
                    <History className="w-4 h-4" />
                    <span>
                      {isFa
                        ? 'نوار پیشرفت افقی چرخه سفارش (روی هر مرحله کلیک کنید)'
                        : 'Interactive Horizontal Step-Progress Bar (Click Any Stage)'}
                    </span>
                  </span>
                  <span className="font-mono text-[#F5F2EB]">
                    {isFa
                      ? `${Math.round(completionPercentage).toLocaleString('fa-IR')}٪ تکمیل شده`
                      : `${Math.round(completionPercentage)}% Complete`}
                  </span>
                </div>

                {/* Horizontal Stepper Track */}
                <div className="relative pt-2 pb-4">
                  {/* Background Unfilled Horizontal Connector Line */}
                  <div className="hidden sm:block absolute top-7 left-[10%] right-[10%] h-[3px] bg-white/10 z-0">
                    {/* Animated Gold/Emerald Progress Fill */}
                    <motion.div
                      initial={false}
                      animate={{ width: `${horizontalLineFillPct}%` }}
                      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                      className={`h-full bg-gradient-to-r from-[#3E7B5E] via-[#C8A96A] to-[#E5C98B] shadow-[0_0_14px_rgba(200,169,106,0.75)] ${
                        isFa ? 'ml-auto' : 'mr-auto'
                      }`}
                    />
                  </div>

                  {/* 5 Interactive Horizontal Nodes */}
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2">
                    {LIFECYCLE_STAGES.map((stage, idx) => {
                      const isCompleted = idx < activeOrder.currentStageIndex;
                      const isCurrent = idx === activeOrder.currentStageIndex;

                      return (
                        <motion.button
                          key={stage.id}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => onAdvanceStage(idx)}
                          className={`group flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2.5 p-2.5 sm:p-2 border sm:border-transparent transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#0D0F0E] sm:bg-transparent border-[#C8A96A]/50'
                              : 'bg-[#0D0F0E]/50 sm:bg-transparent border-white/5'
                          }`}
                        >
                          {/* Step Circle Node */}
                          <div className="relative flex items-center justify-center">
                            {isCurrent && (
                              <motion.span
                                animate={{ scale: [1, 1.38, 1], opacity: [0.65, 0, 0.65] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute w-11 h-11 rounded-full bg-[#C8A96A]/35 pointer-events-none"
                              />
                            )}
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs transition-all border-2 ${
                                isCompleted
                                  ? 'bg-[#2E5A44] border-[#3E7B5E] text-[#F5F2EB] shadow-[0_0_16px_rgba(62,123,94,0.5)]'
                                  : isCurrent
                                  ? 'bg-[#C8A96A] border-[#F3E3B8] text-[#0D0F0E] font-bold shadow-[0_0_24px_rgba(200,169,106,0.7)] scale-110'
                                  : 'bg-[#0D0F0E] border-white/20 text-[#9E988E] group-hover:border-[#C8A96A]/60'
                              }`}
                            >
                              {isCompleted ? (
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              ) : (
                                <span>{isFa ? (idx + 1).toLocaleString('fa-IR') : idx + 1}</span>
                              )}
                            </div>
                          </div>

                          {/* Step Label & Timestamp */}
                          <div className="text-start sm:text-center">
                            <span
                              className={`text-xs block font-medium transition-colors ${
                                isCurrent
                                  ? 'text-[#C8A96A] font-semibold'
                                  : isCompleted
                                  ? 'text-[#F5F2EB]'
                                  : 'text-[#9E988E]'
                              }`}
                            >
                              {isFa ? stage.shortLabelFa : stage.shortLabel}
                            </span>
                            <span className="font-mono text-[10px] text-[#9E988E] block mt-0.5">
                              {isFa ? stage.timestampOffsetFa : stage.timestampOffset}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Active Stage Detailed Dossier & Timestamped Sub-Event History */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
                >
                  {/* Left/Right: Stage Summary & Steward Note (5 Cols) */}
                  <div className="lg:col-span-5 bg-[#151816] border border-[#C8A96A]/45 p-5 sm:p-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#C8A96A]">
                        <span className="flex items-center gap-1.5 uppercase tracking-[0.14em] font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          {isFa
                            ? `مرحله ${(activeOrder.currentStageIndex + 1).toLocaleString(
                                'fa-IR'
                              )} از ۵`
                            : `Stage ${activeOrder.currentStageIndex + 1} of 5`}
                        </span>
                        <span className="font-mono bg-[#0D0F0E] px-2.5 py-1 border border-[#C8A96A]/30">
                          {isFa
                            ? currentStage.timestampOffsetFa
                            : currentStage.timestampOffset}
                        </span>
                      </div>

                      <h4 className="font-serif text-2xl text-[#F5F2EB] leading-snug">
                        {isFa ? currentStage.titleFa : currentStage.title}
                      </h4>

                      <p className="text-xs text-[#C8A96A]/90">
                        {isFa ? currentStage.subtitleFa : currentStage.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-[#9E988E] leading-relaxed pt-2 border-t border-white/10">
                        {isFa ? currentStage.stewardNoteFa : currentStage.stewardNote}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                      {activeOrder.currentStageIndex < LIFECYCLE_STAGES.length - 1 ? (
                        <button
                          onClick={() => onAdvanceStage(activeOrder.currentStageIndex + 1)}
                          className="px-4 py-2 bg-[#C8A96A] text-[#0D0F0E] text-xs uppercase tracking-[0.14em] font-semibold hover:bg-[#DFC48D] transition-colors cursor-pointer"
                        >
                          {isFa ? 'مشاهده مرحله بعدی ←' : 'Next Lifecycle Stage →'}
                        </button>
                      ) : (
                        <button
                          onClick={() => onAdvanceStage(0)}
                          className="text-xs text-[#9E988E] hover:text-[#C8A96A] flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{isFa ? 'بازنشانی به مرحله اول' : 'Reset to Stage 1'}</span>
                        </button>
                      )}

                      <span className="text-[11px] text-[#3E7B5E] flex items-center gap-1 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {isFa ? 'تاییدشده در تهران' : 'Tehran Verified'}
                      </span>
                    </div>
                  </div>

                  {/* Right/Left: Detailed Timestamped Micro-Event History for Selected Stage (7 Cols) */}
                  <div className="lg:col-span-7 bg-[#151816] border border-white/10 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                        <span className="text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {isFa
                              ? 'لاگ دقیق رویدادها و تاریخچه زمان‌بندی‌شده این مرحله'
                              : 'Detailed Timestamped Event History for This Stage'}
                          </span>
                        </span>
                        <span className="font-mono text-[11px] text-[#9E988E]">
                          {isFa ? 'به وقت رسمی تهران (IRST)' : 'Tehran Local Time (IRST)'}
                        </span>
                      </div>

                      <div className="space-y-3.5">
                        {currentStage.historyLogs.map((log, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: isFa ? 12 : -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: index * 0.08 }}
                            className="bg-[#0D0F0E] border border-white/10 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7B5E] shrink-0" />
                                <span className="text-xs sm:text-sm text-[#F5F2EB] font-medium">
                                  {isFa ? log.eventFa : log.event}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-[#9E988E] ps-5">
                                <UserCheck className="w-3 h-3 text-[#C8A96A]" />
                                <span>{isFa ? log.actorFa : log.actor}</span>
                              </div>
                            </div>

                            <span className="font-mono text-[11px] text-[#C8A96A] bg-[#151816] border border-[#C8A96A]/30 px-2.5 py-1 shrink-0 self-start sm:self-center">
                              {isFa ? log.timeFa : log.time}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#9E988E]">
                      <span className="flex items-center gap-1.5">
                        <Receipt className="w-3.5 h-3.5 text-[#C8A96A]" />
                        {isFa
                          ? 'تمامی ساعت‌ها و فاکتورهای خرید در گزارش نهایی خانواده ثبت می‌شوند.'
                          : 'All timestamps and pass-through store receipts are archived in your Family Update.'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Generated Official Store Receipt Preview & Image / PDF Export */}
              <AnimatePresence>
                {showReceiptPreview && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#151816] border border-[#C8A96A]/55 p-5 sm:p-6 space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold mb-1">
                          <Receipt className="w-4 h-4" />
                          <span>{t('tracking.receiptPreviewTitle')}</span>
                        </div>
                        <p className="text-xs text-[#9E988E]">
                          {isFa
                            ? `پیش‌نمایش زنده فاکتور رسمی صادرشده برای سفارش ${activeOrder.referenceCode} — آماده دانلود با فرمت تصویر (PNG) یا PDF`
                            : `Generated Official Store Receipt preview for ${activeOrder.referenceCode} — ready to save as PNG image or PDF`}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleDownloadReceiptPng}
                          className="px-3.5 py-2 bg-[#0D0F0E] hover:bg-[#C8A96A]/15 text-[#C8A96A] border border-[#C8A96A] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>{t('tracking.downloadPngBtn')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleDownloadReceiptPdf}
                          className="px-3.5 py-2 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_20px_rgba(200,169,106,0.28)]"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{t('tracking.downloadPdfBtn')}</span>
                        </button>
                      </div>
                    </div>

                    {receiptPreviewUrl && (
                      <div className="bg-[#090B0A] border border-white/10 p-3 sm:p-5 flex justify-center overflow-x-auto">
                        <img
                          src={receiptPreviewUrl}
                          alt={`Official Store Receipt ${activeOrder.referenceCode}`}
                          className="max-w-full sm:max-w-xl w-full h-auto border border-[#C8A96A]/45 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Post-Delivery 'Family Satisfaction' Survey (Appears on Final Stage) */}
              <AnimatePresence>
                {isFinalStage && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="bg-gradient-to-b from-[#171C19] to-[#121513] border-2 border-[#C8A96A] p-6 sm:p-7 shadow-[0_0_45px_rgba(200,169,106,0.18)]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold mb-1">
                          <MessageSquareHeart className="w-4 h-4" />
                          <span>
                            {isFa
                              ? 'نظرسنجی رضایت خانواده پس از اتمام خدمت'
                              : 'Post-Delivery Family Satisfaction Survey'}
                          </span>
                        </div>
                        <h4 className="font-serif text-xl sm:text-2xl text-[#F5F2EB]">
                          {isFa
                            ? 'کیفیت همراهی و آرامش خاطر خانواده‌تان در این خدمت چطور بود؟'
                            : 'How was our stewardship for your family in Tehran today?'}
                        </h4>
                      </div>
                      <span className="font-mono text-[11px] text-[#3E7B5E] bg-[#3E7B5E]/15 border border-[#3E7B5E]/35 px-3 py-1 self-start sm:self-center">
                        {isFa ? 'نظارت مستقیم کلارا رستمی' : 'Audited by Clara Rostami'}
                      </span>
                    </div>

                    {isSurveySubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0D0F0E] border border-[#3E7B5E] p-5 space-y-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#2E5A44]/40 border border-[#3E7B5E] flex items-center justify-center text-[#3E7B5E] shrink-0">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-serif text-lg text-[#F5F2EB]">
                                {isFa
                                  ? 'سپاسگزاریم! دیدگاه شما در پرونده تضمین کیفیت آسا ثبت شد.'
                                  : 'Thank you! Your Family Satisfaction feedback has been recorded.'}
                              </h5>
                              <p className="text-xs text-[#9E988E]">
                                {isFa
                                  ? `امتیاز ثبت‌شده: ${rating.toLocaleString('fa-IR')} از ۵ ستاره · کد مرجع: ${
                                      activeOrder.referenceCode
                                    }`
                                  : `Recorded Rating: ${rating}/5 Stars · Ref: ${activeOrder.referenceCode}`}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setIsSurveySubmitted(false)}
                            className="text-xs text-[#C8A96A] hover:underline cursor-pointer shrink-0"
                          >
                            {isFa ? 'ویرایش نظر' : 'Edit Feedback'}
                          </button>
                        </div>

                        {commentText.trim() !== '' && (
                          <div className="p-3.5 bg-[#151816] border border-white/10 text-xs text-[#F5F2EB]/90 italic">
                            “{commentText.trim()}”
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSurveySubmit} className="space-y-5">
                        {/* 1-5 Gold Star Selector */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D0F0E] border border-white/10 p-4">
                          <div>
                            <span className="text-xs text-[#F5F2EB] font-medium block mb-1">
                              {isFa
                                ? '۱. امتیاز کلی شما به کیفیت انجام این سفارش:'
                                : '1. Overall Service Quality Rating:'}
                            </span>
                            <span className="text-xs text-[#C8A96A] font-medium">
                              {getRatingCaption(hoverRating || rating)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((starValue) => {
                              const active = starValue <= (hoverRating || rating);
                              return (
                                <button
                                  key={starValue}
                                  type="button"
                                  onMouseEnter={() => setHoverRating(starValue)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  onClick={() => setRating(starValue)}
                                  aria-label={`Rate ${starValue} out of 5 stars`}
                                  className="p-1.5 transition-transform hover:scale-110 cursor-pointer"
                                >
                                  <Star
                                    className={`w-7 h-7 transition-colors ${
                                      active
                                        ? 'text-[#C8A96A] fill-[#C8A96A] drop-shadow-[0_0_10px_rgba(200,169,106,0.55)]'
                                        : 'text-white/20 hover:text-[#C8A96A]/60'
                                    }`}
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Stewardship Quality Highlight Toggles */}
                        <div>
                          <span className="text-xs text-[#9E988E] block mb-2.5">
                            {isFa
                              ? '۲. کدام ویژگی‌های این خدمت برایتان رضایت‌بخش بود؟ (انتخاب چندگانه)'
                              : '2. Which aspects stood out during this visit?'}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                            {SATISFACTION_HIGHLIGHTS.map((item) => {
                              const selected = selectedHighlights.includes(item.id);
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => toggleHighlight(item.id)}
                                  className={`px-3 py-2.5 text-xs border text-start flex items-center justify-between gap-2 transition-all cursor-pointer ${
                                    selected
                                      ? 'bg-[#C8A96A]/15 border-[#C8A96A] text-[#F5F2EB] font-medium'
                                      : 'bg-[#0D0F0E] border-white/10 text-[#9E988E] hover:border-white/25'
                                  }`}
                                >
                                  <span className="truncate">
                                    {isFa ? item.labelFa : item.labelEn}
                                  </span>
                                  {selected && (
                                    <Check className="w-3.5 h-3.5 text-[#C8A96A] shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Brief Text Comment Input */}
                        <div>
                          <label
                            htmlFor="family-satisfaction-comment"
                            className="text-xs text-[#9E988E] block mb-2"
                          >
                            {isFa
                              ? '۳. یادداشت کوتاه یا پیام شما برای همراه اختصاصی آسا و تیم تهران (اختیاری):'
                              : '3. Brief comment or note for your assigned Asa steward (optional):'}
                          </label>
                          <textarea
                            id="family-satisfaction-comment"
                            rows={2}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder={
                              isFa
                                ? 'مثلاً: مادرم از برخورد بسیار محترمانه همراه آسا و تازگی میوه‌ها و بسته‌های آسا خوراک خیلی راضی بودند...'
                                : 'e.g., My mother was delighted with the steward’s kindness and the fresh Sangak and meals...'
                            }
                            className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] p-3.5 text-xs sm:text-sm text-[#F5F2EB] placeholder-[#9E988E]/50 outline-none resize-none"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                          <span className="text-[11px] text-[#9E988E]">
                            {isFa
                              ? 'پاداش قدردانی شما مستقیماً به همراه انجام‌دهنده سفارش در تهران اختصاص می‌یابد.'
                              : 'Your feedback directly rewards the assigned Tehran steward.'}
                          </span>
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_25px_rgba(200,169,106,0.3)]"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>
                              {isFa ? 'ثبت امتیاز و نظر خانواده' : 'Submit Family Feedback'}
                            </span>
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 bg-[#151816] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 text-xs text-[#9E988E]">
                <FileText className="w-4 h-4 text-[#C8A96A]" />
                <span>
                  {isFa
                    ? 'مسئول هماهنگی تهران: رکسانا بختیاری · گزارش واقعی خانواده پس از رضایت والدین ارسال می‌شود'
                    : 'Tehran Coordinator: Roxana Bakhtiari · Consented Factual Family Update Included'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleDownloadReceiptPng}
                  className="px-3.5 py-2.5 bg-[#0D0F0E] hover:bg-[#C8A96A]/15 text-[#F5F2EB] border border-white/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#C8A96A]" />
                  <span>{isFa ? 'ذخیره تصویر (PNG)' : 'Save Image (PNG)'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReceiptPdf}
                  className="px-3.5 py-2.5 bg-[#0D0F0E] hover:bg-[#C8A96A]/15 text-[#C8A96A] border border-[#C8A96A]/55 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isFa ? 'ذخیره فاکتور (PDF)' : 'Save Receipt (PDF)'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadDossier}
                  className="px-3.5 py-2.5 bg-[#121614] hover:bg-white/10 text-[#9E988E] border border-white/15 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C8A96A]" />
                  <span>{isFa ? 'گزارش کامل چاپی' : 'Printable Dossier'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#C8A96A] text-[#0D0F0E] text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#DFC48D] transition-colors cursor-pointer"
                >
                  {isFa ? 'بستن پنجره رهگیری' : 'Done'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

