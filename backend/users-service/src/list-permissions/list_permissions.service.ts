import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ListPermissions } from './list_permissions.model';
import { OnEvent } from '@nestjs/event-emitter';
import { Permissions } from 'src/permissions/permissions.model';

@Injectable()
export class ListPermissionsService {
  constructor(
    @InjectModel(ListPermissions)
    private listPermissions: typeof ListPermissions,

    @InjectModel(ListPermissions)
    private permissions: typeof Permissions,
  ) {}

  /**
   * Menambahkan data baru melalui event Emitter
   * @param data
   */
  @OnEvent('add.list-permissions')
  async addListIzinWhenNewPeranAdded({
    role_id,
    list_permission_id,
  }: {
    role_id: number;
    list_permission_id: number[];
  }): Promise<void> {
    await this.listPermissions.destroy({
      where: {
        role_id,
      },
    });

    for (const permissions_id of list_permission_id) {
      // check data sudah ada
      const existingData = await this.listPermissions.findOne({
        where: {
          permissions_id,
          role_id,
        },
      });

      // abaikan jika sudah ada data data peran dan izin yang sama
      if (existingData) {
        return;
      }

      const permissionData = await this.permissions.findByPk(permissions_id);

      // abaikan jika izin tidak ada data izin
      if (!permissionData) {
        return;
      }

      const payload: Partial<ListPermissions> = {
        permissions_id,
        role_id,
        permissions_name: permissionData.nama,
      };

      await this.listPermissions.create(payload);
    }
  }
}
