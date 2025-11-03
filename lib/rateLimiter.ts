/**
 * Rate Limiter Utility
 * Simple in-memory rate limiting for contact form submissions
 */

interface RateLimitEntry {
  timestamps: number[];
}

// In-memory store for rate limiting
const requests = new Map<string, RateLimitEntry>();

export interface RateLimitInfo {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, session ID, etc.)
 * @param maxRequests - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Rate limit information
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 3,
  windowMs: number = 3600000 // 1 hour default
): RateLimitInfo {
  const now = Date.now();
  const entry = requests.get(identifier);

  // Get existing timestamps or create new entry
  const timestamps = entry?.timestamps || [];

  // Remove timestamps outside the current window
  const recentTimestamps = timestamps.filter((timestamp) => now - timestamp < windowMs);

  // Check if limit exceeded
  if (recentTimestamps.length >= maxRequests) {
    const oldestTimestamp = recentTimestamps[0];
    const retryAfter = Math.ceil((oldestTimestamp + windowMs - now) / 1000); // seconds

    return {
      allowed: false,
      remaining: 0,
      retryAfter,
    };
  }

  // Add current timestamp
  recentTimestamps.push(now);
  requests.set(identifier, { timestamps: recentTimestamps });

  return {
    allowed: true,
    remaining: maxRequests - recentTimestamps.length,
  };
}

/**
 * Clear rate limit data for a specific identifier
 * @param identifier - Unique identifier to clear
 */
export function clearRateLimit(identifier: string): void {
  requests.delete(identifier);
}

/**
 * Clear all rate limit data (useful for testing)
 */
export function clearAllRateLimits(): void {
  requests.clear();
}

/**
 * Clean up old entries periodically to prevent memory leaks
 * @param windowMs - Time window to keep entries
 */
export function cleanupOldEntries(windowMs: number = 3600000): void {
  const now = Date.now();

  for (const [identifier, entry] of requests.entries()) {
    const recentTimestamps = entry.timestamps.filter((timestamp) => now - timestamp < windowMs);

    if (recentTimestamps.length === 0) {
      requests.delete(identifier);
    } else {
      requests.set(identifier, { timestamps: recentTimestamps });
    }
  }
}

// Run cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    cleanupOldEntries();
  }, 600000); // 10 minutes
}
