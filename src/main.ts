import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import * as fs from 'fs/promises';
import * as path from 'path';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggingService);
  app.useLogger(logger);

  // Swagger settings
  const file = await fs.readFile(path.resolve(__dirname, '../doc/api.yaml'), {
    encoding: 'utf8',
  });
  const document = <OpenAPIObject>yaml.load(file);
  SwaggerModule.setup('doc', app, document);

  // Exception filter settings
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  // Validation pipes settings
  app.useGlobalPipes(new ValidationPipe());

  // Logging interceptor settings
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  await app.listen(process.env.PORT || 4000);

  process.on('uncaughtException', (err, origin) => {
    logger.error(err.message, origin);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    const msg = reason instanceof Error ? reason.message : reason;
    logger.error(msg, 'unhandledRejection');
    process.exit(1);
  });
}
bootstrap();
