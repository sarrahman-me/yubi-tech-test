import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Role } from 'src/role/role.model';

@Module({
  imports: [SequelizeModule.forFeature([Users, Role])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
