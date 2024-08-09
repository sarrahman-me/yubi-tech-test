import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permissions } from './permissions.model';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { ListPermissions } from 'src/list-permissions/list_permissions.model';

@Module({
  imports: [SequelizeModule.forFeature([Permissions, ListPermissions])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
