import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl
   const token = await getToken({ req: request })

   console.log('Middleware running on:', pathname)
   console.log('Token exists:', !!token)

   // Redirect authenticated users away from auth pages
   if (token && (pathname === '/login' || pathname === '/register')) {
      console.log('Redirecting authenticated user to /')
      return NextResponse.redirect(new URL('/', request.url))
   }

   // Redirect unauthenticated users to login for protected routes
   if (!token && pathname === '/') {
      console.log('Redirecting unauthenticated user to /login')
      return NextResponse.redirect(new URL('/login', request.url))
   }

   return NextResponse.next()
}

export const config = {
   matcher: [
      '/login',
      '/register',
      '/'
   ]
}