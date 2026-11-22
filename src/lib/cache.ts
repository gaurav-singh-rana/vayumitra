/**
 * In-Memory TTL Cache Manager
 * Prevents endpoint spamming for free public AQI APIs and LLM generation.
 * Default TTL: 15 minutes (900,000 ms) as specified in PRD FR-008.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  cachedAt: number;
}

class MemoryTtlCache {
  private store: Map<string, CacheEntry<unknown>> = new Map();
  private defaultTtlMs: number;

  constructor(defaultTtlMs = 15 * 60 * 1000) {
    this.defaultTtlMs = defaultTtlMs;
  }

  get<T>(key: string): { data: T; cachedAt: number; ageMs: number } | null {
    const entry = this.store.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return {
      data: entry.data,
      cachedAt: entry.cachedAt,
      ageMs: now - entry.cachedAt,
    };
  }

  set<T>(key: string, data: T, ttlMs?: number): void {
    const ttl = ttlMs ?? this.defaultTtlMs;
    const now = Date.now();
    this.store.set(key, {
      data,
      expiresAt: now + ttl,
      cachedAt: now,
    });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  size(): number {
    // Purge expired keys before reporting size
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
    return this.store.size;
  }

  getStats(): { size: number; defaultTtlMs: number; keys: string[] } {
    return {
      size: this.size(),
      defaultTtlMs: this.defaultTtlMs,
      keys: Array.from(this.store.keys()),
    };
  }
}

// Global singleton cache across serverless executions in same runtime
declare global {
  // eslint-disable-next-line no-var
  var __vayuMitraCache: MemoryTtlCache | undefined;
}

const ttlFromEnv = process.env.CACHE_TTL_MS ? parseInt(process.env.CACHE_TTL_MS, 10) : 15 * 60 * 1000;
export const appCache = global.__vayuMitraCache || new MemoryTtlCache(ttlFromEnv);

if (process.env.NODE_ENV !== 'production') {
  global.__vayuMitraCache = appCache;
}
