import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Role } from 'src/role/role.model';

@Table
export class Users extends Model<Users> {
  @Column
  nama: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;
}
