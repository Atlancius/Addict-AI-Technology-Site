type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalStore = globalThis as typeof globalThis & {
  __rateLimitStore?: Map<string, RateLimitEntry>;
};

const store = globalStore.__rateLimitStore ?? new Map<string, RateLimitEntry>();
globalStore.__rateLimitStore = store;

export function checkRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now > existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  if (existing.count >= max) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  store.set(key, existing);
  return { allowed: true, remaining: max - existing.count, resetAt: existing.resetAt };
}
