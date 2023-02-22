import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import * as fs from 'fs/promises';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const file = await fs.readFile(path.resolve(__dirname, '../doc/api.yaml'), {
    encoding: 'utf8',
  });
  const document = <OpenAPIObject>yaml.load(file);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
