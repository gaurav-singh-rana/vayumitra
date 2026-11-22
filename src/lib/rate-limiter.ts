/**
 * In-Memory Sliding-Window Rate Limiter
 * Enterprise API throttling utility to defend against Denial-of-Service (DoS) and brute-force flooding.
 */

interface RateLimitRecord {
  timestamps: number[];
}

export interface RateLimitResult {
  isAllowed: boolean;
  limit: number;
  remaining: number;
  resetTimeSeconds: number;
}

class RateLimiter {
  private storage = new Map<string, RateLimitRecord>();
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private lastCleanup: number = Date.now();

  constructor(windowMs = 60000, maxRequests = 60) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  /**
   * Checks whether the client identifier (e.g. IP or session key) is within allowed rate limits.
   */
  public check(identifier: string): RateLimitResult {
    const now = Date.now();
    this.cleanupStaleRecords(now);

    const record = this.storage.get(identifier) || { timestamps: [] };
    // Filter timestamps within current sliding window
    const windowStart = now - this.windowMs;
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= this.maxRequests) {
      const oldestInWindow = record.timestamps[0];
      const resetTimeSeconds = Math.max(1, Math.ceil((oldestInWindow + this.windowMs - now) / 1000));
      return {
        isAllowed: false,
        limit: this.maxRequests,
        remaining: 0,
        resetTimeSeconds,
      };
    }

    record.timestamps.push(now);
    this.storage.set(identifier, record);

    return {
      isAllowed: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - record.timestamps.length,
      resetTimeSeconds: Math.ceil(this.windowMs / 1000),
    };
  }

  /**
   * Prevents unbounded memory growth by sweeping inactive records every 5 minutes.
   */
  private cleanupStaleRecords(now: number): void {
    if (now - this.lastCleanup < 300000) return;
    this.lastCleanup = now;

    const windowStart = now - this.windowMs;
    for (const [key, record] of this.storage.entries()) {
      record.timestamps = record.timestamps.filter((ts) => ts > windowStart);
      if (record.timestamps.length === 0) {
        this.storage.delete(key);
      }
    }
  }
}

// Global singletons for API protection
export const chatRateLimiter = new RateLimiter(60000, 30); // 30 queries per min for chat
export const aqiRateLimiter = new RateLimiter(60000, 60); // 60 requests per min for telemetry
export const guidanceRateLimiter = new RateLimiter(60000, 45); // 45 requests per min for guidance

/**
 * Extracts client IP safely from standard HTTP headers.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}
