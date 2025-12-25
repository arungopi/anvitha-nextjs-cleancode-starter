/**
 * @file AuthController.ts
 * @description  Authentication controller
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-02-22
 * @module SignUp
 *
 * @remarks
 * @see /info.ts
 * 
 */

import { AuthenticationUsecases } from "@/core/use-cases/AuthenticationUsecases";
import { AuthService } from "@/infrastructure/services/AuthService";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { schema } from "@/interface-adapters/datamappers/schema";

export class AuthController{

    async signUp(email:string|undefined, password:string|undefined, rPassword:string|undefined){
      
      if (password != rPassword) {
        throw new Error("Retyped password missmatch");
      }
      
      const authenticationUsecases = new AuthenticationUsecases(new AuthService(new UserRepository()));
      const validatedCredentials = schema.parse({ email, password });
      try {
        authenticationUsecases.signUp(validatedCredentials.email.toLocaleLowerCase(), validatedCredentials.password);  
      } catch (error) {
        throw error
      }
      
    }
}