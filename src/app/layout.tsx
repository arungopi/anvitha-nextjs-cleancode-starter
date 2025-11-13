/**
 * @file layout.tsx
 * @description  Root layout
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-13
 * @module Home
 * @remarks
 * @see https://github.com/mui/toolpad/blob/master/examples/core/auth-nextjs/src/app/layout.tsx
 * 
 */

import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
//import "./globals.css"; conflicting with <AppRouterCacheProvider options={{ enableCssLayer: true }}>
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { SessionProvider } from 'next-auth/react';
import LinearProgress from '@mui/material/LinearProgress';
import { auth } from "@/interface-adapters/auth/auth";
import React from "react";

import { NextAppProvider } from '@toolpad/core/nextjs';
import type { Navigation } from "@toolpad/core/AppProvider";
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ListIcon from '@mui/icons-material/List';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NewLabelIcon from '@mui/icons-material/NewLabel';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { signIn, signOut } from 'next-auth/react';
import appConfig from './lib/appConfig';

import theme from './components/ui/theme/theme';

const AppLogo = (
  <Image
    src="/logo.png" // Path to your logo image
    alt="App Logo"
    width={38} // Adjust size as needed
    height={38} // Adjust size as needed
  />
);

const AUTHENTICATION = {
  signIn,
  signOut
}

/* MUI Dashboard configurations */
const BRANDING = {
  title: appConfig.title,
  logo: AppLogo
};

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '/',
    title: 'Home',
    icon: <HomeIcon />
  },
  {
    segment : 'dataset_manager',
    title: 'Manage',
    icon: <WarehouseIcon />,
    children: [
      {
        segment: 'dataset',
        title: 'List',
        icon: <ListIcon />,
      },
      {
        segment: 'dataset/add',
        title: 'Add',
        icon: <PlaylistAddIcon />,
      },
      {
        segment: 'dataset/entries',
        title: 'Entries',
        icon: <VisibilityIcon />,
        pattern: 'dataset_manager/dataset/:slug{/entries}*',
      }
    ]
  },
  /*{
    segment: 'datasets',
    title: 'Datasets',
    icon: <DatasetIcon />
  },*/
 /* {
    segment: 'text_tagger',
    title: 'Tagger',
    icon: <BorderColorIcon />,
    children: [
      {
        segment: 'ne_tag',
        title: 'NE Tagger',
        icon: <EditNoteIcon />,
        children: [
          {
            segment: 'add',
            title: 'Add',
            icon: <PlaylistAddIcon />,
          },
          {
            segment: 'list',
            title: 'List',
            icon: <ListIcon />,
          },
          {
            segment: 'list/entries',
            title: 'Entries',
            icon: <VisibilityIcon />,
            pattern: 'list/:slug{/entries}*',
          }
        ]
      },
      {
        segment: 'tagset',
        title: 'Manage TagSet',
        icon: <NewLabelIcon />,
        children: [
          {
            segment: 'listing',
            title: 'List',
            icon: <VisibilityIcon />,
          }
        ]
      }
    ]
  },
  */
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />
  },
  {
    segment: 'help',
    title: 'Help',
    icon: <HelpCenterIcon />
  },
  {
    segment: 'about',
    title: 'About',
    icon: <InfoIcon />
  }
];


/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  //const sidebarWidth = process.env.SIDEBAR_WIDTH;

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>

            <React.Suspense fallback={<LinearProgress />}>
              <NextAppProvider
                navigation={NAVIGATION}
                branding={BRANDING}
                authentication={AUTHENTICATION}
                session={session}
                theme={theme} >
                {children}</NextAppProvider>
            </React.Suspense>

          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
