import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Style } from './style.model';
import { StyleService } from './style.service';
import { StyleController } from './style.controller';

@Module({
  imports: [SequelizeModule.forFeature([Style])],
  providers: [StyleService],
  controllers: [StyleController],
})
export class StyleModule {}
