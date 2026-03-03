import { vi } from 'vitest';

export const createJsonResponse = (
  body: unknown,
  init: ResponseInit = {}
): Response =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

export const mockFetchResolvedJson = (body: unknown, init: ResponseInit = {}) =>
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(createJsonResponse(body, init));

export const flushMicrotasks = async () => {
  await Promise.resolve();
  await Promise.resolve();
};
