import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Clock,
  ShieldCheck,
  Check,
  X,
  Plus,
  Sparkles,
  AlertCircle,
  BellRing,
  Zap,
  HeartHandshake,
  UtensilsCrossed,
  Stethoscope,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  ESTATE_SERVICES,
  SERVICE_DEPT_FA,
  EstateService,
  ServiceDepartment,
  Language,
  CurrencyCode,
  formatPrice,
} from '../data/catalogData';

interface ServicesSectionProps {
  lang: Language;
  currency: CurrencyCode;
  services?: EstateService[];
  selectedServiceIds: string[];
  onToggleService: (service: EstateService) => void;
  selectedDept: ServiceDepartment;
  onSelectDept: (dept: ServiceDepartment) => void;
  onOpenOrderDrawer?: () => void;
}

const SPRING_LIFT_TRANSITION = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 22,
  mass: 0.7,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  currency,
  services = ESTATE_SERVICES,
  selectedServiceIds,
  onToggleService,
  selectedDept,
  onSelectDept,
  onOpenOrderDrawer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeServiceModal, setActiveServiceModal] = useState<EstateService | null>(null);
  const [waitlistRequestedIds, setWaitlistRequestedIds] = useState<string[]>([]);

  const isFa = lang === 'fa';

  // Clean, scannable 4-Pillar navigation cards (zero horizontal scrollbar!)
  const pillarCards: {
    dept: ServiceDepartment;
    titleFa: string;
    titleEn: string;
    subFa: string;
    subEn: string;
    icon: React.ReactNode;
  }[] = [
    {
      dept: 'All Divisions',
      titleFa: 'همه خدمات آسا',
      titleEn: 'All Asa Services',
      subFa: 'نمایش یکجای هر ۳ بخش',
      subEn: 'View all 3 pillars',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      dept: 'Asa Hamrah',
      titleFa: 'آسا همراه',
      titleEn: 'Asa Hamrah',
      subFa: 'خرید منزل، امور روزمره و فرودگاه',
      subEn: 'Shopping, Errands & Airport',
      icon: <HeartHandshake className="w-5 h-5" />,
    },
    {
      dept: 'Asa Khoraak',
      titleFa: 'آسا خوراک',
      titleEn: 'Asa Khoraak',
      subFa: 'بسته غذای خانگی کم‌نمک و مهمانی',
      subEn: 'Home-Style Meals & Catering',
      icon: <UtensilsCrossed className="w-5 h-5" />,
    },
    {
      dept: 'Asa Pezeshk',
      titleFa: 'آسا پزشک',
      titleEn: 'Asa Pezeshk',
      subFa: 'نوبت پزشک، آزمایشگاه و همراهی کلینیک',
      subEn: 'Doctor Visits & Lab Pickup',
      icon: <Stethoscope className="w-5 h-5" />,
    },
  ];

  // Top 3 most popular services for "Wrap Up and Go" 1-click express selection
  const expressServices = useMemo(() => {
    const featured = services.filter((s) =>
      ['asa-h-01', 'asa-p-01', 'asa-k-01'].includes(s.id)
    );
    return featured.length > 0 ? featured : services.slice(0, 3);
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchesDept = selectedDept === 'All Divisions' || srv.department === selectedDept;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        q === '' ||
        srv.title.toLowerCase().includes(q) ||
        srv.titleFa.includes(q) ||
        srv.shortDescription.toLowerCase().includes(q) ||
        srv.shortDescriptionFa.includes(q);
      return matchesDept && matchesQuery;
    });
  }, [selectedDept, searchQuery]);

  const handleToggleWaitlist = (id: string) => {
    setWaitlistRequestedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="services" className="relative py-20 px-4 sm:px-8 lg:px-14 max-w-[1440px] mx-auto">
      {/* Crisp, Scannable Section Header (Minimal Text, High Clarity) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A96A] mb-2 font-semibold">
            {isFa ? 'انتخاب آسان در ۳ ستون اصلی' : '3 Simple Pillars · Choose & Go'}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EB] leading-tight">
            {isFa ? (
              <>
                خدمات <span className="italic font-normal text-[#C8A96A]">آسا</span> در تهران
              </>
            ) : (
              <>
                Asa <span className="italic font-normal text-[#C8A96A]">Tehran</span> Services
              </>
            )}
          </h2>
        </div>

        {/* Clean Search Box */}
        <div className="relative w-full lg:w-80">
          <Search
            className={`w-4 h-4 text-[#C8A96A] absolute ${
              isFa ? 'right-3.5' : 'left-3.5'
            } top-1/2 -translate-y-1/2 pointer-events-none`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isFa ? 'جستجوی سریع خدمت (خرید، پزشک، غذا)...' : 'Quick search (shopping, doctor, meal)...'
            }
            className={`w-full bg-[#151816] border border-white/15 focus:border-[#C8A96A] text-xs sm:text-sm text-[#F5F2EB] placeholder-[#9E988E]/60 ${
              isFa ? 'pr-10 pl-9' : 'pl-10 pr-9'
            } py-3 outline-none transition-colors`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className={`absolute ${
                isFa ? 'left-3' : 'right-3'
              } top-1/2 -translate-y-1/2 text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* NEW: "Wrap Up & Go" 60-Second Express Bar for Busy Users */}
      <div className="bg-gradient-to-r from-[#1A1F1C] via-[#151816] to-[#1A1F1C] border border-[#C8A96A]/45 p-5 sm:p-6 mb-10 shadow-[0_14px_34px_rgba(0,0,0,0.65)]">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#C8A96A] font-semibold uppercase tracking-[0.14em]">
              <Zap className="w-4 h-4 fill-current" />
              <span>
                {isFa
                  ? 'مسیر سریع (بدون نیاز به جستجو) — محبوب‌ترین خدمات آسا در ۱ کلیک'
                  : 'Express 1-Click Selection — Most Popular Asa Services'}
              </span>
            </div>
            <p className="text-xs text-[#9E988E]">
              {isFa
                ? 'اگر فرصت مطالعه کامل ندارید، یکی از ۳ خدمت اصلی زیر را انتخاب کرده و مستقیماً سفارش خود را نهایی کنید:'
                : 'Short on time? Tap any of our top 3 flagship services below and proceed straight to checkout:'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {expressServices.map((srv) => {
              const active = selectedServiceIds.includes(srv.id);
              const priceStr = formatPrice(srv.price, lang, '', '', currency).amount;
              const shortLabelFa =
                srv.id === 'asa-h-01'
                  ? '۱. خرید منزل با فاکتور'
                  : srv.id === 'asa-p-01'
                  ? '۲. همراهی ویزیت پزشک'
                  : '۳. برنامه غذای خانگی';
              const shortLabelEn =
                srv.id === 'asa-h-01'
                  ? '1. Home Grocery Shopping'
                  : srv.id === 'asa-p-01'
                  ? '2. Doctor Accompaniment'
                  : '3. Weekly Home Meals';

              return (
                <button
                  key={srv.id}
                  onClick={() => onToggleService(srv)}
                  className={`px-3.5 py-2.5 text-xs border transition-all flex items-center gap-2 cursor-pointer ${
                    active
                      ? 'bg-[#2E5A44] border-[#3E7B5E] text-[#F5F2EB] font-semibold'
                      : 'bg-[#0D0F0E] border-white/15 text-[#F5F2EB] hover:border-[#C8A96A]'
                  }`}
                >
                  {active ? (
                    <Check className="w-3.5 h-3.5 text-[#C8A96A]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-[#C8A96A]" />
                  )}
                  <span>{isFa ? shortLabelFa : shortLabelEn}</span>
                  <span className="font-mono text-[11px] text-[#C8A96A]">({priceStr})</span>
                </button>
              );
            })}

            {onOpenOrderDrawer && (
              <button
                onClick={onOpenOrderDrawer}
                className="px-5 py-2.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.14em] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_20px_rgba(200,169,106,0.3)]"
              >
                <span>{isFa ? 'ثبت نهایی و خروج سریع' : 'Wrap Up & Checkout'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isFa ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Visual Pillar Cards (Replaces the Overflowing Scrollbar Tabs from Screenshot) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
        {pillarCards.map((card) => {
          const active = selectedDept === card.dept;
          const count =
            card.dept === 'All Divisions'
              ? ESTATE_SERVICES.length
              : ESTATE_SERVICES.filter((s) => s.department === card.dept).length;

          return (
            <button
              key={card.dept}
              onClick={() => onSelectDept(card.dept)}
              className={`p-4 text-start border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                active
                  ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] shadow-[0_10px_30px_rgba(200,169,106,0.28)]'
                  : 'bg-[#151816] text-[#F5F2EB] border-white/10 hover:border-[#C8A96A]/50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2.5">
                <span
                  className={
                    active
                      ? 'text-[#0D0F0E]'
                      : 'text-[#C8A96A] group-hover:scale-110 transition-transform'
                  }
                >
                  {card.icon}
                </span>
                <span
                  className={`font-mono text-xs px-2 py-0.5 border ${
                    active
                      ? 'bg-[#0D0F0E]/15 border-[#0D0F0E]/30 text-[#0D0F0E] font-bold'
                      : 'bg-[#0D0F0E] border-white/10 text-[#C8A96A]'
                  }`}
                >
                  {isFa ? `${count.toLocaleString('fa-IR')} خدمت` : `${count} Services`}
                </span>
              </div>

              <div>
                <h3
                  className={`font-serif text-lg sm:text-xl font-bold mb-0.5 ${
                    active ? 'text-[#0D0F0E]' : 'text-[#F5F2EB]'
                  }`}
                >
                  {isFa ? card.titleFa : card.titleEn}
                </h3>
                <p
                  className={`text-[11px] truncate ${
                    active ? 'text-[#0D0F0E]/80 font-medium' : 'text-[#9E988E]'
                  }`}
                >
                  {isFa ? card.subFa : card.subEn}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Streamlined, Visual Services Grid (Clean Cards, Minimal Text, Instant Action) */}
      {filteredServices.length === 0 ? (
        <div className="bg-[#151816]/60 border border-white/10 p-12 text-center">
          <p className="font-serif text-2xl text-[#F5F2EB] mb-3">
            {isFa ? 'خدمتی با این عبارت یافت نشد' : 'No matching services found'}
          </p>
          <button
            onClick={() => {
              onSelectDept('All Divisions');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#C8A96A] text-[#0D0F0E] text-xs uppercase tracking-[0.16em] font-semibold cursor-pointer"
          >
            {isFa ? 'نمایش همه خدمات' : 'Show All Services'}
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const isSelected = selectedServiceIds.includes(service.id);
              const isWaitlisted = waitlistRequestedIds.includes(service.id);
              // Keep card titles clean by stripping redundant prefix before "—" if present
              const rawTitle = isFa ? service.titleFa : service.title;
              const cleanTitle = rawTitle.includes('—')
                ? rawTitle.split('—')[1].trim()
                : rawTitle;
              const shortDesc = isFa ? service.shortDescriptionFa : service.shortDescription;
              const duration = isFa ? service.durationFa : service.duration;
              const deliverables = isFa ? service.deliverablesFa : service.deliverables;
              const priceFormatted = formatPrice(
                service.price,
                lang,
                service.billingUnit,
                service.billingUnitFa,
                currency
              );

              return (
                <motion.article
                  layout
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  whileHover={{
                    y: -8,
                    scale: 1.012,
                    transition: SPRING_LIFT_TRANSITION,
                  }}
                  whileTap={{
                    scale: 0.992,
                    transition: SPRING_LIFT_TRANSITION,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.025,
                  }}
                  className={`group relative flex flex-col justify-between bg-[#151816] border transition-colors duration-300 overflow-hidden shadow-[0_14px_34px_-12px_rgba(0,0,0,0.7)] hover:shadow-[0_26px_54px_-12px_rgba(0,0,0,0.92),0_0_28px_rgba(200,169,106,0.16)] ${
                    isSelected
                      ? 'border-[#C8A96A] ring-1 ring-[#C8A96A]/50'
                      : 'border-white/10 hover:border-[#C8A96A]/60'
                  }`}
                >
                  <div>
                    {/* Visual Image Header */}
                    <div className="relative h-48 overflow-hidden bg-[#0D0F0E]">
                      <img
                        src={service.image}
                        alt={cleanTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151816] via-[#151816]/25 to-black/30" />

                      {/* Concise Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
                        <span className="bg-[#0D0F0E]/90 backdrop-blur-md px-3 py-1 border border-white/15 text-[#C8A96A] font-semibold">
                          {isFa ? SERVICE_DEPT_FA[service.department] : service.department}
                        </span>
                        {service.isComingSoon ? (
                          <span className="bg-[#C8A96A]/20 backdrop-blur-md px-2.5 py-1 border border-[#C8A96A]/50 text-[#C8A96A] font-semibold">
                            {isFa ? 'به‌زودی' : 'Coming Soon'}
                          </span>
                        ) : (
                          <span className="font-mono text-[#F5F2EB] bg-[#0D0F0E]/90 backdrop-blur-md px-3 py-1 border border-[#C8A96A]/45 font-semibold">
                            {priceFormatted.amount}
                          </span>
                        )}
                      </div>

                      {/* Duration Chip on Bottom of Image */}
                      <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-[#F5F2EB]/90">
                        <span className="flex items-center gap-1.5 bg-[#0D0F0E]/75 backdrop-blur-sm px-2.5 py-0.5">
                          <Clock className="w-3 h-3 text-[#C8A96A]" />
                          {duration}
                        </span>
                        <button
                          onClick={() => setActiveServiceModal(service)}
                          className="text-[#C8A96A] hover:underline bg-[#0D0F0E]/75 backdrop-blur-sm px-2.5 py-0.5 flex items-center gap-1 cursor-pointer"
                        >
                          <Info className="w-3 h-3" />
                          <span>{isFa ? 'جزئیات' : 'Details'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Streamlined Card Body (Crisp & Scannable) */}
                    <div className="p-5 pb-3">
                      <h3 className="font-serif text-xl text-[#F5F2EB] group-hover:text-[#C8A96A] transition-colors mb-2 leading-snug">
                        {cleanTitle}
                      </h3>
                      <p className="text-xs text-[#9E988E] leading-relaxed line-clamp-2 mb-4">
                        {shortDesc}
                      </p>

                      {/* 2 Scannable Highlight Lines */}
                      <div className="space-y-1.5 border-t border-white/10 pt-3">
                        {deliverables.slice(0, 2).map((item, idx) => (
                          <div
                            key={idx}
                            className="text-[11px] text-[#F5F2EB]/85 flex items-center gap-2 truncate"
                          >
                            <Check className="w-3.5 h-3.5 text-[#3E7B5E] shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct 1-Click Action Footer */}
                  <div className="p-5 pt-3">
                    {service.isComingSoon ? (
                      <button
                        onClick={() => handleToggleWaitlist(service.id)}
                        className={`w-full py-2.5 px-4 text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isWaitlisted
                            ? 'bg-[#3E7B5E] text-[#F5F2EB]'
                            : 'bg-white/[0.06] text-[#C8A96A] border border-[#C8A96A]/40 hover:bg-[#C8A96A] hover:text-[#0D0F0E]'
                        }`}
                      >
                        {isWaitlisted ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>{isFa ? 'در لیست انتظار ثبت شد' : 'Waitlist Joined'}</span>
                          </>
                        ) : (
                          <>
                            <BellRing className="w-4 h-4" />
                            <span>{isFa ? 'اطلاع‌رسانی راه‌اندازی' : 'Notify Me'}</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleService(service)}
                          className={`flex-1 py-2.5 px-4 text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#2E5A44] text-[#F5F2EB] border border-[#3E7B5E]'
                              : 'bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E]'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>{isFa ? 'انتخاب شد' : 'Selected'}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>{isFa ? 'افزودن به سفارش' : 'Add Service'}</span>
                            </>
                          )}
                        </button>

                        {isSelected && onOpenOrderDrawer && (
                          <button
                            onClick={onOpenOrderDrawer}
                            className="px-3 py-2.5 bg-[#0D0F0E] border border-[#C8A96A] text-[#C8A96A] hover:bg-[#C8A96A] hover:text-[#0D0F0E] text-xs font-semibold transition-colors cursor-pointer shrink-0"
                          >
                            {isFa ? 'تکمیل ←' : 'Checkout →'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Detailed Service Protocol Modal (Opened on Demand When User Clicks 'Details') */}
      <AnimatePresence>
        {activeServiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveServiceModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#151816] border border-[#C8A96A]/40 max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-56">
                <img
                  src={activeServiceModal.image}
                  alt={isFa ? activeServiceModal.titleFa : activeServiceModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151816] via-[#151816]/45 to-transparent" />
                <button
                  onClick={() => setActiveServiceModal(null)}
                  className={`absolute top-4 ${
                    isFa ? 'left-4' : 'right-4'
                  } w-9 h-9 bg-[#0D0F0E]/80 border border-white/15 flex items-center justify-center text-[#F5F2EB] hover:border-[#C8A96A] cursor-pointer`}
                >
                  <X className="w-4 h-4" />
                </button>
                <div className={`absolute bottom-4 ${isFa ? 'right-6' : 'left-6'}`}>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C8A96A] mb-1">
                    {isFa
                      ? activeServiceModal.departmentFa
                      : activeServiceModal.department}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB]">
                    {isFa ? activeServiceModal.titleFa : activeServiceModal.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[#F5F2EB]/90 text-sm sm:text-base leading-relaxed mb-6">
                  {isFa
                    ? activeServiceModal.shortDescriptionFa
                    : activeServiceModal.shortDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0D0F0E] p-4 border border-white/10 mb-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[#9E988E] block mb-1">
                      {isFa ? 'تعرفه خدمت آسا' : 'Asa Service Fee'}
                    </span>
                    <span className="font-mono text-xl text-[#C8A96A]">
                      {activeServiceModal.isComingSoon
                        ? isFa
                          ? 'فاز ۲'
                          : 'Phase-2 Waitlist'
                        : formatPrice(
                            activeServiceModal.price,
                            lang,
                            activeServiceModal.billingUnit,
                            activeServiceModal.billingUnitFa,
                            currency
                          ).amount}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[#9E988E] block mb-1">
                      {isFa ? 'زمان‌بندی و هماهنگی' : 'Scheduling Window'}
                    </span>
                    <span className="text-sm text-[#F5F2EB]">
                      {isFa ? activeServiceModal.durationFa : activeServiceModal.duration}
                    </span>
                  </div>
                </div>

                {/* Included Deliverables */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-[0.16em] text-[#3E7B5E] font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {isFa ? 'موارد تحت پوشش این خدمت:' : 'Included in This Service:'}
                    </span>
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {(isFa
                      ? activeServiceModal.deliverablesFa
                      : activeServiceModal.deliverables
                    ).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F2EB]/85">
                        <ShieldCheck className="w-4 h-4 text-[#C8A96A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Explicit Exclusions */}
                  <h4 className="text-xs uppercase tracking-[0.16em] text-[#D99B26] font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>
                      {isFa
                        ? 'مرز غیربالینی و موارد خارج از تعهد:'
                        : 'Non-Clinical Boundary (Excluded):'}
                    </span>
                  </h4>
                  <ul className="space-y-2 bg-[#0D0F0E]/90 p-4 border border-[#D99B26]/30">
                    {(isFa
                      ? activeServiceModal.exclusionsFa
                      : activeServiceModal.exclusions
                    ).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#9E988E]">
                        <span className="text-[#D99B26] font-bold">×</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <button
                    onClick={() => setActiveServiceModal(null)}
                    className="px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer"
                  >
                    {isFa ? 'بستن' : 'Close'}
                  </button>
                  {!activeServiceModal.isComingSoon && (
                    <button
                      onClick={() => {
                        onToggleService(activeServiceModal);
                        setActiveServiceModal(null);
                      }}
                      className="px-6 py-3 bg-[#C8A96A] text-[#0D0F0E] text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#DFC48D] transition-colors cursor-pointer"
                    >
                      {selectedServiceIds.includes(activeServiceModal.id)
                        ? isFa
                          ? 'حذف از سفارش'
                          : 'Remove from Order'
                        : isFa
                        ? 'افزودن به سفارش'
                        : 'Add to Order'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
