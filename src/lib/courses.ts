import { Atom, Mic, TestTube, Landmark, Palette, Code, Calculator } from 'lucide-react';

export const subjects = [
  {
    id: 'science',
    name: 'Science',
    icon: Atom,
    courses: [
      {
        id: 'biology-101',
        title: 'Biology 101',
        instructor: 'Dr. Jane Goodall',
        thumbnail: 'https://i.pinimg.com/736x/17/d5/a4/17d5a43f2220a95895e653842c960b8d.jpg',
        dataAiHint: 'biology microscope',
        description: 'Explore the fundamental principles of life, from cellular structures to complex ecosystems.',
        objectives: [
            'Understand the core concepts of cell theory.',
            'Describe the processes of photosynthesis and cellular respiration.',
            'Identify major organ systems in the human body.',
            'Analyze basic principles of genetics and inheritance.',
        ],
        modules: [
          {
            id: 'module-1',
            title: 'Module 1: The Basics of Life',
            topics: [
              { id: 'topic-1-1', title: 'Introduction to Biology', completed: true },
              { id: 'topic-1-2', title: 'The Chemistry of Life', completed: true },
              { id: 'topic-1-3', title: 'Cell Structure and Function', completed: false },
            ],
          },
          {
            id: 'module-2',
            title: 'Module 2: Genetics',
            topics: [
                { id: 'topic-2-1', title: 'DNA and RNA', completed: false },
                { id: 'topic-2-2', title: 'Meiosis and Mitosis', completed: false },
            ],
          }
        ],
      },
      {
        id: 'chemistry-basics',
        title: 'Chemistry Basics',
        instructor: 'Dr. Marie Curie',
        thumbnail: 'https://i.pinimg.com/736x/42/71/78/4271784fbd83c7e8d9099c4aecef7e34.jpg',
        dataAiHint: 'chemistry beakers',
        description: 'A foundational course on the properties, composition, and structure of matter.',
        objectives: [],
        modules: [
           {
            id: 'chem-mod-1',
            title: 'Module 1: Introduction',
            topics: [
              { id: 'chem-topic-1-1', title: 'What is Chemistry?', completed: false },
            ],
           }
        ],
      },
    ],
  },
  {
    id: 'math',
    name: 'Mathematics',
    icon: Calculator,
    courses: [
        {
            id: 'algebra-basics',
            title: 'Algebra Basics',
            instructor: 'Prof. Leonhard Euler',
            thumbnail: 'https://i.pinimg.com/1200x/91/11/bc/9111bc0e90a07e55501cbe234dda9f5b.jpg',
            dataAiHint: 'math equations',
            description: 'Learn the fundamentals of algebra, including variables, equations, and functions.',
            objectives: [],
            modules: [
                {
                    id: 'alg-mod-1',
                    title: 'Module 1: Foundations',
                    topics: [
                      { id: 'alg-topic-1-1', title: 'Intro to Variables', completed: true },
                      { id: 'alg-topic-1-2', title: 'Solving Equations', completed: false },
                    ],
                }
            ],
        },
        {
            id: 'geometry-intro',
            title: 'Introduction to Geometry',
            instructor: 'Pythagoras',
            thumbnail: 'https://i.pinimg.com/1200x/fc/56/73/fc5673761b7056163e2c60c074eb1af5.jpg',
            dataAiHint: 'geometric shapes',
            description: 'Discover the world of shapes, angles, and spatial reasoning.',
            objectives: [],
            modules: [
                {
                    id: 'geo-mod-1',
                    title: 'Module 1: Shapes',
                    topics: [
                        { id: 'geo-topic-1-1', title: 'Circles', completed: true },
                        { id: 'geo-topic-1-2', title: 'Triangles', completed: true },
                        { id: 'geo-topic-1-3', title: 'Squares', completed: false },
                    ],
                }
            ],
        }
    ]
  },
  {
    id: 'history',
    name: 'History',
    icon: Landmark,
    courses: [
        {
            id: 'world-history-i',
            title: 'World History I',
            instructor: 'Dr. Herodotus',
            thumbnail: 'https://i.pinimg.com/1200x/16/25/19/1625194cb44c312f7d2083ecc69e30dc.jpg',
            dataAiHint: 'ancient ruins',
            description: 'A survey of major global events from ancient civilizations to the pre-modern era.',
            objectives: [],
            modules: [],
        }
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: Code,
    courses: [
        {
            id: 'intro-to-coding',
            title: 'Introduction to Coding',
            instructor: 'Ada Lovelace',
            thumbnail: 'https://i.pinimg.com/1200x/ce/a1/89/cea18960e037ac9aaa880eda471e2c34.jpg',
            dataAiHint: 'code editor',
            description: 'Start your journey into the world of programming. No prior experience required!',
            objectives: [],
            modules: [
                 {
                    id: 'code-mod-1',
                    title: 'Module 1: First Steps',
                    topics: [
                        { id: 'code-topic-1-1', title: 'Hello World', completed: true },
                        { id: 'code-topic-1-2', title: 'Variables', completed: true },
                        { id: 'code-topic-1-3', title: 'Functions', completed: true },
                    ],
                }
            ],
        }
    ]
  }
];

export const getSubject = (subjectId: string) => subjects.find(s => s.id === subjectId);

export const getCourse = (subjectId: string, courseId: string) => {
    const subject = getSubject(subjectId);
    return subject?.courses.find(c => c.id === courseId);
}

export const getTopic = (subjectId: string, courseId: string, moduleId: string, topicId: string) => {
    const course = getCourse(subjectId, courseId);
    const module = course?.modules.find(m => m.id === moduleId);
    return module?.topics.find(t => t.id === topicId);
}
