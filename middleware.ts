import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = (request.headers.get("host") || "").toLowerCase();
  const pathname = url.pathname;

  const TARGET_DOMAIN = "claim.nightairdrops.com";
  const DESTINATION = "/claim";

  // 1️⃣ Do NOT touch admin pages
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 2️⃣ Skip static files & assets
  const isAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(png|jpe?g|gif|svg|ico|webp|avif|txt|xml|json)$/);

  if (isAsset) {
    return NextResponse.next();
  }

  // 3️⃣ Rewrite ONLY the claim subdomain
  if (host === TARGET_DOMAIN) {
    // If already inside /claim, let it pass
    if (pathname === DESTINATION || pathname.startsWith(DESTINATION + "/")) {
      return NextResponse.next();
    }

    // Rewrite everything to /claim
    url.pathname = DESTINATION;
    const res = NextResponse.rewrite(url);
    res.headers.set("Cache-Control", "no-store, max-age=0");
    return res;
  }

  // 4️⃣ Default – do nothing
  return NextResponse.next();
}

// ✔ Safe, simple matcher — avoids regex & avoids build errors
export const config = {
  matcher: ["/:path*"],
};
