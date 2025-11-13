/**
 * @file LoginForm.tsx
 * @description  Login form
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-09
 * @module SignIn
 *
 * @remarks
 *
 * @see https://authjs.dev/getting-started/session-management/login
 * @see https://www.npmjs.com/package/react-hook-form
 * 
 */

"use client"
import { getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { sha256 } from "js-sha256";
import Button from '@mui/material/Button';
import { TextField, Container, Box, Typography, ButtonGroup, Divider, Link } from '@mui/material';
import LoginButton from "@/app/components/ui/buttons/LoginButton";

type Providers = Awaited<ReturnType<typeof getProviders>>;

const renderLoginButtons = (providers: Providers | null) => {
    return providers ? Object.values(providers)
        .filter((provider) => provider != null)
        .filter(({ id }) => id != 'credentials')
        .map((provider) => <LoginButton auth={provider} key={provider.id} />) : null;
}

const handleSubmitForm = (data: { email: string, password: string }) => {
    signIn("credentials", {
        email: data.email,
        password: sha256(data.password)
    }); // redirected to dashboard after signin
}

type LoginFormProps = {
    email: string,
    password: string
}

export default function LoginForm() {
    
    const [providers, setProviders] = useState<Providers | null>(null);
    const [appName, setAppName] = useState<string>();
    const [appDesc, setAppDesc] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormProps>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    }
    );

    useEffect(() => {
        setAppName(process.env.NEXT_PUBLIC_APP_NAME || 'NEXT_PUBLIC_APP_NAME empty');
        setAppDesc(process.env.NEXT_PUBLIC_APP_DESC || "NEXT_PUBLIC_APP_DESC empty");
        async function fetchProviders() {
            const providers = await getProviders();
            setProviders(providers);
        }
        fetchProviders();
    }, []);
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                alignItems: 'center',     // Center vertically
                minHeight: '100vh',       // Make the box at least the full height of the viewport
                width: '100%',            // Ensure it takes full width
                // You might want to add a background color here if it's not already set on the body
                // backgroundColor: 'background.default',
            }}
        >
            <Container maxWidth="sm">
                <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} sx={{
                    mt: 1,
                    p: 1, // Add padding inside the box
                    border: '1px solid  #ccc', // Add a border
                    // borderColor: 'divider', // Use theme's divider color for border
                    borderRadius: 2, // Add rounded corners
                    display: 'flex',
                    flexDirection: 'column', // Stack children vertically
                    alignItems: 'center', // Center content horizontally
                    // Add some margin-bottom if needed below the form box
                    // mb: 3,
                }}>
                    <Box
                        component="img"
                        src="logo.png" // <-- Your logo path here
                        alt="Company Logo"
                        sx={{
                            width: 80, // Adjust logo width as needed
                            height: 'auto', // Maintain aspect ratio
                            mb: 2, // Add margin below the logo
                        }}
                    >

                    </Box>

                    <Typography variant="h5" gutterBottom>
                        {appName}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {appDesc}
                    </Typography>

                    <Box sx={{ width: '80%', mb: 2 }}>
                        <Divider sx={{ marginBottom: 2 }} />
                        <div>

                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"

                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />

                        </div>
                        <div>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register("password", { required: "Password is required" })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />

                        </div>
                    </Box>
                    <Button variant="contained" type="submit">Sign In</Button>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" underline="hover">
                            Sign Up
                        </Link>
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Forgot password?{' '}
                        <Link href="/forgot_password" underline="hover">
                            Reset
                        </Link>
                    </Typography>

                </Box>
                <Box
                    sx={{
                        mt: 2,
                        p: 1, // Add padding inside the box
                        border: '1px solid  #ccc', // Add a border
                        // borderColor: 'divider', // Use theme's divider color for border
                        borderRadius: 2, // Add rounded corners
                        display: 'flex',
                        flexDirection: 'column', // Stack children vertically
                        alignItems: 'center', // Center content horizontally
                        // Add some margin-bottom if needed below the form box
                        // mb: 3,
                    }}
                >

                    {/* Add the Typography component as the "tile" */}
                    <Typography
                        variant="h6" // Use a suitable typography variant
                        component="p"      // Render it as a paragraph tag semantically
                        gutterBottom>
                        Sign In Using
                    </Typography>
                    <Box sx={{ width: '80%', mb: 2 }}>
                        <Divider /></Box>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="Vertical button group"
                        variant="outlined"
                    >
                        {renderLoginButtons(providers)}
                    </ButtonGroup>
                </Box>
            </Container>

        </Box>

    );
}