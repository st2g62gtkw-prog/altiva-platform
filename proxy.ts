import { NextResponse, type NextRequest } from "next/server";

import { isAuthProtectionEnabled } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const isPrivateRoute = request.nextUrl.pathname.startsWith("/app");

  if (!isPrivateRoute || !isAuthProtectionEnabled()) {
    return NextResponse.next();
  }

  // Future integration point: replace this cookie check with Supabase Auth session validation.
  const hasSession = request.cookies.has("altiva-session");

  if (!hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"]
};
