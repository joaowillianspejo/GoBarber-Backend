import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import * as redis from 'redis';

import AppError from '@shared/errors/AppError';

import redisConfig from '@config/cache';

const redisClient = redis.createClient({
  socket: {
    host: redisConfig.config.redis.host,
    port: redisConfig.config.redis.port,
  },
  password: redisConfig.config.redis.password,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 5,
  duration: 1,
});

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}

export default rateLimiter;
