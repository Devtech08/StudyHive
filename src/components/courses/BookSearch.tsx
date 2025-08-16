
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { searchBooksAction } from '@/app/(app)/courses/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Book, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const initialState = {
  books: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Searching...' : <><Search className="mr-2 h-4 w-4" /> Search</>}
    </Button>
  );
}

export default function BookSearch() {
  const [state, formAction] = useFormState(searchBooksAction, initialState);

  return (
    <div className="max-w-4xl">
      <form action={formAction} className="flex gap-2 mb-6">
        <Input
          name="query"
          placeholder="e.g., 'Introduction to Calculus', 'Shakespearean Literature'..."
          required
        />
        <SubmitButton />
      </form>

      {state?.error && <p className="text-destructive">{state.error}</p>}

      {state?.books && (
        <div>
          <h3 className="text-2xl font-bold font-headline mb-4">Search Results</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {state.books.map((book, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">{book.title}</CardTitle>
                  <CardDescription>by {book.author}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href={book.link} target="_blank" rel="noopener noreferrer">
                      View Online <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
