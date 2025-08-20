
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, Shield, Star, Medal } from "lucide-react";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { UserNav } from '@/components/UserNav';
import DashboardHeader from '@/components/DashboardHeader';


const allTimeLeaderboard = [
  { rank: 1, name: 'QuantumLeaper', points: 15200, avatar: 'https://i.pinimg.com/736x/4a/18/4a/4a184a39b131b8c7a361a94125b2933d.jpg', badges: ['Quiz Master', 'Top Contributor'] },
  { rank: 2, name: 'BioNinja', points: 14800, avatar: 'https://i.pinimg.com/736x/9b/79/4d/9b794d0c8d197364f3319ed025516a50.jpg', badges: ['Biology Pro'] },
  { rank: 3, name: 'HistoryBuff', points: 14500, avatar: 'https://i.pinimg.com/736x/1b/54/b4/1b54b4231f28b7e2182b8a4a584c31e4.jpg', badges: ['Archivist'] },
  { rank: 4, name: 'CodeWizard', points: 13900, avatar: 'https://i.pinimg.com/736x/6f/37/47/6f37474495e5b6a713b1981881775f0f.jpg', badges: ['Bug Squasher'] },
  { rank: 5, name: 'MathMagician', points: 13500, avatar: 'https://i.pinimg.com/736x/ad/37/87/ad378772338d721111a84f3c77395c8c.jpg', badges: ['Calculus King'] },
  { rank: 6, name: 'ArtExplorer', points: 12800, avatar: 'https://i.pinimg.com/736x/09/a4/09/09a409f9f53859a444983d596a2b8423.jpg', badges: ['Creative Mind'] },
  { rank: 7, name: 'StarSeeker', points: 12100, avatar: 'https://i.pinimg.com/736x/d4/0f/50/d40f507b469b89a8ac819280d56b2bab.jpg', badges: ['Astronomer'] },
  { rank: 8, name: 'EcoWarrior', points: 11500, avatar: 'https://i.pinimg.com/736x/88/c5/a7/88c5a7776d66e74421d01a1829986321.jpg', badges: ['Planet Saver'] },
];

const weeklyLeaderboard = [
    { rank: 1, name: 'CodeWizard', points: 550, avatar: 'https://i.pinimg.com/736x/6f/37/47/6f37474495e5b6a713b1981881775f0f.jpg', badges: ['Bug Squasher'] },
    { rank: 2, name: 'QuantumLeaper', points: 530, avatar: 'https://i.pinimg.com/736x/4a/18/4a/4a184a39b131b8c7a361a94125b2933d.jpg', badges: ['Quiz Master', 'Top Contributor'] },
    { rank: 3, name: 'MathMagician', points: 510, avatar: 'https://i.pinimg.com/736x/ad/37/87/ad378772338d721111a84f3c77395c8c.jpg', badges: ['Calculus King'] },
    { rank: 4, name: 'BioNinja', points: 480, avatar: 'https://i.pinimg.com/736x/9b/79/4d/9b794d0c8d197364f3319ed025516a50.jpg', badges: ['Biology Pro'] },
    { rank: 5, name: 'HistoryBuff', points: 450, avatar: 'https://i.pinimg.com/736x/1b/54/b4/1b54b4231f28b7e2182b8a4a584c31e4.jpg', badges: ['Archivist'] },
];

const monthlyLeaderboard = [
    { rank: 1, name: 'BioNinja', points: 2100, avatar: 'https://i.pinimg.com/736x/9b/79/4d/9b794d0c8d197364f3319ed025516a50.jpg', badges: ['Biology Pro'] },
    { rank: 2, name: 'HistoryBuff', points: 2050, avatar: 'https://i.pinimg.com/736x/1b/54/b4/1b54b4231f28b7e2182b8a4a584c31e4.jpg', badges: ['Archivist'] },
    { rank: 3, name: 'QuantumLeaper', points: 1950, avatar: 'https://i.pinimg.com/736x/4a/18/4a/4a184a39b131b8c7a361a94125b2933d.jpg', badges: ['Quiz Master', 'Top Contributor'] },
    { rank: 4, name: 'CodeWizard', points: 1800, avatar: 'https://i.pinimg.com/736x/6f/37/47/6f37474495e5b6a713b1981881775f0f.jpg', badges: ['Bug Squasher'] },
    { rank: 5, name: 'MathMagician', points: 1750, avatar: 'https://i.pinimg.com/736x/ad/37/87/ad378772338d721111a84f3c77395c8c.jpg', badges: ['Calculus King'] },
];

