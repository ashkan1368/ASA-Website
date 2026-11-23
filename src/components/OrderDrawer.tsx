import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  Calendar,
  CheckCircle2,
  Sparkles,
  Plus,
  Minus,
  Activity,
  Mic,
  MicOff,
  Wand2,
  Volume2,
  Check,
  Coins,
  RotateCcw,
  CreditCard,
  FileText,
  ShieldCheck,
  Download,
  Mail,
  Heart,
} from 'lucide-react';
import {
  ESTATE_SERVICES,
  GROCERY_PRODUCTS,
  EstateService,
  GroceryProduct,
  Language,
  CurrencyCode,
  CURRENCY_META,
  formatPrice,
  TEHRAN_SERVICE_ZONES,
} from '../data/catalogData';
import { PaymentGatewayConfig } from './AdminDashboardModal';
import { downloadOfficialAsaDossier } from '../utils/pdfDossierGenerator';
import { ParentCareProfile } from './ParentCareProfileModal';
import { EXPANSION_TEHRAN_DISTRICTS } from './WaitlistJoinModal';
import { useLocalization } from '../i18n/LocalizationContext';

export interface LastOrderSnapshot {
  referenceCode: string;
  dateLabelFa: string;
  dateLabelEn: string;
  serviceIds: string[];
  productQuantities: Record<string, number>;
  specialInstructions: string;
  recipientName: string;
  residenceAddress: string;
  personalMessageCard?: string;
}

interface OrderDrawerProps {
  lang: Language;
  currency: CurrencyCode;
  onSelectCurrency?: (currency: CurrencyCode) => void;
  isOpen: boolean;
  onClose: () => void;
  servicesCatalog?: EstateService[];
  productsCatalog?: GroceryProduct[];
  selectedServices: EstateService[];
  onAddService?: (service: EstateService) => void;
  onRemoveService: (serviceId: string) => void;
  cartProducts: { product: GroceryProduct; quantity: number }[];
  onUpdateProductQuantity: (product: GroceryProduct, delta: number) => void;
  onClearAll: () => void;
  lastOrder?: LastOrderSnapshot | null;
  onReorderFromLast?: () => void;
  paymentGateways?: PaymentGatewayConfig[];
  parentProfile?: ParentCareProfile;
  onOrderDispatched?: (details: {
    referenceCode: string;
    residenceAddress: string;
    deliveryWindow: string;
    recipientName: string;
    substitutionRule: string;
    specialInstructions: string;
    selectedGatewayId: string;
    personalMessageCard: string;
    hasVoiceNote: boolean;
    passThroughTotalUsd: number;
    asaServiceFeeUsd: number;
  }) => void;
  onOpenTracking?: () => void;
  onOpenWaitlistModal?: (districtCode?: string) => void;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [subIndex: number]: {
        transcript: string;
      };
    };
  };
}

