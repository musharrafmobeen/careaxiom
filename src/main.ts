import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigService } from './config/environment-config/environment-config.service';

const configSerivce = new EnvironmentConfigService(new ConfigService());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validation Pipe for validating the incoming request data based on some dto
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(configSerivce.getPORT());
}
bootstrap();
