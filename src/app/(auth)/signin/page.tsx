/**
 * @file page.tsx
 * @description  Signin form
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-09
 * @module SignIn
 *
 * @remarks
 *
 */

"use client"

import LoginForm from "@/app/components/LoginForm";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
    // gets session from client.This works only of parent component is wrapped with SessionProvider.
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isCheckingSession, setIsCheckingSession] = useState(true)

    useEffect(() => {

        if(status == 'loading'){
            setIsCheckingSession(true);
            return;
        }

        setIsCheckingSession(false);
        if(session){
            router.push('/');
        }
    }, [session, status, router]);

    if(isCheckingSession){
        return (<div>Please wait..</div>);
    }

    return (<div>
        <LoginForm />
    </div>);
}