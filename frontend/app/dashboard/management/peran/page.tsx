"use client";
import { AppBar, DataTable } from "@/components/layouts";
import { IRole } from "@/interfaces/role";
import { GetDataApi } from "@/utils/fetcher";
import { useEffect, useState } from "react";

export default function Page() {
  const [pelanggan, setPelanggan] = useState<IRole[]>([]);
  const [metadata, setMetada] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/role");

      setPelanggan(response.data.data);
      setMetada(response.data.metadata);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-5">
      <AppBar title="Daftar Peran" />

      <DataTable
        metadata={metadata}
        pathForm="/dashboard/management/peran/form"
        datas={pelanggan}
        columns={[
          {
            label: "Nama Peran",
            renderCell: (item: IRole) => item.name,
          },
        ]}
      />
    </div>
  );
}
