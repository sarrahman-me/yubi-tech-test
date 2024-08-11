import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customers } from './customers.model';
import {
  IErrorResponse,
  IMetadata,
} from 'src/interfaces/responseType.interface';
import { Op } from 'sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customers) private readonly customer: typeof Customers,
  ) {}

  async add(payload: Partial<Customers>): Promise<Customers> {
    const errorField: Record<string, string> = {};

    if (!payload.name) {
      errorField['name'] = 'Nama pelanggan harus diisi';
    }

    if (!payload.phone) {
      errorField['phone'] = 'Nomor handphone harus diisi';
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

    const existingCustomer = await this.customer.findOne({
      where: {
        phone: payload.phone,
      },
    });

    if (existingCustomer) {
      throw new HttpException(
        {
          status_code: 409,
          message: 'Data customer sudah ada',
          detail: null,
          field: null,
          help: 'Gunakan nomor handphone yang berbeda',
        } as IErrorResponse,
        HttpStatus.CONFLICT,
      );
    }

    return this.customer.create(payload);
  }

  /**
   * mendapatkan semua data customer dengan pagination dan pencarian jika ditentukan
   * @param page
   * @param limit
   * @param search opsional
   * @returns customers dalam array
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
    data: Customers[];
    metadata: IMetadata;
  }> {
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [{ nama: { [Op.like]: `%${search}%` } }],
      };
    }

    const { count, rows } = await this.customer.findAndCountAll({
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

  async find(id: number): Promise<Customers> {
    const data = await this.customer.findByPk(id);

    if (!data) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data Customer tidak ditemukan',
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
