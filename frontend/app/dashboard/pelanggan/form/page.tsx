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
    phone: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await PostDataApi(`/api/customers`, payload);

    if (response.status === 201) {
      Notify.success("Login berhasil");
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
      <AppBar buttonBack title="Pelanggan Baru" />

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-5 w-full md:w-1/2">
        <Textfield
          label="Nama Pelanggan"
          name="name"
          setValue={(e) => setPayload({ ...payload, name: e })}
          errorMessage={errorField?.name}
        />
        <Textfield
          type="tel"
          label="Nomor Telpon"
          name="phone"
          setValue={(e) => setPayload({ ...payload, phone: e })}
          errorMessage={errorField?.phone}
        />
        <Button loading={loading} type="submit">
          Simpan
        </Button>
      </form>
    </div>
  );
}
