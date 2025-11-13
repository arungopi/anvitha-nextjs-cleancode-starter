/**
 * File: auth.ts
 * Description: NextAuth configuration for username/password and Github authentication
 * Author: Arun Gopi
 * Date: 2025-02-18
 * Refer : https://authjs.dev/getting-started/session-management/login
 */

import { signOut } from "@/infrastructure/auth/auth";
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}