
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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { createSessionFromToken } from '@/lib/actions/auth';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  role: z.enum(['student', 'teacher']),
});

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<z.ZodError['formErrors']['fieldErrors'] | null>(null);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth(app);
  const { toast } = useToast();

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrors(null);
    setFirebaseError(null);

    const formData = new FormData(event.currentTarget);
    const signupData = {
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
    };

    const validationResult = signupSchema.safeParse(signupData);

    if (!validationResult.success) {
      setErrors(validationResult.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }
    
    const { email, password, role } = validationResult.data;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
       toast({
           title: "Account Created",
           description: "Redirecting to your dashboard...",
       });
       
       // The server action will handle the redirect.
       await createSessionFromToken(idToken, role);


    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            setFirebaseError('This email is already registered. Please login instead.');
        } else {
            setFirebaseError('An unexpected error occurred. Please try again.');
            console.error(error);
        }
    } finally {
      // Don't set loading to false, as the page should be redirecting.
      // If it fails, the error message will be shown.
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <Link href="/" className="mb-4">
         <Logo />
        </Link>
        <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="grid gap-4">
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
            {errors?.email && (
              <p className="text-sm font-medium text-destructive">{errors.email[0]}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
             {errors?.password && (
              <p className="text-sm font-medium text-destructive">{errors.password[0]}</p>
            )}
          </div>
            {firebaseError && (
              <p className="text-sm font-medium text-destructive">{firebaseError}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create an account'}
            </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
