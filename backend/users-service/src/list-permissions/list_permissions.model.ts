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

  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @ForeignKey(() => Permissions)
  @Column
  permissions_id: number;

  // relasi data ke model lain
  @BelongsTo(() => Role)
  role: Role;

  @BelongsTo(() => Permissions)
  permissions: Permissions;
}
