import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Users } from 'src/users/users.model';
import { ListPermissions } from 'src/list-permissions/list_permissions.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, Users, ListPermissions])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
