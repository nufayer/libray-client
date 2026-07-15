import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isOnLoginPage = pathname.startsWith("/login");
  const isOnRegisterPage = pathname.startsWith("/register");
  const isOnAdminPage = pathname.startsWith("/admin");
  const isOnProfilePage = pathname.startsWith("/profile");
  const isOnOrdersPage = pathname.startsWith("/orders");

  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isAuthenticated = !!sessionToken;

  // Protect protected routes
  // if ((isOnProfilePage || isOnOrdersPage || isOnAdminPage) && !isAuthenticated) {
  //   const loginUrl = new URL("/login", request.url);
  //   loginUrl.searchParams.set("callbackUrl", pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // Redirect authenticated users away from auth pages
  // if ((isOnLoginPage || isOnRegisterPage) && isAuthenticated) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
