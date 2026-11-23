import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  UserPlus,
  LogIn,
  LogOut,
  ShieldCheck,
  HeartPulse,
  Package,
  MapPin,
  Check,
  Sparkles,
  KeyRound,
  Crown,
  Navigation,
  FileCheck2,
  Clock,
  PhoneCall,
  Play,
  Pause,
  CheckCircle2,
  Calendar,
  Eye,
  History,
  ArrowUpDown,
  Receipt,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  Language,
  CurrencyCode,
  formatPrice,
  TEHRAN_SERVICE_ZONES,
} from '../data/catalogData';
import { ParentCareProfile } from './ParentCareProfileModal';
import { useLocalization } from '../i18n/LocalizationContext';

export interface RegisteredFamilyUser {
  id: string;
  fullName: string;
  email: string;
  phoneOrWhatsapp: string;
  countryOfResidence: string;
  role: 'family_member' | 'admin_steward';
  membershipTier: 'Standard' | 'Silver' | 'Gold' | 'Royal VIP';
  verifiedStatus: 'verified' | 'pending_review';
  createdAt: string;
  parentProfile: ParentCareProfile;
  adminNotes?: string;
}

export interface BackdoorOrderRecord {
  id: string;
  referenceCode: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  recipientName: string;
  residenceAddress: string;
  deliveryWindow: string;
  serviceTitles: string[];
  productSummaries: string[];
  passThroughTotalUsd: number;
  asaServiceFeeUsd: number;
  grandTotalUsd: number;
  gatewayId: string;
  specialInstructions: string;
  personalMessageCard?: string;
  hasVoiceNote?: boolean;
  assignedStewardNameFa: string;
  assignedStewardNameEn: string;
  currentStageIndex: number; // 0 to 4
  createdAt: string;
  createdAtTimestamp?: number;
}

export interface HistoricalVisitReport {
  id: string;
  referenceCode: string;
  visitDateFa: string;
  visitDateEn: string;
  arrivalDepartureTime: string;
  pillar: 'Asa Hamrah' | 'Asa Khoraak' | 'Asa Pezeshk';
  stewardNameFa: string;
  stewardNameEn: string;
  parentRecipientFa: string;
  parentRecipientEn: string;
  neighborhoodFa: string;
  neighborhoodEn: string;
  parentComfortSummaryFa: string;
  parentComfortSummaryEn: string;
  completedChecklistFa: string[];
  completedChecklistEn: string[];
  storeReceiptTotalUsd: number;
  asaServiceFeeUsd: number;
  fridgeOrganizationNoteFa: string;
  fridgeOrganizationNoteEn: string;
}

export const INITIAL_VISIT_REPORTS_HISTORY: HistoricalVisitReport[] = [
  {
    id: 'rep-01',
    referenceCode: 'ASA-849201',
    visitDateFa: 'امروز · نوبت صبح و ظهر',
    visitDateEn: 'Today · Morning & Midday Visit',
    arrivalDepartureTime: '10:15 – 11:45 IRST',
    pillar: 'Asa Hamrah',
    stewardNameFa: 'سهراب فرهمند (همراه ارشد آسا)',
    stewardNameEn: 'Sohrab Farahmand (Senior Asa Steward)',
    parentRecipientFa: 'خانم توران راد و آقای مهندس راد',
    parentRecipientEn: 'Mrs. Touran Rad & Mr. Rad',
    neighborhoodFa: 'زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴',
    neighborhoodEn: 'Zafaranieh, Moghadass Ardebili St, No. 24',
    parentComfortSummaryFa:
      'خانم توران راد بسیار خوش‌رو و پرانرژی بودند. خریدها از نانوایی سنگک سنتی زعفرانیه و میوه‌فروشی درجه یک محله انجام شد و تمامی اقلام در طبقات میانی یخچال چیده شد تا نیازی به خم شدن نباشد.',
    parentComfortSummaryEn:
      'Mrs. Touran Rad was in great spirits. Fresh Sangak bread and Grade-A orchard fruits were sourced locally and arranged on the middle refrigerator shelves for effortless reach.',
    completedChecklistFa: [
      'تحویل ۲ عدد نان سنگک خشخاشی تازه و داغ',
      'ضدعفونی و چیدمان میوه‌های دست‌چین دماوند در طبقه میانی یخچال',
      'تحویل بسته‌های کم‌نمک قورمه‌سبزی آسا خوراک با برچسب تاریخ مصرف',
      'تطبیق ۱۰۰٪ فاکتور رسمی چاپی فروشگاه بدون هیچ‌گونه افزایش قیمت',
    ],
    completedChecklistEn: [
      'Delivered 2 hot sesame Sangak flatbreads from local bakery',
      'Sanitized and arranged hand-picked Damavand fruits on middle fridge shelf',
      'Placed dated low-sodium Asa Khoraak meal trays inside refrigerator',
      'Verified 100% official store receipt match ($0 markup)',
    ],
    storeReceiptTotalUsd: 44,
    asaServiceFeeUsd: 18,
    fridgeOrganizationNoteFa:
      'طبقات یخچال دستمال‌کشی شد، میوه‌های تاریخ گذشته قبلی با اجازه مادر جدا گردید و بسته‌های غذایی روزهای شنبه تا دوشنبه به ترتیب چیده شدند.',
    fridgeOrganizationNoteEn:
      'Refrigerator shelves wiped clean, older produce rotated out with permission, and Saturday–Monday meal containers organized in sequence.',
  },
  {
    id: 'rep-02',
    referenceCode: 'ASA-841092',
    visitDateFa: '۳ روز پیش · سه‌شنبه',
    visitDateEn: '3 Days Ago · Tuesday',
    arrivalDepartureTime: '09:30 – 12:20 IRST',
    pillar: 'Asa Pezeshk',
    stewardNameFa: 'دکتر آرمان نوری و رکسانا بختیاری',
    stewardNameEn: 'Dr. Arman Nouri & Roxana Bakhtiari',
    parentRecipientFa: 'خانم توران راد',
    parentRecipientEn: 'Mrs. Touran Rad',
    neighborhoodFa: 'زعفرانیه ← کلینیک تخصصی بیمارستان جم',
    neighborhoodEn: 'Zafaranieh → Jam Hospital Specialty Clinic',
    parentComfortSummaryFa:
      'همراهی کامل از درب منزل در زعفرانیه تا کلینیک قلب و چشم‌پزشکی بیمارستان جم انجام شد. نوبت از قبل هماهنگ شده بود و زمان انتظار کمتر از ۱۰ دقیقه بود. پزشک متخصص از کنترل فشار خون کاملاً ابراز رضایت کردند.',
    parentComfortSummaryEn:
      'Door-to-door accompaniment from Zafaranieh to Jam Hospital Clinic. Wait time was under 10 minutes due to pre-registration. The cardiologist confirmed blood pressure levels are well-controlled.',
    completedChecklistFa: [
      'استقبال درب منزل و همراهی محترمانه تا داخل بخش تخصصی بیمارستان جم',
      'ثبت دقیق توصیه‌های پزشک متخصص و دریافت نسخه داروخانه بیمارستان',
      'بازگشت امن به منزل و تنظیم یادآور هفتگی داروها روی میز کناری',
      'ارسال تصویر خلاصه پرونده ویزیت و قبض رسمی کلینیک برای فرزند در تورنتو',
    ],
    completedChecklistEn: [
      'Door-to-door escort from residence to Jam Hospital specialty department',
      'Documented physician notes and collected pharmacy prescription',
      'Safe return home and organized weekly pill organizer box',
      'Sent clinic visit summary and official receipt to family in Toronto',
    ],
    storeReceiptTotalUsd: 38,
    asaServiceFeeUsd: 52,
    fridgeOrganizationNoteFa:
      'نسخه چاپی برنامه دارویی و شماره تماس مستقیم همراه آسا روی درب یخچال نصب گردید.',
    fridgeOrganizationNoteEn:
      'Printed medication schedule and direct Asa steward contact card placed on the refrigerator door.',
  },
  {
    id: 'rep-03',
    referenceCode: 'ASA-836410',
    visitDateFa: 'هفته گذشته · پنج‌شنبه',
    visitDateEn: 'Last Week · Thursday',
    arrivalDepartureTime: '16:00 – 17:15 IRST',
    pillar: 'Asa Khoraak',
    stewardNameFa: 'سرآشپز داریوش کاویانی و رکسانا بختیاری',
    stewardNameEn: 'Chef Dariush Kaviani & Roxana Bakhtiari',
    parentRecipientFa: 'خانم توران راد و آقای مهندس راد',
    parentRecipientEn: 'Mrs. Touran Rad & Mr. Rad',
    neighborhoodFa: 'زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴',
    neighborhoodEn: 'Zafaranieh, Moghadass Ardebili St, No. 24',
    parentComfortSummaryFa:
      'پکیج ۵ روزه «آسا خوراک» ویژه رژیم کم‌نمک و کم‌چرب به همراه کارت تبریک خوشنویسی در پاکت طلاکوب تحویل شد. پیام صوتی ۳۰ ثانیه‌ای فرزند نیز برای والدین پخش گردید که بسیار موجب خوشحالی ایشان شد.',
    parentComfortSummaryEn:
      'Delivered the 5-day low-sodium Asa Khoraak meal package along with the gold-embossed calligraphy card and played the 30-second family voice message for the parents.',
    completedChecklistFa: [
      'تحویل ۵ وعده غذای خانگی کم‌نمک (قورمه‌سبزی، جوجه‌کباب زعفرانی، سوپ جو، سالمون تنوری)',
      'تقدیم کارت خوشنویسی در پاکت طلاکوب و پخش پیام صوتی فرزند',
      'بررسی دمای یخچال و چیدمان ظروف شیشه‌ای مدرج با برچسب روزهای هفته',
    ],
    completedChecklistEn: [
      'Delivered 5 low-sodium home-style Persian meals in dated glass containers',
      'Presented gold-embossed calligraphy greeting card & played voice note',
      'Verified refrigerator temperature and arranged labeled weekday meal trays',
    ],
    storeReceiptTotalUsd: 64,
    asaServiceFeeUsd: 24,
    fridgeOrganizationNoteFa:
      'تمامی ظروف با برچسب درشت فارسی (شنبه تا چهارشنبه) و دستور گرم کردن ۲ دقیقه‌ای در طبقه دوم یخچال قرار گرفتند.',
    fridgeOrganizationNoteEn:
      'All containers labeled in large Farsi print (Saturday–Wednesday) with 2-minute reheating instructions on the second shelf.',
  },
];

