import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RedocModule } from 'nestjs-redoc';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Masterhub Documentation API')
    .setVersion('0.1.2')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // @ts-ignore
  await RedocModule.setup('/api', app, document, {});

  await app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
}

start();
