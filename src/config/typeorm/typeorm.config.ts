import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
const configSerivce = new EnvironmentConfigService(new ConfigService());

export const databaseConfigurations: DataSourceOptions = {
  type: configSerivce.getDatabaseType(),
  port: +configSerivce.getDatabasePort(),
  username: configSerivce.getDatabaseUser(),
  password: configSerivce.getDatabasePassword(),
  database: configSerivce.getDatabaseName(),
  synchronize: configSerivce.getDatabaseSync(),
  host: configSerivce.getDatabaseHost(),
  entities: ['dist/src/**/entities/*.entity{.ts,.js}'],
  cache: false,
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: configSerivce.getDatabaseMigrationRun(),
  applicationName: 'careaxiom',
  logger: 'advanced-console',
  migrationsTransactionMode: 'each',
  logging: ['error'],
  poolSize: 100,
};
