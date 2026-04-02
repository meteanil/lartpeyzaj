import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // www.lartpeyzaj.com → lartpeyzaj.com 301 redirect
  if (hostname.startsWith("www.")) {
    const newUrl = new URL(url.pathname + url.search, `https://${hostname.replace("www.", "")}`);
    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
