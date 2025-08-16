import type { Subject } from './types';
import { Book, Dna, Landmark } from 'lucide-react';

export const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Book,
    topics: [
      {
        id: 'algebra',
        name: 'Algebra',
        notes: `
## Introduction to Algebra
Algebra is a branch of mathematics that substitutes letters for numbers. An algebraic equation represents a scale, what is done on one side of the scale with a number is also done to the other side of thescale. The numbers are the constants.

### Key Concepts
- **Variables:** Symbols, usually letters, that represent a quantity that can change.
- **Constants:** Fixed values, like 2, 7, or π.
- **Coefficients:** A numerical or constant quantity placed before and multiplying the variable in an algebraic expression (e.g., the ‘4’ in 4x).
- **Expressions:** A combination of variables, constants, and operators (e.g., 2x + 3).
- **Equations:** A statement that the values of two mathematical expressions are equal (e.g., 2x + 3 = 7).
`,
        quiz: [
          {
            id: 'q1',
            questionText: 'What is a variable in algebra?',
            options: ['A fixed value', 'A symbol for a number we don\'t know yet', 'The answer to the problem', 'A mathematical operation'],
            correctAnswer: 'A symbol for a number we don\'t know yet',
            type: 'multiple-choice',
            explanation: 'A variable is a symbol (usually a letter) that represents an unknown value or a quantity that can change.'
          },
          {
            id: 'q2',
            questionText: 'In the expression 5x - 2, the number 5 is the coefficient.',
            options: ['True', 'False'],
            correctAnswer: 'True',
            type: 'true-false',
            explanation: 'The coefficient is the number that is multiplied by the variable. In this case, 5 is multiplied by x.'
          },
        ],
      },
      {
        id: 'geometry',
        name: 'Geometry',
        notes: `
## Introduction to Geometry
Geometry is a branch of mathematics concerned with properties of space such as the distance, shape, size, and relative position of figures.

### Basic Elements
- **Points:** A location in space, with no dimensions.
- **Lines:** A straight one-dimensional figure that has no thickness and extends endlessly in both directions.
- **Planes:** A flat, two-dimensional surface that extends infinitely far.
`,
        quiz: [
           {
            id: 'q1',
            questionText: 'How many dimensions does a point have?',
            options: ['0', '1', '2', '3'],
            correctAnswer: '0',
            type: 'multiple-choice',
            explanation: 'A point represents a specific location in space but has no dimension (no length, width, or height).'
          },
        ],
      },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: Dna,
    topics: [
      {
        id: 'cell-biology',
        name: 'Cell Biology',
        notes: `
## The Cell
The cell is the basic structural, functional, and biological unit of all known organisms. A cell is the smallest unit of life.

### Types of Cells
- **Prokaryotic Cells:** Lack a nucleus and other membrane-bound organelles.
- **Eukaryotic Cells:** Contain a nucleus and membrane-bound organelles.
`,
        quiz: [
           {
            id: 'q1',
            questionText: 'Which type of cell lacks a nucleus?',
            options: ['Eukaryotic', 'Prokaryotic', 'Both', 'Neither'],
            correctAnswer: 'Prokaryotic',
            type: 'multiple-choice',
            explanation: 'Prokaryotic cells are defined by the absence of a membrane-bound nucleus.'
          },
        ],
      },
    ],
  },
  {
    id: 'history',
    name: 'History',
    icon: Landmark,
    topics: [
      {
        id: 'ancient-civilizations',
        name: 'Ancient Civilizations',
        notes: `
## Ancient Civilizations
An ancient civilization is a topic that deals with the first settled and stable communities that became the basis for later states, nations, and empires.

### Examples
- **Mesopotamia:** Known as the "Cradle of Civilization".
- **Ancient Egypt:** Famous for its pyramids and pharaohs.
- **Indus Valley Civilization:** One of the most widespread civilizations.
`,
        quiz: [
           {
            id: 'q1',
            questionText: 'The pyramids are associated with which ancient civilization?',
            options: ['Mesopotamia', 'Ancient Egypt', 'Indus Valley', 'Ancient Rome'],
            correctAnswer: 'Ancient Egypt',
            type: 'multiple-choice',
            explanation: 'The great pyramids of Giza are iconic symbols of Ancient Egypt, built as tombs for pharaohs.'
          },
        ],
      },
    ],
  },
];

export const getSubject = (id: string) => subjects.find((s) => s.id === id);
export const getTopic = (subjectId: string, topicId: string) => {
  const subject = getSubject(subjectId);
  return subject?.topics.find((t) => t.id === topicId);
};
