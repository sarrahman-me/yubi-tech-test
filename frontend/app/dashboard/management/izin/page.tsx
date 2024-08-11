"use client";
import { AppBar, DataTable } from "@/components/layouts";
import { IPermissions } from "@/interfaces/permissions";
import { GetDataApi } from "@/utils/fetcher";
import { useEffect, useState } from "react";

export default function Page() {
  const [pelanggan, setPelanggan] = useState<IPermissions[]>([]);
  const [metadata, setMetada] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/permissions");

      setPelanggan(response.data.data);
      setMetada(response.data.metadata);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-5">
      <AppBar title="Daftar Izin" />

      <DataTable
        metadata={metadata}
        pathForm="/dashboard/management/izin/form"
        datas={pelanggan}
        columns={[
          {
            label: "Nama Izin",
            renderCell: (item: IPermissions) => item.name,
          },
        ]}
      />
    </div>
  );
}
