
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { BookOpen, Target, TrendingUp, Bot, ArrowRight, Star, Menu } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import FeatureCarousel from '@/components/FeatureCarousel';
import { UserNav } from '@/components/UserNav';
import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'University Student',
    avatar: 'https://i.pinimg.com/1200x/94/cb/c2/94cbc278269c859320b22b64ebfe70f8.jpg',
    dataAiHint: 'woman portrait',
    quote:
      'StudyHive has been a total game-changer for my study routine. The AI revision prompts helped me ace my finals!',
  },
  {
    name: 'Mike P.',
    role: 'High School Student',
    avatar: 'https://i.pinimg.com/736x/e5/45/ca/e545ca570256c9b88969b8fedb4c43b13.jpg',
    dataAiHint: 'man portrait',
    quote:
      'I love the interactive quizzes. They make learning fun and I\'ve seen a huge improvement in my grades.',
  },
  {
    name: 'Emily R.',
    role: 'Medical Student',
    avatar: 'https://i.pinimg.com/736x/e5/39/49/e5394915262d78aacd2ee18562dae9d3.jpg',
    dataAiHint: 'woman portrait',
    quote:
      'The ability to see my progress visually is incredibly motivating. It keeps me on track and focused on my goals.',
  },
];

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/ai-revision', label: 'AI Revision' },
  { href: '/community', label: 'Community' },
  { href: '/leaderboard', label: 'Leaderboard' },
];


export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();


  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <Logo />
                {navLinks.map((link) => (
                  pathname !== link.href && (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
             pathname !== link.href && (
              <Link key={link.label} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            )
          ))}
        </nav>
        <div className="flex justify-end items-center gap-4 sm:gap-6">
          <UserNav />
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center text-white">
          <Image
              src="https://placehold.co/1920x1080.png"
              alt="Students studying"
              fill
              className="object-cover -z-10"
              data-ai-hint="library students"
          />
          <div className="absolute inset-0 bg-black/60 -z-10" />
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4 max-w-2xl text-center items-center">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold font-headline tracking-tighter sm:text-7xl xl:text-8xl/none">
                  Unlock Your Learning Potential
                </h1>
                <p className="text-lg text-white/80 max-w-[700px]">
                  StudyHive is an intelligent, AI-powered learning platform designed to help you study more effectively, retain information better, and collaborate with a community of learners.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="group" asChild>
                    <Link href="/register">
                      Get Started for Free
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
                 <Button size="lg" variant="secondary">
                    Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  StudyHive provides a comprehensive suite of tools designed to enhance your study experience and boost your academic performance.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-7xl pt-12">
              <FeatureCarousel />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Success Stories</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Join Thousands of Successful Students</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how StudyHive is helping students achieve their academic goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-12">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="flex flex-col">
                  <CardContent className="pt-6 flex-grow">
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter className="pt-4 flex items-center gap-4">
                    <Avatar>
                       <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                       <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t bg-muted/40">
        <div className="container px-4 md:px-6 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 StudyHive. All rights reserved. Created by Dravok.
          </p>
        </div>
      </footer>
    </div>
  );
}
