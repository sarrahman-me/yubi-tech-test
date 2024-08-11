import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Permissions } from './permissions/permissions.model';
import { PermissionsModule } from './permissions/permissions.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ListPermissions } from './list-permissions/list_permissions.model';
import { Role } from './role/role.model';
import { ListPermissionsModule } from './list-permissions/list_permissions.module';
import { RoleModule } from './role/role.module';
import { Users } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    /**
     * module configuration .env
     */
    ConfigModule.forRoot(),

    /**
     * Event Emiter module
     */
    EventEmitterModule.forRoot(),

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
      models: [Permissions, ListPermissions, Role, Users],
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
    PermissionsModule,
    ListPermissionsModule,
    RoleModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    /**
     * konfigurasi rate limiter global
     */
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
