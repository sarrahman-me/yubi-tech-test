import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { TiThMenuOutline } from "react-icons/ti";
import { IMenuItem } from "@/interfaces/menu_item";
import { HiOutlineUsers } from "react-icons/hi2";

export const bottom_navigation: IMenuItem[] = [
  {
    type: "list",
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    href: "/dashboard",
    permissions: [],
  },
  {
    type: "list",
    title: "Produk",
    icon: <BsBoxSeam />,
    href: "/dashboard/produk",
    permissions: [],
  },
  {
    type: "list",
    title: "Pesanan",
    icon: <IoReceiptOutline />,
    href: "/dashboard/pesanan",
    permissions: [],
  },
  {
    type: "list",
    title: "Pelanggan",
    icon: <HiOutlineUsers />,
    href: "/dashboard/pelanggan",
    permissions: [],
  },
  {
    type: "list",
    title: "Menu",
    icon: <TiThMenuOutline />,
    href: "/dashboard/menu",
    permissions: [],
  },
];
