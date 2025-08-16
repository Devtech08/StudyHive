
'use server';
import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import type { User } from './types';

const secretKey = process.env.SESSION_SECRET || 'fallback-secret-for-development';
const key = new TextEncoder().encode(secretKey);
const cookieName = 'session';

interface SessionPayload extends JWTPayload {
  user: User;
  expires: Date;
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // 1 day
    .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify<SessionPayload>(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // This is expected if the token is invalid or expired
    console.log('Failed to verify session:', (error as Error).message);
    return null;
  }
}

export async function createSession(user: User) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expires in 24 hours
  const sessionPayload: SessionPayload = { user, expires };
  const session = await encrypt(sessionPayload);

  cookies().set(cookieName, session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

export async function getSession() {
  const cookie = cookies().get(cookieName)?.value;
  if (!cookie) return null;
  
  const session = await decrypt(cookie);
  if (!session) return null;

  // Check if session is expired
  if (new Date(session.expires) < new Date()) {
    // The session has expired
    return null;
  }
  
  return session;
}

export async function deleteSession() {
  cookies().delete(cookieName);
}
