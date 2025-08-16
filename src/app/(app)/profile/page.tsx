
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { logout as logoutAction } from '@/lib/actions/auth';
import { User, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout: clientLogout } = useAuth();
  
  const handleLogout = async () => {
    await clientLogout();
    await logoutAction();
  }

  return (
    <div className="flex justify-center items-start pt-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            <User className="h-8 w-8" />
            <div>
              <CardTitle className="font-headline text-2xl">Profile</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-muted-foreground">{user?.email || 'No email found.'}</p>
          </div>
           <div>
            <h3 className="font-semibold">Role</h3>
            <p className="text-muted-foreground capitalize">{user?.role || 'No role found.'}</p>
          </div>
        </CardContent>
        <CardFooter>
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
