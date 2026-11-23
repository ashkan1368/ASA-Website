import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown,
  Calculator,
  CalendarHeart,
  Receipt,
  Check,
  Sparkles,
  Plus,
  Eye,
  X,
  ShieldCheck,
  Gift,
  HeartHandshake,
} from 'lucide-react';
import {
  Language,
  CurrencyCode,
  formatPrice,
  BRAND_IMAGES,
} from '../data/catalogData';

export interface PeaceSubscriptionTier {
  id: 'tier-silver' | 'tier-gold' | 'tier-royal';
  badgeFa: string;
  badgeEn: string;
  nameFa: string;
  nameEn: string;
  subtitleFa: string;
  subtitleEn: string;
  regularMonthlyUsd: number;
  discountedMonthlyUsd: number; // 15% loyalty discount
  passThroughGroceryEstimateUsd: number;
  featuresFa: string[];
  featuresEn: string[];
  serviceIdsToEnroll: string[];
  productIdsToEnroll: Record<string, number>;
  recommended?: boolean;
}

export const PEACE_SUBSCRIPTION_TIERS: PeaceSubscriptionTier[] = [
  {
    id: 'tier-silver',
    badgeFa: 'پلن نقره‌ای · پایه آسایش',
    badgeEn: 'Silver Tier · Essential Care',
    nameFa: 'اشتراک نقره‌ای (همراهی هفتگی و خرید منزل)',
    nameEn: 'Silver Family Plan (Weekly Groceries & Check-In)',
    subtitleFa: 'مناسب والدین مستقل که به خرید هفتگی تازه و چیدمان منظم نیاز دارند',
    subtitleEn: 'Ideal for independent parents needing weekly fresh shopping & kitchen setup',
    regularMonthlyUsd: 140,
    discountedMonthlyUsd: 119,
    passThroughGroceryEstimateUsd: 95,
    featuresFa: [
      '۴ نوبت خرید سفارشی هفتگی «آسا همراه» با فاکتور رسمی (۰٪ سود کالا)',
      'ضدعفونی و چیدمان میوه، نان سنگک و لبنیات در یخچال والدین',
      '۱ نوبت هماهنگی نوبت پزشک یا پیگیری نسخه در ماه',
      '۴ گزارش مستند خانواده (Family Update) پس از هر مراجعه',
    ],
    featuresEn: [
      '4 Weekly Asa Hamrah custom grocery deliveries at store receipt price',
      'Sanitizing & organizing fruits, Sangak bread, and dairy inside the fridge',
      '1 Monthly Asa Pezeshk appointment booking or lab follow-up',
      '4 Documented Family Updates sent via Portal & WhatsApp',
    ],
    serviceIdsToEnroll: ['asa-h-01', 'asa-p-02'],
    productIdsToEnroll: { 'prd-05': 2, 'prd-09': 4, 'prd-10': 2 },
  },
  {
    id: 'tier-gold',
    badgeFa: 'پلن طلایی · محبوب‌ترین انتخاب خانواده‌ها',
    badgeEn: 'Gold Tier · Most Popular',
    nameFa: 'اشتراک طلایی (خرید هفتگی + آسا خوراک + آسا پزشک)',
    nameEn: 'Gold Family Plan (Groceries + Bi-Weekly Meals + Medical)',
    subtitleFa: 'پوشش جامع خرید منزل، بسته‌های غذای خانگی کم‌نمک و همراهی کامل پزشک',
    subtitleEn: 'Complete weekly groceries, bi-weekly low-sodium meals, and doctor accompaniment',
    regularMonthlyUsd: 240,
    discountedMonthlyUsd: 204,
    passThroughGroceryEstimateUsd: 165,
    featuresFa: [
      '۴ نوبت خرید هفتگی منزل با تطبیق ۱۰۰٪ فاکتور رسمی فروشگاه',
      'ارسال دوهفته‌یک‌بار پکیج غذاهای خانگی کم‌نمک «آسا خوراک»',
      '۱ نوبت همراهی کامل حضوری «آسا پزشک» تا مطب و کلینیک در ماه',
      '۱۵٪ تخفیف وفاداری اشتراک ماهانه + اولویت اعزام همراه ثابت',
    ],
    featuresEn: [
      '4 Weekly grocery deliveries with 100% store-receipt reconciliation',
      'Bi-weekly Asa Khoraak low-sodium home-style Persian meal packages',
      '1 Full door-to-door Asa Pezeshk medical visit accompaniment per month',
      '15% Loyalty discount + dedicated recurring family steward',
    ],
    serviceIdsToEnroll: ['asa-h-01', 'asa-k-01', 'asa-p-01'],
    productIdsToEnroll: { 'prd-01': 2, 'prd-03': 2, 'prd-05': 2, 'prd-09': 4 },
    recommended: true,
  },
  {
    id: 'tier-royal',
    badgeFa: 'پلن رویال خانواده · آرامش کامل ۳۶۰ درجه',
    badgeEn: 'Royal Family Plan · All-Inclusive VIP',
    nameFa: 'اشتراک رویال خانواده (پوشش کامل ۳ ستون آسا)',
    nameEn: 'Royal Family Plan (Full 3-Pillar Stewardship)',
    subtitleFa: 'ویژه والدینی که نیاز به برنامه غذایی هفتگی، همراهی مستمر و مراقبت ویژه دارند',
    subtitleEn: 'Full weekly meal plans, priority medical logistics, and VIP home readiness',
    regularMonthlyUsd: 360,
    discountedMonthlyUsd: 306,
    passThroughGroceryEstimateUsd: 240,
    featuresFa: [
      'برنامه غذایی کامل هفتگی «آسا خوراک» (ارسال ۲ نوبت تازه در هر هفته)',
      '۴ نوبت خرید سفارشی منزل و امور روزمره «آسا همراه»',
      '۲ نوبت همراهی کامل «آسا پزشک» + دریافت جواب آزمایش و MRI',
      'بسته هدیه گل و شیرینی فصلی رایگان + خط مستقیم رکسانا بختیاری',
    ],
    featuresEn: [
      'Weekly 7-Day Asa Khoraak fresh meal program (2 dispatches every week)',
      '4 Weekly Asa Hamrah custom shopping & practical errand windows',
      '2 Monthly Asa Pezeshk clinic accompaniments + diagnostic lab pickup',
      'Complimentary seasonal flower delivery + direct priority coordinator line',
    ],
    serviceIdsToEnroll: ['asa-h-01', 'asa-k-02', 'asa-p-01', 'asa-p-03'],
    productIdsToEnroll: { 'prd-01': 3, 'prd-02': 3, 'prd-05': 2, 'prd-15': 1 },
  },
];

