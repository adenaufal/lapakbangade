import { describe, expect, it, vi } from 'vitest';
import { fetchUsdIdrRate, rateConfig } from '../../services/rates';
import { createJsonResponse } from '../utils/test-helpers';

describe('rates service', () => {
  it('returns API rate when endpoint returns a valid baseRate', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(createJsonResponse({ baseRate: 17000, source: 'api' }));

    await expect(fetchUsdIdrRate()).resolves.toEqual({
      baseRate: 17000,
      source: 'api',
    });
    expect(fetchSpy).toHaveBeenCalledWith('/api/rate');
  });

  it('falls back when endpoint returns non-ok status', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createJsonResponse({ message: 'error' }, { status: 500 })
    );

    await expect(fetchUsdIdrRate()).resolves.toEqual({
      baseRate: rateConfig.fallbackBase,
      source: 'fallback',
    });
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('falls back when payload is invalid', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      createJsonResponse({ baseRate: -1, source: 'api' })
    );

    await expect(fetchUsdIdrRate()).resolves.toEqual({
      baseRate: rateConfig.fallbackBase,
      source: 'fallback',
    });
  });
});
