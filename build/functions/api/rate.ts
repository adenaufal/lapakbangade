
/// <reference types="@cloudflare/workers-types" />

interface Env {
    EXCHANGE_RATE_API_KEY: string;
}

const FALLBACK_BASE_RATE = 16500;

export const onRequest: PagesFunction<Env> = async (context) => {
    const apiKey = context.env.EXCHANGE_RATE_API_KEY;

    // Helper for JSON response
    const jsonResponse = (data: any, status = 200) => {
        return new Response(JSON.stringify(data), {
            status,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
                'Access-Control-Allow-Origin': '*', // CORS support
            },
        });
    };

    if (!apiKey || apiKey === 'YOUR_EXCHANGERATE_API_KEY') {
        return jsonResponse({
            baseRate: FALLBACK_BASE_RATE,
            source: 'fallback_no_key'
        });
    }

    try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);

        if (!res.ok) {
            throw new Error(`ExchangeRate API error ${res.status}`);
        }

        const data: any = await res.json();
        const idrRate = data?.conversion_rates?.IDR;

        if (typeof idrRate === 'number' && idrRate > 0) {
            return jsonResponse({ baseRate: idrRate, source: 'api' });
        }

        throw new Error('IDR rate missing in response');
    } catch (error) {
        console.error('Rate function error:', error);
        return jsonResponse({
            baseRate: FALLBACK_BASE_RATE,
            source: 'fallback_error',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
