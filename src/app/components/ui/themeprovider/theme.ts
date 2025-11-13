'use client'; // Still needs to be a client module if using `createTheme` directly or accessing client-side features like system preference detection.

import { createTheme, PaletteMode } from '@mui/material';
import { Roboto } from 'next/font/google'; // Assuming you're still using this font

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Base theme settings that apply to both modes (e.g., typography, shape)
const baseThemeSettings = {
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};
 
// This function now simply creates a theme based on the given mode,
// relying on MUI's default palette for that mode.
export const getAppTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode, // Simply set the mode, MUI handles the rest of the default palette
    },
    ...baseThemeSettings, // Apply your common settings
  });
};