'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateRevisionPromptsAction } from '@/app/(app)/revision/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Bot } from 'lucide-react';

const initialState = {
  prompts: null,
  error: null,
};

const performanceDataPlaceholder = "Accuracy: 75%\nStrong Topics: Algebra, Cell Biology\nWeak Topics: Geometry, Ancient Civilizations";
const studySchedulePlaceholder = "Monday: 7 PM - 9 PM (Mathematics)\nWednesday: 6 PM - 8 PM (History)\nFriday: 5 PM - 7 PM (Biology)";

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
  const [state, formAction] = useFormState(generateRevisionPromptsAction, initialState);

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Personalized Revision Plan</CardTitle>
        <CardDescription>
          Enter your performance data and study schedule to get AI-generated revision prompts.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div className="grid w-full gap-2">
            <Label htmlFor="performanceData">Performance Data</Label>
            <Textarea
              id="performanceData"
              name="performanceData"
              placeholder={performanceDataPlaceholder}
              rows={4}
              defaultValue={performanceDataPlaceholder}
              required
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="studySchedule">Study Schedule</Label>
            <Textarea
              id="studySchedule"
              name="studySchedule"
              placeholder={studySchedulePlaceholder}
              rows={4}
              defaultValue={studySchedulePlaceholder}
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
