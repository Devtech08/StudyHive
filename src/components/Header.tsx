
import Link from 'next/link';
import {
  BookOpen,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  User as UserIcon,
  Users,
  Trophy,
  BookMarked,
  FilePen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { logout as logoutAction } from '@/lib/actions/auth';
import type { User } from '@/lib/types';
import { Logo } from './Logo';
import { useAuth } from '@/context/AuthContext';

const studentNavLinks = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/revision', label: 'AI Revision', icon: Sparkles },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];

const teacherNavLinks = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/my-courses', label: 'My Courses', icon: BookMarked },
    { href: '/students', label: 'Students', icon: Users },
    { href: '/assignments', label: 'Assignments', icon: FilePen },
    { href: '/community', label: 'Community', icon: Users },
]

export function Header({ user }: { user: User | null }) {
  const { logout: clientLogout } = useAuth();
  const navLinks = user?.role === 'teacher' ? teacherNavLinks : studentNavLinks;
  
  const handleLogout = async () => {
    await clientLogout();
    await logoutAction();
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
             <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                    Main navigation links for the application.
                </SheetDescription>
            </SheetHeader>
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Logo />
              </Link>
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
         <Link href="/dashboard" className="hidden items-center gap-2 text-lg font-semibold md:flex md:text-base">
            <Logo />
         </Link>
      </div>
      
      <nav className="hidden flex-1 items-center justify-center gap-6 text-lg font-medium md:flex md:flex-row md:gap-5 md:text-sm lg:gap-6">
          {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
              key={href}
              href={href}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
              <Icon className="h-4 w-4" />
              {label}
          </Link>
          ))}
      </nav>
      
      <div className="ml-auto flex items-center gap-4 md:gap-2 lg:gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button onClick={handleLogout} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
