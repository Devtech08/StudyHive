# NoteWise - Technical Documentation

## 1. Introduction

### Purpose of the Application

NoteWise is an intelligent, AI-powered learning platform designed to help students study more effectively, retain information better, and engage with a community of learners. It addresses common challenges in modern education, such as information overload, lack of motivation, and one-size-fits-all learning models. By combining structured content, personalized AI assistance, and gamified community features, NoteWise provides a comprehensive solution for students to unlock their full academic potential.

### How It Helps Students

- **Structured Learning:** Organizes study materials into clear, manageable courses, modules, and topics, preventing students from feeling overwhelmed.
- **Personalized Revision:** The **AI Revision Studio** leverages generative AI to create personalized study plans, explain complex concepts on-demand, and generate mock exams, allowing students to focus on their specific weak areas.
- **Interactive Engagement:** Interactive quizzes, timed challenges, and gamified leaderboards make learning fun and motivating, encouraging consistent study habits.
- **Collaborative Learning:** The **Community Hub** fosters a sense of community by allowing students to form study groups, share resources, and hold discussions, promoting peer-to-peer learning.
- **Progress Tracking:** Visual progress bars, achievement badges, and detailed stats give students a clear view of their journey, helping them stay motivated and on track.

---

## 2. Technical Architecture

NoteWise is built on a modern, robust, and scalable tech stack, prioritizing developer experience, performance, and type safety.

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](httpss://ui.shadcn.com/)
- **Authentication & Database:** [Firebase](https://firebase.google.com/) (Authentication)
- **Generative AI:** [Google's Genkit](https://firebase.google.com/docs/genkit) (integrated with Gemini models)

---

## 3. Project Structure

The project follows a standard Next.js App Router structure. Key directories include:

```
/src
|-- /app/                # Main application routes (pages, layouts, API handlers)
|   |-- /ai-revision/    # AI Revision Studio page
|   |-- /community/      # Community Hub page
|   |-- /courses/        # Course browsing and lesson pages
|   |-- /dashboard/      # Personalized user dashboard
|   |-- /leaderboard/    # Gamified leaderboard
|   |-- /profile/        # User profile page
|   |-- /settings/       # User settings page
|   |-- /api/            # (Implicit) Genkit flow handlers
|   |-- layout.tsx       # Root layout
|   `-- page.tsx         # Landing page
|
|-- /ai/                 # Genkit AI-related logic
|   |-- /flows/          # Definitions for all Genkit flows (e.g., generate quizzes)
|   `-- genkit.ts        # Genkit initialization and configuration
|
|-- /components/         # Reusable React components
|   |-- /ui/             # ShadCN UI components (Button, Card, etc.)
|   `-- AuthProvider.tsx # Manages Firebase auth state
|
|-- /hooks/              # Custom React hooks (e.g., useAuth, useToast)
|
|-- /lib/                # Core utilities, data, and configurations
|   |-- courses.ts       # Mock data for subjects and courses
|   |-- firebase.ts      # Firebase initialization
|   `-- utils.ts         # Utility functions (e.g., cn for classnames)
|
`-- tailwind.config.ts   # Tailwind CSS configuration
```

---

## 4. Key Features Deep Dive

### a. User Authentication

- **Implementation:** Handled via `firebase/auth` and managed globally through the `useAuth` hook (`/src/hooks/use-auth.tsx`).
- **Protected Routes:** The `useRequireAuth` hook redirects unauthenticated users from protected pages (like `/dashboard` or `/profile`) to the `/login` page.
- **Pages:** `/login`, `/register`.

### b. AI Revision Studio

This is the core of the application's "smart" functionality, powered by **Google's Genkit**.

- **Genkit Flows (`/src/ai/flows`):** Each file in this directory defines a specific AI-powered task.
  - `explain-concept.ts`: Takes a user's query and provides a simple, clear explanation.
  - `generate-study-plan.ts`: Creates a personalized 7-day study plan based on a subject and user-identified weak topics.
  - `generate-mock-exam.ts`: Generates a multi-format mock exam for a given subject.
  - `generate-challenge-quiz.ts`: Creates a fun, gamified quiz with random questions.
- **Integration:** These server-side flows are called directly from client components within the `/ai-revision` page, leveraging Next.js Server Actions.

### c. Course Structure

- **Data Source:** Course and subject data is currently mocked in `/src/lib/courses.ts`. This modular structure allows for easy replacement with a database (like Firestore) in the future.
- **Dynamic Routing:** The file structure `/app/courses/[subjectId]/[courseId]` allows for clean, dynamic routing to display course details and individual lessons.

### d. Community & Gamification

- **Community Hub:** The `/community` page provides a centralized place for forums, study groups, and shared resources. Currently, it uses mock data but is designed for future integration with a real-time database.
- **Leaderboard:** The `/leaderboard` page displays user rankings to foster healthy competition. Data is mocked and can be connected to a points system later.

### e. Theming

- **Implementation:** The app uses `next-themes` to manage light/dark mode.
- **Configuration:**
  - Themes are defined with CSS variables in `/src/app/globals.css`.
  - The `ThemeProvider` (`/src/components/ThemeProvider.tsx`) wraps the entire application in the root layout.
  - The theme can be changed by the user in the `/settings/appearance` section.

---

## 5. Getting Started Locally

To run the project in a local development environment, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    Create a `.env` file in the root of the project and add your Firebase configuration keys. These are necessary for Firebase services and Genkit to function correctly.
    ```
    # Firebase and Google Cloud credentials
    GEMINI_API_KEY=AI...
    ```

3.  **Run the Development Server:**
    This command starts the Next.js development server, typically on `http://localhost:9002`.
    ```bash
    npm run dev
    ```

4.  **Run the Genkit Inspector (Optional):**
    To inspect, test, and monitor your Genkit flows, run the Genkit inspector in a separate terminal.
    ```bash
    npm run genkit:dev
    ```
    This will start the inspector, usually on `http://localhost:4000`.

The application should now be running, and you can begin exploring its features.
