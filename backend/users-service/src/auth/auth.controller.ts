import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { IResponseType } from 'src/interfaces/responseType.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('masuk')
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
  async profile(@Request() req: any) {
    try {
      return {
        message: 'Berhasil Mendapatkan user yang login',
        status: HttpStatus.OK,
        data: req.user,
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
