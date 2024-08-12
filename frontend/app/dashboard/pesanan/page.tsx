"use client";
import { AppBar, DataTable } from "@/components/layouts";
import { ICustomers } from "@/interfaces/customers";
import { GetDataApi } from "@/utils/fetcher";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<ICustomers[]>([]);
  const [metadata, setMetada] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/customers");

      setData(response.data.data);
      // setMetada(response.data.metadata);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-5">
      <AppBar title="Pesanan" />

      <Suspense fallback={<div>Loading...</div>}>
        <DataTable
          metadata={metadata}
          pathForm="/dashboard/pesanan/form"
          datas={[]}
          columns={[
            {
              label: "Nomor Pesanan (SO)",
              renderCell: (item: ICustomers) => item.name,
            },
            {
              label: "Nama Customer",
              renderCell: (item: ICustomers) => item.phone,
            },
          ]}
        />
      </Suspense>
    </div>
  );
}
