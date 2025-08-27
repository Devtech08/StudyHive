
'use server';
/**
 * @fileOverview A flow for explaining a concept to a student conversationally.
 *
 * - explainConcept: A function that provides a simple explanation for a given query, considering chat history.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'bot']),
  content: z.string(),
});

const ExplainConceptInputSchema = z.object({
  history: z.array(MessageSchema),
});

const ExplainConceptOutputSchema = z.string().default('');

export type Message = z.infer<typeof MessageSchema>;
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

export async function explainConcept(input: ExplainConceptInput): Promise<string> {
  return explainConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: { schema: ExplainConceptInputSchema },
  output: { schema: ExplainConceptOutputSchema },
  prompt: `You are an expert tutor AI engaging in a conversation with a student. Use the chat history to provide a relevant and helpful response to the latest query. Keep your explanations clear, simple, and concise.

Chat History:
{{#each history}}
- {{role}}: {{{content}}}
{{/each}}

Based on this conversation, provide a helpful response to the student's last message.`,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
