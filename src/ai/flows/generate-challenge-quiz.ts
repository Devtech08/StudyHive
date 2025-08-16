
'use server';
/**
 * @fileOverview A flow for generating a short, fun challenge quiz.
 *
 * - generateChallengeQuiz: A function that creates a challenge quiz.
 * - ChallengeQuiz: The output type representing the generated quiz.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuestionSchema = z.object({
  questionText: z.string().describe('The text of the question.'),
  options: z.array(z.string()).optional().describe('A list of possible answers for multiple-choice questions.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  type: z.enum(['multiple-choice', 'true-false', 'short-answer']).describe('The type of the question.'),
  explanation: z.string().describe('A brief explanation for the correct answer.'),
});

const ChallengeQuizSchema = z.object({
  title: z.string().describe('The title of the challenge quiz.'),
  questions: z.array(QuestionSchema).describe('An array of questions for the quiz.'),
});

export type ChallengeQuiz = z.infer<typeof ChallengeQuizSchema>;

export async function generateChallengeQuiz(): Promise<ChallengeQuiz> {
  return generateChallengeQuizFlow();
}

const prompt = ai.definePrompt({
  name: 'generateChallengeQuizPrompt',
  output: { schema: ChallengeQuizSchema },
  prompt: `You are an expert quiz master who creates fun and engaging challenges. Generate a short challenge quiz with a fun title.

The quiz should include a mix of 5 questions from various subjects like science, history, and math. The questions should be a mix of difficulties.

For each question, provide the question text, options (if applicable), the correct answer, the question type, and a brief explanation.
`,
});

const generateChallengeQuizFlow = ai.defineFlow(
  {
    name: 'generateChallengeQuizFlow',
    outputSchema: ChallengeQuizSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);

    