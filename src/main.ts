import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AllExceptionsFilter } from './infrastructure/common/exception.filter';
import { LoggingInterceptor } from './infrastructure/common/logging.interceptor';

async function setupSwagger(app: INestApplication) {
  if (process.env.LOCAL !== '1') return;

  const config = new DocumentBuilder()
    .setTitle('Seasoning Cookbook API')
    .setDescription(
      'API para gerenciamento de receitas de seasoning para Pokemon',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors({
    origin: /^http:\/\/localhost(:\d+)?$/,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
