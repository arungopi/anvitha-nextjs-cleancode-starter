/**
 * @file page.tsx
 * @description  Help
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-10-15
 * @module Help
 *
 */
'use server'
//import { isAuthenticated } from "@/app/lib/authCheck";
//import { redirect } from "next/navigation";
import { Box, Paper, Typography, Divider, Link as MuiLink } from '@mui/material';
import { BookOutlined, GroupOutlined, BugReportOutlined, HelpOutline } from '@mui/icons-material';

// Define the common styles for the clickable link boxes
const linkBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 2, // Spacing between icon and text
    p: 2, // Padding inside the link box
    mb: 1, // Margin below the link box
    borderRadius: 1, // Slight rounding of corners
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: 'action.hover', // MUI theme color for hover state
        textDecoration: 'none', // Prevent underline on hover from MuiLink
        cursor: 'pointer',
    },
};

export default async function Page() {
    /* // Authentication check (uncomment when needed)
        const response = await isAuthenticated();
        if (!response.status) {
            redirect(`/signin?callbackUrl=${encodeURIComponent('/dataset_manager/dataset/list')}`);
        }
    */

    return (
        <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800, mx: 'auto' }}>
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
                    Anvitha Framework Support & Resources 🛠️
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                    Find the guides, community help, and issue tracking you need to build faster with Anvitha.
                </Typography>

                <Divider sx={{ mb: 4 }} />

                {/* === Section: Documentation & Learning === */}
                <Typography variant="h5" component="h2" gutterBottom>
                    Official Documentation & Guides
                </Typography>

                <MuiLink href="/docs/getting-started" underline="none" color="inherit">
                    <Box sx={linkBoxStyles}>
                        <BookOutlined color="info" />
                        <Box>
                            <Typography variant="h6">Getting Started Guide & APIs</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Detailed documentation covering installation, core principles, component composition, and Next.js integration.
                            </Typography>
                        </Box>
                    </Box>
                </MuiLink>

                <MuiLink href="/docs/clean-code-patterns" underline="none" color="inherit">
                    <Box sx={linkBoxStyles}>
                        <HelpOutline color="warning" />
                        <Box>
                            <Typography variant="h6">Clean Code & Architecture Patterns</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Best practices and recommended structures for ensuring high maintainability and code quality with Anvitha.
                            </Typography>
                        </Box>
                    </Box>
                </MuiLink>

                {/* === Section: Community & Issues === */}
                <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                    Community and Development Feedback
                </Typography>
                <Typography variant="body1" paragraph>
                    Engage with other Anvitha developers, ask questions, or contribute to the framework's continued improvement.
                </Typography>

                <MuiLink href="https://github.com/anvitha/issues" target="_blank" underline="none" color="inherit">
                    <Box sx={linkBoxStyles}>
                        <BugReportOutlined color="error" />
                        <Box>
                            <Typography variant="h6">Report a Bug or Submit a Feature Request</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Use the official GitHub Issue Tracker to report bugs or propose new features for the next release.
                            </Typography>
                        </Box>
                    </Box>
                </MuiLink>

                <MuiLink href="https://discord.gg/anvitha-dev" target="_blank" underline="none" color="inherit">
                    <Box sx={linkBoxStyles}>
                        <GroupOutlined color="success" />
                        <Box>
                            <Typography variant="h6">Join the Anvitha Dev Community</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Connect with the core team and other developers for real-time help and discussions on Discord.
                            </Typography>
                        </Box>
                    </Box>
                </MuiLink>

                <Divider sx={{ mt: 4, mb: 2 }} />

                <Typography variant="body2" align="center" color="text.secondary">
                    Anvitha Framework v1.0.0 | Built with Next.js and MUI
                </Typography>

            </Paper>
        </Box>
    );
}