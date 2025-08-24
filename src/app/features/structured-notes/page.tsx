
'use client';

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronRight, FileText, Folder, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function StructuredNotesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
                <Logo />
                <UserNav />
            </header>
            <main className="flex-1">
                <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center">
                    <Image
                        src="https://i.pinimg.com/736x/6f/e0/db/6fe0dbc48f7583a25813b8e543c1c49f.jpg"
                        alt="Organized study desk"
                        fill
                        className="object-cover -z-10"
                        data-ai-hint="study desk"
                    />
                    <div className="absolute inset-0 bg-black/70 -z-10" />
                    <div className="container px-4 md:px-6 text-white">
                        <div className="space-y-4 max-w-3xl mx-auto">
                            
                            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                                Structured Notes for Effortless Learning
                            </h1>
                            <p className="text-lg text-white/80">
                                Say goodbye to scattered papers and confusing documents. StudyHive organizes everything for you, from broad subjects to the smallest details.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/courses">
                                    Explore Courses Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
                    <div className="container px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-center md:text-left">A Clear Path to Knowledge</h2>
                                <p className="text-muted-foreground text-lg text-center md:text-left">
                                    We believe that organized material is the key to effective learning. Our platform uses a hierarchical structure that mirrors how you learn best:
                                </p>
                                <ul className="space-y-4 text-lg">
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><Layers className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">Subjects</h4>
                                            <p className="text-sm text-muted-foreground">High-level disciplines like Science, Math, or History.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><Folder className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">Courses</h4>
                                            <p className="text-sm text-muted-foreground">Specific fields of study within a subject, like 'Biology 101'.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><BookOpen className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">Modules</h4>
                                            <p className="text-sm text-muted-foreground">Thematic sections that break down a course, such as 'Genetics'.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><FileText className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">Topics</h4>
                                            <p className="text-sm text-muted-foreground">Individual lessons and concepts, like 'DNA and RNA'.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                             <div className="p-4">
                                <Card className="shadow-2xl">
                                    <CardHeader>
                                        <CardTitle>Example: Biology 101</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                            <Layers className="w-4 h-4 text-muted-foreground" /> Science
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 ml-4">
                                                <Folder className="w-4 h-4 text-muted-foreground" /> Biology 101
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 ml-8">
                                                    <BookOpen className="w-4 h-4 text-muted-foreground" /> Module 2: Genetics
                                                </div>
                                                <div className="space-y-2 ml-12">
                                                    <div className="flex items-center justify-between p-3 rounded-lg bg-background border hover:bg-primary/5 cursor-pointer">
                                                        <span className="font-medium">DNA and RNA</span>
                                                        <ChevronRight className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 rounded-lg bg-background border hover:bg-primary/5 cursor-pointer">
                                                        <span className="font-medium">Meiosis and Mitosis</span>
                                                        <ChevronRight className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
