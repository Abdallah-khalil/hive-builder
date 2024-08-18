/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const globalPrefix: string = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port: number = process.env.PORT != null ? +process.env.PORT : 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

void bootstrap();
