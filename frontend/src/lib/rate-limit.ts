type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalStore = globalThis as typeof globalThis & {
  __rateLimitStore?: Map<string, RateLimitEntry>;
};

const store = globalStore.__rateLimitStore ?? new Map<string, RateLimitEntry>();
globalStore.__rateLimitStore = store;

const MAX_ENTRIES = 5000;
const CLEANUP_INTERVAL_MS = 60_000;
let lastCleanupAt = 0;

function touch(key: string, entry: RateLimitEntry) {
  store.delete(key);
  store.set(key, entry);
}

function cleanup(now: number) {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;

  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }

  if (store.size <= MAX_ENTRIES) return;
  const overflow = store.size - MAX_ENTRIES;
  let removed = 0;
  for (const key of store.keys()) {
    store.delete(key);
    removed += 1;
    if (removed >= overflow) break;
  }
}

export function checkRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  cleanup(now);
  const existing = store.get(key);

  if (!existing || now > existing.resetAt) {
    const entry = { count: 1, resetAt: now + windowMs };
    touch(key, entry);
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  if (existing.count >= max) {
    touch(key, existing);
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  touch(key, existing);
  return { allowed: true, remaining: max - existing.count, resetAt: existing.resetAt };
}
