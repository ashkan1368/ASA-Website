import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  Layers,
  Mic,
  Compass,
} from 'lucide-react';
import { Language } from '../data/catalogData';

export interface WelcomeTourStep {
  id: 'services' | 'supermarket' | 'order-drawer';
  badgeFa: string;
  badgeEn: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  actionHintFa: string;
  actionHintEn: string;
}

export const WELCOME_TOUR_STEPS: WelcomeTourStep[] = [
  {
    id: 'services',
    badgeFa: 'گام ۱ از ۳ · خدمات تخصصی آسا',
    badgeEn: 'Step 1 of 3 · Asa 3-Pillar Services',
    titleFa: 'انتخاب ۱-کلیکی خدمات منزل، خوراک و همراهی پزشک',
    titleEn: '1-Click Selection of Home, Meal & Doctor Services',
    descFa:
      'در این بخش می‌توانید بدون سردرگمی، از نوار «انتخاب سریع ۱-کلیکی» یا ۴ کارت تصویری، خدمت مورد نظر (خرید منزل، غذای خانگی یا همراهی پزشک) را انتخاب کنید.',
    descEn:
      'Use the 60-Second Express 1-Click Bar or the 4 visual pillar cards to reserve home shopping, fresh Persian meals, or doctor visit accompaniment.',
    actionHintFa: 'نمایش بخش خدمات ۳ ستونه آسا',
    actionHintEn: 'Highlighting Asa Services Directory',
  },
  {
    id: 'supermarket',
    badgeFa: 'گام ۲ از ۳ · سوپرمارکت و آسا خوراک',
    badgeEn: 'Step 2 of 3 · Family Supermarket & Meals',
    titleFa: 'سوپرمارکت آنلاین خانواده به قیمت دقیق فاکتور فروشگاه',
    titleEn: 'Family Supermarket at Exact Store-Receipt Price',
    descFa:
      'بسته‌های آماده خانواده یا اقلام روزانه (میوه دست‌چین، گوشت، نان سنگک و غذاهای کم‌نمک آسا خوراک) را با ۰٪ سود پنهان روی کالا به سبد اضافه کنید.',
    descEn:
      'Add curated family bundles or individual groceries and low-sodium Persian meals with 0% markup on store receipt prices.',
    actionHintFa: 'نمایش سوپرمارکت و بسته‌های آسا خوراک',
    actionHintEn: 'Highlighting Supermarket & Asa Khoraak',
  },
  {
    id: 'order-drawer',
    badgeFa: 'گام ۳ از ۳ · سبد سفارش و ثبت صوتی',
    badgeEn: 'Step 3 of 3 · Order Drawer & Voice Input',
    titleFa: 'تکمیل فوری سفارش، تغییر ارز و ثبت صوتی با میکروفون',
    titleEn: 'Instant Checkout, Multi-Currency & Voice-to-Cart',
    descFa:
      'از دکمه طلایی «سبد سفارش» در بالای صفحه، می‌توانید با صدای خود (میکروفون) کالاها را اضافه کنید، قیمت را به ریال/دلار/یورو ببینید و سفارش را نهایی کنید.',
    descEn:
      'Click the golden "Asa Order" button in the top header to speak your order via microphone, toggle IRR/USD/EUR, and dispatch to Tehran.',
    actionHintFa: 'تمرکز روی دکمه سبد سفارش و ثبت صوتی در هدر',
    actionHintEn: 'Highlighting Header Order & Voice Button',
  },
];

