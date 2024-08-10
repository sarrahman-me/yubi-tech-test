import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ListPermissions } from 'src/list-permissions/list_permissions.model';

@Table
export class Permissions extends Model<Permissions> {
  @Column
  name: string;

  @HasMany(() => ListPermissions)
  list_permissions: ListPermissions[];
}
