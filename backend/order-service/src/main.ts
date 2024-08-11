import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Set global prefix for all routes
   */
  app.setGlobalPrefix('order');

  /**
   * setting cors
   */
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  /**
   * helmet enabled for security
   */
  app.use(helmet());

  await app.listen(5003);
}
bootstrap();
