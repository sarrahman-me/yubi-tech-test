import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { TiThMenuOutline } from "react-icons/ti";
import { IMenuItem } from "@/interfaces/menu_item";
import { HiOutlineUsers } from "react-icons/hi2";

export const bottom_navigation: IMenuItem[] = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    href: "/dashboard",
  },
  {
    title: "Barang",
    icon: <BsBoxSeam />,
    href: "/dashboard/barang",
  },
  {
    title: "Pesanan",
    icon: <IoReceiptOutline />,
    href: "/dashboard/pesanan",
  },
  {
    title: "Pelanggan",
    icon: <HiOutlineUsers />,
    href: "/dashboard/pelanggan",
  },
  {
    title: "Menu",
    icon: <TiThMenuOutline />,
    href: "/dashboard/menu",
  },
];
