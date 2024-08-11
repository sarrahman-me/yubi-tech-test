"use client";
import { Button, CheckboxGroup, Label, Textfield } from "@/components/common";
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
    list_permissions_id: [],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await PostDataApi(`/api/role`, payload);

    if (response.status === 201) {
      Notify.success("Berhasi menambahkan peran");
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
      <AppBar buttonBack title="Peran Baru" />

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-5 w-full md:w-1/2">
        <Textfield
          label="Nama Peran"
          name="name"
          setValue={(e) => setPayload({ ...payload, name: e })}
          errorMessage={errorField?.name}
        />

        <CheckboxGroup
          label="Pilih Izin"
          urlDataApi="/api/permissions"
          setList={(e) => setPayload({ ...payload, list_permissions_id: e })}
          list={payload.list_permissions_id}
          metadata={{
            key: "id",
            data: "name",
          }}
        />
        <Button loading={loading} type="submit">
          Simpan
        </Button>
      </form>
    </div>
  );
}
