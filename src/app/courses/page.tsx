
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { subjects } from "@/lib/courses";
import Image from "next/image";
import { ArrowRight, User } from "lucide-react";
import { Logo } from "@/components/Logo";
import { UserNav } from "@/components/UserNav";
import DashboardHeader from "@/components/DashboardHeader";

export default function CoursesPage() {

  const calculateProgress = (course: (typeof subjects)[0]['courses'][0]) => {
    if (!course.modules || course.modules.length === 0) {
        return 0;
    }
    const totalTopics = course.modules.reduce((acc, module) => acc + (module.topics?.length || 0), 0);
    if (totalTopics === 0) {
        return 0;
    }
    const completedTopics = course.modules.reduce((acc, module) => {
        return acc + (module.topics?.filter(t => t.completed).length || 0);
    }, 0);
    return Math.round((completedTopics / totalTopics) * 100);
  };

  return (
    <div className="flex flex-col min-h-screen animate-zoom-in">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="container mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold font-headline">Explore Courses</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Choose a subject to start your learning journey.
            </p>
          </header>

          {subjects.map((subject) => (
            <section key={subject.id} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                 <subject.icon className="w-8 h-8 text-primary" />
                 <h2 className="text-3xl font-bold font-headline">{subject.name}</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {subject.courses.map((course) => {
                  const progress = calculateProgress(course);
                  return (
                    <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-0">
                        <div className="relative h-56 w-full">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                            width={600}
                            height={400}
                            data-ai-hint={course.dataAiHint}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <User className="w-4 h-4 mr-2" />
                          <span>{course.instructor}</span>
                        </div>
                        <div className="w-full mt-auto">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-semibold">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 bg-muted/50">
                        <Button asChild className="w-full group">
                            <Link href={`/courses/${subject.id}/${course.id}`}>
                                {progress > 0 ? 'Continue Learning' : 'Start Course'}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
