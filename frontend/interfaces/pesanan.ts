interface IStyleOrder {
  id: number;
  sales_order_id: number;
  style_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPesanan {
  id: number;
  customer_id: number;
  so_number: string;
  createdAt: string;
  updatedAt: string;
  style_order: IStyleOrder[];
}
