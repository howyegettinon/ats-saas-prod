// src/auth/middleware/rate-limit.ts
import { Redis } from "@upstash/redis/cloudflare"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const rateLimit = async (identifier: string) => {
  const key = `rate-limit:${identifier}`
  const current = await redis.incr(key)
  if (current > 10) throw new Error("Rate limit exceeded") // 10 req/60s
  await redis.expire(key, 60)
  return { success: current <= 10 }
}
