'use client';

import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import type { User } from '@/lib/types';

export function Providers({ children, user }: { children: React.ReactNode, user: User | null }) {
  return (
    <AuthProvider user={user}>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
