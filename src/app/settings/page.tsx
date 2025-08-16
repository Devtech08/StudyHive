
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, useRequireAuth } from "@/hooks/use-auth";
import SettingsHeader from "@/components/SettingsHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SettingsPage() {
    useRequireAuth();
    const { user } = useAuth();

    return (
        <div className="flex flex-col min-h-screen bg-muted/40">
            <SettingsHeader />
            <main className="flex-1 p-4 md:p-8 lg:p-12">
                <div className="container mx-auto max-w-4xl">
                     <header className="mb-12">
                        <h1 className="text-4xl font-bold font-headline">
                            Settings
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Manage your account and preferences.
                        </p>
                    </header>
                    <Tabs defaultValue="account">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            <TabsTrigger value="appearance">Appearance</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account</CardTitle>
                                    <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" defaultValue="QuantumLeaper" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="flex items-center gap-4">
                                            <Input id="email" type="email" value={user?.email || ''} disabled />
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">Change Email</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Change Email</DialogTitle>
                                                        <DialogDescription>
                                                            Enter your new email address below. A verification link will be sent.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="new-email">New Email</Label>
                                                            <Input id="new-email" type="email" placeholder="new.email@example.com"/>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button variant="ghost">Cancel</Button>
                                                        <Button>Save Changes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Changes</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="notifications">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Notifications</CardTitle>
                                    <CardDescription>Manage how you receive notifications.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                   <div className="flex items-center justify-between p-4 border rounded-lg">
                                       <div>
                                           <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                                           <p className="text-sm text-muted-foreground">Receive updates about your account and new features.</p>
                                       </div>
                                       <Switch id="email-notifications" defaultChecked />
                                   </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                       <div>
                                           <Label htmlFor="community-alerts" className="font-medium">Community Alerts</Label>
                                           <p className="text-sm text-muted-foreground">Get notified about new posts in your study groups.</p>
                                       </div>
                                       <Switch id="community-alerts" defaultChecked/>
                                   </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Preferences</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="appearance">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Appearance</CardTitle>
                                    <CardDescription>Customize the look and feel of the app.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="space-y-2">
                                        <Label>Theme</Label>
                                        <p className="text-sm text-muted-foreground">Select your preferred color scheme.</p>
                                        {/* Theme selection would go here */}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Theme</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
