'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  subject: z.string().min(1, 'Please select a subject.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

// This is a placeholder action. In a real app, you would save the data to a database.
export async function createDiscussionAction(formData: FormData) {
  const validatedFields = formSchema.safeParse({
    title: formData.get('title'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    // Handle validation errors, e.g., by returning them to the form.
    // For this demo, we'll just log them and redirect.
    console.error(validatedFields.error.flatten().fieldErrors);
  } else {
    // In a real application, you would save validatedFields.data to your database.
    console.log('New Discussion Data:', validatedFields.data);
  }

  // Redirect back to the community page after submission.
  redirect('/community');
}
