"use client";
import { AppBar, DataTable } from "@/components/layouts";
import { IRole } from "@/interfaces/role";
import { GetDataApi } from "@/utils/fetcher";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<IRole[]>([]);
  const [metadata, setMetada] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/products/color");

      setData(response.data.data);
      setMetada(response.data.metadata);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-5">
      <AppBar title="Daftar Warna" />

      <Suspense fallback={<div>Loading...</div>}>
        <DataTable
          metadata={metadata}
          pathForm="/dashboard/produk/warna/form"
          datas={data}
          columns={[
            {
              label: "Nama Warna",
              renderCell: (item: IRole) => item.name,
            },
          ]}
        />
      </Suspense>
    </div>
  );
}
