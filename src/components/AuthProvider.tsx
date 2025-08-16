
'use client';

import { AuthProvider as FirebaseAuthProvider } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/toaster';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseAuthProvider>
        {children}
        <Toaster />
    </FirebaseAuthProvider>
  );
}
