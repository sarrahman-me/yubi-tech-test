import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    /**
     * module configuration .env
     */
    ConfigModule.forRoot(),

    /**
     * ORM Sequelize
     */
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'yubitech',
      models: [],
      autoLoadModels: true,
    }),

    /**
     * rate limiter
     */
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 menit (60000 milliseconds)
        limit: 60, // 60 requests per ttl (1 menit)
      },
    ]),

    /**
     * module lainnya
     */
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