const DIETARY_QUICK_CHIPS = [
  {
    fa: 'رژیم کم‌نمک و کم‌چرب (مناسب فشار خون)',
    en: 'Low-Sodium & Low-Fat Diet',
  },
  {
    fa: 'میوه‌ها دست‌چین، نرم و کاملاً رسیده باشند',
    en: 'Hand-picked soft & ripe fruits',
  },
  {
    fa: 'تماس تلفنی ۱۵ دقیقه قبل از زنگ درب منزل',
    en: 'Call 15 mins before ringing doorbell',
  },
  {
    fa: 'حمل کیسه‌های سنگین تا داخل کابینت آشپزخانه',
    en: 'Carry heavy items inside kitchen',
  },
];

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  lang,
  currency,
  onSelectCurrency,
  isOpen,
  onClose,
  servicesCatalog = ESTATE_SERVICES,
  productsCatalog = GROCERY_PRODUCTS,
  selectedServices,
  onAddService,
  onRemoveService,
  cartProducts,
  onUpdateProductQuantity,
  onClearAll,
  lastOrder,
  onReorderFromLast,
  paymentGateways = [],
  parentProfile,
  onOrderDispatched,
  onOpenTracking,
  onOpenWaitlistModal,
}) => {
  const { t } = useLocalization();
  const isFa = lang === 'fa';
  const [orderError, setOrderError] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [recipientName, setRecipientName] = useState(
    parentProfile?.parentNames || ''
  );
  const [tehranZoneId, setTehranZoneId] = useState(
    parentProfile?.tehranZoneId || TEHRAN_SERVICE_ZONES[0].id
  );
  const [residenceAddress, setResidenceAddress] = useState(
    parentProfile?.residenceAddress || ''
  );
  const [deliveryWindow, setDeliveryWindow] = useState(
    'Today · Afternoon Slot (2:00 PM – 5:00 PM)'
  );
  const [substitutionRule, setSubstitutionRule] = useState(
    'replace-closest-grade-a'
  );
  const [consentChecked, setConsentChecked] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [personalMessageCard, setPersonalMessageCard] = useState('');
  const [isRecordingParentVoice, setIsRecordingParentVoice] = useState(false);
  const [parentVoiceSeconds, setParentVoiceSeconds] = useState(0);
  const [hasParentVoiceNote, setHasParentVoiceNote] = useState(false);

  const [selectedGatewayId, setSelectedGatewayId] = useState<string>(
    paymentGateways.find((g) => g.enabled)?.id || 'gateway-intl-card'
  );
  const [reorderFeedback, setReorderFeedback] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Sync Parent Care Profile updates into form fields automatically
  useEffect(() => {
    if (!parentProfile) return;
    if (parentProfile.parentNames) setRecipientName(parentProfile.parentNames);
    if (parentProfile.tehranZoneId) setTehranZoneId(parentProfile.tehranZoneId);
    if (parentProfile.residenceAddress) setResidenceAddress(parentProfile.residenceAddress);
    const autoNotes = [
      parentProfile.dietarySodiumSugarLimits.join(' · '),
      parentProfile.favoriteFruitsAndRipeness,
      parentProfile.doorbellAndCallProtocol,
    ]
      .filter(Boolean)
      .join(' | ');
    if (autoNotes) {
      setSpecialInstructions(autoNotes);
    }
  }, [parentProfile]);

  // 30-second timer for Parent Voice Note recording
  useEffect(() => {
    if (!isRecordingParentVoice) return;
    const timer = setInterval(() => {
      setParentVoiceSeconds((prev) => {
        if (prev >= 30) {
          setIsRecordingParentVoice(false);
          setHasParentVoiceNote(true);
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRecordingParentVoice]);

  // Keep selectedGatewayId valid if admin disables a gateway
  useEffect(() => {
    const enabledList = paymentGateways.filter((g) => g.enabled);
    if (
      enabledList.length > 0 &&
      !enabledList.some((g) => g.id === selectedGatewayId)
    ) {
      setSelectedGatewayId(enabledList[0].id);
    }
  }, [paymentGateways, selectedGatewayId]);

  // Voice-to-Text Microphone API states
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceStatusMessage, setVoiceStatusMessage] = useState<string | null>(null);
  const [voiceMatchedItems, setVoiceMatchedItems] = useState<string[]>([]);
  const [micAudioLevels, setMicAudioLevels] = useState<number[]>([20, 35, 25, 45, 30, 40, 20]);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const stopMicrophoneAnalyzer = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setMicAudioLevels([20, 30, 25, 35, 25, 30, 20]);
  };

  useEffect(() => {
    if (!isOpen && isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      stopMicrophoneAnalyzer();
      setIsListening(false);
    }
  }, [isOpen, isListening]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      stopMicrophoneAnalyzer();
    };
  }, []);

  const handleTriggerReorder = () => {
    if (onReorderFromLast) {
      onReorderFromLast();
    }
    if (lastOrder) {
      if (lastOrder.specialInstructions) {
        setSpecialInstructions(lastOrder.specialInstructions);
      }
      if (lastOrder.recipientName) {
        setRecipientName(lastOrder.recipientName);
      }
      if (lastOrder.residenceAddress) {
        setResidenceAddress(lastOrder.residenceAddress);
      }
    }
    setReorderFeedback(true);
    setTimeout(() => setReorderFeedback(false), 2400);
  };

  const processSpokenOrderText = (rawText: string) => {
    const text = rawText.trim().toLowerCase();
    if (!text) return;

    const addedLabels: string[] = [];

    let defaultQty = 1;
    if (/\b(2|two|دو|دوتا)\b/i.test(text)) defaultQty = 2;
    if (/\b(3|three|سه|سه‌تا)\b/i.test(text)) defaultQty = 3;

    const productKeywordMap: { id: string; keywords: string[] }[] = [
      { id: 'prd-01', keywords: ['قورمه', 'قرمه', 'ghormeh', 'sabzi stew', 'خورشت'] },
      { id: 'prd-02', keywords: ['جوجه', 'جوجه‌کباب', 'joojeh', 'kabab', 'kebab', 'کباب'] },
      { id: 'prd-03', keywords: ['سوپ', 'جو', 'soup', 'barley'] },
      { id: 'prd-04', keywords: ['سالمون', 'ماهی تنوری', 'salmon', 'baked fish'] },
      { id: 'prd-05', keywords: ['میوه', 'سیب', 'پرتقال', 'fruit', 'apple', 'orange', 'دماوند'] },
      { id: 'prd-06', keywords: ['سبزی خوردن', 'ریحان', 'نعناع', 'herbs', 'sabzi khordan'] },
      { id: 'prd-07', keywords: ['گوجه', 'خیار', 'لیمو', 'tomato', 'cucumber', 'lemon'] },
      { id: 'prd-08', keywords: ['سبزی خورشتی', 'کرفس', 'کوکو', 'chopped herbs'] },
      { id: 'prd-09', keywords: ['سنگک', 'نان', 'نون', 'بربری', 'sangak', 'bread', 'bakery'] },
      { id: 'prd-10', keywords: ['پنیر', 'لیقوان', 'گردو', 'cheese', 'lighvan', 'walnut'] },
      { id: 'prd-11', keywords: ['ماست', 'شیر', 'لبنیات', 'yogurt', 'milk', 'dairy'] },
      { id: 'prd-12', keywords: ['تخم‌مرغ', 'تخم مرغ', 'کره', 'egg', 'eggs', 'butter'] },
      { id: 'prd-13', keywords: ['برنج', 'هاشمی', 'rice', 'hashemi'] },
      { id: 'prd-14', keywords: ['روغن', 'زیتون', 'کنجد', 'olive oil', 'sesame oil', 'oil'] },
      { id: 'prd-15', keywords: ['زعفران', 'عسل', 'saffron', 'honey'] },
      { id: 'prd-16', keywords: ['گلاب', 'بیدمشک', 'عرقیات', 'دمنوش', 'rosewater', 'herbal'] },
      { id: 'prd-17', keywords: ['گوشت', 'گوسفندی', 'گوساله', 'چرخ‌کرده', 'lamb', 'meat', 'beef', 'veal'] },
      { id: 'prd-18', keywords: ['مرغ', 'فیله مرغ', 'chicken', 'poultry'] },
      { id: 'prd-19', keywords: ['قزل‌آلا', 'قزل الا', 'ماهی تازه', 'trout', 'fresh fish'] },
      { id: 'prd-21', keywords: ['شوینده', 'لباسشویی', 'ظرفشویی', 'detergent', 'laundry'] },
      { id: 'prd-22', keywords: ['دستمال', 'کاغذی', 'حوله', 'tissue', 'paper towel'] },
      { id: 'prd-23', keywords: ['کرم', 'بالم', 'پوست', 'کالندولا', 'balm', 'cream', 'skin'] },
      { id: 'prd-24', keywords: ['آب معدنی', 'قرص', 'مکمل', 'water', 'organizer', 'mineral'] },
    ];

    productKeywordMap.forEach(({ id, keywords }) => {
      if (keywords.some((kw) => text.includes(kw))) {
        const prod = productsCatalog.find((p) => p.id === id);
        if (prod) {
          onUpdateProductQuantity(prod, defaultQty);
          addedLabels.push(isFa ? prod.nameFa : prod.name);
        }
      }
    });

    const serviceKeywordMap: { id: string; keywords: string[] }[] = [
      {
        id: 'asa-h-01',
        keywords: ['خرید منزل', 'خرید سفارشی', 'آسا همراه خرید', 'grocery shopping', 'errand', 'custom shopping'],
      },
      {
        id: 'asa-h-02',
        keywords: ['فرودگاه', 'امام خمینی', 'مهرآباد', 'پرواز', 'airport', 'flight', 'transfer'],
      },
      {
        id: 'asa-h-03',
        keywords: ['همراهی روزمره', 'کارهای روزمره', 'چیدمان', 'اداری', 'companionship', 'daily tasks'],
      },
      {
        id: 'asa-h-04',
        keywords: ['گل', 'شیرینی', 'هدیه', 'تولد', 'مناسبت', 'روز مادر', 'flowers', 'gift', 'occasion'],
      },
      {
        id: 'asa-k-01',
        keywords: ['برنامه غذایی', 'غذای هفتگی', 'پکیج غذا', 'آسا خوراک', 'meal plan', 'weekly meal'],
      },
      {
        id: 'asa-p-01',
        keywords: ['همراهی پزشک', 'مطب', 'کلینیک', 'آسا پزشک', 'ویزیت', 'doctor visit', 'accompaniment', 'clinic'],
      },
      {
        id: 'asa-p-02',
        keywords: ['نوبت پزشک', 'نوبت‌گیری', 'وقت دکتر', 'appointment booking', 'schedule doctor'],
      },
      {
        id: 'asa-p-03',
        keywords: ['جواب آزمایش', 'ام آر آی', 'آزمایشگاه', 'سی تی اسکن', 'lab report', 'mri', 'diagnostic'],
      },
    ];

    serviceKeywordMap.forEach(({ id, keywords }) => {
      if (keywords.some((kw) => text.includes(kw))) {
        const srv = servicesCatalog.find((s) => s.id === id);
        if (srv && !srv.isComingSoon) {
          if (!selectedServices.some((existing) => existing.id === srv.id) && onAddService) {
            onAddService(srv);
          }
          addedLabels.push(isFa ? srv.titleFa : srv.title);
        }
      }
    });

    if (addedLabels.length > 0) {
      setVoiceMatchedItems(addedLabels);
      setVoiceStatusMessage(
        isFa
          ? `${addedLabels.length.toLocaleString('fa-IR')} مورد از فرمان صوتی شما به سبد اضافه شد.`
          : `Added ${addedLabels.length} item(s)/service(s) from your voice request.`
      );
    } else {
      setSpecialInstructions((prev) =>
        prev ? `${prev} · ${rawText}` : rawText
      );
      setVoiceStatusMessage(
        isFa
          ? 'درخواست صوتی شما در کادر «دستورات ویژه و رژیم غذایی» ثبت شد.'
          : 'Your spoken note was added to Special Instructions & Dietary Requirements.'
      );
    }
  };

  const startVoiceRecognition = async () => {
    setVoiceStatusMessage(null);
    setVoiceMatchedItems([]);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 32;
          source.connect(analyser);
          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const updateLevels = () => {
            analyser.getByteFrequencyData(dataArray);
            const bars = Array.from({ length: 7 }, (_, i) => {
              const val = dataArray[i] || 20;
              return Math.max(18, Math.min(100, Math.round((val / 255) * 100)));
            });
            setMicAudioLevels(bars);
            animFrameRef.current = requestAnimationFrame(updateLevels);
          };
          updateLevels();
        }
      }
    } catch {
      // fallback gracefully
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsListening(true);
      setVoiceStatusMessage(
        isFa
          ? 'میکروفون فعال است؛ عبارت خود را بگویید یا روی نمونه‌های زیر کلیک کنید.'
          : 'Microphone active; speak or click a sample voice command below.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = isFa ? 'fa-IR' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceStatusMessage(
          isFa
            ? 'در حال شنیدن صدای شما... (نام کالا، خدمت یا رژیم غذایی را بگویید)'
            : 'Listening... Speak your groceries, services, or dietary notes.'
        );
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let interim = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const chunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += chunk;
          } else {
            interim += chunk;
          }
        }
        const combined = finalTranscript || interim;
        setVoiceTranscript(combined);
        if (finalTranscript) {
          processSpokenOrderText(finalTranscript);
        }
      };

      recognition.onerror = () => {
        stopMicrophoneAnalyzer();
        setIsListening(false);
        setVoiceStatusMessage(t('errors.microphoneFallback'));
      };

      recognition.onend = () => {
        stopMicrophoneAnalyzer();
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      stopMicrophoneAnalyzer();
      setIsListening(false);
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    stopMicrophoneAnalyzer();
    setIsListening(false);
    if (voiceTranscript.trim()) {
      processSpokenOrderText(voiceTranscript);
    }
  };

  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const groceriesPassThroughTotal = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const asaGroceryCoordinationFee =
    cartProducts.length > 0 && selectedServices.length === 0 ? 12 : 0;

  const totalAsaServiceFee = servicesTotal + asaGroceryCoordinationFee;
  const grandTotal = groceriesPassThroughTotal + totalAsaServiceFee;

  const activeGatewayObj =
    paymentGateways.find((g) => g.id === selectedGatewayId) || paymentGateways[0];

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0 && cartProducts.length === 0) {
      setOrderError(t('errors.emptyBasket'));
      return;
    }
    if (!consentChecked) {
      setOrderError(t('errors.consentRequired'));
      return;
    }
    setOrderError(null);

    const randomRef = `ASA-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(randomRef);
    setOrderSubmitted(true);

    const selectedZone = TEHRAN_SERVICE_ZONES.find((z) => z.id === tehranZoneId);
    const fullLocation = residenceAddress
      ? `${isFa ? selectedZone?.nameFa : selectedZone?.nameEn} — ${residenceAddress}`
      : isFa
      ? selectedZone?.nameFa || 'تهران، زعفرانیه'
      : selectedZone?.nameEn || 'Tehran, Zafaranieh';

    if (onOrderDispatched) {
      onOrderDispatched({
        referenceCode: randomRef,
        residenceAddress: fullLocation,
        deliveryWindow,
        recipientName: recipientName || (isFa ? 'والدین گرامی' : 'Family Recipient'),
        substitutionRule,
        specialInstructions,
        selectedGatewayId,
        personalMessageCard,
        hasVoiceNote: hasParentVoiceNote,
        passThroughTotalUsd: groceriesPassThroughTotal,
        asaServiceFeeUsd: totalAsaServiceFee,
      });
    }
  };

  const handleDownloadConfirmationDossier = () => {
    const selectedZone = TEHRAN_SERVICE_ZONES.find((z) => z.id === tehranZoneId);
    const fullLocation = residenceAddress
      ? `${isFa ? selectedZone?.nameFa : selectedZone?.nameEn} — ${residenceAddress}`
      : isFa
      ? selectedZone?.nameFa || 'تهران، زعفرانیه'
      : selectedZone?.nameEn || 'Tehran, Zafaranieh';

    const summaryRows = [
      ...selectedServices.map((s) => ({
        title: isFa ? s.titleFa : s.title,
        qtyOrType: isFa ? 'خدمت تخصصی آسا' : 'Asa Service',
        priceFormatted: formatPrice(s.price, lang, '', '', currency).amount,
      })),
      ...cartProducts.map(({ product, quantity }) => ({
        title: isFa ? product.nameFa : product.name,
        qtyOrType: isFa
          ? `${quantity.toLocaleString('fa-IR')} × ${product.unitSizeFa}`
          : `${quantity} × ${product.unitSize}`,
        priceFormatted: formatPrice(product.price * quantity, lang, '', '', currency).amount,
      })),
    ];

    downloadOfficialAsaDossier({
      referenceCode: referenceCode || 'ASA-849201',
      recipientName: recipientName || (isFa ? 'والدین گرامی' : 'Family Recipient'),
      residenceAddress: fullLocation,
      deliveryWindow,
      passThroughTotalUsd: groceriesPassThroughTotal,
      asaServiceFeeUsd: totalAsaServiceFee,
      grandTotalUsd: grandTotal,
      gatewayName: activeGatewayObj
        ? isFa
          ? activeGatewayObj.nameFa
          : activeGatewayObj.nameEn
        : 'ASA Verified Gateway',
      specialInstructions,
      personalMessageCard,
      hasVoiceNote: hasParentVoiceNote,
      itemsSummary: summaryRows,
      stageLabel: isFa ? 'ثبت و تایید رسمی سفارش' : 'Confirmed & Scheduled',
      lang,
      currency,
    });
  };

  const handleResetAndClose = () => {
    setOrderSubmitted(false);
    onClearAll();
    onClose();
  };

  const sampleVoiceCommands = isFa
    ? [
        'دو تا نان سنگک داغ، پنیر لیقوان و سبد میوه دماوند',
        'خورشت قورمه‌سبزی کم‌نمک و همراهی پزشک',
      ]
    : [
        'Add 2 Sangak breads, Lighvan cheese, and Damavand fruit',
        'Low-sodium Ghormeh Sabzi and doctor visit accompaniment',
      ];

  const currencies: CurrencyCode[] = ['USD', 'EUR', 'IRR'];
  const enabledGateways = paymentGateways.filter((g) => g.enabled);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: isFa ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isFa ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className={`fixed top-0 ${
              isFa ? 'left-0 border-r' : 'right-0 border-l'
            } z-50 h-full w-full max-w-xl bg-[#111412] border-[#C8A96A]/35 shadow-2xl flex flex-col justify-between overflow-hidden`}
          >
            {/* Drawer Header with Brand Motto, Reorder from Last & Currency Switcher */}
            <div className="p-4 sm:p-6 border-b border-white/10 bg-[#151816] space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8A96A] mb-0.5">
                    {isFa
                      ? 'آسـا · آسایش · سهولت · آرامش'
                      : 'ASA · COMFORT · EASE · PEACE OF MIND'}
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB]">
                    {isFa ? 'سبد سفارش و درگاه پرداخت آسا' : 'Asa Family Care Order & Checkout'}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Reorder from Last Button inside Order Drawer */}
                  {lastOrder && (
                    <button
                      type="button"
                      onClick={handleTriggerReorder}
                      className={`px-3 py-1.5 text-xs border flex items-center gap-1.5 transition-all cursor-pointer ${
                        reorderFeedback
                          ? 'bg-[#3E7B5E] text-[#F5F2EB] border-[#3E7B5E]'
                          : 'bg-[#0D0F0E] text-[#C8A96A] border-[#C8A96A]/45 hover:bg-[#C8A96A] hover:text-[#0D0F0E]'
                      }`}
                    >
                      {reorderFeedback ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{isFa ? 'سفارش قبلی بازیابی شد' : 'Restored!'}</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{isFa ? 'تکرار آخرین سفارش' : 'Reorder from Last'}</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={onClose}
                    aria-label="Close ledger"
                    className="w-9 h-9 border border-white/15 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] hover:border-[#C8A96A] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Currency Toggle inside Drawer */}
              {onSelectCurrency && (
                <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0D0F0E] border border-white/10 px-3 py-2 text-xs">
                  <span className="text-[#9E988E] flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-[#C8A96A]" />
                    <span>
                      {isFa ? 'واحد نمایش قیمت:' : 'Display Currency:'}
                    </span>
                  </span>
                  <div className="flex items-center gap-1">
                    {currencies.map((code) => {
                      const active = currency === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => onSelectCurrency(code)}
                          className={`px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#C8A96A] text-[#0D0F0E] font-bold'
                              : 'text-[#9E988E] hover:text-[#F5F2EB]'
                          }`}
                        >
                          {code === 'IRR' ? (isFa ? 'ریال (IRR)' : 'IRR') : code}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Voice-to-Text Microphone API Assistant Module */}
              {!orderSubmitted && (
                <div className="bg-gradient-to-b from-[#1A1F1C] to-[#141715] border border-[#C8A96A]/45 p-4 shadow-md">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <span className="text-xs text-[#C8A96A] font-semibold flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4" />
                      <span>
                        {isFa
                          ? 'افزودن صوتی با میکروفون (Voice-to-Cart)'
                          : 'Speak Your Order (Voice-to-Cart)'}
                      </span>
                    </span>

                    <button
                      type="button"
                      onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                      className={`px-3.5 py-2 text-xs uppercase tracking-[0.12em] font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border ${
                        isListening
                          ? 'bg-[#C85A5A] text-[#F5F2EB] border-[#C85A5A] animate-pulse'
                          : 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] hover:bg-[#DFC48D]'
                      }`}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-3.5 h-3.5" />
                          <span>{isFa ? 'پایان ضبط' : 'Stop Mic'}</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5" />
                          <span>{isFa ? 'شروع صحبت' : 'Speak'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isListening && (
                    <div className="flex items-center justify-center gap-1.5 h-8 bg-[#0D0F0E] border border-[#C8A96A]/30 px-4 mb-2.5">
                      <span className="text-[11px] text-[#C8A96A] me-2">
                        {isFa ? 'دریافت صدا:' : 'Mic Active:'}
                      </span>
                      {micAudioLevels.map((lvl, idx) => (
                        <motion.span
                          key={idx}
                          animate={{ height: `${lvl}%` }}
                          transition={{ duration: 0.1 }}
                          className="w-1 bg-[#C8A96A] inline-block"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={voiceTranscript}
                      onChange={(e) => setVoiceTranscript(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          processSpokenOrderText(voiceTranscript);
                        }
                      }}
                      placeholder={
                        isFa
                          ? 'بگویید یا بنویسید: «نان سنگک، پنیر لیقوان، همراهی پزشک»...'
                          : 'Speak or type: "Sangak bread, Lighvan cheese, doctor visit"...'
                      }
                      className="flex-1 bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] placeholder-[#9E988E]/60 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => processSpokenOrderText(voiceTranscript)}
                      className="px-3 py-2 bg-white/[0.08] hover:bg-[#C8A96A] text-[#F5F2EB] hover:text-[#0D0F0E] border border-white/15 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>{isFa ? 'افزودن' : 'Add'}</span>
                    </button>
                  </div>

                  {/* Quick One-Tap Sample Voice Commands */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {sampleVoiceCommands.map((cmd, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setVoiceTranscript(cmd);
                          processSpokenOrderText(cmd);
                        }}
                        className="text-[10px] bg-[#0D0F0E] hover:bg-[#C8A96A]/15 text-[#9E988E] hover:text-[#C8A96A] border border-white/10 px-2 py-1 transition-colors cursor-pointer text-start"
                      >
                        + «{cmd}»
                      </button>
                    ))}
                  </div>

                  {voiceStatusMessage && (
                    <div className="mt-2.5 p-2.5 bg-[#0D0F0E] border border-[#3E7B5E]/60 text-xs">
                      <p className="text-[#C8A96A] font-medium flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#3E7B5E] shrink-0" />
                        <span>{voiceStatusMessage}</span>
                      </p>
                      {voiceMatchedItems.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1.5">
                          {voiceMatchedItems.map((itemLabel, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-[#2E5A44]/30 border border-[#3E7B5E]/50 text-[#F5F2EB] px-2 py-0.5"
                            >
                              + {itemLabel}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {orderSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#151816] border border-[#C8A96A]/50 p-6 text-center space-y-4"
                >
                  <div className="w-12 h-12 mx-auto bg-[#2E5A44]/30 border border-[#3E7B5E] flex items-center justify-center text-[#C8A96A]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#F5F2EB]">
                    {isFa
                      ? 'سفارش شما با موفقیت ثبت و تایید شد'
                      : 'Your Asa Order Has Been Scheduled'}
                  </h4>
                  <div className="bg-[#0D0F0E] border border-white/10 p-4 text-start space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#9E988E]">
                        {isFa ? 'کد پیگیری آسا:' : 'Reference:'}
                      </span>
                      <span className="font-mono text-[#C8A96A] font-semibold">
                        {referenceCode}
                      </span>
                    </div>
                    {activeGatewayObj && (
                      <div className="flex justify-between">
                        <span className="text-[#9E988E]">
                          {isFa ? 'درگاه پرداخت انتخاب‌شده:' : 'Payment Gateway:'}
                        </span>
                        <span className="text-[#F5F2EB] font-medium">
                          {isFa ? activeGatewayObj.nameFa : activeGatewayObj.nameEn}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#9E988E]">
                        {isFa ? 'هزینه کالا (طبق فاکتور):' : 'Pass-Through Goods:'}
                      </span>
                      <span className="font-mono text-[#F5F2EB]">
                        {formatPrice(groceriesPassThroughTotal, lang, '', '', currency).amount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9E988E]">
                        {isFa ? 'کارمزد خدمات آسا:' : 'Asa Service Fee:'}
                      </span>
                      <span className="font-mono text-[#C8A96A]">
                        {formatPrice(totalAsaServiceFee, lang, '', '', currency).amount}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10">
                      <span className="text-[#F5F2EB] font-semibold">
                        {isFa ? 'مجموع کل:' : 'Total:'}
                      </span>
                      <span className="font-mono text-[#C8A96A] font-semibold">
                        {formatPrice(grandTotal, lang, '', '', currency).amount}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadConfirmationDossier}
                      className="w-full py-3 bg-[#0D0F0E] hover:bg-[#C8A96A]/15 text-[#C8A96A] border border-[#C8A96A] text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {isFa
                          ? 'دانلود نسخه رسمی فاکتور و پرونده سفارش (PDF/Print)'
                          : 'Download Official PDF Dossier & Receipt'}
                      </span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {onOpenTracking && (
                        <button
                          onClick={() => {
                            setOrderSubmitted(false);
                            onClearAll();
                            onOpenTracking();
                          }}
                          className="w-full py-3 bg-[#2E5A44] text-[#F5F2EB] border border-[#3E7B5E] text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Activity className="w-4 h-4" />
                          <span>{isFa ? 'رهگیری زنده سفارش' : 'Live Tracker'}</span>
                        </button>
                      )}
                      <button
                        onClick={handleResetAndClose}
                        className="w-full py-3 bg-[#C8A96A] text-[#0D0F0E] text-xs uppercase tracking-[0.14em] font-semibold cursor-pointer"
                      >
                        {isFa ? 'بازگشت به سایت' : 'Done'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : selectedServices.length === 0 && cartProducts.length === 0 ? (
                <div className="py-10 text-center space-y-4">
                  <Sparkles className="w-7 h-7 text-[#C8A96A] mx-auto opacity-75" />
                  <h4 className="font-serif text-xl text-[#F5F2EB]">
                    {isFa ? 'سبد سفارش شما خالی است' : 'Your Order Portfolio Is Empty'}
                  </h4>
                  <p className="text-xs text-[#9E988E] max-w-xs mx-auto">
                    {isFa
                      ? 'با میکروفون بالا سفارش خود را بگویید، از صفحه انتخاب کنید، یا آخرین سفارش خود را با یک کلیک تکرار نمایید.'
                      : 'Speak your order above, select items from the page, or reorder your previous basket in one click.'}
                  </p>
                  {lastOrder && (
                    <button
                      type="button"
                      onClick={handleTriggerReorder}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.14em] font-semibold cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>
                        {isFa
                          ? `تکرار آخرین سفارش (${lastOrder.referenceCode})`
                          : `Reorder Last Basket (${lastOrder.referenceCode})`}
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* 1. Reserved Asa Services */}
                  {selectedServices.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <h4 className="text-xs uppercase tracking-[0.14em] text-[#C8A96A] font-semibold">
                          {isFa
                            ? `خدمات آسا (${selectedServices.length.toLocaleString('fa-IR')})`
                            : `Asa Services (${selectedServices.length})`}
                        </h4>
                        <span className="font-mono text-xs text-[#F5F2EB]">
                          {formatPrice(servicesTotal, lang, '', '', currency).amount}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {selectedServices.map((srv) => (
                          <div
                            key={srv.id}
                            className="bg-[#151816] border border-white/10 p-3 flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <p className="font-serif text-sm sm:text-base text-[#F5F2EB] truncate">
                                {isFa ? srv.titleFa : srv.title}
                              </p>
                              <p className="text-[11px] text-[#C8A96A] font-mono">
                                {formatPrice(srv.price, lang, '', '', currency).amount}
                              </p>
                            </div>
                            <button
                              onClick={() => onRemoveService(srv.id)}
                              aria-label="Remove service"
                              className="text-[#9E988E] hover:text-[#C85A5A] p-1.5 transition-colors cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Supermarket & Asa Khoraak Provisions */}
                  {cartProducts.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <h4 className="text-xs uppercase tracking-[0.14em] text-[#C8A96A] font-semibold">
                          {isFa
                            ? `اقلام سوپرمارکت (${cartProducts.length.toLocaleString('fa-IR')})`
                            : `Market Items (${cartProducts.length})`}
                        </h4>
                        <span className="font-mono text-xs text-[#F5F2EB]">
                          {formatPrice(groceriesPassThroughTotal, lang, '', '', currency).amount}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {cartProducts.map(({ product, quantity }) => (
                          <div
                            key={product.id}
                            className="bg-[#151816] border border-white/10 p-2.5 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={product.image}
                                alt={isFa ? product.nameFa : product.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-cover shrink-0 border border-white/10"
                              />
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm text-[#F5F2EB] truncate">
                                  {isFa ? product.nameFa : product.name}
                                </p>
                                <p className="text-[11px] text-[#9E988E] font-mono">
                                  {formatPrice(product.price, lang, '', '', currency).amount} ×{' '}
                                  {isFa ? quantity.toLocaleString('fa-IR') : quantity}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center border border-white/15 bg-[#0D0F0E] shrink-0">
                              <button
                                onClick={() => onUpdateProductQuantity(product, -1)}
                                className="w-6 h-6 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center font-mono text-xs text-[#F5F2EB]">
                                {isFa ? quantity.toLocaleString('fa-IR') : quantity}
                              </span>
                              <button
                                onClick={() => onUpdateProductQuantity(product, 1)}
                                className="w-6 h-6 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Special Instructions, Dietary Requirements & Dispatch Form */}
                  <form
                    id="dispatch-order-form"
                    onSubmit={handleConfirmOrder}
                    className="space-y-4 pt-4 border-t border-white/10"
                  >
                    {/* NEW: Dedicated Special Instructions & Dietary Requirements Textarea */}
                    <div className="bg-[#151816] border border-[#C8A96A]/40 p-3.5 space-y-2.5">
                      <label
                        htmlFor="asa-special-dietary-notes"
                        className="text-xs uppercase tracking-[0.13em] text-[#C8A96A] font-semibold flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>
                          {isFa
                            ? 'دستورات ویژه، رژیم غذایی والدین یا ملاحظات خرید'
                            : 'Special Instructions & Dietary Requirements'}
                        </span>
                      </label>
                      <textarea
                        id="asa-special-dietary-notes"
                        rows={2}
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder={
                          isFa
                            ? 'ملاحظات تغذیه‌ای (مثلاً بدون نمک، کم‌چرب، حساسیت غذایی)، نحوه دست‌چین میوه یا ساعت تماس با والدین را بنویسید...'
                            : 'Enter dietary restrictions (low-sodium, diabetic-friendly), fruit ripeness preferences, or doorbell instructions...'
                        }
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] p-2.5 text-xs text-[#F5F2EB] placeholder-[#9E988E]/60 outline-none resize-none"
                      />
                      {/* Quick-Insert Dietary & Care Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {DIETARY_QUICK_CHIPS.map((chip, idx) => {
                          const text = isFa ? chip.fa : chip.en;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() =>
                                setSpecialInstructions((prev) =>
                                  prev.includes(text)
                                    ? prev
                                    : prev
                                    ? `${prev} · ${text}`
                                    : text
                                )
                              }
                              className="text-[10px] bg-[#0D0F0E] hover:bg-[#C8A96A]/15 text-[#9E988E] hover:text-[#C8A96A] border border-white/10 px-2 py-1 transition-colors cursor-pointer"
                            >
                              + {text}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* NEW: Personal Calligraphy Greeting Card & 30-Second Voice Note for Parents */}
                    <div className="bg-gradient-to-b from-[#191E1B] to-[#141715] border border-[#C8A96A]/45 p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-[#C8A96A] font-semibold flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          <span>
                            {isFa
                              ? 'کارت تبریک خوشنویسی در پاکت طلاکوب و پیام صوتی برای والدین'
                              : 'Personal Calligraphy Card & 30s Voice Note for Parents'}
                          </span>
                        </span>
                        <span className="text-[10px] text-[#3E7B5E] font-mono">
                          {isFa ? 'هدیه رایگان آسا' : 'Complimentary'}
                        </span>
                      </div>

                      <textarea
                        rows={2}
                        value={personalMessageCard}
                        onChange={(e) => setPersonalMessageCard(e.target.value)}
                        placeholder={
                          isFa
                            ? 'پیام محبت‌آمیز خود را بنویسید تا با خط خوشنویسی در پاکت طلاکوب همراه سفارش تقدیم والدین شود...'
                            : 'Write a personal greeting card message to be delivered in a gold-embossed envelope...'
                        }
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] p-2.5 text-xs text-[#F5F2EB] placeholder-[#9E988E]/60 outline-none resize-none"
                      />

                      <div className="flex items-center justify-between gap-2 bg-[#0D0F0E] border border-white/10 px-3 py-2 text-xs">
                        <span className="text-[#9E988E] flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-[#C8A96A]" />
                          <span>
                            {isRecordingParentVoice
                              ? isFa
                                ? `در حال ضبط پیام صوتی برای والدین (${parentVoiceSeconds} ثانیه)...`
                                : `Recording 30s voice note (${parentVoiceSeconds}s)...`
                              : hasParentVoiceNote
                              ? isFa
                                ? `پیام صوتی شما (${parentVoiceSeconds || 12} ثانیه) ضمیمه پرونده شد.`
                                : `Personal voice note (${parentVoiceSeconds || 12}s) attached.`
                              : isFa
                              ? 'ضبط پیام صوتی ۳۰ ثانیه‌ای برای پخش هنگام تحویل:'
                              : 'Record a 30s voice message for steward playback:'}
                          </span>
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            if (isRecordingParentVoice) {
                              setIsRecordingParentVoice(false);
                              setHasParentVoiceNote(true);
                            } else {
                              setParentVoiceSeconds(0);
                              setHasParentVoiceNote(false);
                              setIsRecordingParentVoice(true);
                            }
                          }}
                          className={`px-2.5 py-1 text-[11px] font-semibold flex items-center gap-1 cursor-pointer shrink-0 ${
                            isRecordingParentVoice
                              ? 'bg-[#C85A5A] text-[#F5F2EB]'
                              : hasParentVoiceNote
                              ? 'bg-[#3E7B5E] text-[#F5F2EB]'
                              : 'bg-[#C8A96A]/20 text-[#C8A96A] border border-[#C8A96A]/50 hover:bg-[#C8A96A] hover:text-[#0D0F0E]'
                          }`}
                        >
                          <Mic className="w-3 h-3" />
                          <span>
                            {isRecordingParentVoice
                              ? isFa
                                ? 'توقف و ذخیره'
                                : 'Stop & Save'
                              : hasParentVoiceNote
                              ? isFa
                                ? 'ضبط مجدد'
                                : 'Re-record'
                              : isFa
                              ? 'ضبط صدا'
                              : 'Record 30s'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Recipient & Address Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={isFa ? 'نام شما (سفارش‌دهنده)' : 'Your Name'}
                        className="w-full bg-[#151816] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-xs sm:text-sm text-[#F5F2EB] outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder={isFa ? 'نام والدین / گیرنده' : 'Recipient Name'}
                        className="w-full bg-[#151816] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-xs sm:text-sm text-[#F5F2EB] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <select
                        value={tehranZoneId}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.startsWith('waitlist:')) {
                            const distCode = val.replace('waitlist:', '');
                            if (onOpenWaitlistModal) {
                              onOpenWaitlistModal(distCode);
                            }
                            return;
                          }
                          setTehranZoneId(val);
                        }}
                        className="w-full bg-[#151816] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-xs sm:text-sm text-[#F5F2EB] outline-none"
                      >
                        <optgroup
                          label={
                            isFa
                              ? 'مناطق فعال فعلی (تهران — مناطق ۱ تا ۶)'
                              : 'Currently Active Districts (Tehran Districts 1–6)'
                          }
                        >
                          {TEHRAN_SERVICE_ZONES.map((z) => (
                            <option key={z.id} value={z.id}>
                              {isFa
                                ? `${z.districtFa} — ${z.nameFa}`
                                : `${z.districtEn} — ${z.nameEn}`}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup
                          label={
                            isFa
                              ? 'مناطق در حال افتتاح (ثبت در فهرست انتظار اولویت‌دار)'
                              : 'Expanding Soon (Click to Join Priority Waitlist)'
                          }
                        >
                          {EXPANSION_TEHRAN_DISTRICTS.map((dist) => (
                            <option
                              key={dist.code}
                              value={`waitlist:${dist.code}`}
                            >
                              {isFa
                                ? `⏳ ${dist.nameFa} (ثبت در فهرست انتظار)`
                                : `⏳ ${dist.nameEn} (Join Waitlist)`}
                            </option>
                          ))}
                        </optgroup>
                      </select>

                      {onOpenWaitlistModal && (
                        <button
                          type="button"
                          onClick={() => onOpenWaitlistModal()}
                          className="w-full text-start px-2.5 py-1.5 bg-[#151816]/90 border border-[#C8A96A]/35 hover:border-[#C8A96A] text-[11px] text-[#C8A96A] flex items-center justify-between gap-2 transition-colors cursor-pointer"
                        >
                          <span>
                            {isFa
                              ? 'محله والدین شما خارج از مناطق ۱ تا ۶ است؟ ثبت در فهرست انتظار افتتاح محله'
                              : 'District not yet serviced? Join the Priority Neighborhood Waitlist'}
                          </span>
                          <span className="font-mono text-[10px] bg-[#C8A96A]/15 px-1.5 py-0.5 text-[#F5F2EB] shrink-0">
                            {isFa ? '+۱۵٪ هدیه' : '+15% Privilege'}
                          </span>
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      required
                      value={residenceAddress}
                      onChange={(e) => setResidenceAddress(e.target.value)}
                      placeholder={
                        isFa
                          ? 'نشانی دقیق منزل و شماره تلفن والدین'
                          : 'Full street address & recipient phone'
                      }
                      className="w-full bg-[#151816] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-xs sm:text-sm text-[#F5F2EB] outline-none"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        value={deliveryWindow}
                        onChange={(e) => setDeliveryWindow(e.target.value)}
                        className="w-full bg-[#151816] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                      >
                        <option value="Today · Afternoon Slot (2:00 PM – 5:00 PM)">
                          {isFa ? 'امروز بعدازظهر (۱۴ تا ۱۷)' : 'Today Afternoon (2–5 PM)'}
                        </option>
                        <option value="Tomorrow · Morning Slot (9:30 AM – 12:30 PM)">
                          {isFa ? 'فردا صبح (۹:۳۰ تا ۱۲:۳۰)' : 'Tomorrow Morning (9:30–12:30)'}
                        </option>
                        <option value="Scheduled Weekly Recurring Care Plan">
                          {isFa ? 'برنامه منظم هفتگی' : 'Weekly Recurring Plan'}
                        </option>
                      </select>

                      <select
                        value={substitutionRule}
                        onChange={(e) => setSubstitutionRule(e.target.value)}
                        className="w-full bg-[#151816] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                      >
                        <option value="replace-closest-grade-a">
                          {isFa ? 'جایگزینی با برند درجه یک مشابه' : 'Replace with closest Grade-A'}
                        </option>
                        <option value="call-approver-first">
                          {isFa ? 'هماهنگی تلفنی پیش از جایگزینی' : 'Call/message me first'}
                        </option>
                        <option value="omit-item-refund">
                          {isFa ? 'حذف قلم ناموجود از فاکتور' : 'Omit unavailable item'}
                        </option>
                      </select>
                    </div>

                    {/* NEW: 3 Prepared Payment Gateways Selector */}
                    {enabledGateways.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-xs uppercase tracking-[0.14em] text-[#C8A96A] font-semibold flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>
                            {isFa
                              ? 'انتخاب درگاه پرداخت (۳ درگاه آماده اتصال)'
                              : 'Select Payment Gateway (3 Gateways Prepared)'}
                          </span>
                        </span>

                        <div className="space-y-2">
                          {enabledGateways.map((gw) => {
                            const selected = gw.id === selectedGatewayId;
                            return (
                              <button
                                key={gw.id}
                                type="button"
                                onClick={() => setSelectedGatewayId(gw.id)}
                                className={`w-full p-3 text-start border transition-all cursor-pointer flex flex-col gap-1 ${
                                  selected
                                    ? 'bg-[#C8A96A]/15 border-[#C8A96A] text-[#F5F2EB]'
                                    : 'bg-[#151816] border-white/10 text-[#9E988E] hover:border-white/25'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-semibold text-[#F5F2EB] flex items-center gap-1.5">
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        selected ? 'bg-[#C8A96A]' : 'bg-white/25'
                                      }`}
                                    />
                                    <span>{isFa ? gw.nameFa : gw.nameEn}</span>
                                  </span>
                                  <span className="text-[10px] font-mono text-[#C8A96A] bg-[#0D0F0E] px-2 py-0.5 border border-[#C8A96A]/30">
                                    {isFa ? gw.badgeFa : gw.badgeEn}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#9E988E] ps-3.5">
                                  {isFa ? gw.instructionsFa : gw.instructionsEn}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <label className="flex items-start gap-2 bg-[#151816] border border-[#C8A96A]/30 p-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="mt-0.5 accent-[#C8A96A]"
                      />
                      <span className="text-[11px] text-[#F5F2EB]/90 leading-relaxed">
                        {isFa
                          ? 'تایید اطلاع خانواده، ارسال گزارش واقعی خانواده و ماهیت غیربالینی خدمات آسا.'
                          : 'I confirm recipient consent for this non-clinical service & Family Update.'}
                      </span>
                    </label>
                  </form>
                </>
              )}
            </div>

            {/* Drawer Footer Summary with Multi-Currency Breakdown */}
            {!orderSubmitted && (selectedServices.length > 0 || cartProducts.length > 0) && (
              <div className="p-4 sm:p-6 bg-[#151816] border-t border-white/10 space-y-3.5">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[#9E988E]">
                    <span>
                      {isFa
                        ? 'بهای خالص کالا (طبق فاکتور رسمی فروشگاه):'
                        : 'Pass-Through Store Goods:'}
                    </span>
                    <span className="font-mono text-[#F5F2EB]">
                      {formatPrice(groceriesPassThroughTotal, lang, '', '', currency).amount}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#9E988E]">
                    <span>
                      {isFa ? 'کارمزد خدمات و هماهنگی آسا:' : 'Asa Service & Coordination Fee:'}
                    </span>
                    <span className="font-mono text-[#C8A96A]">
                      {formatPrice(totalAsaServiceFee, lang, '', '', currency).amount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#F5F2EB] pt-2 border-t border-white/10">
                    <span>
                      {isFa ? 'مجموع کل تخمینی:' : 'Estimated Total:'}
                    </span>
                    <span className="font-mono text-base sm:text-lg text-[#C8A96A]">
                      {formatPrice(grandTotal, lang, '', '', currency).amount}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#9E988E]">
                    {isFa
                      ? CURRENCY_META[currency].rateNoteFa
                      : CURRENCY_META[currency].rateNoteEn}
                  </p>
                </div>

                {orderError && (
                  <div className="p-2.5 bg-[#A63A3A]/20 border border-[#A63A3A] text-xs text-[#F5F2EB]">
                    {orderError}
                  </div>
                )}

                <button
                  type="submit"
                  form="dispatch-order-form"
                  className="w-full py-3.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {isFa
                      ? `پرداخت و ثبت نهایی (${
                          activeGatewayObj ? activeGatewayObj.code : 'ASA'
                        })`
                      : `Proceed & Dispatch (${
                          activeGatewayObj ? activeGatewayObj.code : 'ASA'
                        })`}
                  </span>
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
