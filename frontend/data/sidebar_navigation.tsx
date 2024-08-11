import { MdOutlineDashboard } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { IMenuItem } from "@/interfaces/menu_item";
import { IoReceiptOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";

export const sidebar_navigation: IMenuItem[] = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    href: "/dashboard",
  },
  {
    title: "Pesanan",
    icon: <IoReceiptOutline />,
    href: "/dashboard/pesanan",
  },
  {
    title: "Barang",
    icon: <BsBoxSeam />,
    href: "/dashboard/barang",
  },
  {
    title: "Pelanggan",
    icon: <HiOutlineUsers />,
    href: "/dashboard/pelanggan",
  },
  {
    title: "Management Pengguna",
    icon: <RiAdminLine />,
    href: "/dashboard/pengguna",
  },
];
