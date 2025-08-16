import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { getSession } from '@/lib/session';

export const metadata: Metadata = {
  title: 'NoteWise - Learn Faster',
  description: 'An intelligent platform to accelerate your learning and retention.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user ?? null;

  return (
    <html lang="en" className="h-full dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <Providers user={user}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
