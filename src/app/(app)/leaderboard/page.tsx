import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Alice Johnson', score: 1250, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
  { rank: 2, name: 'Bob Williams', score: 1180, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  { rank: 3, name: 'Charlie Brown', score: 1120, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  { rank: 4, name: 'Diana Prince', score: 1050, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
  { rank: 5, name: 'Ethan Hunt', score: 980, avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <h1 className="text-3xl font-bold font-headline">Leaderboard</h1>
      </div>
      <p className="text-muted-foreground max-w-3xl">
        See how you stack up against other learners. Points are awarded for quiz performance and study streaks.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Top Learners</CardTitle>
          <CardDescription>The top 5 performers on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Student</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
