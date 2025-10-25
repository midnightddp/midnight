import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
    const host = request.headers.get('host') || ''

      // For claim.midnightdrop.site
        if (host === 'claim.midnightdrop.site') {
            url.pathname = '/claim'
                return NextResponse.rewrite(url)
                  }

                    // For admin.midnightdrop.site
                      if (host === 'admin.midnightdrop.site') {
                          url.pathname = '/admin'
                              return NextResponse.rewrite(url)
                                }

                                  return NextResponse.next()
                                  }

                                  export const config = {
                                    matcher: [
                                        '/((?!_next/static|_next/image|favicon.ico).*)',
                                          ],
                                          }