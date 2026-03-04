import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { RateVolatilityAlert } from '../../components/RateVolatilityAlert';

describe('RateVolatilityAlert', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('uses green styling when rate goes up', () => {
    const { rerender } = render(
      <RateVolatilityAlert currentRate={16450} rateSource="api" />,
    );

    expect(screen.queryByText(/Rate Naik!/i)).not.toBeInTheDocument();

    rerender(<RateVolatilityAlert currentRate={16550} rateSource="api" />);

    const title = screen.getByText(/Rate Naik!/i);
    const banner = title.closest('div.bg-gradient-to-r');

    expect(title).toBeInTheDocument();
    expect(banner).toHaveClass('from-green-500');
    expect(banner).toHaveClass('to-emerald-500');
    expect(screen.getByText(/Rp\s*16[.,]450/)).toBeInTheDocument();
    expect(screen.getByText(/Rp\s*16[.,]550/)).toBeInTheDocument();
  });

  it('uses red styling when rate goes down', () => {
    const { rerender } = render(
      <RateVolatilityAlert currentRate={16550} rateSource="api" />,
    );

    rerender(<RateVolatilityAlert currentRate={16450} rateSource="api" />);

    const title = screen.getByText(/Rate Turun!/i);
    const banner = title.closest('div.bg-gradient-to-r');

    expect(title).toBeInTheDocument();
    expect(banner).toHaveClass('from-red-500');
    expect(banner).toHaveClass('to-orange-500');
  });

  it('ignores fallback placeholder and starts comparison from first API capture', () => {
    const { rerender } = render(
      <RateVolatilityAlert currentRate={15950} rateSource="fallback" />,
    );

    rerender(<RateVolatilityAlert currentRate={16450} rateSource="api" />);
    expect(screen.queryByText(/Rate Naik!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Rate Turun!/i)).not.toBeInTheDocument();

    rerender(<RateVolatilityAlert currentRate={16550} rateSource="api" />);
    expect(screen.getByText(/Rate Naik!/i)).toBeInTheDocument();
    expect(screen.getByText(/Rp\s*16[.,]450/)).toBeInTheDocument();
    expect(screen.getByText(/Rp\s*16[.,]550/)).toBeInTheDocument();
  });
});
