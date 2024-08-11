import { IRole } from "./role";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role_id: number;
  role: IRole;
}
