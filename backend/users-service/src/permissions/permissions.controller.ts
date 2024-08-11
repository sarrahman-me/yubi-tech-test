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
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @HttpCode(200)
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('search') search?: string,
  ): Promise<IResponseType<Permissions[]>> {
    try {
      const { data, metadata } = await this.permissionsService.findAll({
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

  @Post()
  @HttpCode(201)
  async create(
    @Body() payload: Partial<Permissions>,
  ): Promise<IResponseType<Permissions>> {
    try {
      const data = await this.permissionsService.add(payload);

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

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: number): Promise<IResponseType<Permissions>> {
    try {
      const data = await this.permissionsService.delete(id);

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
