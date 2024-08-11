import { cookies } from "next/headers";

export async function DELETE() {
  const cookieStore = cookies();

  try {
    cookieStore.delete("token");

    return Response.json(
      { message: "Berhasil keluar dari aplikasi" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
