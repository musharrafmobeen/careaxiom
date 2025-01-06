import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';
import { UserNotificationPublisher } from './publishers/user.notification.publisher';
import { UserNotificationSubscriber } from './subscribers/user.notification.subscriber';

const configSerivce = new EnvironmentConfigService(new ConfigService());

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: configSerivce.getRedisHost(),
        username: configSerivce.getRedisUserName(),
        port: configSerivce.getRedisPort(),
        ...configSerivce.getRedisPassword(),
      },
    }),
    BullModule.registerQueue({
      name: 'user-notifications',
      defaultJobOptions: { removeOnComplete: 1000 },
    }),
  ],
  providers: [UserNotificationPublisher, UserNotificationSubscriber],
  exports: [UserNotificationPublisher, UserNotificationSubscriber],
})
export class QueueModule {}
