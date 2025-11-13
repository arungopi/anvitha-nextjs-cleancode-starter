/**
 * @file LoginButton.tsx
 * @description  Login button component renders buttons from providers or from custom login from client side
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-09
 * @module LoginButton
 *
 * @remarks
 *
 */

"use client"

import { signIn } from "next-auth/react";
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import SvgIcon from '@mui/material/SvgIcon';

type ClientSafeProvider = {
    id: string,
    name: string,
    type: string,
    signinUrl: string,
    callbackUrl: string
}

const ProviderIcon = ({ provider }: { provider: string }) => {
    if (provider == "Google") {
        return <GoogleIcon></GoogleIcon>;
    } else if (provider == "GitHub") {
        return <GitHubIcon></GitHubIcon>;
    } else if (provider == "Auth0") {
        return <SvgIcon >
            <image href="images/icons/auth0.svg" height="100%" width="100%" />
        </SvgIcon>;
    } else {
        return <SvgIcon >
            <image href="images/icons/auth0.svg" height="100%" width="100%" />
        </SvgIcon>;
    }
}

export default function LoginButton({ auth, }: { auth: ClientSafeProvider }) {
    //console.log("Authentiction : ", auth);
    return (
        <Button variant="contained" onClick={() => signIn(auth?.id as string)} startIcon={<ProviderIcon provider={auth.name as string} />}>
            {auth ? <div> {auth.name as string}</div> : "Credential Login"}
        </Button>
    );
}