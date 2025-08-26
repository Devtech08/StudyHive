
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth, useRequireAuth } from "@/hooks/use-auth";
import { subjects } from "@/lib/courses";
import { Award, BookCopy, Edit, Medal, Shield, Star, Trophy, Upload, Camera } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';

const userProfile = {
    name: 'QuantumLeaper',
    email: 'scholar@studyhive.com',
    avatar: 'https://picsum.photos/100/100',
    points: 15200,
    rank: 1,
    badges: ['Quiz Master', 'Top Contributor', 'Biology Pro', 'Archivist'],
};

const enrolledCourses = subjects.flatMap(s => s.courses).filter(c => c.progress > 0);

const badgeIcons: { [key: string]: React.ElementType } = {
    'Quiz Master': Trophy,
    'Top Contributor': Star,
    'Biology Pro': Shield,
    'Archivist': Medal,
    'default': Award,
};


export default function ProfilePage() {
    useRequireAuth();
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(userProfile.avatar);
    const fileInputRef = useRef<HTMLInputElement>(null);


    if (!user) {
        return null; // Or a loading spinner
    }
    
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = () => {
        // Here you would typically handle the file upload to a server
        console.log("Saving new avatar:", avatarFile);
        setIsEditing(false);
         if (avatarPreview) {
            userProfile.avatar = avatarPreview;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-muted/40 animate-zoom-in">
            <DashboardHeader />
            <main className="flex-1 p-4 md:p-8 lg:p-12">
                <div className="container mx-auto">
                    <header className="mb-12 text-center lg:text-left">
                        <h1 className="text-4xl font-bold font-headline">
                            My Profile
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Your personal space to track progress and achievements.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Sidebar */}
                        <aside className="lg:col-span-1 space-y-8">
                             <Card>
                                <CardContent className="pt-6 flex flex-col items-center text-center">
                                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                                        <AvatarImage src={avatarPreview || ''} />
                                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-2xl font-bold">{user.displayName || user.email?.split('@')[0]}</h2>
                                    <p className="text-muted-foreground">{user.email}</p>
                                    
                                    <Dialog open={isEditing} onOpenChange={setIsEditing}>
                                        <DialogTrigger asChild>
                                             <Button variant="outline" className="mt-4">
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit Profile
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Profile</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your profile here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="flex flex-col items-center space-y-4">
                                                    <div className="relative">
                                                        <Avatar className="w-32 h-32 border-4 border-primary/50">
                                                            <AvatarImage src={avatarPreview || ''} />
                                                            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="absolute bottom-1 right-1 rounded-full"
                                                            onClick={() => fileInputRef.current?.click()}
                                                        >
                                                            <Camera className="w-4 h-4" />
                                                        </Button>
                                                        <Input 
                                                            type="file" 
                                                            ref={fileInputRef} 
                                                            className="hidden" 
                                                            accept="image/*"
                                                            onChange={handleAvatarChange}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                                <Button onClick={handleSaveChanges}>Save Changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader className="text-center lg:text-left">
                                    <CardTitle>My Stats</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                        <span className="font-medium">Total Points</span>
                                        <span className="font-bold text-primary">{userProfile.points.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                        <span className="font-medium">Leaderboard Rank</span>
                                        <span className="font-bold text-primary">#{userProfile.rank}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                        <span className="font-medium">Courses Completed</span>
                                        <span className="font-bold text-primary">{enrolledCourses.filter(c => c.progress === 100).length}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                             <Card>
                                <CardHeader className="text-center lg:text-left">
                                    <CardTitle>My Achievements</CardTitle>
                                    <CardDescription>Badges you've earned through your hard work.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {userProfile.badges.map(badge => {
                                        const Icon = badgeIcons[badge] || badgeIcons.default;
                                        return (
                                            <div key={badge} className="flex flex-col items-center text-center p-4 border rounded-lg bg-background">
                                                <Icon className="w-10 h-10 text-yellow-500 mb-2" />
                                                <p className="text-sm font-medium">{badge}</p>
                                            </div>
                                        )
                                    })}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="text-center lg:text-left">
                                    <CardTitle>My Courses</CardTitle>
                                    <CardDescription>Courses you are currently enrolled in.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {enrolledCourses.map(course => (
                                        <Link href={`/courses/${(course as any).subjectId}/${course.id}`} key={course.id} className="block p-4 rounded-lg hover:bg-muted border">
                                             <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-semibold">{course.title}</h3>
                                                <span className="text-sm font-bold">{course.progress}%</span>
                                            </div>
                                            <Progress value={course.progress} className="h-2" />
                                        </Link>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
