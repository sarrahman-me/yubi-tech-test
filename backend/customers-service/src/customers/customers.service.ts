import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customers } from './customers.model';
import { IErrorResponse } from 'src/interfaces/responseType.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customers) private readonly customer: typeof Customers,
  ) {}

  async add(payload: Partial<Customers>): Promise<Customers> {
    const errorField: Record<string, string> = {};

    if (!payload.name) {
      errorField['name'] = 'Nama harus diisi';
    }

    if (!payload.phone) {
      errorField['phone'] = 'Phone harus diisi';
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
          help: null,
        } as IErrorResponse,
        HttpStatus.CONFLICT,
      );
    }

    return this.customer.create({ name: payload.name, phone: payload.phone });
  }
}
