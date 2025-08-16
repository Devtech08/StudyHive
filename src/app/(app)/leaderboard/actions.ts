'use server';

import { z } from 'zod';
import { explainConcept } from '@/ai/flows/ai-study-assistant';

const formSchema = z.object({
  concept: z.string().min(3, 'Concept is too short.'),
});

export async function getExplanationAction(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    concept: formData.get('concept'),
  });

  if (!validatedFields.success) {
    return {
      explanation: null,
      error: 'Invalid input. Please provide a concept to explain.',
    };
  }
  
  try {
    const result = await explainConcept(validatedFields.data);
    return {
      explanation: result.explanation,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      explanation: null,
      error: 'Failed to get explanation. Please try again later.',
    };
  }
}
