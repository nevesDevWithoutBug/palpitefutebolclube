// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest, res: NextResponse) {
    console.log('aaaaaaaaaa')

}

// //  running middleware on specific paths.
export const config = {
    matcher: ['/app/:path*', '/api/auth/:path*'],
}