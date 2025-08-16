

'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { BookOpen, Target, TrendingUp, Bot, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import FeatureCarousel from '@/components/FeatureCarousel';
import { UserNav } from '@/components/UserNav';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'University Student',
    avatar: 'https://i.pinimg.com/1200x/94/cb/c2/94cbc278269c859320b22b64ebfe70f8.jpg',
    dataAiHint: 'woman portrait',
    quote:
      'NoteWise has been a total game-changer for my study routine. The AI revision prompts helped me ace my finals!',
  },
  {
    name: 'Mike P.',
    role: 'High School Student',
    avatar: 'https://i.pinimg.com/736x/e5/45/ca/e545ca570256c9b8969b8fedb4c43b13.jpg',
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

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);
  
  if (loading || user) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
        <div className="flex-1 flex justify-start">
            <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium justify-center flex-1">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 flex justify-end items-center gap-4 sm:gap-6">
          <UserNav />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Your Learning Potential with NoteWise
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our intelligent platform helps you study smarter, not harder. Master subjects with organized notes, interactive quizzes, and AI-powered revision tools.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="group">
                    <Link href="/courses">
                      Start Learning Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://i.pinimg.com/736x/38/8c/48/388c48ca385328688540d0c42cf51abf.jpg"
                width="600"
                height="400"
                alt="A student studying with a laptop and books in a modern environment"
                data-ai-hint="modern learning"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
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
                  NoteWise provides a comprehensive suite of tools designed to enhance your study experience and boost your academic performance.
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
                  See how NoteWise is helping students achieve their academic goals.
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 NoteWise. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
