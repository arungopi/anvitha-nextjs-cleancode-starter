/**
 * @file MuiThemeProvider.tsx
 * @description Provides the Material UI theme context and global baseline styles to the application.
 * This component is a Client Component specifically designed for integration into a
 * Next.js `app` directory layout (like `layout.tsx`).
 * It wraps the application's content (`children`) with the configured MUI ThemeProvider and CssBaseline,
 * enabling MUI components within the Server Component tree to access the theme.
 * @copyright Copyright (c) 2025 Arun Gopi // Add your copyright notice here
 * @author Arun Gopi // Replace with your actual name or team
 * @date 2025-05-09
 * @module MuiThemeProvider
 *
 * @remarks
 *
 * @see https://mui.com/material-ui/react-theming/
 * @see https://nextjs.org/docs/app/building-your-application/rendering/client-components
 */

"use client"

import { ThemeProvider, PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { getAppTheme } from "./theme";
import React from "react";

// Define the shape of your theme context
interface ThemeContextType {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
// Custom hook to use the theme context
export const useAppTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useAppTheme must be used within MuiThemeProvider');
    }
    return context;
};

/*
// You can define your theme here or import it from a separate file
const darkTheme = createTheme({
    /*  palette: {
          mode: 'dark', // Set the mode to 'dark' for a dark theme
          // You can add more customizations here, like primary/secondary colors,
          // typography, component styles, etc.
          // primary: { main: '#90caf9' }, // Example primary color for dark mode
      },*//*
cssVariables: {
colorSchemeSelector: 'data-toolpad-color-scheme',
},
colorSchemes: { light: true, dark: true },
breakpoints: {
values: {
xs: 0,
sm: 600,
md: 600,
lg: 1200,
xl: 1536,
},
},
// Add other theme customizations if needed
});
*/

export default function MuiThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
    const [mode, setMode] = useState<PaletteMode>(() => {
        if (typeof window !== 'undefined') {
            const storedMode = localStorage.getItem('mui-theme-mode') as PaletteMode;
            return storedMode || 'light'; // Default to light if no preference is stored
        }
        return 'light'; // Default for SSR
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // 2. useEffect to read localStorage and update state on client-side mount
    // This runs ONLY on the client after initial hydration.
    useEffect(() => {
        const storedMode = localStorage.getItem('mui-theme-mode') as PaletteMode;
        if (storedMode && storedMode !== mode) { // Only update if it's different from the default
            setMode(storedMode);
        }
        // Optional: detect system preference initially
        // const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // if (!storedMode && prefersDarkMode && mode !== 'dark') {
        //   setMode('dark');
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array means it runs once on mount

    useEffect(() => {
        localStorage.setItem('mui-theme-mode', mode);
    }, [mode]);

    const toggleColorMode = React.useCallback(() => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }, []);

    const theme = useMemo(() => getAppTheme(mode), [mode]);





    // For handling hydration error
    if (!mounted) {
        return null; // Render children without ThemeProvider during SSR
    }

    return (
        <ThemeContext.Provider value={{ mode, toggleColorMode }}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>

    );
}

