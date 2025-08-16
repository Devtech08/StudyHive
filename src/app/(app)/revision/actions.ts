'use server';

import { z } from 'zod';
import { generateAiRevisionPrompts } from '@/ai/flows/ai-revision-prompts';

const formSchema = z.object({
  weakTopics: z.string().min(3, 'Please enter at least one weak topic.'),
  upcomingQuizzes: z.string().min(3, 'Please enter at least one upcoming quiz.'),
});

export async function generateAiRevisionPromptsAction(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    weakTopics: formData.get('weakTopics'),
    upcomingQuizzes: formData.get('upcomingQuizzes'),
  });

  if (!validatedFields.success) {
    return {
      prompts: null,
      error: 'Invalid input. Please provide more details.',
    };
  }
  
  try {
    const result = await generateAiRevisionPrompts(validatedFields.data);
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
