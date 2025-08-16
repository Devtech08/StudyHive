'use server';

/**
 * @fileOverview AI-powered revision prompt generator tailored to weak areas and upcoming quizzes.
 *
 * - generateAiRevisionPrompts - A function that generates personalized revision prompts based on weak areas and upcoming quizzes.
 * - GenerateAiRevisionPromptsInput - The input type for the generateAiRevisionPrompts function.
 * - GenerateAiRevisionPromptsOutput - The return type for the generateAiRevisionPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiRevisionPromptsInputSchema = z.object({
  weakTopics: z
    .string()
    .describe('A comma-separated list of topics the student is weak in.'),
  upcomingQuizzes: z
    .string()
    .describe(
      'A comma-separated list of upcoming quizzes, including the topic and date.'
    ),
});
export type GenerateAiRevisionPromptsInput = z.infer<typeof GenerateAiRevisionPromptsInputSchema>;

const GenerateAiRevisionPromptsOutputSchema = z.object({
  revisionPrompts: z
    .string()
    .describe(
      'A list of personalized revision prompts tailored to the students weak areas and upcoming quizzes.'
    ),
});
export type GenerateAiRevisionPromptsOutput = z.infer<typeof GenerateAiRevisionPromptsOutputSchema>;

export async function generateAiRevisionPrompts(
  input: GenerateAiRevisionPromptsInput
): Promise<GenerateAiRevisionPromptsOutput> {
  return generateAiRevisionPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAiRevisionPromptsPrompt',
  input: {schema: GenerateAiRevisionPromptsInputSchema},
  output: {schema: GenerateAiRevisionPromptsOutputSchema},
  prompt: `You are an AI-powered revision prompt generator. You will generate personalized revision prompts for the student based on their weak topics and upcoming quizzes.

Weak Topics: {{{weakTopics}}}
Upcoming Quizzes: {{{upcomingQuizzes}}}

Generate a list of revision prompts that will help the student focus on areas where they need the most improvement, and prepare them for their upcoming quizzes. The prompts should be specific and actionable.`,
});

const generateAiRevisionPromptsFlow = ai.defineFlow(
  {
    name: 'generateAiRevisionPromptsFlow',
    inputSchema: GenerateAiRevisionPromptsInputSchema,
    outputSchema: GenerateAiRevisionPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
