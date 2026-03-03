export type TimeProvider = () => number;

export interface RateLimiterOptions {
  windowSeconds?: number;
  timeProvider?: TimeProvider;
  maxKeys?: number;
}

export interface RateLimitDecision {
  allowed: boolean;
  retryAfterSeconds?: number;
  limit: number;
  remaining: number;
  resetAfterSeconds: number;
}

/**
 * In-memory sliding-window rate limiter.
 * Storage is isolate-local (Cloudflare Worker / Node process local memory).
 */
export class RateLimiter {
  private readonly maxRequests: number;

  private readonly windowSeconds: number;

  private readonly now: TimeProvider;

  private readonly maxKeys: number;

  private readonly requests: Map<string, number[]> = new Map();

  constructor(maxRequests: number, options: RateLimiterOptions = {}) {
    if (!Number.isInteger(maxRequests) || maxRequests < 0) {
      throw new Error('maxRequests must be a non-negative integer');
    }

    const windowSeconds = options.windowSeconds ?? 60;
    if (!Number.isFinite(windowSeconds) || windowSeconds <= 0) {
      throw new Error('windowSeconds must be a positive number');
    }

    const maxKeys = options.maxKeys ?? 50_000;
    if (!Number.isInteger(maxKeys) || maxKeys <= 0) {
      throw new Error('maxKeys must be a positive integer');
    }

    this.maxRequests = maxRequests;
    this.windowSeconds = windowSeconds;
    this.now = options.timeProvider ?? (() => Date.now() / 1000);
    this.maxKeys = maxKeys;
  }

  allowRequest(key: string): RateLimitDecision {
    if (this.maxRequests === 0) {
      return {
        allowed: true,
        limit: 0,
        remaining: 0,
        resetAfterSeconds: 0,
      };
    }

    const normalizedKey = key.trim() || 'anonymous';
    const now = this.now();
    const windowStart = now - this.windowSeconds;
    const requestLog = this.requests.get(normalizedKey) ?? [];

    while (requestLog.length > 0 && requestLog[0] <= windowStart) {
      requestLog.shift();
    }

    if (requestLog.length >= this.maxRequests) {
      const retryAfter = Math.max(this.windowSeconds - (now - requestLog[0]), 0);
      return {
        allowed: false,
        retryAfterSeconds: retryAfter,
        limit: this.maxRequests,
        remaining: 0,
        resetAfterSeconds: retryAfter,
      };
    }

    requestLog.push(now);
    this.requests.set(normalizedKey, requestLog);
    this.enforceKeyCapacity(normalizedKey);

    const remaining = Math.max(this.maxRequests - requestLog.length, 0);
    const resetAfterSeconds = requestLog.length > 0
      ? Math.max(this.windowSeconds - (now - requestLog[0]), 0)
      : this.windowSeconds;

    return {
      allowed: true,
      limit: this.maxRequests,
      remaining,
      resetAfterSeconds,
    };
  }

  reset(key?: string): void {
    if (typeof key === 'string') {
      this.requests.delete(key);
      return;
    }

    this.requests.clear();
  }

  private enforceKeyCapacity(recentKey: string): void {
    if (this.requests.size <= this.maxKeys) {
      return;
    }

    const oldestKey = this.requests.keys().next().value;
    if (oldestKey && oldestKey !== recentKey) {
      this.requests.delete(oldestKey);
      return;
    }

    for (const key of this.requests.keys()) {
      if (key !== recentKey) {
        this.requests.delete(key);
        return;
      }
    }
  }
}

export function calculateRetryAfterSeconds(delay?: number): number | undefined {
  if (typeof delay !== 'number') {
    return undefined;
  }

  if (delay <= 0) {
    return 0;
  }

  return Math.ceil(delay);
}
