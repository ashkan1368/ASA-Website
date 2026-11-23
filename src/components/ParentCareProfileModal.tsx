import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  HeartPulse,
  Store,
  Apple,
  Stethoscope,
  Check,
  ShieldCheck,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { Language, TEHRAN_SERVICE_ZONES } from '../data/catalogData';

export interface ParentCareProfile {
  parentNames: string;
  tehranZoneId: string;
  residenceAddress: string;
  preferredLocalGrocers: string;
  favoriteFruitsAndRipeness: string;
  dietarySodiumSugarLimits: string[];
  preferredDoctorsAndClinics: string;
  doorbellAndCallProtocol: string;
}

export const INITIAL_PARENT_CARE_PROFILE: ParentCareProfile = {
  parentNames: 'خانم توران راد و آقای مهندس راد',
  tehranZoneId: TEHRAN_SERVICE_ZONES[0].id,
  residenceAddress: 'زعفرانیه، خیابان مقدس اردبیلی، پلاک ۲۴، طبقه ۳',
  preferredLocalGrocers:
    'نانوایی سنگک سنتی زعفرانیه (کنجد کم) · میوه‌فروشی درجه یک مقدس اردبیلی · لبنیات سنتی لیقوان',
  favoriteFruitsAndRipeness:
    'سیب زرد و قرمز دماوند (نرم و شیرین)، گلابی رسیده، پرتقال تامسون بدون هسته، سبزی خوردن پاک‌شده تازه',
  dietarySodiumSugarLimits: [
    'کم‌نمک (مناسب فشار خون)',
    'کم‌قند / مناسب دیابت',
    'بافت نرم و زودهضم',
  ],
  preferredDoctorsAndClinics:
    'بیمارستان جم (دکتر سعیدی - قلب و عروق) · کلینیک تخصصی چشم‌پزشکی ونک · آزمایشگاه مسعود',
  doorbellAndCallProtocol:
    'تماس با تلفن ثابت منزل ۱۵ دقیقه قبل از رسیدن · حمل کلیه خریدها تا روی میز آشپزخانه',
};

interface ParentCareProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  profile: ParentCareProfile;
  onSaveProfile: (updated: ParentCareProfile) => void;
}

const DIETARY_LIMIT_OPTIONS = [
  {
    fa: 'کم‌نمک (مناسب فشار خون)',
    en: 'Low-Sodium (Blood Pressure Friendly)',
  },
  {
    fa: 'کم‌قند / مناسب دیابت',
    en: 'Low-Glycemic / Diabetic Friendly',
  },
  {
    fa: 'بافت نرم و زودهضم',
    en: 'Soft-Texture & Easy Digestion',
  },
  {
    fa: 'دوستدار قلب و امگا-۳ (کم‌چرب)',
    en: 'Heart-Healthy Omega-3 (Low-Fat)',
  },
  {
    fa: 'بدون لاکتوز / لبنیات پروبیوتیک',
    en: 'Probiotic / Gentle Dairy Only',
  },
];

