"use client";
import { Button, Textfield } from "@/components/common";
import beach from "@/public/images/login-image.png";
import logo from "@/public/images/logo.png";
import { PostDataApi } from "@/utils/fetcher";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [errorField, setErrorField] = useState<Record<string, string> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await PostDataApi(`/api/auth/login`, payload);

    if (response.status === 200) {
      Notify.success("Login berhasil");
      router.push("/dashboard");
    } else {
      setErrorField(response.data.error?.field || null);
      Notify.failure(
        response.data.error?.message || "Terjadi kesalahan saat login"
      );
    }

    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen grid grid-cols-1 xl:grid-cols-2">
      {/* form */}
      <div className="flex flex-col justify-center bg-white p-5">
        {/* logo */}
        <div className="fixed top-5">
          <div className="flex items-center space-x-2">
            <Image
              width={35}
              height={35}
              className="bg-primary-600 rounded-full"
              src={logo}
              alt="logo"
            />
            <p className="font-bold text-lg md:text-xl text-primary-600">
              Yubi Technology
            </p>
          </div>
        </div>

        <div className="flex justify-center xl:justify-end items-center">
          <form className="bg-white sm:p-5 py-7 w-full max-w-xl space-y-5">
            <h2 className="text-secondary-medium font-semibold text-2xl">
              Login
            </h2>

            <Textfield
              label="Email"
              name="email"
              setValue={(e) => setPayload({ ...payload, email: e })}
              placeholder="Email Kamu"
              type="email"
            />
            <Textfield
              label="Password"
              name="password"
              setValue={(e) => setPayload({ ...payload, password: e })}
              placeholder="Kata Sandi"
              type="password"
            />
            <Button
              disabled={!payload.email || !payload.password}
              fullWidth
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>

        {/* footer */}
        <div className="fixed bottom-5">
          <p className="text-sm text-secondary-medium/30">
            Aplikasi ini hanya tantangan dari yubi technology
          </p>
        </div>
      </div>

      {/* image */}
      <div className="h-screen hidden xl:block">
        <Image src={beach} className="h-screen" alt="Beach" />
      </div>
    </div>
  );
}
