import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('user-notifications')
export class UserNotificationSubscriber {
  @Process()
  async sendNotifications(job: Job<unknown>) {
    const data: any = job.data;
    await this.sendEmail(data);
  }

  async sendEmail(data: { email: string }) {
    console.log(`Welcome : ${data.email}`);
  }
}
