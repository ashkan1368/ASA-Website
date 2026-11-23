import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  Settings,
  Layers,
  ShoppingBag,
  CreditCard,
  FileEdit,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  TrendingUp,
  Activity,
  Edit3,
  Save,
  MessageSquare,
  Star,
  RefreshCw,
  Link2,
  Send,
  BarChart3,
  Users,
  Clock,
  ArrowRightLeft,
  Globe,
  Download,
  Search,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  EstateService,
  GroceryProduct,
  ServiceDepartment,
  GroceryCategory,
  Language,
  CurrencyCode,
  BRAND_IMAGES,
  SERVICE_DEPT_FA,
  GROCERY_CAT_FA,
  formatPrice,
} from '../data/catalogData';
import {
  ActiveTrackedOrder,
  SubmittedSatisfactionReview,
} from './OrderTrackingModal';
import { ConciergeInquiryMessage } from './ConciergeChatWidget';
import {
  RegisteredFamilyUser,
  BackdoorOrderRecord,
} from './AuthProfileModal';
import {
  fetchLiveSupermarketPricing,
  DEFAULT_SUPERMARKET_APIS,
  ExternalSupermarketApiConfig,
  PriceSyncStrategy,
  SupermarketSyncReport,
} from '../services/supermarketPriceSyncService';
import { useLocalization } from '../i18n/LocalizationContext';

export interface PaymentGatewayConfig {
  id: 'gateway-intl-card' | 'gateway-shetab-irr' | 'gateway-crypto-transfer';
  code: string;
  nameFa: string;
  nameEn: string;
  subtitleFa: string;
  subtitleEn: string;
  badgeFa: string;
  badgeEn: string;
  supportedCurrencies: CurrencyCode[];
  merchantIdOrEndpoint: string;
  enabled: boolean;
  instructionsFa: string;
  instructionsEn: string;
}

export interface SiteContentConfig {
  brandNameFa: string;
  brandNameEn: string;
  brandMottoFa: string;
  brandMottoEn: string;
  operationalCityNoteFa: string;
  operationalCityNoteEn: string;
  heroTitleFa: string;
  heroHighlightFa: string;
  heroTitleEn: string;
  heroHighlightEn: string;
  heroSubtitleFa: string;
  heroSubtitleEn: string;
}

// Recharts Datasets for Management Sales Analytics
const ORDER_TRENDS_DATA = [
  { periodFa: 'هفته ۱', periodEn: 'Wk 1', orders: 28, serviceRevenueUsd: 820, passThroughGoodsUsd: 1340 },
  { periodFa: 'هفته ۲', periodEn: 'Wk 2', orders: 39, serviceRevenueUsd: 1150, passThroughGoodsUsd: 1890 },
  { periodFa: 'هفته ۳', periodEn: 'Wk 3', orders: 52, serviceRevenueUsd: 1580, passThroughGoodsUsd: 2460 },
  { periodFa: 'هفته ۴', periodEn: 'Wk 4', orders: 68, serviceRevenueUsd: 2120, passThroughGoodsUsd: 3190 },
  { periodFa: 'هفته ۵', periodEn: 'Wk 5', orders: 84, serviceRevenueUsd: 2690, passThroughGoodsUsd: 3980 },
  { periodFa: 'هفته ۶ (جاری)', periodEn: 'Wk 6', orders: 106, serviceRevenueUsd: 3420, passThroughGoodsUsd: 4950 },
];

const HIGH_DEMAND_CATEGORIES_DATA = [
  { categoryFa: 'آسا خوراک (غذای کم‌نمک)', categoryEn: 'Asa Khoraak Meals', ordersCount: 142, sharePct: 31 },
  { categoryFa: 'میوه و سبزی دست‌چین', categoryEn: 'Fresh Orchard Produce', ordersCount: 118, sharePct: 26 },
  { categoryFa: 'نان سنگک و لبنیات سنتی', categoryEn: 'Sangak & Dairy', ordersCount: 96, sharePct: 21 },
  { categoryFa: 'آسا پزشک (همراهی مطب)', categoryEn: 'Asa Pezeshk Medical', ordersCount: 64, sharePct: 14 },
  { categoryFa: 'زعفران، برنج و روغن سالم', categoryEn: 'Persian Pantry', ordersCount: 38, sharePct: 8 },
];

const PEAK_SERVICE_HOURS_DATA = [
  { hour: '08:00', activeDispatches: 14, labelFa: '۸ صبح (نان سنگک و صبحانه)' },
  { hour: '10:00', activeDispatches: 38, labelFa: '۱۰ صبح (اوج خرید منزل و کلینیک)' },
  { hour: '12:00', activeDispatches: 44, labelFa: '۱۲ ظهر (تحویل ناهار آسا خوراک)' },
  { hour: '14:00', activeDispatches: 29, labelFa: '۱۴ ظهر (چیدمان یخچال و امور روزمره)' },
  { hour: '16:00', activeDispatches: 36, labelFa: '۱۶ عصر (نوبت پزشک متخصص بعدازظهر)' },
  { hour: '18:00', activeDispatches: 25, labelFa: '۱۸ عصر (تحویل شام سبک و میوه)' },
  { hour: '20:00', activeDispatches: 12, labelFa: '۲۰ شب (ارسال گزارش‌های خانواده)' },
];

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currency: CurrencyCode;
  services: EstateService[];
  onUpdateServices: (services: EstateService[]) => void;
  products: GroceryProduct[];
  onUpdateProducts: (products: GroceryProduct[]) => void;
  paymentGateways: PaymentGatewayConfig[];
  onUpdatePaymentGateways: (gateways: PaymentGatewayConfig[]) => void;
  siteConfig: SiteContentConfig;
  onUpdateSiteConfig: (config: SiteContentConfig) => void;
  onResetAllToDefaults: () => void;
  activeTrackedOrder?: ActiveTrackedOrder;
  onAdvanceTrackedOrderStage?: (stageIdx: number) => void;
  submittedReviews?: SubmittedSatisfactionReview[];
  onToggleApproveReview?: (id: string) => void;
  conciergeMessages?: ConciergeInquiryMessage[];
  onReplyConciergeMessage?: (id: string, replyText: string) => void;
  registeredUsers?: RegisteredFamilyUser[];
  onUpdateRegisteredUser?: (updated: RegisteredFamilyUser) => void;
  backdoorOrders?: BackdoorOrderRecord[];
  onUpdateBackdoorOrder?: (updated: BackdoorOrderRecord) => void;
  latestSyncReport?: SupermarketSyncReport | null;
  onTriggerLivePriceSync?: (
    apis: ExternalSupermarketApiConfig[],
    strategy: PriceSyncStrategy
  ) => Promise<void>;
  autoPriceSyncEnabled?: boolean;
  onToggleAutoPriceSync?: (enabled: boolean) => void;
}

type AdminTab =
  | 'localization'
  | 'analytics'
  | 'live-ops'
  | 'users'
  | 'market-sync'
  | 'services'
  | 'products'
  | 'gateways'
  | 'pages';

