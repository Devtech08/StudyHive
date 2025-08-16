
'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Wand2, BookCopy, Zap, Target, Award, Bot, FileText, CheckCircle, MessageSquare, Speaker, HelpCircle, X, File as FileIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/ai-revision', label: 'AI Revision' },
  { href: '#', label: 'Community' },
  { href: '#', label: 'Leaderboard' },
];

export default function AiRevisionPage() {
    const [quizFile, setQuizFile] = useState<File | null>(null);
    const [flashcardFile, setFlashcardFile] = useState<File | null>(null);
    
    const quizFileInputRef = useRef<HTMLInputElement>(null);
    const flashcardFileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };
    
    const renderFileUpload = (
        file: File | null, 
        setFile: React.Dispatch<React.SetStateAction<File | null>>, 
        fileInputRef: React.RefObject<HTMLInputElement>
    ) => {
        if (file) {
            return (
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted border">
                    <div className="flex items-center gap-2">
                        <FileIcon className="w-4 h-4" />
                        <span className="text-sm font-medium truncate">{file.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )
        }
        return (
            <>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(e, setFile)}
                    accept=".pdf,.doc,.docx,.txt"
                />
                <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Notes or PDF
                </Button>
            </>
        )
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
                    <Link key={link.label} href={link.href} className={`transition-colors hover:text-foreground ${link.href === '/ai-revision' ? 'text-primary' : 'text-muted-foreground'}`}>
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
                        <h1 className="text-4xl font-bold font-headline">AI Revision Studio</h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Your personalized AI-powered study partner.
                        </p>
                    </header>
                    <Tabs defaultValue="generate">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8">
                            <TabsTrigger value="generate"><Wand2 className="w-4 h-4 mr-2"/>Generate</TabsTrigger>
                            <TabsTrigger value="plan"><Target className="w-4 h-4 mr-2"/>Study Plan</TabsTrigger>
                            <TabsTrigger value="explain"><HelpCircle className="w-4 h-4 mr-2" />Explain</TabsTrigger>
                            <TabsTrigger value="exam"><FileText className="w-4 h-4 mr-2"/>Mock Exam</TabsTrigger>
                            <TabsTrigger value="gamify"><Award className="w-4 h-4 mr-2"/>Challenges</TabsTrigger>
                        </TabsList>
                        <TabsContent value="generate">
                             <div className="grid lg:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center"><BookCopy className="w-6 h-6 mr-3 text-primary" />Smart Question Generation</CardTitle>
                                        <CardDescription>Upload course notes or a PDF and let AI create a quiz for you. Select difficulty and question types.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                       {renderFileUpload(quizFile, setQuizFile, quizFileInputRef)}
                                    </CardContent>
                                    <CardFooter>
                                         <Button className="w-full" disabled={!quizFile}><Zap className="w-4 h-4 mr-2" />Generate Quiz</Button>
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center"><Bot className="w-6 h-6 mr-3 text-primary" />Flashcards & Summaries</CardTitle>
                                        <CardDescription>AI can turn your notes into flashcards or summarize long chapters for quick revision.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                         {renderFileUpload(flashcardFile, setFlashcardFile, flashcardFileInputRef)}
                                    </CardContent>
                                    <CardFooter className="grid grid-cols-2 gap-4">
                                        <Button className="w-full" disabled={!flashcardFile}>Create Flashcards</Button>
                                        <Button className="w-full" disabled={!flashcardFile}>Summarize Notes</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="plan">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center"><Target className="w-6 h-6 mr-3 text-primary" />Personalized Study Plan</CardTitle>
                                    <CardDescription>Our AI analyzes your progress and suggests what to revise next to maximize your learning efficiency.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                   <div className="p-4 bg-background rounded-lg border">
                                       <h4 className="font-semibold mb-2">Today's Focus: Biology 101</h4>
                                       <ul className="space-y-2 text-sm">
                                           <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Review 'Cell Structure' (Completed)</li>
                                           <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-yellow-500" />Practice 10 quiz questions on 'Genetics'.</li>
                                            <li className="flex items-center"><BookCopy className="w-4 h-4 mr-2 text-blue-500" />Read summary of 'The Chemistry of Life'.</li>
                                       </ul>
                                   </div>
                                    <Button className="w-full">Generate My Weekly Plan</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="explain">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center"><HelpCircle className="w-6 h-6 mr-3 text-primary" />Instant Explanations</CardTitle>
                                    <CardDescription>Stuck on a concept? Ask our AI assistant for a simple explanation, or to quiz you on a topic.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                   <div className="p-4 bg-background rounded-lg border flex flex-col h-64">
                                       <div className="flex-grow space-y-4">
                                           <div className="flex items-start gap-3">
                                               <div className="p-2 rounded-full bg-primary/10"><Bot className="w-5 h-5 text-primary" /></div>
                                               <div className="bg-muted p-3 rounded-lg">
                                                   <p className="text-sm">Hello! I'm your AI tutor. How can I help you study today? You can ask me to explain a topic or quiz you.</p>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="flex gap-2">
                                           <input placeholder="Ask something like 'Explain photosynthesis in simple terms'" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background" />
                                            <Button><MessageSquare className="w-4 h-4" /></Button>
                                            <Button variant="outline"><Speaker className="w-4 h-4" /></Button>
                                       </div>
                                   </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="exam">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center"><FileText className="w-6 h-6 mr-3 text-primary" />Mock Exam Mode</CardTitle>
                                    <CardDescription>Let the AI generate a full practice test from all topics in a course to get you ready for the real exam.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full" size="lg">
                                        <Zap className="w-5 h-5 mr-2"/>
                                        Generate Mock Exam
                                    </Button>
                                </CardContent>
                                <CardFooter>
                                    <p className="text-xs text-muted-foreground">The exam will be timed and cover all course material to simulate final exam conditions.</p>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                         <TabsContent value="gamify">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center"><Award className="w-6 h-6 mr-3 text-primary" />AI Revision Challenges</CardTitle>
                                    <CardDescription>Make revision fun with timed quizzes, streaks, and points. Compete with classmates on the leaderboard!</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full" size="lg">
                                       Start an AI Challenge
                                    </Button>
                                </CardContent>
                                <CardFooter>
                                    <p className="text-xs text-muted-foreground">Master topics to earn badges like "Math Genius" 🏅 and climb the ranks!</p>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}

    