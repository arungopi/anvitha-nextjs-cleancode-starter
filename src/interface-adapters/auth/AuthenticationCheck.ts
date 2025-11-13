/**
 * @file authCheck.ts
 * @description  Authentication status
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-26
 * @module Authentication
 *
 * @remarks
 *
 * @see 
 * @see 
 * 
 */

import { auth } from "./auth";
import { redirect } from 'next/navigation';
import pageList from "../../app/lib/pageList";

export default class AuthenticationCheck {
  constructor() { }
  
  /**
   * Check whether authenticated
   * @returns 
   */
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  public static async isAuthenticated(): Promise<Object> {
    const session = await auth();
    if (!session?.user) {
      return { status: false, message: { message: 'Access denied, please login', errors: {}, status: 409 } };
    } else {
      // Authenticated
      return { status: true };
    }
  }

  /**
   * Checks for session and redirect to signin if not authenticated
   */
  public static async ensureLogin(): Promise<void> {
    const session = await auth();
    if (!session?.user) {
      redirect(pageList.auth.signin);
    }
  }
}