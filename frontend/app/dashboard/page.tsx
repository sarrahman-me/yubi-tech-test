import { AppBar } from "@/components/layouts";
import { IUser } from "@/interfaces/user";
import { GetDataApi } from "@/utils/fetcher";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const response = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/users/auth/profile`,
    token?.value
  );

  const user: IUser = response.data.data;

  return (
    <div className="space-y-5">
      <AppBar title="Dashboard" />
      <h2 className="text-secondary-medium/80 text-xl">Halo {user.name}</h2>
    </div>
  );
}
