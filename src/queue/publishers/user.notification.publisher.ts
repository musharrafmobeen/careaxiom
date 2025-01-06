import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UserNotificationPublisher {
  constructor(
    @InjectQueue('user-notifications')
    private userNotificationsQueue: Queue,
  ) {}

  async addNotifications(payload: { email: string }) {
    await this.userNotificationsQueue.add(payload);
  }
}
