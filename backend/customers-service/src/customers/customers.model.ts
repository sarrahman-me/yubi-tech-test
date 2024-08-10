import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class Customers extends Model<Customers> {
  @Column
  name: string;

  @Unique
  @Column
  phone: string;
}
