'use client';

import Link from 'next/link';
import { ArrowUp, BookOpen, Bot, Target } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProgressChart from '@/components/dashboard/ProgressChart';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const userName = user?.email.split('@')[0] || 'Student';

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Overall Accuracy</CardDescription>
              <CardTitle className="text-4xl font-bold">82%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +5% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Quizzes Completed</CardDescription>
              <CardTitle className="text-4xl font-bold">12</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +2 from last week
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Study Streak</CardDescription>
              <CardTitle className="text-4xl font-bold">5 days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Keep it up!
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Topics Mastered</CardDescription>
              <CardTitle className="text-4xl font-bold">3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                New: Algebra
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Progress Overview</CardTitle>
            <CardDescription>
              Your performance across different subjects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg font-headline">
                Welcome back, {userName}!
              </CardTitle>
              <CardDescription>
                Ready to continue your learning journey?
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Your Next Steps</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Continue with Mathematics
                  </span>
                  <Link href="/courses/mathematics">
                    <Button variant="outline" size="sm">
                       <BookOpen className="mr-2 h-4 w-4" />
                       View Course
                    </Button>
                  </Link>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Take a daily quiz</span>
                   <Link href="/quiz/algebra">
                      <Button variant="outline" size="sm">
                         <Target className="mr-2 h-4 w-4" />
                         Start Quiz
                      </Button>
                  </Link>
                </li>
                 <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">AI Revision Prompts</span>
                  <Link href="/revision">
                     <Button variant="outline" size="sm">
                       <Bot className="mr-2 h-4 w-4" />
                       Get Prompts
                     </Button>
                  </Link>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
