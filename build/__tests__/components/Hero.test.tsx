import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Hero } from '../../components/Hero';

const analyticsMocks = vi.hoisted(() => ({
  trackEvent: vi.fn(),
  trackInitiateCheckout: vi.fn(),
  trackLeadWithValue: vi.fn(),
}));

const ratesMocks = vi.hoisted(() => ({
  fetchUsdIdrRate: vi.fn(),
}));

vi.mock('../../services/analytics', () => ({
  trackEvent: analyticsMocks.trackEvent,
  trackInitiateCheckout: analyticsMocks.trackInitiateCheckout,
  trackLeadWithValue: analyticsMocks.trackLeadWithValue,
}));

vi.mock('../../services/rates', () => ({
  fetchUsdIdrRate: ratesMocks.fetchUsdIdrRate,
  rateConfig: {
    fallbackBase: 16500,
    convertAdjustment: 550,
    topupPromoDelta: -100,
    topupNormalDelta: 2000,
  },
}));

vi.mock('../../components/RealtimeProof', () => ({
  RealtimeProof: () => <div data-testid="realtime-proof" />,
}));

vi.mock('../../components/RateVolatilityAlert', () => ({
  RateVolatilityAlert: () => <div data-testid="rate-volatility-alert" />,
}));

describe('Hero component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'open').mockImplementation(() => null);
    ratesMocks.fetchUsdIdrRate.mockResolvedValue({
      baseRate: 17000,
      source: 'api',
    });
  });

  it('loads dynamic rate on mount and tracks rate_viewed', async () => {
    render(<Hero />);

    await waitFor(() => {
      expect(ratesMocks.fetchUsdIdrRate).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(/1 USD = Rp/i)).toHaveTextContent('16.450');
    expect(screen.getByText(/Sumber: API/i)).toBeInTheDocument();
    expect(analyticsMocks.trackEvent).toHaveBeenCalledWith('rate_viewed', {
      base_rate: 17000,
      source: 'api',
    });
  });

  it('tracks conversion and opens Messenger on convert CTA click', async () => {
    const user = userEvent.setup();

    render(<Hero />);

    await waitFor(() => {
      expect(ratesMocks.fetchUsdIdrRate).toHaveBeenCalledTimes(1);
    });

    await user.click(screen.getByRole('button', { name: /Lanjut Convert ke Rupiah/i }));

    expect(analyticsMocks.trackInitiateCheckout).toHaveBeenCalledWith({
      amount: 60,
      mode: 'convert',
      rate: 16450,
    });
    expect(analyticsMocks.trackLeadWithValue).toHaveBeenCalledWith({
      value: 60,
      currency: 'USD',
      mode: 'convert',
      rate: 16450,
    });
    expect(analyticsMocks.trackEvent).toHaveBeenCalledWith('cta_hero_click', {
      amount: 60,
      mode: 'convert',
      rate: 16450,
      idr_amount: 904750,
    });
    expect(window.open).toHaveBeenCalledTimes(1);
    expect((window.open as any).mock.calls[0][0]).toContain('https://m.me/lapakbangade?text=');
    expect((window.open as any).mock.calls[0][1]).toBe('_blank');
  });

  it('uses top-up rate configuration when top-up mode is selected', async () => {
    const user = userEvent.setup();

    render(<Hero />);

    await waitFor(() => {
      expect(ratesMocks.fetchUsdIdrRate).toHaveBeenCalledTimes(1);
    });

    await user.click(screen.getByRole('button', { name: /^Top-up USD$/i }));
    await user.click(screen.getByRole('button', { name: /Lanjut Top-up USD/i }));

    expect(analyticsMocks.trackInitiateCheckout).toHaveBeenCalledWith({
      amount: 60,
      mode: 'topup',
      rate: 16900,
    });
    expect(analyticsMocks.trackLeadWithValue).toHaveBeenCalledWith({
      value: 60,
      currency: 'USD',
      mode: 'topup',
      rate: 16900,
    });
  });
});
