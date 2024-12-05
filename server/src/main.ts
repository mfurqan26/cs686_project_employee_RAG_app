import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // React app will run on 4200
    credentials: true,
  });
  const apiPort = process.env.API_PORT || 3033;
  await app.listen(apiPort);
}
bootstrap();
