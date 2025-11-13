/**
 * File: GithubSignIn.ts
 * Description: Github based SignIn
 * Author: Arun Gopi
 * Date: 2025-02-18
 */

"use client"
import { signIn } from "next-auth/react";

export default function GithubSignInButton(){
    return (<button onClick={() => signIn('github')}>SignIn with Github</button>);
}