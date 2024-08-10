import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { IResponseType } from 'src/interfaces/responseType.interface';
import { Users } from 'src/users/users.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async masuk(
    @Body() data: { email: string; password: string },
  ): Promise<IResponseType<{ token: string }>> {
    if (!data.email || !data.password) {
      throw new BadRequestException('data tidak lengkap');
    }

    try {
      const token = await this.authService.login(data);

      return {
        data: {
          token,
        },
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

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req: any): Promise<IResponseType<Users>> {
    try {
      return {
        data: req.user,
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
