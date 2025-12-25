/**
 * @file auth.ts
 * @description  NextAuth configuration for username/password and Github authentication
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-15
 * @module Authentication
 * @remarks To be imporoved
 * @see
 * 
 */

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from "@/infrastructure/prisma/client";
import authConfig from "./auth.config"


const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
 
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 1, /* 1 hour*/ },
  ...authConfig,
  callbacks: {
    async authorized({auth}) {
      // Logged in users are authenticated, otherwise redirect to login page
      //return !!auth?.user;
      return !!auth?.user;
    },
    async session({ session, token }) { // <--- ADD THIS SESSION CALLBACK
      if (token.id) {
        session.user.id = token.id as string; // Assign id from token to session.user
        session.user.role = token.role; // custom role support - refer:next-auth.d.ts
      }
      
      return session;
    },
    async jwt({ token, user,account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
        token.id = user?.id; // Add user ID to the token
        token.role = user?.role; // custom role support - refer:next-auth.d.ts
      }
      return token;
    },
    async redirect({ baseUrl }) {
      // redirected here after sigin
      return `${baseUrl}`;
    }
  },
  theme: {
    logo: '/logo.png'
  }
})

/**
 * File: auth.ts
 * Description: Authentication setup
 * Author: Arun Gopi
 * Date: 2025-02-19
 */
/*
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/app/lib/db/db";
import { schema } from "@/app/lib/db/schema";

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {

        const validatedCredentials = schema.parse(credentials);
        //console.log(validatedCredentials)
        const user = await db.user.findFirst({
          where: {
            email: validatedCredentials.email,
            password: validatedCredentials.password,
          },
        });

        //const user = { 'username': 'test-user', 'email': 'test@example.com' };
        //console.log(user);
        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
        // TODO hash the password and check as DB will be having Hash
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        //user = await getUserFromDb(credentials.email, pwHash)

        // return user object with their profile data
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // VERY IMPORTANT: Set a strong secret in your environment variables
})
  */
