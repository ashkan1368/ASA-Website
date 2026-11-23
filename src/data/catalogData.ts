import heroEstateImg from '../assets/images/hero_luxury_estate_market_1794671927456.jpg';
import serviceConciergeImg from '../assets/images/service_estate_concierge_1794671929539.jpg';
import marketHarvestImg from '../assets/images/market_artisanal_harvest_1794671930502.jpg';
import marketPantryImg from '../assets/images/market_fine_pantry_1794671931365.jpg';
import marketSanctuaryImg from '../assets/images/market_home_sanctuary_1794671931784.jpg';

export type Language = 'fa' | 'en';

export const BRAND_IMAGES = {
  heroEstate: heroEstateImg,
  serviceConcierge: serviceConciergeImg,
  marketHarvest: marketHarvestImg,
  marketPantry: marketPantryImg,
  marketSanctuary: marketSanctuaryImg,
};

export type ServiceDepartment =
  | 'All Divisions'
  | 'Asa Hamrah'
  | 'Asa Khoraak'
  | 'Asa Pezeshk'
  | 'Coming Soon';

export interface EstateService {
  id: string;
  indexNumber: string;
  title: string;
  titleFa: string;
  department: Exclude<ServiceDepartment, 'All Divisions'>;
  departmentFa: string;
  shortDescription: string;
  shortDescriptionFa: string;
  fullProtocol: string;
  fullProtocolFa: string;
  deliverables: string[];
  deliverablesFa: string[];
  exclusions: string[];
  exclusionsFa: string[];
  executionSteps: string[];
  executionStepsFa: string[];
  specialistTeam: string;
  specialistTeamFa: string;
  materialsUsed: string;
  materialsUsedFa: string;
  duration: string;
  durationFa: string;
  leadTime: string;
  leadTimeFa: string;
  price: number;
  billingUnit: string;
  billingUnitFa: string;
  image: string;
  featuredMetric: string;
  featuredMetricFa: string;
  isComingSoon?: boolean;
}

export type GroceryCategory =
  | 'All Provisions'
  | 'Asa Khoraak Prepared Meals'
  | 'Fresh Tehran Orchard Produce'
  | 'Sangak Bakery & Traditional Dairy'
  | 'Persian Pantry & Healthy Oils'
  | 'Fresh Butcher & Daily Catch'
  | 'Home Comfort & Senior Care Essentials';

export interface GroceryProduct {
  id: string;
  name: string;
  nameFa: string;
  category: Exclude<GroceryCategory, 'All Provisions'>;
  categoryFa: string;
  origin: string;
  originFa: string;
  unitSize: string;
  unitSizeFa: string;
  price: number;
  shortDescription: string;
  shortDescriptionFa: string;
  provenanceNote: string;
  provenanceNoteFa: string;
  dietaryMeta: string;
  dietaryMetaFa: string;
  harvestAvailability: string;
  harvestAvailabilityFa: string;
  image: string;
  isSignatureSelection?: boolean;
}

export interface CuratedFamilyBundle {
  id: string;
  pillarBadge: string;
  pillarBadgeFa: string;
  title: string;
  titleFa: string;
  subtitle: string;
  subtitleFa: string;
  description: string;
  descriptionFa: string;
  includedProductIds: string[];
  includedSummary: string[];
  includedSummaryFa: string[];
  passThroughProductTotal: number;
  asaServiceFee: number;
  RecommendedFor: string;
  RecommendedForFa: string;
  image: string;
}

export interface TehranZone {
  id: string;
  nameFa: string;
  nameEn: string;
  districtFa: string;
  districtEn: string;
  status: 'active-pilot' | 'scheduled-next';
  travelFeeUsd: number;
  responseTimeFa: string;
  responseTimeEn: string;
  partnerClinicsFa: string;
  partnerClinicsEn: string;
}

export const TEHRAN_SERVICE_ZONES: TehranZone[] = [
  {
    id: 'zn-01',
    nameFa: 'شمیرانات، زعفرانیه، ولنجک و نیاوران',
    nameEn: 'Shemiranat, Zafaranieh, Velenjak & Niavaran',
    districtFa: 'منطقه ۱ تهران · زون پایلوت فعال',
    districtEn: 'Tehran District 1 · Active Pilot Zone',
    status: 'active-pilot',
    travelFeeUsd: 0,
    responseTimeFa: 'تضمین حضور در بازه ۲ ساعته · بدون هزینه ایاب‌وذهاب اضافه',
    responseTimeEn: 'Guaranteed 2h window · $0 base zone travel surcharge',
    partnerClinicsFa: 'بیمارستان جم، کلینیک‌های تخصصی ولیعصر، آزمایشگاه مسعود و مراکز درمانی شمال تهران',
    partnerClinicsEn: 'Jam Hospital, Valiasr Specialty Clinics, Masoud Lab & North Tehran Centers',
  },
  {
    id: 'zn-02',
    nameFa: 'ونک، جردن (نلسون ماندلا)، امانیه و الهیه',
    nameEn: 'Vanak, Jordan (Nelson Mandela), Amaniyeh & Elahieh',
    districtFa: 'منطقه ۱ و ۳ تهران · زون پایلوت فعال',
    districtEn: 'Tehran Districts 1 & 3 · Active Pilot Zone',
    status: 'active-pilot',
    travelFeeUsd: 0,
    responseTimeFa: 'تضمین حضور در بازه ۲ ساعته · هسته مرکزی عملیات آسا',
    responseTimeEn: 'Guaranteed 2h window · Core Asa Operations Hub',
    partnerClinicsFa: 'بیمارستان دی، بیمارستان خاتم‌الانبیا، کلینیک‌های تخصصی ونک و میرداماد',
    partnerClinicsEn: 'Day Hospital, Khatam Hospital, Vanak & Mirdamad Medical Centers',
  },
  {
    id: 'zn-03',
    nameFa: 'پاسداران، دروس، قلهک و شریعتی',
    nameEn: 'Pasdaran, Darrous, Gholhak & Shariati',
    districtFa: 'منطقه ۳ و ۴ تهران · زون پایلوت فعال',
    districtEn: 'Tehran Districts 3 & 4 · Active Pilot Zone',
    status: 'active-pilot',
    travelFeeUsd: 4,
    responseTimeFa: 'تضمین حضور با هماهنگی قبلی · ۴ دلار هزینه مسیر',
    responseTimeEn: 'Scheduled dispatch · $4 zone travel pass-through',
    partnerClinicsFa: 'بیمارستان ایرانمهر، مراکز تصویربرداری شریعتی و کلینیک‌های تخصصی پاسداران',
    partnerClinicsEn: 'Iranmehr Hospital, Shariati Diagnostic Centers & Pasdaran Clinics',
  },
  {
    id: 'zn-04',
    nameFa: 'شهرک غرب، سعادت‌آباد، یوسف‌آباد و امیرآباد',
    nameEn: 'Shahrak-e Gharb, Saadat Abad, Yousef Abad & Amir Abad',
    districtFa: 'منطقه ۲ و ۶ تهران · زون پایلوت فعال',
    districtEn: 'Tehran Districts 2 & 6 · Active Pilot Zone',
    status: 'active-pilot',
    travelFeeUsd: 5,
    responseTimeFa: 'پوشش کامل آسا همراه، آسا خوراک و آسا پزشک · ۵ دلار هزینه مسیر',
    responseTimeEn: 'Full Asa Hamrah, Khoraak & Pezeshk coverage · $5 travel pass-through',
    partnerClinicsFa: 'بیمارستان عرفان، بیمارستان آتیه، بیمارستان لاله و مراکز درمانی توانیر و یوسف‌آباد',
    partnerClinicsEn: 'Erfan Hospital, Atieh Hospital, Laleh Hospital & Yousef Abad Clinics',
  },
  {
    id: 'zn-05',
    nameFa: 'سایر مناطق تهران و کرج (فاز توسعه بعدی)',
    nameEn: 'Other Tehran Districts & Karaj (Next Expansion Phase)',
    districtFa: 'نیازمند هماهنگی موردی پیش از ثبت سفارش',
    districtEn: 'Requires manual coordinator quote prior to booking',
    status: 'scheduled-next',
    travelFeeUsd: 12,
    responseTimeFa: 'بررسی موردی توسط هماهنگ‌کننده بر اساس ترافیک و فاصله',
    responseTimeEn: 'Case-by-case human quote based on travel time and worker availability',
    partnerClinicsFa: 'هماهنگی اختصاصی بر اساس مرکز درمانی مقصد خانواده شما',
    partnerClinicsEn: 'Custom coordination based on your parent’s target clinic',
  },
];

export const SERVICE_DEPARTMENTS: {
  name: ServiceDepartment;
  nameFa: string;
  summary: string;
  summaryFa: string;
  count: number;
}[] = [
  {
    name: 'All Divisions',
    nameFa: 'همه خدمات آسا (۳ شاخه اصلی)',
    summary: 'Complete founder-approved architecture: Asa Hamrah, Asa Khoraak, and Asa Pezeshk.',
    summaryFa: 'معماری کامل خدمات آسا در تهران: آسا همراه، آسا خوراک و آسا پزشک با شفافیت کامل و گزارش خانواده.',
    count: 12,
  },
  {
    name: 'Asa Hamrah',
    nameFa: 'آسا همراه (همراهی عملی و خرید)',
    summary: 'Practical companionship for family tasks, custom shopping, errands, and transport support in Tehran.',
    summaryFa: 'همراهی عملی اعضای خانواده برای کارهای روزمره، خرید سفارشی با تحویل فاکتور و پشتیبانی تردد در تهران.',
    count: 4,
  },
  {
    name: 'Asa Khoraak',
    nameFa: 'آسا خوراک (بسته‌های غذایی و برنامه روزانه)',
    summary: 'Sending packaged meals, varied home-style food selections, and daily or bulk family meal plans.',
    summaryFa: 'ارسال بسته‌های غذایی آماده، غذاهای متنوع خانگی و برنامه‌های غذایی روزانه یا هفتگی از تامین‌کنندگان مجاز.',
    count: 4,
  },
  {
    name: 'Asa Pezeshk',
    nameFa: 'آسا پزشک (هماهنگی و همراهی پزشکی)',
    summary: 'Medical-family logistics: booking appointments, follow-up, transport, and non-clinical accompaniment.',
    summaryFa: 'هماهنگی نوبت پزشک، یادآوری، پیگیری، همراهی غیربالینی تا مراکز درمانی و ارسال گزارش دقیق به خانواده.',
    count: 3,
  },
  {
    name: 'Coming Soon',
    nameFa: 'در دست راه‌اندازی (فازهای بعدی)',
    summary: 'Future expansion services clearly labeled until staffing, legal, and supplier gates are completed.',
    summaryFa: 'خدماتی که پس از تکمیل فاز پایلوت و تاییدیه‌های عملیاتی به سبد آسا اضافه خواهند شد.',
    count: 1,
  },
];

