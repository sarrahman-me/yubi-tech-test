import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColorOrderDetail } from './colorOrderDetail.model';
import { ColorOrderDetailService } from './colorOrderDetail.service';
import { StyleOrder } from 'src/styleOrder/styleOrder.model';

@Module({
  imports: [SequelizeModule.forFeature([ColorOrderDetail, StyleOrder])],
  providers: [ColorOrderDetailService],
})
export class ColorOrderDetailModule {}
