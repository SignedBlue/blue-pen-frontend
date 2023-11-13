import { NextRequest, NextResponse } from "next/server";
import { CookiesValues } from "./constants/Cookies";

export default function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const token = cookies && cookies.get(CookiesValues.name)?.value;

  if (!token) {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    const signInURL = new URL("/login?error=unauthorized", req.url);
    return NextResponse.redirect(signInURL);
  }

  let dashRedirectPath = "/";
  if (token === CookiesValues.admin) {
    dashRedirectPath = "/admin/dash";
  } else if (token === CookiesValues.user) {
    dashRedirectPath = "/home";
  }

  const dashRedirectURL = new URL(dashRedirectPath, req.url);

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(dashRedirectURL);
  }
}

export const config = {
  matcher: ["/", "/home", "/contratos/:path*", "/admin/:path*", "/dashboard/:path*"]
};