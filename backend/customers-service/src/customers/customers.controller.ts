import { Controller, HttpCode, HttpException, Post } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { Customers } from './customers.model';
import { IResponseType } from 'src/interfaces/responseType.interface';

@Controller()
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @HttpCode(200)
  @Post()
  async add(payload: Partial<Customers>): Promise<IResponseType<Customers>> {
    try {
      const data = await this.customerService.add(payload);

      return {
        data,
        metadata: null,
        error: null,
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          metadata: null,
          error: error.response,
        } as IResponseType<Customers>,
        error.response.status_code,
      );
    }
  }
}
