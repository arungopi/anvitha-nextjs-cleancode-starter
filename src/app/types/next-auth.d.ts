/**
 * @file auth.ts
 * @description  NextAuth type extended to support role property
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-12-24
 * @module NextAuth
 * @remarks
 * @see
 * 
 */

import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
   interface Session {
     user: User & DefaultSession["user"],
     token: string
   }

   interface User {
     role?: number
   }
}

declare module "next-auth/jwt" {
   interface JWT {
     accessToken: string
     role?: number
   }
}