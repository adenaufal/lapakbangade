import { Transaction } from '../types';
import { calculateRetryAfterSeconds, RateLimiter } from './rateLimiter';
import { normalizeClientKey } from './validation';

export type FraudRiskLevel = 'low' | 'medium' | 'high';
export type FraudDenyReason = 'penalty' | 'cooldown' | 'rate_limit_exceeded';
export type TrustBadgeTone = 'success' | 'warning' | 'danger' | 'neutral';

export interface TrustBadge {
  id: string;
  label: string;
  tone: TrustBadgeTone;
  description: string;
}

export interface FraudDetectionConfig {
  maxTransactionsPerDay: number;
  minHoursBetweenTransactions: number;
  rateLimitPenaltyHours: number;
  burstLimitPerMinute: number;
  suspiciousAmountUsd: number;
  repeatedAmountThreshold: number;
  excessiveFailureRateThreshold: number;
}

export interface FraudMetrics {
  totalTransactions: number;
  transactionsLast24h: number;
  transactionsLast2h: number;
  completedCount: number;
  pendingCount: number;
  failedCount: number;
  completedVolumeUsd: number;
  failureRate: number;
  repeatedAmountMaxCount: number;
  hoursSinceLastTransaction: number | null;
}

export interface TrustSummary {
  trustScore: number;
  riskLevel: FraudRiskLevel;
  flags: string[];
  badges: TrustBadge[];
  metrics: FraudMetrics;
}

export interface FraudCheckInput {
  userId: string;
  amountUsd: number;
  transactions: Transaction[];
  now?: Date;
}

export interface FraudCheckResult extends TrustSummary {
  allowed: boolean;
  reason?: FraudDenyReason;
  message?: string;
  cooldownEndsAt?: string;
  retryAfterSeconds?: number;
  warning?: string;
}

const DEFAULT_CONFIG: FraudDetectionConfig = {
  maxTransactionsPerDay: 5,
  minHoursBetweenTransactions: 2,
  rateLimitPenaltyHours: 24,
  burstLimitPerMinute: 3,
  suspiciousAmountUsd: 500,
  repeatedAmountThreshold: 3,
  excessiveFailureRateThreshold: 0.4,
};

const ACTIVE_STATUSES = new Set(['pending', 'processing', 'waiting_payment', 'waiting_transfer', 'completed', 'success']);
const FAILED_STATUSES = new Set(['failed', 'cancelled', 'rejected']);
const PENDING_STATUSES = new Set(['pending', 'processing', 'waiting_payment', 'waiting_transfer']);

const toMs = (hours: number): number => hours * 60 * 60 * 1000;

