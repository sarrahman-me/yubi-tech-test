import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StyleOrder } from './styleOrder.model';
import { Style } from 'src/style/style.model';
import { StyleOrderService } from './styleOrder.service';

@Module({
  imports: [SequelizeModule.forFeature([StyleOrder, Style])],
  providers: [StyleOrderService],
})
export class StyleOrderModule {}
