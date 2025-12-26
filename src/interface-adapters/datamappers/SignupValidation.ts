/**
 * File: schema.ts
 * Description: Validation of form data
 * Author: Arun Gopi
 * Date: 2025-12-26
 */

import { z } from "zod";

const schema = z.object({
    email: z.string().email().nonempty("Email is required"),
    password: z.string().min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});

type Schema = z.infer<typeof schema>;

export { schema, type Schema };

