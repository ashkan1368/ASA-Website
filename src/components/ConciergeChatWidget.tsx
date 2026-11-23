import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Clock,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';
import { Language } from '../data/catalogData';

export interface ConciergeInquiryMessage {
  id: string;
  senderName: string;
  senderContact: string;
  topic: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'replied';
  adminReply?: string;
}

interface ConciergeChatWidgetProps {
  lang: Language;
  messages: ConciergeInquiryMessage[];
  onSendMessage: (msg: Omit<ConciergeInquiryMessage, 'id' | 'createdAt' | 'status'>) => void;
  onOpenAdminInbox?: () => void;
}

const QUICK_INQUIRY_TEMPLATES = [
  {
    fa: 'هماهنگی خرید هفتگی منزل و نان سنگک داغ برای فردا صبح',
    en: 'Schedule weekly grocery & fresh Sangak delivery for tomorrow morning',
  },
  {
    fa: 'همراهی والدین برای ویزیت پزشک متخصص در بیمارستان جم / دی',
    en: 'Book Asa Pezeshk accompaniment for a clinic appointment in Tehran',
  },
  {
    fa: 'سوال درباره برنامه غذایی کم‌نمک هفتگی «آسا خوراک»',
    en: 'Inquiry about low-sodium Asa Khoraak weekly meal packages',
  },
];

