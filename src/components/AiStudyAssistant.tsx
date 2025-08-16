'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getExplanationAction } from '@/app/(app)/leaderboard/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Send, User } from 'lucide-react';

const initialState = {
  explanation: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
        {pending ? <Bot className="animate-spin" /> : <Send />}
    </Button>
  );
}

export default function AiStudyAssistant() {
  const [state, formAction] = useFormState(getExplanationAction, initialState);
  const [history, setHistory] = React.useState<{query: string, response: string}[]>([]);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleFormAction = (formData: FormData) => {
    const query = formData.get('concept') as string;
    formAction(formData);
    setHistory(h => [...h, { query, response: ''}]);
  };
  
  React.useEffect(() => {
    if (state.explanation) {
       setHistory(h => {
           const newHistory = [...h];
           newHistory[newHistory.length - 1].response = state.explanation as string;
           return newHistory;
       });
       formRef.current?.reset();
    }
  }, [state.explanation]);


  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-4 h-64 overflow-y-auto pr-4">
             <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Bot />
                </div>
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">Hello! I'm your AI study assistant. What concept can I help you understand today?</p>
                </div>
            </div>
            {history.map((item, index) => (
                <React.Fragment key={index}>
                    <div className="flex items-start gap-3 justify-end">
                        <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">{item.query}</p>
                        </div>
                        <div className="p-2 rounded-full bg-muted/80">
                           <User />
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Bot />
                        </div>
                        <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">{item.response || "Thinking..."}</p>
                        </div>
                    </div>
                </React.Fragment>
            ))}
             {state.error && (
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-destructive/10 text-destructive">
                        <Bot />
                    </div>
                    <div className="bg-destructive/10 p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm text-destructive">{state.error}</p>
                    </div>
                </div>
             )}
          </div>
          <form ref={formRef} action={handleFormAction} className="flex gap-2">
            <Input
              id="concept"
              name="concept"
              placeholder="e.g., 'What is photosynthesis?'"
              required
            />
            <SubmitButton />
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
