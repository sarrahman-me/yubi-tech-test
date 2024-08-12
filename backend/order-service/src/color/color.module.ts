import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Color } from './color.model';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { ColorMethod } from 'src/colorMethod/colorMethod.model';

@Module({
  imports: [SequelizeModule.forFeature([Color, ColorMethod])],
  providers: [ColorService],
  controllers: [ColorController],
})
export class ColorModule {}
