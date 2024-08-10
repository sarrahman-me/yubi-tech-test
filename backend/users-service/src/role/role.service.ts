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
    private roleModel: typeof Role,

    @InjectModel(Users)
    private usersModel: typeof Users,
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

    const { count, rows } = await this.roleModel.findAndCountAll({
      offset,
      limit,
      where: whereClause,
      include: {
        model: ListPermissions,
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
    const data = await this.roleModel.findOne({
      where: {
        id,
      },
      include: {
        model: ListPermissions,
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
  async add(payload: { nama: string; list_id_izin: number[] }): Promise<Role> {
    const errorField: Record<string, string> = {};

    if (payload.nama) {
      errorField['nama'] = 'Nama tidak boleh kosong';
    }

    if (
      !Array.isArray(payload.list_id_izin) ||
      payload.list_id_izin.length === 0
    ) {
      errorField['list_id_izin'] = 'Peran harus memiliki minimal 1 izin';
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

    const existingData = await this.roleModel.findOne({
      where: {
        nama: payload.nama,
      },
    });

    if (existingData) {
      throw new HttpException(
        {
          status_code: 409,
          message: 'Data peran sudah ada',
          detail: null,
          field: errorField,
          help: null,
        } as IErrorResponse,
        HttpStatus.CONFLICT,
      );
    }

    const newPeran = await this.roleModel.create({ nama: payload.nama });

    // pemicu untuk menambahkan data list izin dengan id peran yang baru dibuat dan daftar id izin yang dikirimkan
    const payloadListPermission: IListPermissionsPayload = {
      role_id: newPeran.id,
      list_permission_id: payload.list_id_izin,
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
      nama: string;
      list_id_izin: number[];
    },
  ): Promise<Role> {
    const errorField: Record<string, string> = {};

    if (payload.nama) {
      errorField['nama'] = 'Nama tidak boleh kosong';
    }

    if (
      !Array.isArray(payload.list_id_izin) ||
      payload.list_id_izin.length === 0
    ) {
      errorField['list_id_izin'] = 'Peran harus memiliki minimal 1 izin';
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

    const existingData = await this.roleModel.findByPk(id);

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

    await this.roleModel.update(payload, {
      where: {
        id,
      },
    });

    // pemicu menambahkan data list izin dengan id peran dan daftar id izin yang dikirimkan
    this.event.emit('add.list-izin', {
      id_peran: id,
      list_id_izin: payload.list_id_izin,
    });

    return this.roleModel.findByPk(id);
  }

  /**
   * Menghapus data peran dengan id tertentu setelah beberapa validasi
   * * Fungsi ini juga akan menghapus data list izin terkait dengannya melalui Cascade pada database
   * @param {number} id
   * @returns peran yang baru dihapus
   */
  async delete(id: number): Promise<Role> {
    const existingData = await this.roleModel.findByPk(id);

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

    const userUsageRole = await this.usersModel.findOne({
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

    await this.roleModel.destroy({
      where: {
        id,
      },
    });

    return existingData;
  }
}
