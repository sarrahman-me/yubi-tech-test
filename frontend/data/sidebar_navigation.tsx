import { MdOutlineDashboard } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { IMenuItem } from "@/interfaces/menu_item";
import { IoReceiptOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";

export const sidebar_navigation: IMenuItem[] = [
  {
    type: "list",
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    href: "/dashboard",
    permissions: ["Administrator"],
  },
  {
    type: "list",
    title: "Pesanan",
    icon: <IoReceiptOutline />,
    href: "/dashboard/pesanan",
    permissions: ["Administrator"],
  },
  {
    type: "dropdown",
    title: "Produk",
    icon: <BsBoxSeam />,
    permissions: ["Administrator"],
    subList: [
      {
        title: "Semua Produk",
        href: "/dashboard/produk",
        permissions: ["Administrator", "View Products"],
      },
      {
        title: "Gaya",
        href: "/dashboard/produk/gaya",
        permissions: ["Administrator", "View Style"],
      },
      {
        title: "Metode Pewarnaan",
        href: "/dashboard/produk/metode-pewarnaan",
        permissions: ["Administrator", "View Color Method"],
      },
      {
        title: "Nama Warna",
        href: "/dashboard/produk/warna",
        permissions: ["Administrator", "View Warna"],
      },
    ],
  },
  {
    type: "list",
    title: "Pelanggan",
    icon: <HiOutlineUsers />,
    href: "/dashboard/pelanggan",
    permissions: ["Administrator"],
  },
  {
    type: "dropdown",
    title: "Management",
    icon: <RiAdminLine />,
    permissions: [
      "Administrator",
      "View Users",
      "View Role",
      "View Permissions",
    ],
    subList: [
      {
        title: "Pengguna",
        href: "/dashboard/management/pengguna",
        permissions: ["Administrator", "View Users"],
      },
      {
        title: "Peran",
        href: "/dashboard/management/peran",
        permissions: ["Administrator", "View Role"],
      },
      {
        title: "Izin",
        href: "/dashboard/management/izin",
        permissions: ["Administrator", "View Permissions"],
      },
    ],
  },
];
