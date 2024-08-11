import { ILIstPermissions } from "./list_permissions";

export interface IRole {
  name: string;
  list_permissions: ILIstPermissions[];
}