export const ESTATE_SERVICES: EstateService[] = [
  // 1. ASA HAMRAH (آسا همراه)
  {
    id: 'asa-h-01',
    indexNumber: '01',
    title: 'Asa Hamrah — Custom Grocery & Household Shopping with Receipt Reconciliation',
    titleFa: 'آسا همراه — خرید سفارشی منزل و مایحتاج والدین با تطبیق کامل فاکتور',
    department: 'Asa Hamrah',
    departmentFa: 'آسا همراه (همراهی عملی و خرید)',
    shortDescription:
      'Send a shopping list, budget, timing, and substitution rules. Our vetted Tehran companion purchases locally, checks quality, delivers to your parent’s door, and sends an itemized receipt and Family Update.',
    shortDescriptionFa:
      'لیست خرید، بودجه، زمان تحویل و قوانین جایگزینی کالا را مشخص کنید. همراه احراز هویت‌شده آسا از فروشگاه‌های معتبر محلی در تهران خرید کرده، سلامت اقلام را بررسی می‌کند، تحویل می‌دهد و فاکتور جزءبه‌جزء به همراه گزارش خانواده ارسال می‌نماید.',
    fullProtocol:
      'Designed as Asa’s primary commercial wedge for diaspora adult children. Grocery product value is strictly pass-through and separated from Asa’s $18 service/coordination fee. No unapproved substitutions are ever made silently.',
    fullProtocolFa:
      'طراحی‌شده بر اساس استاندارد شفافیت مالی آسا: هزینه خودِ اقلام و کالاها دقیقاً طبق فاکتور رسمی فروشگاه (Pass-through) محاسبه شده و از کارمزد ۱۸ دلاری هماهنگی و اجرای آسا کاملاً جداست. هیچ کالایی بدون اجازه شما خودسرانه جایگزین نمی‌شود.',
    deliverables: [
      'Shopping list review, budget cap lock, and pre-agreed substitution rules',
      'In-person selection from vetted Tehran supermarkets & local bakeries',
      'Doorstep or kitchen delivery confirmation + itemized store receipt photo & Family Update',
    ],
    deliverablesFa: [
      'بررسی لیست خرید، سقف بودجه و ثبت دقیق قوانین جایگزینی در صورت عدم موجودی یک کالا',
      'خرید حضوری و دست‌چین از فروشگاه‌های معتبر محلی در محدوده منزل والدین شما در تهران',
      'تحویل محترمانه، ارسال تصویر فاکتور رسمی فروشگاه، تسویه شفاف و گزارش مکتوب خانواده',
    ],
    exclusions: [
      'Controlled or prescription-only medications without approved procedure',
      'Uncapped open-city product hunting outside the agreed Tehran zone',
      'Unapproved cash handoffs or clinical advice',
    ],
    exclusionsFa: [
      'خرید داروهای کنترل‌شده یا نسخه‌ای خارج از چارچوب مجاز',
      'جستجوی نامحدود در خارج از محدوده جغرافیایی توافق‌شده در تهران',
      'جابجایی وجه نقد خارج از رویه مصوب یا ارائه هرگونه توصیه پزشکی',
    ],
    executionSteps: [
      'Step 1: Submit recipient neighborhood, shopping list, budget cap, and substitution preferences.',
      'Step 2: Asa Coordinator confirms scope; vetted companion shops and verifies expiry/freshness.',
      'Step 3: Delivery confirmed with recipient; itemized receipt reconciliation & Family Update sent.',
    ],
    executionStepsFa: [
      'مرحله ۱: ثبت محله منزل والدین در تهران، لیست خرید، سقف بودجه و اولویت جایگزینی کالاها',
      'مرحله ۲: تایید هماهنگ‌کننده آسا؛ خرید حضوری توسط همراه با بررسی تاریخ مصرف و تازگی',
      'مرحله ۳: تحویل به خانواده، ارسال عکس فاکتور رسمی فروشگاه و گزارش تکمیل خدمت (Family Update)',
    ],
    specialistTeam: '1 Vetted Asa Hamrah Companion + 1 Tehran Dispatch Coordinator',
    specialistTeamFa: '۱ همراه احراز هویت‌شده آسا + ۱ هماهنگ‌کننده عملیات تهران',
    materialsUsed: 'Itemized Official Store Receipt · Consent-Based Photo Proof · Pass-Through Accounting',
    materialsUsedFa: 'فاکتور رسمی فروشگاه · مستندسازی با رضایت گیرنده · تفکیک کامل هزینه کالا از کارمزد خدمت',
    duration: '2–3 Hours Turnaround',
    durationFa: 'بازه اجرایی ۲ تا ۳ ساعته',
    leadTime: 'Same-Day or Scheduled',
    leadTimeFa: 'همان‌روز یا زمان‌بندی از قبل',
    price: 18,
    billingUnit: 'service fee (+ pass-through grocery cost)',
    billingUnitFa: 'کارمزد خدمت (+ هزینه اقلام طبق فاکتور)',
    image: BRAND_IMAGES.marketHarvest,
    featuredMetric: 'Base Model Wedge · $18 Fixed Service Fee',
    featuredMetricFa: 'سرویس پایه آسا همراه · کارمزد شفاف ۱۸ دلار',
  },
  {
    id: 'asa-h-02',
    indexNumber: '02',
    title: 'Asa Hamrah — Practical Errands & Administrative Task Accompaniment',
    titleFa: 'آسا همراه — همراهی والدین در امور روزمره، اداری و کارهای بیرون از منزل',
    department: 'Asa Hamrah',
    departmentFa: 'آسا همراه (همراهی عملی و خرید)',
    shortDescription:
      'Respectful, dignified accompaniment for a parent in Tehran who needs practical support with post office errands, optical/hearing-aid fittings, bank queues, or shopping trips.',
    shortDescriptionFa:
      'همراهی محترمانه و باوقار والدین در تهران برای انجام کارهای روزمره بیرون از خانه؛ مانند مراجعه به عینک‌سازی، دفاتر خدمات، پست، خرید حضوری یا کارهای بانکی و شهری.',
    fullProtocol:
      'The recipient remains fully in control and informed. Before the visit, Asa confirms recipient consent, introduces the named companion with ID, arranges safe door-to-door transport, and sends a factual summary afterward.',
    fullProtocolFa:
      'در تمامی خدمات آسا همراه، حفظ کرامت، استقلال و آرامش والدین اصل اول است. پیش از مراجعه، رضایت کامل گیرنده خدمت دریافت شده، مشخصات و کارت شناسایی همراه معرفی می‌گردد و پس از انجام کار، گزارش دقیق و واقعی برای شما ارسال می‌شود.',
    deliverables: [
      '3-hour dedicated practical accompaniment window in Tehran',
      'Named companion introduction with verified ID prior to arrival',
      'Queue, paperwork/registration logistics, package carrying, and factual Family Update',
    ],
    deliverablesFa: [
      '۳ ساعت همراهی اختصاصی و محترمانه در محدوده منتخب تهران',
      'معرفی کامل همراه به همراه کارت شناسایی معتبر پیش از حضور در درب منزل',
      'کمک در نوبت‌گیری، حمل بسته‌ها، هماهنگی خودرو و ارسال گزارش دقیق به فرزند',
    ],
    exclusions: [
      'Legal representation, power-of-attorney signing, or financial custody',
      'Clinical care, physical lifting/transfers, or emergency response',
    ],
    exclusionsFa: [
      'وکالت حقوقی، امضای اسناد مالی یا نگهداری وجه نقد و کارت بانکی والدین',
      'امور درمانی، جابجایی فیزیکی بیمار (بلند کردن) یا خدمات اورژانس',
    ],
    executionSteps: [
      'Step 1: Define the exact errand, locations, time window, and recipient consent.',
      'Step 2: Companion meets parent at home with ID and coordinates transport.',
      'Step 3: Safe return home and delivery of factual Family Update.',
    ],
    executionStepsFa: [
      'مرحله ۱: ثبت دقیق مسیر، نوع کار روزمره، بازه زمانی و تایید رضایت والدین',
      'مرحله ۲: حضور همراه با کارت شناسایی در درب منزل و هماهنگی وسیله نقلیه مناسب',
      'مرحله ۳: بازگشت ایمن والدین به منزل و ارسال گزارش مکتوب انجام کار برای شما',
    ],
    specialistTeam: '1 Safeguarding-Trained Asa Hamrah Companion',
    specialistTeamFa: '۱ همراه آموزش‌دیده در اصول تکریم سالمند و حریم خصوصی',
    materialsUsed: 'Verified Companion ID · Check-In / Check-Out Log · Factual Update Template',
    materialsUsedFa: 'کارت شناسایی رسمی همراه · ثبت ساعت ورود و خروج · فرم گزارش خانواده',
    duration: '3-Hour Defined Window',
    durationFa: 'بازه استاندارد ۳ ساعته',
    leadTime: '24h Advance Booking',
    leadTimeFa: 'رزرو از ۲۴ ساعت قبل',
    price: 38,
    billingUnit: 'per 3-hour window (+ transport pass-through)',
    billingUnitFa: 'هر بازه ۳ ساعته (+ هزینه اسنپ/تاکسی طبق رسید)',
    image: BRAND_IMAGES.serviceConcierge,
    featuredMetric: '100% Recipient Consent & Dignity Protocol',
    featuredMetricFa: '۱۰۰٪ مبتنی بر رضایت و حفظ استقلال والدین',
  },
  {
    id: 'asa-h-03',
    indexNumber: '03',
    title: 'Asa Hamrah — Travel, Airport & Inter-City Terminal Transfer Support',
    titleFa: 'آسا همراه — همراهی و بدرقه یا استقبال والدین در فرودگاه و ترمینال/قطار',
    department: 'Asa Hamrah',
    departmentFa: 'آسا همراه (همراهی عملی و خرید)',
    shortDescription:
      'End-to-end practical assistance when your parent is traveling to or from Tehran: luggage support, check-in counter coordination, wheelchair request handoff, and live arrival confirmation.',
    shortDescriptionFa:
      'همراهی کامل والدین هنگام سفر هوایی یا ریلی؛ از تحویل گرفتن در منزل و حمل چمدان تا انجام امور کارت پرواز، تحویل به بخش ویلچر/تشریفات فرودگاه و اطلاع‌رسانی لحظه‌ای به شما.',
    fullProtocol:
      'Eliminates travel anxiety for diaspora families when parents fly internationally or domestically. Our companion stays until the parent passes security or arrives safely inside their Tehran residence.',
    fullProtocolFa:
      'اضطراب سفرهای هوایی یا بین‌شهری والدین را به صفر برسانید. همراه آسا از درب منزل تا گیت خروجی فرودگاه (یا برعکس، از سالن ورودی تا استقرار کامل در منزل) کنار والدین شماست و هر مرحله را با پیام به اطلاع شما می‌رساند.',
    deliverables: [
      'Door-to-terminal or terminal-to-door accompaniment with luggage assistance',
      'Airline check-in coordination and airport mobility-assistance handoff',
      'Real-time milestone updates (Picked up -> Checked in -> At Gate / Home Safely)',
    ],
    deliverablesFa: [
      'همراهی از درب منزل تا فرودگاه/ایستگاه قطار (یا استقبال در زمان ورود به تهران)',
      'کمک در حمل چمدان‌ها، دریافت کارت پرواز و هماهنگی ویلچر فرودگاهی در صورت نیاز',
      'ارسال گزارش لحظه‌ای در ۳ نقطه کلیدی (حرکت از منزل، تحویل بار، استقرار نهایی)',
    ],
    exclusions: [
      'Airside passage beyond security gates restricted to ticketed passengers',
      'Medical flight escort or oxygen/clinical equipment operation',
    ],
    exclusionsFa: [
      'ورود به بخش‌های امنیتی مخصوص مسافران دارای بلیط پرواز',
      'اسکورت پزشکی هوایی یا کار با تجهیزات درمانی و اکسیژن',
    ],
    executionSteps: [
      'Step 1: Share flight/train details, luggage count, and mobility preferences.',
      'Step 2: Companion arrives with spacious vehicle and handles luggage & check-in.',
      'Step 3: Live confirmation sent upon safe gate handoff or home arrival.',
    ],
    executionStepsFa: [
      'مرحله ۱: ثبت اطلاعات پرواز یا قطار، تعداد چمدان‌ها و نیازهای حرکتی والدین',
      'مرحله ۲: حضور به‌موقع همراه با خودروی مناسب، جابجایی بار و انجام امور پذیرش',
      'مرحله ۳: ارسال تاییدیه نهایی به خانواده پس از عبور ایمن از گیت یا ورود به منزل',
    ],
    specialistTeam: '1 Senior Travel Companion + Vetted Driver',
    specialistTeamFa: '۱ همراه ارشد سفر + خودروی تشریفاتی/مناسب‌سازی‌شده',
    materialsUsed: 'Flight Tracking Sync · Luggage Assistance · 3-Stage Live Update',
    materialsUsedFa: 'پایش زنده ساعت پرواز · کمک در حمل بار · گزارش ۳ مرحله‌ای سفر',
    duration: 'Up to 4 Hours Transfer',
    durationFa: 'تا ۴ ساعت همراهی کامل سفر',
    leadTime: '48h Advance Booking',
    leadTimeFa: 'رزرو از ۴۸ ساعت قبل',
    price: 52,
    billingUnit: 'per transfer package (+ airport taxi receipt)',
    billingUnitFa: 'هر پکیج بدرقه یا استقبال (+ کرایه خودرو طبق رسید)',
    image: BRAND_IMAGES.heroEstate,
    featuredMetric: 'Ideal for parents flying abroad to visit children',
    featuredMetricFa: 'بهترین انتخاب برای سفرهای خارج از کشور والدین',
  },
  {
    id: 'asa-h-04',
    indexNumber: '04',
    title: 'Asa Hamrah — Home Readiness, Seasonal Setup & Special Occasion Care Delivery',
    titleFa: 'آسا همراه — آماده‌سازی منزل والدین، خرید مناسبتی (نوروز/یلدا/تولد) و چیدمان',
    department: 'Asa Hamrah',
    departmentFa: 'آسا همراه (همراهی عملی و خرید)',
    shortDescription:
      'Send a thoughtful, practical act of care for a parent’s birthday, Mother’s/Father’s Day, Yalda, or Nowruz—combining useful household shopping, fresh flowers, and respectful in-person delivery.',
    shortDescriptionFa:
      'در روزهای خاص مانند تولد والدین، روز مادر و پدر، شب یلدا یا نوروز، یک هدیه کاربردی همراه با گل تازه، میوه و مایحتاج واقعی منزل را با حضور محترمانه همراه آسا تقدیمشان کنید.',
    fullProtocol:
      'Positioned in the Asa Business Plan as a high-trust acquisition and gifting occasion that goes beyond generic flower websites by pairing emotional warmth with practical household help and a consented family update.',
    fullProtocolFa:
      'برخلاف سایت‌های معمولی ارسال گل، آسا همراه این امکان را فراهم می‌کند که در کنار گل و شیرینی تازه، خریدهای کاربردی منزل والدین نیز انجام شده، در یخچال چیده شود و گزارش صمیمانه و محترمانه‌ای از حال خوبشان دریافت کنید.',
    deliverables: [
      'Curated seasonal flowers/pastry + custom household grocery list fulfillment',
      'Respectful greeting delivery and kitchen pantry/refrigerator placement',
      'Itemized supplier receipts + consented photo and Family Update',
    ],
    deliverablesFa: [
      'تهیه گل تازه، شیرینی/میوه مناسبتی به همراه لیست مایحتاج کاربردی منزل از بهترین فروشگاه‌ها',
      'تحویل محترمانه، تبریک حضوری از طرف شما و کمک در چیدمان اقلام در آشپزخانه',
      'ارسال تمامی فاکتورهای خرید به همراه عکس یادگاری (در صورت رضایت والدین) و گزارش خانواده',
    ],
    exclusions: [
      'Unannounced surprise visits without prior recipient or family coordination',
      'Cash gifts or gold/jewelry transport',
    ],
    exclusionsFa: [
      'مراجعه سرزده بدون هماهنگی قبلی که موجب نگرانی سالمند شود',
      'حمل وجه نقد، سکه یا طلا و جواهرات',
    ],
    executionSteps: [
      'Step 1: Choose occasion items, household shopping list, and personal message.',
      'Step 2: Local procurement from vetted florists, confectioneries & markets.',
      'Step 3: Scheduled visit, kitchen placement, and itemized receipt + update.',
    ],
    executionStepsFa: [
      'مرحله ۱: انتخاب اقلام مناسبتی، لیست خرید منزل و متن پیام شخصی شما برای والدین',
      'مرحله ۲: تهیه روزانه از بهترین گل‌فروشی‌ها، قنادی‌ها و فروشگاه‌های منطقه ۱ تا ۶ تهران',
      'مرحله ۳: حضور با هماهنگی قبلی، چیدمان اقلام و ارسال فاکتور و گزارش کامل به شما',
    ],
    specialistTeam: '1 Asa Hamrah Gifting & Household Steward',
    specialistTeamFa: '۱ همراه ویژه مناسبت‌ها و تدارکات منزل آسا',
    materialsUsed: 'Handwritten Message Card · Official Supplier Receipts · Consented Photo',
    materialsUsedFa: 'کارت پیام دست‌نویس شما · فاکتورهای رسمی خرید · گزارش تصویری با رضایت',
    duration: '2.5 Hours Service',
    durationFa: '۲.۵ ساعت اجرای کامل',
    leadTime: '24h Advance Booking',
    leadTimeFa: 'رزرو از ۲۴ ساعت قبل',
    price: 26,
    billingUnit: 'service fee (+ pass-through item receipts)',
    billingUnitFa: 'کارمزد خدمت (+ هزینه اقلام طبق فاکتور رسمی)',
    image: BRAND_IMAGES.serviceConcierge,
    featuredMetric: 'Thoughtful care + practical household utility',
    featuredMetricFa: 'ترکیب محبت فرزندان با رفع نیازهای واقعی منزل والدین',
  },

  // 2. ASA KHORAAK (آسا خوراک)
  {
    id: 'asa-k-01',
    indexNumber: '05',
    title: 'Asa Khoraak — Daily Balanced Home-Style Meal Package (3-Day Set)',
    titleFa: 'آسا خوراک — پکیج ۳ روزه غذاهای گرم و سلامت خانگی ویژه والدین',
    department: 'Asa Khoraak',
    departmentFa: 'آسا خوراک (بسته‌های غذایی و برنامه روزانه)',
    shortDescription:
      'Three days of varied, freshly prepared, low-sodium Persian and healthy meals sourced from authorized, hygiene-audited kitchens in Tehran, delivered in dated containers with clear heating instructions.',
    shortDescriptionFa:
      'ارسال بسته ۳ روزه غذاهای متنوع، کم‌نمک و کم‌چرب ایرانی و فرنگی از آشپزخانه‌های مجاز و دارای گواهی بهداشت در تهران؛ در ظروف استاندارد دارای برچسب تاریخ، ترکیبات و راهنمای گرم‌کردن.',
    fullProtocol:
      'Follows the Asa Khoraak governance rules: supplier identity, preparation date, allergen disclosure, dietary preferences (low-salt, low-fat, diabetic-friendly), delivery window, and substitution policies are documented upfront before confirmation.',
    fullProtocolFa:
      'مطابق استاندارد «آسا خوراک»، نام آشپزخانه تامین‌کننده مجاز، ساعت پخت، جدول حساسیت‌های غذایی (کم‌نمک، کم‌چرب، مناسب دیابت)، بازه تحویل و قوانین جایگزینی پیش از ثبت نهایی به تایید شما و والدین می‌رسد.',
    deliverables: [
      '3 lunches + 3 light, digestible dinners + fresh side salads & soups',
      'Full allergen, sodium, and ingredient label on every sealed package',
      'Confirmed delivery inside the agreed 2-hour Tehran window + Family Update',
    ],
    deliverablesFa: [
      '۳ وعده ناهار اصیل و مقوی + ۳ وعده شام سبک و زود‌هضم به همراه سوپ و سالاد تازه',
      'درج کامل ترکیبات، میزان نمک/چربی، تاریخ تولید و نام تامین‌کننده مجاز روی هر بسته',
      'تحویل در بازه زمانی ۲ ساعته توافق‌شده در تهران به همراه تاییدیه دریافت والدین',
    ],
    exclusions: [
      'Clinical medical nutrition therapy or hospital enteral feeding',
      'Unlabeled homemade food from unlicensed kitchens',
    ],
    exclusionsFa: [
      'رژیم‌درمانی بالینی بیمارستانی یا تغذیه ویژه مراقبت‌های ویژه',
      'تهیه غذا از آشپزخانه‌های بدون مجوز بهداشتی و بدون برچسب استاندارد',
    ],
    executionSteps: [
      'Step 1: Select dietary preferences, portion size, and allergen exclusions.',
      'Step 2: Authorized partner kitchen prepares and seals meals on delivery morning.',
      'Step 3: Cold/thermal delivery to parent’s home with confirmation update.',
    ],
    executionStepsFa: [
      'مرحله ۱: ثبت ذائقه والدین، محدودیت‌های غذایی (نمک/قند/چربی) و حجم وعده‌ها',
      'مرحله ۲: پخت روزانه در آشپزخانه مجاز طرف قرارداد و پلمپ بهداشتی بسته‌ها',
      'مرحله ۳: ارسال با کیف‌های حفظ دما درب منزل والدین و ارسال گزارش تحویل به شما',
    ],
    specialistTeam: 'Authorized Culinary Supplier + Asa Khoraak Delivery Coordinator',
    specialistTeamFa: 'آشپزخانه مجاز منتخب + هماهنگ‌کننده کنترل کیفیت آسا خوراک',
    materialsUsed: 'Food-Grade Sealed Containers · Allergen & Heating Labels · Thermal Delivery',
    materialsUsedFa: 'ظروف بهداشتی پلمپ‌شده · برچسب ترکیبات و راهنمای مصرف · حمل با باکس حرارتی',
    duration: 'Covers 3 Full Days',
    durationFa: 'پوشش کامل ۳ روز (۶ وعده اصلی)',
    leadTime: '24h Advance Booking',
    leadTimeFa: 'رزرو از ۲۴ ساعت قبل',
    price: 24,
    billingUnit: 'coordination & delivery fee (+ supplier meal invoice)',
    billingUnitFa: 'کارمزد هماهنگی و ارسال (+ هزینه پکیج உணவு طبق فاکتور)',
    image: BRAND_IMAGES.heroEstate,
    featuredMetric: 'Hygiene-Audited Suppliers · Full Allergen Transparency',
    featuredMetricFa: 'تامین از مراکز مجاز دارای پروانه بهداشت · شفافیت کامل مواد اولیه',
  },
  {
    id: 'asa-k-02',
    indexNumber: '06',
    title: 'Asa Khoraak — Weekly Varied Family Meal Plan (7-Day Program)',
    titleFa: 'آسا خوراک — برنامه غذایی متنوع هفتگی (ارسال در ۲ نوبت تازه در هفته)',
    department: 'Asa Khoraak',
    departmentFa: 'آسا خوراک (بسته‌های غذایی و برنامه روزانه)',
    shortDescription:
      'A structured 7-day meal plan delivered across two fresh dispatches (Saturday & Tuesday) so your parents enjoy varied, nourishing stews, grilled proteins, and herbal soups all week without cooking fatigue.',
    shortDescriptionFa:
      'برنامه غذایی ۷ روزه که برای حفظ تازگی حداکثری در دو نوبت (شنبه و سه‌شنبه) ارسال می‌شود تا والدین شما در تمام طول هفته بدون خستگیِ آشپزی، از خورشت‌های اصیل، کباب و ماهی تازه و آش و سوپ‌های مقوی بهره‌مند شوند.',
    fullProtocol:
      'Splits weekly meal provisioning into two fresh batches to guarantee food safety and flavor quality. Includes full menu customization and transparent supplier invoicing.',
    fullProtocolFa:
      'برای تضمین تازگی و ایمنی غذایی، هیچ غذایی برای یک هفته کامل یکجا ارسال نمی‌شود؛ بلکه در دو نوبت مجزا (ابتدا و میانه هفته) پخت تازه انجام شده و با هماهنگی قبلی تحویل می‌گردد.',
    deliverables: [
      '2 fresh deliveries per week covering 7 days of varied lunches & light dinners',
      'Pre-approved weekly menu sheet shared with both payer and recipient',
      'Clear substitution & pause/reschedule rules if your parent’s plans change',
    ],
    deliverablesFa: [
      '۲ نوبت ارسال تازه در هفته (شنبه و سه‌شنبه) شامل ۱۴ وعده متنوع ناهار و شام',
      'ارسال برنامه منوی هفتگی پیش از پخت برای تایید شما و والدین گرامی',
      'امکان تغییر، جابجایی روز یا توقف موقت ارسال در صورت تغییر برنامه والدین',
    ],
    exclusions: [
      'Auto-renewing locked subscriptions without explicit customer reorder confirmation',
      'Unverified third-party catering without food-safety traceability',
    ],
    exclusionsFa: [
      'تمدید خودکار و اجباری بدون تایید مجدد شما پس از پایان دوره',
      'استفاده از کترینگ‌های فاقد کد رهگیری بهداشتی',
    ],
    executionSteps: [
      'Step 1: Approve the 7-day rotating menu and dietary notes.',
      'Step 2: Batch 1 delivered Saturday morning; Batch 2 delivered Tuesday morning.',
      'Step 3: Itemized reconciliation and completion report after each delivery.',
    ],
    executionStepsFa: [
      'مرحله ۱: انتخاب و تایید منوی متنوع ۷ روزه متناسب با ذائقه والدین',
      'مرحله ۲: تحویل نوبت اول در روز شنبه و نوبت دوم در روز سه‌شنبه با زنجیره دمایی استاندارد',
      'مرحله ۳: ارسال گزارش تحویل و فاکتور شفاف پس از هر نوبت به شما',
    ],
    specialistTeam: 'Asa Khoraak Menu Coordinator + Vetted Delivery Steward',
    specialistTeamFa: 'مسئول برنامه‌ریزی آسا خوراک + مامور تحویل اختصاصی',
    materialsUsed: '2-Batch Freshness Protocol · Printed Persian Menu Card · Thermal Bags',
    materialsUsedFa: 'پروتکل تازگی ۲ نوبته · کارت منوی چاپی با خط درشت برای سالمند · باکس ایزوله',
    duration: '7-Day Coverage (2 Deliveries)',
    durationFa: 'برنامه ۷ روزه (طی ۲ نوبت ارسال تازه)',
    leadTime: '48h Advance Booking',
    leadTimeFa: 'رزرو از ۴۸ ساعت قبل',
    price: 42,
    billingUnit: 'weekly coordination fee (+ pass-through meal package cost)',
    billingUnitFa: 'کارمزد هماهنگی هفتگی (+ هزینه بسته‌های غذایی طبق فاکتور)',
    image: BRAND_IMAGES.marketHarvest,
    featuredMetric: 'Two Fresh Deliveries Weekly · Large-Print Menu for Seniors',
    featuredMetricFa: 'ارسال دو مرحله‌ای برای حفظ تازگی · همراه با راهنمای چاپی خوانا',
  },
  {
    id: 'asa-k-03',
    indexNumber: '07',
    title: 'Asa Khoraak — Bulk & Family Gathering Meal Package',
    titleFa: 'آسا خوراک — پکیج غذایی مهمانی خانواده و دورهمی در منزل والدین',
    department: 'Asa Khoraak',
    departmentFa: 'آسا خوراک (بسته‌های غذایی و برنامه روزانه)',
    shortDescription:
      'When siblings or grandchildren visit your parents in Tehran, ensure your parents don’t spend the day exhausted in the kitchen. We deliver a complete multi-dish family feast from top authorized Tehran kitchens.',
    shortDescriptionFa:
      'وقتی اعضای فامیل یا نوه‌ها به دیدار والدین شما در تهران می‌روند، نگذارید والدینتان ساعت‌ها در آشپزخانه خسته شوند. ما یک پکیج کامل و مجلل از غذاهای اصیل ایرانی، پیش‌غذا، سالاد و دسر را آماده سرو تحویل می‌دهیم.',
    fullProtocol:
      'Covers bulk and family-size meal packages under Asa Khoraak. Delivered hot in insulated chaffing boxes 45 minutes before guests arrive, with itemized restaurant/catering invoice reconciliation.',
    fullProtocolFa:
      'این سرویس از زیرمجموعه «آسا خوراک» ویژه دورهمی‌های خانوادگی است تا والدین شما بدون زحمت پخت‌وپز، میزبان فرزندان و نوه‌ها باشند. تمامی غذاها ۴۵ دقیقه پیش از حضور میهمانان در باکس‌های گرم تحویل می‌شود.',
    deliverables: [
      'Complete family meal package for 6 to 12 guests (3 main courses, saffron rice, appetizers & desserts)',
      'Scheduled hot thermal delivery and optional table setup assistance',
      'Transparent supplier receipt + delivery confirmation sent abroad',
    ],
    deliverablesFa: [
      'پکیج کامل ضیافت خانوادگی برای ۶ تا ۱۲ نفر (۳ نوع غذای اصلی، چلوی زعفرانی، پیش‌غذا و دسر)',
      'تحویل گرم در ساعت دقیق توافق‌شده و کمک در چیدمان اولیه روی میز در صورت درخواست',
      'ارسال فاکتور رسمی مجموعه غذایی طرف قرارداد به همراه تاییدیه تحویل برای شما',
    ],
    exclusions: [
      'Unlicensed home catering or alcoholic beverage procurement',
    ],
    exclusionsFa: [
      'سفارش از مراکز فاقد مجوز رسمی بهداشتی',
    ],
    executionSteps: [
      'Step 1: Choose guest count, menu selection, and delivery time.',
      'Step 2: Quality & temperature verification at the authorized supplier kitchen.',
      'Step 3: Punctual delivery to your parent’s residence + receipt & update.',
    ],
    executionStepsFa: [
      'مرحله ۱: تعیین تعداد میهمانان، انتخاب منو و ساعت دقیق حضور در منزل والدین',
      'مرحله ۲: نظارت بر کیفیت، بسته‌بندی و دمای غذا در آشپزخانه مبدا',
      'مرحله ۳: تحویل به‌موقع درب منزل والدین و ارسال گزارش و فاکتور برای شما',
    ],
    specialistTeam: 'Asa Khoraak Logistics Lead + Thermal Courier',
    specialistTeamFa: 'مسئول هماهنگی آسا خوراک + سفیر حمل ویژه باکس گرم',
    materialsUsed: 'Insulated Thermal Boxes · Tamper-Evident Seals · Supplier Invoice',
    materialsUsedFa: 'باکس‌های حفظ دمای غذا · پلمپ بهداشتی · فاکتور رسمی تامین‌کننده',
    duration: 'Single Event Delivery',
    durationFa: 'ارسال ویژه روز مهمانی',
    leadTime: '48h Advance Booking',
    leadTimeFa: 'رزرو از ۴۸ ساعت قبل',
    price: 32,
    billingUnit: 'coordination & thermal delivery fee (+ meal invoice)',
    billingUnitFa: 'کارمزد هماهنگی و حمل ویژه (+ فاکتور رسمی غذا)',
    image: BRAND_IMAGES.serviceConcierge,
    featuredMetric: 'Let your parents enjoy family visits without kitchen exhaustion',
    featuredMetricFa: 'میزبانی راحت والدین از فرزندان و نوه‌ها بدون خستگی آشپزی',
  },
  {
    id: 'asa-k-04',
    indexNumber: '08',
    title: 'Asa Khoraak — Restorative Soup, Broth & Convalescence Nutrition Pack',
    titleFa: 'آسا خوراک — بسته تقویتی سوپ‌های تازه، عصاره قلم و دمنوش‌های دوره نقاهت',
    department: 'Asa Khoraak',
    departmentFa: 'آسا خوراک (بسته‌های غذایی و برنامه روزانه)',
    shortDescription:
      'When a parent in Tehran has a seasonal cold, dental procedure, or low appetite, send a comforting package of slow-simmered broths, soft digestible soups, fresh citrus, and herbal infusions.',
    shortDescriptionFa:
      'وقتی والدین در تهران دوران نقاهت، سرماخوردگی فصلی یا کم‌اشتهایی را می‌گذرانند، بسته‌ای مقوی شامل سوپ‌های تازه، عصاره قلم کم‌چرب، مرکبات تازه و دمنوش‌های طبیعی برایشان ارسال کنید.',
    fullProtocol:
      'Strictly non-clinical nutritional comfort food prepared by vetted kitchens, paired with fresh orchard fruits and delivered with gentle doorstep care.',
    fullProtocolFa:
      'این بسته جایگزین دارو یا درمان پزشکی نیست، اما دقیقاً همان مراقبت تغذیه‌ای گرم و دلگرم‌کننده‌ای است که یک فرزند در روزهای نقاهت برای پدر و مادرش تدارک می‌بیند.',
    deliverables: [
      '4 glass jars of fresh slow-simmered soups & broths + fresh vitamin-C citrus basket',
      'Natural herbal tea infusions (chamomile, borage, linden blossom) & raw honey',
      'Delivery confirmation and factual Family Update',
    ],
    deliverablesFa: [
      '۴ ظرف شیشه‌ای سوپ تازه روز و عصاره قلم کم‌چرب + سبد پرتقال، لیموشیرین و سیب تازه',
      'مجموعه دمنوش‌های گیاهی آرامش‌بخش (بابونه، گل‌گاوزبان، به‌لیمو) و عسل طبیعی',
      'تحویل محترمانه درب منزل و ارسال گزارش وضعیت تحویل به شما',
    ],
    exclusions: [
      'Prescription drugs, IV fluids, or medical nursing interventions',
    ],
    exclusionsFa: [
      'تحویل داروهای نسخه‌ای، تزریقات یا هرگونه مداخله پرستاری و درمانی',
    ],
    executionSteps: [
      'Step 1: Note any dietary sensitivities (e.g., low salt, soft texture).',
      'Step 2: Morning preparation of fresh soups and fruit selection.',
      'Step 3: Same-day delivery to your parent’s residence with confirmation.',
    ],
    executionStepsFa: [
      'مرحله ۱: ثبت ملاحظات تغذیه‌ای والدین (مانند بدون نمک، بافت نرم یا بدون شکر)',
      'مرحله ۲: تهیه صبحگاهی سوپ‌های تازه و دست‌چین میوه‌های فصل',
      'مرحله ۳: ارسال همان‌روز به منزل والدین و اطلاع‌رسانی به شما',
    ],
    specialistTeam: 'Asa Khoraak Care Courier + Partner Kitchen',
    specialistTeamFa: 'سفیر تحویل آسا خوراک + آشپزخانه سلامت طرف قرارداد',
    materialsUsed: 'Borosilicate Glass Jars · Fresh Citrus Crate · Ingredient Label',
    materialsUsedFa: 'ظروف شیشه‌ای بهداشتی · سبد میوه تازه · برچسب دقیق مواد تشکیل‌دهنده',
    duration: 'Same-Day Dispatch',
    durationFa: 'ارسال ویژه همان‌روز',
    leadTime: '12h–24h Advance Notice',
    leadTimeFa: 'ثبت از ۱۲ تا ۲۴ ساعت قبل',
    price: 22,
    billingUnit: 'service fee (+ pass-through package receipt)',
    billingUnitFa: 'کارمزد خدمت (+ هزینه اقلام طبق فاکتور)',
    image: BRAND_IMAGES.marketPantry,
    featuredMetric: 'Immediate warmth and nourishment when a parent feels unwell',
    featuredMetricFa: 'دلگرمی و تقویت فوری والدین در روزهای نقاهت یا سرماخوردگی',
  },

  // 3. ASA PEZESHK (آسا پزشک)
  {
    id: 'asa-p-01',
    indexNumber: '09',
    title: 'Asa Pezeshk — Non-Clinical Medical Appointment Accompaniment & Family Update',
    titleFa: 'آسا پزشک — همراهی غیربالینی والدین به مطب و مراکز درمانی + گزارش مکتوب خانواده',
    department: 'Asa Pezeshk',
    departmentFa: 'آسا پزشک (هماهنگی و همراهی پزشکی)',
    shortDescription:
      'Practical, non-clinical accompaniment for a parent’s doctor, clinic, or diagnostic visit in Tehran: door-to-door transport coordination, registration & waiting-room support, and an authorized factual Family Update.',
    shortDescriptionFa:
      'همراهی عملی و غیربالینی والدین برای مراجعه به پزشک، کلینیک یا مراکز تصویربرداری در تهران؛ شامل هماهنگی خودروی مناسب از درب منزل، انجام امور پذیرش و نوبت، حضور در سالن انتظار و ارسال گزارش واقعی و مستند (Family Update) به شما.',
    fullProtocol:
      'Core Asa Pezeshk offering from the Business Plan ($55 base visit assumption). Asa strictly maintains the non-clinical boundary: our companion supports logistics, registration, transport, and observable facts, and never diagnoses, treats, interprets lab results, or administers medication.',
    fullProtocolFa:
      'شاخص‌ترین خدمت «آسا پزشک» بر اساس طرح کسب‌وکار آسا (با کارمزد پایه ۵۵ دلار برای بازه ۳ ساعته). مرز حرفه‌ای ما کاملاً شفاف است: همراه آسا تمامی امور اجرایی، تردد، پذیرش، تشکیل پرونده و همراهی محترمانه را انجام می‌دهد اما هرگز در امور درمانی، تشخیص پزشکی، تفسیر آزمایش یا تجویز دارو دخالت نمی‌کند.',
    deliverables: [
      'Defined 3-hour accompaniment window from parent’s doorstep to clinic and back home',
      'Clinic check-in, registration paperwork assistance, and waiting-room companionship',
      'Structured, consent-based factual Family Update sent immediately after the visit',
    ],
    deliverablesFa: [
      '۳ ساعت همراهی اختصاصی از درب منزل تا مطب/کلینیک و بازگشت ایمن به منزل',
      'انجام امور پذیرش، ثبت‌نام، پرداخت قبوض کلینیک (طبق رویه مجاز) و همراهی در سالن انتظار',
      'ارسال «گزارش استاندارد خانواده» (Family Update) بر اساس مشاهدات عینی و با رضایت والدین',
    ],
    exclusions: [
      'Medical diagnosis, clinical decision-making, or lab/imaging interpretation',
      'Medication administration, injections, physical lifting/transfers, or emergency ambulance care',
    ],
    exclusionsFa: [
      'هرگونه تشخیص پزشکی، تصمیم‌گیری درمانی یا تفسیر نتایج آزمایش و تصویربرداری',
      'تزریقات، دادن دارو، جابجایی فیزیکی بیمار (بلند کردن) یا خدمات اورژانس پزشکی',
    ],
    executionSteps: [
      'Step 1: Confirm appointment details, recipient consent, emergency contact, and mobility needs.',
      'Step 2: Vetted companion meets parent at home with ID, coordinates transport, and assists at clinic.',
      'Step 3: Safe return home + delivery of factual Family Update without medical interpretation.',
    ],
    executionStepsFa: [
      'مرحله ۱: ثبت مشخصات نوبت پزشک، دریافت رضایت والدین، ثبت مخاطب اضطراری و بررسی شرایط حرکتی',
      'مرحله ۲: حضور همراه با کارت شناسایی در منزل، هماهنگی خودرو و انجام امور پذیرش در مرکز درمانی',
      'مرحله ۳: بازگشت ایمن به منزل و ارسال گزارش دقیق و غیربالینی (Family Update) برای فرزند',
    ],
    specialistTeam: '1 Safeguarding-Certified Asa Pezeshk Companion + Ops Coordinator',
    specialistTeamFa: '۱ همراه آموزش‌دیده آسا پزشک + هماهنگ‌کننده مرکز عملیات تهران',
    materialsUsed: 'Official ID Badge · Consent & Escalation Checklist · Factual Family Update Form',
    materialsUsedFa: 'کارت شناسایی رسمی · چک‌لیست ایمنی و رضایت‌نامه · فرم استاندارد گزارش خانواده',
    duration: '3-Hour Defined Visit Window',
    durationFa: 'بازه استاندارد ۳ ساعته (+ تعرفه ساعت اضافه شفاف)',
    leadTime: '24h–48h Advance Booking',
    leadTimeFa: 'رزرو از ۲۴ تا ۴۸ ساعت قبل',
    price: 55,
    billingUnit: 'per 3-hour visit (+ $15/extra hour & transport receipt)',
    billingUnitFa: 'هر визیت ۳ ساعته (+ ۱۵ دلار ساعت اضافه و کرایه خودرو طبق رسید)',
    image: BRAND_IMAGES.serviceConcierge,
    featuredMetric: 'Flagship Asa Pezeshk Service · Strict Non-Clinical Boundary',
    featuredMetricFa: 'سرویس اصلی آسا پزشک · همراهی مطمئن با رعایت کامل مرز غیربالینی',
  },
  {
    id: 'asa-p-02',
    indexNumber: '10',
    title: 'Asa Pezeshk — Specialist Appointment Booking, Reminders & Logistics Coordination',
    titleFa: 'آسا پزشک — نوبت‌گیری از پزشکان متخصص تهران، یادآوری و هماهنگی قبل از ویزیت',
    department: 'Asa Pezeshk',
    departmentFa: 'آسا پزشک (هماهنگی و همراهی پزشکی)',
    shortDescription:
      'Struggling to book a specialist clinic or imaging center in Tehran from abroad due to time zones or local phone systems? We handle scheduling, pre-visit document checklists, and polite reminders for your parent.',
    shortDescriptionFa:
      'اگر به دلیل اختلاف ساعت یا سیستم‌های تلفنی مطب‌ها در ایران، گرفتن نوبت از پزشکان متخصص یا مراکز تصویربرداری تهران برایتان دشوار است، تیم آسا پزشک نوبت‌گیری، بررسی مدارک لازم قبل از ویزیت و یادآوری محترمانه به والدین را انجام می‌دهد.',
    fullProtocol:
      'Covers the coordination and follow-up pillar of Asa Pezeshk. We contact the requested clinic or diagnostic center, secure the earliest suitable time slot aligned with your parent’s routine, and organize transport or accompaniment if needed.',
    fullProtocolFa:
      'این سرویس بخش هماهنگی و پیگیری «آسا پزشک» را پوشش می‌دهد. ما با مطب پزشک یا مرکز تصویربرداری مورد نظر شما تماس گرفته (یا در صورت نیاز مراجعه حضوری جهت نوبت‌گیری انجام داده)، بهترین ساعت متناسب با برنامه استراحت والدین را رزرو می‌کنیم.',
    deliverables: [
      'Confirmed appointment booking with the requested Tehran specialist or imaging center',
      'Pre-visit preparation checklist (previous records, referral slips, fasting rules stated by clinic)',
      'Polite 24-hour and 2-hour phone reminders to your parent + confirmation to you',
    ],
    deliverablesFa: [
      'اخذ نوبت قطعی از پزشک متخصص، آزمایشگاه یا مرکز تصویربرداری مورد نظر شما در تهران',
      'اطلاع‌رسانی چک‌لیست مدارک لازم (آزمایش‌های قبلی، دفترچه/کارت ملی و نکات اعلامی مطب)',
      'یادآوری تلفنی محترمانه ۲۴ ساعت و ۲ ساعت قبل از نوبت به والدین و ارسال تاییدیه به شما',
    ],
    exclusions: [
      'Choosing or recommending which doctor or medical treatment your parent should pursue',
      'Emergency hospital admission coordination',
    ],
    exclusionsFa: [
      'توصیه یا انتخاب نوع درمان و تشخیص پزشکی (انتخاب پزشک با خانواده است)',
      'هماهنگی بستری اورژانس بیمارستانی',
    ],
    executionSteps: [
      'Step 1: Share the requested doctor/clinic name and preferred days/times.',
      'Step 2: Asa coordinator secures the slot and confirms clinic requirements.',
      'Step 3: Written appointment card & reminder schedule shared with family.',
    ],
    executionStepsFa: [
      'مرحله ۱: اعلام نام پزشک یا کلینیک مورد نظر و روزهای مناسب برای والدین شما',
      'مرحله ۲: پیگیری تلفنی یا حضوری توسط هماهنگ‌کننده آسا پزشک و ثبت نوبت قطعی',
      'مرحله ۳: ارسال کارت دیجیتال نوبت و زمان‌بندی یادآوری برای شما و والدین گرامی',
    ],
    specialistTeam: '1 Asa Pezeshk Scheduling & Follow-Up Coordinator',
    specialistTeamFa: '۱ کارشناس هماهنگی نوبت و پیگیری آسا پزشک',
    materialsUsed: 'Written Appointment Confirmation · Pre-Visit Document Checklist',
    materialsUsedFa: 'برگه تاییدیه نوبت · چک‌لیست مدارک همراه برای روز ویزیت',
    duration: 'Full Booking & Reminder Cycle',
    durationFa: 'چرخه کامل نوبت‌گیری تا یادآوری روز ویزیت',
    leadTime: '24h Turnaround',
    leadTimeFa: 'پیگیری ظرف ۲۴ ساعت',
    price: 19,
    billingUnit: 'per coordinated appointment (+ clinic booking deposit if any)',
    billingUnitFa: 'هر نوبت هماهنگ‌شده (+ بیعانه رسمی مطب در صورت وجود)',
    image: BRAND_IMAGES.marketSanctuary,
    featuredMetric: 'Solves time-zone & local clinic phone barriers for diaspora families',
    featuredMetricFa: 'رفع چالش اختلاف ساعت و دشواری نوبت‌گیری تلفنی از خارج از کشور',
  },
  {
    id: 'asa-p-03',
    indexNumber: '11',
    title: 'Asa Pezeshk — Diagnostic Lab / Imaging Paperwork & Sealed Report Pickup',
    titleFa: 'آسا پزشک — پیگیری اداری جواب آزمایش و تصویربرداری و تحویل پاکت پلمپ‌شده',
    department: 'Asa Pezeshk',
    departmentFa: 'آسا پزشک (هماهنگی و همراهی پزشکی)',
    shortDescription:
      'Save your parent an unnecessary second trip across Tehran traffic just to collect printed MRI/CT films, pathology slides, or stamped insurance paperwork from a diagnostic center.',
    shortDescriptionFa:
      'مانع از تردد مجدد و خسته‌کننده والدین در ترافیک تهران صرفاً برای دریافت جواب چاپی ام‌آر‌آی، سی‌تی‌اسکن یا مدارک مهرشده بیمه شوید. همراه آسا با مجوز کتبی، پاکت پلمپ‌شده را دریافت و تحویل می‌دهد.',
    fullProtocol:
      'Operates under strict privacy and consent controls: Asa collects sealed envelopes or official receipts only with explicit written authorization from the recipient, delivers them unopened to the recipient or designated clinic, and never reads or interprets medical results.',
    fullProtocolFa:
      'با رعایت کامل حریم خصوصی و رازداری پزشکی: نماینده آسا صرفاً با برگشت قبض رسمی و رضایت‌نامه والدین، پاکت پلمپ‌شده نتایج را از مرکز تشخیصی تحویل گرفته و بدون باز کردن یا مطالعه محتوا، مستقیماً به والدین یا مطب پزشک تعیین‌شده تحویل می‌دهد.',
    deliverables: [
      'Authorized pickup of sealed diagnostic envelopes, imaging CDs/films, or stamped invoices',
      'Direct delivery to your parent’s residence or their doctor’s reception desk',
      'Chain-of-custody timestamp confirmation sent to family',
    ],
    deliverablesFa: [
      'دریافت مجاز پاکت پلمپ‌شده آزمایشگاه، سی‌دی/فیلم تصویربرداری یا فاکتورهای ممهور بیمه',
      'تحویل مستقیم درب منزل والدین یا تحویل به پذیرش مطب پزشک معالج طبق دستور شما',
      'ثبت ساعت دقیق تحویل گرفتن و تحویل دادن به همراه رسید',
    ],
    exclusions: [
      'Opening medical envelopes, photographing private clinical reports without consent, or interpreting results',
    ],
    exclusionsFa: [
      'باز کردن پاکت مدارک پزشکی، مطالعه یا تفسیر نتایج آزمایشگاهی',
    ],
    executionSteps: [
      'Step 1: Provide claim slip details and recipient authorization.',
      'Step 2: Vetted courier collects sealed package from the Tehran lab/center.',
      'Step 3: Unopened handoff to recipient/clinic with completion confirmation.',
    ],
    executionStepsFa: [
      'مرحله ۱: ثبت تصویر قبض پذیرش مرکز تشخیصی و تاییدیه رضایت والدین',
      'مرحله ۲: مراجعه نماینده احراز هویت‌شده آسا به آزمایشگاه یا مرکز تصویربرداری',
      'مرحله ۳: تحویل پاکت پلمپ‌شده به والدین و ارسال پیام تایید انجام کار به شما',
    ],
    specialistTeam: '1 Privacy-Trained Asa Pezeshk Courier',
    specialistTeamFa: '۱ نماینده آموزش‌دیده در اصول حفاظت از حریم خصوصی و مدارک',
    materialsUsed: 'Sealed Privacy Pouch · Signed Handoff Log',
    materialsUsedFa: 'کیف محافظ مدارک · رسید تحویل رسمی',
    duration: '2 Hours Dispatch',
    durationFa: 'بازه ۲ ساعته در تهران',
    leadTime: 'Same-Day or Next-Day',
    leadTimeFa: 'همان‌روز یا روز بعد',
    price: 24,
    billingUnit: 'per pickup & delivery run (+ transport pass-through)',
    billingUnitFa: 'هر نوبت پیگیری و تحویل (+ هزینه ایاب‌وذهاب طبق رسید)',
    image: BRAND_IMAGES.marketSanctuary,
    featuredMetric: 'Strict Privacy Protocol · Unopened Sealed Handoff',
    featuredMetricFa: 'حفاظت صددرصدی از حریم خصوصی · تحویل پاکت کاملاً پلمپ‌شده',
  },

  // 4. COMING SOON (در دست راه‌اندازی — مطابق دستورالعمل گزارش آسا)
  {
    id: 'asa-cs-01',
    indexNumber: '12',
    title: 'Coming Soon — Asa Social Walks, Cultural Outings & Multi-City Expansion',
    titleFa: 'در دست راه‌اندازی — پیاده‌روی، همنشینی فرهنگی و گسترش به سایر شهرهای ایران',
    department: 'Coming Soon',
    departmentFa: 'در دست راه‌اندازی (فازهای بعدی)',
    shortDescription:
      'In accordance with the Asa Launch Playbook, recurring social companionship walks, cultural outings, and expansion beyond our initial Tehran pilot zone will open only after our first 20–30 paid pilot orders pass all quality and safeguarding gates.',
    shortDescriptionFa:
      'مطابق نقشه راه رسمی راه‌اندازی آسا (Asa Launch Playbook)، خدمات همنشینی اجتماعی، پیاده‌روی در پارک، برنامه‌های فرهنگی و پوشش شهرهای خارج از تهران پس از تکمیل موفقیت‌آمیز ۲۰ تا ۳۰ سفارش اول پایلوت تهران و تایید کامل استانداردهای ایمنی فعال خواهند شد.',
    fullProtocol:
      'We never advertise unstaffed or unverified services as immediately bookable. You may join the priority waitlist for Phase 2 services below so our coordinator notifies you as soon as your requested neighborhood or recurring social visit tier is cleared.',
    fullProtocolFa:
      'اصل بنیادین برند آسا صداقت با خانواده‌هاست؛ ما هیچ خدمتی را پیش از تکمیل آموزش نیروها، پوشش بیمه‌ای و تایید پروتکل‌های ایمنی به عنوان «فعال» نمی‌فروشیم. می‌توانید نام خود را در فهرست اولویت فاز دوم ثبت نمایید.',
    deliverables: [
      'Scheduled park walks, museum/bookstore outings & companionship (Phase 2)',
      'Prepaid 3-visit and monthly recurring family support bundles (Phase 2)',
      'Expansion to Shiraz, Isfahan, Mashhad & Karaj after Tehran pilot validation',
    ],
    deliverablesFa: [
      'همنشینی، پیاده‌روی در پارک و همراهی در برنامه‌های فرهنگی و کتاب‌خوانی (فاز دوم)',
      'بسته‌های اشتراک ماهانه و چندجلسه‌ای پس از اثبات کیفیت در فاز پایلوت',
      'گسترش پوشش جغرافیایی به کرج، شیراز، اصفهان و مشهد پس از تثبیت عملیات تهران',
    ],
    exclusions: [
      'Not bookable for immediate dispatch during Phase 1 Tehran Pilot',
    ],
    exclusionsFa: [
      'عدم امکان رزرو فوری در فاز اول پایلوت تهران (ثبت در لیست انتظار اولویت‌دار)',
    ],
    executionSteps: [
      'Gate 1: Complete 20–30 Tehran pilot orders with >80% on-time score & zero incidents.',
      'Gate 2: Complete specialized safeguarding & insurance review for extended home visits.',
      'Gate 3: Invite waitlisted diaspora families in order of registration.',
    ],
    executionStepsFa: [
      'گیت ۱: تکمیل موفقیت‌آمیز ۲۰ تا ۳۰ سفارش اول در زون پایلوت تهران با رضایت کامل',
      'گیت ۲: تکمیل پوشش‌های بیمه‌ای و آموزش‌های تخصصی همنشینی سالمندان',
      'گیت ۳: دعوت از خانواده‌های ثبت‌نام‌شده در لیست اولویت',
    ],
    specialistTeam: 'Asa Phase-2 Expansion & Safeguarding Committee',
    specialistTeamFa: 'کمیته توسعه و کنترل کیفیت فاز دوم آسا',
    materialsUsed: 'Launch Playbook Gate Verification · Waitlist Priority Registration',
    materialsUsedFa: 'ارزیابی گیت‌های راه‌اندازی · ثبت در فهرست انتظار اولویت‌دار',
    duration: 'Phase 2 Roadmap',
    durationFa: 'نقشه راه فاز دوم (۹۰ روز آینده)',
    leadTime: 'Waitlist Registration Open',
    leadTimeFa: 'ثبت درخواست در لیست اولویت',
    price: 0,
    billingUnit: 'priority waitlist registration (no charge today)',
    billingUnitFa: 'ثبت رایگان در لیست انتظار اولویت‌دار',
    image: BRAND_IMAGES.heroEstate,
    featuredMetric: 'Transparent Roadmap · Join Pilot Waitlist',
    featuredMetricFa: 'شفافیت کامل نقشه راه · ثبت در لیست انتظار فاز دوم',
    isComingSoon: true,
  },
];

