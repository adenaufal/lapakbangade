
/// <reference types="@cloudflare/workers-types" />

import { calculateRetryAfterSeconds, RateLimiter } from '../../utils/rateLimiter';
import { normalizeClientKey } from '../../utils/validation';

interface Env {
    EXCHANGE_RATE_API_KEY?: string;
    RATE_LIMIT_PER_MINUTE?: string;
    RATE_LIMIT_WINDOW_SECONDS?: string;
    FALLBACK_BASE_RATE?: string;
}

const DEFAULT_FALLBACK_BASE_RATE = 16500;
const DEFAULT_RATE_LIMIT_PER_MINUTE = 60;
const DEFAULT_RATE_LIMIT_WINDOW_SECONDS = 60;
const limiterCache = new Map<string, RateLimiter>();

const parsePositiveInt = (rawValue: string | undefined, fallback: number): number => {
    if (!rawValue) {
        return fallback;
    }

    const parsed = Number.parseInt(rawValue, 10);
    if (!Number.isFinite(parsed) || parsed < 0) {
        return fallback;
    }

    return parsed;
};

const resolveFallbackRate = (rawValue: string | undefined): number => {
    const parsed = Number.parseInt(rawValue ?? '', 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return DEFAULT_FALLBACK_BASE_RATE;
    }
    return parsed;
};

const getRateLimiter = (env: Env): RateLimiter => {
    const maxRequests = parsePositiveInt(env.RATE_LIMIT_PER_MINUTE, DEFAULT_RATE_LIMIT_PER_MINUTE);
    const windowSeconds = parsePositiveInt(env.RATE_LIMIT_WINDOW_SECONDS, DEFAULT_RATE_LIMIT_WINDOW_SECONDS);
    const cacheKey = `${maxRequests}:${windowSeconds}`;

    let limiter = limiterCache.get(cacheKey);
    if (!limiter) {
        limiter = new RateLimiter(maxRequests, { windowSeconds });
        limiterCache.set(cacheKey, limiter);
    }

    return limiter;
};

const getClientKey = (request: Request): string => {
    const cfConnectingIp = request.headers.get('CF-Connecting-IP');
    const xForwardedFor = request.headers.get('X-Forwarded-For');
    const xRealIp = request.headers.get('X-Real-IP');
    const candidate = cfConnectingIp ?? xForwardedFor?.split(',')[0] ?? xRealIp ?? 'anonymous';

    return normalizeClientKey(candidate);
};

const buildRateLimitHeaders = (limiterResult: ReturnType<RateLimiter['allowRequest']>): Record<string, string> => {
    const retryAfter = calculateRetryAfterSeconds(limiterResult.retryAfterSeconds);
    const resetAfter = calculateRetryAfterSeconds(limiterResult.resetAfterSeconds) ?? 0;
    const headers: Record<string, string> = {
        'X-RateLimit-Limit': String(limiterResult.limit),
        'X-RateLimit-Remaining': String(limiterResult.remaining),
        'X-RateLimit-Reset': String(resetAfter),
    };

    if (typeof retryAfter === 'number') {
        headers['Retry-After'] = String(retryAfter);
    }

    return headers;
};

export const onRequest: PagesFunction<Env> = async (context) => {
    const fallbackBaseRate = resolveFallbackRate(context.env.FALLBACK_BASE_RATE);
    const limiter = getRateLimiter(context.env);
    const rateLimitResult = limiter.allowRequest(getClientKey(context.request));
    const rateLimitHeaders = buildRateLimitHeaders(rateLimitResult);

    const apiKey = context.env.EXCHANGE_RATE_API_KEY;

    // Helper for JSON response
    const jsonResponse = (data: unknown, status = 200, extraHeaders: Record<string, string> = {}) => {
        return new Response(JSON.stringify(data), {
            status,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
                'Access-Control-Allow-Origin': '*', // CORS support
                ...extraHeaders,
            },
        });
    };

    if (!rateLimitResult.allowed) {
        return jsonResponse({
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please retry after the specified delay.',
        }, 429, rateLimitHeaders);
    }

    if (!apiKey || apiKey === 'YOUR_EXCHANGERATE_API_KEY') {
        return jsonResponse({
            baseRate: fallbackBaseRate,
            source: 'fallback_no_key'
        }, 200, rateLimitHeaders);
    }

    try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);

        if (!res.ok) {
            throw new Error(`ExchangeRate API error ${res.status}`);
        }

        const data: any = await res.json();
        const idrRate = data?.conversion_rates?.IDR;

        if (typeof idrRate === 'number' && idrRate > 0) {
            return jsonResponse({ baseRate: idrRate, source: 'api' }, 200, rateLimitHeaders);
        }

        throw new Error('IDR rate missing in response');
    } catch (error) {
        console.error('Rate function error:', error);
        return jsonResponse({
            baseRate: fallbackBaseRate,
            source: 'fallback_error',
            error: error instanceof Error ? error.message : String(error)
        }, 200, rateLimitHeaders);
    }
};
