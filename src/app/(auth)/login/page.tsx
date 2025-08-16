
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { createSessionFromToken } from '@/lib/actions/auth';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth(app);
  const { toast } = useToast();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as 'student' | 'teacher';

    if (!email || !password || !role) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      const sessionResult = await createSessionFromToken(idToken, role);

      if (sessionResult.success) {
        toast({
            title: "Login Successful",
            description: "Welcome back!",
        });
        window.location.href = '/dashboard';
      } else {
        setError(sessionResult.error || 'Failed to create server session.');
      }

    } catch (error: any) {
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <Link href="/" className="mb-4">
          <Logo />
        </Link>
        <CardTitle className="text-2xl font-headline">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label>I am a...</Label>
            <RadioGroup defaultValue="student" name="role" className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="student" id="student" className="peer sr-only" />
                <Label
                  htmlFor="student"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Student
                </Label>
              </div>
              <div>
                <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                <Label
                  htmlFor="teacher"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Teacher
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
