import { plainToClass, Transform } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DATABASE_TYPE: string;
  @IsString()
  DATABASE_NAME: string;
  @IsString()
  DATABASE_PORT: string;
  @IsString()
  DATABASE_HOST: string;
  @IsString()
  DATABASE_USERNAME: string;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsString()
  DATABASE_SYNCHRONIZE: string;
  @IsString()
  DATABASE_MIGRATIONS_RUN: string;
  @IsString()
  PORT: string;
  @IsString()
  REDIS_HOST: string;
  @IsString()
  REDIS_USERNAME: string;
  @IsString()
  REDIS_PORT: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