const STEWARD_OPTIONS = [
  { fa: 'سهراب فرهمند (همراه ارشد آسا همراه)', en: 'Sohrab Farahmand (Senior Steward)' },
  { fa: 'رکسانا بختیاری (مدیر عملیات و هماهنگی تهران)', en: 'Roxana Bakhtiari (Tehran Ops Lead)' },
  { fa: 'دکتر آرمان نوری (مسئول هماهنگی آسا پزشک)', en: 'Dr. Arman Nouri (Asa Pezeshk Lead)' },
  { fa: 'سرآشپز داریوش کاویانی (ناظر کیفی آسا خوراک)', en: 'Chef Dariush Kaviani (Asa Khoraak)' },
];

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  lang,
  services,
  onUpdateServices,
  products,
  onUpdateProducts,
  paymentGateways,
  onUpdatePaymentGateways,
  siteConfig,
  onUpdateSiteConfig,
  onResetAllToDefaults,
  activeTrackedOrder,
  onAdvanceTrackedOrderStage,
  submittedReviews = [],
  onToggleApproveReview,
  conciergeMessages = [],
  onReplyConciergeMessage,
  registeredUsers = [],
  onUpdateRegisteredUser,
  backdoorOrders = [],
  onUpdateBackdoorOrder,
  latestSyncReport,
  onTriggerLivePriceSync,
  autoPriceSyncEnabled = true,
  onToggleAutoPriceSync,
}) => {
  const {
    t,
    flatEntries,
    updateTranslationKey,
    resetDictionariesToDefault,
    exportActiveLocaleJson,
  } = useLocalization();
  const isFa = lang === 'fa';
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
  const [savedToast, setSavedToast] = useState<string | null>(null);
  const [i18nSearchQuery, setI18nSearchQuery] = useState<string>('');

  // Service editing / adding state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [newServiceTitleFa, setNewServiceTitleFa] = useState('');
  const [newServiceTitleEn, setNewServiceTitleEn] = useState('');
  const [newServiceDept, setNewServiceDept] = useState<Exclude<ServiceDepartment, 'All Divisions'>>('Asa Hamrah');
  const [newServicePrice, setNewServicePrice] = useState('35');
  const [newServiceDescFa, setNewServiceDescFa] = useState('');

  // Product adding state
  const [newProdNameFa, setNewProdNameFa] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Exclude<GroceryCategory, 'All Provisions'>>('Asa Khoraak Prepared Meals');
  const [newProdPrice, setNewProdPrice] = useState('12');
  const [newProdUnitFa, setNewProdUnitFa] = useState('بسته ۱ کیلوگرمی');

  // Reply state for Concierge Chat inbox
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  // External Online Supermarket Auto-Sync state
  const [apis, setApis] = useState<ExternalSupermarketApiConfig[]>(
    DEFAULT_SUPERMARKET_APIS
  );
  const [syncStrategy, setSyncStrategy] =
    useState<PriceSyncStrategy>('lowest-receipt');
  const [isSyncingPrices, setIsSyncingPrices] = useState(false);
  const [localSyncReport, setLocalSyncReport] =
    useState<SupermarketSyncReport | null>(latestSyncReport || null);

  useEffect(() => {
    if (latestSyncReport) {
      setLocalSyncReport(latestSyncReport);
    }
  }, [latestSyncReport]);

  const triggerSavedToast = (msgFa: string, msgEn: string) => {
    setSavedToast(isFa ? msgFa : msgEn);
    setTimeout(() => setSavedToast(null), 2600);
  };

  const unreadMessagesCount = conciergeMessages.filter(
    (m) => m.status === 'unread'
  ).length;

  const handleRunSupermarketPriceSync = async () => {
    setIsSyncingPrices(true);
    try {
      if (onTriggerLivePriceSync) {
        await onTriggerLivePriceSync(apis, syncStrategy);
      } else {
        const report = await fetchLiveSupermarketPricing(
          products,
          apis,
          syncStrategy
        );
        onUpdateProducts(report.updatedProducts);
        setLocalSyncReport(report);
      }
      triggerSavedToast(
        'قیمت‌های کاتالوگ به‌صورت زنده از API سوپرمارکت‌های آنلاین بروزرسانی شد!',
        'productsCatalog automatically updated from live supermarket APIs!'
      );
    } finally {
      setIsSyncingPrices(false);
    }
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitleFa.trim() && !newServiceTitleEn.trim()) return;

    const created: EstateService = {
      id: `asa-custom-${Date.now()}`,
      indexNumber: String(services.length + 1).padStart(2, '0'),
      title: newServiceTitleEn.trim() || newServiceTitleFa.trim(),
      titleFa: newServiceTitleFa.trim() || newServiceTitleEn.trim(),
      department: newServiceDept,
      departmentFa: SERVICE_DEPT_FA[newServiceDept] || 'آسا همراه',
      shortDescription:
        newServiceDescFa.trim() ||
        'Dedicated Asa non-clinical family support with store-receipt transparency and Family Update.',
      shortDescriptionFa:
        newServiceDescFa.trim() ||
        'خدمت اختصاصی آسا با رعایت کامل استانداردهای آسایش، سهولت و آرامش و ارسال گزارش مستند خانواده.',
      fullProtocol:
        'Executed by vetted Asa specialists with transparent billing and post-visit Family Update.',
      fullProtocolFa:
        'توسط همراهان احراز هویت‌شده آسا با شفافیت مالی و ارسال گزارش واقعی خانواده انجام می‌شود.',
      deliverables: [
        'Dedicated Asa specialist coordination',
        'Consented Factual Family Update upon completion',
      ],
      deliverablesFa: [
        'هماهنگی و اجرای اختصاصی توسط همراه امین آسا',
        'ارسال گزارش واقعی خانواده به همراه مستندات و فاکتور رسمی',
      ],
      exclusions: ['Clinical or emergency medical intervention'],
      exclusionsFa: ['هرگونه مداخله درمانی یا بالینی پزشکی'],
      executionSteps: ['1. Schedule slot', '2. Vetted execution', '3. Family Update sent'],
      executionStepsFa: ['۱. ثبت و هماهنگی تلفنی', '۲. اجرای محترمانه خدمت', '۳. ارسال گزارش خانواده'],
      specialistTeam: 'Asa Dedicated Steward',
      specialistTeamFa: 'همراه اختصاصی آسا',
      materialsUsed: 'Official ID Badge · Family Update Dossier',
      materialsUsedFa: 'کارت شناسایی رسمی · فرم گزارش خانواده',
      duration: '2–3 Hours',
      durationFa: 'بازه ۲ تا ۳ ساعته',
      leadTime: '24h Notice',
      leadTimeFa: 'هماهنگی از ۲۴ ساعت قبل',
      price: Math.max(0, Number(newServicePrice) || 35),
      billingUnit: 'service fee (+ pass-through store receipt)',
      billingUnitFa: 'کارمزد خدمت (+ فاکتور رسمی خرید)',
      image: BRAND_IMAGES.serviceConcierge,
      featuredMetric: 'Custom Asa Service · Verified Stewardship',
      featuredMetricFa: 'سرویس اختصاصی آسا · آسایش، سهولت، آرامش',
    };

    onUpdateServices([created, ...services]);
    setNewServiceTitleFa('');
    setNewServiceTitleEn('');
    setNewServiceDescFa('');
    triggerSavedToast('خدمت جدید با موفقیت به سایت اضافه شد.', 'New service added to live catalog.');
  };

  const handleDeleteService = (id: string) => {
    onUpdateServices(services.filter((s) => s.id !== id));
    triggerSavedToast('خدمت انتخاب‌شده حذف گردید.', 'Service removed from catalog.');
  };

  const handleUpdateServiceField = (
    id: string,
    field: keyof EstateService,
    value: string | number | boolean
  ) => {
    onUpdateServices(
      services.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdNameFa.trim() && !newProdNameEn.trim()) return;

    const createdProd: GroceryProduct = {
      id: `prd-custom-${Date.now()}`,
      name: newProdNameEn.trim() || newProdNameFa.trim(),
      nameFa: newProdNameFa.trim() || newProdNameEn.trim(),
      category: newProdCategory,
      categoryFa: GROCERY_CAT_FA[newProdCategory] || 'سوپرمارکت خانواده',
      origin: 'Asa Vetted Supplier',
      originFa: 'تامین‌کننده منتخب آسا',
      unitSize: newProdUnitFa.trim() || '1 Pack',
      unitSizeFa: newProdUnitFa.trim() || '۱ بسته استاندارد',
      price: Math.max(0.5, Number(newProdPrice) || 10),
      shortDescription: 'Hand-selected Grade-A family provision at exact store receipt price.',
      shortDescriptionFa: 'کالای درجه یک دست‌چین‌شده برای منزل والدین به قیمت خالص فاکتور فروشگاه.',
      provenanceNote: 'Audited for freshness and latest production date.',
      provenanceNoteFa: 'کنترل کیفیت و تاریخ تولید روز توسط همراه خرید آسا.',
      dietaryMeta: 'Grade-A · 0% Markup',
      dietaryMetaFa: 'درجه یک · ۰٪ سود پنهان',
      harvestAvailability: 'Available Daily',
      harvestAvailabilityFa: 'موجود در تامین روزانه',
      image: BRAND_IMAGES.marketHarvest,
    };

    onUpdateProducts([createdProd, ...products]);
    setNewProdNameFa('');
    setNewProdNameEn('');
    triggerSavedToast('کالای جدید به سوپرمارکت اضافه شد.', 'New product added to Supermarket.');
  };

  const handleDeleteProduct = (id: string) => {
    onUpdateProducts(products.filter((p) => p.id !== id));
    triggerSavedToast('کالا از سوپرمارکت حذف شد.', 'Product removed from Supermarket.');
  };

  const handleUpdateProductPrice = (id: string, newPrice: number) => {
    onUpdateProducts(
      products.map((p) =>
        p.id === id ? { ...p, price: Math.max(0.5, newPrice) } : p
      )
    );
  };

  const handleUpdateGateway = (
    id: PaymentGatewayConfig['id'],
    patch: Partial<PaymentGatewayConfig>
  ) => {
    onUpdatePaymentGateways(
      paymentGateways.map((gw) => (gw.id === id ? { ...gw, ...patch } : gw))
    );
    triggerSavedToast('تنظیمات درگاه پرداخت بروزرسانی شد.', 'Payment gateway updated.');
  };

  const tabs: {
    id: AdminTab;
    label: string;
    icon: React.ReactNode;
    badgeCount?: number;
  }[] = [
    {
      id: 'analytics',
      label: t('admin.tabs.analytics'),
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'live-ops',
      label: t('admin.tabs.ordersAndChat', { count: backdoorOrders.length }),
      icon: <ArrowRightLeft className="w-4 h-4" />,
      badgeCount: unreadMessagesCount,
    },
    {
      id: 'users',
      label: t('admin.tabs.customerProfiles', { count: registeredUsers.length }),
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'market-sync',
      label: t('admin.tabs.liveSupermarketSync'),
      icon: <Link2 className="w-4 h-4" />,
    },
    {
      id: 'services',
      label: t('admin.tabs.services', { count: services.length }),
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 'products',
      label: t('admin.tabs.products', { count: products.length }),
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      id: 'gateways',
      label: t('admin.tabs.gateways'),
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      id: 'pages',
      label: t('admin.tabs.siteSettings'),
      icon: <FileEdit className="w-4 h-4" />,
    },
    {
      id: 'localization',
      label: t('admin.tabs.localization'),
      icon: <Globe className="w-4 h-4" />,
    },
  ];

  const filteredI18nEntries = flatEntries.filter((entry) => {
    const q = i18nSearchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      entry.keyPath.toLowerCase().includes(q) ||
      entry.faValue.toLowerCase().includes(q) ||
      entry.enValue.toLowerCase().includes(q)
    );
  });

  const stageNamesFa = [
    '۱. ثبت و هماهنگی تلفنی',
    '۲. تامین و فاکتور رسمی',
    '۳. اعزام همراه در تهران',
    '۴. حضور و چیدمان در منزل',
    '۵. گزارش خانواده و نظرسنجی',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111513] border-2 border-[#C8A96A]/60 max-w-6xl w-full max-h-[94vh] flex flex-col overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.95)]"
          >
            {/* Top Header */}
            <div className="p-4 sm:p-6 bg-[#151A17] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#C8A96A] font-semibold mb-1">
                  <Settings className="w-4 h-4" />
                  <span>{t('admin.badge')}</span>
                </div>
                <h2 className="font-serif text-xl sm:text-3xl text-[#F5F2EB]">
                  {t('admin.title')}
                </h2>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => {
                    onResetAllToDefaults();
                    resetDictionariesToDefault();
                    triggerSavedToast(
                      'تمامی تنظیمات و دیکشنری ترجمه به حالت پیش‌فرض بازگردانی شد.',
                      'Reset all settings and translation dictionaries to defaults.'
                    );
                  }}
                  className="px-3 py-2 text-xs bg-[#0D0F0E] border border-white/15 hover:border-[#C8A96A] text-[#9E988E] hover:text-[#F5F2EB] flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#C8A96A]" />
                  <span>{t('admin.resetDefaults')}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Admin Panel"
                  className="w-9 h-9 bg-[#0D0F0E] border border-white/15 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] hover:border-[#C8A96A] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-[#0D0F0E] border-b border-white/10 px-4 sm:px-6 py-2.5 flex flex-wrap gap-1.5 shrink-0">
              {tabs.map((tabItem) => {
                const active = activeTab === tabItem.id;
                return (
                  <button
                    key={tabItem.id}
                    type="button"
                    onClick={() => setActiveTab(tabItem.id)}
                    className={`px-3 py-2 text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] font-semibold shadow-sm'
                        : 'bg-[#151816] text-[#9E988E] border-white/10 hover:text-[#F5F2EB] hover:border-[#C8A96A]/45'
                    }`}
                  >
                    {tabItem.icon}
                    <span>{tabItem.label}</span>
                    {tabItem.badgeCount && tabItem.badgeCount > 0 ? (
                      <span
                        className={`px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                          active
                            ? 'bg-[#0D0F0E] text-[#C8A96A]'
                            : 'bg-[#C8A96A] text-[#0D0F0E]'
                        }`}
                      >
                        {tabItem.badgeCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}

              {savedToast && (
                <div className="ms-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2E5A44]/40 border border-[#3E7B5E] text-xs text-[#F5F2EB]">
                  <Check className="w-3.5 h-3.5 text-[#C8A96A]" />
                  <span>{savedToast}</span>
                </div>
              )}
            </div>

            {/* Scrollable Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* TAB 1: RECHARTS SALES ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  {/* Top KPI Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#151816] border border-[#C8A96A]/45 p-4">
                      <span className="text-xs text-[#9E988E] block mb-1">
                        {isFa ? 'درآمد خالص کارمزد خدمات آسا (۶ هفته)' : 'Net Asa Service Fee Revenue (6 Wks)'}
                      </span>
                      <span className="font-mono text-2xl text-[#C8A96A] font-bold block">
                        $11,780
                      </span>
                      <span className="text-[11px] text-[#3E7B5E] mt-1 block">
                        {isFa ? '+۲۸٪ رشد هفتگی مستمر' : '+28% WoW Growth'}
                      </span>
                    </div>

                    <div className="bg-[#151816] border border-white/10 p-4">
                      <span className="text-xs text-[#9E988E] block mb-1">
                        {isFa ? 'گردش مالی کالای سوپرمارکتی (۰٪ سود)' : 'Pass-Through Store Goods Volume'}
                      </span>
                      <span className="font-mono text-2xl text-[#F5F2EB] font-bold block">
                        $17,810
                      </span>
                      <span className="text-[11px] text-[#C8A96A] mt-1 block">
                        {isFa ? '۱۰۰٪ منطبق با فاکتور رسمی فروشگاه' : '100% Store-Receipt Reconciled'}
                      </span>
                    </div>

                    <div className="bg-[#151816] border border-white/10 p-4">
                      <span className="text-xs text-[#9E988E] block mb-1">
                        {isFa ? 'پرتقاضاترین دسته ماه' : 'Top Performing Category'}
                      </span>
                      <span className="font-serif text-lg text-[#F5F2EB] font-semibold block">
                        {isFa ? 'آسا خوراک (غذای کم‌نمک)' : 'Asa Khoraak Prepared Meals'}
                      </span>
                      <span className="text-[11px] text-[#3E7B5E] mt-1 block">
                        {isFa ? '۳۱٪ از کل سفارش‌های خانواده‌ها' : '31% of total family orders'}
                      </span>
                    </div>

                    <div className="bg-[#151816] border border-white/10 p-4">
                      <span className="text-xs text-[#9E988E] block mb-1">
                        {isFa ? 'ساعت اوج عملیات تهران' : 'Peak Tehran Dispatch Window'}
                      </span>
                      <span className="font-mono text-xl text-[#C8A96A] font-bold block">
                        10:00 – 12:30 IRST
                      </span>
                      <span className="text-[11px] text-[#9E988E] mt-1 block">
                        {isFa ? 'خرید صبحگاهی، سنگک داغ و نوبت کلینیک' : 'Morning produce, Sangak & clinic visits'}
                      </span>
                    </div>
                  </div>

                  {/* Chart 1: Order & Revenue Trends AreaChart */}
                  <div className="bg-[#151816] border border-[#C8A96A]/40 p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <span className="text-xs uppercase tracking-[0.15em] text-[#C8A96A] font-semibold block">
                          {isFa
                            ? 'نمودار ۱: روند رشد سفارش‌ها و تفکیک کارمزد آسا از هزینه کالا (Recharts AreaChart)'
                            : 'Chart 1: Weekly Order Growth & Service Fee vs. Pass-Through Goods ($ USD)'}
                        </span>
                        <h3 className="font-serif text-xl text-[#F5F2EB]">
                          {isFa
                            ? 'روند ۶ هفته‌ای درآمد خدمات آسا در مقایسه با حجم خرید فاکتور رسمی'
                            : '6-Week Revenue & Pass-Through Grocery Volume Trend'}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5 text-[#C8A96A]">
                          <span className="w-3 h-3 bg-[#C8A96A] inline-block" />
                          {isFa ? 'کارمزد خدمات آسا ($)' : 'Asa Service Fee ($)'}
                        </span>
                        <span className="flex items-center gap-1.5 text-[#3E7B5E]">
                          <span className="w-3 h-3 bg-[#3E7B5E] inline-block" />
                          {isFa ? 'کالای فاکتور فروشگاه ($)' : 'Pass-Through Goods ($)'}
                        </span>
                      </div>
                    </div>

                    <div className="h-64 w-full" dir="ltr">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ORDER_TRENDS_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="asaGoldGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#C8A96A" stopOpacity={0.65} />
                              <stop offset="95%" stopColor="#C8A96A" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="asaEmeraldGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3E7B5E" stopOpacity={0.55} />
                              <stop offset="95%" stopColor="#3E7B5E" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                          <XAxis
                            dataKey={isFa ? 'periodFa' : 'periodEn'}
                            stroke="#9E988E"
                            fontSize={11}
                          />
                          <YAxis stroke="#9E988E" fontSize={11} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#0D0F0E',
                              borderColor: '#C8A96A',
                              color: '#F5F2EB',
                              fontSize: '12px',
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="passThroughGoodsUsd"
                            name={isFa ? 'کالای فاکتور رسمی ($)' : 'Pass-Through Goods ($)'}
                            stroke="#3E7B5E"
                            fillOpacity={1}
                            fill="url(#asaEmeraldGrad)"
                            strokeWidth={2}
                          />
                          <Area
                            type="monotone"
                            dataKey="serviceRevenueUsd"
                            name={isFa ? 'کارمزد خدمات آسا ($)' : 'Asa Service Fee ($)'}
                            stroke="#C8A96A"
                            fillOpacity={1}
                            fill="url(#asaGoldGrad)"
                            strokeWidth={2.5}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Charts 2 & 3 Side-by-Side: High-Demand Categories & Peak Service Hours */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart 2: High-Demand Categories */}
                    <div className="bg-[#151816] border border-white/10 p-5 space-y-4">
                      <div>
                        <span className="text-xs uppercase tracking-[0.14em] text-[#C8A96A] font-semibold block">
                          {isFa
                            ? 'نمودار ۲: دسته‌های پرتقاضای سوپرمارکت و خدمات'
                            : 'Chart 2: High-Demand Product & Service Categories'}
                        </span>
                        <h4 className="font-serif text-lg text-[#F5F2EB]">
                          {isFa
                            ? 'تعداد سفارش به تفکیک دسته‌بندی تخصصی'
                            : 'Order Volume by Category'}
                        </h4>
                      </div>

                      <div className="h-60 w-full" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={HIGH_DEMAND_CATEGORIES_DATA}
                            layout="vertical"
                            margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                            <XAxis type="number" stroke="#9E988E" fontSize={11} />
                            <YAxis
                              dataKey={isFa ? 'categoryFa' : 'categoryEn'}
                              type="category"
                              stroke="#F5F2EB"
                              fontSize={11}
                              width={125}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#0D0F0E',
                                borderColor: '#C8A96A',
                                color: '#F5F2EB',
                                fontSize: '12px',
                              }}
                            />
                            <Bar
                              dataKey="ordersCount"
                              name={isFa ? 'تعداد سفارش' : 'Orders'}
                              fill="#C8A96A"
                              radius={[0, 3, 3, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Chart 3: Peak Service Hours in Tehran */}
                    <div className="bg-[#151816] border border-white/10 p-5 space-y-4">
                      <div>
                        <span className="text-xs uppercase tracking-[0.14em] text-[#C8A96A] font-semibold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {isFa
                              ? 'نمودار ۳: ساعات اوج اعزام همراهان در تهران (IRST)'
                              : 'Chart 3: Peak Service Hours in Tehran (IRST)'}
                          </span>
                        </span>
                        <h4 className="font-serif text-lg text-[#F5F2EB]">
                          {isFa
                            ? 'توزیع ساعتی عملیات برای برنامه‌ریزی شیفت همراهان'
                            : 'Hourly Dispatch Load for Steward Shift Planning'}
                        </h4>
                      </div>

                      <div className="h-60 w-full" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={PEAK_SERVICE_HOURS_DATA}
                            margin={{ top: 5, right: 15, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                            <XAxis dataKey="hour" stroke="#9E988E" fontSize={11} />
                            <YAxis stroke="#9E988E" fontSize={11} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#0D0F0E',
                                borderColor: '#3E7B5E',
                                color: '#F5F2EB',
                                fontSize: '12px',
                              }}
                            />
                            <Bar
                              dataKey="activeDispatches"
                              name={isFa ? 'اعزام فعال در این ساعت' : 'Active Dispatches'}
                              fill="#3E7B5E"
                              radius={[3, 3, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BACKDOOR ORDER PIPELINE, REVIEWS & CONCIERGE INBOX */}
              {activeTab === 'live-ops' && (
                <div className="space-y-6">
                  {/* How Backdoor Orders Flow Visual Diagram */}
                  <div className="bg-gradient-to-r from-[#17201B] to-[#131715] border border-[#C8A96A]/55 p-4 text-xs space-y-2">
                    <span className="text-[#C8A96A] font-semibold uppercase tracking-wider block">
                      {isFa
                        ? 'معماری جریان سفارش در بک‌اند پنل مدیریت (How Orders Come & Go in Backdoor):'
                        : 'Backdoor Order Pipeline Architecture (How Orders Flow In & Out):'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px]">
                      <div className="bg-[#0D0F0E] border border-white/10 p-2.5">
                        <strong className="text-[#C8A96A] block">۱. ثبت در سبد (Intake)</strong>
                        <span className="text-[#9E988E]">
                          سفارش مشتری + پروفایل والدین + پیام صوتی بلافاصله وارد صف ادمین می‌شود.
                        </span>
                      </div>
                      <div className="bg-[#0D0F0E] border border-white/10 p-2.5">
                        <strong className="text-[#C8A96A] block">۲. تخصیص همراه (Assign)</strong>
                        <span className="text-[#9E988E]">
                          ادمین همراه مسئول (مثلاً سهراب فرهمند یا رکسانا بختیاری) را تعیین می‌کند.
                        </span>
                      </div>
                      <div className="bg-[#0D0F0E] border border-white/10 p-2.5">
                        <strong className="text-[#C8A96A] block">۳. خرید و فاکتور (Audit)</strong>
                        <span className="text-[#9E988E]">
                          خرید به قیمت روز سوپرمارکت انجام شده و فاکتور رسمی بدون سود ثبت می‌گردد.
                        </span>
                      </div>
                      <div className="bg-[#0D0F0E] border border-white/10 p-2.5">
                        <strong className="text-[#C8A96A] block">۴. تغییر مرحله زنده (Sync)</strong>
                        <span className="text-[#9E988E]">
                          هر کلیک ادمین روی مراحل ۱ تا ۵، نوار رهگیری صفحه مشتری را زنده جلو می‌برد.
                        </span>
                      </div>
                      <div className="bg-[#0D0F0E] border border-white/10 p-2.5">
                        <strong className="text-[#3E7B5E] block">۵. گزارش و نظرسنجی</strong>
                        <span className="text-[#9E988E]">
                          پس از مرحله ۵، پرونده PDF صادر شده و نظر رضایت خانواده به ادمین برمی‌گردد.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* All Incoming & Dispatched Backdoor Orders */}
                  <div className="bg-[#151816] border border-[#C8A96A]/45 p-5 space-y-4">
                    <h3 className="font-serif text-xl text-[#F5F2EB]">
                      {isFa
                        ? `صف کامل سفارش‌های ورودی و اعزامی (${backdoorOrders.length} سفارش)`
                        : `All Incoming & Active Backdoor Orders (${backdoorOrders.length})`}
                    </h3>

                    <div className="space-y-4">
                      {backdoorOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-[#0D0F0E] border border-white/15 p-4 space-y-3 text-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                            <div>
                              <span className="font-mono text-sm text-[#C8A96A] font-bold">
                                {ord.referenceCode}
                              </span>
                              <span className="text-[#9E988E] ms-2">
                                · {ord.customerName} ({ord.customerEmail})
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm text-[#3E7B5E] font-bold">
                                ${ord.grandTotalUsd} (Goods: ${ord.passThroughTotalUsd} + Fee: $
                                {ord.asaServiceFeeUsd})
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[#9E988E] block">
                                {isFa ? 'گیرنده و نشانی در تهران:' : 'Recipient & Tehran Address:'}
                              </span>
                              <p className="text-[#F5F2EB] font-medium">
                                {ord.recipientName} — {ord.residenceAddress}
                              </p>
                              <p className="text-[#C8A96A] mt-1">
                                {[...ord.serviceTitles, ...ord.productSummaries].join(' · ')}
                              </p>
                            </div>

                            <div>
                              <label className="text-[#9E988E] block mb-1">
                                {isFa ? 'همراه تخصیص‌یافته در تهران:' : 'Assigned Tehran Steward:'}
                              </label>
                              <select
                                value={ord.assignedStewardNameFa}
                                onChange={(e) => {
                                  if (!onUpdateBackdoorOrder) return;
                                  onUpdateBackdoorOrder({
                                    ...ord,
                                    assignedStewardNameFa: e.target.value,
                                    assignedStewardNameEn: e.target.value,
                                  });
                                  triggerSavedToast(
                                    `همراه سفارش ${ord.referenceCode} بروزرسانی شد.`,
                                    `Assigned steward updated for ${ord.referenceCode}.`
                                  );
                                }}
                                className="w-full bg-[#151816] border border-white/15 focus:border-[#C8A96A] px-3 py-1.5 text-[#F5F2EB] outline-none"
                              >
                                {STEWARD_OPTIONS.map((st, idx) => (
                                  <option key={idx} value={st.fa}>
                                    {isFa ? st.fa : st.en}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* 5-Stage Pipeline Buttons */}
                          <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5 pt-1">
                            {stageNamesFa.map((lbl, idx) => {
                              const isCurrent = ord.currentStageIndex === idx;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    if (onUpdateBackdoorOrder) {
                                      onUpdateBackdoorOrder({
                                        ...ord,
                                        currentStageIndex: idx,
                                      });
                                    }
                                    if (
                                      onAdvanceTrackedOrderStage &&
                                      activeTrackedOrder?.referenceCode === ord.referenceCode
                                    ) {
                                      onAdvanceTrackedOrderStage(idx);
                                    }
                                    triggerSavedToast(
                                      `مرحله سفارش ${ord.referenceCode} به «${lbl}» تغییر یافت.`,
                                      `Order ${ord.referenceCode} advanced to Stage ${idx + 1}.`
                                    );
                                  }}
                                  className={`p-2 text-[11px] border text-start transition-all cursor-pointer ${
                                    isCurrent
                                      ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] font-bold'
                                      : 'bg-[#151816] text-[#9E988E] border-white/10 hover:border-[#C8A96A]/50 hover:text-[#F5F2EB]'
                                  }`}
                                >
                                  {lbl}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Concierge Chat Inquiries Inbox */}
                  <div className="bg-[#151816] border border-white/10 p-5 space-y-4">
                    <h3 className="font-serif text-xl text-[#C8A96A] flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>
                        {isFa
                          ? `صندوق پیام‌های گفتگوی آنلاین و میز هماهنگی (${conciergeMessages.length})`
                          : `Concierge Chat Inquiries Inbox (${conciergeMessages.length})`}
                      </span>
                    </h3>

                    <div className="space-y-3">
                      {conciergeMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className="bg-[#0D0F0E] border border-white/10 p-4 space-y-2.5 text-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-semibold text-[#F5F2EB]">
                              {msg.senderName} ({msg.senderContact})
                            </span>
                            <span
                              className={`px-2 py-0.5 font-mono text-[10px] ${
                                msg.status === 'unread'
                                  ? 'bg-[#C8A96A] text-[#0D0F0E] font-bold'
                                  : 'bg-[#2E5A44]/35 text-[#8FE3B8]'
                              }`}
                            >
                              {msg.status === 'unread'
                                ? isFa
                                  ? 'جدید (پاسخ‌داده‌نشده)'
                                  : 'UNREAD'
                                : isFa
                                ? 'پاسخ داده شد'
                                : 'REPLIED'}
                            </span>
                          </div>
                          <p className="text-[#F5F2EB]/90">{msg.message}</p>

                          {msg.adminReply && (
                            <div className="p-2.5 bg-[#151A17] border border-[#3E7B5E] text-[#8FE3B8]">
                              <strong>{isFa ? 'پاسخ ثبت‌شده:' : 'Sent Reply:'}</strong> {msg.adminReply}
                            </div>
                          )}

                          {onReplyConciergeMessage && (
                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="text"
                                value={replyDrafts[msg.id] || ''}
                                onChange={(e) =>
                                  setReplyDrafts({
                                    ...replyDrafts,
                                    [msg.id]: e.target.value,
                                  })
                                }
                                placeholder={
                                  isFa
                                    ? 'پاسخ مستقیم به مشتری (در ویجت چت نمایش داده می‌شود)...'
                                    : 'Write reply to customer...'
                                }
                                className="flex-1 bg-[#151816] border border-white/15 focus:border-[#C8A96A] px-3 py-1.5 text-xs text-[#F5F2EB] outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const text = replyDrafts[msg.id]?.trim();
                                  if (!text) return;
                                  onReplyConciergeMessage(msg.id, text);
                                  setReplyDrafts({ ...replyDrafts, [msg.id]: '' });
                                  triggerSavedToast(
                                    'پاسخ شما برای مشتری ارسال شد.',
                                    'Reply sent to customer chat widget.'
                                  );
                                }}
                                className="px-3.5 py-1.5 bg-[#C8A96A] text-[#0D0F0E] font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Send className="w-3 h-3" />
                                <span>{isFa ? 'ارسال پاسخ' : 'Reply'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submitted Family Satisfaction Reviews */}
                  <div className="bg-[#151816] border border-white/10 p-5 space-y-4">
                    <h3 className="font-serif text-xl text-[#C8A96A] flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span>
                        {isFa
                          ? `نظرات ثبت‌شده در نظرسنجی رضایت خانواده (${submittedReviews.length})`
                          : `Submitted Family Satisfaction Surveys (${submittedReviews.length})`}
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {submittedReviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-[#0D0F0E] border border-white/10 p-4 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[#C8A96A] font-semibold">
                              {rev.referenceCode} · {'★'.repeat(rev.rating)}
                            </span>
                            {onToggleApproveReview && (
                              <button
                                type="button"
                                onClick={() => onToggleApproveReview(rev.id)}
                                className={`px-2.5 py-1 text-[10px] border cursor-pointer ${
                                  rev.approved
                                    ? 'bg-[#2E5A44]/40 border-[#3E7B5E] text-[#F5F2EB]'
                                    : 'bg-[#151816] border-white/20 text-[#9E988E]'
                                }`}
                              >
                                {rev.approved
                                  ? isFa
                                    ? 'تاییدشده در پرونده'
                                    : 'Approved'
                                  : isFa
                                  ? 'تایید نظر'
                                  : 'Approve'}
                              </button>
                            )}
                          </div>
                          <p className="text-[#F5F2EB]/90 italic">“{rev.comment}”</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CUSTOMER PROFILES & PARENT CARE DOSSIERS MANAGEMENT */}
              {activeTab === 'users' && (
                <div className="space-y-5">
                  <div className="bg-[#151816] border border-[#C8A96A]/40 p-4 text-xs text-[#9E988E]">
                    {isFa
                      ? 'تمامی حساب‌های کاربری ثبت‌نام‌شده به همراه «پرونده اختصاصی والدین در تهران» (نشانی، فروشگاه‌های محبوب، محدودیت نمک/قند و پزشکان) در این بخش قابل بررسی، تایید و ویرایش توسط مدیر هستند.'
                      : 'All registered family members and their Parents’ Tehran Care Profiles (addresses, grocers, dietary restrictions, doctors) can be audited and updated here.'}
                  </div>

                  <div className="space-y-4">
                    {registeredUsers.map((usr) => (
                      <div
                        key={usr.id}
                        className="bg-[#151816] border border-white/15 p-5 space-y-4 text-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                          <div>
                            <h4 className="font-serif text-lg text-[#F5F2EB] font-semibold">
                              {usr.fullName}
                            </h4>
                            <span className="font-mono text-[#C8A96A]">
                              {usr.email} · {usr.phoneOrWhatsapp} · {usr.countryOfResidence}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={usr.membershipTier}
                              onChange={(e) => {
                                if (!onUpdateRegisteredUser) return;
                                onUpdateRegisteredUser({
                                  ...usr,
                                  membershipTier: e.target.value as RegisteredFamilyUser['membershipTier'],
                                });
                                triggerSavedToast(
                                  `سطح عضویت ${usr.fullName} بروزرسانی شد.`,
                                  `Membership tier updated for ${usr.fullName}.`
                                );
                              }}
                              className="bg-[#0D0F0E] border border-[#C8A96A]/50 px-3 py-1.5 text-[#C8A96A] font-semibold outline-none"
                            >
                              <option value="Standard">Standard</option>
                              <option value="Silver">Silver Plan</option>
                              <option value="Gold">Gold Plan</option>
                              <option value="Royal VIP">Royal VIP</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                if (!onUpdateRegisteredUser) return;
                                onUpdateRegisteredUser({
                                  ...usr,
                                  verifiedStatus:
                                    usr.verifiedStatus === 'verified'
                                      ? 'pending_review'
                                      : 'verified',
                                });
                              }}
                              className={`px-3 py-1.5 border font-semibold cursor-pointer ${
                                usr.verifiedStatus === 'verified'
                                  ? 'bg-[#2E5A44]/40 border-[#3E7B5E] text-[#8FE3B8]'
                                  : 'bg-[#C85A5A]/20 border-[#C85A5A] text-[#F5F2EB]'
                              }`}
                            >
                              {usr.verifiedStatus === 'verified'
                                ? isFa
                                  ? '✓ هویت و رضایت والدین تاییدشده'
                                  : '✓ Verified Profile'
                                : isFa
                                ? 'در انتظار تایید تلفنی'
                                : 'Pending Verification'}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#0D0F0E] p-3.5 border border-white/10">
                          <div>
                            <span className="text-[#9E988E] block mb-0.5">
                              {isFa ? 'والدین و نشانی تهران:' : 'Parents & Tehran Address:'}
                            </span>
                            <p className="text-[#F5F2EB] font-medium">
                              {usr.parentProfile.parentNames}
                            </p>
                            <p className="text-[#9E988E] mt-0.5">
                              {usr.parentProfile.residenceAddress}
                            </p>
                          </div>
                          <div>
                            <span className="text-[#9E988E] block mb-0.5">
                              {isFa ? 'رژیم غذایی و فروشگاه‌های محبوب:' : 'Diet & Preferred Grocers:'}
                            </span>
                            <p className="text-[#C8A96A]">
                              {usr.parentProfile.dietarySodiumSugarLimits.join(' · ')}
                            </p>
                            <p className="text-[#F5F2EB]/90 mt-0.5">
                              {usr.parentProfile.preferredLocalGrocers}
                            </p>
                          </div>
                          <div>
                            <span className="text-[#9E988E] block mb-0.5">
                              {isFa ? 'پزشکان و یادداشت مدیریت:' : 'Doctors & Admin Notes:'}
                            </span>
                            <p className="text-[#F5F2EB]/90">
                              {usr.parentProfile.preferredDoctorsAndClinics}
                            </p>
                            <p className="text-[#8FE3B8] mt-0.5">{usr.adminNotes}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: LIVE EXTERNAL SUPERMARKET API PRICE SYNC SERVICE */}
              {activeTab === 'market-sync' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#17201B] to-[#131715] border-2 border-[#C8A96A] p-5 sm:p-6 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold block mb-1">
                          {isFa
                            ? 'سرویس استعلام زنده قیمت از API سوپرمارکت‌های آنلاین تهران (supermarketPriceSyncService.ts)'
                            : 'Live External Supermarket Pricing Service (supermarketPriceSyncService.ts)'}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB]">
                          {isFa
                            ? 'بروزرسانی خودکار `productsCatalog` از اسنپ‌مارکت، دیجی‌کالا جت، هایپراستار و شهروند'
                            : 'Automatically Update `productsCatalog` from Live Supermarket APIs'}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {onToggleAutoPriceSync && (
                          <label className="px-3.5 py-2.5 bg-[#0D0F0E] border border-[#3E7B5E] text-xs text-[#F5F2EB] flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={autoPriceSyncEnabled}
                              onChange={(e) => onToggleAutoPriceSync(e.target.checked)}
                              className="accent-[#C8A96A]"
                            />
                            <span>
                              {isFa
                                ? 'همگام‌سازی خودکار پس‌زمینه (Auto-Sync)'
                                : 'Background Auto-Sync Active'}
                            </span>
                          </label>
                        )}

                        <button
                          type="button"
                          onClick={handleRunSupermarketPriceSync}
                          disabled={isSyncingPrices}
                          className="px-5 py-3 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.14em] font-bold flex items-center gap-2 cursor-pointer shrink-0 shadow-[0_0_25px_rgba(200,169,106,0.35)]"
                        >
                          <RefreshCw
                            className={`w-4 h-4 ${isSyncingPrices ? 'animate-spin' : ''}`}
                          />
                          <span>
                            {isSyncingPrices
                              ? isFa
                                ? 'در حال دریافت قیمت از API...'
                                : 'Fetching Live API Quotes...'
                              : isFa
                              ? 'استعلام و بروزرسانی آنی قیمت‌ها'
                              : 'Fetch & Update Catalog Prices Now'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Strategy Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSyncStrategy('lowest-receipt')}
                        className={`p-3 text-xs border text-start cursor-pointer ${
                          syncStrategy === 'lowest-receipt'
                            ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-[#F5F2EB] font-semibold'
                            : 'bg-[#0D0F0E] border-white/10 text-[#9E988E]'
                        }`}
                      >
                        {isFa
                          ? '۱. انتخاب خودکار کمترین قیمت فاکتور بین ۴ سوپرمارکت'
                          : '1. Lowest Receipt Price Across Connected Supermarkets'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSyncStrategy('primary-store')}
                        className={`p-3 text-xs border text-start cursor-pointer ${
                          syncStrategy === 'primary-store'
                            ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-[#F5F2EB] font-semibold'
                            : 'bg-[#0D0F0E] border-white/10 text-[#9E988E]'
                        }`}
                      >
                        {isFa
                          ? '۲. اولویت با فروشگاه منتخب محله والدین'
                          : '2. Primary Neighborhood Supermarket Priority'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSyncStrategy('average-market')}
                        className={`p-3 text-xs border text-start cursor-pointer ${
                          syncStrategy === 'average-market'
                            ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-[#F5F2EB] font-semibold'
                            : 'bg-[#0D0F0E] border-white/10 text-[#9E988E]'
                        }`}
                      >
                        {isFa
                          ? '۳. میانگین موزون قیمت روز بازار تهران'
                          : '3. Weighted Average Tehran Market Price'}
                      </button>
                    </div>
                  </div>

                  {/* Connected APIs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {apis.map((api) => (
                      <div
                        key={api.id}
                        className={`bg-[#151816] border p-4 space-y-2 ${
                          api.enabled ? 'border-[#C8A96A]/55' : 'border-white/10 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#3E7B5E]">
                            {api.syncMethod}
                          </span>
                          <input
                            type="checkbox"
                            checked={api.enabled}
                            onChange={(e) =>
                              setApis((prev) =>
                                prev.map((a) =>
                                  a.id === api.id
                                    ? { ...a, enabled: e.target.checked }
                                    : a
                                )
                              )
                            }
                            className="accent-[#C8A96A] cursor-pointer"
                          />
                        </div>
                        <h4 className="font-serif text-sm text-[#F5F2EB] font-semibold">
                          {isFa ? api.nameFa : api.nameEn}
                        </h4>
                        <p className="font-mono text-[10px] text-[#C8A96A] truncate">
                          {api.apiEndpoint}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Live Multi-Store Price Comparison Table */}
                  {localSyncReport && (
                    <div className="bg-[#151816] border border-white/10 p-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-serif text-lg text-[#C8A96A]">
                          {isFa
                            ? `جدول مقایسه زنده قیمت‌های دریافت‌شده (${localSyncReport.syncId} · ${localSyncReport.timestampFa})`
                            : `Live Multi-Supermarket SKU Quote Comparison (${localSyncReport.syncId})`}
                        </h4>
                        <span className="text-xs text-[#3E7B5E] font-mono">
                          {isFa
                            ? `${localSyncReport.totalSkusUpdated} کالا در productsCatalog بروزرسانی شد`
                            : `${localSyncReport.totalSkusUpdated} SKUs updated in productsCatalog`}
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#0D0F0E] text-[#C8A96A] border-b border-white/15">
                              <th className="p-2.5 text-start">
                                {isFa ? 'نام کالای سوپرمارکتی' : 'Product'}
                              </th>
                              <th className="p-2.5 text-start">
                                {isFa ? 'قیمت قبلی' : 'Prev Price'}
                              </th>
                              <th className="p-2.5 text-start">
                                {isFa ? 'قیمت جدید کاتالوگ' : 'Synced Price'}
                              </th>
                              <th className="p-2.5 text-start">
                                {isFa ? 'فروشگاه مرجع منتخب' : 'Winning Store Feed'}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {localSyncReport.itemQuotes.slice(0, 8).map((q) => (
                              <tr
                                key={q.productId}
                                className="border-b border-white/5 hover:bg-white/[0.02]"
                              >
                                <td className="p-2.5 text-[#F5F2EB]">
                                  {isFa ? q.productNameFa : q.productNameEn}
                                </td>
                                <td className="p-2.5 font-mono text-[#9E988E]">
                                  ${q.previousPriceUsd}
                                </td>
                                <td className="p-2.5 font-mono text-[#C8A96A] font-bold">
                                  ${q.syncedPriceUsd}
                                </td>
                                <td className="p-2.5 text-[#8FE3B8]">
                                  {isFa ? q.winningStoreFa : q.winningStoreEn}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: MANAGE SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleAddService}
                    className="bg-[#151816] border border-[#C8A96A]/45 p-5 space-y-4"
                  >
                    <h3 className="font-serif text-lg text-[#C8A96A] flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>
                        {isFa
                          ? 'افزودن خدمت جدید به فهرست خدمات آسا'
                          : 'Add New Service to Asa Directory'}
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <input
                        type="text"
                        value={newServiceTitleFa}
                        onChange={(e) => setNewServiceTitleFa(e.target.value)}
                        placeholder={isFa ? 'عنوان خدمت (فارسی)...' : 'Service Title (Farsi)...'}
                        className="bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                      />
                      <input
                        type="text"
                        value={newServiceTitleEn}
                        onChange={(e) => setNewServiceTitleEn(e.target.value)}
                        placeholder={
                          isFa ? 'عنوان انگلیسی (اختیاری)...' : 'Service Title (English)...'
                        }
                        className="bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                      />
                      <select
                        value={newServiceDept}
                        onChange={(e) =>
                          setNewServiceDept(
                            e.target.value as Exclude<ServiceDepartment, 'All Divisions'>
                          )
                        }
                        className="bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                      >
                        <option value="Asa Hamrah">آسا همراه (Asa Hamrah)</option>
                        <option value="Asa Khoraak">آسا خوراک (Asa Khoraak)</option>
                        <option value="Asa Pezeshk">آسا پزشک (Asa Pezeshk)</option>
                      </select>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={newServicePrice}
                          onChange={(e) => setNewServicePrice(e.target.value)}
                          placeholder="Price (USD)"
                          className="w-28 bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] font-mono outline-none"
                        />
                        <button
                          type="submit"
                          className="flex-1 py-2 px-3 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isFa ? 'افزودن خدمت' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="space-y-2.5">
                    {services.map((srv) => {
                      const isEditing = editingServiceId === srv.id;
                      return (
                        <div
                          key={srv.id}
                          className="bg-[#151816] border border-white/10 p-4 flex flex-col gap-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1 min-w-0">
                              <span className="text-[10px] uppercase tracking-wider text-[#C8A96A] block">
                                {isFa ? SERVICE_DEPT_FA[srv.department] : srv.department}
                              </span>
                              <p className="font-serif text-base text-[#F5F2EB] truncate">
                                {isFa ? srv.titleFa : srv.title}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <div className="flex items-center gap-1 bg-[#0D0F0E] border border-white/15 px-2.5 py-1">
                                <span className="text-[10px] text-[#9E988E]">$</span>
                                <input
                                  type="number"
                                  min="0"
                                  value={srv.price}
                                  onChange={(e) =>
                                    handleUpdateServiceField(
                                      srv.id,
                                      'price',
                                      Math.max(0, Number(e.target.value) || 0)
                                    )
                                  }
                                  className="w-16 bg-transparent text-xs font-mono text-[#C8A96A] outline-none"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setEditingServiceId(isEditing ? null : srv.id)
                                }
                                className="px-3 py-1.5 bg-[#0D0F0E] border border-white/15 hover:border-[#C8A96A] text-xs text-[#F5F2EB] flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#C8A96A]" />
                                <span>{isFa ? 'ویرایش متن' : 'Edit Text'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteService(srv.id)}
                                className="p-1.5 bg-[#0D0F0E] border border-white/15 hover:border-[#C85A5A] text-[#9E988E] hover:text-[#C85A5A] cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {isEditing && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10">
                              <input
                                type="text"
                                value={srv.titleFa}
                                onChange={(e) =>
                                  handleUpdateServiceField(srv.id, 'titleFa', e.target.value)
                                }
                                className="w-full bg-[#0D0F0E] border border-white/15 px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                              />
                              <input
                                type="text"
                                value={srv.title}
                                onChange={(e) =>
                                  handleUpdateServiceField(srv.id, 'title', e.target.value)
                                }
                                className="w-full bg-[#0D0F0E] border border-white/15 px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 6: MANAGE SUPERMARKET PRODUCTS */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleAddProduct}
                    className="bg-[#151816] border border-[#C8A96A]/45 p-5 space-y-4"
                  >
                    <h3 className="font-serif text-lg text-[#C8A96A] flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>
                        {isFa
                          ? 'افزودن کالای جدید به سوپرمارکت و آسا خوراک'
                          : 'Add New Grocery or Meal Product'}
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      <input
                        type="text"
                        value={newProdNameFa}
                        onChange={(e) => setNewProdNameFa(e.target.value)}
                        placeholder={isFa ? 'نام کالا (فارسی)...' : 'Product Name (Farsi)...'}
                        className="bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                      />
                      <input
                        type="text"
                        value={newProdNameEn}
                        onChange={(e) => setNewProdNameEn(e.target.value)}
                        placeholder={isFa ? 'نام انگلیسی (اختیاری)...' : 'Product Name (EN)...'}
                        className="bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                      />
                      <select
                        value={newProdCategory}
                        onChange={(e) =>
                          setNewProdCategory(
                            e.target.value as Exclude<GroceryCategory, 'All Provisions'>
                          )
                        }
                        className="bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                      >
                        <option value="Asa Khoraak Prepared Meals">آسا خوراک (غذاهای آماده)</option>
                        <option value="Fresh Tehran Orchard Produce">میوه و سبزیجات دست‌چین</option>
                        <option value="Sangak Bakery & Traditional Dairy">نان سنگک و لبنیات</option>
                        <option value="Persian Pantry & Healthy Oils">برنج، زعفران و روغن سالم</option>
                        <option value="Fresh Butcher & Daily Catch">گوشت و پروتئین تازه</option>
                        <option value="Home Comfort & Senior Care Essentials">مراقبت و بهداشت منزل</option>
                      </select>
                      <input
                        type="text"
                        value={newProdUnitFa}
                        onChange={(e) => setNewProdUnitFa(e.target.value)}
                        placeholder={isFa ? 'واحد (مثلاً ۱ کیلوگرم)...' : 'Unit size...'}
                        className="bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0.5"
                          step="0.5"
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          className="w-20 bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-2.5 py-2 text-xs font-mono text-[#F5F2EB] outline-none"
                        />
                        <button
                          type="submit"
                          className="flex-1 py-2 px-3 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isFa ? 'افزودن' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-[#151816] border border-white/10 p-3.5 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={prod.image}
                            alt={prod.nameFa}
                            referrerPolicy="no-referrer"
                            className="w-11 h-11 object-cover border border-white/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] text-[#C8A96A] block truncate">
                              {isFa ? GROCERY_CAT_FA[prod.category] : prod.category}
                            </span>
                            <p className="text-xs sm:text-sm text-[#F5F2EB] font-medium truncate">
                              {isFa ? prod.nameFa : prod.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center gap-1 bg-[#0D0F0E] border border-white/15 px-2 py-1">
                            <span className="text-[10px] text-[#9E988E]">$</span>
                            <input
                              type="number"
                              min="0.5"
                              step="0.5"
                              value={prod.price}
                              onChange={(e) =>
                                handleUpdateProductPrice(
                                  prod.id,
                                  Number(e.target.value) || prod.price
                                )
                              }
                              className="w-14 bg-transparent text-xs font-mono text-[#C8A96A] outline-none"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 bg-[#0D0F0E] border border-white/15 hover:border-[#C85A5A] text-[#9E988E] hover:text-[#C85A5A] cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: 3 PAYMENT GATEWAYS CONFIGURATION */}
              {activeTab === 'gateways' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {paymentGateways.map((gw, idx) => (
                    <div
                      key={gw.id}
                      className={`bg-[#151816] border p-5 flex flex-col justify-between space-y-4 ${
                        gw.enabled ? 'border-[#C8A96A]/55' : 'border-white/10 opacity-65'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8A96A]">
                            {isFa ? `درگاه شماره ${idx + 1}` : `Gateway #${idx + 1}`}
                          </span>
                          <label className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              checked={gw.enabled}
                              onChange={(e) =>
                                handleUpdateGateway(gw.id, { enabled: e.target.checked })
                              }
                              className="accent-[#C8A96A]"
                            />
                            <span
                              className={
                                gw.enabled ? 'text-[#3E7B5E] font-semibold' : 'text-[#9E988E]'
                              }
                            >
                              {gw.enabled ? (isFa ? 'فعال' : 'Active') : isFa ? 'غیرفعال' : 'Disabled'}
                            </span>
                          </label>
                        </div>

                        <input
                          type="text"
                          value={gw.nameFa}
                          onChange={(e) =>
                            handleUpdateGateway(gw.id, { nameFa: e.target.value })
                          }
                          className="w-full bg-[#0D0F0E] border border-white/15 px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                        />

                        <input
                          type="text"
                          value={gw.merchantIdOrEndpoint}
                          onChange={(e) =>
                            handleUpdateGateway(gw.id, {
                              merchantIdOrEndpoint: e.target.value,
                            })
                          }
                          className="w-full bg-[#0D0F0E] border border-[#C8A96A]/40 px-3 py-2 text-xs font-mono text-[#C8A96A] outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 8: EDIT PAGES & BRAND MOTTO */}
              {activeTab === 'pages' && (
                <div className="bg-[#151816] border border-[#C8A96A]/45 p-5 sm:p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#C8A96A] block mb-1.5">
                        {isFa ? 'نام برند در کنار لوگو (فارسی):' : 'Brand Name beside Logo (FA):'}
                      </label>
                      <input
                        type="text"
                        value={siteConfig.brandNameFa}
                        onChange={(e) =>
                          onUpdateSiteConfig({ ...siteConfig, brandNameFa: e.target.value })
                        }
                        className="w-full bg-[#0D0F0E] border border-white/15 px-3.5 py-2.5 text-xs text-[#F5F2EB] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#C8A96A] block mb-1.5">
                        {isFa ? 'شعار رسمی آسا (معنای واژه ASA به فارسی):' : 'Official ASA Motto:'}
                      </label>
                      <input
                        type="text"
                        value={siteConfig.brandMottoFa}
                        onChange={(e) =>
                          onUpdateSiteConfig({ ...siteConfig, brandMottoFa: e.target.value })
                        }
                        className="w-full bg-[#0D0F0E] border border-[#C8A96A]/50 px-3.5 py-2.5 text-xs text-[#C8A96A] font-semibold outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: BILINGUAL JSON LOCALIZATION DICTIONARY MANAGER */}
              {activeTab === 'localization' && (
                <div className="bg-[#151816] border border-[#C8A96A]/45 p-5 sm:p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <h4 className="font-serif text-xl text-[#F5F2EB] flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[#C8A96A]" />
                        <span>{t('admin.localizationEditor.title')}</span>
                      </h4>
                      <p className="text-xs text-[#9E988E] mt-1">
                        {t('admin.localizationEditor.subtitle')}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          resetDictionariesToDefault();
                          triggerSavedToast(
                            t('admin.localizationEditor.savedToast'),
                            t('admin.localizationEditor.savedToast')
                          );
                        }}
                        className="px-3 py-2 bg-[#0D0F0E] border border-white/15 hover:border-[#C8A96A] text-xs text-[#9E988E] hover:text-[#F5F2EB] flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-[#C8A96A]" />
                        <span>{t('admin.localizationEditor.resetTranslations')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={exportActiveLocaleJson}
                        className="px-3 py-2 bg-[#C8A96A] text-[#0D0F0E] font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t('admin.localizationEditor.exportJson')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#C8A96A] absolute top-3 start-3.5" />
                    <input
                      type="text"
                      value={i18nSearchQuery}
                      onChange={(e) => setI18nSearchQuery(e.target.value)}
                      placeholder={t('admin.localizationEditor.searchPlaceholder')}
                      className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] ps-10 pe-4 py-2.5 text-xs text-[#F5F2EB] outline-none"
                    />
                  </div>

                  {/* Editable JSON Key-Value Table */}
                  <div className="max-h-[420px] overflow-y-auto border border-white/10">
                    <table className="w-full text-start text-xs border-collapse">
                      <thead className="bg-[#0D0F0E] sticky top-0 z-10 border-b border-white/15 text-[#C8A96A]">
                        <tr>
                          <th className="p-3 text-start font-mono w-1/4">
                            {t('admin.localizationEditor.keyColumn')}
                          </th>
                          <th className="p-3 text-start w-3/8">
                            {t('admin.localizationEditor.faColumn')}
                          </th>
                          <th className="p-3 text-start w-3/8">
                            {t('admin.localizationEditor.enColumn')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredI18nEntries.map((item) => (
                          <tr key={item.keyPath} className="hover:bg-white/[0.02]">
                            <td className="p-2.5 font-mono text-[11px] text-[#C8A96A] align-top">
                              {item.keyPath}
                            </td>
                            <td className="p-2 align-top">
                              <input
                                type="text"
                                dir="rtl"
                                value={item.faValue}
                                onChange={(e) =>
                                  updateTranslationKey(
                                    item.keyPath,
                                    'fa',
                                    e.target.value
                                  )
                                }
                                className="w-full bg-[#0D0F0E] border border-white/10 focus:border-[#C8A96A] px-2.5 py-1.5 text-xs text-[#F5F2EB] outline-none"
                              />
                            </td>
                            <td className="p-2 align-top">
                              <input
                                type="text"
                                dir="ltr"
                                value={item.enValue}
                                onChange={(e) =>
                                  updateTranslationKey(
                                    item.keyPath,
                                    'en',
                                    e.target.value
                                  )
                                }
                                className="w-full bg-[#0D0F0E] border border-white/10 focus:border-[#C8A96A] px-2.5 py-1.5 text-xs text-[#F5F2EB] outline-none"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 bg-[#151A17] border-t border-white/10 flex items-center justify-between text-xs text-[#9E988E] shrink-0">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3E7B5E]" />
                {t('admin.badge')}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-[#C8A96A] text-[#0D0F0E] font-semibold uppercase tracking-wider cursor-pointer"
              >
                {t('admin.closeAndApply')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
