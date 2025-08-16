
'use client';

import Link from "next/link";
import { UserNav } from "@/components/UserNav";
import { Logo } from "@/components/Logo";

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/ai-revision', label: 'AI Revision' },
  { href: '/community', label: 'Community' },
  { href: '/leaderboard', label: 'Leaderboard' },
];

export default function DashboardHeader() {
    return (
        <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
            <div className="flex-1 flex justify-start">
                <Logo />
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium justify-center flex-1">
            {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
                </Link>
            ))}
            </nav>
            <div className="flex-1 flex justify-end items-center gap-4 sm:gap-6">
                <UserNav />
            </div>
      </header>
    )
}
