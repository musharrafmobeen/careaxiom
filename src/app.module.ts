import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EnvironmentConfigModule } from './config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './config/typeorm/typeorm.module';
import { CachingModule } from './caching/cache.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    UsersModule,
    QueueModule,
    CachingModule,
    EnvironmentConfigModule,
    TypeOrmConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
