import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTopic, getSubject } from '@/lib/data';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, ArrowRight } from 'lucide-react';

export default function TopicPage({ params }: { params: { subjectId: string; topicId: string } }) {
  const topic = getTopic(params.subjectId, params.topicId);

  if (!topic) {
    notFound();
  }

  const subject = getSubject(params.subjectId);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/courses">Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/courses/${params.subjectId}`}>{subject?.name || params.subjectId}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{topic.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">{topic.name}</h1>
        <Button asChild size="lg" className="group">
          <Link href={`/quiz/${topic.id}`}>
            <Target className="mr-2 h-5 w-5" />
            Test Your Knowledge
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Study Notes</CardTitle>
          <CardDescription>Review the key concepts for this topic.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {topic.notes}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
