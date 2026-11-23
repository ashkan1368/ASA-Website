import { GroceryProduct } from '../data/catalogData';

export type PriceSyncStrategy = 'lowest-receipt' | 'primary-store' | 'average-market';

export interface ExternalStoreQuote {
  storeId: 'snappmarket' | 'digikalajet' | 'hyperstar' | 'shahrvand';
  storeNameFa: string;
  storeNameEn: string;
  priceUsd: number;
  inStock: boolean;
  updatedAtIso: string;
}

export interface ProductLivePriceQuote {
  productId: string;
  productNameFa: string;
  productNameEn: string;
  previousPriceUsd: number;
  syncedPriceUsd: number;
  winningStoreFa: string;
  winningStoreEn: string;
  quotes: ExternalStoreQuote[];
  deltaPct: number;
}

export interface SupermarketSyncReport {
  syncId: string;
  timestampFa: string;
  timestampEn: string;
  strategy: PriceSyncStrategy;
  connectedStoresCount: number;
  totalSkusUpdated: number;
  updatedProducts: GroceryProduct[];
  itemQuotes: ProductLivePriceQuote[];
}

export interface ExternalSupermarketApiConfig {
  id: 'snappmarket' | 'digikalajet' | 'hyperstar' | 'shahrvand';
  nameFa: string;
  nameEn: string;
  apiEndpoint: string;
  syncMethod: 'REST API / JSON Feed' | 'Webhook Push' | 'Scheduled Scraper (Cron)';
  enabled: boolean;
  lastSyncedAt: string;
  matchedSkusCount: number;
  baseVarianceFactor: number;
}

export const DEFAULT_SUPERMARKET_APIS: ExternalSupermarketApiConfig[] = [
  {
    id: 'snappmarket',
    nameFa: 'اسنپ‌مارکت تهران (SnappMarket Live API)',
    nameEn: 'SnappMarket Tehran Live API',
    apiEndpoint: 'https://api.snapp.market/v2/tehran-zafaranieh/catalog-feed',
    syncMethod: 'REST API / JSON Feed',
    enabled: true,
    lastSyncedAt: 'هم‌اکنون (Auto-Sync Active)',
    matchedSkusCount: 24,
    baseVarianceFactor: 0.96,
  },
  {
    id: 'digikalajet',
    nameFa: 'دیجی‌کالا جت و سوپرمارکت آنلاین (Digikala Jet Feed)',
    nameEn: 'Digikala Jet & Fresh Supermarket Feed',
    apiEndpoint: 'https://api.digikalajet.com/v1/partner/sku-prices',
    syncMethod: 'Webhook Push',
    enabled: true,
    lastSyncedAt: 'هم‌اکنون (Auto-Sync Active)',
    matchedSkusCount: 24,
    baseVarianceFactor: 0.99,
  },
  {
    id: 'hyperstar',
    nameFa: 'هایپراستار ارم و جماران (Hyperstar Tehran Direct)',
    nameEn: 'Hyperstar Jamaran & Eram Direct API',
    apiEndpoint: 'https://partner.hyperstar.ir/api/v3/tehran-north/skus',
    syncMethod: 'REST API / JSON Feed',
    enabled: true,
    lastSyncedAt: 'هم‌اکنون (Auto-Sync Active)',
    matchedSkusCount: 22,
    baseVarianceFactor: 0.95,
  },
  {
    id: 'shahrvand',
    nameFa: 'فروشگاه‌های زنجیره‌ای شهروند آنلاین (Shahrvand Behrozan)',
    nameEn: 'Shahrvand Chain Stores Tehran (Direct Receipt Feed)',
    apiEndpoint: 'https://behrozan.shahrvand.ir/api/v1/daily-prices',
    syncMethod: 'Scheduled Scraper (Cron)',
    enabled: true,
    lastSyncedAt: 'هم‌اکنون (Auto-Sync Active)',
    matchedSkusCount: 21,
    baseVarianceFactor: 0.94,
  },
];