interface StewardMapCheckpoint {
  id: string;
  stepNumber: number;
  titleFa: string;
  titleEn: string;
  locationFa: string;
  locationEn: string;
  timeLabel: string;
  etaLabelFa: string;
  etaLabelEn: string;
  coords: string;
  svgX: number;
  svgY: number;
  statusDetailFa: string;
  statusDetailEn: string;
}

const STEWARD_MAP_CHECKPOINTS: StewardMapCheckpoint[] = [
  {
    id: 'cp-1',
    stepNumber: 1,
    titleFa: 'مرکز اعزام آسا (شمیرانات / زعفرانیه)',
    titleEn: 'Asa Dispatch Hub (Zafaranieh)',
    locationFa: 'زعفرانیه، میدان آصف، مرکز هماهنگی همراهان آسا',
    locationEn: 'Zafaranieh, Assef Sq, Asa Steward Operations Hub',
    timeLabel: '09:45 IRST',
    etaLabelFa: '۳۵ دقیقه تا منزل والدین',
    etaLabelEn: '35 mins to Parents’ Residence',
    coords: '35.8091° N, 51.4112° E',
    svgX: 145,
    svgY: 95,
    statusDetailFa:
      'کنترل چک‌لیست پرونده والدین (رژیم کم‌نمک و لیست فروشگاه‌های منتخب محله) پیش از حرکت.',
    statusDetailEn:
      'Reviewed Parent Care Profile (low-sodium preferences & neighborhood grocers) prior to departure.',
  },
  {
    id: 'cp-2',
    stepNumber: 2,
    titleFa: 'نانوایی سنگک و فروشگاه منتخب محله',
    titleEn: 'Selected Local Sangak Bakery & Market',
    locationFa: 'خیابان ولیعصر، بالاتر از چهارراه پارک‌وی و بازارچه زعفرانیه',
    locationEn: 'Valiasr Ave & Zafaranieh Traditional Market',
    timeLabel: '10:15 IRST',
    etaLabelFa: '۲۰ دقیقه تا منزل والدین',
    etaLabelEn: '20 mins to Parents’ Residence',
    coords: '35.7988° N, 51.4148° E',
    svgX: 280,
    svgY: 165,
    statusDetailFa:
      'خرید میوه‌های دست‌چین و نان سنگک تازه با دریافت فاکتور رسمی چاپی فروشگاه (۰٪ سود کالا).',
    statusDetailEn:
      'Hand-picked ripe orchard fruits & fresh Sangak bread with official printed store receipt (0% markup).',
  },
  {
    id: 'cp-3',
    stepNumber: 3,
    titleFa: 'در مسیر حرکت به سمت منزل والدین',
    titleEn: 'En Route to Parents’ Residence',
    locationFa: 'خیابان مقدس اردبیلی، نرسیده به پسیان (همراه در مسیر)',
    locationEn: 'Moghadass Ardebili Ave, approaching Pesyan St',
    timeLabel: '10:34 IRST',
    etaLabelFa: '۱۲ دقیقه تا رسیدن به درب منزل',
    etaLabelEn: '12 mins ETA to Front Door',
    coords: '35.8042° N, 51.4178° E',
    svgX: 435,
    svgY: 130,
    statusDetailFa:
      'تماس تلفنی هماهنگی ۱۵ دقیقه قبل از رسیدن با منزل خانم توران راد برقرار شد.',
    statusDetailEn:
      'Placed courtesy 15-minute advance phone call to Mrs. Touran Rad’s landline.',
  },
  {
    id: 'cp-4',
    stepNumber: 4,
    titleFa: 'منزل والدین (تحویل و چیدمان در یخچال)',
    titleEn: 'Parents’ Residence (Delivery & Fridge Care)',
    locationFa: 'زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴، طبقه ۳',
    locationEn: 'Zafaranieh, Moghadass Ardebili St, No. 24, Floor 3',
    timeLabel: '10:46 IRST',
    etaLabelFa: 'حضور در منزل و تحویل محترمانه',
    etaLabelEn: 'Arrived at Residence · In-Home Care',
    coords: '35.8068° N, 51.4215° E',
    svgX: 575,
    svgY: 90,
    statusDetailFa:
      'تحویل اقلام، ضدعفونی و چیدمان منظم در یخچال و ارسال گزارش مستند خانواده به همراه تصویر فاکتور.',
    statusDetailEn:
      'Sanitizing and organizing groceries in the refrigerator and dispatching the Factual Family Update.',
  },
];

export const INITIAL_REGISTERED_USERS: RegisteredFamilyUser[] = [
  {
    id: 'usr-kaveh',
    fullName: 'دکتر کاوه راد (Dr. Kaveh Rad)',
    email: 'kaveh.rad@utoronto.ca',
    phoneOrWhatsapp: '+1 (416) 555-0194',
    countryOfResidence: 'Toronto, Canada',
    role: 'family_member',
    membershipTier: 'Gold',
    verifiedStatus: 'verified',
    createdAt: '2025-01-12',
    parentProfile: {
      parentNames: 'خانم توران راد و آقای مهندس راد',
      tehranZoneId: 'zn-01',
      residenceAddress: 'زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴، طبقه ۳',
      preferredLocalGrocers:
        'نانوایی سنگک سنتی زعفرانیه · میوه‌فروشی درجه یک مقدس اردبیلی · لبنیات لیقوان',
      favoriteFruitsAndRipeness:
        'سیب زرد و قرمز دماوند (نرم و شیرین)، گلابی رسیده، پرتقال تامسون بدون هسته',
      dietarySodiumSugarLimits: [
        'کم‌نمک (مناسب فشار خون)',
        'کم‌قند / مناسب دیابت',
        'بافت نرم و زودهضم',
      ],
      preferredDoctorsAndClinics:
        'بیمارستان جم (دکتر سعیدی - قلب و عروق) · کلینیک تخصصی چشم‌پزشکی ونک',
      doorbellAndCallProtocol:
        'تماس با تلفن ثابت منزل ۱۵ دقیقه قبل از رسیدن · چیدمان کامل در یخچال',
    },
    adminNotes: 'اشتراک طلایی فعال · ارسال هفتگی شنبه‌ها ساعت ۱۰ صبح',
  },
  {
    id: 'usr-sara',
    fullName: 'سارا معتمدی (Sara Motamedi)',
    email: 'sara.motamedi@ucl.ac.uk',
    phoneOrWhatsapp: '+44 7700 900412',
    countryOfResidence: 'London, United Kingdom',
    role: 'family_member',
    membershipTier: 'Royal VIP',
    verifiedStatus: 'verified',
    createdAt: '2025-02-03',
    parentProfile: {
      parentNames: 'آقای دکتر منوچهر معتمدی',
      tehranZoneId: 'zn-02',
      residenceAddress: 'الهیه، خیابان فرشته، کوچه چناران، پلاک ۱۲',
      preferredLocalGrocers: 'هایپراستار جماران · نانوایی سنگک فرشته',
      favoriteFruitsAndRipeness: 'انار دماوند، سیب سبز، سبزی خوردن تازه پاک‌شده',
      dietarySodiumSugarLimits: ['دوستدار قلب و امگا-۳ (کم‌چرب)', 'کم‌نمک (مناسب فشار خون)'],
      preferredDoctorsAndClinics: 'بیمارستان دی (کلینیک ارتوپدی و فیزیوتراپی)',
      doorbellAndCallProtocol: 'هماهنگی با سرایدار ساختمان (آقای رحیمی) پیش از ورود',
    },
    adminNotes: 'اشتراک رویال خانواده · حساس به تازگی ماهی سالمون و سبزیجات',
  },
  {
    id: 'usr-admin',
    fullName: 'اشکان صحرایی — مدیریت ارشد آسا (Ashkan Sahraee)',
    email: 'ashkan.sahraee@gmail.com',
    phoneOrWhatsapp: '+98 912 000 0000',
    countryOfResidence: 'Tehran / International Executive Desk',
    role: 'admin_steward',
    membershipTier: 'Royal VIP',
    verifiedStatus: 'verified',
    createdAt: '2025-01-01',
    parentProfile: {
      parentNames: 'پرونده نمونه مدیریتی آسا',
      tehranZoneId: 'zn-01',
      residenceAddress: 'تهران، زعفرانیه، مرکز عملیات آسا',
      preferredLocalGrocers: 'تمامی فروشگاه‌های منتخب منطقه ۱ تا ۶ تهران',
      favoriteFruitsAndRipeness: 'درجه یک دست‌چین روز',
      dietarySodiumSugarLimits: ['کم‌نمک (مناسب فشار خون)'],
      preferredDoctorsAndClinics: 'بیمارستان جم، بیمارستان دی، بیمارستان عرفان',
      doorbellAndCallProtocol: 'پروتکل استاندارد تکریم خانواده آسا',
    },
    adminNotes: 'دسترسی کامل مدیریت کل سامانه، سفارش‌ها و درگاه‌های پرداخت',
  },
];

