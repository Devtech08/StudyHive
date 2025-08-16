
'use server';
/**
 * @fileOverview A flow for generating a mock exam.
 *
 * - generateMockExam: A function that creates a mock exam for a given subject.
 * - MockExamInput: The input type for the mock exam generation.
 * - MockExam: The output type representing the generated exam.
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

const MockExamSchema = z.object({
  title: z.string().describe('The title of the mock exam.'),
  questions: z.array(QuestionSchema).describe('An array of questions for the exam.'),
});

const MockExamInputSchema = z.object({
    subject: z.string().describe("The subject for which to generate the mock exam.")
});

export type MockExam = z.infer<typeof MockExamSchema>;
export type MockExamInput = z.infer<typeof MockExamInputSchema>;
export type Question = z.infer<typeof QuestionSchema>;


export async function generateMockExam(input: MockExamInput): Promise<MockExam> {
  return generateMockExamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMockExamPrompt',
  input: { schema: MockExamInputSchema },
  output: { schema: MockExamSchema },
  prompt: `You are an expert exam creator for students. Generate a comprehensive mock exam for the subject: {{{subject}}}.

The exam should include a mix of question types:
- 5 multiple-choice questions
- 3 true/false questions
- 2 short-answer questions

For each question, provide the question text, the options (if applicable), the correct answer, the question type, and a brief explanation for the correct answer. The exam should have a suitable title.
`,
});

const generateMockExamFlow = ai.defineFlow(
  {
    name: 'generateMockExamFlow',
    inputSchema: MockExamInputSchema,
    outputSchema: MockExamSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
