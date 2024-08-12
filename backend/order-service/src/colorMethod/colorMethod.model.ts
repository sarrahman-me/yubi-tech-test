import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { Color } from 'src/color/color.model';

@Table
export class ColorMethod extends Model<ColorMethod> {
  @Unique
  @Column
  name: string;

  @Column
  description: string;

  // relathionship
  @HasMany(() => Color)
  color: Color[];
}
