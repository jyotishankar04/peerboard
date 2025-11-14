// src/pages/settings.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SettingsPage = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState("public");
    const [theme, setTheme] = useState("system");

    // Mock data
    const connectedPlatforms = [
        { id: 1, name: "LeetCode", status: "linked", lastSynced: "2024-01-15 14:30" },
        { id: 2, name: "Codeforces", status: "error", lastSynced: "2024-01-14 09:15" },
        { id: 3, name: "HackerRank", status: "pending", lastSynced: "2024-01-13 16:45" },
    ];

    const getStatusBadge = (status: string) => {
        const variants = {
            linked: "default",
            error: "destructive",
            pending: "secondary",
        } as const;

        return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
    };

    return (
        <div className="w-full max-w-6xl p-6 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                </TabsList>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your personal information and profile picture
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Button variant="outline">Change Avatar</Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue="shadcn" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="shadcn@example.com" />
                                </div>
                            </div>

                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            <CardDescription>
                                Permanently delete your account and all associated data
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive">Delete Account</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Integrations Tab */}
                <TabsContent value="integrations" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Connected Platforms</CardTitle>
                            <CardDescription>
                                Manage your coding platform integrations
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {connectedPlatforms.map((platform) => (
                                <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium">{platform.name}</span>
                                            {getStatusBadge(platform.status)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Last synced: {platform.lastSynced}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            Refresh
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Revoke
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <Button className="w-full">Add New Platform</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Choose how you want to be notified about different events
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="email-notifications">Email Notifications</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Receive notifications via email
                                    </div>
                                </div>
                                <Switch
                                    id="email-notifications"
                                    checked={emailNotifications}
                                    onCheckedChange={setEmailNotifications}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="push-notifications">Push Notifications</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Receive push notifications in your browser
                                    </div>
                                </div>
                                <Switch
                                    id="push-notifications"
                                    checked={pushNotifications}
                                    onCheckedChange={pushNotifications}
                                />
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <Label>Notification Frequency</Label>
                                <Select defaultValue="instantly">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="instantly">Instantly</SelectItem>
                                        <SelectItem value="daily">Daily Digest</SelectItem>
                                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Privacy & Data Tab */}
                <TabsContent value="privacy" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Visibility</CardTitle>
                            <CardDescription>
                                Control who can see your profile and activity
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={profileVisibility} onValueChange={setProfileVisibility} className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="public" id="public" />
                                    <Label htmlFor="public" className="flex flex-col">
                                        <span>Public</span>
                                        <span className="text-sm text-muted-foreground font-normal">
                                            Anyone can see your profile and activity
                                        </span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="private" id="private" />
                                    <Label htmlFor="private" className="flex flex-col">
                                        <span>Private</span>
                                        <span className="text-sm text-muted-foreground font-normal">
                                            Only you can see your profile
                                        </span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="team-only" id="team-only" />
                                    <Label htmlFor="team-only" className="flex flex-col">
                                        <span>Team Only</span>
                                        <span className="text-sm text-muted-foreground font-normal">
                                            Only your team members can see your profile
                                        </span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Data Management</CardTitle>
                            <CardDescription>
                                Download or manage your personal data
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full">
                                Export Data as PDF
                            </Button>
                            <Button variant="outline" className="w-full">
                                Request Data Deletion
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme & Display</CardTitle>
                            <CardDescription>
                                Customize the appearance of the application
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <Label>Theme</Label>
                                <Select value={theme} onValueChange={setTheme}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <Label>Font Size</Label>
                                <Select defaultValue="medium">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="small">Small</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="large">Large</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="colorblind">Color Blind Mode</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Optimize colors for color vision deficiency
                                    </div>
                                </div>
                                <Switch id="colorblind" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="animations">Animations</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Enable or disable interface animations
                                    </div>
                                </div>
                                <Switch id="animations" defaultChecked />
                            </div>

                            <Button variant="outline">Reset to Defaults</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Two-Factor Authentication</CardTitle>
                            <CardDescription>
                                Add an extra layer of security to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Authenticator App</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Use an authenticator app for 2FA
                                    </div>
                                </div>
                                <Button variant="outline">Set Up</Button>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <Label>Change Password</Label>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input type="password" placeholder="Current Password" />
                                    <Input type="password" placeholder="New Password" />
                                    <Input type="password" placeholder="Confirm New Password" />
                                </div>
                                <Button>Update Password</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Active Sessions</CardTitle>
                            <CardDescription>
                                Manage your active login sessions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <div className="font-medium">Chrome on Windows</div>
                                        <div className="text-sm text-muted-foreground">
                                            Last active: 2 hours ago • 192.168.1.1
                                        </div>
                                    </div>
                                    <Badge variant="default">Current</Badge>
                                </div>

                                <Button variant="outline" className="w-full">
                                    Log Out All Other Sessions
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Support Tab */}
                <TabsContent value="support" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Help & Support</CardTitle>
                            <CardDescription>
                                Get help and provide feedback
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full">
                                View FAQ & Help Center
                            </Button>
                            <Button variant="outline" className="w-full">
                                Contact Support
                            </Button>
                            <Button variant="outline" className="w-full">
                                Suggest a Feature
                            </Button>
                            <Button variant="outline" className="w-full">
                                Report a Bug
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;