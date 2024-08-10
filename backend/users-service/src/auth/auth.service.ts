import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RoleService } from 'src/role/role.service';
import { Users } from 'src/users/users.model';
import { IJwtPayload } from 'src/interfaces/jwtPayload.interface';

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
        throw new UnauthorizedException('Email atau Password salah');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Email atau Password salah');
      }

      const peran = await this.roleService.find(user.role_id);

      const payload: IJwtPayload = {
        email: user.email,
        role_id: user.role_id,
        list_permissions: peran.list_permissions.map((a) => a.permissions_name),
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
