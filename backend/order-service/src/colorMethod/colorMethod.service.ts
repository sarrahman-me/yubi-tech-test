import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IErrorResponse,
  IMetadata,
} from 'src/interfaces/responseType.interface';
import { Op } from 'sequelize';
import { ColorMethod } from './colorMethod.model';

@Injectable()
export class ColorMethodService {
  constructor(
    @InjectModel(ColorMethod) private readonly colorMethod: typeof ColorMethod,
  ) {}

  async add(payload: Partial<ColorMethod>): Promise<ColorMethod> {
    const errorField: Record<string, string> = {};

    if (!payload.name) {
      errorField['name'] = 'Nama metode pewarnaan harus diisi';
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

    const existingMethod = await this.colorMethod.findOne({
      where: {
        name: payload.name,
      },
    });

    if (existingMethod) {
      throw new HttpException(
        {
          status_code: 409,
          message: 'Data metode pewarnaan sudah ada',
          detail: null,
          field: {
            name: 'Gunakan nama metode pewarnaan yang berbeda',
          },
          help: 'Gunakan nama metode pewarnaan yang berbeda',
        } as IErrorResponse,
        HttpStatus.CONFLICT,
      );
    }

    return this.colorMethod.create(payload);
  }

  /**
   * mendapatkan semua data metode pewarnaan dengan pagination dan pencarian jika ditentukan
   * @param page
   * @param limit
   * @param search opsional
   * @returns metode pewarnaan dalam array
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
    data: ColorMethod[];
    metadata: IMetadata;
  }> {
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [{ nama: { [Op.like]: `%${search}%` } }],
      };
    }

    const { count, rows } = await this.colorMethod.findAndCountAll({
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

  async find(id: number): Promise<ColorMethod> {
    const data = await this.colorMethod.findByPk(id);

    if (!data) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data metode pewarnaan tidak ditemukan',
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
