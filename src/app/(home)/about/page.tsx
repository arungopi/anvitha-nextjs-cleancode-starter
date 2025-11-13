/**
 * @file page.tsx
 * @description  About
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-10-15
 * @module About
 *
 */
'use server'
//import { isAuthenticated } from "@/app/lib/authCheck";
//import { redirect } from "next/navigation";
import { Box, Paper, Typography, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { LightbulbOutlined, SettingsInputComponentOutlined, PsychologyOutlined, CodeOutlined } from '@mui/icons-material';

export default async function Page() {
    /*
        const response = await isAuthenticated();
        if (!response.status) {
            // FIXME :  Not rerouting to this after signin
            redirect(`/signin?callbackUrl=${encodeURIComponent('/dataset_manager/dataset/list')}`);
            //redirect('/home');
        }
    */

    return (<Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800, mx: 'auto' }}>
        <Paper
            elevation={6} // Shadow depth
            sx={{
                p: { xs: 2, sm: 4 }, // Responsive padding
                m: 2,
                width: '100%',
                mx: 'auto', // Centers the paper
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                About the Anvitha Web Framework ✨
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                The framework for building scalable, maintainable, and composition-focused React applications.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            {/* === Section: Foundation & Meaning === */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 2 }}>
                Our Core Philosophy: Structure and Connection
            </Typography>
            <Typography variant="body1" paragraph>
                <strong>Anvitha</strong> (Sanskrit: अन्वित, meaning "joined, connected, composed") is a modern, opinionated full-stack framework designed to eliminate boilerplate and enforce best practices from the start. We integrate the <strong>power of Next.js</strong> for performance and routing with the <strong>aesthetic and component library of MUI</strong> to ensure your application is fast, beautiful, and inherently scalable.
            </Typography>

            {/* === Section: Key Framework Capabilities === */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                Pillars of the Anvitha Architecture
            </Typography>

            <List>
                <ListItem disablePadding>
                    <ListItemIcon><SettingsInputComponentOutlined color="info" /></ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Next.js Performance & Composition</Typography>}
                        secondary="Leverages Next.js features like server-side rendering (SSR), static site generation (SSG), and API routes to deliver optimal speed, SEO, and robust backend capabilities."
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon><CodeOutlined color="success" /></ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Clean Code & Design Patterns</Typography>}
                        secondary="Mandates a structured approach to development, encouraging practices like separation of concerns, single responsibility principle, and test-driven development (TDD) for long-term maintainability."
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon><PsychologyOutlined color="warning" /></ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Opinionated MUI Theming & Components</Typography>}
                        secondary="Pre-configured with a modular Material UI (MUI) setup, providing high-quality, responsive components and a streamlined theming system right out of the box."
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon><LightbulbOutlined color="primary" /></ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Simplified State Management</Typography>}
                        secondary="Offers built-in, convention-based tools for handling complex application state, reducing the need for heavy external libraries and minimizing the learning curve."
                    />
                </ListItem>
            </List>

            <Divider sx={{ mt: 4, mb: 4 }} />

            {/* === Section: Target Audience === */}
            <Typography variant="body2" align="center" sx={{ fontStyle: 'italic' }}>
                Anvitha is built for developers and teams who prioritize <strong>Clean Architecture</strong>, seek rapid development with <strong>Next.js</strong>, and demand a beautiful, accessible user interface using <strong>MUI</strong>.
            </Typography>

        </Paper>
    </Box>);
}