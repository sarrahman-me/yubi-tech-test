import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { StyleOrder } from 'src/styleOrder/styleOrder.model';

@Table
export class SalesOrder extends Model<SalesOrder> {
  @Column
  customer_id: number; // foreign dari service lain

  @Column
  so_number: string;

  @HasMany(() => StyleOrder)
  style_order: StyleOrder[];
}
