export interface IJwtPayload {
  email: string;
  role_id: number;
  list_permissions?: string[];
}
