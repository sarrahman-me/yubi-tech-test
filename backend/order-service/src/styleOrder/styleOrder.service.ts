import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StyleOrder } from './styleOrder.model';

@Injectable()
export class StyleOrderService {
  constructor(
    @InjectModel(StyleOrder)
    private styleOrder: typeof StyleOrder,
  ) {}

  async create(payload: Partial<StyleOrder>): Promise<StyleOrder> {
    return this.styleOrder.create(payload);
  }
}
