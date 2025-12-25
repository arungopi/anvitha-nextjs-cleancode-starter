/**
 * @file auth.config.ts
 * @description  auth.ts file is split to make it Edge compatibility
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-15
 * @module Authentication
 * @remarks 
 * @see
 * 
 */

import  { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { schema } from "@/interface-adapters/datamappers/schema";
import { ConsoleLogger } from "@/infrastructure/services/ConsoleLogger";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { AuthService } from "@/infrastructure/services/AuthService";
import { AuthorizationController } from "../controllers/AuthorizationController";
// Your own logic for dealing with plaintext password strings; be careful!
//import { hashPassword, verifyPassword } from "@/app/utils/password";

import { ZodError } from "zod";

const consoleLogger = new ConsoleLogger();
const authorizationController = new AuthorizationController();

export default {
     providers: [GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email", required: true},
        password: { label: "Password", type: "password", required: true},
        role: {label: "Role", type: "text", required: true},
      },
      async authorize(credentials): Promise<User | null> {
        
        try {
          const validatedCredentials = schema.parse(credentials);
          const userRepository = new UserRepository();
          const authService = new AuthService(userRepository);
         
          const matchedUser = await authService.validateUserByEmail(validatedCredentials.email);
                   
          if(matchedUser == null){
            consoleLogger.error("User not found")
            throw new Error("User not found.");
          }
          
          const authStatus = await authService.validatePassword(validatedCredentials.password, matchedUser.password as string)
          
          if (!authStatus) {
            consoleLogger.debug("Invalid credentials")
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.");
          }

          if(!await authorizationController.userRoleExists(matchedUser.id, validatedCredentials.role)){
            consoleLogger.debug("Invalid credentials: Role does not exist");
            throw new Error("Invalid credentials: User doesn't have this role");
          }

          const user = {
            id: matchedUser.id,
            email: matchedUser.email,
            image: matchedUser.image,
            role : validatedCredentials.role,
          }

          consoleLogger.debug("User logged in : ", user)
          // return user object with their profile data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            consoleLogger.error("Invalid credentials", error)
            // Return `null` to indicate that the credentials are invalid
            throw new Error("Invalid credentials.");
          }
          //throw new Error(JSON.stringify({errors : "Authorization Error", status : false}));
          //throw new Error("Authorization Error");
        }

        return null;
      },
    }),
  ]
} satisfies NextAuthConfig;