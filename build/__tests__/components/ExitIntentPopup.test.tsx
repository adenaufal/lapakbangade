import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ExitIntentPopup } from '../../components/ExitIntentPopup';

const analyticsMocks = vi.hoisted(() => ({
  trackEvent: vi.fn(),
}));

vi.mock('../../services/analytics', () => ({
  trackEvent: analyticsMocks.trackEvent,
}));

describe('ExitIntentPopup', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('constrains popup height and enables scrolling so all content stays visible', () => {
    render(<ExitIntentPopup isAuthenticated={false} />);

    vi.advanceTimersByTime(5000);
    fireEvent.mouseLeave(document, { clientY: 0 });

    const heading = screen.getByText(/Tunggu Dulu!/i);
    const popupCard = heading.closest('div.bg-white');

    expect(popupCard).not.toBeNull();
    expect(popupCard).toHaveClass('max-h-[calc(100dvh-2rem)]');
    expect(popupCard).toHaveClass('overflow-y-auto');
  });
});
