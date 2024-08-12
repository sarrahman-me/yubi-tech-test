import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ColorOrderDetail } from 'src/colorOrderDetail/colorOrderDetail.model';
import { SalesOrder } from 'src/salesOrder/salesOrder.model';
import { Style } from 'src/style/style.model';

@Table
export class StyleOrder extends Model<StyleOrder> {
  @ForeignKey(() => SalesOrder)
  @Column
  sales_order_id: number;

  @ForeignKey(() => Style)
  @Column
  style_id: number;

  // relasi data ke model lain
  @BelongsTo(() => SalesOrder)
  sales_order: SalesOrder;

  @BelongsTo(() => Style)
  style: Style;

  @HasMany(() => ColorOrderDetail)
  style_order: ColorOrderDetail[];
}
