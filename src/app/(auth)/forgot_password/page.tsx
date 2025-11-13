/**
 * @file page.tsx
 * @description  Forgot password
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-13
 * @module ForgotPassword
 *
 * @remarks
 *
 * @see
 * 
 */

'use client'
import React, { useState, FormEvent } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Alert,
    Link
} from '@mui/material';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        // Simulate sending a password reset email
        try {
            // In a real application, you would make an API call here
            console.log('Sending password reset email to:', email);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay
            setMessage('An email with instructions to reset your password has been sent to your email address.');
        } catch (err: unknown) {
            if(err instanceof Error){
                console.error('Error sending reset email:', err.message);
                setError('Failed to send password reset email. Please try again later.');
            }else{
                console.error('An unexpected error occured');
                setError('An unexpected error occured. Please try again later.');
            }
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </Button>
                    {message && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            {message}
                        </Alert>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link href="/signin" underline="hover">
                            Back to Login
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPasswordPage;