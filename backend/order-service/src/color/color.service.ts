import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IErrorResponse,
  IMetadata,
} from 'src/interfaces/responseType.interface';
import { Op } from 'sequelize';
import { Color } from './color.model';

@Injectable()
export class ColorService {
  constructor(@InjectModel(Color) private readonly colorModel: typeof Color) {}

  async add(payload: Partial<Color>): Promise<Color> {
    const errorField: Record<string, string> = {};

    if (!payload.name) {
      errorField['name'] = 'Nama warna harus diisi';
    }

    if (!payload.color_method_id) {
      errorField['color_method_id'] = 'Metode pewarnaan harus diisi';
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

    const existingColor = await this.colorModel.findOne({
      where: {
        name: payload.name,
        color_method_id: payload.color_method_id,
      },
    });

    if (existingColor) {
      throw new HttpException(
        {
          status_code: 409,
          message: 'Data warna sudah ada',
          detail: null,
          field: {
            name: 'Gunakan nama warna yang berbeda',
            color_method_id: 'Gunakan metode pewarnaan yang berbeda',
          },
          help: 'Gunakan nama warna yang berbeda',
        } as IErrorResponse,
        HttpStatus.CONFLICT,
      );
    }

    return this.colorModel.create(payload);
  }

  /**
   * mendapatkan semua data warna dengan pagination dan pencarian jika ditentukan
   * @param page
   * @param limit
   * @param search opsional
   * @returns warnas dalam array
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
    data: Color[];
    metadata: IMetadata;
  }> {
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [{ nama: { [Op.like]: `%${search}%` } }],
      };
    }

    const { count, rows } = await this.colorModel.findAndCountAll({
      offset,
      limit,
      where: whereClause,
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

  async find(id: number): Promise<Color> {
    const data = await this.colorModel.findByPk(id);

    if (!data) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data warna tidak ditemukan',
          detail: null,
          field: null,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }
}
