import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ListPermissions } from 'src/list-permissions/list_permissions.model';

@Table
export class Role extends Model<Role> {
  @Column
  nama: string;

  @HasMany(() => ListPermissions, { onDelete: 'CASCADE' })
  list_permissions: ListPermissions[];
}
