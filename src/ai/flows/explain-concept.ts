
'use server';
/**
 * @fileOverview A flow for explaining a concept to a student.
 *
 * - explainConcept: A function that provides a simple explanation for a given query.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainConceptInputSchema = z.string();
const ExplainConceptOutputSchema = z.string();

export async function explainConcept(query: string): Promise<string> {
  return explainConceptFlow(query);
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: { schema: ExplainConceptInputSchema },
  output: { schema: ExplainConceptOutputSchema },
  prompt: `You are an expert tutor AI. A student has asked you to explain a concept. 
  
Query: "{{{prompt}}}"

Provide a clear, simple, and concise explanation suitable for a student. Break down complex ideas into smaller, easy-to-understand parts. Use analogies if they are helpful.`,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async (query) => {
    const { output } = await prompt(query);
    return output!;
  }
);

    