import React from 'react';
import { Transaction } from '../types';

interface TransactionsListResponse {
  success: boolean;
  transactions?: Transaction[];
  error?: string;
}

export interface TransactionStatusChange {
  transactionId: string;
  displayId: string;
  fromStatus: string;
  toStatus: string;
  changedAt: string;
}

export interface UseTransactionUpdatesOptions {
  enabled?: boolean;
  pollIntervalMs?: number;
  useMockData?: boolean;
  mockTransactions?: Transaction[];
  maxStatusChanges?: number;
}

interface RefreshOptions {
  silent?: boolean;
}

const DEFAULT_POLL_INTERVAL_MS = 30_000;
const DEFAULT_MAX_STATUS_CHANGES = 20;

const sortByLatest = (items: Transaction[]): Transaction[] => {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    return bTime - aTime;
  });
};

const normalizeStatus = (status?: string): string => {
  return (status ?? 'unknown').trim().toLowerCase();
};

const detectStatusChanges = (
  previousTransactions: Transaction[],
  nextTransactions: Transaction[],
): TransactionStatusChange[] => {
  const previousById = new Map(previousTransactions.map((tx) => [tx.id, normalizeStatus(tx.status)]));
  const changes: TransactionStatusChange[] = [];

  for (const tx of nextTransactions) {
    const previousStatus = previousById.get(tx.id);
    const nextStatus = normalizeStatus(tx.status);

    if (!previousStatus || previousStatus === nextStatus) {
      continue;
    }

    changes.push({
      transactionId: tx.id,
      displayId: tx.display_id ?? tx.id.slice(0, 8),
      fromStatus: previousStatus,
      toStatus: nextStatus,
      changedAt: new Date().toISOString(),
    });
  }

  return changes;
};

const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch('/api/transactions/list');
  if (!response.ok) {
    throw new Error(`Transaction API request failed (${response.status})`);
  }

  const payload = await response.json() as TransactionsListResponse;
  if (!payload.success) {
    throw new Error(payload.error || 'Transaction API returned unsuccessful response');
  }

  if (!Array.isArray(payload.transactions)) {
    return [];
  }

  return payload.transactions;
};

export const useTransactionUpdates = (options: UseTransactionUpdatesOptions = {}) => {
  const {
    enabled = true,
    pollIntervalMs = DEFAULT_POLL_INTERVAL_MS,
    useMockData = false,
    mockTransactions = [],
    maxStatusChanges = DEFAULT_MAX_STATUS_CHANGES,
  } = options;

  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState<string | null>(null);
  const [statusChanges, setStatusChanges] = React.useState<TransactionStatusChange[]>([]);

  const isRequestInFlight = React.useRef(false);

  const refreshNow = React.useCallback(async (refreshOptions: RefreshOptions = {}) => {
    if (!enabled || isRequestInFlight.current) {
      return;
    }

    isRequestInFlight.current = true;
    if (!refreshOptions.silent) {
      setIsRefreshing(true);
    }

    try {
      const fetchedTransactions = await fetchTransactions();
      const effectiveTransactions = (useMockData && fetchedTransactions.length === 0)
        ? sortByLatest(mockTransactions)
        : sortByLatest(fetchedTransactions);

      setTransactions((previousTransactions) => {
        const changes = detectStatusChanges(previousTransactions, effectiveTransactions);
        if (changes.length > 0) {
          setStatusChanges((previous) => [...changes, ...previous].slice(0, maxStatusChanges));
        }
        return effectiveTransactions;
      });

      setLastUpdatedAt(new Date().toISOString());
      setError(null);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : 'Unknown polling error';
      setError(message);

      if (useMockData && mockTransactions.length > 0) {
        setTransactions((previousTransactions) => (
          previousTransactions.length === 0
            ? sortByLatest(mockTransactions)
            : previousTransactions
        ));
        setLastUpdatedAt((previousValue) => previousValue ?? new Date().toISOString());
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      isRequestInFlight.current = false;
    }
  }, [
    enabled,
    maxStatusChanges,
    mockTransactions,
    useMockData,
  ]);

  React.useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    void refreshNow({ silent: false });
  }, [enabled, refreshNow]);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const interval = window.setInterval(() => {
      void refreshNow({ silent: true });
    }, pollIntervalMs);

    return () => window.clearInterval(interval);
  }, [enabled, pollIntervalMs, refreshNow]);

  const clearStatusChanges = React.useCallback(() => {
    setStatusChanges([]);
  }, []);

  return {
    transactions,
    isLoading,
    isRefreshing,
    error,
    lastUpdatedAt,
    statusChanges,
    refreshNow,
    clearStatusChanges,
  };
};