export interface SavedFamilyOccasion {
  id: string;
  occasionTypeFa: string;
  occasionTypeEn: string;
  recipientName: string;
  dateLabel: string;
  giftBoxFa: string;
  giftBoxEn: string;
  calligraphyNote: string;
  priceUsd: number;
}

const INITIAL_OCCASIONS: SavedFamilyOccasion[] = [
  {
    id: 'occ-1',
    occasionTypeFa: 'روز مادر (ولادت حضرت فاطمه / Mother’s Day)',
    occasionTypeEn: 'Mother’s Day Special Tribute',
    recipientName: 'مادر عزیزم (خانم توران راد)',
    dateLabel: '2025-05-11',
    giftBoxFa: 'باکس گل ارکیده و رز هلندی + پسته و زعفران سرگل + شیرینی خشک قنادی',
    giftBoxEn: 'Dutch Rose & Orchid Box + Saffron & Pistachio + Fine Pastries',
    calligraphyNote: 'مادر عزیزم، هرچند دورم اما دلم همیشه کنار توست. روزت مبارک.',
    priceUsd: 54,
  },
  {
    id: 'occ-2',
    occasionTypeFa: 'شب یلدا (Yalda Night Family Box)',
    occasionTypeEn: 'Yalda Night Pomegranate & Nut Gift Crate',
    recipientName: 'پدر و مادر عزیزم',
    dateLabel: '2025-12-21',
    giftBoxFa: 'سبد انار دماوند، آجیل چهارمغز دست‌چین، فال حافظ طلاکوب و شیرینی تازه',
    giftBoxEn: 'Damavand Pomegranates, Grade-A Mixed Nuts, Gold Hafez Divan & Sweets',
    calligraphyNote: 'یلدایتان پر از لبخند، سلامتی و آرامش باد.',
    priceUsd: 62,
  },
];

interface FamilyPeaceSuiteProps {
  lang: Language;
  currency: CurrencyCode;
  onEnrollSubscription: (tier: PeaceSubscriptionTier) => void;
  onScheduleOccasionGift: (occasion: SavedFamilyOccasion) => void;
  onOpenParentProfile: () => void;
}

type SuiteTab = 'subscription' | 'calculator' | 'occasions' | 'proof';

