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
import { IResponseType } from 'src/interfaces/responseType.interface';
import { ColorMethodService } from './colorMethod.service';
import { ColorMethod } from './colorMethod.model';

@Controller()
export class ColorMethodController {
  constructor(private readonly colorMethodService: ColorMethodService) {}

  @HttpCode(201)
  @Post()
  async add(
    @Body() payload: Partial<ColorMethod>,
  ): Promise<IResponseType<ColorMethod>> {
    try {
      const data = await this.colorMethodService.add(payload);

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
  ): Promise<IResponseType<ColorMethod[]>> {
    try {
      const { data, metadata } = await this.colorMethodService.findAll({
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
  async findById(@Param('id') id: number): Promise<IResponseType<ColorMethod>> {
    try {
      const data = await this.colorMethodService.find(id);

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
