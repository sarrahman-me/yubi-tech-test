import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IErrorResponse,
  IMetadata,
} from 'src/interfaces/responseType.interface';
import { Op } from 'sequelize';
import { SalesOrder } from './salesOrder.model';
import { IPayloadPesanan } from 'src/interfaces/payload_pesanan';
import { StyleOrderService } from 'src/styleOrder/styleOrder.service';
import { ColorOrderDetailService } from 'src/colorOrderDetail/colorOrderDetail.service';
import { StyleOrder } from 'src/styleOrder/styleOrder.model';
// import { ColorOrderDetail } from 'src/colorOrderDetail/colorOrderDetail.model';

@Injectable()
export class SalesOrderService {
  constructor(
    @InjectModel(SalesOrder)
    private readonly salesOrderModel: typeof SalesOrder,
    private readonly styleOrderService: StyleOrderService,
    private readonly colorOrderDetailService: ColorOrderDetailService,
  ) {}

  async create(payload: IPayloadPesanan): Promise<SalesOrder> {
    const errorField: Record<string, string> = {};

    // Validasi input
    if (!payload.id_customer) {
      errorField['customer_id'] = 'Data pelanggan harus ada';
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

    const newSONumber = this.generateSoNumber();

    const salesOrderPayload: Partial<SalesOrder> = {
      so_number: newSONumber,
      customer_id: payload.id_customer,
    };

    const newSalesOrder = await this.salesOrderModel.create(salesOrderPayload);

    for (const style of payload.style) {
      const payload_style_order = {
        sales_order_id: newSalesOrder.id,
        style_id: style.style_id,
      };

      const newStyleOrder =
        await this.styleOrderService.create(payload_style_order);

      for (const colorMethod of style.color_method) {
        for (const color of colorMethod.color) {
          const payload_color_order_detail = {
            style_order_id: newStyleOrder.id,
            color_method_id: colorMethod.color_method_id,
            color_id: color.color_id,
          };

          await this.colorOrderDetailService.create(payload_color_order_detail);
        }
      }
    }

    return newSalesOrder;
  }

  private generateSoNumber() {
    const randomNum = Math.floor(Math.random() * 100000);
    return `so-${randomNum.toString().padStart(5, '0')}`;
  }

  /**
   * mendapatkan semua data sales order dengan pagination dan pencarian jika ditentukan
   * @param page
   * @param limit
   * @param search opsional
   * @returns sales order dalam array
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
    data: SalesOrder[];
    metadata: IMetadata;
  }> {
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [{ so_number: { [Op.like]: `%${search}%` } }],
      };
    }

    const { count, rows } = await this.salesOrderModel.findAndCountAll({
      offset,
      limit,
      where: whereClause,
      include: {
        model: StyleOrder,
        as: 'style_order',
      },
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

  async find(id: number): Promise<SalesOrder> {
    const data = await this.salesOrderModel.findByPk(id);

    if (!data) {
      throw new HttpException(
        {
          status_code: 400,
          message: 'Data sales order tidak ditemukan',
          detail: null,
          field: null,
          help: null,
        } as IErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }
}