export const GROCERY_CATEGORIES: {
  name: GroceryCategory;
  nameFa: string;
  aisleCode: string;
  aisleCodeFa: string;
  description: string;
  descriptionFa: string;
}[] = [
  {
    name: 'All Provisions',
    nameFa: 'همه اقلام آسا خوراک و سوپرمارکت (۲۴ قلم)',
    aisleCode: 'Aisle 00',
    aisleCodeFa: 'همه بخش‌ها',
    description: 'All packaged meals, fresh Tehran produce, bakery & dairy, pantry staples, and senior home essentials (pass-through pricing).',
    descriptionFa: 'مجموعه کامل بسته‌های غذایی آماده «آسا خوراک» و اقلام سوپرمارکتی منتخب برای منزل والدین در تهران (با قیمت مصوب فاکتور).',
  },
  {
    name: 'Asa Khoraak Prepared Meals',
    nameFa: 'بسته‌های غذایی آماده (آسا خوراک)',
    aisleCode: 'Aisle 01',
    aisleCodeFa: 'غرفه ۰۱',
    description: 'Prepared low-sodium Persian stews, grilled saffron poultry, and restorative soups from authorized Tehran kitchens.',
    descriptionFa: 'غذاهای پخته‌شده، کم‌نمک و سالم ایرانی از آشپزخانه‌های مجاز تهران با برچسب تاریخ، ترکیبات و راهنمای گرم‌کردن.',
  },
  {
    name: 'Fresh Tehran Orchard Produce',
    nameFa: 'میوه و سبزیجات دست‌چین روز',
    aisleCode: 'Aisle 02',
    aisleCodeFa: 'غرفه ۰۲',
    description: 'Hand-selected seasonal fruits, washed herbs (Sabzi Khordan), and crisp salad greens for your parent’s refrigerator.',
    descriptionFa: 'میوه‌های دست‌چین فصل، سبزی خوردن پاک‌شده و ضدعفونی‌شده و صیفی‌جات تازه از بهترین میوه‌فروشی‌های محلی تهران.',
  },
  {
    name: 'Sangak Bakery & Traditional Dairy',
    nameFa: 'نان سنگک داغ، لبنیات و صبحانه',
    aisleCode: 'Aisle 03',
    aisleCodeFa: 'غرفه ۰۳',
    description: 'Pebble-baked whole-wheat Sangak bread, probiotic yogurt, Lighvan cheese, pasture butter, and local eggs.',
    descriptionFa: 'نان سنگک سبوس‌دار تازه، پنیر لیقوان تبریز، ماست پروبیوتیک کم‌چرب، کره محلی، گردو و تخم‌مرغ تازه برای صبحانه والدین.',
  },
  {
    name: 'Persian Pantry & Healthy Oils',
    nameFa: 'خواربار اصیل، برنج ایرانی و روغن سالم',
    aisleCode: 'Aisle 04',
    aisleCodeFa: 'غرفه ۰۴',
    description: 'Aged Hashemi northern rice, Khorasan saffron, extra-virgin olive oil, raw mountain honey, and herbal distillates.',
    descriptionFa: 'برنج هاشمی درجه یک شمال، زعفران سرگل قائنات، روغن زیتون فرابکر، عسل طبیعی کوهستان و عرقیات گیاهی کاشان.',
  },
  {
    name: 'Fresh Butcher & Daily Catch',
    nameFa: 'قصابی و پروتئین تازه روز',
    aisleCode: 'Aisle 05',
    aisleCodeFa: 'غرفه ۰۵',
    description: 'Freshly trimmed lamb and veal stew cuts, antibiotic-free chicken fillets, and deboned northern trout/salmon.',
    descriptionFa: 'گوشت گوسفندی و گوساله تازه خورشتی، فیله مرغ بدون آنتی‌بیوتیک و ماهی قزل‌آلا/سالمون تازه پاک‌شده و آماده پخت.',
  },
  {
    name: 'Home Comfort & Senior Care Essentials',
    nameFa: 'ملزومات بهداشتی و آسایش منزل والدین',
    aisleCode: 'Aisle 06',
    aisleCodeFa: 'غرفه ۰۶',
    description: 'Hypoallergenic laundry & dish care, soft cellulose tissues, skin-soothing balms, and non-slip home comfort items.',
    descriptionFa: 'شوینده‌های ضدحساسیت، دستمال کاغذی لطیف، کرم و بالم محافظ پوست سالمند و ملزومات مصرفی ضروری منزل در تهران.',
  },
];

