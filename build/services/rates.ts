const FALLBACK_BASE_RATE = 16500;
const CONVERT_ADJUSTMENT = 550;
const TOPUP_PROMO_DELTA = -100;
const TOPUP_NORMAL_DELTA = 2000;

interface ExchangeRateResponse {
  conversion_rates?: {
    IDR?: number;
  };
}

export interface RateResult {
  baseRate: number;
  source: 'api' | 'fallback';
}

/**
 * Fetch USD->IDR market rate from ExchangeRate API.
 * Falls back to a default base rate when the API key is missing or the request fails.
 */
export const fetchUsdIdrRate = async (): Promise<RateResult> => {
  const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
  if (!apiKey) {
    return { baseRate: FALLBACK_BASE_RATE, source: 'fallback' };
  }

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    if (!res.ok) {
      throw new Error(`ExchangeRate API error ${res.status}`);
    }

    const data: ExchangeRateResponse = await res.json();
    const idrRate = data?.conversion_rates?.IDR;

    if (typeof idrRate === 'number' && idrRate > 0) {
      return { baseRate: idrRate, source: 'api' };
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