export const FamilyPeaceSuite: React.FC<FamilyPeaceSuiteProps> = ({
  lang,
  currency,
  onEnrollSubscription,
  onScheduleOccasionGift,
  onOpenParentProfile,
}) => {
  const isFa = lang === 'fa';
  const [activeTab, setActiveTab] = useState<SuiteTab>('subscription');
  const [enrolledTierId, setEnrolledTierId] = useState<string | null>(null);

  // Zero-Markup Calculator State
  const [monthlyGrocerySpendUsd, setMonthlyGrocerySpendUsd] = useState<number>(180);
  const [visitsPerMonth, setVisitsPerMonth] = useState<number>(3);

  // Family Occasions State
  const [occasions, setOccasions] = useState<SavedFamilyOccasion[]>(INITIAL_OCCASIONS);
  const [newOccasionType, setNewOccasionType] = useState('تولد مادر / پدر (Parent’s Birthday)');
  const [newRecipient, setNewRecipient] = useState('');
  const [newDate, setNewDate] = useState('2025-06-15');
  const [newGiftPackage, setNewGiftPackage] = useState('باکس گل تازه + زعفران مثقالی + شیرینی ویژه (۵۴ دلار)');
  const [newCalligraphyText, setNewCalligraphyText] = useState('');
  const [scheduledOccasionId, setScheduledOccasionId] = useState<string | null>(null);

  // Transparency Proof Lightbox Modal State
  const [isProofLightboxOpen, setIsProofLightboxOpen] = useState(false);

  // Calculator math
  const informalHiddenMarkupUsd = Math.round(monthlyGrocerySpendUsd * 0.22); // 22% typical informal markup + FX spread
  const informalTaxiAndTipUsd = visitsPerMonth * 24;
  const informalTotalUsd =
    monthlyGrocerySpendUsd + informalHiddenMarkupUsd + informalTaxiAndTipUsd;

  const asaFlatServiceFeeUsd = visitsPerMonth * 18;
  const asaTotalUsd = monthlyGrocerySpendUsd + asaFlatServiceFeeUsd; // $0 grocery markup
  const netMonthlySavingsUsd = Math.max(12, informalTotalUsd - asaTotalUsd);

  const handleAddOccasion = (e: React.FormEvent) => {
    e.preventDefault();
    const created: SavedFamilyOccasion = {
      id: `occ-${Date.now()}`,
      occasionTypeFa: newOccasionType,
      occasionTypeEn: newOccasionType,
      recipientName: newRecipient.trim() || (isFa ? 'والدین گرامی' : 'Beloved Parents'),
      dateLabel: newDate,
      giftBoxFa: newGiftPackage,
      giftBoxEn: newGiftPackage,
      calligraphyNote:
        newCalligraphyText.trim() ||
        (isFa
          ? 'با بهترین آرزوهای سلامتی، دلخوشی و آرامش برای شما عزیزانم.'
          : 'With all my love and warmest wishes for your health and happiness.'),
      priceUsd: 54,
    };
    setOccasions([created, ...occasions]);
    setNewRecipient('');
    setNewCalligraphyText('');
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-14 max-w-[1440px] mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A96A] mb-2 font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>
              {isFa
                ? 'ابزارهای هوشمند برنامه‌ریزی و شفافیت مالی آسا (آسایش · سهولت · آرامش)'
                : 'ASA Smart Family Planning & Financial Transparency Suite'}
            </span>
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EB] leading-tight">
            {isFa ? (
              <>
                اشتراک ماهانه، تقویم مناسبت‌ها و{' '}
                <span className="italic font-normal text-[#C8A96A]">شفافیت ۱۰۰٪ فاکتور</span>
              </>
            ) : (
              <>
                Monthly Plans, Occasion Calendar &{' '}
                <span className="italic font-normal text-[#C8A96A]">Zero-Markup Proof</span>
              </>
            )}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenParentProfile}
            className="px-4 py-2.5 bg-[#151816] border border-[#C8A96A]/55 hover:bg-[#C8A96A] hover:text-[#0D0F0E] text-[#C8A96A] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>
              {isFa
                ? 'پرونده اختصاصی ذائقه و پزشکان والدین'
                : 'Parent Care Profile & Diet'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsProofLightboxOpen(true)}
            className="px-4 py-2.5 bg-[#2E5A44]/40 hover:bg-[#2E5A44] border border-[#3E7B5E] text-[#F5F2EB] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#C8A96A]" />
            <span>
              {isFa
                ? 'مشاهده نمونه فاکتور و چیدمان یخچال'
                : 'Inspect Sample Receipt & Fridge Setup'}
            </span>
          </button>
        </div>
      </div>

      {/* 4 Interactive Suite Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('subscription')}
          className={`p-3.5 text-start border transition-all flex items-center gap-3 cursor-pointer ${
            activeTab === 'subscription'
              ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] font-semibold shadow-lg'
              : 'bg-[#151816] text-[#F5F2EB] border-white/10 hover:border-[#C8A96A]/50'
          }`}
        >
          <Crown className="w-5 h-5 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider block opacity-80">
              {isFa ? '۱۵٪ تخفیف وفاداری' : '15% Loyalty Discount'}
            </span>
            <span className="text-xs sm:text-sm truncate block">
              {isFa ? '۱. اشتراک ماهانه آرامش' : '1. Monthly Subscriptions'}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('calculator')}
          className={`p-3.5 text-start border transition-all flex items-center gap-3 cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] font-semibold shadow-lg'
              : 'bg-[#151816] text-[#F5F2EB] border-white/10 hover:border-[#C8A96A]/50'
          }`}
        >
          <Calculator className="w-5 h-5 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider block opacity-80">
              {isFa ? '۰٪ سود پنهان روی کالا' : '0% Hidden Markup'}
            </span>
            <span className="text-xs sm:text-sm truncate block">
              {isFa ? '۲. ماشین‌حساب شفافیت مالی' : '2. Zero-Markup Calculator'}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('occasions')}
          className={`p-3.5 text-start border transition-all flex items-center gap-3 cursor-pointer ${
            activeTab === 'occasions'
              ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] font-semibold shadow-lg'
              : 'bg-[#151816] text-[#F5F2EB] border-white/10 hover:border-[#C8A96A]/50'
          }`}
        >
          <CalendarHeart className="w-5 h-5 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider block opacity-80">
              {isFa ? 'تولد · روز مادر · یلدا · نوروز' : 'Birthdays · Yalda · Nowruz'}
            </span>
            <span className="text-xs sm:text-sm truncate block">
              {isFa ? '۳. تقویم مناسبت‌های والدین' : '3. Family Occasions & Gifts'}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('proof')}
          className={`p-3.5 text-start border transition-all flex items-center gap-3 cursor-pointer ${
            activeTab === 'proof'
              ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] font-semibold shadow-lg'
              : 'bg-[#151816] text-[#F5F2EB] border-white/10 hover:border-[#C8A96A]/50'
          }`}
        >
          <Receipt className="w-5 h-5 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider block opacity-80">
              {isFa ? 'تطبیق فاکتور و چیدمان' : 'Receipt & Fridge Audit'}
            </span>
            <span className="text-xs sm:text-sm truncate block">
              {isFa ? '۴. گواهی تصویری و فاکتور' : '4. Transparency Lightbox'}
            </span>
          </div>
        </button>
      </div>

      {/* TAB 1: MONTHLY PEACE OF MIND SUBSCRIPTION TIERS */}
      {activeTab === 'subscription' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PEACE_SUBSCRIPTION_TIERS.map((tier) => {
            const isEnrolled = enrolledTierId === tier.id;
            const regFmt = formatPrice(tier.regularMonthlyUsd, lang, '', '', currency).amount;
            const discFmt = formatPrice(tier.discountedMonthlyUsd, lang, '', '', currency).amount;
            const passFmt = formatPrice(
              tier.passThroughGroceryEstimateUsd,
              lang,
              '',
              '',
              currency
            ).amount;

            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -6 }}
                className={`p-6 flex flex-col justify-between border transition-all ${
                  tier.recommended
                    ? 'bg-gradient-to-b from-[#1B211E] to-[#121614] border-2 border-[#C8A96A] shadow-[0_20px_50px_rgba(200,169,106,0.18)]'
                    : 'bg-[#151816] border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-[#C8A96A] font-semibold">
                      {isFa ? tier.badgeFa : tier.badgeEn}
                    </span>
                    <span className="text-[10px] font-mono bg-[#2E5A44]/40 border border-[#3E7B5E] text-[#F5F2EB] px-2 py-0.5">
                      {isFa ? '۱۵٪ تخفیف ماهانه' : 'Save 15%'}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#F5F2EB] mb-2">
                    {isFa ? tier.nameFa : tier.nameEn}
                  </h3>
                  <p className="text-xs text-[#9E988E] mb-4 leading-relaxed">
                    {isFa ? tier.subtitleFa : tier.subtitleEn}
                  </p>

                  <div className="bg-[#0D0F0E] border border-white/10 p-3.5 mb-4 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#9E988E]">
                        {isFa ? 'حق اشتراک خدمات آسا (با تخفیف ۱۵٪):' : 'Monthly Asa Fee (15% Off):'}
                      </span>
                      <div className="text-end">
                        <span className="text-[11px] text-[#9E988E] line-through me-1.5 font-mono">
                          {regFmt}
                        </span>
                        <span className="font-mono text-lg text-[#C8A96A] font-bold">
                          {discFmt}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#9E988E] pt-1 border-t border-white/5">
                      <span>
                        {isFa ? 'برآورد کالای سوپرمارکتی (طبق فاکتور):' : 'Est. Pass-Through Goods:'}
                      </span>
                      <span className="font-mono text-[#F5F2EB]">{passFmt}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {(isFa ? tier.featuresFa : tier.featuresEn).map((feat, i) => (
                      <li key={i} className="text-xs text-[#F5F2EB]/90 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C8A96A] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onEnrollSubscription(tier);
                    setEnrolledTierId(tier.id);
                    setTimeout(() => setEnrolledTierId(null), 2500);
                  }}
                  className={`w-full py-3 text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isEnrolled
                      ? 'bg-[#3E7B5E] text-[#F5F2EB]'
                      : 'bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E]'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>
                        {isFa ? 'به سبد سفارش اضافه شد!' : 'Enrolled in Order Drawer!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      <span>
                        {isFa
                          ? 'انتخاب و فعال‌سازی ۱-کلیکی اشتراک'
                          : '1-Click Enroll in Plan'}
                      </span>
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB 2: INTERACTIVE ZERO-MARKUP TRANSPARENCY CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="bg-[#151816] border border-[#C8A96A]/45 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold block mb-1">
                {isFa
                  ? 'مقایسه شفافیت مالی آسا با روش‌های سنتی و واسطه‌ای'
                  : 'Financial Transparency Audit · 0% Grocery Markup'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB]">
                {isFa
                  ? 'ماشین‌حساب شفافیت مالی (۰٪ سود پنهان روی کالاها)'
                  : 'Zero-Markup Transparency Calculator'}
              </h3>
              <p className="text-xs sm:text-sm text-[#9E988E] mt-2 leading-relaxed">
                {isFa
                  ? 'در روش‌های غیررسمی یا پلتفرم‌های واسطه، معمولاً ۱۸٪ تا ۲۵٪ به قیمت اقلام سوپرمارکتی و نرخ تبدیل ارز اضافه می‌شود. در آسا، شما دقیقاً مبلغ چاپ‌شده روی فاکتور رسمی فروشگاه را می‌پردازید.'
                  : 'Informal errand runners and gift sites often add 18–25% hidden markups on groceries and FX spreads. With ASA, you pay the exact store receipt price plus a flat service fee.'}
              </p>
            </div>

            <div className="space-y-4 bg-[#0D0F0E] border border-white/10 p-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#F5F2EB]">
                    {isFa
                      ? '۱. بودجه ماهانه خرید سوپرمارکت و میوه والدین:'
                      : '1. Monthly Family Grocery & Produce Spend:'}
                  </span>
                  <span className="font-mono text-[#C8A96A] font-bold">
                    {formatPrice(monthlyGrocerySpendUsd, lang, '', '', currency).amount}
                  </span>
                </div>
                <input
                  type="range"
                  min={60}
                  max={500}
                  step={20}
                  value={monthlyGrocerySpendUsd}
                  onChange={(e) => setMonthlyGrocerySpendUsd(Number(e.target.value))}
                  className="w-full accent-[#C8A96A] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#F5F2EB]">
                    {isFa
                      ? '۲. تعداد دفعات مراجعه و خرید در ماه:'
                      : '2. Number of Visits / Deliveries per Month:'}
                  </span>
                  <span className="font-mono text-[#C8A96A] font-bold">
                    {isFa
                      ? `${visitsPerMonth.toLocaleString('fa-IR')} نوبت در ماه`
                      : `${visitsPerMonth} visits / month`}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={visitsPerMonth}
                  onChange={(e) => setVisitsPerMonth(Number(e.target.value))}
                  className="w-full accent-[#C8A96A] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Traditional / Informal */}
            <div className="bg-[#0D0F0E] border border-white/10 p-5 space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-[#C85A5A] font-semibold block">
                {isFa ? 'روش‌های واسطه‌ای و غیررسمی' : 'Informal / Markup Middlemen'}
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#9E988E]">
                  <span>{isFa ? 'بهای اصلی کالاها:' : 'Actual Store Goods:'}</span>
                  <span className="font-mono">
                    {formatPrice(monthlyGrocerySpendUsd, lang, '', '', currency).amount}
                  </span>
                </div>
                <div className="flex justify-between text-[#C85A5A]">
                  <span>{isFa ? 'حاشیه سود پنهان کالا (~۲۲٪):' : 'Hidden Item Markup (~22%):'}</span>
                  <span className="font-mono">
                    + {formatPrice(informalHiddenMarkupUsd, lang, '', '', currency).amount}
                  </span>
                </div>
                <div className="flex justify-between text-[#9E988E]">
                  <span>{isFa ? 'هزینه پیک/آژانس و کارمزد حواله:' : 'Unverified Courier & FX Spread:'}</span>
                  <span className="font-mono">
                    + {formatPrice(informalTaxiAndTipUsd, lang, '', '', currency).amount}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-semibold text-sm text-[#F5F2EB]">
                  <span>{isFa ? 'مجموع هزینه غیرشفاف:' : 'Total Informal Cost:'}</span>
                  <span className="font-mono text-[#C85A5A]">
                    {formatPrice(informalTotalUsd, lang, '', '', currency).amount}
                  </span>
                </div>
              </div>
            </div>

            {/* ASA Zero-Markup Model */}
            <div className="bg-gradient-to-b from-[#1A221E] to-[#0D0F0E] border-2 border-[#C8A96A] p-5 space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-[#C8A96A] font-semibold block">
                {isFa ? 'استاندارد شفاف آسا (۰٪ سود کالا)' : 'ASA Zero-Markup Standard'}
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#F5F2EB]">
                  <span>{isFa ? 'بهای کالا طبق فاکتور رسمی:' : 'Pass-Through Store Receipt:'}</span>
                  <span className="font-mono">
                    {formatPrice(monthlyGrocerySpendUsd, lang, '', '', currency).amount}
                  </span>
                </div>
                <div className="flex justify-between text-[#3E7B5E] font-semibold">
                  <span>{isFa ? 'سود پنهان روی اقلام خرید:' : 'Grocery Item Markup:'}</span>
                  <span className="font-mono">$0 (0%)</span>
                </div>
                <div className="flex justify-between text-[#C8A96A]">
                  <span>{isFa ? 'کارمزد ثابت هماهنگی و چیدمان:' : 'Flat Asa Stewardship Fee:'}</span>
                  <span className="font-mono">
                    + {formatPrice(asaFlatServiceFeeUsd, lang, '', '', currency).amount}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-[#C8A96A]">
                  <span>{isFa ? 'مجموع شفاف آسا:' : 'Total ASA Cost:'}</span>
                  <span className="font-mono">
                    {formatPrice(asaTotalUsd, lang, '', '', currency).amount}
                  </span>
                </div>
              </div>
              <div className="bg-[#2E5A44]/35 border border-[#3E7B5E] px-3 py-2 text-[11px] text-[#F5F2EB] flex items-center justify-between">
                <span>{isFa ? 'صرفه‌جویی + گزارش خانواده:' : 'Monthly Savings + Report:'}</span>
                <strong className="font-mono text-[#C8A96A]">
                  {formatPrice(netMonthlySavingsUsd, lang, '', '', currency).amount}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FAMILY OCCASIONS & REMINDERS CALENDAR */}
      {activeTab === 'occasions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form to Add / Pre-Schedule Special Date */}
          <form
            onSubmit={handleAddOccasion}
            className="lg:col-span-5 bg-[#151816] border border-[#C8A96A]/45 p-5 space-y-4"
          >
            <h3 className="font-serif text-xl text-[#C8A96A] flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span>
                {isFa
                  ? 'ثبت مناسبت جدید در تقویم والدین'
                  : 'Save a Parent Occasion & Pre-Schedule Gift'}
              </span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#9E988E] block mb-1">
                  {isFa ? 'انتخاب مناسبت:' : 'Occasion Type:'}
                </label>
                <select
                  value={newOccasionType}
                  onChange={(e) => setNewOccasionType(e.target.value)}
                  className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] outline-none"
                >
                  <option value="تولد مادر / پدر (Parent’s Birthday)">
                    {isFa ? 'تولد مادر یا پدر گرامی' : 'Parent’s Birthday'}
                  </option>
                  <option value="روز مادر (Mother’s Day Tribute)">
                    {isFa ? 'روز مادر (ولادت حضرت فاطمه / Mother’s Day)' : 'Mother’s Day'}
                  </option>
                  <option value="روز پدر (Father’s Day Tribute)">
                    {isFa ? 'روز پدر (ولادت حضرت علی / Father’s Day)' : 'Father’s Day'}
                  </option>
                  <option value="شب یلدا (Yalda Night Gift Box)">
                    {isFa ? 'شب یلدا (سبد انار، آجیل و فال حافظ)' : 'Yalda Night'}
                  </option>
                  <option value="عید نوروز (Nowruz Haft-Seen & Flowers)">
                    {isFa ? 'عید نوروز و چهارشنبه‌سوری' : 'Nowruz New Year'}
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[#9E988E] block mb-1">
                    {isFa ? 'نام گیرنده:' : 'Recipient:'}
                  </label>
                  <input
                    type="text"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder={isFa ? 'مثلاً: مادر عزیزم...' : 'e.g., My Mother'}
                    className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#9E988E] block mb-1">
                    {isFa ? 'تاریخ مناسبت:' : 'Target Date:'}
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#9E988E] block mb-1">
                  {isFa ? 'پکیج هدیه و پذیرایی:' : 'Luxury Gift Box:'}
                </label>
                <select
                  value={newGiftPackage}
                  onChange={(e) => setNewGiftPackage(e.target.value)}
                  className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] outline-none"
                >
                  <option value="باکس گل تازه + زعفران مثقالی + شیرینی ویژه (۵۴ دلار)">
                    {isFa
                      ? 'باکس گل تازه + زعفران سرگل + شیرینی قنادی (۵۴ دلار)'
                      : 'Fresh Flowers + Saffron Gift Box + Pastries ($54)'}
                  </option>
                  <option value="سبد کامل میوه دست‌چین + آجیل چهارمغز + گل ارکیده (۶۸ دلار)">
                    {isFa
                      ? 'سبد میوه دست‌چین + آجیل ممتاز + گل ارکیده (۶۸ دلار)'
                      : 'Orchard Fruit Crate + Grade-A Nuts + Orchid ($68)'}
                  </option>
                </select>
              </div>

              <div>
                <label className="text-[#9E988E] block mb-1">
                  {isFa
                    ? 'متن کارت تبریک خوشنویسی در پاکت طلاکوب:'
                    : 'Handwritten Persian Calligraphy Card Message:'}
                </label>
                <textarea
                  rows={2}
                  value={newCalligraphyText}
                  onChange={(e) => setNewCalligraphyText(e.target.value)}
                  placeholder={
                    isFa
                      ? 'متن دلخواه شما با خط خوشنویسی نستعلیق روی کارت طلاکوب نوشته و تقدیم می‌شود...'
                      : 'Write your heartfelt note to be inscribed on a gold-embossed calligraphy card...'
                  }
                  className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] p-2.5 text-[#F5F2EB] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {isFa ? 'ذخیره در تقویم مناسبت‌های خانواده' : 'Save Occasion Reminder'}
                </span>
              </button>
            </div>
          </form>

          {/* Saved Occasions List */}
          <div className="lg:col-span-7 space-y-3">
            {occasions.map((occ) => {
              const isScheduled = scheduledOccasionId === occ.id;
              return (
                <div
                  key={occ.id}
                  className="bg-[#151816] border border-white/10 hover:border-[#C8A96A]/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#C8A96A]">
                        {isFa ? occ.occasionTypeFa : occ.occasionTypeEn}
                      </span>
                      <span className="font-mono text-[11px] bg-[#0D0F0E] border border-white/10 px-2 py-0.5 text-[#9E988E]">
                        {occ.dateLabel}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg text-[#F5F2EB]">
                      {occ.recipientName} — {isFa ? occ.giftBoxFa : occ.giftBoxEn}
                    </h4>
                    <p className="text-xs text-[#9E988E] italic">
                      “{occ.calligraphyNote}”
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onScheduleOccasionGift(occ);
                      setScheduledOccasionId(occ.id);
                      setTimeout(() => setScheduledOccasionId(null), 2200);
                    }}
                    className={`px-4 py-2.5 text-xs font-semibold shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      isScheduled
                        ? 'bg-[#3E7B5E] text-[#F5F2EB]'
                        : 'bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E]'
                    }`}
                  >
                    {isScheduled ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isFa ? 'به سبد اضافه شد' : 'Added to Cart'}</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-3.5 h-3.5" />
                        <span>
                          {isFa ? 'افزودن به سفارش فعلی' : 'Add Gift to Order'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: INLINE TRANSPARENCY PROOF PREVIEW + LIGHTBOX TRIGGER */}
      {activeTab === 'proof' && (
        <div className="bg-[#151816] border border-[#C8A96A]/45 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold block">
              {isFa
                ? 'ممیزی فاکتور رسمی فروشگاه + پروتکل ضدعفونی و چیدمان یخچال'
                : 'Side-by-Side Receipt & Refrigerator Organization Audit'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB]">
              {isFa
                ? 'هر سفارش با تصویر فاکتور رسمی فروشگاه و عکس چیدمان در آشپزخانه والدین تحویل می‌شود'
                : 'Inspect How Every Visit Is Documented with Store Receipts & Kitchen Placement'}
            </h3>
            <p className="text-xs sm:text-sm text-[#9E988E] leading-relaxed">
              {isFa
                ? 'همراهان آسا پس از خرید از فروشگاه‌های معتبر منطقه ۱ تا ۶ تهران، میوه‌ها و لبنیات را شست‌وشو و ضدعفونی کرده، ظروف دارای برچسب تاریخ «آسا خوراک» را در طبقات یخچال می‌چینند و فاکتور رسمی را بدون ۱ ریال اختلاف برای شما ارسال می‌کنند.'
                : 'Our stewards sanitize produce, organize dated Asa Khoraak meal trays inside your parent’s refrigerator, and upload the itemized store receipt with zero markup.'}
            </p>
            <button
              type="button"
              onClick={() => setIsProofLightboxOpen(true)}
              className="px-5 py-3 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.14em] font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>
                {isFa
                  ? 'باز کردن نمایش تعاملی فاکتور و چیدمان یخچال'
                  : 'Open Full Transparency Proof Lightbox'}
              </span>
            </button>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div
              onClick={() => setIsProofLightboxOpen(true)}
              className="bg-[#0D0F0E] border border-[#C8A96A]/40 p-3 cursor-pointer hover:border-[#C8A96A]"
            >
              <img
                src={BRAND_IMAGES.marketHarvest}
                alt="Sanitized Fridge & Produce Setup"
                referrerPolicy="no-referrer"
                className="w-full h-32 object-cover mb-2"
              />
              <span className="text-[11px] text-[#C8A96A] font-semibold block">
                {isFa ? '۱. چیدمان منظم و ضدعفونی در یخچال' : '1. Sanitized Fridge Placement'}
              </span>
            </div>
            <div
              onClick={() => setIsProofLightboxOpen(true)}
              className="bg-[#0D0F0E] border border-[#3E7B5E]/50 p-3 cursor-pointer hover:border-[#C8A96A] flex flex-col justify-between"
            >
              <div className="font-mono text-[10px] text-[#F5F2EB] space-y-1 bg-[#151816] p-2.5 border border-white/10">
                <div className="text-[#C8A96A] border-b border-white/10 pb-1">
                  RECEIPT #88412 · ZAFARANIEH
                </div>
                <div className="flex justify-between">
                  <span>Sangak & Lighvan</span>
                  <span>$11.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Damavand Fruit</span>
                  <span>$16.00</span>
                </div>
                <div className="flex justify-between text-[#3E7B5E] pt-1 border-t border-white/10">
                  <span>ASA Markup:</span>
                  <span>$0.00 (0%)</span>
                </div>
              </div>
              <span className="text-[11px] text-[#3E7B5E] font-semibold block mt-2">
                {isFa ? '۲. فاکتور رسمی فروشگاه (۰٪ سود)' : '2. Exact Store Receipt ($0 Markup)'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE TRANSPARENCY PROOF LIGHTBOX MODAL */}
      <AnimatePresence>
        {isProofLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProofLightboxOpen(false)}
            className="fixed inset-0 z-[85] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121614] border-2 border-[#C8A96A] max-w-4xl w-full p-5 sm:p-7 space-y-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold block">
                    {isFa
                      ? 'نمایش تعاملی نمونه فاکتور رسمی و استاندارد چیدمان در منزل والدین'
                      : 'Interactive Transparency Proof · Store Receipt & Refrigerator Setup'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] mt-1">
                    {isFa
                      ? 'تطبیق ۱۰۰٪ فاکتور خرید با چیدمان بهداشتی در آشپزخانه والدین'
                      : 'Side-by-Side Store Receipt Audit & Sanitized Kitchen Placement'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProofLightboxOpen(false)}
                  className="w-9 h-9 bg-[#0D0F0E] border border-white/15 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Itemized Official Store Receipt */}
                <div className="bg-[#0D0F0E] border border-[#C8A96A]/45 p-5 font-mono text-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-white/15 pb-2.5">
                    <span className="text-[#C8A96A] font-bold">
                      {isFa ? 'فاکتور رسمی فروشگاه محلی زعفرانیه' : 'OFFICIAL TEHRAN STORE RECEIPT'}
                    </span>
                    <span className="text-[#3E7B5E]">#THR-90421</span>
                  </div>
                  <div className="space-y-2 text-[#F5F2EB]/90">
                    <div className="flex justify-between">
                      <span>{isFa ? '۱. سیب و پرتقال دست‌چین دماوند (۳ کیلو)' : '1. Hand-picked Damavand Fruit (3kg)'}</span>
                      <span>$14.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isFa ? '۲. پنیر لیقوان اصل و گردوی تویسرکان' : '2. Artisanal Lighvan Cheese & Walnuts'}</span>
                      <span>$11.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isFa ? '۳. نان سنگک خشخاشی تازه (۳ عدد)' : '3. Fresh Stone-Baked Sangak (3x)'}</span>
                      <span>$3.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isFa ? '۴. پکیج ۳ روزه غذای کم‌نمک آسا خوراک' : '4. 3-Day Low-Sodium Asa Khoraak Pack'}</span>
                      <span>$28.00</span>
                    </div>
                  </div>
                  <div className="border-t border-white/15 pt-3 space-y-1.5">
                    <div className="flex justify-between text-[#F5F2EB]">
                      <span>{isFa ? 'جمع کل فاکتور فروشگاه:' : 'Store Receipt Subtotal:'}</span>
                      <span>$57.00</span>
                    </div>
                    <div className="flex justify-between text-[#3E7B5E] font-bold">
                      <span>{isFa ? 'حاشیه سود آسا روی کالاها:' : 'Asa Grocery Markup:'}</span>
                      <span>$0.00 (0%)</span>
                    </div>
                    <div className="flex justify-between text-[#C8A96A]">
                      <span>{isFa ? 'کارمزد ثابت آسا همراه (خرید و چیدمان):' : 'Flat Asa Hamrah Service Fee:'}</span>
                      <span>$18.00</span>
                    </div>
                  </div>
                </div>

                {/* Right: Visual Proof of Refrigerator & Kitchen Organization */}
                <div className="bg-[#0D0F0E] border border-white/15 p-5 flex flex-col justify-between space-y-4">
                  <img
                    src={BRAND_IMAGES.marketHarvest}
                    alt="Sanitized Produce and Meal Trays"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover border border-[#C8A96A]/35"
                  />
                  <div className="space-y-2 text-xs">
                    <h4 className="font-serif text-lg text-[#C8A96A]">
                      {isFa
                        ? 'چک‌لیست چیدمان در آشپزخانه والدین (با رضایت گیرنده):'
                        : 'In-Kitchen Sanitization & Placement Checklist:'}
                    </h4>
                    <ul className="space-y-1.5 text-[#F5F2EB]/90">
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#3E7B5E] shrink-0" />
                        <span>
                          {isFa
                            ? 'شست‌وشو و خشک‌کردن میوه‌ها پیش از قرار دادن در طبقه میانی یخچال'
                            : 'All orchard fruits washed, dried, and placed on middle fridge shelf'}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#3E7B5E] shrink-0" />
                        <span>
                          {isFa
                            ? 'چسباندن برچسب روز مصرف و نحوه گرم‌کردن با خط درشت روی ظروف آسا خوراک'
                            : 'Large-print Persian day & heating labels affixed to Asa Khoraak meal trays'}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#3E7B5E] shrink-0" />
                        <span>
                          {isFa
                            ? 'بررسی تاریخ انقضای لبنیات قبلی یخچال و خارج کردن اقلام تاریخ‌گذشته'
                            : 'Previous dairy items checked for expiry dates with parent’s permission'}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
