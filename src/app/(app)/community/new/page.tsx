import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { subjects } from '@/lib/data';
import { PenSquare } from 'lucide-react';
import { createDiscussionAction } from './actions';

export default function NewDiscussionPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Discussion</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <form action={createDiscussionAction}>
        <Card className="mx-auto max-w-3xl">
            <CardHeader>
            <div className="flex items-center gap-4">
                <PenSquare className="h-8 w-8" />
                <div>
                    <CardTitle className="font-headline text-2xl">Start a New Discussion</CardTitle>
                    <CardDescription>Share your question or thoughts with the community.</CardDescription>
                </div>
            </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="e.g., 'How do I solve for x in this equation?'" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select name="subject" required>
                        <SelectTrigger id="subject">
                            <SelectValue placeholder="Select a subject..." />
                        </SelectTrigger>
                        <SelectContent>
                            {subjects.map((subject) => (
                                <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea id="message" name="message" placeholder="Provide more details here..." rows={8} required />
                </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/community">Cancel</Link>
                </Button>
                <Button type="submit">Post Discussion</Button>
            </CardFooter>
        </Card>
      </form>
    </div>
  );
}
