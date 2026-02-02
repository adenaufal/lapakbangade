import { Transaction } from '../types';

export interface RateBreakdown {
    usd_gross: number;
    fee: number;
    usd_net: number;
    rate: number;
    idr_total: number;
    is_discount: boolean;
}

export interface TopupBreakdown {
    amount_usd: number;
    total_idr: number;
    rate: number;
    rate_type: 'balance' | 'mixed' | 'no_balance';
}

export interface CreateTransactionResponse {
    success: boolean;
    transaction_id: string;
    display_id: string;
    instruction: any;
    status: string;
    error?: string;
}

export const fetchConvertRate = async (amount: number): Promise<RateBreakdown> => {
    const response = await fetch('/api/transaction/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, type: 'convert' })
    });
    const data = await response.json() as any;
    if (!data.success) throw new Error(data.error || 'Failed to fetch rate');
    return data.data;
};

export const fetchTopupRate = async (amount: number): Promise<TopupBreakdown> => {
    const response = await fetch('/api/transaction/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, type: 'topup' })
    });
    const data = await response.json() as any;
    if (!data.success) throw new Error(data.error || 'Failed to fetch rate');
    return data.data;
};

export const createTransaction = async (payload: {
    type: 'convert' | 'topup';
    amount_usd: number;
    bank_details?: {
        bank_name: string;
        account_number: string;
        account_name: string;
    };
    email?: string;
}): Promise<CreateTransactionResponse> => {
    const response = await fetch('/api/transaction/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await response.json() as any;
    if (!data.success && !data.error) data.error = 'Transaction creation failed';
    return data;
};
