import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Check,
  Globe,
  Activity,
  Film,
  Home,
  MapPin,
  FileCheck2,
  HelpCircle,
  ChevronDown,
  Mic,
  ShieldCheck,
  Quote,
  Coins,
  Zap,
  Compass,
  Layers,
  LayoutGrid,
  Play,
  RotateCcw,
  Settings,
  User,
  RefreshCw,
  Download,
} from 'lucide-react';
import heroImage from './assets/images/hero_luxury_estate_market_1794671927456.jpg';
import asaBrandLogo from './assets/images/asa_luxury_brand_logo_1794678377299.jpg';
import {
  ESTATE_SERVICES,
  GROCERY_PRODUCTS,
  SERVICE_DEPT_FA,
  GROCERY_CAT_FA,
  TEHRAN_SERVICE_ZONES,
  ASA_FAQS,
  CLIENT_TESTIMONIALS,
  EstateService,
  GroceryProduct,
  CuratedFamilyBundle,
  ServiceDepartment,
  GroceryCategory,
  Language,
  CurrencyCode,
  formatPrice,
} from './data/catalogData';
import { ServicesSection } from './components/ServicesSection';
import { SupermarketSection } from './components/SupermarketSection';
import { TeamSection } from './components/TeamSection';
import { OrderDrawer, LastOrderSnapshot } from './components/OrderDrawer';
import {
  OrderTrackingModal,
  ActiveTrackedOrder,
  SubmittedSatisfactionReview,
} from './components/OrderTrackingModal';
import { LuxuryLogoArtworkTransition } from './components/LuxuryLogoArtworkTransition';
import { WelcomeTour, WELCOME_TOUR_STEPS } from './components/WelcomeTour';
import {
  AdminDashboardModal,
  PaymentGatewayConfig,
  SiteContentConfig,
} from './components/AdminDashboardModal';
import {
  ParentCareProfileModal,
  ParentCareProfile,
  INITIAL_PARENT_CARE_PROFILE,
} from './components/ParentCareProfileModal';
import {
  ConciergeChatWidget,
  ConciergeInquiryMessage,
} from './components/ConciergeChatWidget';
import {
  FamilyPeaceSuite,
  PeaceSubscriptionTier,
  SavedFamilyOccasion,
} from './components/FamilyPeaceSuite';
import {
  AuthProfileModal,
  RegisteredFamilyUser,
  BackdoorOrderRecord,
  INITIAL_REGISTERED_USERS,
  INITIAL_BACKDOOR_ORDERS,
} from './components/AuthProfileModal';
import {
  fetchLiveSupermarketPricing,
  DEFAULT_SUPERMARKET_APIS,
  ExternalSupermarketApiConfig,
  PriceSyncStrategy,
  SupermarketSyncReport,
} from './services/supermarketPriceSyncService';
import { WaitlistJoinModal } from './components/WaitlistJoinModal';
import { useLocalization } from './i18n/LocalizationContext';

type ActiveSectionId = 'hero' | 'services' | 'supermarket' | 'team' | 'philosophy';

const SERVICE_DEPARTMENTS: ServiceDepartment[] = [
  'All Divisions',
  'Asa Hamrah',
  'Asa Khoraak',
  'Asa Pezeshk',
];

const GROCERY_CATEGORIES: GroceryCategory[] = [
  'All Provisions',
  'Asa Khoraak Prepared Meals',
  'Fresh Tehran Orchard Produce',
  'Fresh Butcher & Daily Catch',
  'Sangak Bakery & Traditional Dairy',
  'Persian Pantry & Healthy Oils',
  'Home Comfort & Senior Care Essentials',
];

const INITIAL_PAYMENT_GATEWAYS: PaymentGatewayConfig[] = [
  {
    id: 'gateway-intl-card',
    code: 'INTL-CARD',
    nameFa: 'درگاه ۱: پرداخت بین‌المللی (Visa / Mastercard / Apple Pay)',
    nameEn: 'Gateway 1: International Card (Visa / Mastercard / Apple Pay)',
    subtitleFa: 'تسویه آنی ارزی ویژه فرزندان مقیم خارج از کشور (USD / EUR)',
    subtitleEn: 'Instant overseas checkout in USD or EUR',
    badgeFa: 'پیشنهادی خارج از کشور',
    badgeEn: 'Overseas Preferred',
    supportedCurrencies: ['USD', 'EUR'],
    merchantIdOrEndpoint: 'STRIPE_LIVE_ASA_INTL_01',
    enabled: true,
    instructionsFa:
      'پرداخت امن با کلیه کارت‌های بانکی بین‌المللی (دلار و یورو) با صدور رسید آنی.',
    instructionsEn:
      'Secure checkout with international credit/debit cards & Apple Pay in USD or EUR.',
  },
  {
    id: 'gateway-shetab-irr',
    code: 'SHETAB-IRR',
    nameFa: 'درگاه ۲: درگاه بانکی شتاب (زرین‌پال / سامان‌کیش - ریالی)',
    nameEn: 'Gateway 2: Iranian Shetab Banking Portal (ZarinPal / Saman - IRR)',
    subtitleFa: 'پرداخت مستقیم ریالی با کلیه کارت‌های بانکی عضو شبکه شتاب',
    subtitleEn: 'Direct Rial (IRR) settlement via Iranian Shetab cards',
    badgeFa: 'ویژه کارت‌های ایران (ریال)',
    badgeEn: 'Iran Shetab (IRR)',
    supportedCurrencies: ['IRR'],
    merchantIdOrEndpoint: 'ZARINPAL_MERCHANT_ASA_02',
    enabled: true,
    instructionsFa:
      'اتصال مستقیم به شبکه شتاب جهت پرداخت ریالی با رمز پویا و صدور فاکتور رسمی.',
    instructionsEn:
      'Direct Iranian Shetab card payment in Rial (IRR) with instant receipt.',
  },
  {
    id: 'gateway-crypto-transfer',
    code: 'USDT-WISE',
    nameFa: 'درگاه ۳: پرداخت ارزی دیجیتال و حواله مستقیم (USDT / Wise / PayPal)',
    nameEn: 'Gateway 3: Digital Currency & Concierge Transfer (USDT / Wise / PayPal)',
    subtitleFa: 'تسویه سریع بین‌المللی بدون محدودیت بانکی (تتر / وایز / پی‌پال)',
    subtitleEn: 'Borderless instant settlement via USDT, Wise, or PayPal',
    badgeFa: 'بدون مرز و سریع',
    badgeEn: 'Borderless Transfer',
    supportedCurrencies: ['USD', 'EUR', 'IRR'],
    merchantIdOrEndpoint: 'ASA_CONCIERGE_VAULT_03',
    enabled: true,
    instructionsFa:
      'مناسب انتقال سریع از هر نقطه دنیا بدون کارمزد تبدیل ارز بانکی.',
    instructionsEn:
      'Ideal for borderless transfers from any country with zero bank FX friction.',
  },
];

const INITIAL_SITE_CONFIG: SiteContentConfig = {
  brandNameFa: 'آسـا',
  brandNameEn: 'ASA',
  brandMottoFa: 'آسایش · سهولت · آرامش',
  brandMottoEn: 'COMFORT · EASE · PEACE OF MIND',
  operationalCityNoteFa: 'در حال حاضر فعال در مناطق ۱ تا ۶ تهران · گسترش به‌زودی',
  operationalCityNoteEn: 'Currently Operating in Tehran (Districts 1–6)',
  heroTitleFa: 'حتی از راه دور، برای خانواده‌تان مایه آسایش، سهولت و آرامش باشید.',
  heroHighlightFa: 'همراه باشید.',
  heroTitleEn: 'Bring Comfort, Ease, and Peace of Mind to Your Family,',
  heroHighlightEn: 'even from afar.',
  heroSubtitleFa:
    'آسا (آسایش، سهولت، آرامش): خرید هفتگی منزل با فاکتور رسمی، غذای خانگی کم‌نمک و همراهی والدین در نوبت پزشک — همراه با گزارش مستند خانواده (در حال حاضر فعال در تهران).',
  heroSubtitleEn:
    'ASA (Comfort, Ease, Peace of Mind): Weekly home shopping at store receipt price, low-sodium Persian meals, and doctor visit accompaniment — currently operating across Tehran.',
};

const INITIAL_LAST_ORDER: LastOrderSnapshot = {
  referenceCode: 'ASA-841092',
  dateLabelFa: 'هفته گذشته',
  dateLabelEn: 'Last Week',
  serviceIds: ['asa-h-01', 'asa-p-01'],
  productQuantities: {
    'prd-01': 2,
    'prd-05': 1,
    'prd-09': 2,
    'prd-10': 1,
  },
  specialInstructions:
    'رژیم کم‌نمک و کم‌چرب (مناسب فشار خون) · میوه‌ها دست‌چین، نرم و کاملاً رسیده باشند · تماس تلفنی ۱۵ دقیقه قبل از زنگ درب منزل',
  recipientName: 'خانم توران راد',
  residenceAddress: 'زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴',
};

