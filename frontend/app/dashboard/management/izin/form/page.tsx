"use client";
import { Button, Textfield } from "@/components/common";
import { AppBar } from "@/components/layouts";
import { PostDataApi } from "@/utils/fetcher";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import { FormEvent, useState } from "react";

export default function FormPage() {
  const router = useRouter();

  const [errorField, setErrorField] = useState<Record<string, string> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState({
    name: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await PostDataApi(`/api/permissions`, payload);

    if (response.status === 201) {
      Notify.success("Berhasi membuat izin");
      router.back();
    } else {
      setErrorField(response.data.error?.field || null);
      Notify.failure(
        response.data.error?.message ||
          "Terjadi kesalahan saat menambahkan data"
      );
    }

    setLoading(false);
  };

  return (
    <div className="space-y-5">
      <AppBar buttonBack title="Izin Baru" />

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-5 w-full md:w-1/2">
        <Textfield
          label="Nama Izin"
          name="name"
          setValue={(e) => setPayload({ ...payload, name: e })}
          errorMessage={errorField?.name}
        />
        <Button loading={loading} type="submit">
          Simpan
        </Button>
      </form>
    </div>
  );
}
