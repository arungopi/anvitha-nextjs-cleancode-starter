/**
 * File: auth.ts
 * Description: NextAuth configuration for username/password and Github authentication
 * Author: Arun Gopi
 * Date: 2025-02-18
 * Refer : https://authjs.dev/getting-started/session-management/login
 */

import { signIn } from "@/infrastructure/auth/auth";
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/dashboard" })
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  )
}