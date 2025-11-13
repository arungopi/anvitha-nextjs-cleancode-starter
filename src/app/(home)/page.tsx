/**
 * @file page.tsx
 * @description  Home page
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-13
 * @module Home
 * 
 * @remarks
 * @see https://mui.com/toolpad/core/introduction/
 * @see https://mui.com/toolpad/core/api/dashboard-layout/
 * @see https://mui.com/toolpad/core/react-dashboard-layout/
 * @see https://mui.com/material-ui/react-drawer/#dashboard-layout
 */

"use server"
/*import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import Link from 'next/link';*/

import AuthenticationCheck from '@/interface-adapters/auth/AuthenticationCheck';
import Dashboard from '../components/Dashboard';

async function Home() {
  
  await AuthenticationCheck.ensureLogin();

  return (
    <Dashboard></Dashboard>
  );
}

export default Home;
