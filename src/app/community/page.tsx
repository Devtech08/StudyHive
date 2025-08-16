
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, BookCopy, Trophy, Bell, MessageSquare, PlusCircle, ArrowRight, Upload, Filter, Check, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/ai-revision', label: 'AI Revision' },
  { href: '/community', label: 'Community' },
  { href: '#', label: 'Leaderboard' },
];

const mockThreads = [
    { id: 1, title: "Struggling with Quantum Physics concepts. Any advice?", author: "physics_guru", replies: 12, subject: "Science" },
    { id: 2, title: "Best resources for learning calculus?", author: "math_wiz", replies: 8, subject: "Mathematics" },
    { id: 3, title: "Share your favorite history documentaries!", author: "history_buff", replies: 25, subject: "History" },
];

const mockGroups = [
    { id: 1, name: "Biology Exam Prep 2024", members: 0, privacy: "Public" },
    { id: 2, name: "Coding Buddies (Beginners)", members: 0, privacy: "Public" },
    { id: 3, name: "History Majors Collective", members: 0, privacy: "Private" },
];

const mockResources = [
    { id: 1, title: "Complete Biology 101 Lecture Notes", uploader: "jane_doe", type: "PDF", subject: "Science" },
    { id: 2, title: "Algebra Cheat Sheet", uploader: "math_lover", type: "Image", subject: "Mathematics" },
    { id: 3, title: "Interactive World War II Timeline", uploader: "history_fan", type: "Link", subject: "History" },
];


export default function CommunityPage() {
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);

  const toggleGroupMembership = (groupId: number) => {
    setJoinedGroups(prevJoinedGroups => {
        if (prevJoinedGroups.includes(groupId)) {
            // Leave group
            return prevJoinedGroups.filter(id => id !== groupId);
        } else {
            // Join group
            return [...prevJoinedGroups, groupId];
        }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
        <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center justify-center">
              <Logo />
            </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium justify-center flex-1">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={`transition-colors hover:text-foreground ${link.href === '/community' ? 'text-primary' : 'text-muted-foreground'}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 flex justify-end items-center gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="#">Login</Link>
          </Button>
          <Button asChild>
            <Link href="#">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 lg:p-12 bg-muted/20">
        <div className="container mx-auto">
           <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold font-headline">Community Hub</h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Connect, collaborate, and learn with your peers.
              </p>
          </header>

           <Tabs defaultValue="groups">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-8">
                    <TabsTrigger value="forums"><MessageSquare className="w-4 h-4 mr-2"/>Forums</TabsTrigger>
                    <TabsTrigger value="groups"><Users className="w-4 h-4 mr-2"/>Study Groups</TabsTrigger>
                    <TabsTrigger value="resources"><BookCopy className="w-4 h-4 mr-2"/>Resources</TabsTrigger>
                    <TabsTrigger value="challenges"><Trophy className="w-4 h-4 mr-2"/>Challenges</TabsTrigger>
                    <TabsTrigger value="announcements"><Bell className="w-4 h-4 mr-2"/>Announcements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="forums">
                    <Card>
                        <CardHeader>
                            <CardTitle>Discussion Forums</CardTitle>
                            <CardDescription>Ask questions, share knowledge, and connect with other students.</CardDescription>
                             <div className="flex gap-2 pt-4">
                                <Input placeholder="Search forums..." className="bg-background"/>
                                <Select>
                                  <SelectTrigger className="w-[180px] bg-background">
                                    <SelectValue placeholder="Filter by subject" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="science">Science</SelectItem>
                                    <SelectItem value="math">Mathematics</SelectItem>
                                    <SelectItem value="history">History</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button>
                                    <Search className="w-4 h-4 mr-2"/>
                                    Search
                                </Button>
                                <Button variant="outline">
                                    <PlusCircle className="w-4 h-4 mr-2"/>
                                    New Post
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {mockThreads.map(thread => (
                               <div key={thread.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-muted/50">
                                   <div>
                                       <h4 className="font-semibold">{thread.title}</h4>
                                       <p className="text-sm text-muted-foreground">by {thread.author} in <Badge variant="secondary">{thread.subject}</Badge></p>
                                   </div>
                                   <div className="text-center">
                                       <p className="font-bold text-lg">{thread.replies}</p>
                                       <p className="text-xs text-muted-foreground">Replies</p>
                                   </div>
                               </div>
                           ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="groups">
                     <Card>
                        <CardHeader>
                            <CardTitle>Study Groups</CardTitle>
                            <CardDescription>Find or create study groups to collaborate with peers on specific subjects or goals.</CardDescription>
                            <div className="flex gap-2 pt-4">
                               <Input placeholder="Search for groups..." className="bg-background"/>
                               <Button>
                                    <Search className="w-4 h-4 mr-2"/>
                                    Search Groups
                                </Button>
                                <Button variant="outline">
                                    <PlusCircle className="w-4 h-4 mr-2"/>
                                    Create Group
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockGroups.map(group => {
                                const isJoined = joinedGroups.includes(group.id);
                                return (
                                <Card key={group.id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{group.name}</CardTitle>
                                        <CardDescription>{group.privacy} Group</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-muted-foreground"/>
                                            <span className="text-sm">{isJoined ? group.members + 1 : group.members} members</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="grid grid-cols-2 gap-2">
                                        <Button 
                                            className="w-full"
                                            onClick={() => toggleGroupMembership(group.id)}
                                            variant={isJoined ? "destructive" : "default"}
                                        >
                                            {isJoined ? (
                                                <>
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Leave
                                                </>
                                            ) : (
                                                <>
                                                <PlusCircle className="w-4 h-4 mr-2" />
                                                Join Group
                                                </>
                                            )}
                                        </Button>
                                        <Button variant="outline" className="w-full" disabled>View Members</Button>
                                    </CardFooter>
                                </Card>
                            )})}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="resources">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resource Sharing Hub</CardTitle>
                            <CardDescription>Share and discover study notes, flashcards, and other useful materials.</CardDescription>
                             <div className="flex gap-2 pt-4">
                                <Input placeholder="Search resources..." className="bg-background"/>
                                 <Button>
                                    <Search className="w-4 h-4 mr-2"/>
                                    Search Resources
                                </Button>
                                <Button variant="outline">
                                    <Upload className="w-4 h-4 mr-2"/>
                                    Upload Resource
                                </Button>
                            </div>
                        </CardHeader>
                         <CardContent className="space-y-4">
                           {mockResources.map(resource => (
                               <div key={resource.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-muted/50">
                                   <div>
                                       <h4 className="font-semibold">{resource.title}</h4>
                                       <p className="text-sm text-muted-foreground">Uploaded by {resource.uploader} in <Badge variant="secondary">{resource.subject}</Badge></p>
                                   </div>
                                   <Button variant="ghost">Download</Button>
                               </div>
                           ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="challenges">
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle>Community Challenges</CardTitle>
                            <CardDescription>Test your skills in weekly quizzes and compete on the leaderboards.</CardDescription>
                        </CardHeader>
                         <CardContent className="flex flex-col items-center justify-center py-12">
                            <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Weekly Science Quiz</h3>
                            <p className="text-muted-foreground mb-6">Ends in 3 days. Are you ready?</p>
                            <Button size="lg">Take the Challenge</Button>
                         </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="announcements">
                     <Card className="text-center">
                        <CardHeader>
                            <CardTitle>Announcements</CardTitle>
                            <CardDescription>Stay updated with the latest news, events, and important notices.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Bell className="w-16 h-16 text-muted-foreground/50 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Nothing new to see here!</h3>
                            <p className="text-muted-foreground">Check back later for important updates.</p>
                         </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
