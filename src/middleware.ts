// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from './providers/http/jwt';

export default async function middleware(req: NextRequest) {

    try{

        if(!await isAuthenticated(req)) return handleNotAuthenticated(req)

        return NextResponse.next();
        
    } catch(error) {
 
        return handleNotAuthenticated(req)
    
    }
    
}

//  running middleware on specific paths.
export const config = {
    matcher: ['/admin/:path*', '/api/auth/:path*'],
}

async function isAuthenticated(req: NextRequest): Promise<boolean> {

    const { value:token } = <any> req.cookies.get('auth')
    if(!token) return false 

    const decodedToken = await verify(token, process.env.ACCESS_TOKEN as string)

    return decodedToken.id ? true : false;

}

function handleNotAuthenticated(req: NextRequest) {

    const { pathname } = req.nextUrl

    if (pathname.startsWith('/admin')) return NextResponse.redirect(new URL('/', req.url))

    return NextResponse.json({ success: false,  message: 'Error: Auth failed' }, { status: 401 });

}