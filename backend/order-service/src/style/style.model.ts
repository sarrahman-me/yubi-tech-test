import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class Style extends Model<Style> {
  @Unique
  @Column
  name: string;

  @Column
  description: string;
}
