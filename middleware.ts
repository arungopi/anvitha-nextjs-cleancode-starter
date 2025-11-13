/**
 * @file middleware.ts
 * @description  This intercepts all requests before its processed, carry out minimum checks thats
 *               supported by Edge runtime
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-02-19
 * @module main
 * @version 2
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

//import authConfig from "@/app/lib/auth.config"; // auth.js split for edge runtime
//import NextAuth from "next-auth";
import { NextRequest, NextResponse } from 'next/server';
 
//const { auth } = NextAuth(authConfig);

/**
 * This auth wrapper is responsible for running the authentication logic before your middleware
 * code executes. It handles reading cookies, verifying sessions/tokens, and then augments
 * the req object (or a context object accessible by your middleware) with the
 * authentication state, often in a property like req.auth.
 * Your middleware then simply checks this pre-populated state (req.auth)
 */
/*
export default auth(async function middleware(req) {
  if (!req.auth && req.nextUrl.pathname !== "/signin") {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
})*/

//const protectedRoutes = ['/'];
const publicRoutes = ['/login', '/signup', '/signin'];
const SESSION_COOKIE_NAME = 'authjs.session-token'; //'session';//'next-auth.session-token';
 
/**
 * 
 * This code performs a lightweight check (only reading cookies) that is ideal for the Edge Runtime,
 * as it doesn't require any Node.js APIs.
 * @param req 
 * @returns 
 */
export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  //const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  
  if(isPublicRoute){
     return NextResponse.next();
  }
  
  // Check for the session cookie/JWT
  //req.cookies.get('session').value
  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = !!sessionToken; // True if the cookie exists
  
  // Redirection Logic
  // If the user is NOT authenticated (no session cookie)
  if (!isAuthenticated) {
    
    // Construct the full URL for redirection
    const signInUrl = new URL('/signin', req.nextUrl.origin);
    
    // Optionally, add a 'callbackUrl' to the signin page for post-login redirect
    // signInUrl.searchParams.set('callbackUrl', pathname); 
    
    // Redirect to the sign-in page
    return NextResponse.redirect(signInUrl);
  }

  // 4. If authenticated and not on a public path, continue to the requested page
  return NextResponse.next();
}

export const config = {
    //runtime: 'nodejs', /* This overides Edge runtime of Next.js */
    matcher : [
        //'/',
        //'/home/:path*',
        //'/profile/:path*',
        //'/admin/:path*',
        //'/tagger/:path*',
        /*
         * Match all request paths except for:
         * - api (unless you want to secure all API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, etc.
         */
       //'/((?!api|_next/static|_next/image|favicon.ico).*)',
      // '/((?!_next/static|_next/image|favicon.ico).*)',
      '/((?!api/auth|_next/static|_next/image|.*\\..*).*)',
    ]
}