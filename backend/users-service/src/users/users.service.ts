import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { Op } from 'sequelize';
import { Role } from 'src/role/role.model';
import {
  IErrorResponse,
  IMetadata,
} from 'src/interfaces/responseType.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private users: typeof Users,

    @InjectModel(Role)
    private role: typeof Role,
  ) {}

  /**
   * Mengambil semua data pengguna dengan pagination dan pencarian jika ada
   * @returns Array dari objek pengguna.
   */
  async findAll({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{
    data: Users[];
    metadata: IMetadata;
  }> {
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
      };
    }

    const { count, rows } = await this.users.findAndCountAll({
      offset,
      limit,
      where: whereClause,
      include: [
        {
          model: Role,
          as: 'role',
        },
      ],
      distinct: true,
    });

    const totalData = count;
    const totalPages = Math.ceil(totalData / limit);

    return {
      data: rows,
      metadata: {
        limit,
        page,
        totalData,
        totalPages,
      },
    };
  }

  /**
   * Mendapatkan pengguna berdasarkan nama pengguna.
   * @param {number} id
   * @returns Pengguna yang ditemukan.
   */
  async findbyId(id: number): Promise<Users> {
    const data = await this.users.findByPk(id);

    if (!data) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Pengguna tidak ditemukan',
          detail: null,
          field: null,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }

  /**
   * Mencari pengguna berdasarkan alamat email.
   * @param {string} email - Alamat email pengguna.
   * @returns Pengguna yang ditemukan.
   */
  async findbyEmail(email: string): Promise<Users> {
    return this.users.findOne({
      where: {
        email,
      },
    });
  }

  /**
   * Menambahkan pengguna baru setelah validasi nomor WhatsApp, email, dan nama pengguna.
   * @param {Partial<User>} payload
   * @returns Pengguna yang ditambahkan.
   */
  async add(payload: Partial<Users>): Promise<Users> {
    const errorField: Record<string, string> = {};

    if (!payload.name) {
      errorField['name'] = 'Nama pengguna harus diisi';
    }

    if (!payload.email) {
      errorField['email'] = 'Email pengguna harus diisi';
    }

    if (!payload.password) {
      errorField['password'] = 'Password pengguna harus diisi';
    }

    if (!payload.role_id) {
      errorField['role_id'] = 'Peran pengguna harus diisi';
    }

    if (Object.keys(errorField).length > 0) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data tidak lengkap',
          detail: null,
          field: errorField,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingEmail = await this.findbyEmail(payload.email);

    if (existingEmail) {
      throw new HttpException(
        {
          status_code: 409,
          message: 'Email sudah pernah digunakan',
          detail: null,
          field: null,
          help: 'gunakan email yang berbeda',
        } as IErrorResponse,
        HttpStatus.CONFLICT,
      );
    }

    //hash password
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(payload.password, salt);

    // mengecek apakah peran yang diinput ada
    const existingPeran = await this.role.findByPk(payload.role_id);

    if (!existingPeran) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Peran yang dipilih tidak ada di sistem',
          detail: null,
          field: null,
          help: 'Pastikan peran yang kamu gunakan tersedia',
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: Partial<Users> = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role_id: payload.role_id,
    };

    return this.users.create(newUser);
  }

  /**
   * Menghapus pengguna berdasarkan nama pengguna.
   * @param {number} id - Nama pengguna yang akan dihapus.
   * @returns Pengguna yang telah dihapus.
   */
  async delete(id: number): Promise<Users> {
    const existingUsername = await this.users.findByPk(id);

    if (!existingUsername) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Pengguna tidak ditemukan',
          detail: null,
          field: null,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.users.destroy({
      where: {
        id,
      },
    });

    return existingUsername;
  }
}
