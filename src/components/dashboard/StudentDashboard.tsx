
'use client';

import Link from 'next/link';
import { BookOpen, Bot, Target, Award, Star, CheckCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import ProgressChart from '@/components/dashboard/ProgressChart';
import { useAuth } from '@/context/AuthContext';

const achievements = [
    { icon: <Award className="h-6 w-6 text-yellow-500" />, title: 'First Quiz', description: 'Complete your first quiz' },
    { icon: <Star className="h-6 w-6 text-yellow-500" />, title: 'Quick Learner', description: 'Master a topic in 1 day' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, title: 'Perfect Score', description: 'Get 100% on a quiz' },
]

export default function StudentDashboard() {
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
        <div className="grid gap-6 md:grid-cols-2">
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
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Progress & Achievements</CardTitle>
              <CardDescription>
                Track your progress and unlock new badges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium mb-2">Subject Progress</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Mathematics</span>
                                <span className="text-sm text-muted-foreground">40%</span>
                            </div>
                            <Progress value={40} aria-label="Mathematics progress" />
                        </div>
                         <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Biology</span>
                                <span className="text-sm text-muted-foreground">65%</span>
                            </div>
                            <Progress value={65} aria-label="Biology progress" />
                        </div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-medium mb-2">Badges</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {achievements.map((badge) => (
                           <div key={badge.title} className="flex flex-col items-center gap-1">
                             <div className="p-3 rounded-full bg-muted">
                                {badge.icon}
                              </div>
                             <p className="text-xs font-medium">{badge.title}</p>
                           </div>
                        ))}
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
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
                      <Button variant="destructive" size="sm">
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
