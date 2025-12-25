/**
 * File: schema.ts
 * Description: Validation of form data
 * Author: Arun Gopi
 * Date: 2025-04-23
 */

import { z } from "zod";

const schema = z.object({
  email: z.string().email().nonempty("Email is required"),
  password: z.string().min(1, "Password is required"),
  role: z.string().transform((value) => {
      const num = Number(value); // Convert string to number
      if (isNaN(num)) {
        throw new Error("Role must be a valid number"); 
      }
      return num; 
    }),
});

type Schema = z.infer<typeof schema>;

export { schema, type Schema };

/* TODO Server side validation

import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

*/