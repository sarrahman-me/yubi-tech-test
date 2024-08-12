import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OnEvent } from '@nestjs/event-emitter';
import { StyleOrder } from 'src/styleOrder/styleOrder.model';

@Injectable()
export class ColorOrderDetailService {
  constructor(
    @InjectModel(StyleOrder)
    private styleOrderModel: typeof StyleOrder,
  ) {}

  /**
   * Menambahkan data baru melalui event Emitter
   * @param data
   */
  @OnEvent('add.color-order-detail')
  async addStyleOrderDetail(): Promise<void> {}
}
