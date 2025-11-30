import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Normalize host — Safari sometimes changes casing or omits port
  const host = (request.headers.get("host") || "").toLowerCase();
  const pathname = url.pathname;

  // Domain you want to rewrite
  const TARGET_DOMAIN = "claim.nightairdrops.com";
  const DESTINATION = "/claim";

  // 1️⃣ Ignore static files, images, Next.js internals
  const isAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(png|jpe?g|gif|svg|ico|webp|avif|txt|xml|json)$/);

  if (isAsset) {
    return NextResponse.next();
  }

  // 2️⃣ Only rewrite on the target domain
  if (host === TARGET_DOMAIN) {
    // Prevent rewrite loop: ignore /claim itself
    if (pathname === DESTINATION || pathname.startsWith(DESTINATION + "/")) {
      return NextResponse.next();
    }

    // Rewrite everything else to /claim
    url.pathname = DESTINATION;

    const response = NextResponse.rewrite(url);

    // 🔥 Safari aggressively caches rewrites — prevent that
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  }

  // 3️⃣ All other domains behave normally
  return NextResponse.next();
}

// Apply to all routes except API and Next.js internals
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg|ico|webp|avif)$).*)",
  ],
};
