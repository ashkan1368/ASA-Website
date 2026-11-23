import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  BellRing,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  User,
  Compass,
} from 'lucide-react';
import { Language } from '../data/catalogData';
import { useLocalization } from '../i18n/LocalizationContext';

export interface WaitlistSubmissionRecord {
  id: string;
  waitlistCode: string;
  fullName: string;
  email: string;
  whatsappOrPhone: string;
  districtCode: string;
  districtNameFa: string;
  districtNameEn: string;
  neighborhoodDetail: string;
  requestedPillar: 'All Pillars' | 'Asa Hamrah' | 'Asa Khoraak' | 'Asa Pezeshk';
  notes?: string;
  createdAt: string;
}

export interface UnservicedTehranDistrictOption {
  code: string;
  nameFa: string;
  nameEn: string;
  etaLaunchFa: string;
  etaLaunchEn: string;
  waitlistCount: number;
}

export const EXPANSION_TEHRAN_DISTRICTS: UnservicedTehranDistrictOption[] = [
  {
    code: 'dist-04',
    nameFa: 'منطقه ۴ تهران — شرق پاسداران، هروی، تهرانپارس و لویزان',
    nameEn: 'District 4 — East Pasdaran, Heravi, Tehranpars & Lavizan',
    etaLaunchFa: 'فاز اول توسعه · افتتاح تا ۶ هفته آینده',
    etaLaunchEn: 'Phase 1 Expansion · Launching in ~6 Weeks',
    waitlistCount: 84,
  },
  {
    code: 'dist-05',
    nameFa: 'منطقه ۵ تهران — پونک، شهرک اکباتان، بلوار فردوس و جنت‌آباد',
    nameEn: 'District 5 — Punak, Ekbatan, Ferdows Blvd & Jannat Abad',
    etaLaunchFa: 'فاز اول توسعه · افتتاح تا ۶ هفته آینده',
    etaLaunchEn: 'Phase 1 Expansion · Launching in ~6 Weeks',
    waitlistCount: 112,
  },
  {
    code: 'dist-07-08',
    nameFa: 'منطقه ۷ و ۸ تهران — سهروردی، عباس‌آباد، مطهری و نارمک',
    nameEn: 'Districts 7 & 8 — Sohrevardi, Abbas Abad, Motahhari & Narmak',
    etaLaunchFa: 'فاز دوم توسعه · فصل آینده',
    etaLaunchEn: 'Phase 2 Expansion · Next Quarter',
    waitlistCount: 63,
  },
  {
    code: 'dist-22',
    nameFa: 'منطقه ۲۲ تهران — شهرک غربِ نوین، چیتگر و دریاچه شهدای خلیج فارس',
    nameEn: 'District 22 — Chitgar & Persian Gulf Lake Residences',
    etaLaunchFa: 'فاز دوم توسعه · فصل آینده',
    etaLaunchEn: 'Phase 2 Expansion · Next Quarter',
    waitlistCount: 49,
  },
  {
    code: 'dist-lavasan',
    nameFa: 'حومه شمالی تهران — لواسانات، فشم و اوشان',
    nameEn: 'Northern Villas — Lavasan, Fasham & Oushan',
    etaLaunchFa: 'پوشش اختصاصی آخر هفته‌ها · در حال تکمیل ظرفیت',
    etaLaunchEn: 'VIP Weekend Coverage · Waitlist Open',
    waitlistCount: 38,
  },
  {
    code: 'dist-other',
    nameFa: 'سایر مناطق تهران و کرج (مناطق ۹ تا ۲۱ و مهرشهر کرج)',
    nameEn: 'Other Tehran Districts (9–21) & Mehrshahr Karaj',
    etaLaunchFa: 'اولویت‌بندی بر اساس تعداد درخواست خانواده‌ها',
    etaLaunchEn: 'Prioritized by Family Waitlist Demand',
    waitlistCount: 71,
  },
];

interface WaitlistJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialDistrictCode?: string;
  initialNeighborhoodQuery?: string;
  onSubmitWaitlist?: (record: WaitlistSubmissionRecord) => void;
}

