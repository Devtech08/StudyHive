
'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSession, deleteSession } from '../session';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['student', 'teacher'], {
    errorMap: () => ({ message: 'Please select a role.' }),
  }),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['student', 'teacher'], {
    errorMap: () => ({ message: 'Please select a role.' }),
  }),
});

// This action is now a placeholder as Firebase handles client-side auth.
// The server-side session is created via a route handler after Firebase login.
export async function login(prevState: any, formData: FormData) {
  // This logic is now primarily handled on the client with Firebase.
  // The server session will be created via a separate API route.
  // We keep this structure for progressive enhancement if needed.
  return {
    error: 'Complete login through the form.',
  };
}

export async function signup(prevState: any, formData: FormData) {
  // This logic is now primarily handled on the client with Firebase.
  return {
    error: 'Complete signup through the form.',
  };
}

export async function createSessionFromToken(token: string, role: 'student' | 'teacher') {
    try {
        // The API key must be present for this call to succeed.
        const apiKey = process.env.FIREBASE_API_KEY;
        if (!apiKey) {
            throw new Error('Firebase API Key is not configured on the server.');
        }

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: token })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Firebase token verification failed:', errorData);
            throw new Error('Failed to verify token with Firebase.');
        }

        const data = await response.json();
        const user = data.users[0];
        
        if (user) {
            await createSession({ email: user.email, role: role, uid: user.localId });
        } else {
          throw new Error('User not found in Firebase response.');
        }

    } catch (error) {
        console.error('Session creation failed:', error);
        // Do not redirect on error, let the client handle it.
        // We can't return an error message here because the client is doing a full page redirect anyway.
        // The user will just stay on the login page.
        return;
    }
    
    // This server-side redirect is the most reliable way to navigate after a session is created.
    redirect('/dashboard');
}


export async function logout() {
  await deleteSession();
  revalidatePath('/', 'layout');
  redirect('/login');
}
