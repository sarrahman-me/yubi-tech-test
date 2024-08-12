import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Set global prefix for all routes
   */
  app.setGlobalPrefix('customers');

  /**
   * setting cors
   */
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://main.d119vpe6jp51oh.amplifyapp.com/login',
    ],
    credentials: true,
  });

  /**
   * helmet enabled for security
   */
  app.use(helmet());

  await app.listen(5002);
}
bootstrap();
