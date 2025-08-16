
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';

const leaderboardData = {
  allTime: [
    { rank: 1, name: 'Alice Johnson', score: 1250, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
    { rank: 2, name: 'Bob Williams', score: 1180, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
    { rank: 3, name: 'Charlie Brown', score: 1120, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
    { rank: 4, name: 'Diana Prince', score: 1050, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
    { rank: 5, name: 'Ethan Hunt', score: 980, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  ],
  monthly: [
    { rank: 1, name: 'Diana Prince', score: 450, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
    { rank: 2, name: 'Alice Johnson', score: 420, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
    { rank: 3, name: 'Frank Miller', score: 390, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
    { rank: 4, name: 'Grace Lee', score: 350, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
    { rank: 5, name: 'Charlie Brown', score: 320, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  ],
  weekly: [
    { rank: 1, name: 'Grace Lee', score: 150, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
    { rank: 2, name: 'Heidi Turner', score: 135, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
    { rank: 3, name: 'Diana Prince', score: 120, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
    { rank: 4, name: 'Ivan Petrov', score: 100, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
    { rank: 5, name: 'Alice Johnson', score: 90, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
  ]
};

const currentUserRank = {
  allTime: { rank: 28, name: 'You', score: 540 },
  monthly: { rank: 15, name: 'You', score: 180 },
  weekly: { rank: 9, name: 'You', score: 65 },
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const userName = user?.email.split('@')[0] || 'You';
  
  const renderTable = (data: typeof leaderboardData.allTime, currentUserData: typeof currentUserRank.allTime) => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead>Student</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
           <TableRow className="bg-primary/10">
              <TableCell className="font-bold text-lg text-primary">{currentUserData.rank}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-primary">{userName}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold text-primary">{currentUserData.score} pts</TableCell>
            </TableRow>
          {data.map((user) => (
            <TableRow key={user.rank}>
              <TableCell className="font-bold text-lg">{user.rank}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} data-ai-hint={user.dataAiHint} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold">{user.score} pts</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <h1 className="text-3xl font-bold font-headline">Leaderboard</h1>
      </div>
      <p className="text-muted-foreground max-w-3xl">
        See how you stack up against other learners. Points are awarded for quiz performance and study streaks.
      </p>

      <Tabs defaultValue="all-time" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all-time">All-Time</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
        </TabsList>
        <TabsContent value="all-time">
          <Card>
            <CardHeader>
              <CardTitle>Top Learners (All-Time)</CardTitle>
              <CardDescription>The all-time top performers on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              {renderTable(leaderboardData.allTime, currentUserRank.allTime)}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Top Learners (This Month)</CardTitle>
                <CardDescription>The top performers this month.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderTable(leaderboardData.monthly, currentUserRank.monthly)}
              </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Top Learners (This Week)</CardTitle>
                <CardDescription>The top performers this week.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderTable(leaderboardData.weekly, currentUserRank.weekly)}
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
