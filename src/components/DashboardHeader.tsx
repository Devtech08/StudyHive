
'use client';

import Link from "next/link";
import { UserNav } from "@/components/UserNav";
import { Logo } from "@/components/Logo";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const baseNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/ai-revision', label: 'AI Revision' },
  { href: '/community', label: 'Community' },
  { href: '/leaderboard', label: 'Leaderboard' },
];

export default function DashboardHeader() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const isProfileOrSettings = pathname === '/profile' || pathname === '/settings';

    // When on Profile/Settings, show "Dashboard" in the main nav.
    // Otherwise, show "Dashboard" (as the default for logged-in areas).
    const navLinks = isProfileOrSettings 
        ? [{ href: '/dashboard', label: 'Dashboard' }, ...baseNavLinks.filter(l => l.href !== '/')]
        : [{ href: '/dashboard', label: 'Dashboard' }, ...baseNavLinks];


    return (
        <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
            <div className="flex items-center gap-4 md:flex-1 md:justify-start">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="grid gap-6 text-lg font-medium mt-6">
                    <Logo />
                    {navLinks.map((link) => (
                      pathname !== link.href && (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="hidden md:block">
                <Logo />
              </div>
            </div>

            <div className="md:hidden">
                <Logo />
            </div>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium justify-center flex-1">
            {navLinks.map((link) => (
                pathname !== link.href && (
                  <Link key={link.label} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                )
            ))}
            </nav>
            <div className="flex-1 flex justify-end items-center gap-4 sm:gap-6">
                <UserNav />
            </div>
      </header>
    )
}