export const GROCERY_PRODUCTS: GroceryProduct[] = [
  // 1. Asa Khoraak Prepared Meals
  {
    id: 'prd-01',
    name: 'Asa Khoraak — Low-Sodium Ghormeh Sabzi & Saffron Rice (2 Portions)',
    nameFa: 'آسا خوراک — خورشت قورمه‌سبزی کم‌چرب خانگی با چلوی زعفرانی (۲ پرس)',
    category: 'Asa Khoraak Prepared Meals',
    categoryFa: 'بسته‌های غذایی آماده (آسا خوراک)',
    origin: 'Authorized Tehran Partner Kitchen',
    originFa: 'آشپزخانه مجاز طرف قرارداد آسا در تهران',
    unitSize: '2 Sealed Meal Trays (900g Total)',
    unitSizeFa: '۲ ظرف پلمپ‌شده بهداشتی (مجموعاً ۹۰۰ گرم)',
    price: 14.5,
    shortDescription: 'Slow-cooked with fresh aromatic herbs, tender lamb cubes, dried Persian limes, and aged Hashemi rice using extra-virgin olive oil.',
    shortDescriptionFa: 'پخته‌شده با سبزی تازه سرخ‌شده با روغن زیتون، گوشت گوسفندی لخم و برنج هاشمی ایرانی؛ کم‌نمک و بسیار خوش‌هضم.',
    provenanceNote: 'Prepared same-morning under hygiene license; includes full allergen & sodium label.',
    provenanceNoteFa: 'پخت همان صبح در آشپزخانه دارای پروانه بهداشت؛ همراه با برچسب تاریخ، میزان نمک و راهنمای گرم‌کردن.',
    dietaryMeta: 'Low-Sodium · Zero Seed Oils · Pass-Through Price',
    dietaryMetaFa: 'کم‌نمک · بدون روغن صنعتی · قیمت مصوب تامین‌کننده',
    harvestAvailability: 'Fresh Daily Batch · Delivery Window 11:30–14:00',
    harvestAvailabilityFa: 'پخت روزانه · تحویل در بازه ۱۱:۳۰ تا ۱۴:۰۰',
    image: BRAND_IMAGES.heroEstate,
    isSignatureSelection: true,
  },
  {
    id: 'prd-02',
    name: 'Asa Khoraak — Saffron Joojeh Kabab Fillet & Grilled Tomatoes (2 Portions)',
    nameFa: 'آسا خوراک — جوجه‌کباب زعفرانی بدون استخوان با گوجه کبابی و برنج (۲ پرس)',
    category: 'Asa Khoraak Prepared Meals',
    categoryFa: 'بسته‌های غذایی آماده (آسا خوراک)',
    origin: 'Authorized Tehran Partner Kitchen',
    originFa: 'آشپزخانه مجاز طرف قرارداد آسا در تهران',
    unitSize: '2 Sealed Meal Trays (850g Total)',
    unitSizeFa: '۲ پرس کامل در ظروف مایکروویوی بهداشتی',
    price: 15.0,
    shortDescription: 'Tender antibiotic-free chicken breast marinated in Khorasan saffron, fresh lemon juice, and yogurt, grilled over flame.',
    shortDescriptionFa: 'سینه مرغ بدون آنتی‌بیوتیک طعم‌دار شده با زعفران قائنات، آبلیمو تازه و ماست؛ نرم، لطیف و بسیار مناسب برای سالمندان.',
    provenanceNote: 'Soft texture ideal for older adults; delivered hot or chilled for easy reheating.',
    provenanceNoteFa: 'بافت بسیار نرم و لطیف مناسب دندان و گوارش سالمندان؛ ارسال گرم یا آماده قرارگیری در یخچال.',
    dietaryMeta: 'High-Protein · Antibiotic-Free Poultry · Mild Spice',
    dietaryMetaFa: 'پروتئین بالا · مرغ بدون آنتی‌بیوتیک · ادویه ملایم',
    harvestAvailability: 'Prepared Daily · Ready for Tehran Dispatch',
    harvestAvailabilityFa: 'پخت تازه روز · آماده ارسال در تهران',
    image: BRAND_IMAGES.serviceConcierge,
    isSignatureSelection: true,
  },
  {
    id: 'prd-03',
    name: 'Asa Khoraak — Restorative Barley, Chicken & Fresh Herb Soup (Family Quart)',
    nameFa: 'آسا خوراک — سوپ جو، مرغ و سبزیجات تازه معطر (ظرف شیشه‌ای ۱ لیتری)',
    category: 'Asa Khoraak Prepared Meals',
    categoryFa: 'بسته‌های غذایی آماده (آسا خوراک)',
    origin: 'Asa Khoraak Wellness Kitchen',
    originFa: 'بخش تغذیه سلامت آسا خوراک',
    unitSize: '1 Liter Borosilicate Glass Jar (3–4 Bowls)',
    unitSizeFa: 'ظرف شیشه‌ای ۱ لیتری (مناسب ۳ تا ۴ وعده شام سبک)',
    price: 9.5,
    shortDescription: 'Light, soothing evening soup simmered with peeled barley, shredded chicken breast, carrots, and fresh parsley.',
    shortDescriptionFa: 'سوپ گرم، مقوی و زود‌هضم با جو پرک، سینه مرغ، هویج تازه و جعفری ساطوری؛ بهترین انتخاب برای شام سبک والدین.',
    provenanceNote: 'Zero bouillon cubes or preservatives; seasoned gently with fresh lemon and turmeric.',
    provenanceNoteFa: 'کاملاً فاقد عصاره‌های صنعتی یا مواد نگهدارنده؛ طعم‌دار شده با زردچوبه و لیموترش تازه.',
    dietaryMeta: 'Easy Digestion · Glass Jar · Low Sodium',
    dietaryMetaFa: 'هضم آسان · ظرف شیشه‌ای · کم‌نمک',
    harvestAvailability: 'Simmered Daily · Available',
    harvestAvailabilityFa: 'پخت تازه روزانه · موجود',
    image: BRAND_IMAGES.marketHarvest,
  },
  {
    id: 'prd-04',
    name: 'Asa Khoraak — Baked Herb Salmon & Steamed Vegetables (2 Portions)',
    nameFa: 'آسا خوراک — فیله ماهی سالمون تنوری با سبزیجات بخارپز (۲ پرس)',
    category: 'Asa Khoraak Prepared Meals',
    categoryFa: 'بسته‌های غذایی آماده (آسا خوراک)',
    origin: 'Authorized Tehran Seafood Kitchen',
    originFa: 'آشپزخانه سلامت طرف قرارداد آسا',
    unitSize: '2 Portions (750g Total, Pin-Bone Removed)',
    unitSizeFa: '۲ پرس کامل کاملاً تیغ‌گیری‌شده (۷۵۰ گرم)',
    price: 18.5,
    shortDescription: 'Heart-healthy omega-3 salmon fillets baked with dill, olive oil, and garlic alongside steamed broccoli and carrots.',
    shortDescriptionFa: 'فیله سالمون تازه غنی از امگا-۳، پخته‌شده در فر با شوید تازه و روغن زیتون به همراه بروکلی و هویج بخارپز.',
    provenanceNote: 'Carefully checked to remove pin-bones for safe senior dining.',
    provenanceNoteFa: 'تیغ‌گیری‌شده با دقت بالا جهت مصرف ایمن و راحت سالمندان.',
    dietaryMeta: 'Heart-Healthy · Diabetic-Friendly · Bone-Free',
    dietaryMetaFa: 'مفید برای قلب · مناسب دیابت · بدون تیغ',
    harvestAvailability: 'Fresh Daily Allocation',
    harvestAvailabilityFa: 'تولید روز · موجود',
    image: BRAND_IMAGES.serviceConcierge,
  },

  // 2. Fresh Tehran Orchard Produce
  {
    id: 'prd-05',
    name: 'Hand-Picked Damavand Golden & Red Apples + Sweet Oranges Basket',
    nameFa: 'سبد میوه دست‌چین دماوند (سیب زرد و قرمز استخوانی و پرتقال شیرین)',
    category: 'Fresh Tehran Orchard Produce',
    categoryFa: 'میوه و سبزیجات دست‌چین روز',
    origin: 'Damavand & North Orchards (Tehran Grade-A)',
    originFa: 'باغات دماوند و شمال (درجه یک دست‌چین)',
    unitSize: '3.5 kg Assorted Fruit Crate',
    unitSizeFa: 'سبد ۳.۵ کیلوگرمی دست‌چین‌شده توسط همراه آسا',
    price: 11.0,
    shortDescription: 'Our companion hand-selects each piece of fruit at a trusted local Tehran greengrocer—no bruised or overripe items.',
    shortDescriptionFa: 'همراه آسا هر عدد میوه را شخصاً با وسواس یک فرزند از بهترین میوه‌فروشی محلی دست‌چین می‌کند تا هیچ میوه لک‌دار یا نامرغوبی وجود نداشته باشد.',
    provenanceNote: 'Pass-through store receipt attached to your Family Update.',
    provenanceNoteFa: 'فاکتور رسمی میوه‌فروشی محلی عیناً ضمیمه گزارش خانواده می‌شود.',
    dietaryMeta: 'Hand-Selected · Grade-A · Official Store Receipt',
    dietaryMetaFa: 'دست‌چین تکی · درجه یک · همراه با فاکتور رسمی',
    harvestAvailability: 'Purchased Fresh on Delivery Morning',
    harvestAvailabilityFa: 'خرید روز در صبح تحویل',
    image: BRAND_IMAGES.marketHarvest,
    isSignatureSelection: true,
  },
  {
    id: 'prd-06',
    name: 'Triple-Washed & Sanitized Fresh Sabzi Khordan (Persian Table Herbs)',
    nameFa: 'سبزی خوردن تازه، پاک‌شده و سه‌بار ضدعفونی‌شده آماده مصرف',
    category: 'Fresh Tehran Orchard Produce',
    categoryFa: 'میوه و سبزیجات دست‌چین روز',
    origin: 'Varamin & Ray Greenhouses',
    originFa: 'مزارع نمونه ورامین و ری',
    unitSize: '2 × 400g Breathable Containers',
    unitSizeFa: '۲ بسته ۴۰۰ گرمی در ظرف تنفس‌پذیر',
    price: 5.5,
    shortDescription: 'Fresh basil, mint, tarragon, radish, and chives—cleaned, washed, and sanitized so your parents don’t have to wash herbs at the sink.',
    shortDescriptionFa: 'ریحان، نعناع، ترخون، تربچه و پیازچه تازه که کاملاً پاک و ضدعفونی شده تا والدین زحمت پاک کردن و شستن سبزی را نداشته باشند.',
    provenanceNote: 'Hygienically washed with food-grade vegetable sanitizer and spin-dried.',
    provenanceNoteFa: 'شستشو و ضدعفونی چهارمرحله‌ای؛ آماده قرار دادن مستقیم سر سفره.',
    dietaryMeta: 'Ready to Eat · Pre-Washed & Sanitized',
    dietaryMetaFa: 'پاک‌شده و شسته‌شده · آماده مصرف فوری',
    harvestAvailability: 'Daily Morning Pack',
    harvestAvailabilityFa: 'تولید صبحگاهی روزانه',
    image: BRAND_IMAGES.heroEstate,
  },
  {
    id: 'prd-07',
    name: 'Vine Tomatoes, Crisp Persian Cucumbers & Fresh Lemons Set',
    nameFa: 'پکیج گوجه‌فرنگی گلخانه‌ای، خیار قلمی ترد و لیموترش تازه شیراز',
    category: 'Fresh Tehran Orchard Produce',
    categoryFa: 'میوه و سبزیجات دست‌چین روز',
    origin: 'Selected Tehran Greengrocers',
    originFa: 'میوه‌فروشی‌های منتخب منطقه ۱ تا ۶ تهران',
    unitSize: '2.5 kg Combined Kitchen Staple Pack',
    unitSizeFa: 'بسته ۲.۵ کیلوگرمی (گوجه، خیار و لیموترش)',
    price: 6.5,
    shortDescription: 'Essential daily salad and breakfast staples selected for firmness, aroma, and thin skin.',
    shortDescriptionFa: 'اقلام ضروری روزانه یخچال والدین برای صبحانه و سالاد شیرازی، دست‌چین‌شده از بار تازه صبح.',
    provenanceNote: 'Checked item-by-item by your Asa Hamrah shopper.',
    provenanceNoteFa: 'کنترل کیفیت تک‌به‌تک توسط همراه خرید آسا.',
    dietaryMeta: 'Daily Essential · Hand-Inspected',
    dietaryMetaFa: 'نیاز روزانه یخچال · دست‌چین',
    harvestAvailability: 'In Stock Daily',
    harvestAvailabilityFa: 'خرید تازه روز',
    image: BRAND_IMAGES.marketHarvest,
  },
  {
    id: 'prd-08',
    name: 'Chopped & Steamed Khoresht Herbs Set (Ghormeh, Karafs & Kookoo)',
    nameFa: 'مجموعه سبزی‌های خورشتی و کوکو تازه خردشده (قورمه، کرفس و کوکو)',
    category: 'Fresh Tehran Orchard Produce',
    categoryFa: 'میوه و سبزیجات دست‌چین روز',
    origin: 'Hygienic Tehran Vegetable Kitchen',
    originFa: 'کارگاه بهداشتی سبزیجات تازه تهران',
    unitSize: '3 × 500g Packs (Washed & Finely Chopped)',
    unitSizeFa: '۳ بسته ۵۰۰ گرمی شسته‌شده و خردشده',
    price: 9.0,
    shortDescription: 'Saves hours of standing and chopping for parents who still enjoy light cooking at home.',
    shortDescriptionFa: 'برای والدینی که هنوز علاقه به آشپزی در خانه دارند اما شستن و خرد کردن سبزی برایشان دشوار و خسته‌کننده است.',
    provenanceNote: 'Freshly chopped without excess oil; ready for fridge or freezer.',
    provenanceNoteFa: 'تازه و معطر؛ آماده استفاده مستقیم یا قرار دادن در فریزر منزل.',
    dietaryMeta: 'Zero Preservatives · Senior Time-Saver',
    dietaryMetaFa: 'بدون مواد نگهدارنده · راحتی کامل والدین',
    harvestAvailability: 'Prepared Daily',
    harvestAvailabilityFa: 'تهیه روزانه',
    image: BRAND_IMAGES.heroEstate,
  },

  // 3. Sangak Bakery & Traditional Dairy
  {
    id: 'prd-09',
    name: 'Hot Pebble-Baked Whole-Wheat Sangak Bread & Barbari Bundle',
    nameFa: 'نان سنگک سبوس‌دار دوآتشه و بربری کنجدی تازه از تنور سنتی',
    category: 'Sangak Bakery & Traditional Dairy',
    categoryFa: 'نانوایی خمیرترش و لبنیات محلی',
    origin: 'Traditional Neighborhood Sangak Oven',
    originFa: 'نانوایی سنگکی سنتی محله والدین در تهران',
    unitSize: '3 Fresh Loaves (Cut & Packed in Cotton Cloth)',
    unitSizeFa: '۳ قرص نان تازه، برش‌خورده در سفره پارچه‌ای',
    price: 4.5,
    shortDescription: 'No standing in long bakery queues for your parents. Our companion buys hot whole-wheat Sangak, cools it properly, cuts it into neat squares, and packs it cleanly.',
    shortDescriptionFa: 'دیگر نیازی نیست والدین در صف طولانی نانوایی بایستند. همراه آسا نان سنگک سبوس‌دار تازه را خریده، پس از خنک شدن به قطعات منظم برش می‌زند و در پارچه نخی تحویل می‌دهد.',
    provenanceNote: 'Whole-grain fermented dough with natural sesame seeds.',
    provenanceNoteFa: 'پخت با آرد کامل سبوس‌دار و خمیرترش سنتی.',
    dietaryMeta: 'Whole-Wheat Fiber · Queue-Free Delivery',
    dietaryMetaFa: 'آرد سبوس‌دار · برش‌خورده و آماده',
    harvestAvailability: 'Morning & Afternoon Oven Bakes',
    harvestAvailabilityFa: 'پخت تنور صبح و عصر',
    image: BRAND_IMAGES.marketHarvest,
    isSignatureSelection: true,
  },
  {
    id: 'prd-10',
    name: 'Traditional Tabriz Lighvan Sheep Cheese & Fresh Tuyserkan Walnuts',
    nameFa: 'پنیر لیقوان اصیل تبریز به همراه مغز گردوی سفید تویسرکان',
    category: 'Sangak Bakery & Traditional Dairy',
    categoryFa: 'نانوایی خمیرترش و لبنیات محلی',
    origin: 'Lighvan Valley & Tuyserkan Orchards',
    originFa: 'دره لیقوان تبریز و باغات تویسرکان',
    unitSize: '500g Cheese in Brine + 250g Shelled Walnuts',
    unitSizeFa: '۵۰۰ گرم پنیر لیقوان + ۲۵۰ گرم مغز گردوی دست‌چین',
    price: 12.5,
    shortDescription: 'The quintessential nutritious Persian breakfast pairing—authentic sheep-milk Lighvan cheese with sweet, paper-shell white walnut halves.',
    shortDescriptionFa: 'ترکیب اصیل و مقوی صبحانه ایرانی برای سلامت استخوان و حافظه والدین؛ پنیر لیقوان درجه یک به همراه مغز گردوی تازه و چرب.',
    provenanceNote: 'Pasteurized artisanal production with balanced salt brine.',
    provenanceNoteFa: 'تولید بهداشتی با نمک متعادل و مغز گردوی امسالی بدون تلخی.',
    dietaryMeta: 'Calcium & Omega-3 Rich · Breakfast Staple',
    dietaryMetaFa: 'غنی از کلسیم و امگا-۳ · صبحانه کامل',
    harvestAvailability: 'In Stock Daily',
    harvestAvailabilityFa: 'موجود در غرفه لبنیات',
    image: BRAND_IMAGES.marketPantry,
  },
  {
    id: 'prd-11',
    name: 'Probiotic Low-Fat Traditional Yogurt & Bottled A2 Milk Duo',
    nameFa: 'ماست پروبیوتیک کم‌چرب سنتی و دو بطری شیر تازه پاستوریزه',
    category: 'Sangak Bakery & Traditional Dairy',
    categoryFa: 'نانوایی خمیرترش و لبنیات محلی',
    origin: 'Certified Tehran Dairy Producers',
    originFa: 'لبنیات سنتی و پاستوریزه منتخب تهران',
    unitSize: '1.5 kg Yogurt Bucket + 2 × 1L Fresh Milk',
    unitSizeFa: '۱.۵ کیلوگرم ماست پروبیوتیک + ۲ بطری شیر تازه',
    price: 7.5,
    shortDescription: 'Checked for the latest production date on the shelf so your parents have maximum refrigerator shelf life.',
    shortDescriptionFa: 'همراه آسا هنگام خرید، جدیدترین تاریخ تولیدِ همان روز را از قفسه انتخاب می‌کند تا بیشترین ماندگاری را در یخچال والدین داشته باشد.',
    provenanceNote: 'Rich in live beneficial cultures for digestive comfort.',
    provenanceNoteFa: 'حاوی باکتری‌های مفید پروبیوتیک برای تقویت گوارش و سیستم ایمنی.',
    dietaryMeta: 'Probiotic · Latest Production Date Verified',
    dietaryMetaFa: 'پروبیوتیک · تضمین تاریخ تولید روز',
    harvestAvailability: 'Daily Morning Delivery',
    harvestAvailabilityFa: 'توزیع روزانه صبحگاهی',
    image: BRAND_IMAGES.marketHarvest,
  },
  {
    id: 'prd-12',
    name: 'Free-Range Golden-Yolk Eggs & Cultured Breakfast Butter Set',
    nameFa: 'تخم‌مرغ محلی زرده‌طلایی غنی‌شده با امگا-۳ و کره حیوانی صبحانه',
    category: 'Sangak Bakery & Traditional Dairy',
    categoryFa: 'نانوایی خمیرترش و لبنیات محلی',
    origin: 'Certified Organic Poultry Farms',
    originFa: 'مزارع پرورش آزاد دارای پروانه بهداشتی',
    unitSize: '15-Egg Carton + 250g Pure Butter',
    unitSizeFa: 'بسته ۱۵ عددی تخم‌مرغ + ۲۵۰ گرم کره خالص',
    price: 6.8,
    shortDescription: 'Inspected one by one to ensure zero cracked shells prior to delivery.',
    shortDescriptionFa: 'بررسی تک‌به‌تک تخم‌مرغ‌ها توسط همراه آسا جهت اطمینان از سلامت کامل پوسته و تاریخ تولید.',
    provenanceNote: 'Selenium and Omega-3 enriched for senior nutrition.',
    provenanceNoteFa: 'غنی‌شده با سلنیوم و امگا-۳ طبیعی.',
    dietaryMeta: 'Omega-3 Enriched · Zero Cracked Guarantee',
    dietaryMetaFa: 'غنی از امگا-۳ · بررسی سلامت فیزیکی',
    harvestAvailability: 'Fresh Daily Stock',
    harvestAvailabilityFa: 'موجود و تازه',
    image: BRAND_IMAGES.heroEstate,
  },

  // 4. Persian Pantry & Healthy Oils
  {
    id: 'prd-13',
    name: 'First-Crop Aged Hashemi Guilan Rice (Astaneh Ashrafiyeh)',
    nameFa: 'برنج هاشمی درجه یک کهنه آستانه اشرفیه (کیسه ۵ کیلوگرمی)',
    category: 'Persian Pantry & Healthy Oils',
    categoryFa: 'خواربار اصیل، برنج ایرانی و روغن سالم',
    origin: 'Astaneh Ashrafiyeh, Guilan',
    originFa: 'شالیزارهای آستانه اشرفیه گیلان',
    unitSize: '5 kg Cotton Sack (Carried Inside Kitchen)',
    unitSizeFa: 'کیسه پارچه‌ای ۵ کیلوگرمی (حمل تا داخل آشپزخانه)',
    price: 24.0,
    shortDescription: 'Heavy rice sacks shouldn’t be carried by older parents. We deliver pure, unblended 100% Hashemi rice directly into their kitchen pantry.',
    shortDescriptionFa: 'حمل کیسه‌های سنگین برنج برای سالمندان خطرناک است. همراه آسا برنج ۱۰۰٪ خالص و یکدست هاشمی را تا داخل کابینت آشپزخانه والدین حمل و جابجا می‌کند.',
    provenanceNote: 'Sun-dried, aromatic, and guaranteed 100% pure single-variety Hashemi.',
    provenanceNoteFa: 'تضمین ۱۰۰٪ خلوص، عطر طبیعی و پخت عالی بدون هیچ‌گونه اختلاط.',
    dietaryMeta: '100% Pure Hashemi · Heavy-Item Inside Carry',
    dietaryMetaFa: '۱۰۰٪ خالص سورتینگ‌شده · حمل تا داخل کابینت',
    harvestAvailability: 'Estate Reserve Stock',
    harvestAvailabilityFa: 'موجود از برداشت ممتاز امسال',
    image: BRAND_IMAGES.marketPantry,
    isSignatureSelection: true,
  },
  {
    id: 'prd-14',
    name: 'Cold-Pressed Extra-Virgin Olive Oil & Sesame Oil Cooking Duo',
    nameFa: 'مجموعه روغن زیتون فرابکر کلدپرس و روغن کنجد طبیعی پخت‌وپز',
    category: 'Persian Pantry & Healthy Oils',
    categoryFa: 'خواربار اصیل، برنج ایرانی و روغن سالم',
    origin: 'Rudbar & Tarom Groves',
    originFa: 'باغات زیتون رودبار و طارم',
    unitSize: '2 × 750ml Dark Glass Bottles',
    unitSizeFa: '۲ بطری شیشه‌ای تیره ۷۵۰ میلی‌لیتری',
    price: 19.5,
    shortDescription: 'Help your parents replace inflammatory industrial frying oils with pure cold-pressed olive and sesame oils.',
    shortDescriptionFa: 'بهترین هدیه برای سلامت قلب و عروق والدین؛ جایگزینی روغن‌های صنعتی با روغن زیتون فرابکر رودبار و روغن کنجد بکر.',
    provenanceNote: 'Dark UV-protected glass bottles with pour spouts.',
    provenanceNoteFa: 'در بطری‌های شیشه‌ای تیره ضدنور با نازل ریزش آسان.',
    dietaryMeta: 'Cold-Pressed · Heart-Healthy · Glass Bottle',
    dietaryMetaFa: 'عصاره‌گیری سرد · دوستدار قلب · بطری شیشه‌ای',
    harvestAvailability: 'Fresh Harvest Pressing',
    harvestAvailabilityFa: 'تولید تازه فصل',
    image: BRAND_IMAGES.marketHarvest,
    isSignatureSelection: true,
  },
  {
    id: 'prd-15',
    name: 'Qaenat Sargol Saffron (1 Mithqal) & Sablan Raw Mountain Honey',
    nameFa: 'زعفران سرگل ممتاز قائنات (یک مثقال) و عسل طبیعی کنار و گون سبلان',
    category: 'Persian Pantry & Healthy Oils',
    categoryFa: 'خواربار اصیل، برنج ایرانی و روغن سالم',
    origin: 'South Khorasan & Ardabil Highlands',
    originFa: 'قائنات خراسان و دامنه‌های سبلان',
    unitSize: '4.6g Saffron Tin + 750g Glass Jar Raw Honey',
    unitSizeFa: 'خاتم ۴.۶ گرمی زعفران + شیشه ۷۵۰ گرمی عسل خام',
    price: 22.0,
    shortDescription: 'Lab-tested low-sucrose natural mountain honey paired with pure crimson Sargol saffron threads.',
    shortDescriptionFa: 'عسل خام کوهستانی با ساکارز زیر ۲٪ (مناسب سالمندان) به همراه یک مثقال زعفران سرگل خالص و خوش‌عطر قائنات.',
    provenanceNote: 'Includes lab purity certificate for sucrose content.',
    provenanceNoteFa: 'همراه با برگه آزمایش خلوص عسل و استاندارد زعفران.',
    dietaryMeta: 'Sucrose < 2% · Lab Verified Purity',
    dietaryMetaFa: 'ساکارز زیر ۲٪ · دارای برگه آنالیز آزمایشگاهی',
    harvestAvailability: 'In Stock',
    harvestAvailabilityFa: 'موجود در بخش خواربار ممتاز',
    image: BRAND_IMAGES.marketPantry,
  },
  {
    id: 'prd-16',
    name: 'Kashan Herbal Distillates Trio (Rosewater, Mint & Willow/Bidmeshk)',
    nameFa: 'مجموعه ۳ عددی عرقیات دوآتشه کاشان (گلاب، عرق نعناع و بیدمشک)',
    category: 'Persian Pantry & Healthy Oils',
    categoryFa: 'خواربار اصیل، برنج ایرانی و روغن سالم',
    origin: 'Qamsar, Kashan Copper Stills',
    originFa: 'قمصر و نیاسر کاشان (تقطیر در دیگ مسی)',
    unitSize: '3 × 1 Liter Glass Bottles',
    unitSizeFa: '۳ بطری شیشه‌ای ۱ لیتری دوآتشه',
    price: 11.5,
    shortDescription: 'Traditional copper-distilled botanical waters in glass bottles—never plastic containers.',
    shortDescriptionFa: 'عرقیات اصیل و سنتی کاشان در بطری‌های شیشه‌ای بهداشتی (بدون تماس با ظروف پلاستیکی).',
    provenanceNote: 'Pasteurized and bottled in heavy glass.',
    provenanceNoteFa: 'پاستوریزه و بسته‌بندی‌شده در بطری شیشه‌ای.',
    dietaryMeta: 'Copper-Distilled · Glass Bottled · Zero Essence',
    dietaryMetaFa: 'تقطیر سنتی · بطری شیشه‌ای · بدون اسانس شیمیایی',
    harvestAvailability: 'Spring Distillation Batch',
    harvestAvailabilityFa: 'محصول گلاب‌گیری بهاره',
    image: BRAND_IMAGES.marketSanctuary,
  },

  // 5. Fresh Butcher & Daily Catch
  {
    id: 'prd-17',
    name: 'Freshly Trimmed Lean Lamb Stew Cubes & Minced Veal/Lamb Mix',
    nameFa: 'گوشت گوسفندی خورشتی بی‌چربی و چرخ‌کرده مخلوط تازه روز',
    category: 'Fresh Butcher & Daily Catch',
    categoryFa: 'قصابی و پروتئین تازه روز',
    origin: 'Licensed Tehran Butcher (Veterinary Stamped)',
    originFa: 'قصابی‌های مجاز شمال تهران با مهر دامپزشکی روز',
    unitSize: '1 kg Lean Stew Cubes + 800g Fresh Mince',
    unitSizeFa: '۱ کیلوگرم خورشتی لخم + ۸۰۰ گرم چرخ‌کرده ممتاز',
    price: 28.0,
    shortDescription: 'Trimmed of excess fat, portioned into meal-sized freezer packs, and labeled by our companion.',
    shortDescriptionFa: 'کاملاً چربی‌گیری‌شده و تقسیم‌شده در بسته‌های بهاندازه یک وعده پخت؛ آماده قرارگیری منظم در فریزر والدین.',
    provenanceNote: 'Purchased fresh on delivery morning with official butcher receipt.',
    provenanceNoteFa: 'تهیه‌شده در صبح روز تحویل همراه با فاکتور رسمی قصابی.',
    dietaryMeta: 'Lean Trimmed · Meal-Portioned · Vet Certified',
    dietaryMetaFa: 'چربی‌گیری کامل · بسته‌بندی وعده‌ای · مهر دامپزشکی',
    harvestAvailability: 'Daily Morning Butcher Cut',
    harvestAvailabilityFa: 'کشتار تازه روز',
    image: BRAND_IMAGES.serviceConcierge,
    isSignatureSelection: true,
  },
  {
    id: 'prd-18',
    name: 'Antibiotic-Free Chicken Breast & Drumstick Family Pack (Cleaned)',
    nameFa: 'پکیج سینه و ساق مرغ سبز (بدون آنتی‌بیوتیک) پاک‌شده و آماده طبخ',
    category: 'Fresh Butcher & Daily Catch',
    categoryFa: 'قصابی و پروتئین تازه روز',
    origin: 'Certified Green Poultry Farms',
    originFa: 'مرغداری‌های دارای گواهی مرغ سبز (بدون آنتی‌بیوتیک)',
    unitSize: '2.2 kg Total (Portioned & Skin-Removed)',
    unitSizeFa: '۲.۲ کیلوگرم (پوست‌گیری و قطعه‌بندی‌شده)',
    price: 13.0,
    shortDescription: 'Pre-cleaned and portioned so your parent never has to cut or clean raw poultry.',
    shortDescriptionFa: 'کاملاً پاک‌شده، پوست‌گیری‌شده و تقسیم‌شده در ظروف بهداشتی تا والدین زحمت خرد کردن مرغ خام را نداشته باشند.',
    provenanceNote: 'Delivered in cold-chain insulated bags.',
    provenanceNoteFa: 'حمل در کیف‌های سردخانه‌ای ایزوله تا درب یخچال منزل.',
    dietaryMeta: 'Antibiotic-Free · Pre-Portioned for Seniors',
    dietaryMetaFa: 'فاقد آنتی‌بیوتیک · قطعه‌بندی آماده پخت',
    harvestAvailability: 'Daily Cold-Chain Dispatch',
    harvestAvailabilityFa: 'توزیع روزانه زنجیره سرد',
    image: BRAND_IMAGES.heroEstate,
  },
  {
    id: 'prd-19',
    name: 'Fresh Damavand Rainbow Trout Fillets (Deboned & Seasoned)',
    nameFa: 'فیله ماهی قزل‌آلای تازه آب‌های سرد دماوند (کاملاً تیغ‌گیری‌شده)',
    category: 'Fresh Butcher & Daily Catch',
    categoryFa: 'قصابی و پروتئین تازه روز',
    origin: 'Haraz & Damavand Mountain Springs',
    originFa: 'حوضچه‌های آب چشمه هراز و دماوند',
    unitSize: '1 kg Fresh Fillets (4 Portions)',
    unitSizeFa: '۱ کیلوگرم فیله خالص بدون استخوان (۴ تکه)',
    price: 16.0,
    shortDescription: 'Caught fresh from cold mountain spring water, filleted, and deboned for safe, easy pan-searing or baking.',
    shortDescriptionFa: 'صید روز از آب‌های سرد کوهستانی، فیله و تیغ‌گیری‌شده برای پخت سریع و ایمن بدون نگرانی از تیغ ماهی.',
    provenanceNote: 'Packed on ice and delivered within hours.',
    provenanceNoteFa: 'حمل در باکس یخ بهداشتی و تحویل مستقیم به یخچال.',
    dietaryMeta: 'Fresh Never Frozen · Deboned Fillet',
    dietaryMetaFa: 'صید روز منجمدنشده · فیله بدون تیغ',
    harvestAvailability: 'Morning Arrival',
    harvestAvailabilityFa: 'ورود صبحگاهی روزانه',
    image: BRAND_IMAGES.serviceConcierge,
  },
  {
    id: 'prd-20',
    name: 'Slow-Simmered Beef & Sheep Shank Collagen Broth Set',
    nameFa: 'پکیج ۳ شیشه عصاره قلم گوساله و ماهیچه گوسفندی (چربی‌گیری‌شده)',
    category: 'Fresh Butcher & Daily Catch',
    categoryFa: 'قصابی و پروتئین تازه روز',
    origin: 'Asa Khoraak Culinary Kitchen',
    originFa: 'آشپزخانه سلامت آسا خوراک',
    unitSize: '3 × 500ml Borosilicate Glass Jars',
    unitSizeFa: '۳ بطری شیشه‌ای ۵۰۰ میلی‌لیتری',
    price: 14.0,
    shortDescription: 'Skimmed of all surface fat after chilling, leaving pure golden collagen jelly to enrich your parent’s soups and stews.',
    shortDescriptionFa: 'پس از سرد شدن، چربی روی عصاره کاملاً گرفته شده و فقط ژلاتین و کلاژن خالص برای تقویت مفاصل و استخوان والدین باقی مانده است.',
    provenanceNote: 'Simmered 18 hours with onion, carrot, and celery.',
    provenanceNoteFa: 'پخت ۱۸ ساعته با پیاز، هویج و کرفس تازه؛ در ظروف شیشه‌ای.',
    dietaryMeta: '99% Fat-Skimmed · Joint & Bone Support',
    dietaryMetaFa: '۹۹٪ چربی‌گیری‌شده · تقویت مفاصل و استخوان',
    harvestAvailability: 'Fresh Weekly Kettle',
    harvestAvailabilityFa: 'پخت تازه هفتگی',
    image: BRAND_IMAGES.marketHarvest,
  },

  // 6. Home Comfort & Senior Care Essentials
  {
    id: 'prd-21',
    name: 'Hypoallergenic Botanical Laundry & Dishwashing Liquid Refill Set',
    nameFa: 'پکیج مایع لباسشویی و ظرفشویی گیاهی ضدحساسیت (بدون عطر تند شیمیایی)',
    category: 'Home Comfort & Senior Care Essentials',
    categoryFa: 'ملزومات بهداشتی و آسایش منزل والدین',
    origin: 'Dermatologist-Tested Eco Care',
    originFa: 'محصولات بهداشتی ضدحساسیت دارای تاییدیه پوست',
    unitSize: '2.5L Laundry Wash + 1L Gentle Dish Balm',
    unitSizeFa: '۲.۵ لیتر مایع لباسشویی + ۱ لیتر مایع ظرفشویی ملایم',
    price: 14.5,
    shortDescription: 'Heavy detergent bottles carried directly into the laundry room; gentle on aging hands and respiratory airways.',
    shortDescriptionFa: 'حمل گالن‌های سنگین شوینده تا داخل لاندری منزل والدین؛ فرمولاسیون ملایم که پوست دست سالمندان را خشک نمی‌کند و بوی تند شیمیایی ندارد.',
    provenanceNote: 'Free from harsh chlorine, phosphates, and synthetic dyes.',
    provenanceNoteFa: 'فاقد کلر، فسفات و اسانس‌های تحریک‌کننده تنفسی.',
    dietaryMeta: 'Dermatologist Tested · Heavy Item Carry',
    dietaryMetaFa: 'ضدحساسیت پوستی · حمل تا داخل منزل',
    harvestAvailability: 'In Stock',
    harvestAvailabilityFa: 'موجود در بخش ملزومات خانه',
    image: BRAND_IMAGES.marketSanctuary,
    isSignatureSelection: true,
  },
  {
    id: 'prd-22',
    name: 'Ultra-Soft 100% Pure Cellulose Facial Tissue & Paper Towel Bale',
    nameFa: 'پکیج اقتصادی ۱۰ بسته‌ای دستمال کاغذی ۱۰۰٪ سلولز خالص و حوله آشپزخانه',
    category: 'Home Comfort & Senior Care Essentials',
    categoryFa: 'ملزومات بهداشتی و آسایش منزل والدین',
    origin: 'Grade-A Hygienic Paper Producers',
    originFa: 'تولیدکنندگان ممتاز محصولات سلولزی بهداشتی',
    unitSize: '6 Facial Tissue Boxes + 4 Giant Kitchen Rolls',
    unitSizeFa: '۶ جعبه دستمال صورت لطیف + ۴ رول بزرگ حوله‌ای',
    price: 12.0,
    shortDescription: 'Bulky household paper products delivered and stacked neatly in your parent’s storage closet.',
    shortDescriptionFa: 'خرید و حمل بسته‌های حجیم دستمال کاغذی و دستمال حوله‌ای و چیدمان منظم در کمد رختکن یا انباری منزل والدین.',
    provenanceNote: 'Dust-free virgin cellulose safe for sensitive eyes and sinuses.',
    provenanceNoteFa: 'بدون پرز و حساسیت تنفسی؛ تولیدشده از سلولز خالص.',
    dietaryMeta: 'Lint-Free · Virgin Cellulose · Closet Stacked',
    dietaryMetaFa: 'بدون پرز · سلولز خالص · چیدمان در کمد',
    harvestAvailability: 'Always Available',
    harvestAvailabilityFa: 'موجود و آماده ارسال',
    image: BRAND_IMAGES.marketSanctuary,
  },
  {
    id: 'prd-23',
    name: 'Organic Calendula, Sweet Almond & Beeswax Senior Skin Comfort Balm',
    nameFa: 'بالم و کرم گیاهی کالندولا، بادام شیرین و موم عسل (رفع خشکی پوست سالمند)',
    category: 'Home Comfort & Senior Care Essentials',
    categoryFa: 'ملزومات بهداشتی و آسایش منزل والدین',
    origin: 'Botanical Apothecary Lab',
    originFa: 'لابراتوار فرآورده‌های گیاهی دارویی',
    unitSize: '150ml Amber Glass Jar + 50ml Hand Cream',
    unitSizeFa: 'شیشه ۱۵۰ میلی‌لیتری + تیوب ۵۰ میلی‌لیتری همراه',
    price: 15.5,
    shortDescription: 'Deeply moisturizes thin, dry aging skin on hands, elbows, and shins using pure plant lipids.',
    shortDescriptionFa: 'التیام‌بخش و مرطوب‌کننده عمیق برای پوست‌های خشک و حساس سالمندان با عصاره گل همیشه‌بهار و روغن بادام شیرین.',
    provenanceNote: 'Paraben-free and fragrance-allergen-free.',
    provenanceNoteFa: 'فاقد پارابن، الکل و مواد نگه‌دارنده حساسیت‌زا.',
    dietaryMeta: 'Cosmetic Grade · Non-Clinical Skin Comfort',
    dietaryMetaFa: 'مراقبت روزانه پوست · ۱۰۰٪ گیاهی',
    harvestAvailability: 'Fresh Batch',
    harvestAvailabilityFa: 'تولید تازه',
    image: BRAND_IMAGES.marketSanctuary,
  },
  {
    id: 'prd-24',
    name: 'Mineral Water 6-Pack & Large-Print Weekly Pill/Supplement Organizer Tray',
    nameFa: 'پکیج آب معدنی طبیعی به همراه جعبه نظم‌دهنده هفتگی مکمل‌ها با حروف درشت فارسی',
    category: 'Home Comfort & Senior Care Essentials',
    categoryFa: 'ملزومات بهداشتی و آسایش منزل والدین',
    origin: 'Alborz Springs & Senior Ergonomics',
    originFa: 'چشمه‌های البرز + تجهیزات ارگونومیک سالمند',
    unitSize: '6 × 1.5L Mineral Water + 7-Day Persian Organizer',
    unitSizeFa: 'باکس ۶ عددی آب معدنی + جعبه ۷ روزه با چاپ درشت فارسی',
    price: 9.5,
    shortDescription: 'Includes heavy mineral water carry plus an easy-open, large-print Persian day-of-the-week organizer box for your parent’s own self-managed supplements.',
    shortDescriptionFa: 'حمل باکس سنگین آب معدنی به داخل آشپزخانه، به همراه یک جعبه ارگونومیک با درب‌های نرم و چاپ درشت ایام هفته فارسی برای نظم‌دهی شخصی والدین.',
    provenanceNote: 'Note: Asa companions never fill or administer medications; box is handed sealed to recipient.',
    provenanceNoteFa: 'توجه: همراهان آسا در چیدن یا دادن دارو دخالت نمی‌کنند؛ جعبه به صورت پلمپ تحویل والدین می‌گردد.',
    dietaryMeta: 'Ergonomic Easy-Open · Large Persian Print',
    dietaryMetaFa: 'درب بازشوی نرم · چاپ درشت و خوانای روزهای هفته',
    harvestAvailability: 'In Stock',
    harvestAvailabilityFa: 'موجود',
    image: BRAND_IMAGES.marketSanctuary,
  },
];

