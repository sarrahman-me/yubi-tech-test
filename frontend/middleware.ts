import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pegesPermissions } from "./data/page-permissions";

interface DecodedToken {
  id: number;
  email: string;
  role_id: number;
  list_permissions: string[];
}

// Regular expression untuk format JWT
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname, origin } = request.nextUrl;

  if (pathname === "/favicon.ico" || pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  try {
    if (!token || !jwtRegex.test(token.value)) {
      if (
        pathname.startsWith("/dashboard") ||
        pathname === "/" ||
        pathname === "/unauthorized"
      ) {
        return NextResponse.redirect(`${origin}/login`);
      }
    } else {
      const decodedToken: DecodedToken = jwtDecode(token.value || "");

      if (!decodedToken || !decodedToken.list_permissions) {
        return NextResponse.redirect(`${origin}/login`);
      } else {
      }

      if (pathname === "/login" || pathname === "/") {
        return NextResponse.redirect(`${origin}/dashboard`);
      }

      // me as superadmin with all access route
      if (decodedToken.email === "superadmin@gmail.com") {
        return NextResponse.next();
      }

      if (pathname.startsWith("/dashboard")) {
        // Mencari izin yang diperlukan untuk halaman yang dituju
        const requiredPermissions = pegesPermissions.find((menuItem) => {
          if (menuItem.pathname === pathname) {
            return menuItem.permissions;
          }
          return null;
        })?.permissions;

        // Jika tidak ada izin yang diperlukan untuk halaman yang dituju, lanjutkan ke halaman yang diminta
        if (!requiredPermissions) {
          return NextResponse.next();
        }

        // Memeriksa apakah pengguna memiliki setidaknya satu izin yang diperlukan
        const hasPermission = requiredPermissions.some((permission) =>
          decodedToken.list_permissions?.includes(permission)
        );

        // Jika pengguna memiliki setidaknya satu izin yang diperlukan, lanjutkan ke halaman yang diminta
        if (hasPermission) {
          return NextResponse.next();
        } else {
          // Jika pengguna tidak memiliki izin yang diperlukan, arahkan mereka ke halaman tidak diizinkan
          return NextResponse.redirect(`${origin}/unauthorized`);
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(`${origin}/login`);
  }
}
