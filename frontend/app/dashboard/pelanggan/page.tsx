"use client";
import { AppBar, DataTable } from "@/components/layouts";
import { ICustomers } from "@/interfaces/customers";
import { GetDataApi } from "@/utils/fetcher";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [pelanggan, setPelanggan] = useState<ICustomers[]>([]);
  const [metadata, setMetada] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/customers");

      setPelanggan(response.data.data);
      setMetada(response.data.metadata);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-5">
      <AppBar title="Pelanggan" />

      <Suspense fallback={<div>Loading...</div>}>
        <DataTable
          metadata={metadata}
          pathForm="/dashboard/pelanggan/form"
          datas={pelanggan}
          columns={[
            {
              label: "Nama Pelanggan",
              renderCell: (item: ICustomers) => item.name,
            },
            {
              label: "Nomor Telpon",
              renderCell: (item: ICustomers) => item.phone,
            },
          ]}
        />
      </Suspense>
    </div>
  );
}
