
'use server';

/**
 * @fileOverview AI-powered book search.
 *
 * - searchBooks - A function that finds books based on a query.
 * - SearchBooksInput - The input type for the searchBooks function.
 * - SearchBooksOutput - The return type for the searchBooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SearchBooksInputSchema = z.object({
  query: z.string().describe('The search query for books.'),
});
export type SearchBooksInput = z.infer<typeof SearchBooksInputSchema>;

const BookSchema = z.object({
  title: z.string().describe('The title of the book.'),
  author: z.string().describe('The author of the book.'),
  link: z
    .string()
    .url()
    .describe('A URL to find the book online (e.g., Google Books, Amazon).'),
});

export const SearchBooksOutputSchema = z.object({
  books: z
    .array(BookSchema)
    .describe('A list of books found for the query.'),
});
export type SearchBooksOutput = z.infer<typeof SearchBooksOutputSchema>;

export async function searchBooks(input: SearchBooksInput): Promise<SearchBooksOutput> {
  return searchBooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchBooksPrompt',
  input: {schema: SearchBooksInputSchema},
  output: {schema: SearchBooksOutputSchema},
  prompt: `You are an expert academic librarian. A student is looking for books related to a topic. Your task is to find 3 to 5 relevant books for their query. Provide a direct link to an online source where they can find the book, like Google Books or Amazon.

Topic: {{{query}}}

Provide a list of books that are highly relevant to this topic.`,
});

const searchBooksFlow = ai.defineFlow(
  {
    name: 'searchBooksFlow',
    inputSchema: SearchBooksInputSchema,
    outputSchema: SearchBooksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