const normalizeTransactions = (transactions: Transaction[]): Transaction[] => {
  return [...transactions]
    .filter((tx) => tx && typeof tx.created_at === 'string')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

const getMaxRepeatedAmount = (transactions: Transaction[]): number => {
  const counter = new Map<number, number>();
  let maxCount = 0;

  for (const tx of transactions) {
    const amount = Math.round((tx.amount_usd || 0) * 100) / 100;
    if (amount <= 0) {
      continue;
    }

    const nextCount = (counter.get(amount) || 0) + 1;
    counter.set(amount, nextCount);
    if (nextCount > maxCount) {
      maxCount = nextCount;
    }
  }

  return maxCount;
};

const buildMetrics = (
  transactions: Transaction[],
  now: Date,
): FraudMetrics => {
  const nowTs = now.getTime();
  const twentyFourHoursAgo = nowTs - toMs(24);
  const twoHoursAgo = nowTs - toMs(2);

  const recent24h = transactions.filter((tx) => new Date(tx.created_at).getTime() >= twentyFourHoursAgo);
  const recent2h = transactions.filter((tx) => new Date(tx.created_at).getTime() >= twoHoursAgo);

  const completedCount = transactions.filter((tx) => {
    const status = tx.status?.toLowerCase() ?? '';
    return status === 'completed' || status === 'success';
  }).length;

  const pendingCount = transactions.filter((tx) => PENDING_STATUSES.has((tx.status || '').toLowerCase())).length;
  const failedCount = transactions.filter((tx) => FAILED_STATUSES.has((tx.status || '').toLowerCase())).length;
  const completedVolumeUsd = transactions
    .filter((tx) => {
      const status = tx.status?.toLowerCase() ?? '';
      return status === 'completed' || status === 'success';
    })
    .reduce((sum, tx) => sum + (tx.amount_usd || 0), 0);

  const lastTransaction = transactions[0];
  const hoursSinceLastTransaction = lastTransaction
    ? (nowTs - new Date(lastTransaction.created_at).getTime()) / toMs(1)
    : null;

  return {
    totalTransactions: transactions.length,
    transactionsLast24h: recent24h.length,
    transactionsLast2h: recent2h.length,
    completedCount,
    pendingCount,
    failedCount,
    completedVolumeUsd,
    failureRate: transactions.length > 0 ? failedCount / transactions.length : 0,
    repeatedAmountMaxCount: getMaxRepeatedAmount(transactions),
    hoursSinceLastTransaction,
  };
};

const buildFlags = (
  transactions: Transaction[],
  metrics: FraudMetrics,
  config: FraudDetectionConfig,
): string[] => {
  const flags: string[] = [];

  if (metrics.transactionsLast24h >= Math.max(config.maxTransactionsPerDay - 1, 1)) {
    flags.push('high_velocity_24h');
  }

  if (metrics.transactionsLast2h >= 3) {
    flags.push('burst_activity_2h');
  }

  if (metrics.failureRate >= config.excessiveFailureRateThreshold) {
    flags.push('excessive_failure_rate');
  }

  if (metrics.repeatedAmountMaxCount >= config.repeatedAmountThreshold) {
    flags.push('repeated_amount_pattern');
  }

  if (metrics.pendingCount >= 4) {
    flags.push('many_pending_transactions');
  }

  if (transactions.some((tx) => (tx.amount_usd || 0) >= config.suspiciousAmountUsd)) {
    flags.push('high_value_transaction');
  }

  return flags;
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

const calculateTrustScore = (metrics: FraudMetrics, flags: string[]): number => {
  let score = 50;

  score += clamp(metrics.completedCount * 2, 0, 20);
  score += clamp(Math.floor(metrics.completedVolumeUsd / 200), 0, 15);

  if (metrics.failureRate < 0.15) {
    score += 10;
  } else if (metrics.failureRate > 0.4) {
    score -= 20;
  }

  if (metrics.pendingCount > 3) {
    score -= 10;
  }

  if (metrics.repeatedAmountMaxCount >= 3) {
    score -= 10;
  }

  score -= flags.length * 4;
  return clamp(Math.round(score), 0, 100);
};

const getRiskLevel = (score: number): FraudRiskLevel => {
  if (score >= 75) {
    return 'low';
  }

  if (score >= 45) {
    return 'medium';
  }

  return 'high';
};

const buildBadges = (summary: Pick<TrustSummary, 'trustScore' | 'riskLevel' | 'flags' | 'metrics'>): TrustBadge[] => {
  const badges: TrustBadge[] = [];

  if (summary.metrics.completedCount >= 5 && summary.riskLevel !== 'high') {
    badges.push({
      id: 'trusted-history',
      label: 'Trusted History',
      tone: 'success',
      description: 'Memiliki riwayat transaksi sukses yang konsisten.',
    });
  }

  if (summary.metrics.completedVolumeUsd >= 1000) {
    badges.push({
      id: 'high-volume',
      label: 'High Volume',
      tone: 'neutral',
      description: 'Telah menyelesaikan volume transaksi yang tinggi.',
    });
  }

  if (!summary.flags.includes('excessive_failure_rate') && summary.metrics.failureRate <= 0.2) {
    badges.push({
      id: 'low-failure',
      label: 'Low Failure',
      tone: 'success',
      description: 'Rasio gagal rendah berdasarkan histori transaksi.',
    });
  }

  if (summary.riskLevel === 'high') {
    badges.push({
      id: 'under-review',
      label: 'Under Review',
      tone: 'danger',
      description: 'Aktivitas perlu review tambahan dari sisi keamanan.',
    });
  } else if (summary.riskLevel === 'medium') {
    badges.push({
      id: 'watchlist',
      label: 'Watchlist',
      tone: 'warning',
      description: 'Aktivitas normal namun ada pola yang perlu dipantau.',
    });
  } else {
    badges.push({
      id: 'stable-account',
      label: 'Stable Account',
      tone: 'success',
      description: 'Aktivitas akun stabil dan berada pada tingkat risiko rendah.',
    });
  }

  return badges.slice(0, 4);
};

export const buildTrustSummary = (
  transactions: Transaction[],
  partialConfig: Partial<FraudDetectionConfig> = {},
  now: Date = new Date(),
): TrustSummary => {
  const config = { ...DEFAULT_CONFIG, ...partialConfig };
  const normalizedTransactions = normalizeTransactions(transactions).filter((tx) => {
    const status = (tx.status || '').toLowerCase();
    return ACTIVE_STATUSES.has(status) || FAILED_STATUSES.has(status);
  });
  const metrics = buildMetrics(normalizedTransactions, now);
  const flags = buildFlags(normalizedTransactions, metrics, config);
  const trustScore = calculateTrustScore(metrics, flags);
  const riskLevel = getRiskLevel(trustScore);

  return {
    trustScore,
    riskLevel,
    flags,
    badges: buildBadges({ trustScore, riskLevel, flags, metrics }),
    metrics,
  };
};

export class FraudDetectionEngine {
  private readonly config: FraudDetectionConfig;

  private readonly burstLimiter: RateLimiter;

  private readonly penalties = new Map<string, number>();

  constructor(config: Partial<FraudDetectionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.burstLimiter = new RateLimiter(this.config.burstLimitPerMinute, { windowSeconds: 60 });
  }

  check(input: FraudCheckInput): FraudCheckResult {
    const now = input.now ?? new Date();
    const userKey = normalizeClientKey(input.userId);
    const summary = buildTrustSummary(input.transactions, this.config, now);
    const nowTs = now.getTime();
    const activePenaltyUntil = this.penalties.get(userKey);

    if (activePenaltyUntil && activePenaltyUntil > nowTs) {
      const retryAfterSeconds = calculateRetryAfterSeconds((activePenaltyUntil - nowTs) / 1000) ?? 0;
      return {
        ...summary,
        allowed: false,
        reason: 'penalty',
        message: 'Akun sedang dalam masa pembatasan karena aktivitas berlebihan.',
        cooldownEndsAt: new Date(activePenaltyUntil).toISOString(),
        retryAfterSeconds,
      };
    }

    if (activePenaltyUntil && activePenaltyUntil <= nowTs) {
      this.penalties.delete(userKey);
    }

    const burstCheck = this.burstLimiter.allowRequest(userKey);
    if (!burstCheck.allowed) {
      const penaltyUntil = nowTs + toMs(this.config.rateLimitPenaltyHours);
      this.penalties.set(userKey, penaltyUntil);
      return {
        ...summary,
        allowed: false,
        reason: 'rate_limit_exceeded',
        message: 'Terlalu banyak percobaan transaksi dalam waktu singkat.',
        cooldownEndsAt: new Date(penaltyUntil).toISOString(),
        retryAfterSeconds: calculateRetryAfterSeconds(burstCheck.retryAfterSeconds) ?? 0,
      };
    }

    if (summary.metrics.transactionsLast24h >= this.config.maxTransactionsPerDay) {
      const penaltyUntil = nowTs + toMs(this.config.rateLimitPenaltyHours);
      this.penalties.set(userKey, penaltyUntil);
      return {
        ...summary,
        allowed: false,
        reason: 'rate_limit_exceeded',
        message: `Melebihi batas ${this.config.maxTransactionsPerDay} transaksi dalam 24 jam.`,
        cooldownEndsAt: new Date(penaltyUntil).toISOString(),
        retryAfterSeconds: calculateRetryAfterSeconds(toMs(this.config.rateLimitPenaltyHours) / 1000) ?? 0,
      };
    }

    const lastTransaction = normalizeTransactions(input.transactions)[0];
    if (lastTransaction) {
      const elapsedMs = nowTs - new Date(lastTransaction.created_at).getTime();
      const cooldownMs = toMs(this.config.minHoursBetweenTransactions);
      if (elapsedMs < cooldownMs) {
        const retryAfterSeconds = calculateRetryAfterSeconds((cooldownMs - elapsedMs) / 1000) ?? 0;
        return {
          ...summary,
          allowed: false,
          reason: 'cooldown',
          message: 'Masih dalam cooldown antar transaksi.',
          cooldownEndsAt: new Date(nowTs + (cooldownMs - elapsedMs)).toISOString(),
          retryAfterSeconds,
        };
      }
    }

    const warning = summary.metrics.transactionsLast24h >= Math.max(this.config.maxTransactionsPerDay - 1, 1)
      ? `Sisa ${Math.max(this.config.maxTransactionsPerDay - summary.metrics.transactionsLast24h, 0)} transaksi sebelum limit harian.`
      : undefined;

    return {
      ...summary,
      allowed: true,
      warning,
    };
  }
}

export const createFraudDetectionEngine = (config: Partial<FraudDetectionConfig> = {}) => {
  return new FraudDetectionEngine(config);
};
