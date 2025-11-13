/**
 * @file route.ts
 * @description  API route api/auth
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-02-18
 * @module Route
 * @remarks
 * @see https://nextjs.org/blog/building-apis-with-nextjs
 * @see https://nextjs.org/docs/app/building-your-application/deploying
 * 
 */

import { handlers } from "@/interface-adapters/auth/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;