import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customers.service';
import { Customers } from './customers.model';
import { IResponseType } from 'src/interfaces/responseType.interface';

@Controller()
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @HttpCode(201)
  @Post()
  async add(
    @Body() payload: Partial<Customers>,
  ): Promise<IResponseType<Customers>> {
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
          error: error.response || error.message,
        } as IResponseType<undefined>,
        error.response?.status_code || 500,
      );
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('search') search?: string,
  ): Promise<IResponseType<Customers[]>> {
    try {
      const { data, metadata } = await this.customerService.findAll({
        page,
        limit,
        search,
      });

      return {
        data,
        metadata,
        error: null,
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          metadata: null,
          error: error.response || error.message,
        } as IResponseType<undefined>,
        error.response.status_code || 500,
      );
    }
  }

  @Get('/:id')
  @HttpCode(200)
  async findById(@Param('id') id: number): Promise<IResponseType<Customers>> {
    try {
      const data = await this.customerService.find(id);

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
          error: error.response || error.message,
        } as IResponseType<undefined>,
        error.response.status_code || 500,
      );
    }
  }
}