export const WaitlistJoinModal: React.FC<WaitlistJoinModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialDistrictCode,
  initialNeighborhoodQuery = '',
  onSubmitWaitlist,
}) => {
  const { t } = useLocalization();
  const isFa = lang === 'fa';
  const [formError, setFormError] = useState<string | null>(null);

  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>(
    initialDistrictCode || EXPANSION_TEHRAN_DISTRICTS[0].code
  );
  const [neighborhoodDetail, setNeighborhoodDetail] = useState<string>(
    initialNeighborhoodQuery
  );
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [whatsappOrPhone, setWhatsappOrPhone] = useState<string>('');
  const [requestedPillar, setRequestedPillar] = useState<
    'All Pillars' | 'Asa Hamrah' | 'Asa Khoraak' | 'Asa Pezeshk'
  >('All Pillars');
  const [notes, setNotes] = useState<string>('');
  const [submittedRecord, setSubmittedRecord] =
    useState<WaitlistSubmissionRecord | null>(null);

  useEffect(() => {
    if (initialDistrictCode) {
      setSelectedDistrictCode(initialDistrictCode);
    }
  }, [initialDistrictCode]);

  useEffect(() => {
    if (initialNeighborhoodQuery) {
      setNeighborhoodDetail(initialNeighborhoodQuery);
    }
  }, [initialNeighborhoodQuery]);

  const activeDistrict =
    EXPANSION_TEHRAN_DISTRICTS.find((d) => d.code === selectedDistrictCode) ||
    EXPANSION_TEHRAN_DISTRICTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || (!email.trim() && !whatsappOrPhone.trim())) {
      setFormError(t('errors.missingRequiredFields'));
      return;
    }
    setFormError(null);

    const code = `ASA-WL-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: WaitlistSubmissionRecord = {
      id: `wl-${Date.now()}`,
      waitlistCode: code,
      fullName: fullName.trim(),
      email: email.trim(),
      whatsappOrPhone: whatsappOrPhone.trim(),
      districtCode: activeDistrict.code,
      districtNameFa: activeDistrict.nameFa,
      districtNameEn: activeDistrict.nameEn,
      neighborhoodDetail:
        neighborhoodDetail.trim() ||
        (isFa ? activeDistrict.nameFa : activeDistrict.nameEn),
      requestedPillar,
      notes: notes.trim(),
      createdAt: isFa ? 'هم‌اکنون' : 'Just now',
    };

    setSubmittedRecord(record);
    if (onSubmitWaitlist) {
      onSubmitWaitlist(record);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedRecord(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 z-[94] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121614] border-2 border-[#C8A96A] max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.95)]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-[#161B18] border-b border-white/10 flex items-start justify-between gap-4 shrink-0">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#C8A96A] font-semibold mb-1.5">
                  <BellRing className="w-3.5 h-3.5" />
                  <span>{t('waitlist.badge')}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB]">
                  {t('waitlist.title')}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-9 h-9 bg-[#0D0F0E] border border-white/15 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {submittedRecord ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#151816] border border-[#3E7B5E] p-6 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#3E7B5E]/20 border border-[#3E7B5E] flex items-center justify-center mx-auto text-[#8FE3B8]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C8A96A]/15 border border-[#C8A96A]/50 text-[#C8A96A] font-mono text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {t('waitlist.priorityCodeLabel', {
                        code: submittedRecord.waitlistCode,
                      })}
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl text-[#F5F2EB]">
                    {t('waitlist.successHeadline')}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#D8D2C5] max-w-lg mx-auto leading-relaxed">
                    {isFa
                      ? `به محض آغاز اعزام همراهان آسا به «${submittedRecord.neighborhoodDetail}»، از طریق واتساپ و ایمیل به شما اطلاع داده می‌شود و کد هدیه ۱۵٪ تخفیف اولین ماه اشتراک برای حساب شما فعال خواهد شد.`
                      : `As soon as Asa stewards begin servicing "${submittedRecord.neighborhoodDetail}", we will notify you via WhatsApp & Email with a complimentary 15% Priority Launch Privilege.`}
                  </p>

                  <div className="bg-[#0D0F0E] border border-white/10 p-4 text-start text-xs space-y-1.5 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-[#9E988E]">
                        {isFa ? 'نام متقاضی:' : 'Name:'}
                      </span>
                      <span className="text-[#F5F2EB] font-semibold">
                        {submittedRecord.fullName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9E988E]">
                        {isFa ? 'منطقه انتخابی:' : 'Target District:'}
                      </span>
                      <span className="text-[#C8A96A]">
                        {isFa
                          ? submittedRecord.districtNameFa
                          : submittedRecord.districtNameEn}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9E988E]">
                        {isFa ? 'زمان تخمینی افتتاح:' : 'Estimated Launch:'}
                      </span>
                      <span className="text-[#8FE3B8]">
                        {isFa
                          ? activeDistrict.etaLaunchFa
                          : activeDistrict.etaLaunchEn}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="px-6 py-2.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] font-bold text-xs uppercase tracking-[0.14em] cursor-pointer"
                    >
                      {isFa ? 'بازگشت به وب‌سایت آسا' : 'Return to Asa Portal'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formError && (
                    <div className="p-3 bg-[#A63A3A]/20 border border-[#A63A3A] text-xs text-[#F5F2EB]">
                      {formError}
                    </div>
                  )}
                  {/* Context Banner */}
                  <div className="bg-[#151816] border border-[#C8A96A]/40 p-4 text-xs space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#C8A96A] font-semibold flex items-center gap-1.5">
                        <Compass className="w-4 h-4" />
                        <span>
                          {isFa
                            ? 'چرا پوشش آسا مرحله‌به‌مرحله گسترش می‌یابد؟'
                            : 'Why Asa Expands District by District'}
                        </span>
                      </span>
                      <span className="px-2 py-0.5 bg-[#2E5A44]/40 border border-[#3E7B5E] text-[#8FE3B8] text-[10px] font-mono">
                        {isFa ? '+۱۵٪ هدیه پیش‌ثبت‌نام' : '15% Launch Privilege'}
                      </span>
                    </div>
                    <p className="text-[#9E988E] leading-relaxed">
                      {isFa
                        ? 'برای حفظ استاندارد «حضور زیر ۹۰ دقیقه»، خرید از فروشگاه‌های محلی درجه یک و هماهنگی مستقیم با کلینیک‌های هر منطقه، هم‌اکنون مناطق ۱ تا ۶ تهران فعال هستند و سایر مناطق بر اساس اولویت فهرست انتظار افتتاح می‌شوند.'
                        : 'To guarantee our <90-minute steward response time and vetted neighborhood grocers, Asa currently operates in Tehran Districts 1–6 and unlocks new districts based on family waitlist demand.'}
                    </p>
                  </div>

                  {/* Step 1: Select Expansion District */}
                  <div className="space-y-2">
                    <label className="text-xs text-[#C8A96A] font-semibold block">
                      {isFa
                        ? '۱. منطقه مورد نظر والدین در تهران یا حومه را انتخاب کنید:'
                        : '1. Select Your Parents’ District in Tehran:'}
                    </label>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                      {EXPANSION_TEHRAN_DISTRICTS.map((dist) => {
                        const active = dist.code === selectedDistrictCode;
                        return (
                          <button
                            key={dist.code}
                            type="button"
                            onClick={() => setSelectedDistrictCode(dist.code)}
                            className={`p-3 text-start border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 cursor-pointer ${
                              active
                                ? 'bg-[#C8A96A]/15 border-[#C8A96A] text-[#F5F2EB]'
                                : 'bg-[#0D0F0E] border-white/10 text-[#9E988E] hover:border-white/25'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-semibold text-[#F5F2EB]">
                                {isFa ? dist.nameFa : dist.nameEn}
                              </p>
                              <p className="text-[11px] text-[#C8A96A] flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {isFa ? dist.etaLaunchFa : dist.etaLaunchEn}
                                </span>
                              </p>
                            </div>
                            <span className="text-[10px] font-mono bg-[#151816] border border-white/10 px-2 py-1 text-[#8FE3B8] shrink-0 self-start sm:self-center">
                              {isFa
                                ? `${dist.waitlistCount.toLocaleString('fa-IR')} خانواده در نوبت`
                                : `${dist.waitlistCount} Families Waiting`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Specific Neighborhood & Service Pillar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[#9E988E] block mb-1">
                        {isFa
                          ? 'نام دقیق محله یا خیابان والدین:'
                          : 'Specific Neighborhood / Street:'}
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-[#C8A96A] absolute top-2.5 start-3" />
                        <input
                          type="text"
                          required
                          value={neighborhoodDetail}
                          onChange={(e) => setNeighborhoodDetail(e.target.value)}
                          placeholder={
                            isFa
                              ? 'مثلاً: شهرک اکباتان، فاز ۲ / هروی، میدان هروی'
                              : 'e.g., Ekbatan Phase 2 / Heravi Sq / Punak'
                          }
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] ps-8 pe-3 py-2 text-[#F5F2EB] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#9E988E] block mb-1">
                        {isFa
                          ? 'کدام خدمت آسا اولویت شماست؟'
                          : 'Primary Service Needed:'}
                      </label>
                      <select
                        value={requestedPillar}
                        onChange={(e) =>
                          setRequestedPillar(e.target.value as any)
                        }
                        className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] outline-none"
                      >
                        <option value="All Pillars">
                          {isFa
                            ? 'هر سه ستون (آسا همراه + خوراک + پزشک)'
                            : 'All 3 Pillars (Hamrah + Khoraak + Pezeshk)'}
                        </option>
                        <option value="Asa Hamrah">
                          {isFa
                            ? 'آسا همراه (خرید هفتگی با فاکتور رسمی و امور منزل)'
                            : 'Asa Hamrah (Weekly Shopping & Errands)'}
                        </option>
                        <option value="Asa Khoraak">
                          {isFa
                            ? 'آسا خوراک (بسته‌های غذای خانگی کم‌نمک)'
                            : 'Asa Khoraak (Low-Sodium Home Meals)'}
                        </option>
                        <option value="Asa Pezeshk">
                          {isFa
                            ? 'آسا پزشک (همراهی در نوبت پزشک و آزمایشگاه)'
                            : 'Asa Pezeshk (Doctor Visit Accompaniment)'}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Step 3: Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-[#9E988E] block mb-1">
                        {isFa ? 'نام و نام خانوادگی شما:' : 'Your Full Name:'}
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-[#C8A96A] absolute top-2.5 start-3" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={
                            isFa ? 'نام شما (فرزند / خانواده)' : 'Your Name'
                          }
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] ps-8 pe-3 py-2 text-[#F5F2EB] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#9E988E] block mb-1">
                        {isFa
                          ? 'شماره واتساپ یا موبایل:'
                          : 'WhatsApp / Mobile Number:'}
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-[#C8A96A] absolute top-2.5 start-3" />
                        <input
                          type="text"
                          required
                          value={whatsappOrPhone}
                          onChange={(e) => setWhatsappOrPhone(e.target.value)}
                          placeholder="+1 / +44 / +98..."
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] ps-8 pe-3 py-2 text-[#F5F2EB] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#9E988E] block mb-1">
                        {isFa ? 'نشانی ایمیل شما:' : 'Email Address:'}
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-[#C8A96A] absolute top-2.5 start-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] ps-8 pe-3 py-2 text-[#F5F2EB] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="text-[#9E988E] block mb-1">
                      {isFa
                        ? 'توضیحات تکمیلی یا شرایط خاص (در صورت نیاز به اعزام موردی فوری):'
                        : 'Optional Notes (or urgent one-off concierge request):'}
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        isFa
                          ? 'مثلاً: والدینم در اکباتان سکونت دارند و هفته‌ای یک بار به همراهی بیمارستان نیاز دارند...'
                          : 'e.g., My parents live in Ekbatan and need bi-weekly clinic accompaniment...'
                      }
                      className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-[#F5F2EB] outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                    <span className="text-[11px] text-[#9E988E] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#3E7B5E]" />
                      <span>
                        {isFa
                          ? 'اطلاع‌رسانی آنی در واتساپ و ایمیل به محض فعال‌سازی منطقه'
                          : 'Instant WhatsApp & Email notification upon district launch'}
                      </span>
                    </span>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] font-bold text-xs uppercase tracking-[0.14em] cursor-pointer shadow-[0_0_25px_rgba(200,169,106,0.3)]"
                    >
                      {isFa
                        ? 'ثبت در فهرست انتظار و دریافت کد اولویت'
                        : 'Join Waitlist & Reserve 15% Privilege'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
