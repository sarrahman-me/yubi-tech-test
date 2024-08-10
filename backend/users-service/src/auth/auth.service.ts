import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RoleService } from 'src/role/role.service';
import { Users } from 'src/users/users.model';
import { IJwtPayload } from 'src/interfaces/jwtPayload.interface';
import { IErrorResponse } from 'src/interfaces/responseType.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
    private readonly roleService: RoleService,
  ) {}

  /**
   * Menangani login pengguna, memverifikasi kredensial, dan menghasilkan token akses.
   * @param data - Data kredensial pengguna untuk login.
   * @returns Token akses dan detail pengguna yang berhasil login.
   */
  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    try {
      const user = await this.usersService.findbyEmail(email);

      if (!user) {
        throw new HttpException(
          {
            status_code: 400,
            message: 'Akun tidak ditemukan',
            detail: null,
            field: null,
            help: 'hubungi administrator untuk membuat akun baru',
          } as IErrorResponse,
          HttpStatus.BAD_REQUEST,
        );
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new HttpException(
          {
            status_code: 400,
            message: 'Password salah',
            detail: null,
            field: {
              password: 'password tidak cocok',
            },
            help: null,
          } as IErrorResponse,
          HttpStatus.BAD_REQUEST,
        );
      }

      const role = await this.roleService.find(user.role_id);

      const payload: IJwtPayload = {
        email: user.email,
        role_id: user.role_id,
        list_permissions: role.list_permissions.map((a) => a.permissions_name),
      };

      return this.jwt.signAsync(payload, {
        expiresIn: '1d',
      });
    } catch (error) {
      throw error;
    }
  }

  async getProfile(id: number): Promise<Users> {
    try {
      return this.usersService.findbyId(id);
    } catch (error) {
      throw error;
    }
  }
}
