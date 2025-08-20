
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

export function Logo({ className }: { className?: string }) {
  const { user } = useAuth();
  const href = user ? '/dashboard' : '/';

  return (
     <Link href={href} className={cn("flex items-center gap-2", className)}>
      <GraduationCap className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline text-primary">
        StudyHive
      </span>
    </Link>
  );
}