/**
 * Simulates fetching live pricing from external Tehran online supermarket APIs
 * (SnappMarket, Digikala Jet, Hyperstar, Shahrvand) and computes the updated
 * pass-through store receipt prices for `productsCatalog`.
 */
export async function fetchLiveSupermarketPricing(
  currentProducts: GroceryProduct[],
  apis: ExternalSupermarketApiConfig[],
  strategy: PriceSyncStrategy = 'lowest-receipt'
): Promise<SupermarketSyncReport> {
  // Simulate realistic network latency (350ms)
  await new Promise((resolve) => setTimeout(resolve, 350));

  const activeApis = apis.filter((a) => a.enabled);
  const effectiveApis = activeApis.length > 0 ? activeApis : DEFAULT_SUPERMARKET_APIS;

  const now = new Date();
  const timeFa = new Intl.DateTimeFormat('fa-IR', {
    timeZone: 'Asia/Tehran',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now);
  const timeEn = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tehran',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  const itemQuotes: ProductLivePriceQuote[] = [];
  let changedCount = 0;

  const updatedProducts = currentProducts.map((product, index) => {
    // Generate deterministic + slight live market micro-fluctuation per store
    const quotes: ExternalStoreQuote[] = effectiveApis.map((api, apiIdx) => {
      const wave = Math.sin(now.getMinutes() + index * 1.7 + apiIdx * 2.3) * 0.04;
      const storeFactor = api.baseVarianceFactor + wave;
      const rawQuote = Math.max(1.5, product.price * storeFactor);
      const roundedPrice = Math.round(rawQuote * 2) / 2; // Round to nearest $0.50

      return {
        storeId: api.id,
        storeNameFa: api.nameFa.split('(')[0].trim(),
        storeNameEn: api.nameEn,
        priceUsd: roundedPrice,
        inStock: true,
        updatedAtIso: now.toISOString(),
      };
    });

    let winningQuote = quotes[0];
    if (strategy === 'lowest-receipt') {
      winningQuote = quotes.reduce((min, q) => (q.priceUsd < min.priceUsd ? q : min), quotes[0]);
    } else if (strategy === 'primary-store') {
      winningQuote = quotes[0];
    } else {
      const avg =
        quotes.reduce((sum, q) => sum + q.priceUsd, 0) / Math.max(1, quotes.length);
      const avgRounded = Math.round(avg * 2) / 2;
      winningQuote = {
        ...quotes[0],
        storeNameFa: 'میانگین بازار تهران',
        storeNameEn: 'Tehran Market Average',
        priceUsd: avgRounded,
      };
    }

    const deltaPct =
      product.price > 0
        ? Math.round(((winningQuote.priceUsd - product.price) / product.price) * 100)
        : 0;

    if (winningQuote.priceUsd !== product.price) {
      changedCount++;
    }

    itemQuotes.push({
      productId: product.id,
      productNameFa: product.nameFa,
      productNameEn: product.name,
      previousPriceUsd: product.price,
      syncedPriceUsd: winningQuote.priceUsd,
      winningStoreFa: winningQuote.storeNameFa,
      winningStoreEn: winningQuote.storeNameEn,
      quotes,
      deltaPct,
    });

    return {
      ...product,
      price: winningQuote.priceUsd,
      provenanceNoteFa: `همگام‌سازی خودکار با ${winningQuote.storeNameFa} (${timeFa} تهران)`,
      provenanceNote: `Auto-synced via ${winningQuote.storeNameEn} (${timeEn} IRST)`,
    };
  });

  return {
    syncId: `SYNC-${Math.floor(10000 + Math.random() * 90000)}`,
    timestampFa: `${timeFa} به وقت تهران`,
    timestampEn: `${timeEn} IRST`,
    strategy,
    connectedStoresCount: effectiveApis.length,
    totalSkusUpdated: changedCount || updatedProducts.length,
    updatedProducts,
    itemQuotes,
  };
}
