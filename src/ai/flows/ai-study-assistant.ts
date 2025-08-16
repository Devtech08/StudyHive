
'use server';

/**
 * @fileOverview Provides an AI-powered explanation for a given concept.
 *
 * - getExplanation - A function that returns an explanation for a user's query.
 * - GetExplanationInput - The input type for the getExplanation function.
 * - GetExplanationOutput - The return type for the getExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetExplanationInputSchema = z.object({
  concept: z
    .string()
    .describe('The concept or question the user wants an explanation for.'),
});
export type GetExplanationInput = z.infer<typeof GetExplanationInputSchema>;

const GetExplanationOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A clear and concise explanation of the concept.'),
});
export type GetExplanationOutput = z.infer<typeof GetExplanationOutputSchema>;

export async function getExplanation(
  input: GetExplanationInput
): Promise<GetExplanationOutput> {
  return getExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getExplanationPrompt',
  input: {schema: GetExplanationInputSchema},
  output: {schema: GetExplanationOutputSchema},
  prompt: `You are a friendly and helpful AI study assistant. A student has asked for an explanation of a concept.

Provide a clear, concise, and easy-to-understand explanation for the following concept:

Concept: {{{concept}}}

Keep the explanation focused and suitable for a student who is learning this for the first time.`,
});

const getExplanationFlow = ai.defineFlow(
  {
    name: 'getExplanationFlow',
    inputSchema: GetExplanationInputSchema,
    outputSchema: GetExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
