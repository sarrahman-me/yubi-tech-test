import { GetDataApi } from "@/utils/fetcher";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  try {
    const response = await GetDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/users/auth/profile`,
      token?.value
    );

    if (response.status !== 200) {
      return Response.json(response.data, { status: response.status });
    }

    return Response.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
