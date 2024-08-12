import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Color } from 'src/color/color.model';
import { ColorMethod } from 'src/colorMethod/colorMethod.model';
import { StyleOrder } from 'src/styleOrder/styleOrder.model';

@Table
export class ColorOrderDetail extends Model<ColorOrderDetail> {
  @ForeignKey(() => StyleOrder)
  @Column
  style_order_id: number;

  @ForeignKey(() => ColorMethod)
  @Column
  color_method_id: number;

  @ForeignKey(() => Color)
  @Column
  color_id: number;

  // relasi data ke model lain
  @BelongsTo(() => StyleOrder)
  style_order: StyleOrder;

  @BelongsTo(() => ColorMethod)
  color_method: ColorMethod;

  @BelongsTo(() => Color)
  color: Color;
}