interface WelcomeTourProps {
  isOpen: boolean;
  currentStepIndex: number;
  lang: Language;
  onSelectStep: (idx: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onOpenOrderDrawerDemo: () => void;
}

export const WelcomeTour: React.FC<WelcomeTourProps> = ({
  isOpen,
  currentStepIndex,
  lang,
  onSelectStep,
  onNext,
  onPrev,
  onClose,
  onOpenOrderDrawerDemo,
}) => {
  const isFa = lang === 'fa';
  const step = WELCOME_TOUR_STEPS[currentStepIndex] || WELCOME_TOUR_STEPS[0];
  const isLastStep = currentStepIndex === WELCOME_TOUR_STEPS.length - 1;
  const NextIcon = isFa ? ArrowLeft : ArrowRight;
  const PrevIcon = isFa ? ArrowRight : ArrowLeft;

  // Allow dismissing with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const getStepIcon = (id: WelcomeTourStep['id']) => {
    if (id === 'services') return <Layers className="w-5 h-5 text-[#C8A96A]" />;
    if (id === 'supermarket') return <ShoppingBag className="w-5 h-5 text-[#C8A96A]" />;
    return <Mic className="w-5 h-5 text-[#C8A96A]" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Dimmed Backdrop Overlay — Clickable to dismiss easily */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-[#090B0A]/65 backdrop-blur-[2px]"
          />

          {/* Top Target Spotlight Indicator Banner */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[75] pointer-events-none px-4 w-full max-w-md flex justify-center"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#151816]/95 border border-[#C8A96A] shadow-[0_0_30px_rgba(200,169,106,0.45)] text-xs text-[#F5F2EB]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8A96A] animate-ping" />
              <Compass className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span className="font-medium text-[#C8A96A]">
                {isFa ? step.actionHintFa : step.actionHintEn}
              </span>
            </div>
          </motion.div>

          {/* Interactive Luxury Floating Guide Card (Bottom Center/Right) */}
          <motion.div
            key={`tour-step-${step.id}`}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-8 z-[80] sm:w-[440px] bg-[#121614] border-2 border-[#C8A96A] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(200,169,106,0.28)] p-6"
          >
            {/* Header Row with Step Pill & Instant Dismiss */}
            <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                {getStepIcon(step.id)}
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#C8A96A] font-semibold">
                  {isFa ? step.badgeFa : step.badgeEn}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={isFa ? 'بستن راهنما' : 'Dismiss Tour'}
                className="px-2.5 py-1 text-[11px] text-[#9E988E] hover:text-[#F5F2EB] border border-white/15 hover:border-[#C8A96A] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{isFa ? 'رد کردن' : 'Dismiss'}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step Title & Concise Explanation */}
            <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB] leading-snug mb-2">
              {isFa ? step.titleFa : step.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-[#9E988E] leading-relaxed mb-5">
              {isFa ? step.descFa : step.descEn}
            </p>

            {/* Step Progress Dots (1 - 2 - 3) */}
            <div className="flex items-center gap-2 mb-5">
              {WELCOME_TOUR_STEPS.map((s, idx) => {
                const active = idx === currentStepIndex;
                const completed = idx < currentStepIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelectStep(idx)}
                    className={`h-2 transition-all cursor-pointer ${
                      active
                        ? 'w-10 bg-[#C8A96A]'
                        : completed
                        ? 'w-5 bg-[#3E7B5E]'
                        : 'w-5 bg-white/15 hover:bg-white/30'
                    }`}
                    aria-label={`Step ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Footer Controls */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onPrev}
                disabled={currentStepIndex === 0}
                className={`px-3.5 py-2 text-xs border flex items-center gap-1.5 transition-colors ${
                  currentStepIndex === 0
                    ? 'border-white/5 text-white/20 cursor-not-allowed'
                    : 'border-white/20 text-[#F5F2EB] hover:border-[#C8A96A] cursor-pointer'
                }`}
              >
                <PrevIcon className="w-3.5 h-3.5" />
                <span>{isFa ? 'قبلی' : 'Previous'}</span>
              </button>

              <div className="flex items-center gap-2">
                {isLastStep ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenOrderDrawerDemo();
                      }}
                      className="px-4 py-2 bg-[#2E5A44] hover:bg-[#3E7B5E] text-[#F5F2EB] border border-[#3E7B5E] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Mic className="w-3.5 h-3.5 text-[#C8A96A]" />
                      <span>{isFa ? 'امتحان سبد سفارش' : 'Open Order Drawer'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isFa ? 'پایان راهنما' : 'Finish'}</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onNext}
                    className="px-5 py-2 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs uppercase tracking-[0.12em] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_20px_rgba(200,169,106,0.3)]"
                  >
                    <span>{isFa ? 'بخش بعدی' : 'Next Area'}</span>
                    <NextIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
