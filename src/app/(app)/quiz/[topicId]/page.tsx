import { notFound } from 'next/navigation';
import { getSubject, subjects } from '@/lib/data';
import QuizComponent from '@/components/quiz/QuizComponent';
import type { Question } from '@/lib/types';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function QuizPage({ params }: { params: { topicId: string } }) {
  let quiz: Question[] | undefined;
  let topicName: string | undefined;
  let subjectId: string | undefined;
  let subjectName: string | undefined;

  for (const subject of subjects) {
    const topic = subject.topics.find((t) => t.id === params.topicId);
    if (topic) {
      quiz = topic.quiz;
      topicName = topic.name;
      subjectId = subject.id;
      subjectName = subject.name;
      break;
    }
  }

  if (!quiz || !topicName || !subjectId || !subjectName) {
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
            <BreadcrumbLink asChild>
              <Link href={`/courses/${subjectId}`}>{subjectName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{topicName} Quiz</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold font-headline">{topicName} Quiz</h1>
      <QuizComponent quiz={quiz} />
    </div>
  );
}
