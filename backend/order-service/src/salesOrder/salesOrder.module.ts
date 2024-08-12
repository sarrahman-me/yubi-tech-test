import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalesOrder } from './salesOrder.model';
import { SalesOrderService } from './salesOrder.service';
import { SalesOrderController } from './salesOrder.controller';

@Module({
  imports: [SequelizeModule.forFeature([SalesOrder])],
  providers: [SalesOrderService],
  controllers: [SalesOrderController],
})
export class SalesOrderModule {}
