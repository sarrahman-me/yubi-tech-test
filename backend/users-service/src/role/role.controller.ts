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
          error: error.response,
        } as IResponseType<Permissions>,
        error.response.status_code,
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
          error: error.response,
        } as IResponseType<Permissions>,
        error.response.status_code,
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
          error: error.response,
        } as IResponseType<Permissions>,
        error.response.status_code,
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
          error: error.response,
        } as IResponseType<Permissions>,
        error.response.status_code,
      );
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<IResponseType<Role>> {
    try {
      const peran = await this.peranService.delete(id);

      return {
        data: peran,
        metadata: null,
        error: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
