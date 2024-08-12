import { GetDataApi, PostDataApi } from "@/utils/fetcher";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const res = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/order/color`,
      payload
    );

    if (res.status !== 201) {
      return Response.json(res.data, { status: res.status });
    }

    return Response.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  try {
    const response = await GetDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/order/color`,
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