const badgeIcons: { [key: string]: React.ElementType } = {
    'Quiz Master': Trophy,
    'Top Contributor': Star,
    'Biology Pro': Shield,
    'Archivist': Medal,
    'Bug Squasher': Award,
    'Calculus King': Award,
    'Creative Mind': Award,
    'Astronomer': Star,
    'Planet Saver': Shield,
};

const LeaderboardContent = ({ data }: { data: typeof allTimeLeaderboard }) => {
    const topThree = data.slice(0, 3);
    const rest = data.slice(3);

    const rankColors: { [key: number]: string } = {
        1: 'bg-yellow-400/20 text-yellow-400 border-yellow-500/50',
        2: 'bg-slate-400/20 text-slate-300 border-slate-500/50',
        3: 'bg-orange-400/20 text-orange-400 border-orange-500/50',
    };

    const rankIconSize: { [key: number]: string } = {
        1: 'w-24 h-24',
        2: 'w-20 h-20',
        3: 'w-20 h-20',
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {topThree.map((user, index) => {
                    const rank = user.rank;
                    const orderClass = { 1: 'md:order-2', 2: 'md:order-1', 3: 'md:order-3' };
                    return (
                        <Card key={user.rank} className={cn('flex flex-col items-center p-6 text-center', rankColors[rank], orderClass[rank as keyof typeof orderClass])}>
                            <Trophy className={cn("mb-4", rank === 1 ? "text-yellow-400 w-10 h-10" : "text-slate-400 w-8 h-8")} />
                            <Avatar className={cn('mb-4 border-4', rankIconSize[rank], rank === 1 ? 'border-yellow-400' : rank === 2 ? 'border-slate-400' : 'border-orange-400' )}>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-bold">{user.name}</h3>
                            <p className="text-2xl font-headline font-semibold">{user.points.toLocaleString()} PTS</p>
                        </Card>
                    )
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Top 100</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {rest.map(user => (
                        <div key={user.rank} className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="w-8 font-bold text-lg text-muted-foreground">{user.rank}</div>
                            <Avatar className="w-10 h-10 mx-4">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold">{user.name}</p>
                                <div className="flex gap-2 mt-1">
                                    {user.badges.map(badge => {
                                        const Icon = badgeIcons[badge] || Star;
                                        return (
                                        <Badge key={badge} variant="secondary" className="text-xs">
                                            <Icon className="w-3 h-3 mr-1" />
                                            {badge}
                                        </Badge>
                                    )})}
                                </div>
                            </div>
                            <div className="text-lg font-headline font-semibold">{user.points.toLocaleString()} PTS</div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
};


export default function LeaderboardPage() {
  return (
    <div className="flex flex-col min-h-screen animate-zoom-in">
      <DashboardHeader />

      <main className="flex-1 p-4 md:p-8 lg:p-12 bg-muted/20">
        <div className="container mx-auto">
           <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold font-headline">Leaderboard</h1>
              <p className="text-muted-foreground mt-2 text-lg">
                See who's topping the charts and making waves in the community.
              </p>
          </header>

           <Tabs defaultValue="weekly">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="all-time">All-Time</TabsTrigger>
                </TabsList>
                
                <TabsContent value="weekly">
                    <LeaderboardContent data={weeklyLeaderboard} />
                </TabsContent>
                <TabsContent value="monthly">
                    <LeaderboardContent data={monthlyLeaderboard} />
                </TabsContent>
                <TabsContent value="all-time">
                    <LeaderboardContent data={allTimeLeaderboard} />
                </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
