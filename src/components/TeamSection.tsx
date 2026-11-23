import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
  Film,
  RotateCcw,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { Language } from '../data/catalogData';

import imgDariush from '../assets/images/team_chef_dariush_1794674174001.jpg';
import imgRoxana from '../assets/images/team_steward_roxana_1794674176008.jpg';
import imgArash from '../assets/images/team_nutritionist_arash_1794674177388.jpg';
import imgClara from '../assets/images/team_sommelier_clara_1794674177365.jpg';

export interface TeamMemberProfile {
  id: string;
  name: string;
  nameFa: string;
  role: string;
  roleFa: string;
  division: string;
  divisionFa: string;
  experienceYears: string;
  experienceYearsFa: string;
  credentials: string;
  credentialsFa: string;
  portrait: string;
  quote: string;
  quoteFa: string;
  bio: string;
  bioFa: string;
  specialties: string[];
  specialtiesFa: string[];
  videoDuration: string;
  videoDurationFa: string;
  videoMonologue: string[];
  videoMonologueFa: string[];
}

export const TEAM_MEMBERS: TeamMemberProfile[] = [
  {
    id: 'member-roxana',
    name: 'Roxana Bakhtiari',
    nameFa: 'رکسانا بختیاری',
    role: 'Head of Asa Hamrah & Chief Family Steward',
    roleFa: 'مدیر عملیات «آسا همراه» و سرپرست همراهان خانواده در تهران',
    division: 'Asa Hamrah · Practical Companionship & Errands',
    divisionFa: 'آسا همراه · همراهی روزمره، خرید و امور فرودگاهی',
    experienceYears: '15 Years Experience',
    experienceYearsFa: '۱۵ سال سابقه اجرایی',
    credentials: 'Senior Family Hospitality & Safeguarding Specialist · Tehran',
    credentialsFa: 'متخصص مدیریت خدمات خانواده، استانداردهای ایمنی و حریم خصوصی در تهران',
    portrait: imgRoxana,
    quote:
      '“When you live thousands of miles away from Tehran, your greatest wish is knowing a respectful, trustworthy professional is standing right beside your parents.”',
    quoteFa:
      '«وقتی هزاران کیلومتر دور از تهران زندگی می‌کنید، بزرگ‌ترین آرامش شما این است که بدانید فردی امین، وقت‌شناس و محترمانه در کنار مادر و پدرتان حضور دارد.»',
    bio: 'Roxana personally interviews, background-checks, and trains every Asa Hamrah steward in Tehran. She designed Asa’s two-layer confirmation protocol and respectful home etiquette standards.',
    bioFa:
      'رکسانا شخصاً فرآیند احراز هویت، گواهی عدم سوءپیشینه و آموزش اخلاق حرفه‌ای تمامی همراهان «آسا همراه» در تهران را مدیریت می‌کند. او طراح پروتکل تحویل محترمانه در منزل و هماهنگی دوطرفه با فرزندان خارج از کشور است.',
    specialties: [
      'Vetted Tehran Companion Training',
      'Pass-Through Shopping & Receipt Audit',
      'IKA & Mehrabad Airport Senior Assistance',
    ],
    specialtiesFa: [
      'گزینش و آموزش تخصصی همراهان امین در تهران',
      'نظارت بر خرید با فاکتور رسمی و قوانین جایگزینی کالا',
      'پروتکل استقبال و بدرقه سالمندان در فرودگاه امام و مهرآباد',
    ],
    videoDuration: '01:45',
    videoDurationFa: '۰۱:۴۵',
    videoMonologue: [
      'Hello, I am Roxana Bakhtiari, Head of Asa Hamrah Operations in Tehran.',
      'Many of our clients live in North America, Europe, or Australia while their parents live here in Tehran.',
      'Whether your mother needs fresh groceries arranged in her kitchen or your father needs a patient companion at the airport, my team shows up as family.',
      'And the moment our visit concludes, you receive a clear, factual Family Update with receipts and peace of mind.',
    ],
    videoMonologueFa: [
      'سلام و درود؛ من رکسانا بختیاری، مدیر عملیات «آسا همراه» در تهران هستم.',
      'بسیاری از مخاطبان ما در کانادا، آمریکا، اروپا یا استرالیا زندگی می‌کنند در حالی که والدین عزیزشان در تهران تنها هستند.',
      'چه مادر شما نیاز به خرید دقیق هفتگی و چیدمان در آشپزخانه داشته باشد و چه پدرتان نیازمند همراهی صبورانه در فرودگاه باشد، تیم من با احترام کامل کنارشان است.',
      'بلافاصله پس از پایان خدمت نیز، «گزارش واقعی خانواده» به همراه تصویر فاکتور رسمی برای شما ارسال می‌شود تا خیالتان از همه نظر آسوده باشد.',
    ],
  },
  {
    id: 'member-arash',
    name: 'Dr. Arash Tehrani',
    nameFa: 'دکتر آرش تهرانی',
    role: 'Director of Asa Pezeshk Coordination & Non-Clinical Ethics',
    roleFa: 'مدیر هماهنگی «آسا پزشک» و استانداردهای اخلاق غیربالینی',
    division: 'Asa Pezeshk · Appointment & Medical Visit Coordination',
    divisionFa: 'آسا پزشک · هماهنگی نوبت، آزمایشگاه و همراهی مراکز درمانی',
    experienceYears: '14 Years Experience',
    experienceYearsFa: '۱۴ سال سابقه تخصصی',
    credentials: 'Health Systems Coordinator · Patient Navigation Specialist',
    credentialsFa: 'متخصص مدیریت سیستم‌های سلامت و هماهنگی مسیر درمان سالمندان در تهران',
    portrait: imgArash,
    quote:
      '“Asa Pezeshk never crosses clinical boundaries; instead, we solve the exhausting logistics of Tehran clinics, parking, queues, and appointment follow-ups.”',
    quoteFa:
      '«آسا پزشک هرگز وارد مداخلات بالینی نمی‌شود؛ ما بار سنگین هماهنگی نوبت، ترافیک، صف پذیرش و دریافت جواب آزمایش در کلینیک‌های تهران را از دوش والدین شما برمی‌داریم.»',
    bio: 'Dr. Tehrani leads Asa Pezeshk’s network across Tehran’s premier hospitals and diagnostic centers. He ensures every coordinator strictly respects non-clinical boundaries while delivering accurate administrative updates to overseas children.',
    bioFa:
      'دکتر آرش تهرانی هدایت تیم «آسا پزشک» را در ارتباط با بیمارستان‌ها، کلینیک‌های تخصصی و آزمایشگاه‌های معتبر تهران بر عهده دارد. او تضمین می‌کند که همراهان آسا ضمن رعایت دقیق مرزهای غیربالینی، تمامی امور اداری و پذیرش والدین را بی‌نقص انجام دهند.',
    specialties: [
      'Specialist Appointment Scheduling in Tehran',
      'Door-to-Door Clinic Accompaniment',
      'Consented Factual Family Update Reporting',
    ],
    specialtiesFa: [
      'اخذ نوبت و هماهنگی با مطب پزشکان متخصص در تهران',
      'همراهی کامل از درب منزل تا پایان ویزیت و بازگشت ایمن',
      'تدوین «گزارش واقعی خانواده» بدون تفسیر یا مداخله پزشکی',
    ],
    videoDuration: '01:52',
    videoDurationFa: '۰۱:۵۲',
    videoMonologue: [
      'Warm greetings. I am Dr. Arash Tehrani, Director of Asa Pezeshk Coordination.',
      'Navigating specialist appointments and diagnostic centers in Tehran traffic can be overwhelming for older parents.',
      'Our coordinators pick up your parents from their home, handle clinic check-in and paperwork, and bring them safely back.',
      'With your parent’s explicit consent, we send you a factual Family Update confirming attendance, next visit dates, and administrative notes.',
    ],
    videoMonologueFa: [
      'با سلام و احترام؛ من دکتر آرش تهرانی، مدیر بخش «آسا پزشک» هستم.',
      'هماهنگی نوبت پزشک، ترافیک تهران و مراحل پذیرش در کلینیک‌ها یا آزمایشگاه‌ها برای والدین سالمند بسیار خسته‌کننده است.',
      'همکاران آموزش‌دیده ما در آسا پزشک، والدین شما را از درب منزل همراهی کرده، امور پذیرش و نوبت را انجام می‌دهند و ایشان را به سلامت به منزل بازمی‌گردانند.',
      'سپس با رضایت کامل والدین، یک گزارش واقعی و دقیق از ساعت حضور و نوبت‌های بعدی برای شما ارسال می‌کنیم.',
    ],
  },
  {
    id: 'member-dariush',
    name: 'Chef Dariush Kaviani',
    nameFa: 'سرآشپز داریوش کاویانی',
    role: 'Head of Asa Khoraak Culinary & Nutrition Steward',
    roleFa: 'سرپرست «آسا خوراک» و استانداردهای تغذیه سالمندان',
    division: 'Asa Khoraak · Home-Style Meals & Tehran Supermarket',
    divisionFa: 'آسا خوراک · بسته‌های غذایی اصیل و تامین اقلام تازه روز',
    experienceYears: '19 Years Experience',
    experienceYearsFa: '۱۹ سال سابقه حرفه‌ای',
    credentials: 'Traditional Persian Culinary Master & Senior Dietetics Advisor',
    credentialsFa: 'استاد آشپزی اصیل ایرانی و مشاور تغذیه سلامت‌محور ویژه خانواده و سالمندان',
    portrait: imgDariush,
    quote:
      '“Food for our parents in Tehran must taste like authentic home cooking—prepared with 100% pure saffron, olive oil, low sodium, and licensed hygiene.”',
    quoteFa:
      '«غذایی که به دست مادر و پدرمان در تهران می‌رسد باید طعم اصیل خانه بدهد؛ پخته‌شده با زعفران خالص، روغن سالم، نمک کنترل‌شده و از آشپزخانه‌های دارای مجوز رسمی بهداشت.»',
    bio: 'Chef Dariush oversees Asa Khoraak’s partner kitchens and daily supermarket sourcing in Tehran. Every meal plan is crafted with zero industrial oils, gentle spices, and strict cold-chain delivery.',
    bioFa:
      'سرآشپز داریوش کاویانی نظارت مستقیم بر آشپزخانه‌های همکار «آسا خوراک» و تامین روزانه میوه، پروتئین و نان سنگک تازه در تهران دارد. تمامی غذاها بدون روغن‌های صنعتی، با نمک کنترل‌شده و در بسته‌بندی بهداشتی پلمپ‌شده ارسال می‌شوند.',
    specialties: [
      'Low-Sodium Traditional Persian Meals',
      'Weekly Senior Meal Plans in Tehran',
      'Orchard Produce & Butcher Quality Inspection',
    ],
    specialtiesFa: [
      'پخت غذاهای اصیل ایرانی کم‌نمک و کم‌چرب ویژه والدین',
      'طراحی برنامه غذایی هفتگی و مهمانی‌های خانوادگی در تهران',
      'کنترل کیفیت روزانه میوه، گوشت تازه و لبنیات سنتی',
    ],
    videoDuration: '01:38',
    videoDurationFa: '۰۱:۳۸',
    videoMonologue: [
      'Hello, I am Chef Dariush Kaviani, leading Asa Khoraak in Tehran.',
      'When parents live alone, cooking balanced, nutritious meals every day becomes difficult.',
      'Through Asa Khoraak, we prepare low-sodium, heart-healthy Persian dishes using saffron, fresh herbs, and tender cuts—delivered sealed and dated right to their refrigerator.',
      'You can order single comfort packs, weekly plans, or fresh supermarket items anytime.',
    ],
    videoMonologueFa: [
      'درود بر شما؛ من داریوش کاویانی، سرپرست بخش «آسا خوراک» هستم.',
      'وقتی پدر و مادرها در منزل تنها هستند، پخت‌وپز روزانه غذای سالم و مقوی برایشان دشوار می‌شود.',
      'در آسا خوراک، ما غذاهای اصیل ایرانی را با نمک کم، روغن زیتون و کنجد، زعفران خالص و گوشت تازه طبخ می‌کنیم و با برچسب تاریخ تولید در یخچال منزلشان قرار می‌دهیم.',
      'شما می‌توانید پکیج‌های هفتگی غذا یا اقلام تازه سوپرمارکتی را به‌راحتی برایشان سفارش دهید.',
    ],
  },
  {
    id: 'member-clara',
    name: 'Clara Rostami',
    nameFa: 'کلارا رستمی',
    role: 'Director of Diaspora Client Trust & Family Updates',
    roleFa: 'مدیر ارتباط با ایرانیان خارج از کشور و «گزارش خانواده»',
    division: 'Client Relations · Time-Zone Support & Quality Assurance',
    divisionFa: 'ارتباط با مشتریان · پشتیبانی چندزمانه و کنترل کیفیت گزارش‌ها',
    experienceYears: '12 Years Experience',
    experienceYearsFa: '۱۲ سال سابقه بین‌المللی',
    credentials: 'Cross-Border Family Care & Quality Auditing Lead',
    credentialsFa: 'متخصص ارتباطات بین‌الملل، شفافیت مالی و ممیزی رضایت خانواده‌ها',
    portrait: imgClara,
    quote:
      '“Distance should never feel like helplessness. Our team bridges the time-zone gap between Toronto, London, Los Angeles, and Tehran with total honesty.”',
    quoteFa:
      '«فاصله جغرافیایی هرگز نباید به معنای بی‌خبری یا نگرانی باشد؛ ما پل ارتباطی شفاف و صادقانه میان فرزندان در سراسر جهان و والدینشان در تهران هستیم.»',
    bio: 'Clara manages communication with overseas and busy local decision-makers. She audits every pass-through store receipt, substitution rule approval, and post-visit Family Update before it reaches your screen.',
    bioFa:
      'کلارا رستمی مدیریت ارتباط با مشتریان خارج از ایران و بررسی دقیق تمامی «گزارش‌های واقعی خانواده» را بر عهده دارد. او اطمینان حاصل می‌کند که هر فاکتور خرید، قانون جایگزینی کالا و رضایت‌نامه والدین با شفافیت ۱۰۰ درصدی ثبت و ارسال شود.',
    specialties: [
      'Diaspora Time-Zone Coordination',
      'Pass-Through Receipt & Price Transparency',
      'Occasion Care, Flowers & Gift Delivery in Tehran',
    ],
    specialtiesFa: [
      'پشتیبانی هماهنگ با ساعت کاری اروپا، آمریکای شمالی و استرالیا',
      'ممیزی شفافیت فاکتورهای خرید و تفکیک کارمزد خدمات',
      'اجرای خدمات مناسبتی، گل‌آرایی و هدیه برای روز مادر، پدر و تولد',
    ],
    videoDuration: '01:30',
    videoDurationFa: '۰۱:۳۰',
    videoMonologue: [
      'Greetings, I am Clara Rostami, Director of Diaspora Client Trust at Asa.',
      'We built Asa around one core promise: total honesty and zero hidden markups.',
      'When you book an order for your family in Tehran, you choose exact substitution rules, see separated pass-through store receipts, and receive a consented Family Update.',
      'We are honored to be your trusted hands and heart in Tehran.',
    ],
    videoMonologueFa: [
      'سلام؛ من کلارا رستمی، مدیر ارتباط با مشتریان و تضمین کیفیت در «آسا» هستم.',
      'ما آسا را بر پایه یک تعهد اصلی بنا کردیم: صداقت کامل، احترام به کرامت والدین و شفافیت مالی بدون هیچ‌گونه هزینه پنهان.',
      'هنگام ثبت سفارش برای خانواده‌تان در تهران، شما قانون جایگزینی کالا را خودتان انتخاب می‌کنید، فاکتور واقعی فروشگاه را می‌بینید و گزارش دقیق انجام کار را دریافت می‌نمایید.',
      'افتخار ماست که دستان امین و همراه مطمئن شما در تهران باشیم.',
    ],
  },
];

