import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Role } from './role.model';
import { RoleService } from './role.service';
import { IResponseType } from 'src/interfaces/responseType.interface';

@Controller('/role')
export class RoleController {
  constructor(private readonly peranService: RoleService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('search') search?: string,
  ): Promise<IResponseType<Role[]>> {
    try {
      const { data, metadata } = await this.peranService.findAll({
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
  async find(@Param('id') id: number): Promise<IResponseType<Role>> {
    try {
      const peran = await this.peranService.find(id);

      return {
        data: peran,
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

  @Post()
  async add(
    @Body() payload: { name: string; list_permissions_id: number[] },
  ): Promise<IResponseType<Role>> {
    try {
      const peran = await this.peranService.add(payload);

      return {
        data: peran,
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

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body()
    payload: {
      name: string;
      list_permissions_id: number[];
    },
  ): Promise<IResponseType<Role>> {
    try {
      const peran = await this.peranService.update(id, payload);

      return {
        data: peran,
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
  async delete(@Param('id') id: number): Promise<IResponseType<Role>> {
    try {
      const role = await this.peranService.delete(id);

      return {
        data: role,
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
