/// <reference types="@cloudflare/workers-types" />

interface Env {
  EXCHANGE_RATE_API_KEY?: string;
}

interface ExchangeRateResponse {
  conversion_rates?: {
    IDR?: number;
  };
}

const FALLBACK_BASE_RATE = 16500;

const jsonResponse = (body: Record<string, unknown>, status = 200): Response => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
  });
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const apiKey = context.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    return jsonResponse({ baseRate: FALLBACK_BASE_RATE, source: 'fallback_no_key' });
  }

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    if (!res.ok) {
      throw new Error(`ExchangeRate API error ${res.status}`);
    }
    
    const data: ExchangeRateResponse = await res.json();
    const idrRate = data?.conversion_rates?.IDR;

    if (typeof idrRate === 'number' && idrRate > 0) {
      return jsonResponse({ baseRate: idrRate, source: 'api' });
    }
    throw new Error('IDR rate missing');
  } catch (error) {
    console.error('Rate function error, using fallback:', error);
    return jsonResponse({ baseRate: FALLBACK_BASE_RATE, source: 'fallback_error' });
  }
};
