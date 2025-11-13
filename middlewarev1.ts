/**
 * @file middleware.ts
 * @description  This intercepts all requests before its processed
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-02-19
 * @module main
 * 
 * @remarks Edge compatibility should be handled if using auth.ts here
 * @see https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side
 * @see https://authjs.dev/getting-started/session-management/protecting
 * @see https://authjs.dev/reference/nextjs#authorized
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/middleware
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://dev.to/shieldstring/nextjs-15-authentication-1al7
 */

//export { auth as middleware } from "@/app/lib/auth";
/*
import { auth } from "@/app/lib/auth";
 
export default auth((req) => {
    console.log("hiiiiiiiiiiii")
  if (!req.auth && req.nextUrl.pathname !== "/signin") {
    const newUrl = new URL("/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
*/
/*
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher : [
        '/home/:path*',
        '/profile/:path*',
        '/admin/:path*',
        '/tagger/:path*'
    ]
}


// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  console.log("Hiiiiiiiiii")
  return NextResponse.redirect(new URL('/signin', request.url))
}
*/
/*
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
  */

import authConfig from "@/app/lib/auth.config"; // auth.js split for edge runtime
import NextAuth from "next-auth";
 
const { auth } = NextAuth(authConfig);

/**
 * This auth wrapper is responsible for running the authentication logic before your middleware
 * code executes. It handles reading cookies, verifying sessions/tokens, and then augments
 * the req object (or a context object accessible by your middleware) with the
 * authentication state, often in a property like req.auth.
 * Your middleware then simply checks this pre-populated state (req.auth)
 */
export default auth(async function middleware(req) {
  if (!req.auth && req.nextUrl.pathname !== "/signin") {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
})



export const config = {
    //runtime: 'nodejs', /* This overides Edge runtime of Next.js */
    matcher : [
        '/home/:path*',
        '/profile/:path*',
        '/admin/:path*',
        '/tagger/:path*',
       // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}