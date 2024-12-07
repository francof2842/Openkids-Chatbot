import redisClient from "./redisClient";

export async function isRateLimited(
  userId: string,
  maxRequests: number,
  windowInSeconds: number
): Promise<boolean> {
  const key = `rate_limit:${userId}`;

  // Check and increment the counter atomically
  const currentRequests = await redisClient.incr(key);

  if (currentRequests === 1) {
    // If this is the first request, set the expiry for the rate limit window
    await redisClient.expire(key, windowInSeconds);
  }

  // Check if the user has exceeded the maximum number of requests
  if (currentRequests > maxRequests) {
    return true; // Rate limit exceeded
  }

  return false; // Within the allowed limit
}
