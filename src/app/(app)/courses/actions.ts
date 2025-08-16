
'use server';

import { searchBooks } from '@/ai/flows/search-books';
import { z } from 'zod';

const formSchema = z.object({
  query: z.string().min(3, 'Search query must be at least 3 characters.'),
});

export async function searchBooksAction(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      books: null,
      error: 'Invalid input. Please provide a valid search query.',
    };
  }

  try {
    const result = await searchBooks(validatedFields.data);
    return {
      books: result.books,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      books: null,
      error: 'Failed to search for books. Please try again later.',
    };
  }
}
