import React from 'react';
import {
  AlertTriangle,
  BadgeCheck,
  Clock3,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { FraudRiskLevel, TrustSummary } from '../utils/fraudDetection';

interface TrustIndicatorsProps {
  summary: TrustSummary;
  className?: string;
}

const riskStyles: Record<FraudRiskLevel, { label: string; text: string; bg: string; border: string; icon: React.ReactNode }> = {
  low: {
    label: 'Low Risk',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: <ShieldCheck size={16} />,
  },
  medium: {
    label: 'Medium Risk',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: <AlertTriangle size={16} />,
  },
  high: {
    label: 'High Risk',
    text: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: <ShieldAlert size={16} />,
  },
};

const badgeToneStyles: Record<string, string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-rose-50 text-rose-700 border-rose-200',
  neutral: 'bg-gray-50 text-gray-700 border-gray-200',
};

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ summary, className = '' }) => {
  const risk = riskStyles[summary.riskLevel];

  return (
    <section className={`bg-white rounded-xl border border-gray-200 p-5 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-bold text-gray-900">Trust Indicators</h3>
          <p className="text-sm text-gray-500">Ringkasan keamanan akun berdasarkan histori transaksi.</p>
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${risk.bg} ${risk.text} ${risk.border}`}>
          {risk.icon}
          <span className="text-xs font-semibold uppercase tracking-wide">{risk.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
          <p className="text-xs text-gray-500 mb-1">Trust Score</p>
          <p className="text-2xl font-bold text-gray-900">{summary.trustScore}</p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600"
              style={{ width: `${summary.trustScore}%` }}
            />
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
            <TrendingUp size={12} /> Tx Last 24h
          </p>
          <p className="text-2xl font-bold text-gray-900">{summary.metrics.transactionsLast24h}</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
            <Clock3 size={12} /> Last Activity
          </p>
          <p className="text-lg font-bold text-gray-900">
            {summary.metrics.hoursSinceLastTransaction === null
              ? '-'
              : `${summary.metrics.hoursSinceLastTransaction.toFixed(1)}h`}
          </p>
        </div>
      </div>

      {summary.badges.length > 0 && (
        <div className="mb-3">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Verification Badges</p>
          <div className="flex flex-wrap gap-2">
            {summary.badges.map((badge) => (
              <span
                key={badge.id}
                className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-1 text-xs font-medium ${badgeToneStyles[badge.tone] || badgeToneStyles.neutral}`}
                title={badge.description}
              >
                <BadgeCheck size={12} />
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {summary.flags.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Suspicious Signals</p>
          <div className="flex flex-wrap gap-2">
            {summary.flags.map((flag) => (
              <span key={flag} className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-1 text-xs font-medium">
                <AlertTriangle size={12} />
                {flag.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TrustIndicators;
