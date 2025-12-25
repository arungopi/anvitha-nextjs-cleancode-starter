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
import { executeAction } from "@/app/lib/executeAction";


import { AuthController } from "@/interface-adapters/controllers/AuthController";

export default async function signUpAction(formData: FormData) {
  await executeAction({
    actionFn: async () => {
      const email = formData.get('email')?.toString();
      const password = formData.get('password')?.toString();
      const rPassword = formData.get('rpassword')?.toString();
      const authController = new AuthController();
      authController.signUp(email, password, rPassword);
    },
    successMessage: "Signed up successfully"
  });

}