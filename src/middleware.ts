import { NextResponse, type NextRequest } from 'next/server';
import { getSession } from './lib/session';

const protectedRoutes = ['/dashboard', '/courses', '/quiz', '/revision', '/profile', '/leaderboard', '/my-courses'];
const authRoutes = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (session && session.user.role !== 'teacher' && pathname.startsWith('/my-courses')) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
