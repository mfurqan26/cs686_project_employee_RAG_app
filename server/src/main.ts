import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // React app will run on 3001
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();