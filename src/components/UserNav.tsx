
'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserNav() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  
  // Local state to force re-render when displayName changes
  const [displayName, setDisplayName] = useState(user?.displayName);
  useEffect(() => {
    setDisplayName(user?.displayName);
  }, [user?.displayName]);


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      })
      router.push('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Out Error",
        description: error.message,
      })
    }
  };

  if (loading) {
    return <Loader2 className="w-6 h-6 animate-spin" />;
  }

  const isHomepage = pathname === '/';

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL ?? ''} alt={displayName ?? ''} />
              <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {displayName || user.email?.split('@')[0]}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
             {isHomepage ? (
                <Link href="/dashboard"><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
             ) : (
                <Link href="/"><DropdownMenuItem>Home</DropdownMenuItem></Link>
             )}
            <Link href="/profile"><DropdownMenuItem>Profile</DropdownMenuItem></Link>
            <Link href="/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/register">Get Started</Link>
      </Button>
    </div>
  )
}
