"use client";
import { IMetadata } from "@/interfaces/response-api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function Pagination({
  metadata,
  currentPage,
  setCurrentPage,
}: {
  metadata: IMetadata;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const handleNextPage = () => {
    if (currentPage < metadata?.totalPages) {
      const nextPage = currentPage + 1;
      const queryParams = new URLSearchParams(params.toString());
      queryParams.set("page", nextPage.toString());
      setCurrentPage(nextPage);
      router.push(`${pathname}?${queryParams.toString()}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const queryParams = new URLSearchParams(params.toString());
      queryParams.set("page", prevPage.toString());
      setCurrentPage(prevPage);
      router.push(`${pathname}?${queryParams.toString()}`);
    }
  };

  return (
    <div className="flex py-3 items-center justify-between bg-white shadow-sm border border-secondary-medium/10 text-secondary-medium p-1 md:p-2 rounded-md">
      {/* prev button */}
      {currentPage > 1 && (
        <div onClick={handlePrevPage} className="text-xl cursor-pointer">
          <GrPrevious />
        </div>
      )}

      <div className="flex items-center text-sm">
        <p>
          {Math.min((currentPage - 1) * metadata.limit + 1, metadata.totalData)}
          - {Math.min(currentPage * metadata.limit, metadata.totalData)} dari{" "}
          {metadata.totalData} data
        </p>
      </div>

      {/* next page */}
      {currentPage < metadata?.totalPages && (
        <div onClick={handleNextPage} className="text-xl cursor-pointer">
          <GrNext />
        </div>
      )}
    </div>
  );
}
