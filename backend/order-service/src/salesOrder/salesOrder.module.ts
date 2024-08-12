import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalesOrder } from './salesOrder.model';
import { SalesOrderService } from './salesOrder.service';
import { SalesOrderController } from './salesOrder.controller';
import { StyleOrderModule } from 'src/styleOrder/styleOrder.module';
import { ColorOrderDetailModule } from 'src/colorOrderDetail/colorOrderDetail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([SalesOrder]),
    StyleOrderModule,
    ColorOrderDetailModule,
  ],
  providers: [SalesOrderService],
  controllers: [SalesOrderController],
})
export class SalesOrderModule {}
