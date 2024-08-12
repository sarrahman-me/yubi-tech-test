import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IErrorResponse,
  IMetadata,
} from 'src/interfaces/responseType.interface';
import { Op } from 'sequelize';
import { Style } from './style.model';

@Injectable()
export class StyleService {
  constructor(@InjectModel(Style) private readonly styleModel: typeof Style) {}

  async add(payload: Partial<Style>): Promise<Style> {
    const errorField: Record<string, string> = {};

    if (!payload.name) {
      errorField['name'] = 'Nama style harus diisi';
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

    const existingStyle = await this.styleModel.findOne({
      where: {
        name: payload.name,
      },
    });

    if (existingStyle) {
      throw new HttpException(
        {
          status_code: 409,
          message: 'Data Style sudah ada',
          detail: null,
          field: {
            name: 'Gunakan nama style yang berbeda',
          },
          help: 'Gunakan nama style yang berbeda',
        } as IErrorResponse,
        HttpStatus.CONFLICT,
      );
    }

    return this.styleModel.create(payload);
  }

  /**
   * mendapatkan semua data style dengan pagination dan pencarian jika ditentukan
   * @param page
   * @param limit
   * @param search opsional
   * @returns styles dalam array
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
    data: Style[];
    metadata: IMetadata;
  }> {
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [{ nama: { [Op.like]: `%${search}%` } }],
      };
    }

    const { count, rows } = await this.styleModel.findAndCountAll({
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

  async find(id: number): Promise<Style> {
    const data = await this.styleModel.findByPk(id);

    if (!data) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data Style tidak ditemukan',
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
