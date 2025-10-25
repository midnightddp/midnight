import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'claim.midnightdrop.site' }],
        destination: '/claim',
      },
		{
        source: '/',
        has: [{ type: 'host', value: 'admin.midnightdrop.site' }],
        destination: '/admin',
      },
    ]
  },
}

export default nextConfig
