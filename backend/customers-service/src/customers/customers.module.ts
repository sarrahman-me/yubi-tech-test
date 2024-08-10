import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customers } from './customers.model';
import { CustomerService } from './customers.service';
import { CustomersController } from './customers.controller';

@Module({
  imports: [SequelizeModule.forFeature([Customers])],
  providers: [CustomerService],
  controllers: [CustomersController],
})
export class CustomerModule {}
