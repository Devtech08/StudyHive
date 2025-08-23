
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { ArrowRight, BarChart, BookCopy, Bot, CheckCircle, MessageSquare, Trophy, User, Zap, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth, useRequireAuth } from "@/hooks/use-auth";
import { subjects } from "@/lib/courses";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/DashboardHeader";

const recentActivity = {
    course: "Biology 101",
    progress: 65,
    subjectId: "science",
    courseId: "biology-101",
};

const leaderboardHighlights = [
    { rank: 1, name: 'QuantumLeaper', avatar: 'https://i.pinimg.com/736x/4a/18/4a/4a184a39b131b8c7a361a94125b2933d.jpg' },
    { rank: 2, name: 'BioNinja', avatar: 'https://i.pinimg.com/736x/9b/79/4d/9b794d0c8d197364f3319ed025516a50.jpg' },
    { rank: 3, name: 'HistoryBuff', avatar: 'https://i.pinimg.com/736x/1b/54/b4/1b54b4231f28b7e2182b8a4a584c31e4.jpg' },
];

const communityHighlights = [
    { id: 1, title: "Struggling with Quantum Physics concepts. Any advice?", replies: 12 },
    { id: 2, title: "Best resources for learning calculus?", replies: 8 },
];

export default function DashboardPage() {
    useRequireAuth();
    const { user } = useAuth();
    const firstCourse = subjects.flatMap(s => s.courses).find(c => c.progress > 0);

    if (!user) {
        return null; // or a loading skeleton
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/40 animate-zoom-in">
            <DashboardHeader />
            <main className="flex-1 p-4 md:p-8 lg:p-12">
                <div className="container mx-auto">
                    <header className="mb-12">
                        <h1 className="text-4xl font-bold font-headline">
                            Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'scholar'}!
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Ready to continue your learning journey? Let's pick up where you left off.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Continue Learning */}
                            {firstCourse && (
                                <Card className="bg-gradient-to-br from-primary/10 to-transparent">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>Continue Where You Left Off</CardTitle>
                                            <CardDescription>You're making great progress in {firstCourse.title}.</CardDescription>
                                        </div>
                                        <Button asChild>
                                            <Link href={`/courses/${firstCourse.subjectId}/${firstCourse.id}`}>
                                                Resume Course <ArrowRight className="w-4 h-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-sm text-muted-foreground">Overall Progress</span>
                                          <span className="text-sm font-semibold">{firstCourse.progress}%</span>
                                        </div>
                                        <Progress value={firstCourse.progress} className="h-2" />
                                    </CardContent>
                                </Card>
                            )}

                            {/* Quick Actions */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardHeader className="text-center md:text-left">
                                        <CardTitle className="flex items-center gap-3 justify-center md:justify-start">
                                            <Bot className="w-6 h-6 text-primary" />
                                            AI Revision Studio
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm mb-4">Sharpen your knowledge with personalized quizzes and study plans.</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href="/ai-revision">Launch AI Revision</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                                 <Card className="hover:shadow-md transition-shadow">
                                     <CardHeader className="text-center md:text-left">
                                        <CardTitle className="flex items-center gap-3 justify-center md:justify-start">
                                            <Zap className="w-6 h-6 text-primary" />
                                            Start a Challenge
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm mb-4">Test your skills with a timed quiz and climb the leaderboard.</p>
                                    </CardContent>
                                    <CardFooter>
                                         <Button variant="outline" className="w-full" asChild>
                                            <Link href="/ai-revision">Take a Challenge</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>

                             {/* Community Highlights */}
                            <Card>
                                <CardHeader className="text-center md:text-left">
                                    <CardTitle>Hot in the Community</CardTitle>
                                    <CardDescription>Join the conversation with your peers.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                {communityHighlights.map(thread => (
                                    <Link href="/community" key={thread.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted">
                                        <p className="font-medium">{thread.title}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MessageSquare className="w-4 h-4"/>
                                            {thread.replies}
                                        </div>
                                    </Link>
                                ))}
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Sidebar */}
                        <aside className="space-y-8">
                             {/* My Courses */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Courses</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {subjects.flatMap(s => s.courses).filter(c => c.progress > 0).slice(0, 3).map(course => (
                                        <Link href={`/courses/${course.subjectId}/${course.id}`} key={course.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
                                            <BookCopy className="w-5 h-5 text-muted-foreground" />
                                            <div className="flex-grow">
                                                <p className="font-semibold leading-tight">{course.title}</p>
                                                <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
                                            </div>
                                        </Link>
                                    ))}
                                     <Button variant="outline" className="w-full" asChild>
                                        <Link href="/courses">View All Courses</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                            {/* Leaderboard */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Leaderboard Snapshot</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {leaderboardHighlights.map(user => (
                                        <div key={user.rank} className="flex items-center gap-4">
                                            <span className="font-bold text-lg w-6">{user.rank}</span>
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-medium">{user.name}</p>
                                        </div>
                                    ))}
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href="/leaderboard">View Full Leaderboard</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    )
}

// Add subjectId to course type
declare module '@/lib/courses' {
    interface Course {
        subjectId: string;
    }
}

// Modify the original data to include subjectId
subjects.forEach(subject => {
    subject.courses.forEach(course => {
        (course as any).subjectId = subject.id;
    });
});
