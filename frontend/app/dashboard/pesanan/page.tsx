"use client";
import { AppBar, DataTable } from "@/components/layouts";
import { IPesanan } from "@/interfaces/pesanan";
import { GetDataApi } from "@/utils/fetcher";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<IPesanan[]>([]);
  const [metadata, setMetada] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/sales-order");

      setData(response.data.data);
      setMetada(response.data.metadata);
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
          datas={data}
          columns={[
            {
              label: "Nomor Pesanan (SO)",
              renderCell: (item: IPesanan) => item.so_number,
            },
            {
              label: "Jumlah style",
              renderCell: (item: IPesanan) => item.style_order.length,
            },
          ]}
        />
      </Suspense>
    </div>
  );
}
