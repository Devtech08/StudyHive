
'use client';

import Link from 'next/link';
import { BarChart, Book, Users, FilePen, MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProgressChart from '@/components/dashboard/ProgressChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '../ui/badge';


const courses = [
    { name: 'Introduction to Algebra', students: 45, status: 'Published' },
    { name: 'Photosynthesis Deep Dive', students: 32, status: 'Published' },
    { name: 'Ancient Roman History', students: 28, status: 'Draft' },
    { name: 'Creative Writing Workshop', students: 50, status: 'Published' },
];

export default function TeacherDashboard() {

  return (
    <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-headline">Teacher Dashboard</h1>
            <Button>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create New Course
            </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Link href="/my-courses">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/students">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+155</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/assignments">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments to Grade</CardTitle>
                <FilePen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 due this week
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Course Management</CardTitle>
                        <CardDescription>
                            An overview of all your created courses.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Enrolled Students</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map(course => (
                                <TableRow key={course.name}>
                                    <TableCell className="font-medium">{course.name}</TableCell>
                                    <TableCell>{course.students}</TableCell>
                                    <TableCell>
                                        <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                                            {course.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div>
                 <Card>
                    <CardHeader>
                    <CardTitle className="font-headline">Student Progress</CardTitle>
                    <CardDescription>
                        Average quiz scores across all your courses.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProgressChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
