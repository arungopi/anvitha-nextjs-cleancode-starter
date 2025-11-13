/**
 * @file layout.tsx
 * @description  Home Layout
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-13
 * @module Home
 *
 * @remarks
 * 
 * @see https://mui.com/toolpad/core/api/dashboard-layout/
 *
 */
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebarWidth = process.env.SIDEBAR_WIDTH;
  return (
    <DashboardLayout sidebarExpandedWidth={sidebarWidth} defaultSidebarCollapsed><PageContainer>{children}</PageContainer></DashboardLayout>
  );
}