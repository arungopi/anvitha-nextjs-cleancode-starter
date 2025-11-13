/**
 * @file WithAuth.tsx
 * @description  Checks authentication for client components. It uses High Order Component(HOC) design pattern
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-07-11
 * @module Auth
 * 
 * @remarks
 * @see 
 */

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { ComponentType } from 'react';
import pageList from '@/app/lib/pageList';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const withAuth = <T extends {}>(
  WrappedComponent: ComponentType<T>
) => {
  const AuthenticatedComponent = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (!session) {
      router.push(pageList.auth.signin);
      return <div>Redirecting...</div>;
    }

    return <WrappedComponent {...({} as T)} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
