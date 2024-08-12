import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColorMethod } from './colorMethod.model';
import { ColorMethodService } from './colorMethod.service';
import { ColorMethodController } from './colorMethod.controller';

@Module({
  imports: [SequelizeModule.forFeature([ColorMethod])],
  providers: [ColorMethodService],
  controllers: [ColorMethodController],
})
export class ColorMethodModule {}
