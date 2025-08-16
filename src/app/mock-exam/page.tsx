
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { MockExam, Question } from '@/ai/flows/generate-mock-exam';
import { ArrowLeft, Check, Clock } from 'lucide-react';

export default function MockExamPage() {
  const [exam, setExam] = useState<MockExam | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const examData = localStorage.getItem('mockExam');
    if (examData) {
      try {
        const parsedExam = JSON.parse(examData);
        setExam(parsedExam);
      } catch (error) {
        console.error("Failed to parse mock exam data from localStorage", error);
        router.push('/ai-revision');
      }
    } else {
      router.push('/ai-revision');
    }
    setLoading(false);
  }, [router]);

  if (loading || !exam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading exam...</p>
      </div>
    );
  }

  const renderQuestion = (question: Question, index: number) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup>
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q${index}-option${i}`} />
                <Label htmlFor={`q${index}-option${i}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'true-false':
        return (
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`q${index}-true`} />
              <Label htmlFor={`q${index}-true`}>True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`q${index}-false`} />
              <Label htmlFor={`q${index}-false`}>False</Label>
            </div>
          </RadioGroup>
        );
      case 'short-answer':
        return <Textarea placeholder="Your answer..." />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Revision Studio
        </Button>
        <div className="flex-1 text-center text-lg font-semibold">
          {exam.title}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>60:00</span>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="container mx-auto">
          <div className="space-y-8">
            {exam.questions.map((question, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Question {index + 1}</CardTitle>
                  <CardDescription>{question.questionText}</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderQuestion(question, index)}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Button size="lg">
              <Check className="w-5 h-5 mr-2" />
              Submit Exam
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

