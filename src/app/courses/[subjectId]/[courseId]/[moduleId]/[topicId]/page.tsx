
import { getCourse, getSubject, getTopic } from "@/lib/courses";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ChevronLeft, ChevronRight, Download, CheckCircle, BookOpen } from "lucide-react";

export default function LessonPage({ params }: { params: { subjectId: string, courseId: string, moduleId: string, topicId: string } }) {
    const subject = getSubject(params.subjectId);
    const course = getCourse(params.subjectId, params.courseId);
    const topic = getTopic(params.subjectId, params.courseId, params.moduleId, params.topicId);

    if (!subject || !course || !topic) {
        notFound();
    }
    
    // Simple navigation logic (can be improved)
    const flatTopics = course.modules.flatMap(m => m.topics.map(t => ({...t, moduleId: m.id})));
    const currentIndex = flatTopics.findIndex(t => t.id === topic.id);
    const prevTopic = currentIndex > 0 ? flatTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < flatTopics.length - 1 ? flatTopics[currentIndex + 1] : null;


    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
                <nav className="flex items-center gap-2 text-sm font-medium">
                     <Link href="/" className="flex items-center gap-2 font-bold text-primary">
                        <BookOpen className="w-4 h-4" />
                        StudyHive
                    </Link>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <Link href="/courses" className="text-muted-foreground transition-colors hover:text-foreground">
                        Courses
                    </Link>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                     <Link href={`/courses/${subject.id}/${course.id}`} className="text-muted-foreground transition-colors hover:text-foreground line-clamp-1">
                        {course.title}
                    </Link>
                </nav>
                 <Button variant="outline" asChild>
                    <Link href={`/courses/${subject.id}/${course.id}`}>
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back to Course
                    </Link>
                </Button>
            </header>
             <main className="flex-1 p-4 md:p-8 lg:p-12">
                 <div className="container mx-auto grid md:grid-cols-[3fr_1fr] gap-8">
                    <article>
                        <header className="mb-8">
                             <h1 className="text-4xl font-bold font-headline mb-2">{topic.title}</h1>
                             <p className="text-muted-foreground">From module: {course.modules.find(m => m.id === params.moduleId)?.title}</p>
                        </header>

                        <div className="prose dark:prose-invert max-w-none bg-muted/20 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold">Lesson Content</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
                            </p>
                            <p>
                                Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.
                            </p>
                            <div className="bg-background/50 p-4 rounded-lg my-6">
                                <h3 className="font-semibold">Key Takeaway</h3>
                                <p className="text-muted-foreground italic">This is a placeholder for the main point of the lesson. Understanding this concept is crucial for the upcoming quiz.</p>
                            </div>
                             <p>
                                Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.
                            </p>
                        </div>
                    </article>

                    <aside className="space-y-6">
                         <Card>
                            <CardHeader><CardTitle>Lesson Status</CardTitle></CardHeader>
                            <CardContent>
                                <Button className="w-full group">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark as Complete
                                </Button>
                                <p className="text-center text-sm mt-2 text-muted-foreground">Complete this lesson to update your progress.</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Downloads</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <Download className="w-4 h-4" />
                                    <span>Lesson Notes (PDF)</span>
                                </Button>
                                 <Button variant="outline" className="w-full justify-start gap-2">
                                    <Download className="w-4 h-4" />
                                    <span>Slides (PPT)</span>
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>
                 </div>
            </main>
            <footer className="border-t sticky bottom-0 bg-background/90">
                <div className="container mx-auto flex justify-between items-center p-4">
                     {prevTopic ? (
                        <Button asChild variant="outline">
                            <Link href={`/courses/${subject.id}/${course.id}/${prevTopic.moduleId}/${prevTopic.id}`}>
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Previous Lesson
                            </Link>
                        </Button>
                    ) : <div />}
                    {nextTopic ? (
                        <Button asChild>
                            <Link href={`/courses/${subject.id}/${course.id}/${nextTopic.moduleId}/${nextTopic.id}`}>
                                Next Lesson
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    ) : <div />}
                </div>
            </footer>
        </div>
    );
}
