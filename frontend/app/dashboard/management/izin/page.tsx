"use client";
import { AppBar, DataTable } from "@/components/layouts";
import { IPermissions } from "@/interfaces/permissions";
import { GetDataApi } from "@/utils/fetcher";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<IPermissions[]>([]);
  const [metadata, setMetada] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/permissions");

      setData(response.data.data);
      setMetada(response.data.metadata);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-5">
      <AppBar title="Daftar Izin" />

      <Suspense fallback={<div>Loading...</div>}>
        <DataTable
          metadata={metadata}
          pathForm="/dashboard/management/izin/form"
          datas={data}
          columns={[
            {
              label: "Nama Izin",
              renderCell: (item: IPermissions) => item.name,
            },
          ]}
        />{" "}
      </Suspense>
    </div>
  );
}
