
'use server';
/**
 * @fileOverview A flow for generating a personalized weekly study plan.
 *
 * - generateStudyPlan: A function that creates a 7-day study schedule.
 * - StudyPlanInput: The input type for the study plan generation.
 * - StudyPlan: The output type representing the generated plan.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StudyPlanInputSchema = z.object({
  subject: z.string().describe('The main subject the user is studying.'),
  weakTopics: z.array(z.string()).describe('A list of topics the user finds difficult.'),
});

const TaskSchema = z.object({
    task: z.string().describe("A specific, actionable study task for the day."),
    activity: z.enum(["review", "practice", "read", "quiz"]).describe("The type of activity for the task.")
});

const StudyPlanSchema = z.object({
  weeklyPlan: z.array(z.record(z.string(), z.array(TaskSchema))).describe("A 7-day study plan, with each day (e.g., 'day1', 'day2') as a key containing an array of tasks."),
});

export type StudyPlan = z.infer<typeof StudyPlanSchema>;
export type StudyPlanInput = z.infer<typeof StudyPlanInputSchema>;


export async function generateStudyPlan(input: StudyPlanInput): Promise<StudyPlan> {
  return generateStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyPlanPrompt',
  input: { schema: StudyPlanInputSchema },
  output: { schema: StudyPlanSchema },
  prompt: `You are an expert academic advisor. Create a personalized 7-day study plan for a student studying {{{subject}}}.

The student has identified the following weak topics:
{{#each weakTopics}}
- {{{this}}}
{{/each}}

The plan should be structured for a full week (day1, day2, etc.). For each day, provide a few specific, actionable tasks. Focus on covering the weak topics early in the week and then move to revision and practice quizzes. Ensure a mix of activities: reading chapters, reviewing notes, practicing problems, and taking short quizzes.
`,
});

const generateStudyPlanFlow = ai.defineFlow(
  {
    name: 'generateStudyPlanFlow',
    inputSchema: StudyPlanInputSchema,
    outputSchema: StudyPlanSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
