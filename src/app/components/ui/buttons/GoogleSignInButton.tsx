/**
 * File: GoogleSignIn.ts
 * Description: Google based SignIn
 * Author: Arun Gopi
 * Date: 2025-02-18
 */

"use client"
import { signIn } from "next-auth/react";

export default function GoogleSignInButton(){
    return (<button onClick={() => signIn('google')}>SignIn with Google</button>);
}