import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class SalesOrder extends Model<SalesOrder> {
  @Column
  customer_id: number; // foreign dari service lain

  @Column
  so_number: string;
}
