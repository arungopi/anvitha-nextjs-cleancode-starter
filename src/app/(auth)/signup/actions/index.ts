/**
 * @file index.ts
 * @description  Executes the action and returns the result
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-02-22
 * @module SignUp
 *
 * @remarks
 * @see
 *
 */

'use server'

import db from "@/infrastructure/prisma/client";
import { schema } from "@/interface-adapters/datamappers/schema";
import { executeAction } from "@/app/lib/executeAction";
import { sha256 } from "js-sha256";
import { hashPassword } from "@/infrastructure/utils/password";

export default async function signUpAction(formData: FormData) {
  await executeAction({
    actionFn: async () => {
      const email = formData.get('email');
      const password = formData.get('password');
      const rPassword = formData.get('rpassword')
      if (password != rPassword) {
        throw new Error("Retyped password missmatch")
      }
      const validatedCredentials = schema.parse({ email, password });
      const pwHash = await hashPassword(sha256(validatedCredentials.password))
      
      const user = await db.user.create({
        data: {
          email: validatedCredentials.email.toLocaleLowerCase(),
          password: pwHash
        }
      })

      console.log(user)

    },
    successMessage: "Signed up successfully"
  });

}