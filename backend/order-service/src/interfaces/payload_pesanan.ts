interface IColor {
  color_id: number;
  qty: number;
}

interface IColorMethod {
  color_method_id: number;
  color: IColor[];
}

interface IStyle {
  style_id: number;
  color_method: IColorMethod[];
}

export interface IPayloadPesanan {
  id_customer: number;
  style: IStyle[];
}
