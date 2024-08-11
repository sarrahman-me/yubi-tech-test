export interface IErrorResponse {
  status_code: number;
  message: string;
  detail?: string;
  field?: Record<string, string>;
  help?: string;
}

export interface IMetadata {
  page: number;
  limit: number;
  totalData: number;
  totalPages: number;
}

export interface IResponseType {
  data?: any;
  metadata?: IMetadata;
  error?: IErrorResponse;
}