export const ParentCareProfileModal: React.FC<ParentCareProfileModalProps> = ({
  isOpen,
  onClose,
  lang,
  profile,
  onSaveProfile,
}) => {
  const isFa = lang === 'fa';
  const [draft, setDraft] = useState<ParentCareProfile>(profile);
  const [savedNotice, setSavedNotice] = useState(false);

  const toggleDietaryTag = (labelFa: string) => {
    setDraft((prev) => {
      const exists = prev.dietarySodiumSugarLimits.includes(labelFa);
      return {
        ...prev,
        dietarySodiumSugarLimits: exists
          ? prev.dietarySodiumSugarLimits.filter((t) => t !== labelFa)
          : [...prev.dietarySodiumSugarLimits, labelFa],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(draft);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[85] bg-black/82 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121614] border-2 border-[#C8A96A]/65 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-[#161B18] border-b border-white/10 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold mb-1">
                  <HeartPulse className="w-4 h-4" />
                  <span>
                    {isFa
                      ? 'پرونده اختصاصی آسایش والدین (Parent Care Profile)'
                      : 'Dedicated Parent Care & Preference Profile'}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-3xl text-[#F5F2EB]">
                  {isFa
                    ? 'ذخیره ذائقه، فروشگاه‌های محبوب محله، رژیم غذایی و پزشکان والدین'
                    : 'Save Your Parents’ Grocers, Fruit Preferences, Diet & Doctors'}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 bg-[#0D0F0E] border border-white/15 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] hover:border-[#C8A96A] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5"
            >
              <div className="bg-[#0D0F0E] border border-[#C8A96A]/35 p-3.5 text-xs text-[#9E988E] flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C8A96A] shrink-0" />
                <span>
                  {isFa
                    ? 'اطلاعات این پرونده به‌صورت خودکار روی تمامی سفارش‌های بعدی شما و سبد سفارش (Order Drawer) اعمال می‌شود تا همراهان آسا دقیقاً طبق عادت و سلیقه والدینتان عمل کنند.'
                    : 'These preferences automatically sync with your Order Drawer so Asa stewards shop and assist according to your parents’ exact habits.'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#C8A96A] font-semibold block mb-1.5">
                    {isFa ? 'نام والدین گرامی:' : 'Parents’ Names:'}
                  </label>
                  <input
                    type="text"
                    value={draft.parentNames}
                    onChange={(e) =>
                      setDraft({ ...draft, parentNames: e.target.value })
                    }
                    className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3.5 py-2.5 text-xs sm:text-sm text-[#F5F2EB] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#C8A96A] font-semibold block mb-1.5">
                    {isFa ? 'محدوده و محله منزل در تهران:' : 'Tehran Neighborhood Zone:'}
                  </label>
                  <select
                    value={draft.tehranZoneId}
                    onChange={(e) =>
                      setDraft({ ...draft, tehranZoneId: e.target.value })
                    }
                    className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3.5 py-2.5 text-xs sm:text-sm text-[#F5F2EB] outline-none"
                  >
                    {TEHRAN_SERVICE_ZONES.map((z) => (
                      <option key={z.id} value={z.id}>
                        {isFa ? z.nameFa : z.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#9E988E] block mb-1.5">
                  {isFa ? 'نشانی دقیق منزل والدین:' : 'Full Residence Address:'}
                </label>
                <input
                  type="text"
                  value={draft.residenceAddress}
                  onChange={(e) =>
                    setDraft({ ...draft, residenceAddress: e.target.value })
                  }
                  className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3.5 py-2.5 text-xs sm:text-sm text-[#F5F2EB] outline-none"
                />
              </div>

              {/* Preferred Local Grocers */}
              <div>
                <label className="text-xs text-[#C8A96A] font-semibold flex items-center gap-1.5 mb-1.5">
                  <Store className="w-3.5 h-3.5" />
                  <span>
                    {isFa
                      ? 'فروشگاه‌ها، نانوایی و میوه‌فروشی مورد علاقه والدین در محله:'
                      : 'Preferred Neighborhood Grocers, Bakeries & Butcher:'}
                  </span>
                </label>
                <input
                  type="text"
                  value={draft.preferredLocalGrocers}
                  onChange={(e) =>
                    setDraft({ ...draft, preferredLocalGrocers: e.target.value })
                  }
                  className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3.5 py-2.5 text-xs text-[#F5F2EB] outline-none"
                />
              </div>

              {/* Fruit Ripeness & Varieties */}
              <div>
                <label className="text-xs text-[#C8A96A] font-semibold flex items-center gap-1.5 mb-1.5">
                  <Apple className="w-3.5 h-3.5" />
                  <span>
                    {isFa
                      ? 'میوه‌های محبوب و نحوه دست‌چین کردن (نرمی، رسیدگی، شیرینی):'
                      : 'Favorite Fruit Varieties & Ripeness Preferences:'}
                  </span>
                </label>
                <input
                  type="text"
                  value={draft.favoriteFruitsAndRipeness}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      favoriteFruitsAndRipeness: e.target.value,
                    })
                  }
                  className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3.5 py-2.5 text-xs text-[#F5F2EB] outline-none"
                />
              </div>

              {/* Dietary Sodium / Sugar Limits */}
              <div>
                <span className="text-xs text-[#C8A96A] font-semibold block mb-2">
                  {isFa
                    ? 'ملاحظات تغذیه‌ای، سقف نمک/قند و رژیم پزشکی والدین:'
                    : 'Dietary Sodium, Sugar & Texture Requirements:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_LIMIT_OPTIONS.map((opt) => {
                    const active = draft.dietarySodiumSugarLimits.includes(opt.fa);
                    return (
                      <button
                        key={opt.fa}
                        type="button"
                        onClick={() => toggleDietaryTag(opt.fa)}
                        className={`px-3 py-2 text-xs border flex items-center gap-1.5 transition-all cursor-pointer ${
                          active
                            ? 'bg-[#C8A96A]/20 border-[#C8A96A] text-[#F5F2EB] font-semibold'
                            : 'bg-[#0D0F0E] border-white/10 text-[#9E988E] hover:border-white/30'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-[#C8A96A]" />}
                        <span>{isFa ? opt.fa : opt.en}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Clinic Doctors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#C8A96A] font-semibold flex items-center gap-1.5 mb-1.5">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>
                      {isFa
                        ? 'پزشکان، بیمارستان و آزمایشگاه‌های ثابت والدین:'
                        : 'Preferred Doctors, Clinics & Diagnostic Labs:'}
                    </span>
                  </label>
                  <input
                    type="text"
                    value={draft.preferredDoctorsAndClinics}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        preferredDoctorsAndClinics: e.target.value,
                      })
                    }
                    className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#C8A96A] font-semibold flex items-center gap-1.5 mb-1.5">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>
                      {isFa
                        ? 'پروتکل تماس و زنگ درب منزل:'
                        : 'Doorbell & Arrival Call Protocol:'}
                    </span>
                  </label>
                  <input
                    type="text"
                    value={draft.doorbellAndCallProtocol}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        doorbellAndCallProtocol: e.target.value,
                      })
                    }
                    className="w-full bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-[#3E7B5E] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  {isFa
                    ? 'محرمانگی کامل اطلاعات خانواده تحت نظارت کلارا رستمی'
                    : 'Protected under ASA Family Privacy & Safeguarding Protocol'}
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 bg-[#0D0F0E] border border-white/15 text-xs text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer"
                  >
                    {isFa ? 'انصراف' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.14em] font-semibold flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(200,169,106,0.3)]"
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      {savedNotice
                        ? isFa
                          ? 'ذخیره و همگام‌سازی شد!'
                          : 'Saved & Synced!'
                        : isFa
                        ? 'ذخیره پرونده و اعمال در سفارش‌ها'
                        : 'Save & Apply to Orders'}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
