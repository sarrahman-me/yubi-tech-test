import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Permissions } from './permissions.model';
import { PermissionsService } from './permissions.service';
import { IResponseType } from 'src/interfaces/responseType.interface';

@Controller('/permissions')
export class PermissionsController {
  constructor(private readonly izinService: PermissionsService) {}

  @Get()
  @HttpCode(200)
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('search') search?: string,
  ): Promise<IResponseType<Permissions[]>> {
    try {
      const { data, metadata } = await this.izinService.findAll({
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
          error: error.response,
        } as IResponseType<Permissions>,
        error.response.status_code,
      );
    }
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() payload: Partial<Permissions>,
  ): Promise<IResponseType<Permissions>> {
    try {
      const data = await this.izinService.add(payload);

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
        } as IResponseType<Permissions>,
        error.response.status_code,
      );
    }
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: number): Promise<IResponseType<Permissions>> {
    try {
      const data = await this.izinService.delete(id);

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
        } as IResponseType<Permissions>,
        error.response.status_code,
      );
    }
  }
}
