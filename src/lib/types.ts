export type User = {
  email: string;
};

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'true-false';
  explanation: string;
}

export interface Topic {
  id: string;
  name: string;
  notes: string;
  quiz: Question[];
}

export interface Subject {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  topics: Topic[];
}
