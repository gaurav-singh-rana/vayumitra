import { describe, it, expect } from 'vitest';
import { appCache } from '@/lib/cache';

describe('TTL Memory Cache', () => {
  it('stores and retrieves data within TTL', () => {
    appCache.set('test-key', { sample: 42 }, 5000);
    const entry = appCache.get<{ sample: number }>('test-key');

    expect(entry).not.toBeNull();
    expect(entry?.data.sample).toBe(42);
    expect(entry?.ageMs).toBeGreaterThanOrEqual(0);
  });

  it('expires items after TTL exceeds', async () => {
    appCache.set('fast-expire', 'hello', 10); // 10ms
    await new Promise((res) => setTimeout(res, 25));

    const expired = appCache.get('fast-expire');
    expect(expired).toBeNull();
  });

  it('correctly tracks cache size and keys', () => {
    appCache.set('key1', 'val1', 60000);
    appCache.set('key2', 'val2', 60000);

    const stats = appCache.getStats();
    expect(stats.size).toBeGreaterThanOrEqual(2);
    expect(stats.keys).toContain('key1');
  });
});
