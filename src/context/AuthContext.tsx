
'use client';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import type { User } from '@/lib/types';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { app } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, serverSession }: { children: ReactNode; serverSession: { user: User } | null }) {
  const [user, setUser] = useState<User | null>(serverSession?.user ?? null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // When Firebase auth state changes on the client, we trust the `serverSession` prop
        // that was initially passed from a Server Component. If a re-sync is needed,
        // it should happen on a page navigation, not by calling a server action here.
        if (serverSession?.user) {
            setUser(serverSession.user);
        }
      } else {
        // If Firebase user is null, clear the client-side user state.
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, serverSession]);
  
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setFirebaseUser(null);
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
