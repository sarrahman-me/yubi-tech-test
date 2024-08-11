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
import { UsersService } from './users.service';
import { Users } from './users.model';
import { IResponseType } from 'src/interfaces/responseType.interface';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('search') search?: string,
  ): Promise<IResponseType<Users[]>> {
    try {
      const { data, metadata } = await this.usersService.findAll({
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
  async findById(@Param('id') id: number): Promise<IResponseType<Users>> {
    try {
      const data = await this.usersService.findbyId(id);

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

  @Post()
  @HttpCode(201)
  async add(@Body() payload: Partial<Users>): Promise<IResponseType<Users>> {
    try {
      const data = await this.usersService.add(payload);

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
  async delete(@Param('id') id: number): Promise<IResponseType<Users>> {
    try {
      const users = await this.usersService.delete(id);

      return {
        data: users,
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
