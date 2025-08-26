
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { BookOpen, Target, TrendingUp, Bot, ArrowRight, Star, Menu } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { UserNav } from '@/components/UserNav';
import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const testimonials = [
  {
    name: 'Marina Mantey',
    role: 'University Student',
    avatar: 'https://picsum.photos/100/100',
    dataAiHint: 'woman portrait',
    quote:
      'StudyHive has been a total game-changer for my study routine. The AI revision prompts helped me ace my finals!',
  },
  {
    name: 'Prince Okumtey',
    role: 'High School Student',
    avatar: 'https://picsum.photos/100/100',
    dataAiHint: 'man portrait',
    quote:
      'I love the interactive quizzes. They make learning fun and I\'ve seen a huge improvement in my grades.',
  },
  {
    name: 'Serwa',
    role: 'Medical Student',
    avatar: 'https://picsum.photos/100/100',
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

const features = [
  {
    Icon: BookOpen,
    title: 'Structured Notes',
    description: 'Access well-organized course notes by subject and topic, tailored for effective learning.',
    href: '/features/structured-notes',
  },
  {
    Icon: Target,
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with engaging, timer-based assessments and solidify your understanding.',
    href: '/features/interactive-quizzes',
  },
  {
    Icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Visualize your learning journey with insightful analytics and stay motivated.',
    href: '/features/progress-tracking',
  },
  {
    Icon: Bot,
    title: 'AI Revision',
    description: 'Get personalized revision prompts from our AI to focus on your specific weak areas.',
    href: '/ai-revision',
  },
];


export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === '/';

  const loggedInNavLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    ...navLinks
  ];

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
                {!isHomepage && (
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Home
                    </Link>
                )}
                {(user ? loggedInNavLinks : navLinks).map((link) => (
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
            {!isHomepage && (
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                    Home
                </Link>
            )}
            {(user ? loggedInNavLinks : navLinks).map((link) => (
             pathname !== link.href && (
              <Link key={link.label} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            )
          ))}
        </nav>
        <div className="flex justify-end items-center gap-4 sm:gap-6 flex-1">
          <UserNav />
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center text-white">
          <Image
              src="https://picsum.photos/1200/800"
              alt="Students studying"
              fill
              className="object-cover -z-10"
              data-ai-hint="library students"
          />
          <div className="absolute inset-0 bg-black/60 -z-10" />
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4 max-w-2xl mx-auto text-center items-center">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold font-headline tracking-tighter sm:text-7xl xl:text-8xl/none">
                  Study Smarter, Not Harder
                </h1>
                <p className="text-lg text-white/80 max-w-[700px]">
                  Leverage the power of AI to ace your exams, understand complex topics, and collaborate with a community of students just like you.
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
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Your All-in-One Study Companion</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  StudyHive brings together everything you need in one place. Explore our features and discover a smarter way to learn.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-4 pt-12">
               {features.map((feature) => {
                const Icon = feature.Icon;
                return (
                  <div key={feature.title} className="flex flex-col items-center text-center gap-2">
                    <Icon className="h-10 w-10 text-primary mb-2" />
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground flex-grow">{feature.description}</p>
                    <Button variant="ghost" className="mt-2" asChild>
                      <Link href={feature.href}>Learn More</Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Join Thousands of Successful Students</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover why students like you love learning with StudyHive.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-12">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="flex flex-col">
                  <CardContent className="pt-6 flex-grow text-center">
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter className="pt-4 flex flex-col items-center gap-4">
                    <Avatar>
                       <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                       <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
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
          <p className="text-sm text-muted-foreground text-center">
            &copy; 2025 StudyHive. All rights reserved. Created by Dravok.
          </p>
        </div>
      </footer>
    </div>
  );
}
