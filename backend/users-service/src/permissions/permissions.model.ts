import { Column, Model, Table } from 'sequelize-typescript';
// import { ListIzin } from 'src/list-izin/list-izin.model';

@Table
export class Permissions extends Model<Permissions> {
  @Column
  nama: string;

  //   @HasMany(() => ListIzin, { onDelete: 'CASCADE' })
  //   list_izin: ListIzin[];
}
