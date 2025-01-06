import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { redisStore } from 'cache-manager-redis-store';
import { EnvironmentConfigService } from 'src/config/environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

const configSerivce = new EnvironmentConfigService(new ConfigService());

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      store: redisStore,
      socket: {
        host: configSerivce.getRedisHost(),
        username: configSerivce.getRedisUserName(),
        port: configSerivce.getRedisPort(),
      },
      ...configSerivce.getRedisPassword(),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CachingModule {}
