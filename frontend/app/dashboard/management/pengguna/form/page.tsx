"use client";
import { Button, Select, Textfield } from "@/components/common";
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
    email: "",
    password: "",
    role_id: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await PostDataApi(`/api/users`, payload);

    if (response.status === 201) {
      Notify.success("Berhasi menambahkan pengguna");
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
      <AppBar buttonBack title="Pengguna Baru" />

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-5 w-full md:w-1/2">
        <Textfield
          label="Nama Pengguna"
          name="name"
          setValue={(e) => setPayload({ ...payload, name: e })}
          errorMessage={errorField?.name}
        />
        <Textfield
          label="Email"
          name="email"
          type="email"
          setValue={(e) => setPayload({ ...payload, email: e })}
          errorMessage={errorField?.email}
        />
        <Textfield
          label="Password"
          name="password"
          type="password"
          setValue={(e) => setPayload({ ...payload, password: e })}
          errorMessage={errorField?.password}
        />
        <Select
          urlDataApi={"/api/role"}
          label={"Peran"}
          placeholder="pilih..."
          value={payload.role_id}
          setValue={(e) => setPayload({ ...payload, role_id: e })}
          keyValue={{
            key: "id",
            value: "name",
          }}
        />

        <Button loading={loading} type="submit">
          Simpan
        </Button>
      </form>
    </div>
  );
}