export const INITIAL_BACKDOOR_ORDERS: BackdoorOrderRecord[] = [
  {
    id: 'ord-101',
    referenceCode: 'ASA-849201',
    customerId: 'usr-kaveh',
    customerName: 'دکتر کاوه راد (Toronto)',
    customerEmail: 'kaveh.rad@utoronto.ca',
    recipientName: 'خانم توران راد',
    residenceAddress: 'تهران، زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴',
    deliveryWindow: 'Today · Afternoon Slot (2:00 PM – 5:00 PM)',
    serviceTitles: ['آسا همراه — خرید سفارشی منزل با تطبیق کامل فاکتور'],
    productSummaries: [
      '۲× نان سنگک خشخاشی داغ',
      '۱× خورشت قورمه‌سبزی کم‌نمک آسا خوراک',
      '۱× سبد میوه دست‌چین دماوند',
    ],
    passThroughTotalUsd: 44,
    asaServiceFeeUsd: 18,
    grandTotalUsd: 62,
    gatewayId: 'gateway-intl-card',
    specialInstructions:
      'رژیم کم‌نمک و کم‌چرب · میوه‌ها دست‌چین و رسیده باشند · تماس ۱۵ دقیقه قبل از رسیدن',
    personalMessageCard: 'مادر عزیزم، نوش جانتان باشد. آخر هفته تصویری زنگ می‌زنم.',
    hasVoiceNote: true,
    assignedStewardNameFa: 'سهراب فرهمند (همراه ارشد آسا)',
    assignedStewardNameEn: 'Sohrab Farahmand (Senior Steward)',
    currentStageIndex: 2,
    createdAt: '۱۴۰۵/۰۸/۲۵ · امروز ۰۹:۱۵ صبح',
    createdAtTimestamp: 1763210000000,
  },
  {
    id: 'ord-102',
    referenceCode: 'ASA-841092',
    customerId: 'usr-sara',
    customerName: 'سارا معتمدی (London)',
    customerEmail: 'sara.motamedi@ucl.ac.uk',
    recipientName: 'آقای دکتر منوچهر معتمدی',
    residenceAddress: 'تهران، الهیه، خیابان فرشته، کوچه چناران، پلاک ۱۲',
    deliveryWindow: 'Yesterday · Morning Slot (9:30 AM – 12:30 PM)',
    serviceTitles: [
      'آسا پزشک — همراهی کامل والدین در ویزیت پزشک متخصص',
      'آسا خوراک — پکیج ۳ روزه غذاهای گرم و سلامت خانگی',
    ],
    productSummaries: ['۱× فیله سالمون تنوری کم‌نمک', '۱× پنیر لیقوان و گردوی تویسرکان'],
    passThroughTotalUsd: 38,
    asaServiceFeeUsd: 68,
    grandTotalUsd: 106,
    gatewayId: 'gateway-intl-card',
    specialInstructions: 'همراهی تا کلینیک بیمارستان دی و ارسال گزارش پزشک در واتساپ',
    assignedStewardNameFa: 'دکتر آرمان نوری و رکسانا بختیاری',
    assignedStewardNameEn: 'Dr. Arman Nouri & Roxana Bakhtiari',
    currentStageIndex: 4,
    createdAt: '۱۴۰۵/۰۸/۲۲ · ۳ روز پیش',
    createdAtTimestamp: 1762950000000,
  },
  {
    id: 'ord-103',
    referenceCode: 'ASA-836410',
    customerId: 'usr-kaveh',
    customerName: 'دکتر کاوه راد (Toronto)',
    customerEmail: 'kaveh.rad@utoronto.ca',
    recipientName: 'خانم توران راد و آقای مهندس راد',
    residenceAddress: 'تهران، زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴',
    deliveryWindow: 'Last Thursday · Evening Slot (4:00 PM – 6:30 PM)',
    serviceTitles: ['آسا خوراک — پکیج ۵ روزه غذای خانگی کم‌نمک و بدون روغن صنعتی'],
    productSummaries: [
      '۲× جوجه‌کباب زعفرانی کم‌نمک با برنج هاشمی',
      '۲× سوپ جو و سبزیجات ویژه آسا',
      '۱× گلاب و عرقیات گیاهی کاشان + زعفران قائنات',
    ],
    passThroughTotalUsd: 64,
    asaServiceFeeUsd: 24,
    grandTotalUsd: 88,
    gatewayId: 'gateway-intl-card',
    specialInstructions:
      'ظروف شیشه‌ای با برچسب روزهای هفته در طبقه دوم یخچال چیده شوند.',
    personalMessageCard: 'با آرزوی سلامتی و دل خوش برای پدر و مادر عزیزم.',
    assignedStewardNameFa: 'سرآشپز داریوش کاویانی و رکسانا بختیاری',
    assignedStewardNameEn: 'Chef Dariush Kaviani & Roxana Bakhtiari',
    currentStageIndex: 4,
    createdAt: '۱۴۰۵/۰۸/۱۷ · هفته گذشته',
    createdAtTimestamp: 1762430000000,
  },
  {
    id: 'ord-104',
    referenceCode: 'ASA-824115',
    customerId: 'usr-kaveh',
    customerName: 'دکتر کاوه راد (Toronto)',
    customerEmail: 'kaveh.rad@utoronto.ca',
    recipientName: 'خانم توران راد',
    residenceAddress: 'تهران، زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴',
    deliveryWindow: '3 Weeks Ago · Morning Clinic Accompaniment',
    serviceTitles: [
      'آسا پزشک — همراهی کامل والدین در ویزیت قلب و عروق بیمارستان جم',
      'آسا همراه — دریافت نسخه داروخانه و خرید نان و لبنیات تازه',
    ],
    productSummaries: [
      '۱× ماست چکیده سنتی و شیر تازه پاستوریزه',
      '۱× سبد سبزی خوردن پاک‌شده ارگانیک',
    ],
    passThroughTotalUsd: 31,
    asaServiceFeeUsd: 54,
    grandTotalUsd: 85,
    gatewayId: 'gateway-crypto-transfer',
    specialInstructions:
      'تهیه خلاصه نوار قلب و توصیه‌های دکتر سعیدی برای ارسال به فرزند در کانادا.',
    assignedStewardNameFa: 'دکتر آرمان نوری (هماهنگ‌کننده پزشکی آسا)',
    assignedStewardNameEn: 'Dr. Arman Nouri (Asa Medical Steward)',
    currentStageIndex: 4,
    createdAt: '۱۴۰۵/۰۸/۰۳ · ۳ هفته پیش',
    createdAtTimestamp: 1761220000000,
  },
];

interface AuthProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currency: CurrencyCode;
  currentUser: RegisteredFamilyUser | null;
  registeredUsers: RegisteredFamilyUser[];
  userOrders: BackdoorOrderRecord[];
  onLoginUser: (user: RegisteredFamilyUser) => void;
  onRegisterUser: (newUser: RegisteredFamilyUser) => void;
  onUpdateUser: (updated: RegisteredFamilyUser) => void;
  onLogout: () => void;
  onOpenOrderTracking: (order: BackdoorOrderRecord) => void;
  onOpenAdminDashboard: () => void;
  initialTab?: AuthModalTab;
}

export type AuthModalTab =
  | 'family_dashboard'
  | 'past_orders'
  | 'profile'
  | 'login'
  | 'signup';

