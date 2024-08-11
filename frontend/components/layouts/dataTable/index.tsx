"use client";
import { Button, Pagination, Table, Textfield } from "@/components/common";
import { IMetadata } from "@/interfaces/response-api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Column {
  label: string;
  renderCell: (item: any) => any;
  align?: "center" | "left" | "right";
}

interface IDataTable {
  datas: any[];
  columns: Column[];
  pathForm: string;
  metadata: IMetadata;
}

export function DataTable({ datas, columns, pathForm, metadata }: IDataTable) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  return (
    <div className="space-y-4">
      {/* pencarian dan tombol tambah */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Textfield
            name={"search"}
            type="search"
            placeholder="Cari sesuatu..."
            setValue={() => {}}
          />
          <Button>
            <FaSearch className="text-xl" />
          </Button>
        </div>
        <Button onClick={() => router.push(pathForm)}>Tambah</Button>
      </div>

      {/* table */}
      <Table datas={datas} columns={columns} />

      {/* pagination */}
      <Pagination
        currentPage={currentPage}
        metadata={metadata}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
