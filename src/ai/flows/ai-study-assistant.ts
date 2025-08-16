'use server';

/**
 * @fileOverview AI-powered study assistant to explain concepts.
 *
 * - explainConcept - A function that provides an explanation for a given concept.
 * - ExplainConceptInput - The input type for the explainConcept function.
 * - ExplainConceptOutput - The return type for the explainConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.object({
  concept: z
    .string()
    .describe('The concept the user wants an explanation for.'),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A clear and concise explanation of the concept, suitable for a student.'
    ),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConcept(
  input: ExplainConceptInput
): Promise<ExplainConceptOutput> {
  return explainConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are an AI Study Assistant. A student will ask you to explain a concept. Your goal is to provide a clear, simple, and easy-to-understand explanation.

Concept: {{{concept}}}

Explain the concept in a way that a high school or early university student can grasp. Use analogies or simple examples if they help clarify the idea.`,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
