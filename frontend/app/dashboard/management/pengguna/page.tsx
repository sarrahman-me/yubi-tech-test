"use client";
import { AppBar, DataTable } from "@/components/layouts";
import { IUser } from "@/interfaces/user";
import { GetDataApi } from "@/utils/fetcher";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<IUser[]>([]);
  const [metadata, setMetada] = useState({} as any);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDataApi("/api/users");

      setData(response.data.data);
      setMetada(response.data.metadata);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-5">
      <AppBar title="Daftar Pengguna" />

      <Suspense fallback={<div>Loading...</div>}>
        <DataTable
          metadata={metadata}
          pathForm="/dashboard/management/pengguna/form"
          datas={data}
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
      </Suspense>
    </div>
  );
}
