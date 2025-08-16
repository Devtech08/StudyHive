
'use client';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import type { User } from '@/lib/types';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { app } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/lib/session";


interface AuthContextType {
  user: User | null; // This is the user from our server-side session
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, serverSession }: { children: ReactNode; serverSession: { user: User } | null }) {
  // The `user` from the server session is the source of truth for roles and app-specific data.
  const [user, setUser] = useState<User | null>(serverSession?.user ?? null);
  
  // The `firebaseUser` is the direct user object from the Firebase SDK.
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      setUser(serverSession?.user ?? null)
      setLoading(false);
    });

    return () => unsubscribe();
  // We only want this to run once on mount, with the initial serverSession.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  
  const handleLogout = async () => {
    await signOut(auth);
    // The server-side session is cleared via a server action which will also handle the redirect.
  };

  if (loading) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background p-8">
            <div className="flex items-center h-16">
                <Skeleton className="h-8 w-32" />
                <div className="flex-1 flex justify-center gap-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <main className="flex-1 mt-8">
                 <Skeleton className="h-full w-full" />
            </main>
        </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
