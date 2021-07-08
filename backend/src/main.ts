import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { version } from '../package.json';
import { AppModule } from './app.module';
import { APP_PORT, CORS_WHITE_LIST } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Fake Ecommerce Marketplace Api')
    .setDescription('Fake Ecommerce Marketplace Api')
    .setVersion(version)
    .addServer(`http://localhost:${APP_PORT}/`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  fs.writeFileSync('./swagger-docs.json', JSON.stringify(document));
  SwaggerModule.setup('/', app, document);
  SwaggerModule.setup('/v1', app, document);
  SwaggerModule.setup('/docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        exposeUnsetFields: false,
      } as any,
    }),
  );
  app.enableCors({
    origin: function (origin, callback) {
      if (
        !origin ||
        CORS_WHITE_LIST.some((allowedDomain) => origin.includes(allowedDomain))
      ) {
        callback(null, true);
      } else {
        console.error(`Blocking request from ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
  });
  await app.listen(APP_PORT).then(() => {
    console.log(`Server is listening port ${APP_PORT}`);
  });
}
bootstrap();
