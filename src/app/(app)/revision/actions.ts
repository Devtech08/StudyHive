'use server';

import { z } from 'zod';
import { generateRevisionPrompts } from '@/ai/flows/generate-revision-prompts';

const formSchema = z.object({
  performanceData: z.string().min(10, 'Performance data is too short.'),
  studySchedule: z.string().min(10, 'Study schedule is too short.'),
});

export async function generateRevisionPromptsAction(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    performanceData: formData.get('performanceData'),
    studySchedule: formData.get('studySchedule'),
  });

  if (!validatedFields.success) {
    return {
      prompts: null,
      error: 'Invalid input. Please provide more details.',
    };
  }
  
  try {
    const result = await generateRevisionPrompts(validatedFields.data);
    return {
      prompts: result.revisionPrompts,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      prompts: null,
      error: 'Failed to generate prompts. Please try again later.',
    };
  }
}
