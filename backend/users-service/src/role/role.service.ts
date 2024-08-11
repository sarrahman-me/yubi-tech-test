import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Op } from 'sequelize';
import { Role } from './role.model';
import { ListPermissions } from 'src/list-permissions/list_permissions.model';
import {
  IErrorResponse,
  IMetadata,
} from 'src/interfaces/responseType.interface';
import { IListPermissionsPayload } from 'src/interfaces/listPermissionPayload.interface';
import { Users } from 'src/users/users.model';

@Injectable()
export class RoleService {
  constructor(
    private readonly event: EventEmitter2,

    @InjectModel(Role)
    private role: typeof Role,

    @InjectModel(Users)
    private user: typeof Users,

    @InjectModel(ListPermissions)
    private listPermissions: typeof ListPermissions,
  ) {}

  /**
   * mendapatkan semua data peran dengan pagination dan pencarian jika ditentukan
   * @param page
   * @param limit
   * @param search opsional
   * @returns peran dalam array
   */
  async findAll({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{
    data: Role[];
    metadata: IMetadata;
  }> {
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [{ nama: { [Op.like]: `%${search}%` } }],
      };
    }

    const { count, rows } = await this.role.findAndCountAll({
      offset,
      limit,
      where: whereClause,
      include: {
        model: ListPermissions,
        as: 'list_permissions',
      },
      distinct: true,
    });

    const totalData = count;
    const totalPages = Math.ceil(totalData / limit);

    return {
      data: rows,
      metadata: {
        limit,
        page,
        totalData,
        totalPages,
      },
    };
  }

  /**
   * Mengambil peran berdasarkan id nya dan juga mengambil list izin yang berelasi dengannya
   * @param {number} id
   * @returns peran terkait
   */
  async find(id: number): Promise<Role> {
    const data = await this.role.findByPk(id, {
      include: {
        model: ListPermissions,
        as: 'list_permissions',
      },
    });

    if (!data) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data peran tidak ditemukan',
          detail: null,
          field: null,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }

  /**
   * Menambahkan data peran baru serta menambahkan list izin yang dimilikinya melalui event emitter
   * @returns data peran baru
   */
  async add(payload: {
    name: string;
    list_permissions_id: number[];
  }): Promise<Role> {
    const errorField: Record<string, string> = {};

    if (!payload.name) {
      errorField['nama'] = 'Nama Peran tidak boleh kosong';
    }

    if (
      !Array.isArray(payload.list_permissions_id) ||
      payload.list_permissions_id.length === 0
    ) {
      errorField['list_permissions_id'] = 'Peran harus memiliki minimal 1 izin';
    }

    if (Object.keys(errorField).length > 0) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data tidak lengkap',
          detail: null,
          field: errorField,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingData = await this.role.findOne({
      where: {
        name: payload.name,
      },
    });

    if (existingData) {
      throw new HttpException(
        {
          status_code: 409,
          message: 'Data peran sudah ada',
          detail: null,
          field: {
            name: 'Gunakan nama peran yang berbeda',
          },
          help: null,
        } as IErrorResponse,
        HttpStatus.CONFLICT,
      );
    }

    const newPeran = await this.role.create({ name: payload.name });

    // pemicu untuk menambahkan data list izin dengan id peran yang baru dibuat dan daftar id izin yang dikirimkan
    const payloadListPermission: IListPermissionsPayload = {
      role_id: newPeran.id,
      list_permission_id: payload.list_permissions_id,
    };

    this.event.emit('add.list-permissions', payloadListPermission);

    return newPeran;
  }

  /**
   * Mengupdate data peran serta izin yang dimilikinya
   * @param id
   * @param payload
   * @returns peran yang baru di perbarui
   */
  async update(
    id: number,
    payload: {
      name: string;
      list_permissions_id: number[];
    },
  ): Promise<Role> {
    const errorField: Record<string, string> = {};

    if (!payload.name) {
      errorField['name'] = 'Nama Peran tidak boleh kosong';
    }

    if (
      !Array.isArray(payload.list_permissions_id) ||
      payload.list_permissions_id.length === 0
    ) {
      errorField['list_permissions_id'] = 'Peran harus memiliki minimal 1 izin';
    }

    if (Object.keys(errorField).length > 0) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data tidak lengkap',
          detail: null,
          field: errorField,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingData = await this.role.findByPk(id);

    if (!existingData) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data peran tidak ditemukan',
          detail: null,
          field: null,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.role.update(payload, {
      where: {
        id,
      },
    });

    // pemicu untuk menambahkan data list izin dengan id peran yang baru dibuat dan daftar id izin yang dikirimkan
    const payloadListPermission: IListPermissionsPayload = {
      role_id: id,
      list_permission_id: payload.list_permissions_id,
    };

    this.event.emit('add.list-permissions', payloadListPermission);

    return this.role.findByPk(id);
  }

  /**
   * Menghapus data peran dengan id tertentu setelah beberapa validasi
   * @param {number} id
   * @returns peran yang baru dihapus
   */
  async delete(id: number): Promise<Role> {
    const existingData = await this.role.findByPk(id);

    if (!existingData) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data peran tidak ditemukan',
          detail: null,
          field: null,
          help: 'Pastikan peran memang sudah ada di sistem',
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    const userUsageRole = await this.user.findOne({
      where: {
        role_id: id,
      },
    });

    if (userUsageRole) {
      throw new HttpException(
        {
          status_code: 406,
          message: 'Peran ini digunakan oleh user tertentu',
          detail: null,
          field: null,
          help: 'Ganti peran pada semua user yang menggunakannya',
        } as IErrorResponse,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    // hapus semua list izin terkait dengannya
    await this.listPermissions.destroy({
      where: {
        role_id: id,
      },
    });

    await this.role.destroy({
      where: {
        id,
      },
    });

    return existingData;
  }
}
