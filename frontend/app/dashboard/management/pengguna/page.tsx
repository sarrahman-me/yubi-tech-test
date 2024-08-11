"use client";
import { AppBar, DataTable } from "@/components/layouts";
import { IUser } from "@/interfaces/user";
import { GetDataApi } from "@/utils/fetcher";
import { useEffect, useState } from "react";

export default function Page() {
  const [pelanggan, setPelanggan] = useState<IUser[]>([]);
  const [metadata, setMetada] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/users");

      setPelanggan(response.data.data);
      setMetada(response.data.metadata);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-5">
      <AppBar title="Daftar Pengguna" />

      <DataTable
        metadata={metadata}
        pathForm="/dashboard/management/pengguna/form"
        datas={pelanggan}
        columns={[
          {
            label: "Nama Pengguna",
            renderCell: (item: IUser) => item.name,
          },
          {
            label: "Email",
            renderCell: (item: IUser) => item.email,
          },
        ]}
      />
    </div>
  );
}
