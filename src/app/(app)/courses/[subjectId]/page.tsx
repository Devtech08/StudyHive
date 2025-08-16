import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubject } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
  const subject = getSubject(params.subjectId);

  if (!subject) {
    notFound();
  }

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
            <BreadcrumbPage className="font-medium">{subject.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">{subject.name}</h1>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {subject.topics.map((topic) => (
          <AccordionItem key={topic.id} value={topic.id}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline">
              {topic.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-2">
                <p className="text-muted-foreground">
                  Click to view detailed notes and test your knowledge on {topic.name}.
                </p>
                <Button asChild>
                  <Link href={`/courses/${subject.id}/${topic.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    Read Notes
                    <ArrowRight className="ml-2 h-4 w-4"/>
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
