import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async hmget(key: string) {
    return JSON.parse(await this.cacheManager.get(key));
  }

  async set(key: string, value: any, ttl: number = 60 * 60 * 24 * 1000) {
    return await this.cacheManager.set(key, value, ttl);
  }

  async hmset(key: string, value: any, ttl: number = 60 * 60 * 24 * 1000) {
    return await this.cacheManager.set(key, JSON.stringify(value), ttl);
  }

  async delete(key: string) {
    return await this.cacheManager.del(key);
  }

  async update(key: string, value: any, ttl: number = 60 * 60 * 24 * 1000) {
    try {
      const data: any = await this.cacheManager.get(key);
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return await this.cacheManager.set(
          key,
          JSON.stringify([...parsedData, value]),
          ttl,
        );
      } else {
        return await this.cacheManager.set(key, JSON.stringify(value), ttl);
      }
    } catch (e) {
      return await this.cacheManager.set(key, value, ttl);
    }
  }

  async has(key: string) {
    const data = await this.cacheManager.get(key);
    return data ? true : false;
  }
}
