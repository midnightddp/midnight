import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get('host') || ''
  const { pathname } = url

  // 🟣 Only rewrite for claim.midnightdrop.site
  if (host === 'claim.nightsdrop.site') {
    // Skip rewriting for static assets and images
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/static') ||
      pathname.startsWith('/favicon') ||
      pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|avif)$/)
    ) {
      return NextResponse.next()
    }

    // Rewrite everything else to /claim
    url.pathname = '/claim'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

// ✅ Apply middleware to all routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
