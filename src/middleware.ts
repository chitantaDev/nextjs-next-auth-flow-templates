import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = [
   '/',
   '/contract',
]

export async function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl
   const token = await getToken({ req: request })

   // Redirect authenticated users away from login/register pages
   if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/', request.url))
   }

   // Redirect unauthenticated users to login for all protected routes
   if (!token && protectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url))
   }

   // --- CACHING FIX (Apply to all routes processed by middleware) ---
   const response = NextResponse.next()

   // Set headers to explicitly prevent browser caching on navigation (especially back/forward)
   response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
   response.headers.set('Pragma', 'no-cache')
   response.headers.set('Expires', '0')

   return response
}

export const config = {
   matcher: [
      '/',
      '/contract',
      '/settings',
      '/login',
      '/register',
   ],
}