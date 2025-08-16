
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { subjects } from "@/lib/courses";
import Image from "next/image";
import { ArrowRight, User } from "lucide-react";
import { Logo } from "@/components/Logo";

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#', label: 'AI Revision' },
  { href: '#', label: 'Communities' },
];

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
        </Link>
        <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="#">Login</Link>
          </Button>
          <Button asChild>
            <Link href="#">Get Started</Link>
          </Button>
        </div>
      </header>
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
              <div className="flex items-center justify-center gap-4 mb-6">
                 <subject.icon className="w-8 h-8 text-primary" />
                 <h2 className="text-3xl font-bold font-headline">{subject.name}</h2>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {subject.courses.map((course) => (
                    <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                            data-ai-hint={course.dataAiHint}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex-grow">
                        <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <User className="w-4 h-4 mr-2" />
                          <span>{course.instructor}</span>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-semibold">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 bg-muted/50">
                        <Button asChild className="w-full group">
                            <Link href={`/courses/${subject.id}/${course.id}`}>
                                {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
