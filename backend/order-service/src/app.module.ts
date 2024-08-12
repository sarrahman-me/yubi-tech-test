import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Style } from './style/style.model';
import { StyleModule } from './style/style.module';
import { ColorMethod } from './colorMethod/colorMethod.model';
import { ColorMethodModule } from './colorMethod/colorMethod.module';
import { Color } from './color/color.model';
import { ColorModule } from './color/color.module';

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
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'yubitech',
      models: [Style, ColorMethod, Color],
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
    StyleModule,
    ColorMethodModule,
    ColorModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
