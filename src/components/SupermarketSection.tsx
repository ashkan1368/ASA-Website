import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Check,
  X,
  PackageCheck,
  Receipt,
  HeartHandshake,
} from 'lucide-react';
import {
  GROCERY_PRODUCTS,
  GROCERY_CATEGORIES,
  GROCERY_CAT_FA,
  CURATED_BUNDLES,
  GroceryProduct,
  GroceryCategory,
  CuratedFamilyBundle,
  Language,
  CurrencyCode,
  formatPrice,
} from '../data/catalogData';

interface SupermarketSectionProps {
  lang: Language;
  currency: CurrencyCode;
  products?: GroceryProduct[];
  cartQuantities: Record<string, number>;
  onUpdateQuantity: (product: GroceryProduct, delta: number) => void;
  onAddBundle: (bundle: CuratedFamilyBundle) => void;
  selectedCategory: GroceryCategory;
  onSelectCategory: (cat: GroceryCategory) => void;
}

const SPRING_LIFT_TRANSITION = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 22,
  mass: 0.7,
};

// Complementary pairing map keyed by product ID -> best companion product IDs
const COMPLEMENTARY_PAIRING_MAP: Record<string, string[]> = {
  'prd-01': ['prd-06', 'prd-11', 'prd-09', 'prd-05'], // Ghormeh Sabzi -> Sabzi Khordan, Probiotic Yogurt, Sangak, Damavand Apples
  'prd-02': ['prd-07', 'prd-11', 'prd-06', 'prd-16'], // Joojeh Kabab -> Tomatoes/Lemons, Yogurt, Sabzi, Herbal Distillates
  'prd-03': ['prd-09', 'prd-05', 'prd-15', 'prd-07'], // Barley Soup -> Sangak, Citrus/Apples, Honey/Saffron, Lemons
  'prd-04': ['prd-14', 'prd-07', 'prd-06', 'prd-16'], // Baked Salmon -> Olive Oil, Lemons/Tomatoes, Fresh Herbs
  'prd-05': ['prd-15', 'prd-10', 'prd-11', 'prd-06'], // Fruit Crate -> Honey/Saffron, Lighvan/Walnuts, Yogurt
  'prd-09': ['prd-10', 'prd-12', 'prd-06', 'prd-15'], // Sangak Bread -> Lighvan Cheese & Walnuts, Eggs & Butter, Sabzi Khordan, Honey
  'prd-10': ['prd-09', 'prd-07', 'prd-06', 'prd-12'], // Lighvan Cheese -> Sangak, Tomatoes/Cucumbers, Sabzi, Eggs
  'prd-13': ['prd-15', 'prd-14', 'prd-08', 'prd-17'], // Hashemi Rice -> Saffron, Olive Oil, Khoresht Herbs, Fresh Lamb
};

const DEFAULT_FAMILY_FAVORITE_IDS = ['prd-06', 'prd-10', 'prd-11', 'prd-05', 'prd-03', 'prd-15'];

