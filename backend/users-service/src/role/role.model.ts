import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ListPermissions } from 'src/list-permissions/list_permissions.model';

@Table
export class Role extends Model<Role> {
  @Column
  name: string;

  @HasMany(() => ListPermissions)
  list_permissions: ListPermissions[];
}
