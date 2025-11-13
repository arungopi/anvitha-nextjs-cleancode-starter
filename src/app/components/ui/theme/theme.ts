'use client';
import { createTheme, PaletteMode } from '@mui/material/styles';
//import getMPTheme from './custom/getMPTheme';
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


let mode : PaletteMode = 'light';

const lightTheme = createTheme({
    palette: {
      mode, // Simply set the mode, MUI handles the rest of the default palette
    },
    ...baseThemeSettings, // Apply your common settings
  });

  mode = 'dark';
const darkTheme = createTheme({
    palette: {
      mode, // Simply set the mode, MUI handles the rest of the default palette
    },
    ...baseThemeSettings, // Apply your common settings
  });

//const lightTheme = createTheme(getMPTheme('light'));
//const darkTheme = createTheme(getMPTheme('dark'));
;

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;