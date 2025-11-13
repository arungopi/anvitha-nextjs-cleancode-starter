/**
 * @file page.tsx
 * @description  Settings
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-10-15
 * @module Help
 *
 */

//import { isAuthenticated } from "@/app/lib/authCheck";
//import { redirect } from "next/navigation";
import { Box, Paper, Typography, Divider } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

export default function Page() {
    /*
        const response = await isAuthenticated();
        if (!response.status) {
            // FIXME :  Not rerouting to this after signin
            redirect(`/signin?callbackUrl=${encodeURIComponent('/dataset_manager/dataset/list')}`);
            //redirect('/home');
        }
    */

    return ( <Box 
            // 1. Remove maxWidth.
            // 2. Set width to 100% of the viewport width (100vw).
            sx={{ 
                p: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                // Removed maxWidth: 600, mx: 'auto'
                width: '100vw', // Sets box width to the full browser width
                mx: 0, // Ensure no horizontal margin pulls it in
            }}
        >
            <Paper
                elevation={1}
                // The Paper inside will automatically stretch to 100% of the Box's width (100vw).
                sx={{
                    p: { xs: 2, sm: 3 },
                    width: '100%', 
                    // To visually contain the inner content, you can set a max-width on the paper
                    // or let the content stretch fully. We'll let it stretch for max width effect.
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Application Settings <SettingsOutlined sx={{ ml: 1 }} />
                </Typography>
                <Typography variant="subtitle2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                    Configure preferences here.
                </Typography>
                
                <Divider sx={{ mb: 3 }} />

                {/* Content Placeholder */}
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        This section is currently empty, but the container fills the full browser width.
                    </Typography>
                </Box>
            </Paper>
        </Box>);
}