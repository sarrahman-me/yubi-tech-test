import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permissions } from 'src/permissions/permissions.model';
import { Role } from 'src/role/role.model';

@Table
export class ListPermissions extends Model<ListPermissions> {
  @Column
  permissions_name: string;

  // peran relationship
  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

  // izin relationship
  @ForeignKey(() => Permissions)
  @Column
  permissions_id: number;

  @BelongsTo(() => Permissions)
  permissions: Permissions;
}