export const CURATED_BUNDLES: CuratedFamilyBundle[] = [
  {
    id: 'bnd-01',
    pillarBadge: 'Asa Hamrah + Asa Khoraak',
    pillarBadgeFa: 'پکیج ترکیبی آسا همراه + آسا خوراک',
    title: 'The Weekly Parent Fridge & Sangak Restock Box',
    titleFa: 'بسته هفتگی شارژ یخچال والدین در تهران (میوه دست‌چین، سنگک داغ و لبنیات)',
    subtitle: 'Itemized Pass-Through Grocery Basket + Vetted Companion Delivery',
    subtitleFa: 'تفکیک کامل هزینه اقلام طبق فاکتور رسمی + کارمزد شفاف خرید و چیدمان آسا',
    description:
      'Our most-requested weekly care package for parents in Tehran: Damavand hand-picked fruits, washed Sabzi Khordan, hot cut Sangak bread, Tabriz Lighvan cheese with walnuts, probiotic yogurt, fresh milk, and golden-yolk eggs—purchased fresh, checked, and placed in their refrigerator.',
    descriptionFa:
      'محبوب‌ترین سفارش هفتگی فرزندان مقیم خارج برای والدین در تهران: سبد میوه دست‌چین دماوند، سبزی خوردن شسته‌شده، نان سنگک داغ برش‌خورده، پنیر لیقوان و گردو، ماست پروبیوتیک، شیر تازه و تخم‌مرغ محلی—همراه با ارسال تصویر فاکتور رسمی و گزارش خانواده.',
    includedProductIds: ['prd-05', 'prd-06', 'prd-09', 'prd-10', 'prd-11', 'prd-12'],
    includedSummary: [
      '3.5kg Hand-Picked Damavand Fruit Crate + Washed Sabzi Khordan',
      '3 Loaves Hot Whole-Wheat Sangak Bread (Cut & Cloth-Packed)',
      'Tabriz Lighvan Cheese (500g), Tuyserkan Walnuts (250g) & 15 Eggs',
      'Probiotic Yogurt (1.5kg), 2L Fresh Milk + Itemized Receipt & Family Update',
    ],
    includedSummaryFa: [
      'سبد ۳.۵ کیلوگرمی میوه دست‌چین دماوند + ۲ بسته سبزی خوردن پاک و شسته‌شده',
      '۳ قرص نان سنگک سبوس‌دار تازه (خنک‌شده و برش‌خورده در سفره پارچه‌ای)',
      'پنیر لیقوان تبریز، مغز گردوی تویسرکان و بسته ۱۵ عددی تخم‌مرغ محلی',
      'ماست پروبیوتیک، ۲ بطری شیر تازه + عکس فاکتور رسمی و گزارش مکتوب خانواده',
    ],
    passThroughProductTotal: 47.8,
    asaServiceFee: 18.0,
    RecommendedFor: 'Weekly Parent Care in Tehran · $47.80 Groceries + $18 Asa Fee',
    RecommendedForFa: 'مناسب شارژ هفتگی یخچال والدین · ۴۷.۸ دلار اقلام + ۱۸ دلار کارمزد آسا',
    image: BRAND_IMAGES.marketHarvest,
  },
  {
    id: 'bnd-02',
    pillarBadge: 'Asa Khoraak Ready Meals',
    pillarBadgeFa: 'پکیج ویژه آسا خوراک (غذاهای آماده سلامت)',
    title: '4-Day Prepared Home-Style Meal & Soup Package',
    titleFa: 'بسته ۴ روزه غذاهای پخته‌شده کم‌نمک و سوپ تازه ویژه والدین',
    subtitle: 'Authorized Tehran Kitchens · Full Allergen & Heating Labels',
    subtitleFa: 'تهیه‌شده در آشپزخانه‌های مجاز با برچسب ترکیبات و راهنمای گرم‌کردن',
    description:
      'Give your parents a full rest from cooking: low-sodium Ghormeh Sabzi, saffron Joojeh Kabab fillets, baked herb salmon with steamed vegetables, a 1-liter glass jar of barley chicken soup, and fresh washed herbs.',
    descriptionFa:
      'چهار روز استراحت کامل از آشپزی برای پدر و مادر: شامل خورشت قورمه‌سبزی کم‌چرب، جوجه‌کباب زعفرانی بدون استخوان، فیله سالمون تنوری با سبزیجات بخارپز، یک لیتر سوپ جو و مرغ تازه در ظرف شیشه‌ای و سبزی خوردن شسته‌شده.',
    includedProductIds: ['prd-01', 'prd-02', 'prd-03', 'prd-04', 'prd-06'],
    includedSummary: [
      'Low-Sodium Ghormeh Sabzi (2 Portions) + Saffron Joojeh Kabab (2 Portions)',
      'Baked Herb Salmon & Steamed Veggies (2 Portions) — Bone-Free',
      '1L Borosilicate Glass Jar Barley Soup + 2 Packs Sanitized Sabzi Khordan',
    ],
    includedSummaryFa: [
      '۲ پرس قورمه‌سبزی کم‌چرب خانگی + ۲ پرس جوجه‌کباب زعفرانی نرم با چلوی ایرانی',
      '۲ پرس فیله سالمون تنوری بدون تیغ با سبزیجات بخارپز (غنی از امگا-۳)',
      '۱ لیتر سوپ جو و مرغ در ظرف شیشه‌ای + ۲ بسته سبزی خوردن ضدعفونی‌شده',
    ],
    passThroughProductTotal: 63.0,
    asaServiceFee: 20.0,
    RecommendedFor: 'When Parents Need a Break from Cooking · $63 Meals + $20 Asa Fee',
    RecommendedForFa: 'رفع دغدغه آشپزی والدین · ۶۳ دلار غذاها + ۲۰ دلار کارمزد هماهنگی و ارسال',
    image: BRAND_IMAGES.heroEstate,
  },
  {
    id: 'bnd-03',
    pillarBadge: 'Heavy Pantry & Butcher Restock',
    pillarBadgeFa: 'پکیج اقلام سنگین خواربار و پروتئین ماهانه',
    title: 'Monthly Heavy Pantry, Hashemi Rice & Butcher Carry Package',
    titleFa: 'پکیج ماهانه اقلام سنگین (برنج هاشمی، گوشت تازه، روغن زیتون و شوینده)',
    subtitle: 'Zero Heavy Lifting for Your Parents · Carried Inside Kitchen Cabinets',
    subtitleFa: 'بدون نیاز به حمل بار سنگین توسط سالمند · چیدمان تا داخل کابینت و فریزر',
    description:
      'Eliminate heavy lifting for your parents all month: a 5kg sack of pure Guilan Hashemi rice, lean trimmed lamb stew cubes, antibiotic-free portioned chicken, cold-pressed olive & sesame oils, and hypoallergenic laundry/paper essentials.',
    descriptionFa:
      'حمل کیسه‌های سنگین برنج و شوینده را از دوش والدین بردارید: کیسه ۵ کیلویی برنج هاشمی گیلان، گوشت گوسفندی خورشتی لخم، مرغ سبز قطعه‌بندی‌شده، روغن زیتون و کنجد فرابکر و پکیج شوینده ضدحساسیت و دستمال کاغذی.',
    includedProductIds: ['prd-13', 'prd-14', 'prd-17', 'prd-18', 'prd-21', 'prd-22'],
    includedSummary: [
      '5kg Pure Hashemi Guilan Rice + Cold-Pressed Olive & Sesame Oil Duo',
      '1.8kg Trimmed Lamb/Veal + 2.2kg Portioned Antibiotic-Free Chicken',
      'Hypoallergenic Laundry/Dish Liquids + 10-Pack Pure Cellulose Paper Bale',
    ],
    includedSummaryFa: [
      'کیسه ۵ کیلویی برنج هاشمی آستانه اشرفیه + ۲ بطری روغن زیتون و کنجد کلدپرس',
      '۱.۸ کیلوگرم گوشت گوسفندی و چرخ‌کرده تازه + ۲.۲ کیلوگرم مرغ سبز قطعه‌بندی‌شده',
      'پکیج مایع لباسشویی و ظرفشویی ضدحساسیت + بسته ۱۰ عددی دستمال سلولزی',
    ],
    passThroughProductTotal: 111.0,
    asaServiceFee: 24.0,
    RecommendedFor: 'Monthly Heavy-Item Provisioning · $111 Products + $24 Asa Fee',
    RecommendedForFa: 'تامین ماهانه اقلام سنگین منزل · ۱۱۱ دلار کالاها + ۲۴ دلار کارمزد آسا',
    image: BRAND_IMAGES.marketPantry,
  },
];

