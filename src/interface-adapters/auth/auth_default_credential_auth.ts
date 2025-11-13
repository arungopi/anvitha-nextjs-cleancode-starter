/**
 * File: auth.ts
 * Description: NextAuth configuration for username/password and Github authentication
 * Author: Arun Gopi
 * Date: 2025-02-18
 */

import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/infrastructure/prisma/client";
import { schema } from "@/interface-adapters/datamappers/schema";
// Your own logic for dealing with plaintext password strings; be careful!
import { hashPassword } from "@/interface-adapters/utils/password";
import { ZodError } from "zod";

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const validatedCredentials = schema.parse(credentials);
          // logic to salt and hash password
          const pwHash = await hashPassword(validatedCredentials.password)

          // logic to verify if the user exists
          //user = await getUserFromDb(validatedCredentials.email, pwHash)
          const u = await prisma.user.findFirst({
            where: {
              email: validatedCredentials.email,
              password: pwHash,
            },
          });

          if (!u) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.");
          }

          const user = {
            id: u?.id,
            email: u?.email,
            image: u?.image
          }

          // return user object with their profile data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            throw new Error("Invalid credentials.");
          }
        }

        return null;
      },
    }),
  ],
  theme:{
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