import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Permissions } from './permissions.model';
import {
  IErrorResponse,
  IMetadata,
} from 'src/interfaces/responseType.interface';
import { ListPermissions } from 'src/list-permissions/list_permissions.model';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permissions)
    private permissionsModel: typeof Permissions,

    @InjectModel(Permissions)
    private listPermissions: typeof ListPermissions,
  ) {}

  /**
   * mendapatkan semua data izin dengan pagination dan pencarian jika ditentukan
   * @param page
   * @param limit
   * @param search opsional
   * @returns izin dalam array
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
    data: Permissions[];
    metadata: IMetadata;
  }> {
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause = {
        nama: { [Op.like]: `%${search}%` },
      };
    }

    const { count, rows } = await this.permissionsModel.findAndCountAll({
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
   * Mendapatkan izin dengan id yang sesuai dengan pengecekan
   * @param {number} id
   * @returns izin yang sesuai dengan id
   */
  async find(id: number): Promise<Permissions> {
    const data = await this.permissionsModel.findByPk(id);

    if (!data) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data tidak ditemukan',
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
   * Menambahkan data izin jika data izin belum ada
   * @param data
   * @returns izin baru
   */
  async add(payload: Partial<Permissions>): Promise<Permissions> {
    const errorField: Record<string, string> = {};

    if (!payload.nama) {
      errorField['nama'] = 'Nama izin harus diisi';
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

    const existingData = await this.permissionsModel.findOne({
      where: {
        nama: payload.nama,
      },
    });

    if (existingData) {
      throw new HttpException(
        {
          status_code: 409,
          message: 'Data izin sudah ada',
          detail: null,
          field: errorField,
          help: 'Gunakan nama izin yang berbeda',
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.permissionsModel.create(payload);
  }

  /**
   * Menghapus data izin dengan id tertentu setelah beberapa pengecekan
   * @param {number} id
   * @returns data izin baru dihapus
   */
  async delete(id: number): Promise<Permissions> {
    const existingData = await this.permissionsModel.findByPk(id);

    if (!existingData) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Izin tidak ditemukan',
          detail: null,
          field: null,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    const izinUsage = await this.listPermissions.findOne({
      where: {
        id,
      },
    });

    if (izinUsage) {
      throw new HttpException(
        {
          status_code: 406,
          message: 'Izin ini digunakan oleh peran tertentu',
          detail: null,
          field: null,
          help: 'Hapus izin ini dari semua peran sebelum menghapus',
        } as IErrorResponse,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    await this.permissionsModel.destroy({
      where: {
        id,
      },
    });

    return existingData;
  }
}