export const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  isOpen,
  onClose,
  lang,
  currency,
  currentUser,
  registeredUsers,
  userOrders,
  onLoginUser,
  onRegisterUser,
  onUpdateUser,
  onLogout,
  onOpenOrderTracking,
  onOpenAdminDashboard,
  initialTab,
}) => {
  const { t } = useLocalization();
  const isFa = lang === 'fa';
  const [activeTab, setActiveTab] = useState<AuthModalTab>(
    initialTab || (currentUser ? 'family_dashboard' : 'login')
  );
  const [orderSortDirection, setOrderSortDirection] = useState<'newest' | 'oldest'>(
    'newest'
  );
  const [expandedPastOrderId, setExpandedPastOrderId] = useState<string>('');

  // Sync initialTab when opened
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Family Dashboard Map & Visit History States
  const [activeCheckpointIdx, setActiveCheckpointIdx] = useState<number>(2);
  const [isSimulatingMap, setIsSimulatingMap] = useState<boolean>(true);
  const [visitPillarFilter, setVisitPillarFilter] = useState<
    'ALL' | 'Asa Hamrah' | 'Asa Khoraak' | 'Asa Pezeshk'
  >('ALL');
  const [expandedReportId, setExpandedReportId] = useState<string>('rep-01');

  // Auto-advance mocked Steward GPS position along the Tehran route when simulation is active
  useEffect(() => {
    if (!isOpen || activeTab !== 'family_dashboard' || !isSimulatingMap) return;
    const timer = window.setInterval(() => {
      setActiveCheckpointIdx((prev) => (prev + 1) % STEWARD_MAP_CHECKPOINTS.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [isOpen, activeTab, isSimulatingMap]);

  // Login State
  const [loginEmail, setLoginEmail] = useState('kaveh.rad@utoronto.ca');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [authFeedback, setAuthFeedback] = useState<string | null>(null);

  // Sign Up State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupCountry, setSignupCountry] = useState('Toronto, Canada');
  const [signupParentNames, setSignupParentNames] = useState('');
  const [signupZoneId, setSignupZoneId] = useState(TEHRAN_SERVICE_ZONES[0].id);
  const [signupParentAddress, setSignupParentAddress] = useState('');
  const [signupParentDiet, setSignupParentDiet] = useState(
    'کم‌نمک (مناسب فشار خون) · میوه‌های دست‌چین و رسیده'
  );
  const [signupParentDoctors, setSignupParentDoctors] = useState('');

  // Editable Profile State when logged in
  const [editParentNames, setEditParentNames] = useState(
    currentUser?.parentProfile.parentNames || ''
  );
  const [editAddress, setEditAddress] = useState(
    currentUser?.parentProfile.residenceAddress || ''
  );
  const [editGrocers, setEditGrocers] = useState(
    currentUser?.parentProfile.preferredLocalGrocers || ''
  );
  const [editDoctors, setEditDoctors] = useState(
    currentUser?.parentProfile.preferredDoctorsAndClinics || ''
  );

  const syncProfileDraft = (u: RegisteredFamilyUser) => {
    setEditParentNames(u.parentProfile.parentNames);
    setEditAddress(u.parentProfile.residenceAddress);
    setEditGrocers(u.parentProfile.preferredLocalGrocers);
    setEditDoctors(u.parentProfile.preferredDoctorsAndClinics);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched =
      registeredUsers.find(
        (u) => u.email.toLowerCase() === loginEmail.trim().toLowerCase()
      ) || registeredUsers[0];
    onLoginUser(matched);
    syncProfileDraft(matched);
    setActiveTab('family_dashboard');
    setAuthFeedback(
      isFa
        ? `خوش آمدید، ${matched.fullName}! داشبورد خانواده و پرونده والدین همگام‌سازی شد.`
        : `Welcome back, ${matched.fullName}!`
    );
    setTimeout(() => setAuthFeedback(null), 3000);
  };

  const handleQuickSwitchAccount = (user: RegisteredFamilyUser) => {
    onLoginUser(user);
    syncProfileDraft(user);
    setActiveTab('family_dashboard');
    setAuthFeedback(
      isFa
        ? `ورود آنی به حساب: ${user.fullName}`
        : `Switched to account: ${user.fullName}`
    );
    setTimeout(() => setAuthFeedback(null), 2500);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim()) return;

    const createdUser: RegisteredFamilyUser = {
      id: `usr-${Date.now()}`,
      fullName: signupName.trim(),
      email: signupEmail.trim(),
      phoneOrWhatsapp: signupPhone.trim() || '+1 (000) 000-0000',
      countryOfResidence: signupCountry.trim() || 'Overseas Diaspora',
      role: 'family_member',
      membershipTier: 'Gold',
      verifiedStatus: 'verified',
      createdAt: new Date().toISOString().slice(0, 10),
      parentProfile: {
        parentNames:
          signupParentNames.trim() || (isFa ? 'والدین گرامی' : 'Beloved Parents'),
        tehranZoneId: signupZoneId,
        residenceAddress:
          signupParentAddress.trim() ||
          (isFa ? 'تهران، منطقه ۱، زعفرانیه' : 'Tehran, District 1, Zafaranieh'),
        preferredLocalGrocers: 'فروشگاه‌های منتخب محله و نانوایی سنگک سنتی',
        favoriteFruitsAndRipeness: signupParentDiet,
        dietarySodiumSugarLimits: ['کم‌نمک (مناسب فشار خون)', 'بافت نرم و زودهضم'],
        preferredDoctorsAndClinics:
          signupParentDoctors.trim() || 'بیمارستان جم / کلینیک تخصصی منطقه ۱',
        doorbellAndCallProtocol: 'تماس تلفنی ۱۵ دقیقه قبل از حضور همراه آسا',
      },
      adminNotes: 'ثبت‌نام آنلاین جدید از طریق پورتال خانواده آسا',
    };

    onRegisterUser(createdUser);
    syncProfileDraft(createdUser);
    setActiveTab('family_dashboard');
    setAuthFeedback(
      isFa
        ? 'حساب کاربری شما و پرونده اختصاصی والدین با موفقیت ایجاد شد!'
        : 'Your Family Account & Parent Profile have been created!'
    );
    setTimeout(() => setAuthFeedback(null), 3500);
  };

  const handleSaveProfileEdits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const updated: RegisteredFamilyUser = {
      ...currentUser,
      parentProfile: {
        ...currentUser.parentProfile,
        parentNames: editParentNames,
        residenceAddress: editAddress,
        preferredLocalGrocers: editGrocers,
        preferredDoctorsAndClinics: editDoctors,
      },
    };
    onUpdateUser(updated);
    setAuthFeedback(
      isFa
        ? 'تغییرات پروفایل شما و پرونده والدین ذخیره شد و به سبد سفارش و پنل مدیریت متصل گردید.'
        : 'Profile & Parent Care Dossier updated across Checkout and Admin Panel.'
    );
    setTimeout(() => setAuthFeedback(null), 3000);
  };

  const stageBadgesFa = [
    '۱. ثبت و هماهنگی تلفنی',
    '۲. تهیه با فاکتور رسمی',
    '۳. اعزام همراه در تهران',
    '۴. حضور و اجرا در منزل',
    '۵. تکمیل و گزارش خانواده',
  ];

  const stageBadgesEn = [
    '1. Intake & Call',
    '2. Store Receipt Sourcing',
    '3. Steward Dispatched',
    '4. In-Home Care',
    '5. Completed & Reported',
  ];

  // Filter backdoorOrders for the currently logged-in user and sort chronologically
  const loggedInUserPastOrders = React.useMemo(() => {
    if (!currentUser) return [];
    const matching =
      currentUser.role === 'admin_steward'
        ? userOrders
        : userOrders.filter(
            (ord) =>
              ord.customerId === currentUser.id ||
              ord.customerEmail.toLowerCase() === currentUser.email.toLowerCase()
          );

    return [...matching].sort((a, b) => {
      const tsA = a.createdAtTimestamp ?? 0;
      const tsB = b.createdAtTimestamp ?? 0;
      return orderSortDirection === 'newest' ? tsB - tsA : tsA - tsB;
    });
  }, [currentUser, userOrders, orderSortDirection]);

  useEffect(() => {
    if (loggedInUserPastOrders.length > 0 && !expandedPastOrderId) {
      setExpandedPastOrderId(loggedInUserPastOrders[0].id);
    }
  }, [loggedInUserPastOrders, expandedPastOrderId]);

  const activeCheckpoint =
    STEWARD_MAP_CHECKPOINTS[activeCheckpointIdx] || STEWARD_MAP_CHECKPOINTS[2];

  const filteredVisitReports = INITIAL_VISIT_REPORTS_HISTORY.filter((rep) =>
    visitPillarFilter === 'ALL' ? true : rep.pillar === visitPillarFilter
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[88] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121614] border-2 border-[#C8A96A]/65 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.95)]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-[#161B18] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('auth.portalBadge')}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-3xl text-[#F5F2EB]">
                  {currentUser
                    ? t('auth.activeMemberTitle', { name: currentUser.fullName })
                    : t('auth.guestTitle')}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {currentUser && (
                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      setActiveTab('login');
                    }}
                    className="px-3 py-2 bg-[#0D0F0E] border border-white/15 hover:border-[#C85A5A] text-xs text-[#9E988E] hover:text-[#C85A5A] flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('auth.signOut')}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 bg-[#0D0F0E] border border-white/15 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-[#0D0F0E] border-b border-white/10 px-5 py-2.5 flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('family_dashboard')}
                className={`px-3.5 py-2 text-xs font-semibold flex items-center gap-2 border cursor-pointer ${
                  activeTab === 'family_dashboard'
                    ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A]'
                    : 'bg-[#151816] text-[#9E988E] border-white/10 hover:text-[#F5F2EB]'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t('auth.tabs.familyDashboard')}</span>
              </button>

              {currentUser && (
                <button
                  type="button"
                  onClick={() => setActiveTab('past_orders')}
                  className={`px-3.5 py-2 text-xs font-semibold flex items-center gap-2 border cursor-pointer ${
                    activeTab === 'past_orders'
                      ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A]'
                      : 'bg-[#151816] text-[#9E988E] border-white/10 hover:text-[#F5F2EB]'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>
                    {t('auth.tabs.pastOrders', {
                      count: loggedInUserPastOrders.length,
                    })}
                  </span>
                </button>
              )}

              {currentUser && (
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`px-3.5 py-2 text-xs font-semibold flex items-center gap-2 border cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A]'
                      : 'bg-[#151816] text-[#9E988E] border-white/10 hover:text-[#F5F2EB]'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t('auth.tabs.profile')}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`px-3.5 py-2 text-xs font-semibold flex items-center gap-2 border cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A]'
                    : 'bg-[#151816] text-[#9E988E] border-white/10 hover:text-[#F5F2EB]'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('auth.tabs.login')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className={`px-3.5 py-2 text-xs font-semibold flex items-center gap-2 border cursor-pointer ${
                  activeTab === 'signup'
                    ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A]'
                    : 'bg-[#151816] text-[#9E988E] border-white/10 hover:text-[#F5F2EB]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{t('auth.tabs.signup')}</span>
              </button>

              {authFeedback && (
                <span className="ms-auto text-xs text-[#8FE3B8] bg-[#2E5A44]/35 border border-[#3E7B5E] px-3 py-1 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C8A96A]" />
                  {authFeedback}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* TAB 0: FAMILY DASHBOARD (MAP-BASED LIVE STEWARD LOCATION + VISIT REPORTS HISTORY) */}
              {activeTab === 'family_dashboard' && (
                <div className="space-y-6">
                  {/* Section 1: Map-Based Live Steward Location View */}
                  <div className="bg-[#151816] border border-[#C8A96A]/50 p-4 sm:p-6 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#C8A96A] font-semibold mb-1">
                          <span className="w-2 h-2 rounded-full bg-[#3E7B5E] animate-ping" />
                          <span>
                            {isFa
                              ? 'موقعیت مکانی زنده همراه آسا روی نقشه تهران (ویژه والدین و اعضای خانواده)'
                              : 'Live Steward GPS Map in Tehran · Designed for Parents & Family Members'}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg sm:text-2xl text-[#F5F2EB]">
                          {isFa
                            ? `همراه اعزامی: سهراب فرهمند ← مقصد: ${
                                currentUser?.parentProfile.residenceAddress ||
                                'زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴'
                              }`
                            : `Active Steward: Sohrab Farahmand → Destination: ${
                                currentUser?.parentProfile.residenceAddress ||
                                'Zafaranieh, Moghadass Ardebili St, No. 24'
                              }`}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsSimulatingMap((prev) => !prev)}
                        className={`px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer self-start sm:self-center ${
                          isSimulatingMap
                            ? 'bg-[#2E5A44]/40 border-[#3E7B5E] text-[#8FE3B8]'
                            : 'bg-[#0D0F0E] border-[#C8A96A]/50 text-[#C8A96A]'
                        }`}
                      >
                        {isSimulatingMap ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>
                              {isFa
                                ? 'شبیه‌سازی زنده فعال (توقف)'
                                : 'Live Simulation On (Pause)'}
                            </span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>
                              {isFa
                                ? 'اجرای حرکت خودکار همراه'
                                : 'Resume Auto-Route'}
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Map & Steward Telemetry Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      {/* Interactive Dark/Gold Tehran District Vector Map (8 Cols) */}
                      <div className="lg:col-span-8 bg-[#0A0D0C] border border-[#C8A96A]/35 relative overflow-hidden p-3 sm:p-4 flex flex-col justify-between min-h-[300px]">
                        {/* Top Map HUD Overlay */}
                        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[11px] bg-[#121614]/90 border border-white/10 px-3 py-2">
                          <span className="text-[#C8A96A] font-mono flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>GPS: {activeCheckpoint.coords}</span>
                          </span>
                          <span className="text-[#8FE3B8] font-semibold">
                            {isFa
                              ? activeCheckpoint.etaLabelFa
                              : activeCheckpoint.etaLabelEn}
                          </span>
                        </div>

                        {/* Interactive SVG Map of Northern Tehran (Shemiranat / Zafaranieh / Valiasr / Elahiyeh) */}
                        <div className="relative my-2">
                          <svg
                            viewBox="0 0 700 260"
                            className="w-full h-52 sm:h-60 select-none"
                          >
                            <defs>
                              <pattern
                                id="tehranGrid"
                                width="35"
                                height="35"
                                patternUnits="userSpaceOnUse"
                              >
                                <path
                                  d="M 35 0 L 0 0 0 35"
                                  fill="none"
                                  stroke="rgba(200,169,106,0.08)"
                                  strokeWidth="1"
                                />
                              </pattern>
                              <linearGradient
                                id="routeGoldLine"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#3E7B5E" />
                                <stop offset="50%" stopColor="#C8A96A" />
                                <stop offset="100%" stopColor="#E8D19A" />
                              </linearGradient>
                            </defs>

                            {/* Architectural Grid Background */}
                            <rect
                              width="700"
                              height="260"
                              fill="url(#tehranGrid)"
                            />

                            {/* Alborz Tochal Foothills Contour Lines (North) */}
                            <path
                              d="M 0 32 Q 180 12, 350 28 T 700 20"
                              fill="none"
                              stroke="rgba(200,169,106,0.18)"
                              strokeWidth="1.2"
                              strokeDasharray="4 4"
                            />
                            <text
                              x="350"
                              y="18"
                              textAnchor="middle"
                              fill="#9E988E"
                              fontSize="9"
                              opacity="0.65"
                            >
                              {isFa
                                ? 'دامنه‌های البرز · شمیرانات و منطقه ۱ تهران'
                                : 'Alborz Foothills · District 1 Shemiranat'}
                            </text>

                            {/* Secondary Tehran Arterial Streets (Valiasr, Chamran, Modarres, Fereshteh) */}
                            <path
                              d="M 90 250 L 240 40 M 480 250 L 530 35 M 20 195 Q 320 175, 680 190"
                              fill="none"
                              stroke="rgba(255,255,255,0.07)"
                              strokeWidth="6"
                              strokeLinecap="round"
                            />

                            {/* Neighborhood Labels */}
                            <text
                              x="120"
                              y="65"
                              fill="#9E988E"
                              fontSize="10"
                              opacity="0.75"
                            >
                              {isFa ? 'ولنجک / آصف' : 'Velenjak / Assef'}
                            </text>
                            <text
                              x="275"
                              y="215"
                              fill="#9E988E"
                              fontSize="10"
                              opacity="0.75"
                            >
                              {isFa ? 'چهارراه پارک‌وی / ولیعصر' : 'Parkway / Valiasr'}
                            </text>
                            <text
                              x="435"
                              y="72"
                              fill="#9E988E"
                              fontSize="10"
                              opacity="0.75"
                            >
                              {isFa ? 'مقدس اردبیلی' : 'Moghadass Ardebili'}
                            </text>
                            <text
                              x="585"
                              y="150"
                              fill="#9E988E"
                              fontSize="10"
                              opacity="0.75"
                            >
                              {isFa ? 'الهیه و فرشته' : 'Elahiyeh & Fereshteh'}
                            </text>

                            {/* Full Planned Steward Route Path (Dashed Base) */}
                            <path
                              d="M 145 95 C 200 130, 235 165, 280 165 C 340 165, 385 140, 435 130 C 495 118, 535 100, 575 90"
                              fill="none"
                              stroke="rgba(200,169,106,0.28)"
                              strokeWidth="3"
                              strokeDasharray="6 6"
                            />

                            {/* Active Highlighted Route Path */}
                            <path
                              d="M 145 95 C 200 130, 235 165, 280 165 C 340 165, 385 140, 435 130 C 495 118, 535 100, 575 90"
                              fill="none"
                              stroke="url(#routeGoldLine)"
                              strokeWidth="3.5"
                            />

                            {/* Checkpoint Nodes on Map */}
                            {STEWARD_MAP_CHECKPOINTS.map((cp, idx) => {
                              const isCurrent = idx === activeCheckpointIdx;
                              const isCompleted = idx <= activeCheckpointIdx;
                              return (
                                <g
                                  key={cp.id}
                                  onClick={() => {
                                    setIsSimulatingMap(false);
                                    setActiveCheckpointIdx(idx);
                                  }}
                                  className="cursor-pointer"
                                >
                                  {isCurrent && (
                                    <circle
                                      cx={cp.svgX}
                                      cy={cp.svgY}
                                      r="22"
                                      fill="rgba(200,169,106,0.22)"
                                    />
                                  )}
                                  <circle
                                    cx={cp.svgX}
                                    cy={cp.svgY}
                                    r={isCurrent ? '10' : '7'}
                                    fill={
                                      isCurrent
                                        ? '#C8A96A'
                                        : isCompleted
                                        ? '#3E7B5E'
                                        : '#151816'
                                    }
                                    stroke="#F5F2EB"
                                    strokeWidth="2"
                                  />
                                  <text
                                    x={cp.svgX}
                                    y={cp.svgY + 24}
                                    textAnchor="middle"
                                    fill={isCurrent ? '#C8A96A' : '#D8D2C5'}
                                    fontSize="10"
                                    fontWeight={isCurrent ? 'bold' : 'normal'}
                                  >
                                    {isFa ? `ایستگاه ${cp.stepNumber}` : `Stop ${cp.stepNumber}`}
                                  </text>
                                </g>
                              );
                            })}

                            {/* Animated Steward Live Marker */}
                            <g
                              transform={`translate(${activeCheckpoint.svgX}, ${activeCheckpoint.svgY})`}
                            >
                              <circle
                                cx="0"
                                cy="-24"
                                r="14"
                                fill="#0D0F0E"
                                stroke="#C8A96A"
                                strokeWidth="2"
                              />
                              <text
                                x="0"
                                y="-20"
                                textAnchor="middle"
                                fill="#C8A96A"
                                fontSize="10"
                                fontWeight="bold"
                              >
                                ASA
                              </text>
                            </g>
                          </svg>
                        </div>

                        {/* Interactive Checkpoint Selector Pills Below Map */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
                          {STEWARD_MAP_CHECKPOINTS.map((cp, idx) => {
                            const active = idx === activeCheckpointIdx;
                            return (
                              <button
                                key={cp.id}
                                type="button"
                                onClick={() => {
                                  setIsSimulatingMap(false);
                                  setActiveCheckpointIdx(idx);
                                }}
                                className={`p-2 text-start border text-[11px] transition-all cursor-pointer ${
                                  active
                                    ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-[#F5F2EB]'
                                    : 'bg-[#121614] border-white/10 text-[#9E988E] hover:border-white/25'
                                }`}
                              >
                                <div className="flex items-center justify-between font-mono text-[10px] text-[#C8A96A]">
                                  <span>
                                    {isFa ? `مرحله ${cp.stepNumber}` : `Step ${cp.stepNumber}`}
                                  </span>
                                  <span>{cp.timeLabel}</span>
                                </div>
                                <p className="font-semibold truncate mt-0.5">
                                  {isFa ? cp.titleFa : cp.titleEn}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Steward Telemetry & Parent Reassurance Card (4 Cols) */}
                      <div className="lg:col-span-4 bg-[#0D0F0E] border border-white/10 p-4 flex flex-col justify-between space-y-4 text-xs">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                            <span className="text-[#C8A96A] font-semibold">
                              {isFa
                                ? 'جزئیات لحظه‌ای مسیر همراه'
                                : 'Live Steward Status'}
                            </span>
                            <span className="px-2 py-0.5 bg-[#2E5A44]/40 border border-[#3E7B5E] text-[#8FE3B8] text-[10px] font-mono">
                              {activeCheckpoint.timeLabel}
                            </span>
                          </div>

                          <div>
                            <span className="text-[#9E988E] text-[11px] block">
                              {isFa ? 'موقعیت فعلی:' : 'Current Location:'}
                            </span>
                            <p className="text-[#F5F2EB] font-semibold mt-0.5">
                              {isFa
                                ? activeCheckpoint.locationFa
                                : activeCheckpoint.locationEn}
                            </p>
                          </div>

                          <div className="bg-[#151816] border border-[#C8A96A]/30 p-3 space-y-1">
                            <span className="text-[11px] text-[#C8A96A] font-semibold block">
                              {isFa
                                ? 'گزارش اقدام در این ایستگاه:'
                                : 'Action at Current Stop:'}
                            </span>
                            <p className="text-[#D8D2C5] leading-relaxed">
                              {isFa
                                ? activeCheckpoint.statusDetailFa
                                : activeCheckpoint.statusDetailEn}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="bg-[#151816] p-2.5 border border-white/5">
                              <span className="text-[#9E988E] block">
                                {isFa ? 'کد امنیتی ورود:' : 'Security PIN:'}
                              </span>
                              <span className="font-mono text-[#C8A96A] font-bold">
                                ASA-4829
                              </span>
                            </div>
                            <div className="bg-[#151816] p-2.5 border border-white/5">
                              <span className="text-[#9E988E] block">
                                {isFa ? 'دمای باکس غذا:' : 'Thermal Box:'}
                              </span>
                              <span className="font-mono text-[#8FE3B8]">
                                65°C / 4°C
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-[#9E988E] flex items-center gap-1">
                              <PhoneCall className="w-3.5 h-3.5 text-[#C8A96A]" />
                              <span>
                                {isFa ? 'خط مستقیم همراه:' : 'Steward Direct:'}
                              </span>
                            </span>
                            <span className="font-mono text-[#F5F2EB]">
                              +98 912 345 6789
                            </span>
                          </div>
                          {userOrders[0] && (
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                onOpenOrderTracking(userOrders[0]);
                              }}
                              className="w-full py-2 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] font-bold text-xs uppercase tracking-wider cursor-pointer"
                            >
                              {isFa
                                ? 'مشاهده تایم‌لاین ۵ مرحله‌ای سفارش'
                                : 'Open Full 5-Stage Order Tracker'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: History of Previous Visit Reports for Parents & Family Members */}
                  <div className="bg-[#151816] border border-white/10 p-4 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#C8A96A] font-semibold mb-1">
                          <FileCheck2 className="w-3.5 h-3.5" />
                          <span>
                            {isFa
                              ? 'آرشیو گزارش‌های مستند دیدارهای قبلی با والدین (Visit Reports History)'
                              : 'Documented History of Previous Steward Visits & Fridge Care'}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg sm:text-2xl text-[#F5F2EB]">
                          {isFa
                            ? 'گزارش‌های واقعی، ساعت حضور، چیدمان یخچال و فاکتور رسمی'
                            : 'Past Visit Logs, Arrival Times, Fridge Organization & Store Receipts'}
                        </h4>
                      </div>

                      {/* Filter Pills */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {(
                          [
                            { id: 'ALL', fa: 'همه دیدارها', en: 'All Visits' },
                            { id: 'Asa Hamrah', fa: 'آسا همراه', en: 'Asa Hamrah' },
                            { id: 'Asa Pezeshk', fa: 'آسا پزشک', en: 'Asa Pezeshk' },
                            { id: 'Asa Khoraak', fa: 'آسا خوراک', en: 'Asa Khoraak' },
                          ] as const
                        ).map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setVisitPillarFilter(f.id)}
                            className={`px-3 py-1.5 text-[11px] border cursor-pointer transition-colors ${
                              visitPillarFilter === f.id
                                ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] font-bold'
                                : 'bg-[#0D0F0E] text-[#9E988E] border-white/10 hover:text-[#F5F2EB]'
                            }`}
                          >
                            {isFa ? f.fa : f.en}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Visit Report Cards */}
                    <div className="space-y-3">
                      {filteredVisitReports.map((rep) => {
                        const isExpanded = expandedReportId === rep.id;
                        return (
                          <div
                            key={rep.id}
                            className={`bg-[#0D0F0E] border transition-all p-4 sm:p-5 ${
                              isExpanded
                                ? 'border-[#C8A96A]/65 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                                : 'border-white/10 hover:border-white/25'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <span className="font-mono text-[#C8A96A] font-bold">
                                    {rep.referenceCode}
                                  </span>
                                  <span className="px-2 py-0.5 bg-[#151816] border border-[#C8A96A]/35 text-[#C8A96A] text-[10px]">
                                    {rep.pillar}
                                  </span>
                                  <span className="text-[#9E988E] flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>
                                      {isFa ? rep.visitDateFa : rep.visitDateEn}
                                    </span>
                                  </span>
                                  <span className="text-[#8FE3B8] font-mono text-[11px] flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{rep.arrivalDepartureTime}</span>
                                  </span>
                                </div>

                                <p className="text-sm font-semibold text-[#F5F2EB]">
                                  {isFa
                                    ? `${rep.parentRecipientFa} — ${rep.neighborhoodFa}`
                                    : `${rep.parentRecipientEn} — ${rep.neighborhoodEn}`}
                                </p>
                                <p className="text-xs text-[#9E988E]">
                                  {isFa
                                    ? `همراه اعزامی: ${rep.stewardNameFa}`
                                    : `Assigned Steward: ${rep.stewardNameEn}`}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                                <div className="text-end me-2">
                                  <span className="text-[10px] text-[#9E988E] block">
                                    {isFa ? 'فاکتور رسمی + خدمت:' : 'Receipt + Service:'}
                                  </span>
                                  <span className="font-mono text-xs text-[#C8A96A] font-bold">
                                    {
                                      formatPrice(
                                        rep.storeReceiptTotalUsd + rep.asaServiceFeeUsd,
                                        lang,
                                        '',
                                        '',
                                        currency
                                      ).amount
                                    }
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedReportId(isExpanded ? '' : rep.id)
                                  }
                                  className="px-3 py-2 bg-[#151816] border border-[#C8A96A]/45 hover:bg-[#C8A96A] hover:text-[#0D0F0E] text-[#C8A96A] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>
                                    {isExpanded
                                      ? isFa
                                        ? 'بستن جزئیات'
                                        : 'Hide Details'
                                      : isFa
                                      ? 'مشاهده گزارش کامل'
                                      : 'View Full Report'}
                                  </span>
                                </button>
                              </div>
                            </div>

                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs"
                              >
                                <div className="lg:col-span-7 space-y-3">
                                  <div className="bg-[#151816] border border-white/10 p-3.5 space-y-1.5">
                                    <span className="text-[#C8A96A] font-semibold block">
                                      {isFa
                                        ? 'گزارش وضعیت آسایش والدین و مشاهدات همراه:'
                                        : 'Parent Comfort & Steward Observation:'}
                                    </span>
                                    <p className="text-[#F5F2EB]/90 leading-relaxed">
                                      {isFa
                                        ? rep.parentComfortSummaryFa
                                        : rep.parentComfortSummaryEn}
                                    </p>
                                  </div>

                                  <div className="bg-[#151816] border border-[#3E7B5E]/40 p-3.5 space-y-1.5">
                                    <span className="text-[#8FE3B8] font-semibold block">
                                      {isFa
                                        ? 'گزارش چیدمان یخچال و یادآورهای منزل:'
                                        : 'Refrigerator Organization & Home Care Note:'}
                                    </span>
                                    <p className="text-[#D8D2C5] leading-relaxed">
                                      {isFa
                                        ? rep.fridgeOrganizationNoteFa
                                        : rep.fridgeOrganizationNoteEn}
                                    </p>
                                  </div>
                                </div>

                                <div className="lg:col-span-5 bg-[#151816] border border-white/10 p-3.5 flex flex-col justify-between space-y-3">
                                  <div className="space-y-2">
                                    <span className="text-[#C8A96A] font-semibold block">
                                      {isFa
                                        ? 'چک‌لیست اقدامات انجام‌شده در این دیدار:'
                                        : 'Completed Visit Checklist:'}
                                    </span>
                                    <ul className="space-y-1.5">
                                      {(isFa
                                        ? rep.completedChecklistFa
                                        : rep.completedChecklistEn
                                      ).map((item, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-start gap-2 text-[#D8D2C5]"
                                        >
                                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7B5E] shrink-0 mt-0.5" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                                    <span className="text-[#9E988E]">
                                      {isFa
                                        ? `فاکتور فروشگاه (۰٪ سود): ${
                                            formatPrice(
                                              rep.storeReceiptTotalUsd,
                                              lang,
                                              '',
                                              '',
                                              currency
                                            ).amount
                                          }`
                                        : `Store Receipt (0% Markup): ${
                                            formatPrice(
                                              rep.storeReceiptTotalUsd,
                                              lang,
                                              '',
                                              '',
                                              currency
                                            ).amount
                                          }`}
                                    </span>
                                    <span className="text-[#C8A96A] font-mono">
                                      {isFa
                                        ? `اجرت خدمت آسا: ${
                                            formatPrice(
                                              rep.asaServiceFeeUsd,
                                              lang,
                                              '',
                                              '',
                                              currency
                                            ).amount
                                          }`
                                        : `Asa Service Fee: ${
                                            formatPrice(
                                              rep.asaServiceFeeUsd,
                                              lang,
                                              '',
                                              '',
                                              currency
                                            ).amount
                                          }`}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 0.5: CHRONOLOGICAL PAST ORDERS HISTORY FOR LOGGED-IN USER (FETCHED FROM backdoorOrders) */}
              {activeTab === 'past_orders' && currentUser && (
                <div className="space-y-5">
                  {/* Header & Chronological Sort Control */}
                  <div className="bg-[#151816] border border-[#C8A96A]/45 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold mb-1">
                        <History className="w-4 h-4" />
                        <span>{t('auth.pastOrders.title')}</span>
                      </div>
                      <p className="text-xs text-[#9E988E]">
                        {t('auth.pastOrders.subtitle')}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setOrderSortDirection((prev) =>
                          prev === 'newest' ? 'oldest' : 'newest'
                        )
                      }
                      className="px-3.5 py-2 bg-[#0D0F0E] border border-[#C8A96A]/50 hover:border-[#C8A96A] text-xs text-[#C8A96A] font-semibold flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-center"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5" />
                      <span>
                        {orderSortDirection === 'newest'
                          ? t('auth.pastOrders.newestFirst')
                          : t('auth.pastOrders.oldestFirst')}
                      </span>
                    </button>
                  </div>

                  {/* Summary Metrics Row for Logged-in User's Historical Orders */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[#151816] border border-white/10 p-4">
                      <span className="text-[11px] text-[#9E988E] block">
                        {isFa ? 'تعداد کل سفارش‌های تاریخی:' : 'Total Historical Orders:'}
                      </span>
                      <span className="font-mono text-2xl text-[#C8A96A] font-bold">
                        {isFa
                          ? loggedInUserPastOrders.length.toLocaleString('fa-IR')
                          : loggedInUserPastOrders.length}
                      </span>
                    </div>
                    <div className="bg-[#151816] border border-white/10 p-4">
                      <span className="text-[11px] text-[#9E988E] block">
                        {t('auth.pastOrders.passThroughGoods')}:
                      </span>
                      <span className="font-mono text-2xl text-[#8FE3B8] font-bold">
                        {
                          formatPrice(
                            loggedInUserPastOrders.reduce(
                              (sum, o) => sum + o.passThroughTotalUsd,
                              0
                            ),
                            lang,
                            '',
                            '',
                            currency
                          ).amount
                        }
                      </span>
                    </div>
                    <div className="bg-[#151816] border border-white/10 p-4">
                      <span className="text-[11px] text-[#9E988E] block">
                        {isFa ? 'مجموع هزینه کل دوره‌ها:' : 'Cumulative Order Total:'}
                      </span>
                      <span className="font-mono text-2xl text-[#F5F2EB] font-bold">
                        {
                          formatPrice(
                            loggedInUserPastOrders.reduce(
                              (sum, o) => sum + o.grandTotalUsd,
                              0
                            ),
                            lang,
                            '',
                            '',
                            currency
                          ).amount
                        }
                      </span>
                    </div>
                  </div>

                  {/* Chronological Orders List */}
                  {loggedInUserPastOrders.length === 0 ? (
                    <div className="bg-[#151816] border border-white/10 p-8 text-center text-xs text-[#9E988E]">
                      {t('auth.pastOrders.emptyState')}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {loggedInUserPastOrders.map((ord, idx) => {
                        const isExpanded = expandedPastOrderId === ord.id;
                        const allItemsCount =
                          ord.serviceTitles.length + ord.productSummaries.length;

                        return (
                          <div
                            key={ord.id}
                            className={`bg-[#151816] border transition-all ${
                              isExpanded
                                ? 'border-[#C8A96A] shadow-[0_12px_32px_rgba(0,0,0,0.65)]'
                                : 'border-white/10 hover:border-[#C8A96A]/45'
                            }`}
                          >
                            {/* Order Summary Header Row */}
                            <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <span className="w-6 h-6 rounded-full bg-[#C8A96A]/20 border border-[#C8A96A] text-[#C8A96A] font-mono text-[11px] font-bold flex items-center justify-center">
                                    {isFa
                                      ? (idx + 1).toLocaleString('fa-IR')
                                      : idx + 1}
                                  </span>
                                  <span className="font-mono text-sm text-[#C8A96A] font-bold">
                                    {ord.referenceCode}
                                  </span>
                                  <span className="px-2 py-0.5 bg-[#0D0F0E] border border-white/10 text-[#D8D2C5] text-[11px] flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-[#C8A96A]" />
                                    <span>{ord.createdAt}</span>
                                  </span>
                                  <span className="px-2.5 py-0.5 bg-[#2E5A44]/40 border border-[#3E7B5E] text-[#8FE3B8] text-[11px]">
                                    {isFa
                                      ? stageBadgesFa[ord.currentStageIndex]
                                      : stageBadgesEn[ord.currentStageIndex]}
                                  </span>
                                </div>

                                <p className="text-sm font-semibold text-[#F5F2EB]">
                                  {ord.recipientName} — {ord.residenceAddress}
                                </p>
                                <p className="text-xs text-[#9E988E]">
                                  {isFa
                                    ? `همراه مسئول: ${ord.assignedStewardNameFa} · ${allItemsCount.toLocaleString(
                                        'fa-IR'
                                      )} مورد خدمت و کالا`
                                    : `Steward: ${ord.assignedStewardNameEn} · ${allItemsCount} service(s) & items`}
                                </p>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 shrink-0 self-start lg:self-center">
                                <div className="text-start sm:text-end me-1">
                                  <span className="text-[10px] text-[#9E988E] block">
                                    {t('auth.pastOrders.totalCost')}:
                                  </span>
                                  <span className="font-mono text-lg text-[#C8A96A] font-bold">
                                    {
                                      formatPrice(
                                        ord.grandTotalUsd,
                                        lang,
                                        '',
                                        '',
                                        currency
                                      ).amount
                                    }
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedPastOrderId(isExpanded ? '' : ord.id)
                                  }
                                  className="px-3 py-2 bg-[#0D0F0E] border border-white/20 hover:border-[#C8A96A] text-xs text-[#F5F2EB] flex items-center gap-1.5 cursor-pointer"
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="w-3.5 h-3.5 text-[#C8A96A]" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5 text-[#C8A96A]" />
                                  )}
                                  <span>{t('auth.pastOrders.itemDetails')}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    onOpenOrderTracking(ord);
                                  }}
                                  className="px-3.5 py-2 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Receipt className="w-3.5 h-3.5" />
                                  <span>
                                    {isFa
                                      ? 'رهگیری و فاکتور رسمی'
                                      : 'Tracker & Receipt'}
                                  </span>
                                </button>
                              </div>
                            </div>

                            {/* Expanded Item Details & Total Cost Breakdown */}
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="border-t border-white/10 bg-[#0D0F0E] p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs"
                              >
                                <div className="lg:col-span-7 space-y-3">
                                  {ord.serviceTitles.length > 0 && (
                                    <div>
                                      <span className="text-[#C8A96A] font-semibold block mb-1.5">
                                        {isFa
                                          ? 'خدمات آسا انجام‌شده در این سفارش:'
                                          : 'ASA Services Included:'}
                                      </span>
                                      <ul className="space-y-1.5">
                                        {ord.serviceTitles.map((srv, sIdx) => (
                                          <li
                                            key={sIdx}
                                            className="flex items-start gap-2 text-[#F5F2EB] bg-[#151816] px-3 py-2 border border-white/5"
                                          >
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96A] shrink-0 mt-0.5" />
                                            <span>{srv}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {ord.productSummaries.length > 0 && (
                                    <div>
                                      <span className="text-[#8FE3B8] font-semibold block mb-1.5">
                                        {isFa
                                          ? 'اقلام سوپرمارکتی و بسته‌های خوراک (طبق فاکتور رسمی):'
                                          : 'Grocery & Meal Items (Pass-Through Receipt):'}
                                      </span>
                                      <ul className="space-y-1.5">
                                        {ord.productSummaries.map((prd, pIdx) => (
                                          <li
                                            key={pIdx}
                                            className="flex items-start gap-2 text-[#D8D2C5] bg-[#151816] px-3 py-2 border border-white/5"
                                          >
                                            <Package className="w-3.5 h-3.5 text-[#3E7B5E] shrink-0 mt-0.5" />
                                            <span>{prd}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {ord.specialInstructions && (
                                    <div className="bg-[#151816] border border-white/10 p-3 text-[#9E988E]">
                                      <strong className="text-[#C8A96A] block mb-0.5">
                                        {isFa
                                          ? 'دستورات ویژه ثبت‌شده:'
                                          : 'Special Care Notes:'}
                                      </strong>
                                      <span>{ord.specialInstructions}</span>
                                    </div>
                                  )}
                                </div>

                                {/* Financial Cost Breakdown */}
                                <div className="lg:col-span-5 bg-[#151816] border border-[#C8A96A]/40 p-4 flex flex-col justify-between space-y-3">
                                  <div className="space-y-2.5">
                                    <span className="text-[#C8A96A] font-semibold block border-b border-white/10 pb-2">
                                      {isFa
                                        ? 'تفکیک مالی و شفافیت فاکتور (۰٪ سود کالا)'
                                        : 'Transparent Cost Breakdown (0% Markup)'}
                                    </span>

                                    <div className="flex justify-between text-[#D8D2C5]">
                                      <span>
                                        {t('auth.pastOrders.passThroughGoods')}:
                                      </span>
                                      <span className="font-mono font-semibold text-[#F5F2EB]">
                                        {
                                          formatPrice(
                                            ord.passThroughTotalUsd,
                                            lang,
                                            '',
                                            '',
                                            currency
                                          ).amount
                                        }
                                      </span>
                                    </div>

                                    <div className="flex justify-between text-[#D8D2C5]">
                                      <span>{t('auth.pastOrders.serviceFee')}:</span>
                                      <span className="font-mono font-semibold text-[#C8A96A]">
                                        {
                                          formatPrice(
                                            ord.asaServiceFeeUsd,
                                            lang,
                                            '',
                                            '',
                                            currency
                                          ).amount
                                        }
                                      </span>
                                    </div>

                                    <div className="flex justify-between text-sm font-bold text-[#F5F2EB] pt-2.5 border-t border-[#C8A96A]/35">
                                      <span>{t('auth.pastOrders.totalCost')}:</span>
                                      <span className="font-mono text-base text-[#C8A96A]">
                                        {
                                          formatPrice(
                                            ord.grandTotalUsd,
                                            lang,
                                            '',
                                            '',
                                            currency
                                          ).amount
                                        }
                                      </span>
                                    </div>
                                  </div>

                                  <div className="pt-2 border-t border-white/10 text-[11px] text-[#9E988E] space-y-1">
                                    <div className="flex justify-between">
                                      <span>{isFa ? 'بازه تحویل:' : 'Window:'}</span>
                                      <span className="text-[#F5F2EB]">
                                        {ord.deliveryWindow}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>{isFa ? 'درگاه پرداخت:' : 'Gateway:'}</span>
                                      <span className="font-mono text-[#8FE3B8]">
                                        {ord.gatewayId}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 1: MY PROFILE, PARENT DOSSIER & MY ORDERS */}
              {activeTab === 'profile' && currentUser && (
                <div className="space-y-6">
                  {/* Account Summary Card */}
                  <div className="bg-[#151816] border border-[#C8A96A]/45 p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-[11px] text-[#9E988E] block">
                        {isFa ? 'صاحب حساب (فرزند / سفارش‌دهنده):' : 'Account Holder:'}
                      </span>
                      <p className="font-serif text-lg text-[#F5F2EB] font-semibold mt-0.5">
                        {currentUser.fullName}
                      </p>
                      <span className="text-xs text-[#C8A96A] font-mono block mt-0.5">
                        {currentUser.email}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#9E988E] block">
                        {isFa ? 'محل اقامت و شماره تماس:' : 'Location & WhatsApp:'}
                      </span>
                      <p className="text-xs text-[#F5F2EB] font-medium mt-1">
                        {currentUser.countryOfResidence}
                      </p>
                      <span className="text-xs text-[#9E988E] font-mono block mt-0.5">
                        {currentUser.phoneOrWhatsapp}
                      </span>
                    </div>

                    <div className="flex flex-col justify-between items-start md:items-end">
                      <span className="px-3 py-1 bg-[#C8A96A]/20 border border-[#C8A96A] text-[#C8A96A] text-xs font-semibold flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5" />
                        <span>
                          {isFa
                            ? `سطح عضویت: ${currentUser.membershipTier}`
                            : `${currentUser.membershipTier} Member`}
                        </span>
                      </span>
                      {currentUser.role === 'admin_steward' && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenAdminDashboard();
                          }}
                          className="mt-2 px-3 py-1.5 bg-[#2E5A44] text-[#F5F2EB] text-xs font-semibold cursor-pointer"
                        >
                          {isFa
                            ? 'ورود به پنل مدیریت کل (Admin Panel) ←'
                            : 'Open Full Admin Panel →'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Editable Parent Care Profile Inside Member Account */}
                  <form
                    onSubmit={handleSaveProfileEdits}
                    className="bg-[#151816] border border-white/10 p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="font-serif text-lg text-[#C8A96A] flex items-center gap-2">
                        <HeartPulse className="w-4 h-4" />
                        <span>
                          {isFa
                            ? 'پرونده اختصاصی والدین شما در تهران (متصل به سبد خرید و پنل ادمین)'
                            : 'Your Parents’ Tehran Care Profile (Synced with Checkout & Admin)'}
                        </span>
                      </h4>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#C8A96A] text-[#0D0F0E] text-xs font-semibold cursor-pointer"
                      >
                        {isFa ? 'ذخیره تغییرات پروفایل' : 'Save Profile'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-[#9E988E] block mb-1">
                          {isFa ? 'نام والدین گرامی:' : 'Parents’ Names:'}
                        </label>
                        <input
                          type="text"
                          value={editParentNames}
                          onChange={(e) => setEditParentNames(e.target.value)}
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#9E988E] block mb-1">
                          {isFa ? 'نشانی منزل در تهران:' : 'Tehran Residence Address:'}
                        </label>
                        <input
                          type="text"
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#9E988E] block mb-1">
                          {isFa
                            ? 'فروشگاه‌ها و نانوایی مورد علاقه والدین:'
                            : 'Preferred Neighborhood Grocers:'}
                        </label>
                        <input
                          type="text"
                          value={editGrocers}
                          onChange={(e) => setEditGrocers(e.target.value)}
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#9E988E] block mb-1">
                          {isFa
                            ? 'پزشکان و کلینیک‌های ثابت والدین:'
                            : 'Preferred Doctors & Clinics:'}
                        </label>
                        <input
                          type="text"
                          value={editDoctors}
                          onChange={(e) => setEditDoctors(e.target.value)}
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] outline-none"
                        />
                      </div>
                    </div>
                  </form>

                  {/* User's Order History & Live Status */}
                  <div className="bg-[#151816] border border-white/10 p-5 space-y-3">
                    <h4 className="font-serif text-lg text-[#F5F2EB] flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#C8A96A]" />
                      <span>
                        {isFa
                          ? `سفارش‌های ثبت‌شده در حساب شما (${userOrders.length})`
                          : `Your Dispatched Orders (${userOrders.length})`}
                      </span>
                    </h4>

                    <div className="space-y-2.5">
                      {userOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-[#0D0F0E] border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[#C8A96A] font-bold">
                                {ord.referenceCode}
                              </span>
                              <span className="text-[#9E988E]">· {ord.createdAt}</span>
                              <span className="px-2 py-0.5 bg-[#2E5A44]/40 border border-[#3E7B5E] text-[#8FE3B8] text-[10px]">
                                {stageBadgesFa[ord.currentStageIndex]}
                              </span>
                            </div>
                            <p className="text-[#F5F2EB] font-medium">
                              {ord.recipientName} — {ord.residenceAddress}
                            </p>
                            <p className="text-[#9E988E]">
                              {[...ord.serviceTitles, ...ord.productSummaries].join(' · ')}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-sm text-[#C8A96A] font-bold">
                              {formatPrice(ord.grandTotalUsd, lang, '', '', currency).amount}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                onOpenOrderTracking(ord);
                              }}
                              className="px-3 py-2 bg-[#C8A96A] text-[#0D0F0E] font-semibold cursor-pointer"
                            >
                              {isFa ? 'رهگیری زنده' : 'Track Live'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SIGN IN / QUICK ACCOUNT SWITCHER */}
              {activeTab === 'login' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <form
                    onSubmit={handleLoginSubmit}
                    className="lg:col-span-6 bg-[#151816] border border-[#C8A96A]/45 p-5 space-y-4"
                  >
                    <h4 className="font-serif text-xl text-[#F5F2EB] flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-[#C8A96A]" />
                      <span>
                        {isFa ? 'ورود با ایمیل و رمز عبور' : 'Sign In with Email'}
                      </span>
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="text-[#9E988E] block mb-1">
                          {isFa ? 'ایمیل حساب کاربری:' : 'Email Address:'}
                        </label>
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3.5 py-2.5 text-[#F5F2EB] font-mono outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[#9E988E] block mb-1">
                          {isFa ? 'رمز عبور:' : 'Password:'}
                        </label>
                        <input
                          type="password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3.5 py-2.5 text-[#F5F2EB] outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        {isFa ? 'ورود به حساب خانواده' : 'Sign In to Account'}
                      </button>
                    </div>
                  </form>

                  {/* 1-Click Demo Account Switcher */}
                  <div className="lg:col-span-6 bg-[#151816] border border-white/10 p-5 space-y-3">
                    <span className="text-xs text-[#C8A96A] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {isFa
                          ? 'ورود سریع ۱-کلیکی به حساب‌های نمونه (مشتری و مدیر):'
                          : '1-Click Instant Switch (Test Customer & Admin Accounts):'}
                      </span>
                    </span>
                    <div className="space-y-2.5">
                      {registeredUsers.map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => handleQuickSwitchAccount(u)}
                          className={`w-full p-3.5 text-start border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            currentUser?.id === u.id
                              ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-[#F5F2EB]'
                              : 'bg-[#0D0F0E] border-white/10 hover:border-[#C8A96A]/50 text-[#9E988E]'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-semibold text-[#F5F2EB]">
                              {u.fullName}
                            </p>
                            <p className="text-[11px] text-[#C8A96A] font-mono">
                              {u.email} · {u.countryOfResidence}
                            </p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 bg-[#151816] border border-white/15 text-[#F5F2EB]">
                            {u.role === 'admin_steward'
                              ? isFa
                                ? 'مدیر ارشد'
                                : 'Admin'
                              : u.membershipTier}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CREATE NEW FAMILY ACCOUNT & PARENT CARE PROFILE */}
              {activeTab === 'signup' && (
                <form
                  onSubmit={handleSignUpSubmit}
                  className="bg-[#151816] border border-[#C8A96A]/45 p-5 sm:p-6 space-y-5"
                >
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="font-serif text-xl text-[#F5F2EB]">
                      {isFa
                        ? 'ثبت‌نام حساب جدید خانواده + تشکیل پرونده اختصاصی والدین در تهران'
                        : 'Create Family Account & Tehran Parent Care Dossier'}
                    </h4>
                    <p className="text-xs text-[#9E988E] mt-1">
                      {isFa
                        ? 'پس از ثبت‌نام، پروفایل شما بلافاصله در بخش «مدیریت کاربران و پروفایل‌ها» در پنل ادمین نیز ثبت و قابل بررسی است.'
                        : 'Once registered, your profile is immediately visible and manageable inside the Admin Dashboard.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-[#C8A96A] font-semibold block mb-1">
                        {isFa ? '۱. نام و نام خانوادگی شما (فرزند):' : '1. Your Full Name:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder={isFa ? 'مثلاً: نیما فرهادی...' : 'e.g., Nima Farhadi'}
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-[#F5F2EB] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#C8A96A] font-semibold block mb-1">
                        {isFa ? '۲. آدرس ایمیل:' : '2. Email Address:'}
                      </label>
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-[#F5F2EB] font-mono outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#9E988E] block mb-1">
                        {isFa ? '۳. شماره واتساپ / موبایل:' : '3. WhatsApp / Mobile:'}
                      </label>
                      <input
                        type="text"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        placeholder="+1 / +44 / +49 ..."
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-[#F5F2EB] font-mono outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#9E988E] block mb-1">
                        {isFa ? '۴. شهر و کشور محل سکونت شما:' : '4. Your City & Country:'}
                      </label>
                      <input
                        type="text"
                        value={signupCountry}
                        onChange={(e) => setSignupCountry(e.target.value)}
                        placeholder="Toronto, London, Los Angeles, Berlin..."
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-[#F5F2EB] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#C8A96A] font-semibold block mb-1">
                        {isFa ? '۵. نام والدین گرامی در تهران:' : '5. Parents’ Names in Tehran:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={signupParentNames}
                        onChange={(e) => setSignupParentNames(e.target.value)}
                        placeholder={isFa ? 'مثلاً: خانم پروانه فرهادی...' : 'Parents’ names...'}
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-[#F5F2EB] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#C8A96A] font-semibold block mb-1">
                        {isFa ? '۶. منطقه محل سکونت والدین در تهران:' : '6. Tehran Service Zone:'}
                      </label>
                      <select
                        value={signupZoneId}
                        onChange={(e) => setSignupZoneId(e.target.value)}
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-[#F5F2EB] outline-none"
                      >
                        {TEHRAN_SERVICE_ZONES.map((z) => (
                          <option key={z.id} value={z.id}>
                            {isFa ? z.nameFa : z.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[#9E988E] block mb-1">
                        {isFa ? '۷. نشانی دقیق منزل والدین در تهران:' : '7. Full Street Address in Tehran:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={signupParentAddress}
                        onChange={(e) => setSignupParentAddress(e.target.value)}
                        placeholder={
                          isFa
                            ? 'محله، خیابان، کوچه، پلاک، طبقه و تلفن ثابت منزل...'
                            : 'Full street address, building number, unit & landline...'
                        }
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-[#F5F2EB] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#9E988E] block mb-1">
                        {isFa
                          ? '۸. رژیم غذایی و ذائقه میوه/خرید والدین:'
                          : '8. Dietary Needs & Fruit Preferences:'}
                      </label>
                      <input
                        type="text"
                        value={signupParentDiet}
                        onChange={(e) => setSignupParentDiet(e.target.value)}
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-[#F5F2EB] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#9E988E] block mb-1">
                        {isFa
                          ? '۹. پزشکان و بیمارستان‌های مورد مراجعه والدین:'
                          : '9. Preferred Doctors & Clinics:'}
                      </label>
                      <input
                        type="text"
                        value={signupParentDoctors}
                        onChange={(e) => setSignupParentDoctors(e.target.value)}
                        placeholder={
                          isFa
                            ? 'مثلاً: بیمارستان جم، بیمارستان دی، آزمایشگاه مسعود...'
                            : 'e.g., Jam Hospital, Day Hospital...'
                        }
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2.5 text-[#F5F2EB] outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.15em] font-bold cursor-pointer shadow-[0_0_25px_rgba(200,169,106,0.3)]"
                  >
                    {isFa
                      ? 'ایجاد حساب کاربری و ثبت پرونده والدین'
                      : 'Complete Sign Up & Save Parent Profile'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
