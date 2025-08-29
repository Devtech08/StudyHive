import { Atom, Mic, TestTube, Landmark, Palette, Code, Calculator } from 'lucide-react';

export const subjects = [
  {
    id: 'science',
    name: 'Science',
    icon: Atom,
    courses: [
      {
        id: 'biology-101',
        title: 'Biology',
        instructor: 'Dr. Jane Goodall',
        thumbnail: 'https://i.pinimg.com/1200x/ec/0f/c0/ec0fc0417629ebf71d36bf044fa183ec.jpg',
        dataAiHint: 'biology dna',
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
              { id: 'topic-1-1', title: 'Introduction to Biology', completed: false },
              { id: 'topic-1-2', title: 'The Chemistry of Life', completed: false },
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
        title: 'Chemistry',
        instructor: 'Dr. Marie Curie',
        thumbnail: 'https://i.pinimg.com/736x/dc/cf/47/dccf47c2bf129ee8a1c01fa649ae931b.jpg',
        dataAiHint: 'chemistry lab',
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
            title: 'Algebra',
            instructor: 'Prof. Leonhard Euler',
            thumbnail: 'https://i.pinimg.com/736x/b0/49/a4/b049a47b8921c25565af202cd689457d.jpg',
            dataAiHint: 'mathematics chalkboard',
            description: 'Learn the fundamentals of algebra, including variables, equations, and functions.',
            objectives: [],
            modules: [
                {
                    id: 'alg-mod-1',
                    title: 'Module 1: Foundations',
                    topics: [
                      { id: 'alg-topic-1-1', title: 'Intro to Variables', completed: false },
                      { id: 'alg-topic-1-2', title: 'Solving Equations', completed: false },
                    ],
                }
            ],
        },
        {
            id: 'geometry-intro',
            title: 'Introduction to Geometry',
            instructor: 'Pythagoras',
            thumbnail: 'https://i.pinimg.com/1200x/b9/d3/a3/b9d3a344e8724038845f0473a6f2fafe.jpg',
            dataAiHint: 'geometry shapes',
            description: 'Discover the world of shapes, angles, and spatial reasoning.',
            objectives: [],
            modules: [
                {
                    id: 'geo-mod-1',
                    title: 'Module 1: Shapes',
                    topics: [
                        { id: 'geo-topic-1-1', title: 'Circles', completed: false },
                        { id: 'geo-topic-1-2', title: 'Triangles', completed: false },
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
            thumbnail: 'https://i.pinimg.com/1200x/5f/15/9d/5f159d0e97d41525be726c0648d9a0a2.jpg',
            dataAiHint: 'world map',
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
            thumbnail: 'https://i.pinimg.com/736x/ee/24/dc/ee24dce0283929c91feb548df0a2f9ad.jpg',
            dataAiHint: 'code editor',
            description: 'Start your journey into the world of programming. No prior experience required!',
            objectives: [],
            modules: [
                 {
                    id: 'code-mod-1',
                    title: 'Module 1: First Steps',
                    topics: [
                        { id: 'code-topic-1-1', title: 'Hello World', completed: false },
                        { id: 'code-topic-1-2', title: 'Variables', completed: false },
                        { id: 'code-topic-1-3', title: 'Functions', completed: false },
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
