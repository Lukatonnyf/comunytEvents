// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value

//   const protectedPaths = ['/features', '/createEvent', '/compartilharFotos', '/enviarConvites',]

//   const isProtected = protectedPaths.some((path) =>
//     request.nextUrl.pathname.startsWith(path)
//   )

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return NextResponse.next()
// }

// // Aplica o middleware apenas a certas rotas
// export const config = {
//   matcher: ['/features/:path*', '/createEvent/:path*', '/compartilharFotos/:path*', '/enviarConvites/:path*'],
// }
