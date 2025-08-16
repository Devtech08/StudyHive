
'use server';

import { getExplanation } from '@/ai/flows/ai-study-assistant';

export async function getExplanationAction(
  prevState: any,
  formData: FormData
) {
  const concept = formData.get('concept') as string;

  if (!concept) {
    return {
      explanation: null,
      error: 'Please enter a concept to get an explanation.',
    };
  }

  try {
    const { explanation } = await getExplanation({ concept });
    return {
      explanation,
      error: null,
    };
  } catch (e: any) {
    console.error(e);
    return {
      explanation: null,
      error: 'Something went wrong. Please try again later.',
    };
  }
}