export default function App() {
  // Full JSON-based Localization Framework state ('fa' | 'en')
  const { lang, setLang, isFa, t } = useLocalization();

  // Global Currency Toggle ('USD' | 'EUR' | 'IRR') for order estimation
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // Dynamic Catalog & Site Config States (Editable live via Admin Dashboard)
  const [servicesCatalog, setServicesCatalog] =
    useState<EstateService[]>(ESTATE_SERVICES);
  const [productsCatalog, setProductsCatalog] =
    useState<GroceryProduct[]>(GROCERY_PRODUCTS);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGatewayConfig[]>(
    INITIAL_PAYMENT_GATEWAYS
  );
  const [siteConfig, setSiteConfig] =
    useState<SiteContentConfig>(INITIAL_SITE_CONFIG);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Last Order Snapshot for 1-Click "Reorder from Last"
  const [lastOrder, setLastOrder] =
    useState<LastOrderSnapshot>(INITIAL_LAST_ORDER);
  const [reorderToast, setReorderToast] = useState<boolean>(false);

  // Parent Care Profile Modal State
  const [parentProfile, setParentProfile] = useState<ParentCareProfile>(
    INITIAL_PARENT_CARE_PROFILE
  );
  const [isParentProfileOpen, setIsParentProfileOpen] =
    useState<boolean>(false);

  // Registered Family Users, Active Logged-in User & Auth Modal State
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredFamilyUser[]>(
    INITIAL_REGISTERED_USERS
  );
  const [currentUser, setCurrentUser] = useState<RegisteredFamilyUser | null>(
    INITIAL_REGISTERED_USERS[0]
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState<boolean>(false);
  const [waitlistDistrictCode, setWaitlistDistrictCode] = useState<
    string | undefined
  >(undefined);

  // Backdoor Order Pipeline Records (Shared between Customer Checkout, Profile & Admin Panel)
  const [backdoorOrders, setBackdoorOrders] = useState<BackdoorOrderRecord[]>(
    INITIAL_BACKDOOR_ORDERS
  );

  // Automated External Supermarket Price Sync Service State
  const [autoPriceSyncEnabled, setAutoPriceSyncEnabled] = useState<boolean>(true);
  const [latestSyncReport, setLatestSyncReport] =
    useState<SupermarketSyncReport | null>(null);

  const handleTriggerLivePriceSync = async (
    apis: ExternalSupermarketApiConfig[] = DEFAULT_SUPERMARKET_APIS,
    strategy: PriceSyncStrategy = 'lowest-receipt'
  ) => {
    const report = await fetchLiveSupermarketPricing(
      productsCatalog,
      apis,
      strategy
    );
    setProductsCatalog(report.updatedProducts);
    setLatestSyncReport(report);
  };

  // Initial & periodic background supermarket price sync simulation
  useEffect(() => {
    if (!autoPriceSyncEnabled) return;
    const initialTimer = window.setTimeout(() => {
      handleTriggerLivePriceSync(DEFAULT_SUPERMARKET_APIS, 'lowest-receipt');
    }, 1200);

    const interval = window.setInterval(() => {
      handleTriggerLivePriceSync(DEFAULT_SUPERMARKET_APIS, 'lowest-receipt');
    }, 45000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, [autoPriceSyncEnabled]);

  // Concierge Chat Messages & Satisfaction Reviews for Admin Dashboard
  const [conciergeMessages, setConciergeMessages] = useState<
    ConciergeInquiryMessage[]
  >([
    {
      id: 'msg-1',
      senderName: 'کاوه تهرانی (تورنتو)',
      senderContact: '+1-416-555-0192',
      topic: 'برنامه غذایی کم‌نمک آسا خوراک',
      message:
        'سلام خانم بختیاری، برای مادرم در زعفرانیه پکیج هفتگی آسا خوراک بدون نمک و همراهی نوبت چشم‌پزشکی روز سه‌شنبه را می‌خواستم هماهنگ کنم.',
      createdAt: '۱۱:۲۰ صبح تهران',
      status: 'unread',
    },
  ]);

  const [submittedReviews, setSubmittedReviews] = useState<
    SubmittedSatisfactionReview[]
  >([
    {
      id: 'rev-1',
      referenceCode: 'ASA-841092',
      rating: 5,
      highlights: ['punctuality', 'receipt', 'courtesy'],
      comment:
        'مادرم از ادب و حوصله همراه آسا و چیدمان منظم میوه‌ها در یخچال فوق‌العاده راضی بودند. فاکتور رسمی فروشگاه هم دقیقاً مطابق خرید بود.',
      createdAt: 'دیروز',
      approved: true,
    },
  ]);

  // Luxury Logo Motion Artwork state (initial intro + between-section transitions)
  const [artworkTransition, setArtworkTransition] = useState<{
    isVisible: boolean;
    mode: 'intro' | 'transition';
    destinationLabel?: string;
  }>({
    isVisible: true,
    mode: 'intro',
  });

  // Interactive Welcome Tour state (Services -> Supermarket -> Order Drawer)
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [tourStepIndex, setTourStepIndex] = useState<number>(0);

  // Simplified Header Flyout Menu state
  const [isFlyoutOpen, setIsFlyoutOpen] = useState<boolean>(false);
  const flyoutRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress state (0 to 100) for the slim gold top viewport indicator
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Active viewport section for the Discreet Breadcrumb Trail
  const [activeSection, setActiveSection] = useState<ActiveSectionId>('hero');

  // Lifted nested category states so the Breadcrumb Trail always reflects deep navigation
  const [selectedDept, setSelectedDept] =
    useState<ServiceDepartment>('All Divisions');
  const [selectedCategory, setSelectedCategory] =
    useState<GroceryCategory>('All Provisions');

  // Tehran neighborhood checker state
  const [selectedZoneId, setSelectedZoneId] = useState<string>(
    TEHRAN_SERVICE_ZONES[0].id
  );
  const [neighborhoodQuery, setNeighborhoodQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const handleCompleteArtworkTransition = () => {
    const wasIntro = artworkTransition.mode === 'intro';
    setArtworkTransition((prev) => ({ ...prev, isVisible: false }));
    if (wasIntro) {
      try {
        const seen = localStorage.getItem('asa_welcome_tour_seen_v1');
        if (!seen) {
          localStorage.setItem('asa_welcome_tour_seen_v1', 'true');
          setTourStepIndex(0);
          setIsTourOpen(true);
        }
      } catch {
        // Ignore storage restrictions
      }
    }
  };

  const handleDownloadStandaloneHtml = async () => {
    try {
      const response = await fetch('/Asa_Luxury_Portal_Standalone.html');
      if (response.ok) {
        const htmlText = await response.text();
        const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Asa_Luxury_Portal_Standalone.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return;
      }
    } catch {
      // Fallback below if fetch fails
    }

    const fallbackHtml =
      '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    const blob = new Blob([fallbackHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Asa_Luxury_Portal_Standalone.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Keep 'intro' Logo Motion persistent until user clicks to enter; only auto-dismiss short section 'transition' overlays
  useEffect(() => {
    if (!artworkTransition.isVisible) return;
    if (artworkTransition.mode === 'intro') return;
    const timer = window.setTimeout(() => {
      setArtworkTransition((prev) => ({ ...prev, isVisible: false }));
    }, 700);
    return () => window.clearTimeout(timer);
  }, [artworkTransition]);

  // Close flyout when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        setIsFlyoutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to highlighted section when Welcome Tour step changes
  useEffect(() => {
    if (!isTourOpen) return;
    const currentStep = WELCOME_TOUR_STEPS[tourStepIndex];
    if (!currentStep) return;
    if (currentStep.id === 'services') {
      const el = document.getElementById('services');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (currentStep.id === 'supermarket') {
      const el = document.getElementById('supermarket');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (currentStep.id === 'order-drawer') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isTourOpen, tourStepIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(pct);
      }

      const sectionIds: ActiveSectionId[] = [
        'philosophy',
        'team',
        'supermarket',
        'services',
        'hero',
      ];
      for (const secId of sectionIds) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pre-seed with 1 signature Asa service & 2 Asa Khoraak items so the user can test immediately
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    'asa-h-01',
  ]);
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({
    'prd-01': 1,
    'prd-09': 2,
  });
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);

  // Real-time Order Tracking Modal state
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [activeTrackedOrder, setActiveTrackedOrder] =
    useState<ActiveTrackedOrder>({
      referenceCode: 'ASA-849201',
      residenceAddress: 'تهران، زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴',
      deliveryWindow: 'Today · Afternoon Slot (2:00 PM – 5:00 PM)',
      itemsCount: 4,
      currentStageIndex: 2,
      createdAt: 'Today, 09:15 AM',
    });

  const handleReorderFromLast = (openDrawerAfter = false) => {
    setSelectedServiceIds(lastOrder.serviceIds);
    setCartQuantities({ ...lastOrder.productQuantities });
    setReorderToast(true);
    setTimeout(() => setReorderToast(false), 2600);
    if (openDrawerAfter) {
      setIsOrderDrawerOpen(true);
    }
  };

  const handleToggleService = (service: EstateService) => {
    if (service.isComingSoon) return;
    setSelectedServiceIds((prev) =>
      prev.includes(service.id)
        ? prev.filter((id) => id !== service.id)
        : [...prev, service.id]
    );
  };

  const handleAddServiceOnly = (service: EstateService) => {
    if (service.isComingSoon) return;
    setSelectedServiceIds((prev) =>
      prev.includes(service.id) ? prev : [...prev, service.id]
    );
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServiceIds((prev) => prev.filter((id) => id !== serviceId));
  };

  const handleUpdateQuantity = (product: GroceryProduct, delta: number) => {
    setCartQuantities((prev) => {
      const current = prev[product.id] || 0;
      const next = Math.max(0, current + delta);
      const copy = { ...prev };
      if (next === 0) {
        delete copy[product.id];
      } else {
        copy[product.id] = next;
      }
      return copy;
    });
  };

  const handleAddBundle = (bundle: CuratedFamilyBundle) => {
    setCartQuantities((prev) => {
      const copy = { ...prev };
      bundle.includedProductIds.forEach((pid) => {
        copy[pid] = (copy[pid] || 0) + 1;
      });
      return copy;
    });
  };

  const handleClearAll = () => {
    setSelectedServiceIds([]);
    setCartQuantities({});
  };

  const selectedServices = useMemo(
    () => servicesCatalog.filter((s) => selectedServiceIds.includes(s.id)),
    [selectedServiceIds, servicesCatalog]
  );

  const cartProducts = useMemo(() => {
    return Object.entries(cartQuantities)
      .map(([id, quantity]) => {
        const product = productsCatalog.find((p) => p.id === id);
        return product ? { product, quantity } : null;
      })
      .filter(
        (item): item is { product: GroceryProduct; quantity: number } =>
          item !== null
      );
  }, [cartQuantities, productsCatalog]);

  const totalOrderCount =
    selectedServices.length +
    cartProducts.reduce((acc, item) => acc + item.quantity, 0);

  const combinedTotalValue =
    selectedServices.reduce((acc, s) => acc + s.price, 0) +
    cartProducts.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

  const stageBadgesFa = [
    'هماهنگی تلفنی',
    'تهیه با فاکتور',
    'اعزام همراه',
    'در حال انجام',
    'گزارش خانواده',
  ];
  const stageBadgesEn = [
    'Confirmed',
    'Sourcing',
    'Dispatched',
    'In Progress',
    'Update Sent',
  ];

  const scrollToSection = (
    id: ActiveSectionId,
    options?: { withLogoArtwork?: boolean; label?: string }
  ) => {
    setIsFlyoutOpen(false);
    setActiveSection(id);

    if (options?.withLogoArtwork) {
      setArtworkTransition({
        isVisible: true,
        mode: 'transition',
        destinationLabel: options.label,
      });
    }

    window.setTimeout(
      () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      },
      options?.withLogoArtwork ? 180 : 0
    );
  };

  // Breadcrumb Trail computation (No "Tehran" next to brand root!)
  const breadcrumbItems = useMemo(() => {
    const items: {
      label: string;
      onClick?: () => void;
      isActive?: boolean;
    }[] = [
      {
        label: isFa
          ? `${siteConfig.brandNameFa} (${siteConfig.brandMottoFa})`
          : `${siteConfig.brandNameEn} (${siteConfig.brandMottoEn})`,
        onClick: () => scrollToSection('hero'),
        isActive: activeSection === 'hero',
      },
    ];

    if (activeSection === 'services') {
      items.push({
        label: t('breadcrumbs.services'),
        onClick: () => {
          setSelectedDept('All Divisions');
          scrollToSection('services');
        },
        isActive: selectedDept === 'All Divisions',
      });
      if (selectedDept !== 'All Divisions') {
        items.push({
          label: isFa ? SERVICE_DEPT_FA[selectedDept] : selectedDept,
          isActive: true,
        });
      }
    } else if (activeSection === 'supermarket') {
      items.push({
        label: t('breadcrumbs.supermarket'),
        onClick: () => {
          setSelectedCategory('All Provisions');
          scrollToSection('supermarket');
        },
        isActive: selectedCategory === 'All Provisions',
      });
      if (selectedCategory !== 'All Provisions') {
        items.push({
          label: isFa ? GROCERY_CAT_FA[selectedCategory] : selectedCategory,
          isActive: true,
        });
      }
    } else if (activeSection === 'team') {
      items.push({
        label: t('breadcrumbs.team'),
        isActive: true,
      });
    } else if (activeSection === 'philosophy') {
      items.push({
        label: t('breadcrumbs.philosophy'),
        isActive: true,
      });
    }

    return items;
  }, [activeSection, selectedDept, selectedCategory, isFa, siteConfig, t]);

  const ChevronSeparator = isFa ? ChevronLeft : ChevronRight;

  const activeTehranZone =
    TEHRAN_SERVICE_ZONES.find((z) => z.id === selectedZoneId) ||
    TEHRAN_SERVICE_ZONES[0];

  const matchedNeighborhoodZone = useMemo(() => {
    const q = neighborhoodQuery.trim().toLowerCase();
    if (!q) return null;
    return TEHRAN_SERVICE_ZONES.find(
      (z) =>
        z.districtEn.toLowerCase().includes(q) ||
        z.districtFa.includes(q) ||
        z.nameEn.toLowerCase().includes(q) ||
        z.nameFa.includes(q) ||
        z.partnerClinicsEn.toLowerCase().includes(q) ||
        z.partnerClinicsFa.includes(q)
    );
  }, [neighborhoodQuery]);

  const currencies: CurrencyCode[] = ['USD', 'EUR', 'IRR'];
  const activeTourTarget = isTourOpen
    ? WELCOME_TOUR_STEPS[tourStepIndex]?.id
    : null;

  return (
    <div
      dir={isFa ? 'rtl' : 'ltr'}
      className={`min-h-screen overflow-x-hidden pb-16 sm:pb-0 bg-[#0D0F0E] text-[#F5F2EB] selection:bg-[#C8A96A] selection:text-[#0D0F0E] ${
        isFa ? 'font-farsi' : 'font-sans'
      }`}
    >
      {/* Luxury Motion Graphic Logo Artwork (Initial Intro stays until click + Page/Section Transitions) */}
      <LuxuryLogoArtworkTransition
        isVisible={artworkTransition.isVisible}
        mode={artworkTransition.mode}
        lang={lang}
        destinationLabel={artworkTransition.destinationLabel}
        onSkipOrComplete={handleCompleteArtworkTransition}
        onToggleLanguage={() => setLang(isFa ? 'en' : 'fa')}
        onDownloadStandaloneHtml={handleDownloadStandaloneHtml}
      />

      {/* Interactive Lightweight Welcome Tour Overlay */}
      <WelcomeTour
        isOpen={isTourOpen}
        currentStepIndex={tourStepIndex}
        lang={lang}
        onSelectStep={(idx) => setTourStepIndex(idx)}
        onNext={() =>
          setTourStepIndex((prev) =>
            Math.min(WELCOME_TOUR_STEPS.length - 1, prev + 1)
          )
        }
        onPrev={() => setTourStepIndex((prev) => Math.max(0, prev - 1))}
        onClose={() => setIsTourOpen(false)}
        onOpenOrderDrawerDemo={() => setIsOrderDrawerOpen(true)}
      />

      {/* Comprehensive Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
        currency={currency}
        services={servicesCatalog}
        onUpdateServices={setServicesCatalog}
        products={productsCatalog}
        onUpdateProducts={setProductsCatalog}
        paymentGateways={paymentGateways}
        onUpdatePaymentGateways={setPaymentGateways}
        siteConfig={siteConfig}
        onUpdateSiteConfig={setSiteConfig}
        onResetAllToDefaults={() => {
          setServicesCatalog(ESTATE_SERVICES);
          setProductsCatalog(GROCERY_PRODUCTS);
          setPaymentGateways(INITIAL_PAYMENT_GATEWAYS);
          setSiteConfig(INITIAL_SITE_CONFIG);
        }}
        activeTrackedOrder={activeTrackedOrder}
        onAdvanceTrackedOrderStage={(stageIdx) =>
          setActiveTrackedOrder((prev) => ({
            ...prev,
            currentStageIndex: stageIdx,
          }))
        }
        submittedReviews={submittedReviews}
        onToggleApproveReview={(id) =>
          setSubmittedReviews((prev) =>
            prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r))
          )
        }
        conciergeMessages={conciergeMessages}
        onReplyConciergeMessage={(id, replyText) =>
          setConciergeMessages((prev) =>
            prev.map((m) =>
              m.id === id
                ? { ...m, status: 'replied', adminReply: replyText }
                : m
            )
          )
        }
        registeredUsers={registeredUsers}
        onUpdateRegisteredUser={(updated) => {
          setRegisteredUsers((prev) =>
            prev.map((u) => (u.id === updated.id ? updated : u))
          );
          if (currentUser?.id === updated.id) {
            setCurrentUser(updated);
            setParentProfile(updated.parentProfile);
          }
        }}
        backdoorOrders={backdoorOrders}
        onUpdateBackdoorOrder={(updatedOrd) => {
          setBackdoorOrders((prev) =>
            prev.map((o) => (o.id === updatedOrd.id ? updatedOrd : o))
          );
        }}
        latestSyncReport={latestSyncReport}
        onTriggerLivePriceSync={handleTriggerLivePriceSync}
        autoPriceSyncEnabled={autoPriceSyncEnabled}
        onToggleAutoPriceSync={setAutoPriceSyncEnabled}
      />

      {/* Sign Up / Login / Family Member Profile Modal */}
      <AuthProfileModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
        currency={currency}
        currentUser={currentUser}
        registeredUsers={registeredUsers}
        userOrders={backdoorOrders}
        onLoginUser={(user) => {
          setCurrentUser(user);
          setParentProfile(user.parentProfile);
        }}
        onRegisterUser={(newUser) => {
          setRegisteredUsers((prev) => [newUser, ...prev]);
          setCurrentUser(newUser);
          setParentProfile(newUser.parentProfile);
        }}
        onUpdateUser={(updated) => {
          setRegisteredUsers((prev) =>
            prev.map((u) => (u.id === updated.id ? updated : u))
          );
          setCurrentUser(updated);
          setParentProfile(updated.parentProfile);
        }}
        onLogout={() => setCurrentUser(null)}
        onOpenOrderTracking={(ord) => {
          const derivedReceiptItems = [
            ...ord.productSummaries.map((summary, i) => ({
              nameFa: summary,
              nameEn: summary,
              qtyLabelFa: 'طبق سبد سفارش',
              qtyLabelEn: 'Per Order',
              priceUsd: Math.max(
                4,
                Math.round(
                  ord.passThroughTotalUsd /
                    Math.max(1, ord.productSummaries.length)
                )
              ),
            })),
            ...ord.serviceTitles.map((srv) => ({
              nameFa: srv,
              nameEn: srv,
              qtyLabelFa: 'خدمت آسا',
              qtyLabelEn: 'ASA Service',
              priceUsd: Math.max(
                10,
                Math.round(
                  ord.asaServiceFeeUsd / Math.max(1, ord.serviceTitles.length)
                )
              ),
            })),
          ];
          setActiveTrackedOrder({
            referenceCode: ord.referenceCode,
            residenceAddress: ord.residenceAddress,
            deliveryWindow: ord.deliveryWindow,
            itemsCount: ord.serviceTitles.length + ord.productSummaries.length,
            currentStageIndex: ord.currentStageIndex,
            createdAt: ord.createdAt,
            recipientName: ord.recipientName,
            passThroughTotalUsd: ord.passThroughTotalUsd,
            asaServiceFeeUsd: ord.asaServiceFeeUsd,
            personalMessageCard: ord.personalMessageCard,
            stewardNameFa: ord.assignedStewardNameFa,
            stewardNameEn: ord.assignedStewardNameEn,
            receiptItems: derivedReceiptItems,
          });
          setIsTrackingModalOpen(true);
        }}
        onOpenAdminDashboard={() => setIsAdminOpen(true)}
      />

      {/* Waitlist Join Modal for Unserviced Tehran Districts */}
      <WaitlistJoinModal
        isOpen={isWaitlistModalOpen}
        onClose={() => setIsWaitlistModalOpen(false)}
        lang={lang}
        initialDistrictCode={waitlistDistrictCode}
        initialNeighborhoodQuery={
          !matchedNeighborhoodZone ? neighborhoodQuery : ''
        }
      />

      {/* Dedicated Parent Care Profile Modal */}
      <ParentCareProfileModal
        isOpen={isParentProfileOpen}
        onClose={() => setIsParentProfileOpen(false)}
        lang={lang}
        profile={parentProfile}
        onSaveProfile={(updated) => {
          setParentProfile(updated);
          if (currentUser) {
            const nextUser = { ...currentUser, parentProfile: updated };
            setCurrentUser(nextUser);
            setRegisteredUsers((prev) =>
              prev.map((u) => (u.id === nextUser.id ? nextUser : u))
            );
          }
        }}
      />

      {/* Slim Gold Viewport Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-white/[0.06] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#A68446] via-[#E5C98B] to-[#C8A96A] shadow-[0_0_14px_rgba(200,169,106,0.9)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Navigation Header — Responsive & Clean with ASA Motto (No Tehran beside Logo) */}
      <header className="sticky top-0 z-40 h-20 bg-[#0D0F0E]/94 backdrop-blur-xl border-b border-[#C8A96A]/20 px-3 sm:px-8 lg:px-14">
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Generated Luxury 'Asa' Brand Logo + Motto (آسایش · سهولت · آرامش) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero', {
                  withLogoArtwork: true,
                  label: isFa
                    ? `${siteConfig.brandNameFa} · ${siteConfig.brandMottoFa}`
                    : `${siteConfig.brandNameEn} · ${siteConfig.brandMottoEn}`,
                });
              }}
              aria-label={
                isFa
                  ? `${siteConfig.brandNameFa} — ${siteConfig.brandMottoFa}`
                  : `${siteConfig.brandNameEn} — ${siteConfig.brandMottoEn}`
              }
              className="flex items-center gap-2.5 sm:gap-3.5 group"
            >
              <div className="relative h-12 w-12 sm:h-15 sm:w-15 rounded-sm overflow-hidden border border-[#C8A96A]/55 bg-[#0D0F0E] shadow-[0_0_25px_rgba(200,169,106,0.22)] group-hover:border-[#C8A96A] transition-all duration-300 shrink-0">
                <img
                  src={asaBrandLogo}
                  alt="Asa Luxury Brand Crest Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="font-serif text-base sm:text-xl tracking-[0.14em] text-[#F5F2EB] block leading-none">
                  {isFa ? siteConfig.brandNameFa : siteConfig.brandNameEn}
                </span>
                <span className="text-[9px] sm:text-[11px] text-[#C8A96A] tracking-[0.12em] font-medium block mt-1">
                  {isFa ? siteConfig.brandMottoFa : siteConfig.brandMottoEn}
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Simplified Flyout Navigation Menu + Reorder from Last + Live Order Status */}
          <nav className="flex items-center gap-1.5 sm:gap-3 text-xs">
            {/* Simplified Flyout Menu Trigger for Services & Supermarket */}
            <div
              ref={flyoutRef}
              className="relative"
              onMouseEnter={() => {
                if (window.innerWidth >= 1024) setIsFlyoutOpen(true);
              }}
              onMouseLeave={() => {
                if (window.innerWidth >= 1024) setIsFlyoutOpen(false);
              }}
            >
              <button
                type="button"
                onClick={() => setIsFlyoutOpen((prev) => !prev)}
                aria-expanded={isFlyoutOpen}
                className={`px-2.5 sm:px-4 py-2 border transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  isFlyoutOpen ||
                  activeSection === 'services' ||
                  activeSection === 'supermarket'
                    ? 'bg-[#151816] border-[#C8A96A] text-[#C8A96A] shadow-[0_0_20px_rgba(200,169,106,0.18)]'
                    : 'bg-[#151816]/80 border-white/15 text-[#F5F2EB] hover:border-[#C8A96A]/60'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-[#C8A96A] shrink-0" />
                <span className="font-medium whitespace-nowrap text-[11px] sm:text-xs">
                  {t('header.servicesAndMarket')}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#C8A96A] transition-transform duration-200 shrink-0 ${
                    isFlyoutOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Luxury 2-Column Flyout Panel */}
              <AnimatePresence>
                {isFlyoutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="fixed sm:absolute top-20 sm:top-full left-3 right-3 sm:left-auto sm:right-0 sm:mt-2 sm:w-[640px] max-h-[80vh] overflow-y-auto bg-[#121614]/98 backdrop-blur-2xl border border-[#C8A96A]/55 shadow-[0_30px_80px_rgba(0,0,0,0.92)] p-4 sm:p-5 z-50"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Column 1: 3-Pillar Services */}
                      <div>
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                          <span className="text-[11px] uppercase tracking-[0.16em] text-[#C8A96A] font-semibold flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            <span>{t('header.pillarServices')}</span>
                          </span>
                          <span className="text-[10px] text-[#9E988E] font-mono">
                            {isFa
                              ? `${servicesCatalog.length.toLocaleString('fa-IR')} خدمت`
                              : `${servicesCatalog.length} Services`}
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {SERVICE_DEPARTMENTS.map((dept) => {
                            const active =
                              activeSection === 'services' &&
                              selectedDept === dept;
                            const label = isFa ? SERVICE_DEPT_FA[dept] : dept;
                            return (
                              <button
                                key={dept}
                                type="button"
                                onClick={() => {
                                  setSelectedDept(dept);
                                  scrollToSection('services', {
                                    withLogoArtwork: true,
                                    label,
                                  });
                                }}
                                className={`w-full text-start px-3 py-2.5 border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                                  active
                                    ? 'bg-[#C8A96A]/15 border-[#C8A96A] text-[#F5F2EB]'
                                    : 'bg-[#0D0F0E]/80 border-white/5 hover:border-[#C8A96A]/45 text-[#9E988E] hover:text-[#F5F2EB]'
                                }`}
                              >
                                <span className="text-xs font-medium truncate">
                                  {label}
                                </span>
                                <ChevronSeparator className="w-3.5 h-3.5 text-[#C8A96A] shrink-0" />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Column 2: Family Supermarket & Asa Khoraak Aisles */}
                      <div>
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                          <span className="text-[11px] uppercase tracking-[0.16em] text-[#C8A96A] font-semibold flex items-center gap-1.5">
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>
                              {isFa
                                ? '۲. سوپرمارکت و آسا خوراک'
                                : '2. Family Supermarket'}
                            </span>
                          </span>
                          <span className="text-[10px] text-[#3E7B5E] font-mono">
                            {isFa ? '۰٪ سود کالا' : '0% Markup'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto no-scrollbar">
                          {GROCERY_CATEGORIES.map((cat) => {
                            const active =
                              activeSection === 'supermarket' &&
                              selectedCategory === cat;
                            const label = isFa ? GROCERY_CAT_FA[cat] : cat;
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  setSelectedCategory(cat);
                                  scrollToSection('supermarket', {
                                    withLogoArtwork: true,
                                    label,
                                  });
                                }}
                                className={`w-full text-start px-3 py-2 border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                                  active
                                    ? 'bg-[#C8A96A]/15 border-[#C8A96A] text-[#F5F2EB]'
                                    : 'bg-[#0D0F0E]/80 border-white/5 hover:border-[#C8A96A]/45 text-[#9E988E] hover:text-[#F5F2EB]'
                                }`}
                              >
                                <span className="text-xs truncate">{label}</span>
                                <ChevronSeparator className="w-3.5 h-3.5 text-[#C8A96A] shrink-0" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Flyout Footer Bar: Team Videos, Coverage, Admin Panel & Welcome Tour */}
                    <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            scrollToSection('team', {
                              withLogoArtwork: true,
                              label: isFa
                                ? 'همراهان ما (معرفی ویدیویی)'
                                : 'Meet Our Stewards',
                            })
                          }
                          className="px-3 py-1.5 bg-[#0D0F0E] border border-white/10 hover:border-[#C8A96A] text-[#F5F2EB] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Film className="w-3.5 h-3.5 text-[#C8A96A]" />
                          <span>
                            {isFa ? 'ویدیوی همراهان ما' : 'Meet Our Stewards'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            scrollToSection('philosophy', {
                              withLogoArtwork: true,
                              label: isFa
                                ? 'مناطق تحت پوشش و سوالات'
                                : 'Coverage & FAQs',
                            })
                          }
                          className="px-3 py-1.5 bg-[#0D0F0E] border border-white/10 hover:border-[#C8A96A] text-[#F5F2EB] flex items-center gap-1.5 cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#C8A96A]" />
                          <span>{isFa ? 'مناطق پوشش و سوالات' : 'Coverage & FAQs'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsFlyoutOpen(false);
                            setIsAdminOpen(true);
                          }}
                          className="px-3 py-1.5 bg-[#0D0F0E] border border-[#C8A96A]/40 hover:border-[#C8A96A] text-[#C8A96A] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          <span>{isFa ? 'پنل مدیریت (Admin)' : 'Admin Panel'}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsFlyoutOpen(false);
                          setTourStepIndex(0);
                          setIsTourOpen(true);
                        }}
                        className="px-3 py-1.5 bg-[#C8A96A]/15 border border-[#C8A96A]/50 hover:bg-[#C8A96A] hover:text-[#0D0F0E] text-[#C8A96A] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>
                          {isFa ? 'راهنمای ۳ مرحله‌ای سایت' : 'Start Welcome Tour'}
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 1-Click 'Reorder from Last' Button in Header */}
            <button
              type="button"
              onClick={() => handleReorderFromLast(true)}
              className={`hidden xl:flex px-3 py-2 border items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                reorderToast
                  ? 'bg-[#3E7B5E] border-[#3E7B5E] text-[#F5F2EB]'
                  : 'bg-[#151816] border-[#C8A96A]/40 hover:border-[#C8A96A] text-[#C8A96A]'
              }`}
            >
              {reorderToast ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold">
                    {t('header.reorderRestored')}
                  </span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">
                    {t('header.reorderFromLast')}
                  </span>
                </>
              )}
            </button>

            {/* Real-Time Order Lifecycle Status Trigger */}
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="hidden md:flex px-3 py-2 bg-[#151816] border border-[#3E7B5E]/60 hover:border-[#C8A96A] text-[#F5F2EB] items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#3E7B5E] animate-pulse" />
              <span className="text-[11px]">{t('header.liveTrackingPrefix')}</span>
              <span className="text-[11px] text-[#C8A96A] font-semibold">
                {isFa
                  ? stageBadgesFa[activeTrackedOrder.currentStageIndex]
                  : stageBadgesEn[activeTrackedOrder.currentStageIndex]}
              </span>
            </button>

            <button
              onClick={() => setLang(isFa ? 'en' : 'fa')}
              className="hidden sm:flex px-3 py-2 border border-[#C8A96A]/40 text-[#C8A96A] hover:bg-[#C8A96A] hover:text-[#0D0F0E] transition-colors items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t('header.switchLanguageLabel')}</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              aria-label="Track live order"
              className="md:hidden px-2 py-2 border border-[#3E7B5E]/60 bg-[#151816] text-[#C8A96A] text-xs flex items-center gap-1 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-[#3E7B5E]" />
            </button>

            <button
              onClick={() => setLang(isFa ? 'en' : 'fa')}
              className="sm:hidden px-2 py-2 border border-[#C8A96A]/40 text-[#C8A96A] text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{isFa ? 'EN' : 'فا'}</span>
            </button>

            <button
              id="header-order-btn"
              onClick={() => setIsOrderDrawerOpen(true)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-[11px] sm:text-xs uppercase tracking-[0.12em] font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                activeTourTarget === 'order-drawer'
                  ? 'relative z-[75] ring-4 ring-[#F5F2EB] shadow-[0_0_50px_rgba(200,169,106,0.95)] scale-105'
                  : 'shadow-[0_0_25px_rgba(200,169,106,0.28)]'
              }`}
            >
              <Mic className="w-3.5 h-3.5 hidden sm:inline" />
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">
                {t('header.orderDrawerButton')}
              </span>
              <span className="font-mono bg-[#0D0F0E] text-[#C8A96A] px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px]">
                {isFa ? totalOrderCount.toLocaleString('fa-IR') : totalOrderCount}
              </span>
              {combinedTotalValue > 0 && (
                <span className="hidden lg:inline font-mono text-[11px] text-[#0D0F0E]/85 border-s border-[#0D0F0E]/25 ps-2">
                  {formatPrice(combinedTotalValue, lang, '', '', currency).amount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Discreet Breadcrumb Trail + Reorder + Admin Panel + Currency Switcher */}
      <div
        aria-label="Breadcrumb and Quick Controls Bar"
        className="sticky top-20 z-30 bg-[#0D0F0E]/95 backdrop-blur-md border-b border-white/[0.08] px-3 sm:px-8 lg:px-14 py-2 transition-all"
      >
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-[11px]">
          {/* Breadcrumb Path */}
          <ol className="flex items-center flex-wrap gap-1.5 text-[#9E988E]">
            <li className="flex items-center gap-1.5 text-[#C8A96A]">
              <Home className="w-3 h-3 shrink-0" />
            </li>
            {breadcrumbItems.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronSeparator className="w-3 h-3 text-white/25 shrink-0" />
                )}
                {crumb.onClick && !crumb.isActive ? (
                  <button
                    onClick={crumb.onClick}
                    className="hover:text-[#C8A96A] transition-colors cursor-pointer"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span
                    className={
                      crumb.isActive
                        ? 'text-[#F5F2EB] font-medium border-b border-[#C8A96A]/60 pb-0.5'
                        : 'text-[#9E988E]'
                    }
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>

          {/* Right/Left: Reorder from Last + Admin Dashboard + Welcome Tour + Multi-Currency Toggle */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Reorder from Last Button (Visible on tablet/mobile where xl header button is hidden) */}
            <button
              type="button"
              onClick={() => handleReorderFromLast(true)}
              className="xl:hidden px-2.5 py-1 bg-[#151816] border border-[#C8A96A]/45 hover:border-[#C8A96A] text-[#C8A96A] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isFa ? 'تکرار سفارش قبلی' : 'Reorder Last'}</span>
            </button>

            {/* User Sign Up / Login / Profile Trigger */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-2.5 py-1 bg-[#151816] border border-[#C8A96A]/55 hover:bg-[#C8A96A] hover:text-[#0D0F0E] text-[#F5F2EB] flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
            >
              <User className="w-3 h-3 text-[#C8A96A]" />
              <span>
                {currentUser
                  ? `${t('header.myAccountPrefix')} (${currentUser.fullName.split(' ')[0]})`
                  : t('header.signInOrJoin')}
              </span>
            </button>

            {/* Admin Dashboard Trigger */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="px-2.5 py-1 bg-[#151816] border border-[#C8A96A]/45 hover:bg-[#C8A96A] hover:text-[#0D0F0E] text-[#C8A96A] flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
            >
              <Settings className="w-3 h-3" />
              <span>{t('header.adminPanel')}</span>
            </button>

            {/* Live Supermarket Price Sync Status Badge */}
            {latestSyncReport && (
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="hidden lg:inline-flex px-2.5 py-1 bg-[#151816] border border-[#3E7B5E]/60 hover:border-[#C8A96A] text-[#8FE3B8] items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-[#C8A96A]" />
                <span>
                  {t('header.livePricesConnected', {
                    count: latestSyncReport.connectedStoresCount,
                  })}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setTourStepIndex(0);
                setIsTourOpen(true);
              }}
              className="hidden sm:inline-flex px-2.5 py-1 bg-[#151816] border border-white/15 hover:border-[#C8A96A] text-[#9E988E] hover:text-[#F5F2EB] items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-3 h-3 text-[#C8A96A]" />
              <span>{t('header.welcomeTour')}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setArtworkTransition({
                  isVisible: true,
                  mode: 'intro',
                })
              }
              className="hidden md:inline-flex px-2.5 py-1 bg-[#151816] border border-white/15 hover:border-[#C8A96A] text-[#9E988E] hover:text-[#F5F2EB] items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3 text-[#C8A96A]" />
              <span>{t('header.logoMotion')}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadStandaloneHtml}
              className="px-2.5 py-1 bg-[#151816] border border-[#3E7B5E]/70 hover:bg-[#C8A96A] hover:text-[#0D0F0E] hover:border-[#C8A96A] text-[#8FE3B8] inline-flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
            >
              <Download className="w-3 h-3 text-[#C8A96A]" />
              <span>{t('header.standaloneHtml')}</span>
            </button>

            {/* Multi-Currency Toggle */}
            <div className="inline-flex items-center bg-[#151816] border border-white/15 p-0.5">
              {currencies.map((code) => {
                const active = currency === code;
                const label =
                  code === 'USD'
                    ? isFa
                      ? 'دلار ($)'
                      : 'USD ($)'
                    : code === 'EUR'
                    ? isFa
                      ? 'یورو (€)'
                      : 'EUR (€)'
                    : isFa
                    ? 'ریال (IRR)'
                    : 'Rial (IRR)';
                return (
                  <button
                    key={code}
                    onClick={() => setCurrency(code)}
                    className={`px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer ${
                      active
                        ? 'bg-[#C8A96A] text-[#0D0F0E] font-bold shadow-sm'
                        : 'text-[#9E988E] hover:text-[#F5F2EB]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section — Responsive, High-Impact & Showcasing ASA Motto (آسایش · سهولت · آرامش) */}
      <section
        id="hero"
        className="relative min-h-[74vh] flex items-center overflow-hidden border-b border-white/10"
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.52 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={heroImage}
            alt="Asa Family Care and Fresh Provisions"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div
            className={`absolute inset-0 ${
              isFa
                ? 'bg-gradient-to-l from-[#0D0F0E] via-[#0D0F0E]/85 to-[#0D0F0E]/40'
                : 'bg-gradient-to-r from-[#0D0F0E] via-[#0D0F0E]/85 to-[#0D0F0E]/40'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F0E] via-transparent to-[#0D0F0E]/60" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-8 lg:px-14 py-12 sm:py-16 lg:py-22">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Main Editorial Copy (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-5 sm:space-y-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 border border-[#C8A96A]/50 bg-[#151816]/90 backdrop-blur-md px-3.5 py-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A96A]" />
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#C8A96A] font-semibold">
                    {isFa
                      ? `آسـا: ${siteConfig.brandMottoFa}`
                      : `ASA: ${siteConfig.brandMottoEn}`}
                  </span>
                </div>

                {/* Operational Coverage Declaration (Declared clearly in body, not next to logo) */}
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#3E7B5E] bg-[#3E7B5E]/15 border border-[#3E7B5E]/35 px-3 py-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {isFa
                      ? siteConfig.operationalCityNoteFa
                      : siteConfig.operationalCityNoteEn}
                  </span>
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-[#F5F2EB]">
                {isFa ? (
                  <>
                    {siteConfig.heroTitleFa}{' '}
                    <span className="italic font-normal text-[#C8A96A]">
                      {siteConfig.heroHighlightFa}
                    </span>
                  </>
                ) : (
                  <>
                    {siteConfig.heroTitleEn}{' '}
                    <span className="italic font-normal text-[#C8A96A]">
                      {siteConfig.heroHighlightEn}
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-lg text-[#9E988E] max-w-xl leading-relaxed">
                {isFa ? siteConfig.heroSubtitleFa : siteConfig.heroSubtitleEn}
              </p>

              {/* Direct Action Triggers + Reorder from Last */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                  className="px-5 sm:px-6 py-3.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.15em] font-semibold flex items-center gap-2 transition-all shadow-[0_0_28px_rgba(200,169,106,0.35)]"
                >
                  <span>{isFa ? 'انتخاب سریع خدمات' : 'Choose Services'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#supermarket"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('supermarket');
                  }}
                  className="px-5 sm:px-6 py-3.5 bg-[#151816]/90 hover:bg-white/[0.08] text-[#F5F2EB] border border-white/20 hover:border-[#C8A96A] text-xs uppercase tracking-[0.15em] font-semibold flex items-center gap-2 transition-all"
                >
                  <span>{isFa ? 'سوپرمارکت و آسا خوراک' : 'Shop Supermarket'}</span>
                  <ChevronSeparator className="w-4 h-4 text-[#C8A96A]" />
                </a>
                <button
                  type="button"
                  onClick={() => handleReorderFromLast(true)}
                  className="px-4 sm:px-5 py-3.5 bg-[#2E5A44]/50 hover:bg-[#2E5A44] text-[#F5F2EB] border border-[#3E7B5E] text-xs uppercase tracking-[0.13em] font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#C8A96A]" />
                  <span>{isFa ? 'تکرار آخرین سفارش' : 'Reorder from Last'}</span>
                </button>
              </div>
            </motion.div>

            {/* Right/Left Focal Card: Fast 60-Second Wrap-Up Box (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="lg:col-span-5 bg-[#151816]/95 backdrop-blur-xl border border-[#C8A96A]/45 p-5 sm:p-7 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#C8A96A] flex items-center gap-1.5 font-semibold">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    {isFa ? 'آسایش · سهولت · آرامش' : 'Express Order Summary'}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#F5F2EB] mt-0.5">
                    {isFa
                      ? 'ثبت فوری سفارش در کمتر از ۱ دقیقه'
                      : 'Wrap Up & Dispatch in 60 Seconds'}
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-[#3E7B5E] bg-[#3E7B5E]/15 px-2.5 py-1 border border-[#3E7B5E]/30">
                  {isFa ? '۰٪ سود پنهان کالا' : '0% Item Markup'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-[#0D0F0E] border border-white/10 p-2.5 sm:p-3">
                  <span className="text-[#C8A96A] font-semibold block mb-0.5">
                    {isFa ? '۱. سهولت' : '1. Ease'}
                  </span>
                  <span className="text-[11px] text-[#9E988E]">
                    {isFa ? 'کلیکی یا صوتی' : 'Click or Voice'}
                  </span>
                </div>
                <div className="bg-[#0D0F0E] border border-white/10 p-2.5 sm:p-3">
                  <span className="text-[#C8A96A] font-semibold block mb-0.5">
                    {isFa ? '۲. آسایش' : '2. Comfort'}
                  </span>
                  <span className="text-[11px] text-[#9E988E]">
                    {isFa ? 'با فاکتور رسمی' : 'Store Receipt'}
                  </span>
                </div>
                <div className="bg-[#0D0F0E] border border-white/10 p-2.5 sm:p-3">
                  <span className="text-[#C8A96A] font-semibold block mb-0.5">
                    {isFa ? '۳. آرامش' : '3. Peace'}
                  </span>
                  <span className="text-[11px] text-[#9E988E]">
                    {isFa ? 'گزارش خانواده' : 'Family Report'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#9E988E] block">
                    {isFa
                      ? `مجموع فعلی (${totalOrderCount.toLocaleString('fa-IR')} مورد)`
                      : `Current Total (${totalOrderCount} items)`}
                  </span>
                  <span className="font-mono text-lg sm:text-xl text-[#C8A96A] font-semibold">
                    {formatPrice(combinedTotalValue, lang, '', '', currency).amount}
                  </span>
                </div>
                <button
                  onClick={() => setIsOrderDrawerOpen(true)}
                  className="px-5 py-3 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer shadow-[0_0_20px_rgba(200,169,106,0.3)]"
                >
                  {isFa ? 'تکمیل و پرداخت ←' : 'Checkout Now →'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* 4 Quantitative Rigor Cards with Hover Lift & Glow */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <motion.div
              whileHover={{ y: -5, scale: 1.012 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="luxury-metric-glow bg-[#151816]/80 border border-white/10 p-3.5 sm:p-4 cursor-default"
            >
              <span className="font-mono text-lg sm:text-2xl text-[#C8A96A] block mb-0.5">
                {isFa ? 'آسایش · سهولت · آرامش' : '3 Core Pillars'}
              </span>
              <span className="text-[11px] sm:text-xs text-[#9E988E]">
                {isFa ? 'همراه · خوراک · پزشک' : 'Hamrah · Khoraak · Pezeshk'}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.012 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="luxury-metric-glow bg-[#151816]/80 border border-white/10 p-3.5 sm:p-4 cursor-default"
            >
              <span className="font-mono text-lg sm:text-2xl text-[#C8A96A] block mb-0.5">
                {t('hero.metricReceiptTitle')}
              </span>
              <span className="text-[11px] sm:text-xs text-[#9E988E]">
                {t('hero.metricReceiptSub')}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.012 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="luxury-metric-glow bg-[#151816]/80 border border-white/10 p-3.5 sm:p-4 cursor-default"
            >
              <span className="font-mono text-lg sm:text-2xl text-[#C8A96A] block mb-0.5">
                {t('hero.metricGatewaysTitle')}
              </span>
              <span className="text-[11px] sm:text-xs text-[#9E988E]">
                {t('hero.metricGatewaysSub')}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.012 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="luxury-metric-glow bg-[#151816]/80 border border-white/10 p-3.5 sm:p-4 cursor-default"
            >
              <span className="font-mono text-lg sm:text-2xl text-[#C8A96A] block mb-0.5">
                {t('hero.metricReportTitle')}
              </span>
              <span className="text-[11px] sm:text-xs text-[#9E988E]">
                {t('hero.metricReportSub')}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Part 1: Redesigned, Streamlined Asa 3-Pillar Service Directory */}
      <div
        className={
          activeTourTarget === 'services'
            ? 'relative z-[72] bg-[#0D0F0E] ring-2 ring-[#C8A96A] shadow-[0_0_60px_rgba(200,169,106,0.45)] transition-all duration-300'
            : 'transition-all duration-300'
        }
      >
        <ServicesSection
          lang={lang}
          currency={currency}
          services={servicesCatalog}
          selectedServiceIds={selectedServiceIds}
          onToggleService={handleToggleService}
          selectedDept={selectedDept}
          onSelectDept={setSelectedDept}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        />
      </div>

      {/* Main Content Part 2: Streamlined Asa Khoraak & Online Family Supermarket */}
      <div
        className={
          activeTourTarget === 'supermarket'
            ? 'relative z-[72] bg-[#0D0F0E] ring-2 ring-[#C8A96A] shadow-[0_0_60px_rgba(200,169,106,0.45)] transition-all duration-300'
            : 'transition-all duration-300'
        }
      >
        <SupermarketSection
          lang={lang}
          currency={currency}
          products={productsCatalog}
          cartQuantities={cartQuantities}
          onUpdateQuantity={handleUpdateQuantity}
          onAddBundle={handleAddBundle}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Main Content Part 2.5: Monthly Peace-of-Mind Subscriptions, Zero-Markup Calculator, Occasions & Receipt Proof Lightbox */}
      <FamilyPeaceSuite
        lang={lang}
        currency={currency}
        onEnrollSubscription={(tier: PeaceSubscriptionTier) => {
          setSelectedServiceIds(tier.serviceIdsToEnroll);
          setCartQuantities(tier.productIdsToEnroll);
          setIsOrderDrawerOpen(true);
        }}
        onScheduleOccasionGift={(occ: SavedFamilyOccasion) => {
          setSelectedServiceIds((prev) =>
            prev.includes('asa-h-04') ? prev : [...prev, 'asa-h-04']
          );
          setCartQuantities((prev) => ({
            ...prev,
            'prd-05': (prev['prd-05'] || 0) + 1,
            'prd-15': (prev['prd-15'] || 0) + 1,
          }));
          setIsOrderDrawerOpen(true);
        }}
        onOpenParentProfile={() => setIsParentProfileOpen(true)}
      />

      {/* Main Content Part 3: Meet Our Stewards Video Grid */}
      <TeamSection lang={lang} />

      {/* Main Content Part 4: Operational Coverage Checker, Sample Family Update, Testimonials & FAQs */}
      <section
        id="philosophy"
        className="py-16 sm:py-20 px-4 sm:px-8 lg:px-14 max-w-[1440px] mx-auto border-t border-white/10 space-y-16 sm:space-y-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Operational Coverage Checker (6 Cols) */}
          <div className="lg:col-span-6 bg-[#151816] border border-white/10 p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#C8A96A] mb-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {isFa
                    ? 'محدوده فعلی عملیات آسا (تهران)'
                    : 'Current Operational Coverage (Tehran)'}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] mb-3">
                {isFa
                  ? 'بررسی سریع محله خانواده (در حال حاضر فعال در تهران)'
                  : 'Check Your Family’s Neighborhood (Currently Active in Tehran)'}
              </h3>

              <input
                type="text"
                value={neighborhoodQuery}
                onChange={(e) => setNeighborhoodQuery(e.target.value)}
                placeholder={
                  isFa
                    ? 'جستجوی محله (مثلاً: زعفرانیه، نیاوران، سعادت‌آباد، ونک)...'
                    : 'Type a neighborhood (e.g., Zafaranieh, Niavaran, Vanak)...'
                }
                className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-4 py-2.5 text-sm text-[#F5F2EB] placeholder-[#9E988E]/60 outline-none mb-4"
              />

              {neighborhoodQuery.trim() !== '' && (
                <div className="mb-4 p-3.5 bg-[#0D0F0E] border border-[#C8A96A]/40 text-xs">
                  {matchedNeighborhoodZone ? (
                    <div className="flex items-start gap-2 text-[#3E7B5E]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#F5F2EB] font-semibold">
                          {isFa
                            ? `تحت پوشش فعال: ${matchedNeighborhoodZone.nameFa}`
                            : `Active Coverage: ${matchedNeighborhoodZone.nameEn}`}
                        </p>
                        <p className="text-[#9E988E]">
                          {isFa
                            ? matchedNeighborhoodZone.responseTimeFa
                            : matchedNeighborhoodZone.responseTimeEn}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <p className="text-[#C8A96A]">
                        {isFa
                          ? `محله «${neighborhoodQuery}» در فاز بعدی توسعه آسا در تهران قرار دارد.`
                          : `"${neighborhoodQuery}" is in our upcoming Tehran expansion phase.`}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setWaitlistDistrictCode(undefined);
                          setIsWaitlistModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-[#C8A96A] text-[#0D0F0E] font-bold text-xs whitespace-nowrap cursor-pointer shrink-0"
                      >
                        {isFa
                          ? 'ثبت در فهرست انتظار محله ←'
                          : 'Join District Waitlist →'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {TEHRAN_SERVICE_ZONES.slice(0, 4).map((zone) => {
                  const active = zone.id === selectedZoneId;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`p-3 text-start border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#C8A96A]/15 border-[#C8A96A] text-[#F5F2EB]'
                          : 'bg-[#0D0F0E] border-white/10 text-[#9E988E] hover:border-white/25'
                      }`}
                    >
                      <p className="text-xs font-semibold text-[#F5F2EB] truncate">
                        {isFa ? zone.nameFa : zone.nameEn}
                      </p>
                      <p className="text-[11px] text-[#C8A96A]">
                        {isFa ? zone.districtFa : zone.districtEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#0D0F0E] border border-white/10 p-3.5 text-xs space-y-2.5">
              <div>
                <p className="text-[#C8A96A] font-medium mb-1">
                  {isFa
                    ? activeTehranZone.responseTimeFa
                    : activeTehranZone.responseTimeEn}
                </p>
                <p className="text-[#9E988E] truncate">
                  {isFa
                    ? activeTehranZone.partnerClinicsFa
                    : activeTehranZone.partnerClinicsEn}
                </p>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#9E988E]">
                  {isFa
                    ? 'محله والدین شما خارج از مناطق ۱ تا ۶ است؟'
                    : 'Parents live outside Districts 1–6?'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setWaitlistDistrictCode(undefined);
                    setIsWaitlistModalOpen(true);
                  }}
                  className="text-[#C8A96A] hover:underline font-semibold text-xs cursor-pointer"
                >
                  {isFa
                    ? 'ثبت در فهرست انتظار افتتاح محله ←'
                    : 'Join Expansion Waitlist →'}
                </button>
              </div>
            </div>
          </div>

          {/* Sample Factual Family Update Showcase (6 Cols) */}
          <div className="lg:col-span-6 bg-[#151816] border border-[#C8A96A]/35 p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.18em] text-[#C8A96A] flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>
                    {isFa
                      ? 'نمونه «گزارش واقعی خانواده»'
                      : 'Sample Factual Family Update'}
                  </span>
                </span>
                <span className="font-mono text-[11px] text-[#3E7B5E] bg-[#3E7B5E]/15 px-2.5 py-0.5 border border-[#3E7B5E]/30">
                  {isFa ? 'پس از هر خدمت' : 'After Every Visit'}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] mb-4">
                {isFa
                  ? 'گزارش مستند به همراه تصویر فاکتور رسمی'
                  : 'Documented Summary & Official Store Receipt'}
              </h3>

              <div className="bg-[#0D0F0E] border border-white/15 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-[#C8A96A] font-mono">
                    REF: ASA-849201 ·{' '}
                    {isFa
                      ? 'خانم توران راد (زعفرانیه)'
                      : 'Mrs. Touran Rad (Zafaranieh)'}
                  </span>
                  <span className="text-[11px] text-[#3E7B5E]">
                    {isFa ? 'تاییدشده' : 'Verified'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                  <div className="bg-[#151816] p-2.5 border border-white/5">
                    <span className="text-[#9E988E] block">
                      {isFa ? 'ساعت حضور:' : 'Visit Time:'}
                    </span>
                    <span className="font-mono text-[#F5F2EB]">
                      14:10 – 16:05 IRST
                    </span>
                  </div>
                  <div className="bg-[#151816] p-2.5 border border-white/5">
                    <span className="text-[#9E988E] block">
                      {isFa ? 'فاکتور رسمی فروشگاه:' : 'Store Receipt:'}
                    </span>
                    <span className="font-mono text-[#C8A96A]">
                      {isFa ? 'پیوست شده (۱۰۰٪ منطبق)' : 'Attached (100% Match)'}
                    </span>
                  </div>
                </div>

                <p className="text-[#F5F2EB]/85 leading-relaxed">
                  {isFa
                    ? 'تمامی اقلام میوه دست‌چین، لبنیات و بسته‌های کم‌نمک «آسا خوراک» در یخچال چیده شد و برگه نوبت کلینیک چشم‌پزشکی روز سه‌شنبه تحویل گردید.'
                    : 'All hand-picked produce, dairy, and dated low-sodium Asa Khoraak meals were arranged in the fridge, and Tuesday’s clinic appointment slip was confirmed.'}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[#9E988E]">
                {isFa
                  ? 'ارسال از طریق پنل، واتساپ و ایمیل'
                  : 'Sent via Portal, WhatsApp & Email'}
              </span>
              <button
                onClick={() => setIsTrackingModalOpen(true)}
                className="text-[#C8A96A] hover:underline font-medium cursor-pointer"
              >
                {isFa ? 'مشاهده رهگیری زنده ←' : 'Open Live Tracker →'}
              </button>
            </div>
          </div>
        </div>

        {/* Social Proof: Verified Diaspora Testimonials */}
        <div className="border-t border-white/10 pt-14 sm:pt-16">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] mb-8 flex items-center gap-2.5">
            <Quote className="w-5 h-5 text-[#C8A96A]" />
            <span>
              {isFa
                ? 'تجربه خانواده‌ها با آسا (آسایش · سهولت · آرامش)'
                : 'What Families Say About ASA'}
            </span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CLIENT_TESTIMONIALS.map((t, idx) => (
              <blockquote
                key={idx}
                className="bg-[#151816] border border-[#C8A96A]/30 p-5 sm:p-6 flex flex-col justify-between"
              >
                <p className="font-serif text-sm sm:text-base text-[#F5F2EB]/90 leading-relaxed mb-4">
                  {isFa ? t.quoteFa : `“${t.quote}”`}
                </p>
                <footer className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-[#C8A96A] block">
                      {isFa ? t.authorFa : t.author}
                    </strong>
                    <span className="text-[#9E988E]">
                      {isFa ? t.roleFa : t.role}
                    </span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#3E7B5E]" />
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Concise FAQs */}
        <div className="border-t border-white/10 pt-14 sm:pt-16">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#C8A96A]" />
            <span>
              {isFa ? 'پرسش‌های متداول' : 'Frequently Asked Questions'}
            </span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ASA_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`bg-[#151816] border transition-colors ${
                    isOpen ? 'border-[#C8A96A]/60' : 'border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-4 text-start flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg text-[#F5F2EB]">
                      {isFa ? faq.qFa : faq.qEn}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C8A96A] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#9E988E] leading-relaxed border-t border-white/5">
                      {isFa ? faq.aFa : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer — Brand Identity without Tehran beside Logo */}
      <footer className="bg-[#090B0A] border-t border-white/10 py-12 px-4 sm:px-8 lg:px-14">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={asaBrandLogo}
              alt="Asa Brand Crest"
              referrerPolicy="no-referrer"
              className="w-12 h-12 object-cover border border-[#C8A96A]/45 shrink-0"
            />
            <div>
              <span className="font-serif text-lg sm:text-xl tracking-[0.12em] text-[#F5F2EB] block">
                {isFa
                  ? `${siteConfig.brandNameFa} · ${siteConfig.brandMottoFa}`
                  : `${siteConfig.brandNameEn} · ${siteConfig.brandMottoEn}`}
              </span>
              <p className="text-xs text-[#9E988E]">
                {isFa
                  ? `آسا همراه · آسا خوراک · آسا پزشک (${siteConfig.operationalCityNoteFa})`
                  : `Asa Hamrah · Asa Khoraak · Asa Pezeshk (${siteConfig.operationalCityNoteEn})`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#9E988E]">
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-[#C8A96A] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span>{isFa ? 'پنل مدیریت سایت' : 'Admin Dashboard'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleReorderFromLast(true)}
              className="hover:text-[#C8A96A] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span>{isFa ? 'تکرار آخرین سفارش' : 'Reorder from Last'}</span>
            </button>
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="hover:text-[#C8A96A] transition-colors cursor-pointer"
            >
              {isFa ? 'رهگیری زنده سفارش' : 'Live Order Tracker'}
            </button>
            <button
              onClick={() => setIsOrderDrawerOpen(true)}
              className="text-[#C8A96A] hover:underline cursor-pointer flex items-center gap-1.5 font-semibold"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>
                {isFa
                  ? `تکمیل سفارش (${
                      formatPrice(combinedTotalValue, lang, '', '', currency)
                        .amount
                    })`
                  : `Checkout (${
                      formatPrice(combinedTotalValue, lang, '', '', currency)
                        .amount
                    })`}
              </span>
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Quick-Action Bar (For Phone Screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0D0F0E]/96 backdrop-blur-xl border-t border-[#C8A96A]/35 px-3 py-2 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => handleReorderFromLast(true)}
          className="px-2.5 py-2 bg-[#151816] border border-[#C8A96A]/45 text-[#C8A96A] text-[11px] flex items-center gap-1 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isFa ? 'تکرار سفارش' : 'Reorder'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsAdminOpen(true)}
          className="px-2.5 py-2 bg-[#151816] border border-white/15 text-[#9E988E] text-[11px] flex items-center gap-1 shrink-0"
        >
          <Settings className="w-3.5 h-3.5 text-[#C8A96A]" />
          <span>{isFa ? 'مدیریت' : 'Admin'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsOrderDrawerOpen(true)}
          className="flex-1 py-2 px-3 bg-[#C8A96A] text-[#0D0F0E] text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>
            {isFa
              ? `سبد (${totalOrderCount.toLocaleString('fa-IR')}) · ${
                  formatPrice(combinedTotalValue, lang, '', '', currency).amount
                }`
              : `Cart (${totalOrderCount}) · ${
                  formatPrice(combinedTotalValue, lang, '', '', currency).amount
                }`}
          </span>
        </button>
      </div>

      {/* Unified Slide-Over Order Drawer with Reorder, Dietary Textarea, 3 Payment Gateways & Voice-to-Cart */}
      <OrderDrawer
        lang={lang}
        currency={currency}
        onSelectCurrency={setCurrency}
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        servicesCatalog={servicesCatalog}
        productsCatalog={productsCatalog}
        selectedServices={selectedServices}
        onAddService={handleAddServiceOnly}
        onRemoveService={handleRemoveService}
        cartProducts={cartProducts}
        onUpdateProductQuantity={handleUpdateQuantity}
        onClearAll={handleClearAll}
        lastOrder={lastOrder}
        onReorderFromLast={() => handleReorderFromLast(false)}
        paymentGateways={paymentGateways}
        parentProfile={parentProfile}
        onOrderDispatched={(details) => {
          const newBackdoorOrder: BackdoorOrderRecord = {
            id: `ord-${Date.now()}`,
            referenceCode: details.referenceCode,
            customerId: currentUser?.id || 'usr-guest',
            customerName: currentUser?.fullName || (isFa ? 'فرزند خانواده' : 'Family Member'),
            customerEmail: currentUser?.email || 'family@asa-care.com',
            recipientName: details.recipientName,
            residenceAddress: details.residenceAddress,
            deliveryWindow: details.deliveryWindow,
            serviceTitles: selectedServices.map((s) => (isFa ? s.titleFa : s.title)),
            productSummaries: cartProducts.map(
              ({ product, quantity }) =>
                `${quantity}× ${isFa ? product.nameFa : product.name}`
            ),
            passThroughTotalUsd: details.passThroughTotalUsd,
            asaServiceFeeUsd: details.asaServiceFeeUsd,
            grandTotalUsd: details.passThroughTotalUsd + details.asaServiceFeeUsd,
            gatewayId: details.selectedGatewayId,
            specialInstructions: details.specialInstructions,
            personalMessageCard: details.personalMessageCard,
            hasVoiceNote: details.hasVoiceNote,
            assignedStewardNameFa: 'سهراب فرهمند (همراه ارشد آسا همراه)',
            assignedStewardNameEn: 'Sohrab Farahmand (Senior Steward)',
            currentStageIndex: 0,
            createdAt: isFa ? 'همین الان' : 'Just Now',
            createdAtTimestamp: Date.now(),
          };
          setBackdoorOrders((prev) => [newBackdoorOrder, ...prev]);

          setLastOrder({
            referenceCode: details.referenceCode,
            dateLabelFa: 'همین الان',
            dateLabelEn: 'Just Now',
            serviceIds: [...selectedServiceIds],
            productQuantities: { ...cartQuantities },
            specialInstructions: details.specialInstructions,
            recipientName: details.recipientName,
            residenceAddress: details.residenceAddress,
            personalMessageCard: details.personalMessageCard,
          });
          const liveReceiptItems = [
            ...cartProducts.map(({ product, quantity }) => ({
              nameFa: product.nameFa,
              nameEn: product.name,
              qtyLabelFa: `${quantity.toLocaleString('fa-IR')} × ${product.unitSizeFa}`,
              qtyLabelEn: `${quantity} × ${product.unitSize}`,
              priceUsd: product.price * quantity,
            })),
            ...selectedServices.map((srv) => ({
              nameFa: srv.titleFa,
              nameEn: srv.title,
              qtyLabelFa: 'خدمت تخصصی آسا',
              qtyLabelEn: 'ASA Service',
              priceUsd: srv.price,
            })),
          ];
          setActiveTrackedOrder({
            referenceCode: details.referenceCode,
            residenceAddress: details.residenceAddress,
            deliveryWindow: details.deliveryWindow,
            itemsCount: totalOrderCount,
            currentStageIndex: 0,
            createdAt: 'Just Now',
            recipientName: details.recipientName,
            passThroughTotalUsd: details.passThroughTotalUsd,
            asaServiceFeeUsd: details.asaServiceFeeUsd,
            personalMessageCard: details.personalMessageCard,
            stewardNameFa: 'سهراب فرهمند (همراه ارشد آسا همراه)',
            stewardNameEn: 'Sohrab Farahmand (Senior Steward)',
            receiptItems: liveReceiptItems,
          });
        }}
        onOpenTracking={() => {
          setIsOrderDrawerOpen(false);
          setIsTrackingModalOpen(true);
        }}
        onOpenWaitlistModal={(distCode) => {
          setWaitlistDistrictCode(distCode);
          setIsWaitlistModalOpen(true);
        }}
      />

      {/* Real-Time Order Lifecycle Tracking Modal */}
      <OrderTrackingModal
        lang={lang}
        currency={currency}
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        activeOrder={activeTrackedOrder}
        onAdvanceStage={(nextIdx) =>
          setActiveTrackedOrder((prev) => ({
            ...prev,
            currentStageIndex: nextIdx,
          }))
        }
        onSubmitReview={(rev) =>
          setSubmittedReviews((prev) => [
            {
              ...rev,
              id: `rev-${Date.now()}`,
              createdAt: isFa ? 'همین الان' : 'Just Now',
              approved: true,
            },
            ...prev,
          ])
        }
      />

      {/* Floating Concierge Chat & Direct Tehran Coordinator Desk */}
      <ConciergeChatWidget
        lang={lang}
        messages={conciergeMessages}
        onSendMessage={(msg) =>
          setConciergeMessages((prev) => [
            ...prev,
            {
              ...msg,
              id: `msg-${Date.now()}`,
              createdAt: isFa ? 'همین الان' : 'Just Now',
              status: 'unread',
            },
          ])
        }
        onOpenAdminInbox={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
