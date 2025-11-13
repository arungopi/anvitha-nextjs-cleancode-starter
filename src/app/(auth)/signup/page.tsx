/**
 * @file page.tsx
 * @description  Signup form
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-02-22
 * @module SignUp
 *
 * @remarks
 *
 */

import { auth } from "@/interface-adapters/auth/auth";
import { redirect } from "next/navigation";
import signUpAction from "./actions";
import { TextField, Button, Stack, Box, Typography, Divider, Link } from '@mui/material';
import Image from 'next/image';

const Page = async () => {

  const session = await auth();
  if (session)
    redirect('/');
  return (<Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Make the container take at least the full viewport height

    }}
  >
    <Box
      sx={{
        padding: 4,
        border: '1px solid #ccc',
        borderRadius: 2,

        maxWidth: 400, // Adjust as needed
        width: '90%', // Make it responsive
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <Image
          src="/logo.png"
          alt="Your Logo"
          height={80}
          width={80}
        />
      </Box>
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <form action={signUpAction}>
        <Stack spacing={2}>
          <TextField
            label="E-mail"
            name="email"
            placeholder="e-mail"
            autoComplete="email"
            type="email"
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            placeholder="password"
            autoComplete="new-password"
            type="password"
            required
            fullWidth
          />
          <TextField
            label="Retype Password"
            name="rpassword"
            placeholder="password"
            type="password"
            required
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link href="/signin" underline="hover">
              Sign In
            </Link>
          </Typography>
        </Stack>
      </form>
    </Box>
  </Box>);
}

export default Page;