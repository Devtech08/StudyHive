import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { subjects } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Courses</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/courses/${subject.id}`} className="group">
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 ease-in-out hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <subject.icon className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline text-2xl">{subject.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>Explore topics in {subject.name}, from fundamentals to advanced concepts.</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                  <div className="text-sm font-medium text-primary flex items-center">
                    View Topics <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
