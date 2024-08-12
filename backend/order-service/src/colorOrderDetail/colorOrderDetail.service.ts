import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ColorOrderDetail } from './colorOrderDetail.model';

@Injectable()
export class ColorOrderDetailService {
  constructor(
    @InjectModel(ColorOrderDetail)
    private colorOrderDetail: typeof ColorOrderDetail,
  ) {}

  async create(payload: Partial<ColorOrderDetail>): Promise<ColorOrderDetail> {
    return this.colorOrderDetail.create(payload);
  }
}
