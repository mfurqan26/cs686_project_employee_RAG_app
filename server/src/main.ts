import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4203', // React app will run on 4203
    credentials: true,
  });
  const apiPort = process.env.API_PORT || 3033;
  await app.listen(apiPort);
}
bootstrap();
