import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FilePen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const assignments = [
  { id: '1', studentName: 'Alice Johnson', course: 'Introduction to Algebra', title: 'Chapter 1 Homework', submitted: '2024-06-10', studentAvatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
  { id: '2', studentName: 'Bob Williams', course: 'Photosynthesis Deep Dive', title: 'Lab Report: Light Intensity', submitted: '2024-06-10', studentAvatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  { id: '3', studentName: 'Charlie Brown', course: 'Introduction to Algebra', title: 'Worksheet: Solving Equations', submitted: '2024-06-09', studentAvatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  { id: '4', studentName: 'Diana Prince', course: 'Creative Writing Workshop', title: 'Short Story Draft 1', submitted: '2024-06-09', studentAvatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
  { id: '5', studentName: 'Ethan Hunt', course: 'Ancient Roman History', title: 'Essay: The Fall of Rome', submitted: '2024-06-08', studentAvatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
];

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <FilePen className="h-8 w-8" />
        <h1 className="text-3xl font-bold font-headline">Assignments to Grade</h1>
      </div>
      <p className="text-muted-foreground max-w-3xl">
        Review submitted assignments and provide feedback to your students.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Assignments</CardTitle>
          <CardDescription>A list of all student submissions that need to be graded.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={assignment.studentAvatar} data-ai-hint={assignment.dataAiHint} />
                        <AvatarFallback>{assignment.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{assignment.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{new Date(assignment.submitted).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                        Grade Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
