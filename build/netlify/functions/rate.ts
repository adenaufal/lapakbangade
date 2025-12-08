import type { Handler } from '@netlify/functions';

const FALLBACK_BASE_RATE = 16500;

const jsonResponse = (statusCode: number, body: Record<string, unknown>) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300',
  },
  body: JSON.stringify(body),
});

export const handler: Handler = async () => {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    return jsonResponse(200, { baseRate: FALLBACK_BASE_RATE, source: 'fallback_no_key' });
  }

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    if (!res.ok) {
      throw new Error(`ExchangeRate API error ${res.status}`);
    }
    const data = await res.json();
    const idrRate = data?.conversion_rates?.IDR;

    if (typeof idrRate === 'number' && idrRate > 0) {
      return jsonResponse(200, { baseRate: idrRate, source: 'api' });
    }
    throw new Error('IDR rate missing');
  } catch (error) {
    console.error('Rate function error, using fallback:', error);
    return jsonResponse(200, { baseRate: FALLBACK_BASE_RATE, source: 'fallback_error' });
  }
};