/**
 * Embedded Video Player Component inside each Steward Profile Card.
 * Uses a blurred / stylized luxury poster image placeholder until activated by the user,
 * then transitions smoothly into the interactive video monologue player.
 */
interface StewardCardVideoPlayerProps {
  member: TeamMemberProfile;
  isFa: boolean;
  isActiveVideo: boolean;
  onActivateVideo: () => void;
  onDeactivateVideo: () => void;
}

const StewardCardVideoPlayer: React.FC<StewardCardVideoPlayerProps> = ({
  member,
  isFa,
  isActiveVideo,
  onActivateVideo,
  onDeactivateVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [subtitleIndex, setSubtitleIndex] = useState<number>(0);

  const monologues = isFa ? member.videoMonologueFa : member.videoMonologue;

  useEffect(() => {
    if (isActiveVideo) {
      setProgress(0);
      setSubtitleIndex(0);
      setIsPlaying(true);
    }
  }, [isActiveVideo]);

  useEffect(() => {
    if (!isActiveVideo || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        const next = prev + 1.1;
        const segment = Math.min(
          monologues.length - 1,
          Math.floor((next / 100) * monologues.length)
        );
        setSubtitleIndex(segment);
        return next;
      });
    }, 130);
    return () => clearInterval(interval);
  }, [isActiveVideo, isPlaying, monologues.length]);

  return (
    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0D0F0E] border-b border-white/10 select-none">
      {!isActiveVideo ? (
        /* Stylized / Blurred Poster Placeholder State until Video Is Activated */
        <div className="relative w-full h-full group/poster">
          {/* Background Blurred Stylized Poster Layer */}
          <img
            src={member.portrait}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-[6px] opacity-45 transition-all duration-700 group-hover/poster:blur-[3px] group-hover/poster:opacity-65"
          />

          {/* Centered Framed Portrait Preview + Stylized Film Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F0E] via-[#0D0F0E]/55 to-black/50" />
          <div className="absolute inset-3 border border-[#C8A96A]/25 pointer-events-none" />

          {/* Top Placeholder Status Strip */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
            <span className="bg-[#0D0F0E]/90 backdrop-blur-md border border-[#C8A96A]/40 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#C8A96A] flex items-center gap-1.5 font-medium">
              <Video className="w-3 h-3" />
              <span>
                {isFa ? 'پوستر ویدیوی معرفی همراه' : 'Video Intro Poster Placeholder'}
              </span>
            </span>
            <span className="font-mono text-xs text-[#F5F2EB] bg-[#0D0F0E]/90 px-2.5 py-1 border border-white/15">
              {isFa ? member.videoDurationFa : member.videoDuration}
            </span>
          </div>

          {/* Center Interactive Launch Video Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
            <button
              onClick={onActivateVideo}
              aria-label={
                isFa
                  ? `پخش ویدیوی معرفی ${member.nameFa}`
                  : `Play video introduction for ${member.name}`
              }
              className="w-16 h-16 rounded-full bg-[#0D0F0E]/85 backdrop-blur-md border-2 border-[#C8A96A] text-[#C8A96A] flex items-center justify-center hover:scale-110 hover:bg-[#C8A96A] hover:text-[#0D0F0E] transition-all duration-300 shadow-[0_0_35px_rgba(200,169,106,0.45)] cursor-pointer mb-3"
            >
              <Play className="w-6 h-6 fill-current" />
            </button>
            <span className="text-xs uppercase tracking-[0.16em] text-[#F5F2EB] font-semibold bg-[#0D0F0E]/80 px-3.5 py-1 border border-white/10">
              {isFa ? 'کلیک برای پخش ویدیوی معرفی شخصی' : 'Click to Load & Play Personal Video'}
            </span>
          </div>

          {/* Bottom Quote Preview on Poster */}
          <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between text-[11px] text-[#9E988E]">
            <span className="truncate text-[#C8A96A]">
              {isFa ? member.divisionFa : member.division}
            </span>
            <span className="font-mono text-[#F5F2EB]/80 shrink-0 ms-2">
              {isFa ? 'کیفیت استودیویی HD' : 'HD Studio Stream'}
            </span>
          </div>
        </div>
      ) : (
        /* Active In-Card Video Player with Synchronized Subtitles & Audio Waveform */
        <div className="relative w-full h-full flex flex-col justify-between">
          <motion.img
            initial={{ scale: 1.02, filter: 'blur(6px)' }}
            animate={{
              scale: isPlaying ? [1.02, 1.08, 1.03] : 1.02,
              filter: 'blur(0px)',
            }}
            transition={{
              filter: { duration: 0.45 },
              scale: { duration: 15, repeat: Infinity, ease: 'linear' },
            }}
            src={member.portrait}
            alt={isFa ? member.nameFa : member.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F0E] via-[#0D0F0E]/45 to-black/40" />

          {/* Top Active Video Bar */}
          <div className="relative z-10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-[#0D0F0E]/85 backdrop-blur-md border border-[#C8A96A]/40 px-3 py-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlaying ? 'bg-[#3E7B5E] animate-ping' : 'bg-[#C8A96A]'
                }`}
              />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#F5F2EB] font-medium">
                {isFa ? 'در حال پخش معرفی' : 'Playing Steward Intro'}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#0D0F0E]/85 backdrop-blur-md border border-white/15 px-2.5 py-1">
              {/* Animated Audio Bars */}
              <div className="flex items-end gap-0.5 h-3">
                {[0, 1, 2, 3].map((bar) => (
                  <motion.span
                    key={bar}
                    animate={{
                      height:
                        isPlaying && !isMuted
                          ? ['25%', '100%', '40%', '90%']
                          : '25%',
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: bar * 0.12,
                    }}
                    className="w-0.5 bg-[#C8A96A] block"
                  />
                ))}
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label="Toggle mute"
                className="text-[#C8A96A] hover:text-[#F5F2EB] cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-[#9E988E]" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Live Spoken Monologue Subtitle Overlay */}
          <div className="relative z-10 px-4 pb-3 pt-2 bg-gradient-to-t from-[#0D0F0E] via-[#0D0F0E]/90 to-transparent">
            <AnimatePresence mode="wait">
              <motion.div
                key={subtitleIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="bg-[#151816]/95 border-s-2 border-[#C8A96A] p-2.5 mb-2.5"
              >
                <p className="text-xs text-[#F5F2EB] font-serif leading-relaxed">
                  «{monologues[subtitleIndex]}»
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/15 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-[#C8A96A] to-[#F3E3B8] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between text-[11px] text-[#9E988E]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-[#F5F2EB] hover:text-[#C8A96A] flex items-center gap-1 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-[#C8A96A]" />
                      <span>{isFa ? 'توقف' : 'Pause'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-[#C8A96A]" />
                      <span>{isFa ? 'ادامه' : 'Resume'}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setProgress(0);
                    setSubtitleIndex(0);
                    setIsPlaying(true);
                  }}
                  className="hover:text-[#F5F2EB] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isFa ? 'از ابتدا' : 'Replay'}</span>
                </button>
              </div>

              <button
                onClick={onDeactivateVideo}
                className="text-[#C8A96A] hover:underline cursor-pointer"
              >
                {isFa ? 'بازگشت به پوستر' : 'Close Video'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TeamSectionProps {
  lang: Language;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  // Track which Steward Card currently has its embedded video player active
  const [activeVideoCardId, setActiveVideoCardId] = useState<string | null>(null);

  return (
    <section
      id="team"
      className="relative py-28 px-4 sm:px-8 lg:px-14 max-w-[1440px] mx-auto border-t border-white/10"
    >
      {/* Section Header — "Meet Our Stewards" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 border-b border-white/10 pb-10">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.22em] text-[#C8A96A] mb-3 font-medium flex items-center gap-2">
            <Film className="w-3.5 h-3.5" />
            <span>
              {isFa
                ? 'آشنایی با مدیران و همراهان ما (Meet Our Stewards) · ویدیوی معرفی اختصاصی'
                : 'Meet Our Stewards · Tehran Leadership & Personal Video Introductions'}
            </span>
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F2EB] leading-[1.08] tracking-tight">
            {isFa ? (
              <>
                آشنایی با <span className="italic font-normal text-[#C8A96A]">همراهان و مدیران</span> آسا
              </>
            ) : (
              <>
                Meet Our <span className="italic font-normal text-[#C8A96A]">Stewards</span>
              </>
            )}
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-[#9E988E] text-sm sm:text-base leading-relaxed">
            {isFa
              ? 'هر یک از مدیران و سرپرستان بخش‌های «آسا همراه»، «آسا پزشک» و «آسا خوراک» در کارت اختصاصی زیر دارای بیوگرافی، سوابق اجرایی و پلیر ویدیویی معرفی شخصی (با پوستر استایلایزشده پیش‌فرض) هستند.'
              : 'Explore our structured grid of Asa Tehran Stewards below. Each profile card features their name, role, brief biography, safeguarding credentials, and an embedded video player with a stylized poster placeholder.'}
          </p>
        </div>
      </div>

      {/* "Meet Our Stewards" 2x2 Luxury Editorial Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {TEAM_MEMBERS.map((member, index) => {
          const isVideoActive = activeVideoCardId === member.id;

          return (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{
                y: -8,
                scale: 1.008,
                transition: { type: 'spring', stiffness: 320, damping: 22, mass: 0.7 },
              }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`bg-[#151816] border transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-[0_16px_40px_-12px_rgba(0,0,0,0.75)] hover:shadow-[0_28px_60px_-12px_rgba(0,0,0,0.95),0_0_32px_rgba(200,169,106,0.16)] ${
                isVideoActive
                  ? 'border-[#C8A96A] shadow-[0_0_38px_rgba(200,169,106,0.22)]'
                  : 'border-white/10 hover:border-[#C8A96A]/55'
              }`}
            >
              <div>
                {/* Embedded Video Player Component with Blurred/Stylized Poster Placeholder */}
                <StewardCardVideoPlayer
                  member={member}
                  isFa={isFa}
                  isActiveVideo={isVideoActive}
                  onActivateVideo={() => setActiveVideoCardId(member.id)}
                  onDeactivateVideo={() => setActiveVideoCardId(null)}
                />

                {/* Steward Profile Card Content (Name, Role, Bio, Quote & Specialties) */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#C8A96A] mb-2">
                    <span className="uppercase tracking-[0.15em] font-semibold">
                      {isFa ? member.divisionFa : member.division}
                    </span>
                    <span className="font-mono flex items-center gap-1.5 text-[#9E988E]">
                      <Clock className="w-3.5 h-3.5 text-[#C8A96A]" />
                      {isFa ? member.experienceYearsFa : member.experienceYears}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] mb-1">
                    {isFa ? member.nameFa : member.name}
                  </h3>
                  <p className="text-sm text-[#C8A96A] font-medium mb-4">
                    {isFa ? member.roleFa : member.role}
                  </p>

                  {/* Brief Bio */}
                  <p className="text-xs sm:text-sm text-[#9E988E] leading-relaxed mb-5">
                    {isFa ? member.bioFa : member.bio}
                  </p>

                  {/* Personal Quote */}
                  <blockquote className="font-serif text-sm text-[#F5F2EB]/90 italic border-s-2 border-[#C8A96A] ps-3.5 mb-5 leading-relaxed">
                    {isFa ? member.quoteFa : member.quote}
                  </blockquote>

                  {/* Credentials Strip */}
                  <div className="bg-[#0D0F0E] border border-white/10 p-3 mb-5 flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#C8A96A] shrink-0" />
                    <span className="text-xs text-[#F5F2EB]/85">
                      {isFa ? member.credentialsFa : member.credentials}
                    </span>
                  </div>

                  {/* Key Specialties */}
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8A96A] mb-2.5 flex items-center gap-1.5 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {isFa
                          ? 'مسئولیت‌های کلیدی در آسا تهران:'
                          : 'Key Steward Responsibilities:'}
                      </span>
                    </p>
                    <ul className="space-y-1.5">
                      {(isFa ? member.specialtiesFa : member.specialties).map((spec, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-[#F5F2EB]/85 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7B5E] shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer with Action to Toggle Video */}
              <div className="px-6 sm:px-8 py-4 bg-[#0D0F0E]/80 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#9E988E] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3E7B5E]" />
                  <span>
                    {isFa ? 'احراز هویت و عدم سوءپیشینه تاییدشده' : 'Vetted & Safeguarding Certified'}
                  </span>
                </span>

                <button
                  onClick={() =>
                    setActiveVideoCardId(isVideoActive ? null : member.id)
                  }
                  className="text-[#C8A96A] hover:text-[#F5F2EB] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {isVideoActive
                      ? isFa
                        ? 'بستن ویدیوی معرفی'
                        : 'Close Intro Video'
                      : isFa
                      ? 'پخش ویدیوی معرفی در کارت'
                      : 'Watch Steward Video'}
                  </span>
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
