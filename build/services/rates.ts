const FALLBACK_BASE_RATE = 16500;
const CONVERT_ADJUSTMENT = 550;
const TOPUP_PROMO_DELTA = -100;
const TOPUP_NORMAL_DELTA = 2000;

export interface RateResult {
  baseRate: number;
  source: 'api' | 'fallback';
}

/**
 * Fetch USD->IDR market rate from Netlify Function proxy.
 * Falls back to a default base rate when the request fails.
 */
export const fetchUsdIdrRate = async (): Promise<RateResult> => {
  try {
    const res = await fetch('/.netlify/functions/rate');
    if (!res.ok) {
      throw new Error(`Rate function error ${res.status}`);
    }
    const data = await res.json();
    if (typeof data?.baseRate === 'number' && data.baseRate > 0) {
      return { baseRate: data.baseRate, source: data.source === 'api' ? 'api' : 'fallback' };
    }
  } catch (error) {
    console.error('Failed to fetch exchange rate, using fallback.', error);
  }

  return { baseRate: FALLBACK_BASE_RATE, source: 'fallback' };
};

export const rateConfig = {
  fallbackBase: FALLBACK_BASE_RATE,
  convertAdjustment: CONVERT_ADJUSTMENT,
  topupPromoDelta: TOPUP_PROMO_DELTA,
  topupNormalDelta: TOPUP_NORMAL_DELTA,
};
