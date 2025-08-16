'use server';

/**
 * @fileOverview AI-powered revision prompt generator.
 *
 * - generateRevisionPrompts - A function that generates personalized revision prompts.
 * - GenerateRevisionPromptsInput - The input type for the generateRevisionPrompts function.
 * - GenerateRevisionPromptsOutput - The return type for the generateRevisionPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRevisionPromptsInputSchema = z.object({
  performanceData: z
    .string()
    .describe(
      'A summary of the student performance, including accuracy, strong topics, and weak topics.'
    ),
  studySchedule: z
    .string()
    .describe('The student study schedule, including time and subjects.'),
});
export type GenerateRevisionPromptsInput = z.infer<typeof GenerateRevisionPromptsInputSchema>;

const GenerateRevisionPromptsOutputSchema = z.object({
  revisionPrompts: z
    .string()
    .describe('A list of personalized revision prompts for the student.'),
});
export type GenerateRevisionPromptsOutput = z.infer<typeof GenerateRevisionPromptsOutputSchema>;

export async function generateRevisionPrompts(
  input: GenerateRevisionPromptsInput
): Promise<GenerateRevisionPromptsOutput> {
  return generateRevisionPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRevisionPromptsPrompt',
  input: {schema: GenerateRevisionPromptsInputSchema},
  output: {schema: GenerateRevisionPromptsOutputSchema},
  prompt: `You are an AI-powered revision prompt generator. You will generate personalized revision prompts for the student based on their performance data and study schedule.

Performance Data: {{{performanceData}}}
Study Schedule: {{{studySchedule}}}

Generate a list of revision prompts that will help the student focus on areas where they need the most improvement.`,
});

const generateRevisionPromptsFlow = ai.defineFlow(
  {
    name: 'generateRevisionPromptsFlow',
    inputSchema: GenerateRevisionPromptsInputSchema,
    outputSchema: GenerateRevisionPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
