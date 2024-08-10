import { PostDataApi } from "@/utils/fetcher";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const payload = await request.json();
  const cookieStore = cookies();

  try {
    const res = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/users/login`,
      payload
    );

    if (res.status !== 200) {
      return Response.json(res.data, { status: res.status });
    }

    if (res.data.data.token) {
      cookieStore.set("token", res.data.data.token, { maxAge: 86400 });
    }

    return Response.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
