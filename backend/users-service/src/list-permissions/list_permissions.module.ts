import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListPermissions } from './list_permissions.model';
import { ListPermissionsService } from './list_permissions.service';
import { Permissions } from 'src/permissions/permissions.model';

@Module({
  imports: [SequelizeModule.forFeature([ListPermissions, Permissions])],
  providers: [ListPermissionsService],
})
export class ListPermissionsModule {}
