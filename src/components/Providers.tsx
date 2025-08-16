
'use client';

import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import type { User } from '@/lib/types';

export function Providers({ children, serverSession }: { children: React.ReactNode, serverSession: { user: User } | null }) {
  return (
    <AuthProvider serverSession={serverSession}>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
