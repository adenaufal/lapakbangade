const FALLBACK_BASE_RATE = 16500;
const CONVERT_ADJUSTMENT = 550;
const TOPUP_PROMO_DELTA = -100;
const TOPUP_NORMAL_DELTA = 2000;

export interface RateResult {
  baseRate: number;
  source: 'api' | 'fallback';
}

const isRateResponse = (data: unknown): data is { baseRate: number; source?: string } => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'baseRate' in data &&
    typeof data.baseRate === 'number' &&
    data.baseRate > 0
  );
};

/**
 * Fetch USD->IDR market rate from API endpoint.
 * Falls back to a default base rate when the request fails.
 */
export const fetchUsdIdrRate = async (): Promise<RateResult> => {
  try {
    const res = await fetch('/api/rate');
    if (!res.ok) {
      throw new Error(`Rate function error ${res.status}`);
    }
    const data: unknown = await res.json();
    if (isRateResponse(data)) {
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
