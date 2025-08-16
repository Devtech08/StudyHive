import { getCourse, getSubject } from "@/lib/courses";
import { notFound } from "next/navigation";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Circle, Home, ChevronLeft, ChevronRight, FileText, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function CourseDetailPage({ params }: { params: { subjectId: string, courseId: string } }) {
    const subject = getSubject(params.subjectId);
    const course = getCourse(params.subjectId, params.courseId);

    if (!subject || !course) {
        notFound();
    }

    const totalTopics = course.modules.reduce((acc, module) => acc + module.topics.length, 0);
    const completedTopics = course.modules.reduce((acc, module) => {
        return acc + module.topics.filter(t => t.completed).length;
    }, 0);
    const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
                <nav className="flex items-center gap-4 text-sm font-medium">
                    <Link href="/" className="flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        <span className="font-bold text-primary">NoteWise</span>
                    </Link>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <Link href="/courses" className="text-muted-foreground transition-colors hover:text-foreground">
                        Courses
                    </Link>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{course.title}</span>
                </nav>
            </header>
            <main className="flex-1">
                <div className="relative h-64 md:h-80 w-full">
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                        data-ai-hint={course.dataAiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                        <subject.icon className="w-12 h-12 mb-2" />
                        <h1 className="text-4xl md:text-5xl font-bold font-headline">{course.title}</h1>
                        <p className="mt-2 text-lg max-w-2xl">Taught by {course.instructor}</p>
                    </div>
                </div>

                <div className="container mx-auto py-8 md:py-12">
                    <Tabs defaultValue="modules">
                        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                            <TabsTrigger value="modules">Modules</TabsTrigger>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="discussion">Discussion</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="py-6">
                             <Card>
                                <CardHeader><CardTitle>Course Overview</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground">{course.description}</p>
                                    <h4 className="font-semibold text-lg">Learning Objectives</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        {course.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                                    </ul>
                                </CardContent>
                             </Card>
                        </TabsContent>
                        <TabsContent value="modules" className="py-6">
                            <div className="grid md:grid-cols-[3fr_1fr] gap-8">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Course Content</h3>
                                    <Accordion type="single" collapsible defaultValue="module-1">
                                    {course.modules.map(module => (
                                        <AccordionItem value={module.id} key={module.id}>
                                            <AccordionTrigger className="text-lg font-semibold">{module.title}</AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="space-y-2 pt-2">
                                                    {module.topics.map(topic => (
                                                        <li key={topic.id}>
                                                            <Link href={`/courses/${subject.id}/${course.id}/${module.id}/${topic.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                                                                <div className="flex items-center gap-4">
                                                                    {topic.completed ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-muted-foreground" />}
                                                                    <span className="text-base">{topic.title}</span>
                                                                </div>
                                                                <Button variant="ghost" size="sm">Start</Button>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                    </Accordion>
                                </div>
                                <aside className="space-y-6">
                                    <Card>
                                        <CardHeader><CardTitle>Your Progress</CardTitle></CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-center text-3xl font-bold font-headline text-primary">
                                                {overallProgress}%
                                                <span className="text-sm font-normal text-muted-foreground ml-2">Complete</span>
                                            </div>
                                            <p className="text-center mt-2 text-sm text-muted-foreground">{completedTopics} of {totalTopics} topics completed.</p>
                                            <Button className="w-full mt-4">View Certificate</Button>
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader><CardTitle>Bookmarks</CardTitle></CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">You haven't bookmarked any lessons yet.</p>
                                        </CardContent>
                                    </Card>
                                </aside>
                            </div>
                        </TabsContent>
                        <TabsContent value="discussion" className="py-6">
                            <Card>
                               <CardHeader><CardTitle>Discussion Forum</CardTitle></CardHeader>
                               <CardContent className="flex flex-col items-center justify-center text-center py-12">
                                  <MessageSquare className="w-16 h-16 text-muted-foreground/50 mb-4" />
                                  <p className="text-muted-foreground">The discussion forum is coming soon.</p>
                               </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