export const SupermarketSection: React.FC<SupermarketSectionProps> = ({
  lang,
  currency,
  products = GROCERY_PRODUCTS,
  cartQuantities,
  onUpdateQuantity,
  onAddBundle,
  selectedCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietaryFilter, setSelectedDietaryFilter] = useState<string>('all');
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);
  const [addedAllComplements, setAddedAllComplements] = useState(false);

  const DIETARY_FILTERS = [
    {
      id: 'all',
      labelFa: 'همه رژیم‌ها (All)',
      labelEn: 'All Nutritional Profiles',
      keywords: [] as string[],
    },
    {
      id: 'low-sodium',
      labelFa: 'کم‌نمک / مناسب فشار خون',
      labelEn: 'Low-Sodium / Blood Pressure Friendly',
      keywords: ['low-sodium', 'کم‌نمک', 'سبزی', 'سیب', 'سالمون', 'قزل', 'عسل', 'روغن', 'سنگک', 'پروبیوتیک'],
    },
    {
      id: 'diabetic',
      labelFa: 'مناسب قند خون / کم‌گلیسمی',
      labelEn: 'Low-Glycemic / Diabetic Friendly',
      keywords: ['سالمون', 'قزل', 'سبزی', 'گوشت', 'مرغ', 'تخم', 'پنیر', 'زیتون', 'ماست', 'جو'],
    },
    {
      id: 'soft-texture',
      labelFa: 'بافت نرم و زودهضم',
      labelEn: 'Soft-Texture / Easy Digestion',
      keywords: ['سوپ', 'خورشت', 'جوجه', 'سالمون', 'ماست', 'پنیر', 'تخم', 'سیب', 'عسل'],
    },
    {
      id: 'heart-omega',
      labelFa: 'دوستدار قلب و امگا-۳',
      labelEn: 'Heart-Healthy Omega-3',
      keywords: ['سالمون', 'قزل', 'زیتون', 'گردو', 'سبزی', 'میوه', 'جو', 'زعفران'],
    },
  ];

  // Remember previous + current basket items so recommendations stay personalized
  const [basketHistoryIds, setBasketHistoryIds] = useState<string[]>(() =>
    Object.keys(cartQuantities)
  );

  useEffect(() => {
    const currentIds = Object.keys(cartQuantities).filter((id) => cartQuantities[id] > 0);
    if (currentIds.length > 0) {
      setBasketHistoryIds((prev) => Array.from(new Set([...currentIds, ...prev])));
    }
  }, [cartQuantities]);

  const isFa = lang === 'fa';

  // Compute dynamic Complementary / Family Favorites recommendations
  const complementaryRecommendation = useMemo(() => {
    const activeCartIds = Object.keys(cartQuantities).filter((id) => cartQuantities[id] > 0);
    const seedIds = activeCartIds.length > 0 ? activeCartIds : basketHistoryIds;

    const candidateIds: string[] = [];
    seedIds.forEach((seedId) => {
      const mapped = COMPLEMENTARY_PAIRING_MAP[seedId] || [];
      mapped.forEach((cid) => {
        if (!candidateIds.includes(cid)) {
          candidateIds.push(cid);
        }
      });
    });

    DEFAULT_FAMILY_FAVORITE_IDS.forEach((fid) => {
      if (!candidateIds.includes(fid)) {
        candidateIds.push(fid);
      }
    });

    // Prioritize items not currently in cart, or top favorites if many items are already added
    const unaddedProducts = candidateIds
      .filter((id) => !activeCartIds.includes(id))
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is GroceryProduct => Boolean(p));

    const finalProducts =
      unaddedProducts.length >= 4
        ? unaddedProducts.slice(0, 4)
        : [
            ...unaddedProducts,
            ...products.filter(
              (p) => !unaddedProducts.some((u) => u.id === p.id)
            ),
          ].slice(0, 4);

    // Determine personalized context reason based on basket contents
    const primarySeedProduct =
      products.find((p) => p.id === seedIds[0]) || null;

    let reasonFa = 'محبوب‌ترین اقلام مکمل که خانواده‌ها همراه خرید هفتگی والدین سفارش می‌دهند';
    let reasonEn = 'Most loved staples frequently ordered together for parents in Tehran';

    if (primarySeedProduct) {
      const cleanSeedFa = primarySeedProduct.nameFa.includes('—')
        ? primarySeedProduct.nameFa.split('—')[1].trim()
        : primarySeedProduct.nameFa;
      const cleanSeedEn = primarySeedProduct.name.includes('—')
        ? primarySeedProduct.name.split('—')[1].trim()
        : primarySeedProduct.name;

      reasonFa = `پیشنهاد مکمل هوشمند بر اساس «${cleanSeedFa}» در سبد شما`;
      reasonEn = `Complementary pairings based on "${cleanSeedEn}" in your basket`;
    }

    return {
      items: finalProducts,
      reasonFa,
      reasonEn,
      hasSeed: seedIds.length > 0,
    };
  }, [cartQuantities, basketHistoryIds, products]);

  const handleAddAllComplements = () => {
    complementaryRecommendation.items.forEach((product) => {
      if (!cartQuantities[product.id]) {
        onUpdateQuantity(product, 1);
      }
    });
    setAddedAllComplements(true);
    setTimeout(() => setAddedAllComplements(false), 2000);
  };

  const filteredProducts = useMemo(() => {
    const activeDietObj = DIETARY_FILTERS.find((d) => d.id === selectedDietaryFilter);
    return products.filter((item) => {
      const matchesCat =
        selectedCategory === 'All Provisions' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.nameFa.includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        item.shortDescriptionFa.includes(q);

      const combinedText = `${item.name} ${item.nameFa} ${item.shortDescription} ${item.shortDescriptionFa} ${item.dietaryMeta} ${item.dietaryMetaFa}`.toLowerCase();
      const matchesDiet =
        !activeDietObj ||
        activeDietObj.id === 'all' ||
        activeDietObj.keywords.some((kw) => combinedText.includes(kw.toLowerCase()));

      return matchesCat && matchesSearch && matchesDiet;
    });
  }, [selectedCategory, searchQuery, selectedDietaryFilter, products]);

  const handleTriggerBundle = (bundle: CuratedFamilyBundle) => {
    onAddBundle(bundle);
    setAddedBundleId(bundle.id);
    setTimeout(() => {
      setAddedBundleId((prev) => (prev === bundle.id ? null : prev));
    }, 2200);
  };

  return (
    <section
      id="supermarket"
      className="relative py-20 px-4 sm:px-8 lg:px-14 max-w-[1440px] mx-auto border-t border-white/10"
    >
      {/* Clean, Scannable Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A96A] mb-2 font-semibold">
            {isFa
              ? 'آسا خوراک و سوپرمارکت خانواده · قیمت خالص فاکتور فروشگاه'
              : 'Asa Khoraak & Family Supermarket · Exact Store Receipt Pricing'}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F2EB] leading-tight">
            {isFa ? (
              <>
                سوپرمارکت خانواده و <span className="italic font-normal text-[#C8A96A]">آسا خوراک</span>
              </>
            ) : (
              <>
                Asa Khoraak & <span className="italic font-normal text-[#C8A96A]">Family Market</span>
              </>
            )}
          </h2>
        </div>

        {/* Search Input */}
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
              isFa
                ? 'جستجوی قورمه‌سبزی، سنگک، میوه، پنیر...'
                : 'Search meals, Sangak bread, fruit, saffron...'
            }
            className={`w-full bg-[#151816] border border-white/15 focus:border-[#C8A96A] text-xs sm:text-sm text-[#F5F2EB] placeholder-[#9E988E]/60 ${
              isFa ? 'pr-10 pl-9' : 'pl-10 pr-9'
            } py-3 outline-none`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute ${
                isFa ? 'left-3' : 'right-3'
              } top-1/2 -translate-y-1/2 text-[#9E988E] hover:text-[#F5F2EB] cursor-pointer`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 1-Click Curated Family Bundles (Fastest Way to Stock Parents' Fridge) */}
      <div className="mb-12">
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C8A96A]" />
            <h3 className="text-xs uppercase tracking-[0.16em] text-[#F5F2EB] font-semibold">
              {isFa
                ? 'پکیج‌های آماده ۱-کلیکی (تکمیل کل یخچال و غذای هفته در یک انتخاب)'
                : '1-Click Ready Family Bundles (Stock Their Fridge in Seconds)'}
            </h3>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#9E988E]">
            <Receipt className="w-3.5 h-3.5 text-[#C8A96A]" />
            {isFa ? 'بدون حاشیه سود پنهان روی کالاها' : '0% Hidden Markup on Groceries'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {CURATED_BUNDLES.map((bundle) => {
            const isAdded = addedBundleId === bundle.id;
            const totalCombined = bundle.passThroughProductTotal + bundle.asaServiceFee;
            const totalFmt = formatPrice(totalCombined, lang, '', '', currency);
            const passFmt = formatPrice(bundle.passThroughProductTotal, lang, '', '', currency);
            const feeFmt = formatPrice(bundle.asaServiceFee, lang, '', '', currency);
            const itemsList = isFa ? bundle.includedSummaryFa : bundle.includedSummary;

            return (
              <motion.div
                key={bundle.id}
                whileHover={{
                  y: -7,
                  scale: 1.01,
                  transition: SPRING_LIFT_TRANSITION,
                }}
                whileTap={{
                  scale: 0.994,
                  transition: SPRING_LIFT_TRANSITION,
                }}
                className="bg-gradient-to-b from-[#1A1E1B] to-[#131614] border border-[#C8A96A]/35 p-5 flex flex-col justify-between relative overflow-hidden group shadow-lg"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#C8A96A] font-semibold block mb-1.5">
                    {isFa ? bundle.pillarBadgeFa : bundle.pillarBadge}
                  </span>
                  <h4 className="font-serif text-xl text-[#F5F2EB] mb-2 group-hover:text-[#C8A96A] transition-colors">
                    {isFa ? bundle.titleFa : bundle.title}
                  </h4>
                  <ul className="space-y-1 mb-4 border-t border-white/10 pt-3">
                    {itemsList.slice(0, 3).map((line, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-[#F5F2EB]/85 flex items-center gap-1.5 truncate"
                      >
                        <span className="text-[#C8A96A]">·</span>
                        <span className="truncate">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="bg-[#0D0F0E]/80 border border-white/10 px-3 py-2 mb-3 text-[11px] flex items-center justify-between text-[#9E988E]">
                    <span>
                      {isFa ? 'کالا:' : 'Goods:'}{' '}
                      <strong className="font-mono text-[#F5F2EB]">{passFmt.amount}</strong>
                    </span>
                    <span>+</span>
                    <span>
                      {isFa ? 'کارمزد آسا:' : 'Asa Fee:'}{' '}
                      <strong className="font-mono text-[#C8A96A]">{feeFmt.amount}</strong>
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#9E988E] block">
                        {isFa ? 'مجموع کل' : 'Total Bundle'}
                      </span>
                      <span className="font-mono text-lg text-[#C8A96A] font-semibold">
                        {totalFmt.amount}
                      </span>
                    </div>
                    <button
                      onClick={() => handleTriggerBundle(bundle)}
                      className={`px-4 py-2.5 text-xs uppercase tracking-[0.14em] font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#3E7B5E] text-[#F5F2EB]'
                          : 'bg-[#C8A96A] text-[#0D0F0E] hover:bg-[#DFC48D]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{isFa ? 'اضافه شد' : 'Added'}</span>
                        </>
                      ) : (
                        <>
                          <PackageCheck className="w-4 h-4" />
                          <span>{isFa ? 'افزودن پکیج' : 'Add Bundle'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* NEW: Dynamic 'Frequently Purchased Together / Family Favorites' Strip */}
      <div className="mb-12 bg-[#141816] border border-[#C8A96A]/40 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C8A96A] font-semibold mb-1">
              <HeartHandshake className="w-4 h-4" />
              <span>
                {complementaryRecommendation.hasSeed
                  ? isFa
                    ? 'پیشنهاد مکمل سبد خانواده (Frequently Purchased Together)'
                    : 'Frequently Purchased Together · Complementary Pairings'
                  : isFa
                  ? 'محبوب‌ترین‌های خانواده‌ها (Family Favorites)'
                  : 'Family Favorites · Top Tehran Staples'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9E988E]">
              {isFa
                ? complementaryRecommendation.reasonFa
                : complementaryRecommendation.reasonEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddAllComplements}
            className={`px-4 py-2.5 text-xs uppercase tracking-[0.13em] font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 self-start sm:self-center ${
              addedAllComplements
                ? 'bg-[#3E7B5E] text-[#F5F2EB]'
                : 'bg-[#C8A96A]/15 hover:bg-[#C8A96A] text-[#C8A96A] hover:text-[#0D0F0E] border border-[#C8A96A]/55'
            }`}
          >
            {addedAllComplements ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isFa ? 'مکمل‌ها به سبد اضافه شدند' : 'Complements Added'}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {isFa ? 'افزودن یکجای ۴ قلم مکمل' : 'Add All 4 Complements'}
                </span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {complementaryRecommendation.items.map((item) => {
            const qty = cartQuantities[item.id] || 0;
            const rawTitle = isFa ? item.nameFa : item.name;
            const shortTitle = rawTitle.includes('—')
              ? rawTitle.split('—')[1].trim()
              : rawTitle;
            const priceFmt = formatPrice(
              item.price,
              lang,
              item.unitSize,
              item.unitSizeFa,
              currency
            );

            return (
              <motion.div
                key={`comp-${item.id}`}
                whileHover={{ y: -4, transition: SPRING_LIFT_TRANSITION }}
                className="bg-[#0D0F0E] border border-white/10 hover:border-[#C8A96A]/55 p-3.5 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={shortTitle}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover border border-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#C8A96A] block truncate">
                      {isFa ? GROCERY_CAT_FA[item.category] : item.category}
                    </span>
                    <h4 className="font-serif text-sm text-[#F5F2EB] line-clamp-1">
                      {shortTitle}
                    </h4>
                    <span className="font-mono text-xs text-[#C8A96A] font-semibold">
                      {priceFmt.amount}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item, 1)}
                  className={`px-2.5 py-2 text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer ${
                    qty > 0
                      ? 'bg-[#3E7B5E] text-[#F5F2EB]'
                      : 'bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E]'
                  }`}
                >
                  {qty > 0 ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span className="font-mono">
                        {isFa ? qty.toLocaleString('fa-IR') : qty}
                      </span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isFa ? 'افزودن' : 'Add'}</span>
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Clean Aisle Filter Grid (Zero Horizontal Scrollbar!) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-5">
        {GROCERY_CATEGORIES.map((catObj) => {
          const category = catObj.name;
          const isActive = selectedCategory === category;
          const count =
            category === 'All Provisions'
              ? products.length
              : products.filter((p) => p.category === category).length;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`p-3 text-start border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-[#C8A96A] text-[#0D0F0E] border-[#C8A96A] font-semibold shadow-[0_6px_20px_rgba(200,169,106,0.25)]'
                  : 'bg-[#151816] text-[#9E988E] border-white/10 hover:border-[#C8A96A]/45 hover:text-[#F5F2EB]'
              }`}
            >
              <span
                className={`font-mono text-[10px] mb-1 ${
                  isActive ? 'text-[#0D0F0E]/80' : 'text-[#C8A96A]'
                }`}
              >
                {isFa ? `${count.toLocaleString('fa-IR')} قلم` : `${count} items`}
              </span>
              <span className="text-xs leading-snug line-clamp-2">
                {isFa ? GROCERY_CAT_FA[category] : category}
              </span>
            </button>
          );
        })}
      </div>

      {/* NEW: Interactive Senior Nutritional & Dietary Filter Toggles */}
      <div className="bg-[#131715] border border-white/10 p-3.5 mb-8 flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-xs text-[#C8A96A] font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isFa
              ? 'فیلتر تغذیه و سلامت والدین:'
              : 'Filter by Senior Nutritional Needs:'}
          </span>
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {DIETARY_FILTERS.map((df) => {
            const active = selectedDietaryFilter === df.id;
            return (
              <button
                key={df.id}
                type="button"
                onClick={() => setSelectedDietaryFilter(df.id)}
                className={`px-3 py-1.5 text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#2E5A44] text-[#F5F2EB] border-[#3E7B5E] font-semibold'
                    : 'bg-[#0D0F0E] text-[#9E988E] border-white/10 hover:border-[#C8A96A]/50 hover:text-[#F5F2EB]'
                }`}
              >
                {active && <Check className="w-3 h-3 text-[#C8A96A]" />}
                <span>{isFa ? df.labelFa : df.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean 4-Column Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#151816] border border-white/10 p-12 text-center">
          <p className="font-serif text-xl text-[#F5F2EB] mb-4">
            {isFa ? 'کالایی با این عنوان یافت نشد' : 'No matching items found'}
          </p>
          <button
            onClick={() => {
              onSelectCategory('All Provisions');
              setSelectedDietaryFilter('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-[#C8A96A] text-[#0D0F0E] text-xs uppercase tracking-[0.15em] font-semibold cursor-pointer"
          >
            {isFa ? 'نمایش همه اقلام' : 'Show All Items'}
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const qty = cartQuantities[product.id] || 0;
              const rawName = isFa ? product.nameFa : product.name;
              const cleanName = rawName.includes('—')
                ? rawName.split('—')[1].trim()
                : rawName;
              const unit = isFa ? product.unitSizeFa : product.unitSize;
              const priceObj = formatPrice(
                product.price,
                lang,
                product.unitSize,
                product.unitSizeFa,
                currency
              );

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{
                    y: -7,
                    scale: 1.012,
                    transition: SPRING_LIFT_TRANSITION,
                  }}
                  whileTap={{
                    scale: 0.992,
                    transition: SPRING_LIFT_TRANSITION,
                  }}
                  className={`group bg-[#151816] border transition-colors duration-300 flex flex-col justify-between shadow-md ${
                    qty > 0
                      ? 'border-[#C8A96A] ring-1 ring-[#C8A96A]/40'
                      : 'border-white/10 hover:border-[#C8A96A]/55'
                  }`}
                >
                  <div>
                    {/* Product Image */}
                    <div className="relative h-40 overflow-hidden bg-[#0D0F0E]">
                      <img
                        src={product.image}
                        alt={cleanName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151816] via-transparent to-black/25" />

                      <div
                        className={`absolute top-2.5 ${
                          isFa ? 'right-2.5' : 'left-2.5'
                        } bg-[#0D0F0E]/90 backdrop-blur-md border border-white/15 px-2 py-0.5 text-[10px] text-[#C8A96A]`}
                      >
                        {isFa ? GROCERY_CAT_FA[product.category] : product.category}
                      </div>
                    </div>

                    {/* Concise Product Info */}
                    <div className="p-4 pb-2">
                      <h4 className="font-serif text-lg text-[#F5F2EB] group-hover:text-[#C8A96A] transition-colors mb-1 line-clamp-2 leading-snug">
                        {cleanName}
                      </h4>
                      <p className="text-[11px] text-[#9E988E] truncate">{unit}</p>
                    </div>
                  </div>

                  {/* Price & Instant Add Stepper */}
                  <div className="p-4 pt-2">
                    <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
                      <span className="font-mono text-sm sm:text-base text-[#C8A96A] font-semibold">
                        {priceObj.amount}
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => onUpdateQuantity(product, 1)}
                          className="px-3.5 py-1.5 bg-[#C8A96A] hover:bg-[#DFC48D] text-[#0D0F0E] text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{isFa ? 'افزودن' : 'Add'}</span>
                        </button>
                      ) : (
                        <div className="flex items-center border border-[#C8A96A] bg-[#0D0F0E]">
                          <button
                            onClick={() => onUpdateQuantity(product, -1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#C8A96A] hover:bg-[#C8A96A]/15 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs text-[#F5F2EB] font-semibold">
                            {isFa ? qty.toLocaleString('fa-IR') : qty}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product, 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#C8A96A] hover:bg-[#C8A96A]/15 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};
