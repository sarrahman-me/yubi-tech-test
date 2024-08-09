import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permissions } from './permissions.model';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [SequelizeModule.forFeature([Permissions])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
