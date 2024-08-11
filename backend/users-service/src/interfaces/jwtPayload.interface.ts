export interface IJwtPayload {
  id: number;
  email: string;
  role_id: number;
  list_permissions?: string[];
}
