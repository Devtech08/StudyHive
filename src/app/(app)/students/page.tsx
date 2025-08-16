import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

const students = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', joined: '2024-05-01', avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', joined: '2024-05-02', avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', joined: '2024-05-03', avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', joined: '2024-05-04', avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', joined: '2024-05-05', avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  { id: '6', name: 'Frank Miller', email: 'frank@example.com', joined: '2024-05-10', avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
  { id: '7', name: 'Grace Lee', email: 'grace@example.com', joined: '2024-05-11', avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
  { id: '8', name: 'Heidi Turner', email: 'heidi@example.com', joined: '2024-05-12', avatar: 'https://placehold.co/48x48.png', dataAiHint: 'woman portrait' },
  { id: '9', name: 'Ivan Petrov', email: 'ivan@example.com', joined: '2024-05-15', avatar: 'https://placehold.co/48x48.png', dataAiHint: 'man portrait' },
];

export default function StudentsPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Users className="h-8 w-8" />
        <h1 className="text-3xl font-bold font-headline">Students</h1>
      </div>
      <p className="text-muted-foreground max-w-3xl">
        View and manage all students enrolled on the platform.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>A list of all registered students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} data-ai-hint={student.dataAiHint} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{new Date(student.joined).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
