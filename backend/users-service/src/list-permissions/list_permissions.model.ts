import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permissions } from 'src/permissions/permissions.model';

@Table
export class ListPermissions extends Model<ListPermissions> {
  @Column
  permissions_name: string;

  // peran relationship
  //   @ForeignKey(() => Peran)
  @Column
  role_id: number;

  //   @BelongsTo(() => Peran)
  //   peran: Peran;

  // izin relationship
  @ForeignKey(() => Permissions)
  @Column
  permissions_id: number;

  @BelongsTo(() => Permissions)
  permissions: Permissions;
}
