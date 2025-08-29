import { GraduationCap } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background animate-fade-out animation-delay-[2s] overflow-hidden">
      <div className="relative flex flex-col items-center justify-center">
        <div className="animate-[slide-up_1.5s_ease-out_forwards]">
            <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2">
            <h1 className="text-4xl font-bold font-headline text-primary animate-[fade-in-slow_1.5s_ease-out_forwards]">
                StudyHive
            </h1>
        </div>
      </div>
    </div>
  );
}