import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, ArrowRight, Download, Globe, ShieldCheck } from 'lucide-react';
import asaBrandLogo from '../assets/images/asa_luxury_brand_logo_1794678377299.jpg';
import { Language } from '../data/catalogData';
import { useLocalization } from '../i18n/LocalizationContext';

interface LuxuryLogoArtworkTransitionProps {
  isVisible: boolean;
  mode: 'intro' | 'transition';
  lang: Language;
  destinationLabel?: string;
  onSkipOrComplete: () => void;
  onToggleLanguage?: () => void;
  onDownloadStandaloneHtml?: () => void;
}

export const LuxuryLogoArtworkTransition: React.FC<LuxuryLogoArtworkTransitionProps> = ({
  isVisible,
  mode,
  lang,
  destinationLabel,
  onSkipOrComplete,
  onToggleLanguage,
  onDownloadStandaloneHtml,
}) => {
  const { t } = useLocalization();
  const isFa = lang === 'fa';
  const isIntro = mode === 'intro';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={`asa-motion-artwork-${mode}-${destinationLabel || 'root'}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: isIntro ? 0.7 : 0.4, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={onSkipOrComplete}
          className="fixed inset-0 z-[100] bg-[#090B0A] flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer px-4"
        >
          {/* Top Utility Controls on Opening Screen (Language Toggle + Standalone HTML Download) */}
          {isIntro && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-10 sm:top-14 left-6 right-6 sm:left-12 sm:right-12 z-20 flex flex-wrap items-center justify-between gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#C8A96A]/30 bg-[#121614]/85 text-[11px] text-[#D8D2C5]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A96A]" />
                <span>{t('brand.fullMotto')}</span>
              </div>

              <div className="flex items-center gap-2">
                {onDownloadStandaloneHtml && (
                  <button
                    type="button"
                    onClick={onDownloadStandaloneHtml}
                    className="px-3 py-1.5 bg-[#151816] border border-[#3E7B5E]/70 hover:border-[#C8A96A] text-[#8FE3B8] hover:text-[#F5F2EB] text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C8A96A]" />
                    <span>{t('intro.downloadStandalone')}</span>
                  </button>
                )}

                {onToggleLanguage && (
                  <button
                    type="button"
                    onClick={onToggleLanguage}
                    className="px-3 py-1.5 bg-[#151816] border border-[#C8A96A]/45 hover:bg-[#C8A96A] hover:text-[#0D0F0E] text-[#C8A96A] text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{t('header.switchLanguageLabel')}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Ambient Golden Radial Glow & Architectural Grid */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              isIntro
                ? { scale: [0.92, 1.12, 0.92], opacity: [0.32, 0.58, 0.32] }
                : { scale: [0.85, 1.15, 1], opacity: [0, 0.55, 0.35] }
            }
            transition={
              isIntro
                ? { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.75, ease: 'easeOut' }
            }
            className="absolute w-[520px] h-[520px] sm:w-[760px] sm:h-[760px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(200,169,106,0.30) 0%, rgba(46,90,68,0.15) 42%, rgba(9,11,10,0) 72%)',
            }}
          />

          {/* Top & Bottom Luxury Silk Curtain Borders */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: isIntro ? 1.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-6 sm:top-8 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/65 to-transparent"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: isIntro ? 1.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 sm:bottom-8 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/65 to-transparent"
          />

          {/* Centerpiece: Persian Geometric Mandala + Luxury Brand Logo Motion Artwork */}
          <div className="relative flex items-center justify-center w-64 h-64 sm:w-88 sm:h-88 mt-6 sm:mt-0">
            {/* Outer Continuously Rotating Filigree SVG Ring 1 */}
            <motion.svg
              viewBox="0 0 400 400"
              initial={{ rotate: 0, scale: 0.78, opacity: 0 }}
              animate={
                isIntro
                  ? { rotate: 360, scale: 1, opacity: 0.8 }
                  : { rotate: 90, scale: 1, opacity: 0.75 }
              }
              transition={
                isIntro
                  ? {
                      rotate: { duration: 32, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 1.4, ease: 'easeOut' },
                      opacity: { duration: 1.2, ease: 'easeOut' },
                    }
                  : { duration: 0.85, ease: 'easeOut' }
              }
              className="absolute inset-0 w-full h-full text-[#C8A96A]"
            >
              <defs>
                <linearGradient id="asaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8D19A" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#C8A96A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8E6F36" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              {/* Octagonal Persian Shamsa Star */}
              <circle
                cx="200"
                cy="200"
                r="182"
                fill="none"
                stroke="url(#asaGoldGrad)"
                strokeWidth="0.8"
                strokeDasharray="6 6"
              />
              <circle
                cx="200"
                cy="200"
                r="164"
                fill="none"
                stroke="url(#asaGoldGrad)"
                strokeWidth="1.2"
              />
              <rect
                x="78"
                y="78"
                width="244"
                height="244"
                fill="none"
                stroke="url(#asaGoldGrad)"
                strokeWidth="1"
              />
              <rect
                x="78"
                y="78"
                width="244"
                height="244"
                fill="none"
                stroke="url(#asaGoldGrad)"
                strokeWidth="1"
                transform="rotate(45 200 200)"
              />
            </motion.svg>

            {/* Counter-Rotating Inner Geometric Halo SVG Ring 2 */}
            <motion.svg
              viewBox="0 0 400 400"
              initial={{ rotate: 0, scale: 0.65, opacity: 0 }}
              animate={
                isIntro
                  ? { rotate: -360, scale: 1, opacity: 0.88 }
                  : { rotate: -45, scale: 1, opacity: 0.85 }
              }
              transition={
                isIntro
                  ? {
                      rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 1.4, ease: 'easeOut' },
                      opacity: { duration: 1.2, ease: 'easeOut' },
                    }
                  : { duration: 0.75, ease: 'easeOut' }
              }
              className="absolute inset-6 sm:inset-8 w-[calc(100%-3rem)] h-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] sm:h-[calc(100%-4rem)]"
            >
              <circle
                cx="200"
                cy="200"
                r="142"
                fill="none"
                stroke="#C8A96A"
                strokeWidth="1.4"
                strokeOpacity="0.55"
              />
              <polygon
                points="200,36 242,158 364,200 242,242 200,364 158,242 36,200 158,158"
                fill="none"
                stroke="#C8A96A"
                strokeWidth="1.1"
                strokeOpacity="0.45"
              />
              {/* 8 Cardinal Gold Pearls */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <circle
                  key={angle}
                  cx="200"
                  cy="28"
                  r="3.5"
                  fill="#E8D19A"
                  transform={`rotate(${angle} 200 200)`}
                />
              ))}
            </motion.svg>

            {/* Pulsing Emerald & Gold Aura Behind Crest */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={
                isIntro
                  ? { scale: [0.92, 1.12, 0.92], opacity: [0.65, 0.95, 0.65] }
                  : { scale: [0.8, 1.08, 1], opacity: [0, 0.9, 0.75] }
              }
              transition={
                isIntro
                  ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.55, ease: 'easeOut' }
              }
              className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#C8A96A]/35 via-[#2E5A44]/30 to-[#E8D19A]/35 blur-xl"
            />

            {/* The Asa Luxury Brand Logo Crest */}
            <motion.div
              initial={{ scale: 0.68, opacity: 0, rotateY: -25 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{
                duration: isIntro ? 1.15 : 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 w-32 h-32 sm:w-44 sm:h-44 rounded-sm overflow-hidden border-2 border-[#C8A96A] bg-[#0D0F0E] shadow-[0_0_65px_rgba(200,169,106,0.5)]"
            >
              <img
                src={asaBrandLogo}
                alt="Asa Luxury Brand Crest Artwork"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {/* Animated Diagonal Gold Light Sheen Across Logo */}
              <motion.div
                initial={{ x: '-140%' }}
                animate={{ x: '220%' }}
                transition={
                  isIntro
                    ? {
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 2.0,
                        ease: 'easeInOut',
                      }
                    : {
                        duration: 0.65,
                        delay: 0.05,
                        ease: 'easeInOut',
                      }
                }
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#F5E6C4]/50 to-transparent -skew-x-12 pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Editorial Brand Typography & Interactive Enter Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isIntro ? 0.85 : 0.35, delay: isIntro ? 0.25 : 0.05 }}
            className="relative z-10 text-center px-4 mt-2 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#C8A96A] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {destinationLabel
                  ? destinationLabel
                  : `${t('brand.name')} · ${t('brand.motto')}`}
              </span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#F5F2EB] tracking-tight mb-2">
              {isIntro
                ? t('intro.headline')
                : destinationLabel || t('intro.transitioning')}
            </h2>

            <p className="text-xs sm:text-sm text-[#9E988E]">
              {t('brand.tagline')}
            </p>

            {/* Animated Golden Filigree Shimmer Bar */}
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 mx-auto mt-4 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={isIntro ? { x: ['-100%', '100%'] } : { x: '0%' }}
                transition={
                  isIntro
                    ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.55, ease: 'easeInOut' }
                }
                className="w-full h-full bg-gradient-to-r from-transparent via-[#E8D19A] to-[#C8A96A]"
              />
            </div>

            {isIntro && (
              <div className="mt-6 flex flex-col items-center gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSkipOrComplete();
                  }}
                  className="px-7 sm:px-9 py-3 sm:py-3.5 bg-[#C8A96A] hover:bg-[#E5C98B] text-[#0D0F0E] font-bold text-xs sm:text-sm uppercase tracking-[0.16em] inline-flex items-center gap-2.5 shadow-[0_0_40px_rgba(200,169,106,0.55)] transition-all cursor-pointer"
                >
                  <span>{t('intro.enterButton')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </motion.button>

                <span className="text-[11px] text-[#9E988E]/90">
                  {t('intro.clickHint')}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
