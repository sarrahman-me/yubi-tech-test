import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OnEvent } from '@nestjs/event-emitter';
import { Style } from 'src/style/style.model';

@Injectable()
export class StyleOrderService {
  constructor(
    @InjectModel(Style)
    private styleModel: typeof Style,
  ) {}

  /**
   * Menambahkan data baru melalui event Emitter
   * @param data
   */
  @OnEvent('add.style-order')
  async addStyleOrder(): Promise<void> {}
}