export const ASA_FAQS = [
  {
    qEn: 'What are Asa Hamrah, Asa Khoraak, and Asa Pezeshk?',
    qFa: 'آسا همراه، آسا خوراک و آسا پزشک دقیقاً چه خدماتی ارائه می‌دهند؟',
    aEn: 'Asa Hamrah is practical companionship, custom grocery shopping, errands, and transport support. Asa Khoraak delivers packaged meals, varied home-style food selections, and daily/bulk meal plans through authorized suppliers. Asa Pezeshk coordinates medical-family logistics, appointment booking, and non-clinical accompaniment to treatment centers in Tehran.',
    aFa: '«آسا همراه» شامل همراهی عملی والدین در کارهای روزمره، خرید سفارشی منزل با ارائه فاکتور و پشتیبانی تردد است. «آسا خوراک» شامل ارسال بسته‌های غذایی پخته‌شده، غذاهای متنوع و برنامه‌های غذایی روزانه از تامین‌کنندگان مجاز است. «آسا پزشک» هماهنگی نوبت پزشکی، پیگیری و همراهی غیربالینی تا مراکز درمانی تهران به همراه ارسال گزارش خانواده را بر عهده دارد.',
  },
  {
    qEn: 'Is the food or grocery product cost included in Asa’s service fee?',
    qFa: 'آیا هزینه خرید کالاها یا بسته‌های غذایی در کارمزد آسا لحاظ شده است؟',
    aEn: 'No—and this is a core transparency principle of Asa. Product and meal value is always shown separately as a pass-through cost backed by the official store/supplier receipt, while Asa’s service and delivery fee is stated clearly upfront.',
    aFa: 'خیر؛ اصل بنیادین آسا شفافیت مالی کامل است. قیمت خود کالاها و غذاها دقیقاً مطابق فاکتور رسمی فروشگاه یا تامین‌کننده (Pass-through) و به صورت کاملاً جداگانه از کارمزد هماهنگی و اجرای آسا نمایش داده و تسویه می‌شود.',
  },
  {
    qEn: 'Can Asa give medical advice, interpret lab results, or administer medication?',
    qFa: 'آیا همراهان «آسا پزشک» توصیه پزشکی، تزریقات یا تفسیر آزمایش انجام می‌دهند؟',
    aEn: 'No. Asa provides strictly practical, non-clinical coordination and accompaniment. Asa does not diagnose, treat, interpret results, administer medication, perform physical patient transfers, or replace a licensed healthcare professional.',
    aFa: 'خیر. آسا یک مجموعه هماهنگی و همراهی عملی غیربالینی است و مرکز درمانی محسوب نمی‌شود. همراهان ما در تشخیص، درمان، تفسیر نتایج آزمایش، دادن دارو یا جابجایی فیزیکی بیمار دخالت نمی‌کنند و صرفاً امور اجرایی، پذیرش، تردد و گزارش مشاهدات عینی را انجام می‌دهند.',
  },
  {
    qEn: 'How does the Family Update (گزارش خانواده) work, and what about privacy?',
    qFa: '«گزارش خانواده» (Family Update) چگونه تنظیم می‌شود و قوانین رضایت‌نامه چیست؟',
    aEn: 'Every service requires appropriate recipient/customer consent. Upon completion, Asa sends a structured factual update (arrival/departure times, tasks completed, itemized receipts, and consented observations) strictly within the companion’s non-clinical role.',
    aFa: 'ارائه هر خدمت و ارسال گزارش، منوط به رضایت و اطلاع والدین (گیرنده خدمت) است. بلافاصله پس از اتمام خدمت، گزارشی ساختارمند شامل ساعت دقیق ورود و خروج، کارهای انجام‌شده، تصویر فاکتور رسمی خرید و مشاهدات عینی محترمانه برای شما ارسال می‌گردد.',
  },
  {
    qEn: 'What if an item on my shopping list is unavailable in the store?',
    qFa: 'اگر کالایی از لیست خرید در فروشگاه موجود نباشد چه اتفاقی می‌افتد؟',
    aEn: 'When placing your request, you select your substitution rule (e.g., “Replace with closest Grade-A brand within budget,” “Call/message approver first,” or “Omit item”). Unapproved substitutions are never made silently.',
    aFa: 'هنگام ثبت سفارش، شما قانون جایگزینی مورد نظرتان را انتخاب می‌کنید (مثلاً: «جایگزینی با برند مشابه درجه یک در سقف بودجه»، «تماس با تاییدکننده پیش از خرید» یا «حذف آن قلم»). هیچ کالایی بدون اجازه شما خودسرانه جایگزین نخواهد شد.',
  },
  {
    qEn: 'Do you operate throughout Iran, and how does international payment work?',
    qFa: 'آیا در سراسر ایران فعال هستید و وضعیت پرداخت ارزی از خارج از کشور چگونه است؟',
    aEn: 'Asa begins with a defined Tehran service zone (Districts 1, 2, 3, 4 & 6 pilot neighborhoods) to guarantee travel-time reliability and vetted worker coverage. International orders are accepted only through verified, legally approved payment routes for cleared jurisdictions (note: U.S. payment routes are currently excluded pending regulatory clearance).',
    aFa: 'آسا فعالیت خود را با تمرکز بر مناطق منتخب تهران (مناطق ۱، ۲، ۳، ۴ و ۶) آغاز کرده تا بالاترین کیفیت و سرعت اعزام را تضمین کند. ثبت سفارش نهایی و پرداخت تنها از طریق مسیرهای پرداخت مجاز و تاییدشده برای کشورهای مجاز انجام می‌گیرد و پیش از هرگونه پرداخت، پیش‌فاکتور شفاف صادر می‌شود.',
  },
];

