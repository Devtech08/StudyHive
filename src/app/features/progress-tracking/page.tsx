
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import Link from "next/link";
import { BarChart, CheckCircle, Percent, TrendingUp, Menu } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { getCourse } from '@/lib/courses';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/ai-revision', label: 'AI Revision' },
  { href: '/community', label: 'Community' },
  { href: '/leaderboard', label: 'Leaderboard' },
];

const chartData = [
  { name: "Biology", score: 88 },
  { name: "Algebra", score: 92 },
  { name: "History", score: 75 },
  { name: "Coding", score: 95 },
]

export default function ProgressTrackingPage() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const loggedInNavLinks = navLinks;
    
    const course = getCourse('science', 'biology-101');
    const calculateProgress = (course: any) => {
        if (!course || !course.modules || course.modules.length === 0) return 0;
        const totalTopics = course.modules.reduce((acc: number, module: any) => acc + (module.topics?.length || 0), 0);
        if (totalTopics === 0) return 0;
        const completedTopics = course.modules.reduce((acc: number, module: any) => {
            return acc + (module.topics?.filter((t: any) => t.completed).length || 0);
        }, 0);
        return Math.round((completedTopics / totalTopics) * 100);
    };
    const courseProgress = calculateProgress(course);


    return (
        <div className="flex flex-col min-h-screen animate-zoom-in">
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
                        <Link
                          href="/"
                          onClick={() => setOpen(false)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Home
                        </Link>
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
                    <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                        Home
                    </Link>
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
                <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center">
                    <Image
                        src="https://i.pinimg.com/736x/71/2e/49/712e49b12a6c2f98ba51afbd3520c038.jpg"
                        alt="A path through a sunlit forest representing a learning journey"
                        fill
                        className="object-cover -z-10"
                        data-ai-hint="forest path"
                    />
                    <div className="absolute inset-0 bg-black/70 -z-10" />
                    <div className="container px-4 md:px-6 text-white">
                        <div className="space-y-4 max-w-3xl mx-auto">
                            
                            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                                Visualize Your Learning Journey
                            </h1>
                            <p className="text-lg text-white/80">
                                See your progress in real-time with insightful analytics. Track course completion, quiz scores, and study streaks to stay motivated and on target.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/dashboard">
                                    View My Dashboard
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
                    <div className="container px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                             <div className="space-y-6 text-center md:text-left">
                                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-center">Data-Driven Motivation</h2>
                                <p className="text-muted-foreground text-lg text-center">
                                    StudyHive transforms your hard work into clear, visual data, helping you understand your strengths and identify areas for improvement.
                                </p>
                                <ul className="space-y-4 text-lg">
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><CheckCircle className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">Course Completion</h4>
                                            <p className="text-sm text-muted-foreground">Watch your progress bars fill up as you complete lessons and modules.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><Percent className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">Quiz Performance</h4>
                                            <p className="text-sm text-muted-foreground">Analyze your scores to see how you're performing in different subjects and topics.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><TrendingUp className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">Study Streaks</h4>
                                            <p className="text-sm text-muted-foreground">Build consistent habits by tracking your daily and weekly study activity.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 space-y-6">
                                <Card className="shadow-2xl">
                                    <CardHeader>
                                        <CardTitle>Course Progress</CardTitle>
                                        <CardDescription>{course?.title || 'Biology 101'}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                    {courseProgress > 0 ? (
                                        <>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm text-muted-foreground">Overall Progress</span>
                                                <span className="text-sm font-semibold">{courseProgress}%</span>
                                            </div>
                                            <Progress value={courseProgress} className="h-2" />
                                        </>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-4">You haven't started this course yet. Let's get learning!</p>
                                    )}
                                    </CardContent>
                                </Card>
                                 <Card className="shadow-2xl">
                                    <CardHeader>
                                        <CardTitle>Average Quiz Scores</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <RechartsBarChart data={chartData}>
                                                <XAxis
                                                dataKey="name"
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                />
                                                <YAxis
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `${value}%`}
                                                />
                                                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                            </RechartsBarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
