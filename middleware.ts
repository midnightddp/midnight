import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = (request.headers.get("host") || "").toLowerCase();
  const pathname = url.pathname;

  const TARGET_DOMAIN = "claim.nightairdrops.com";
  const DESTINATION = "/claim";

  // 0️⃣ HARD EXCLUSION — Protect admin route
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Ignore assets
  const isAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(png|jpe?g|gif|svg|ico|webp|avif|txt|xml|json)$/);

  if (isAsset) return NextResponse.next();

  // Domain rewrite only for claim subdomain
  if (host === TARGET_DOMAIN) {
    if (pathname === DESTINATION || pathname.startsWith(DESTINATION + "/")) {
      return NextResponse.next();
    }

    url.pathname = DESTINATION;
    const response = NextResponse.rewrite(url);
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg|ico|webp|avif)$).*)",
  ],
};
