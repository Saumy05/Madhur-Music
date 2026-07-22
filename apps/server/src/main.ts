import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Setup CORS
  app.enableCors();

  // Setup Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Madhur Music API')
    .setDescription('The API documentation for the Madhur Music ecosystem backend services.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  logger.log(`[Madhur Server] Listening on http://localhost:${port}`);
  logger.log(`[Swagger Docs] Available on http://localhost:${port}/docs`);
}

bootstrap();
