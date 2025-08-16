
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookMarked, PlusCircle, Pencil, BarChart2 } from 'lucide-react';
import Link from 'next/link';

// Mock data - in a real app, this would come from a database
const teacherCourses = [
  {
    id: 'alg101',
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    enrolledStudents: 45,
  },
  {
    id: 'bio202',
    title: 'Photosynthesis Deep Dive',
    subject: 'Biology',
    enrolledStudents: 32,
  },
  {
    id: 'hist301',
    title: 'Ancient Roman History',
    subject: 'History',
    enrolledStudents: 28,
  },
   {
    id: 'eng101',
    title: 'Creative Writing Workshop',
    subject: 'English',
    enrolledStudents: 50,
  },
];

export default function MyCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <BookMarked className="h-8 w-8" />
            <h1 className="text-3xl font-bold font-headline">My Courses</h1>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
      </div>
      
      <p className="text-muted-foreground max-w-3xl">
        Here you can manage all of your courses, edit content, and view student analytics.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teacherCourses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
              <CardDescription>
                <span className="font-medium text-primary">{course.subject}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{course.enrolledStudents}</span> students enrolled
              </div>
            </CardContent>
            <CardContent className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </Button>
                 <Button variant="secondary" size="sm" className="flex-1">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Analytics
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
