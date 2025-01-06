import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USERNAME');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseType(): any {
    return this.configService.get<string>('DATABASE_TYPE');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<string>('DATABASE_SYNCHRONIZE') === 'true';
  }

  getDatabaseMigrationRun(): boolean {
    return this.configService.get<string>('DATABASE_MIGRATIONS_RUN') === 'true';
  }

  getPORT(): number {
    return +this.configService.get<string>('PORT');
  }

  getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  getRedisUserName(): string {
    return this.configService.get<string>('REDIS_USERNAME');
  }

  getRedisPort(): number {
    return +this.configService.get<string>('REDIS_PORT');
  }

  getRedisPassword() {
    const password = this.configService.get<string>('REDIS_PASSWORD');
    return password ? { password } : {};
  }
}
