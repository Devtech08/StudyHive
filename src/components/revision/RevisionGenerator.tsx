'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateAiRevisionPromptsAction } from '@/app/(app)/revision/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Bot } from 'lucide-react';
import { Input } from '../ui/input';

const initialState = {
  prompts: null,
  error: null,
};

const weakTopicsPlaceholder = "e.g., Geometry, Ancient Civilizations";
const upcomingQuizzesPlaceholder = "e.g., Biology Chapter 5 (Tomorrow), History Mid-Term (Friday)";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        'Generating...'
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Prompts
        </>
      )}
    </Button>
  );
}

export default function RevisionGenerator() {
  const [state, formAction] = useFormState(generateAiRevisionPromptsAction, initialState);

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Personalized Revision Plan</CardTitle>
        <CardDescription>
          Enter your weak topics and upcoming quizzes to get AI-generated revision prompts.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div className="grid w-full gap-2">
            <Label htmlFor="weakTopics">Weak Topics</Label>
            <Input
              id="weakTopics"
              name="weakTopics"
              placeholder={weakTopicsPlaceholder}
              required
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="upcomingQuizzes">Upcoming Quizzes</Label>
            <Input
              id="upcomingQuizzes"
              name="upcomingQuizzes"
              placeholder={upcomingQuizzesPlaceholder}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
      
      {state.prompts && (
        <CardContent>
            <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Bot className="h-6 w-6"/>
                        Your AI-Generated Prompts
                    </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
                    {state.prompts}
                </CardContent>
            </Card>
        </CardContent>
      )}

      {state.error && (
        <CardContent>
            <p className="text-destructive">{state.error}</p>
        </CardContent>
      )}
    </Card>
  );
}