export const CLIENT_TESTIMONIALS = [
  {
    quote:
      'Living in Munich, my biggest stress was asking my elderly aunt to carry heavy rice and fruit up to my mother’s apartment in Velenjak, or worrying what happened at her ophthalmology checkup. With Asa Hamrah and Asa Pezeshk, a named vetted companion met my mother with an ID badge, carried her groceries inside, accompanied her to Vanak Clinic, and sent me the exact store receipt and a respectful Family Update at 13:05.',
    quoteFa:
      '«من در مونیخ زندگی می‌کنم و همیشه نگران خریدهای سنگین مادرم در ولنجک یا تنهایی او در نوبت‌های چشم‌پزشکی کلینیک ونک بودم. با آسا همراه و آسا پزشک، همراه معرفی‌شده با کارت شناسایی رسمی به منزل مادرم رفت، خریدها را با فاکتور رسمی در آشپزخانه چید، تا کلینیک همراهی‌اش کرد و ساعت ۱۳:۰۵ گزارش دقیق خانواده را برایم فرستاد.»',
    author: 'Nima & Taraneh K.',
    authorFa: 'نیما و ترانه ک.',
    role: 'Diaspora Adult Children (Munich, Germany → Velenjak, Tehran)',
    roleFa: 'فرزندان مقیم مونیخ آلمان · گیرنده خدمت در ولنجک تهران',
    location: 'Asa Hamrah + Asa Pezeshk Pilot Member',
    locationFa: 'استفاده از خدمات آسا همراه و آسا پزشک (زون ۱ تهران)',
    metric: 'Itemized Receipt Reconciliation · 100% On-Time Window',
    metricFa: 'تطبیق ۱۰۰٪ فاکتور خرید · انجام دقیق در بازه ۱۰:۰۰ تا ۱۳:۰۰',
  },
  {
    quote:
      'When my father in Yousef Abad was recovering from dental surgery, Asa Khoraak delivered three days of warm, low-sodium barley soup and soft saffron chicken from a licensed kitchen, with clear heating labels in large Persian print. Knowing the exact scope, pass-through food cost, and seeing my father’s consent respected gave our whole family in Toronto peace of mind.',
    quoteFa:
      '«وقتی پدرم در یوسف‌آباد دوران نقاهت دندان‌پزشکی را می‌گذراند، از طریق آسا خوراک بسته ۳ روزه سوپ جو تازه و جوجه‌کباب زعفرانی نرم را سفارش دادیم. برچسب‌های خوانا با خط درشت فارسی، تفکیک شفاف قیمت غذا از کارمزد آسا و احترام فوق‌العاده همراه به استقلال پدرم، خیال همه ما را در تورنتو راحت کرد.»',
    author: 'Dr. Sara M.',
    authorFa: 'دکتر سارا م.',
    role: 'Pharmacist (Toronto, Canada → Yousef Abad, Tehran)',
    roleFa: 'فرزند مقیم تورنتو کانادا · گیرنده خدمت در یوسف‌آباد تهران',
    location: 'Asa Khoraak 3-Day Meal Package',
    locationFa: 'سفارش بسته ۳ روزه آسا خوراک (زون ۶ تهران)',
    metric: 'Zero Hidden Fees · Consented Factual Family Report',
    metricFa: 'شفافیت کامل مالی · ارسال گزارش استاندارد خانواده پس از تحویل',
  },
];

