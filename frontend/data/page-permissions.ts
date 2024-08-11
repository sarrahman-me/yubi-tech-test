interface permissionPageInterface {
  pathname: string;
  permissions: string[];
}

export const pegesPermissions: permissionPageInterface[] = [
  {
    pathname: "/dashboard",
    permissions: ["Administrator", "View Dashboard"],
  },
  {
    pathname: "/dashboard/analisa",
    permissions: ["Administrator", "View Analisa"],
  },
  {
    pathname: "/dashboard/barang",
    permissions: ["Administrator", "View Barang"],
  },
  {
    pathname: "/dashboard/partner",
    permissions: ["Administrator", "View Partner"],
  },
  {
    pathname: "/dashboard/suplier",
    permissions: ["Administrator", "View Suplier"],
  },
  {
    pathname: "/dashboard/users-management/pengguna",
    permissions: ["Administrator", "View Pengguna"],
  },
  {
    pathname: "/dashboard/users-management/peran",
    permissions: ["Administrator", "View Peran"],
  },
  {
    pathname: "/dashboard/users-management/izin",
    permissions: ["Administrator", "View Izin"],
  },
];
