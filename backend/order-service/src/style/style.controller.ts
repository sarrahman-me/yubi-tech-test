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
import { StyleService } from './style.service';
import { Style } from './style.model';

@Controller()
export class StyleController {
  constructor(private readonly styleService: StyleService) {}

  @HttpCode(201)
  @Post()
  async add(@Body() payload: Partial<Style>): Promise<IResponseType<Style>> {
    try {
      const data = await this.styleService.add(payload);

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
  ): Promise<IResponseType<Style[]>> {
    try {
      const { data, metadata } = await this.styleService.findAll({
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
  async findById(@Param('id') id: number): Promise<IResponseType<Style>> {
    try {
      const data = await this.styleService.find(id);

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