export type CurrencyCode = 'USD' | 'EUR' | 'IRR';

export const CURRENCY_META: Record<
  CurrencyCode,
  { labelEn: string; labelFa: string; symbol: string; rateNoteEn: string; rateNoteFa: string }
> = {
  USD: {
    labelEn: 'USD ($)',
    labelFa: 'دلار آمریکا ($)',
    symbol: '$',
    rateNoteEn: 'Base International Reference (USD)',
    rateNoteFa: 'نرخ پایه ارزی (دلار آمریکا)',
  },
  EUR: {
    labelEn: 'EUR (€)',
    labelFa: 'یورو اروپا (€)',
    symbol: '€',
    rateNoteEn: '1 USD ≈ 0.92 EUR (Estimated)',
    rateNoteFa: 'معادل تقریبی یورو (۱ دلار ≈ ۰.۹۲ یورو)',
  },
  IRR: {
    labelEn: 'IRR (Rial)',
    labelFa: 'ریال ایران (IRR)',
    symbol: 'IRR',
    rateNoteEn: '1 USD ≈ 600,000 IRR (Tehran Pass-Through Est.)',
    rateNoteFa: 'معادل تقریبی ریال در تهران (۱ دلار ≈ ۶۰۰,۰۰۰ ریال)',
  },
};

export const SERVICE_DEPT_FA: Record<ServiceDepartment, string> = {
  'All Divisions': 'همه خدمات',
  'Asa Hamrah': 'آسا همراه',
  'Asa Khoraak': 'آسا خوراک',
  'Asa Pezeshk': 'آسا پزشک',
  'Coming Soon': 'فاز بعدی',
};

export const GROCERY_CAT_FA: Record<GroceryCategory, string> = {
  'All Provisions': 'همه اقلام سوپرمارکت',
  'Asa Khoraak Prepared Meals': 'بسته‌های غذایی آماده',
  'Fresh Tehran Orchard Produce': 'میوه و سبزیجات تازه',
  'Sangak Bakery & Traditional Dairy': 'نان سنگک و لبنیات',
  'Persian Pantry & Healthy Oils': 'برنج، زعفران و روغن',
  'Fresh Butcher & Daily Catch': 'گوشت، مرغ و ماهی تازه',
  'Home Comfort & Senior Care Essentials': 'ملزومات آسایش منزل',
};

export function formatPrice(
  usdAmount: number,
  lang: Language,
  unitEn?: string,
  unitFa?: string,
  currency: CurrencyCode = 'USD'
): { amount: string; unit: string } {
  const isFa = lang === 'fa';
  const unit = isFa ? unitFa || '' : unitEn || '';

  if (currency === 'IRR') {
    const rialValue = Math.round(usdAmount * 600000);
    if (isFa) {
      return {
        amount: `${rialValue.toLocaleString('fa-IR')} ریال`,
        unit,
      };
    }
    return {
      amount: `${rialValue.toLocaleString('en-US')} IRR`,
      unit,
    };
  }

  if (currency === 'EUR') {
    const eurValue = usdAmount * 0.92;
    if (isFa) {
      const formattedNum = eurValue.toLocaleString('fa-IR', {
        minimumFractionDigits: eurValue % 1 === 0 ? 0 : 1,
        maximumFractionDigits: 1,
      });
      return {
        amount: `€${formattedNum} یورو`,
        unit,
      };
    }
    return {
      amount: `€${eurValue % 1 === 0 ? eurValue.toFixed(0) : eurValue.toFixed(2)}`,
      unit,
    };
  }

  // Default USD
  if (isFa) {
    const formattedNum = usdAmount.toLocaleString('fa-IR', {
      minimumFractionDigits: usdAmount % 1 === 0 ? 0 : 1,
      maximumFractionDigits: 1,
    });
    return {
      amount: `$${formattedNum} دلار`,
      unit,
    };
  }
  return {
    amount: `$${usdAmount % 1 === 0 ? usdAmount.toFixed(0) : usdAmount.toFixed(2)}`,
    unit,
  };
}


