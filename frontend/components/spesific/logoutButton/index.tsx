"use client";
import { DeleteDataApi } from "@/utils/fetcher";
import { Confirm, Loading, Notify } from "notiflix";
import { CiLogout } from "react-icons/ci";

export default function LogoutButton() {
  const handleLogout = async () => {
    Confirm.show(
      "Konfirmasi",
      `Kamu akan keluar dari aplikasi ?`,
      "Keluar",
      "Batal",
      async () => {
        Loading.standard();

        try {
          const { status } = await DeleteDataApi(`/api/auth/logout`);

          if (status !== 200) {
            Notify.failure("Gagal keluar dari aplikasi");
          }

          window.location.reload();
        } catch (error) {
          console.error("Gagal keluar dari aplikasi:", error);
          Notify.failure("Gagal keluar dari aplikasi");
        }
        Loading.remove();
      },
      () => {},
      {
        titleColor: "#0284c7",
        okButtonBackground: "#0284c7",
        borderRadius: "4px",
      }
    );
  };

  return (
    <span
      onClick={handleLogout}
      className="flex items-center p-2 rounded text-red-600 cursor-pointer hover:bg-red-50"
    >
      <CiLogout className="mr-2 text-lg" />
      Keluar
    </span>
  );
}
