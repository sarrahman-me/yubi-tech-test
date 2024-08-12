import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ColorMethod } from 'src/colorMethod/colorMethod.model';

@Table
export class Color extends Model<Color> {
  @Unique
  @Column
  name: string;

  @ForeignKey(() => ColorMethod)
  @Column
  color_method_id: number;

  // relasi data ke model lain
  @BelongsTo(() => ColorMethod)
  color_method: ColorMethod;
}