export const ConciergeChatWidget: React.FC<ConciergeChatWidgetProps> = ({
  lang,
  messages,
  onSendMessage,
  onOpenAdminInbox,
}) => {
  const isFa = lang === 'fa';
  const [isOpen, setIsOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [messageText, setMessageText] = useState('');
  const [sentConfirmation, setSentConfirmation] = useState(false);
  const [tehranTimeStr, setTehranTimeStr] = useState('14:30 IRST');

  // Update live Tehran local time (Asia/Tehran)
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat(isFa ? 'fa-IR' : 'en-US', {
          timeZone: 'Asia/Tehran',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setTehranTimeStr(`${formatted} IRST`);
      } catch {
        setTehranTimeStr('14:30 IRST');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, [isFa]);

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    onSendMessage({
      senderName: senderName.trim() || (isFa ? 'فرزند خانواده (خارج از کشور)' : 'Overseas Family Member'),
      senderContact: senderContact.trim() || 'WhatsApp / Portal',
      topic: isFa ? 'میز هماهنگی مستقیم رکسانا بختیاری' : 'Direct Concierge Desk',
      message: messageText.trim(),
    });

    setMessageText('');
    setSentConfirmation(true);
    setTimeout(() => setSentConfirmation(false), 3500);
  };

  return (
    <>
      {/* Floating Action Button (Bottom Corner) */}
      <div
        className={`fixed bottom-16 sm:bottom-6 ${
          isFa ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
        } z-40 flex flex-col items-end gap-2`}
      >
        <motion.button
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-gradient-to-r from-[#171C19] to-[#111513] border-2 border-[#C8A96A] text-[#F5F2EB] px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3E7B5E] absolute -top-1 -right-1 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3E7B5E] absolute -top-1 -right-1" />
            <MessageSquare className="w-5 h-5 text-[#C8A96A]" />
          </div>
          <div className="text-start">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#C8A96A] block font-semibold">
              {isFa ? `تهران آنلاین · ${tehranTimeStr}` : `Tehran Live · ${tehranTimeStr}`}
            </span>
            <span className="text-xs font-serif text-[#F5F2EB] font-semibold">
              {isFa ? 'میز هماهنگی و گفتگوی مستقیم آسا' : 'Concierge Chat & Direct Desk'}
            </span>
          </div>
          {unreadCount > 0 && (
            <span className="bg-[#C8A96A] text-[#0D0F0E] font-mono text-[10px] font-bold px-1.5 py-0.5">
              {isFa ? unreadCount.toLocaleString('fa-IR') : unreadCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Concierge Messaging Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className={`fixed bottom-32 sm:bottom-22 ${
              isFa ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
            } z-50 w-[calc(100vw-24px)] sm:w-[410px] max-h-[80vh] bg-[#121614] border-2 border-[#C8A96A]/75 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="p-4 bg-[#161B18] border-b border-white/10 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#C8A96A] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#3E7B5E]" />
                  <span>
                    {isFa
                      ? 'پاسخگویی مستقیم رکسانا بختیاری (مدیر عملیات تهران)'
                      : 'Direct Desk · Roxana Bakhtiari (Tehran Ops Lead)'}
                  </span>
                </div>
                <h4 className="font-serif text-lg text-[#F5F2EB] mt-0.5">
                  {isFa
                    ? 'میز هماهنگی و گفتگوی ویژه خانواده'
                    : 'Asa Family Concierge Chat'}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-[#9E988E] mt-1">
                  <Clock className="w-3 h-3 text-[#C8A96A]" />
                  <span>
                    {isFa
                      ? `ساعت فعلی تهران: ${tehranTimeStr} · میانگین پاسخ: ۴ دقیقه`
                      : `Tehran Local Time: ${tehranTimeStr} · Avg Reply: 4 mins`}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-[#0D0F0E] border border-white/15 flex items-center justify-center text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation History & Quick Templates */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72 bg-[#0D0F0E]/60">
              <div className="bg-[#151A17] border border-[#C8A96A]/35 p-3 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#C8A96A] font-semibold">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>
                    {isFa ? 'رکسانا بختیاری — میز هماهنگی تهران' : 'Roxana Bakhtiari — Tehran Desk'}
                  </span>
                </div>
                <p className="text-[#F5F2EB]/90 leading-relaxed">
                  {isFa
                    ? 'سلام و درود؛ هر سوالی درباره خرید سفارشی منزل والدین، بسته‌های غذایی کم‌نمک آسا خوراک یا هماهنگی نوبت پزشک دارید، همین‌جا بنویسید تا مستقیماً در پنل مدیریت بررسی و هماهنگ کنیم.'
                    : 'Welcome to ASA. Send us any question regarding your parents’ grocery shopping, low-sodium meals, or doctor visit accompaniment in Tehran.'}
                </p>
              </div>

              {/* Recent Inquiries & Admin Replies */}
              {messages.map((m) => (
                <div key={m.id} className="space-y-1.5">
                  <div className="bg-[#181E1A] border border-white/10 p-3 text-xs ms-4">
                    <div className="flex items-center justify-between text-[10px] text-[#C8A96A] mb-1">
                      <span>{m.senderName}</span>
                      <span className="font-mono">{m.createdAt}</span>
                    </div>
                    <p className="text-[#F5F2EB]">{m.message}</p>
                  </div>
                  {m.adminReply && (
                    <div className="bg-[#2E5A44]/25 border border-[#3E7B5E] p-2.5 text-xs me-4">
                      <span className="text-[10px] text-[#8FE3B8] font-semibold block mb-0.5">
                        {isFa ? 'پاسخ مدیریت آسا:' : 'Asa Management Reply:'}
                      </span>
                      <p className="text-[#F5F2EB]">{m.adminReply}</p>
                    </div>
                  )}
                </div>
              ))}

              {sentConfirmation && (
                <div className="bg-[#2E5A44]/30 border border-[#3E7B5E] p-3 text-xs flex items-center justify-between gap-2">
                  <span className="text-[#F5F2EB] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A96A] shrink-0" />
                    {isFa
                      ? 'پیام شما ثبت شد و اعلان آن در پنل مدیریت فعال گردید.'
                      : 'Inquiry sent! Notification badge active in Admin Dashboard.'}
                  </span>
                  {onOpenAdminInbox && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onOpenAdminInbox();
                      }}
                      className="text-[11px] text-[#C8A96A] underline shrink-0 cursor-pointer"
                    >
                      {isFa ? 'مشاهده در پنل ادمین' : 'View in Admin'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Quick Pre-Filled Templates */}
            <div className="px-4 py-2 bg-[#141816] border-t border-white/10">
              <span className="text-[10px] text-[#9E988E] block mb-1.5">
                {isFa ? 'قالب‌های آماده پیام سریع:' : '1-Tap Inquiry Templates:'}
              </span>
              <div className="flex flex-wrap gap-1">
                {QUICK_INQUIRY_TEMPLATES.map((tpl, idx) => {
                  const text = isFa ? tpl.fa : tpl.en;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMessageText(text)}
                      className="text-[10px] bg-[#0D0F0E] hover:bg-[#C8A96A]/15 text-[#9E988E] hover:text-[#C8A96A] border border-white/10 px-2 py-1 transition-colors cursor-pointer text-start truncate max-w-full"
                    >
                      + {text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3.5 bg-[#161B18] border-t border-white/10 space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={isFa ? 'نام شما...' : 'Your Name...'}
                  className="bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-2.5 py-1.5 text-xs text-[#F5F2EB] outline-none"
                />
                <input
                  type="text"
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  placeholder={isFa ? 'شماره واتساپ / ایمیل...' : 'WhatsApp / Email...'}
                  className="bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-2.5 py-1.5 text-xs text-[#F5F2EB] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={
                    isFa
                      ? 'پیام خود را برای تیم هماهنگی بنویسید...'
                      : 'Type your message to the concierge team...'
                  }
                  className="flex-1 bg-[#0D0F0E] border border-white/15 focus:border-[#C8A96A] px-3 py-2 text-xs text-[#F5F2EB] outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isFa ? 'ارسال' : 'Send'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
