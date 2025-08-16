'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSession, deleteSession } from '../session';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password.',
    };
  }
  
  const { email } = validatedFields.data;

  // In a real app, you'd validate the password against a database hash.
  // Here, we'll just create a session for any valid email.
  await createSession({ email });
  
  redirect('/dashboard');
}

export async function signup(prevState: any, formData: FormData) {
  const validatedFields = signupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  // In a real app, you would save the new user to the database.
  // For this demo, we'll just create a session.
  await createSession({ email });

  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
