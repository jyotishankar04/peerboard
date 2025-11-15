// src/pages/settings.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { getUserProfile} from "@/lib/api";
import type { UpdateUserSchema, UserProfile } from "@/types";
import { useUpdateUserMutation } from "@/lib/query";
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from "@/providers/theme-provider";

// Profile Information Component
const ProfileInformation = ({ user }: { user: UserProfile | undefined }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.userExtraInfo?.bio || "",
        }
    });


    const { mutateAsync: updateUser } = useUpdateUserMutation();
    const onSubmit = (data: UpdateUserSchema) => {
        return updateUser(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Update your personal information
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                        <AvatarFallback>
                            {user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Avatar</Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                            id="bio"
                            {...register("bio")}
                            placeholder="Tell us about yourself"
                        />
                    </div>

                    <Button type="submit"
                        disabled={isSubmitting}>
                            {isSubmitting && <Spinner />}
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

// Notification Preferences Component
const NotificationPreferences = ({ user }: { user: UpdateUserSchema | undefined }) => {
    const [emailNotifications, setEmailNotifications] = useState(
        user?.userPreference?.emailNotifications ?? true
    );
    const [pushNotifications, setPushNotifications] = useState(
        user?.userPreference?.pushNotifications ?? true
    );

    const { mutateAsync: updateUser } = useUpdateUserMutation();
    

    const handleEmailNotificationsChange = (checked: boolean) => {
        setEmailNotifications(checked);
        updateUser({
            userPreference:{
                emailNotifications: checked,
                ...user?.userPreference
            }
        });
    };

    const handlePushNotificationsChange = (checked: boolean) => {
        setPushNotifications(checked);
        updateUser({
            userPreference: {
                pushNotifications: checked,
                ...user?.userPreference
            }
        });
    }

    return (
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
                        onCheckedChange={handleEmailNotificationsChange}
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
                        onCheckedChange={handlePushNotificationsChange}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

// Privacy Settings Component
const PrivacySettings = ({ user }: { user: UpdateUserSchema | undefined }) => {
    const [profileVisibility, setProfileVisibility] = useState(
        user?.userPreference?.profileVisibility || "public"
    );

    const { mutateAsync: updateUser } = useUpdateUserMutation();

    const handleVisibilityChange = (value: string) => {
        setProfileVisibility(value);
        updateUser({
            userPreference: {
                profileVisibility: value,
                ...user?.userPreference
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
                <CardDescription>
                    Control who can see your profile and activity
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup value={profileVisibility} onValueChange={handleVisibilityChange} className="space-y-3">
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
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

// Appearance Settings Component
const AppearanceSettings = ({ user }: { user: UpdateUserSchema | undefined }) => {
    const {  setTheme, theme }  = useTheme();
    const { mutateAsync: updateUser } = useUpdateUserMutation()

    const handleThemeChange = (value: "light" | "dark" | "system") => {
        setTheme(value);
        updateUser({
            userPreference: {
                theme: value,
                ...user?.userPreference
            }
        });
    } ;
    

    return (
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
                    <Select value={theme} defaultValue={theme} onValueChange={handleThemeChange}>
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
            </CardContent>
        </Card>
    );
};

// Security Settings Component
const SecuritySettings = () => {
    // const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    // const { mutateAsync: updateUser } = useUpdateUserMutation();

    // const onSubmit = async (data: { currentPassword: string; newPassword: string }) => {
    //     // Add change password logic here
    // };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                    Update your password to keep your account secure
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            // {...register("currentPassword", { required: "Current password is required" })}
                        />
                        {/* {errors.currentPassword && (
                            <p className="text-sm text-destructive">{errors.currentPassword.message}</p>
                        )} */}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            // {...register("newPassword", {
                            //     required: "New password is required",
                            //     minLength: { value: 6, message: "Password must be at least 6 characters" }
                            // })}
                        />
                        {/* {errors.newPassword && (
                            <p className="text-sm text-destructive">{errors.newPassword.message}</p>
                        )} */}
                    </div>

                    {/* <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Password"}
                    </Button> */}
                </form>
            </CardContent>
        </Card>
    );
};

// Danger Zone Component
const DangerZone = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        // Add delete account logic here
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsDeleting(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                    Permanently delete your account and all associated data
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                >
                    {isDeleting ? "Deleting..." : "Delete Account"}
                </Button>
            </CardContent>
        </Card>
    );
};

// Main Settings Page Component
const SettingsPage = () => {

    const { data: user, isLoading } = useQuery({
        queryKey: ["user-profile"],
        queryFn: getUserProfile,
    });

    if (isLoading) {
        return (
            <div className="w-full max-w-6xl p-6 space-y-6">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl p-6 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-6">
                    <ProfileInformation user={user?.data} />
                    <DangerZone />
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <NotificationPreferences user={user?.data} />
                </TabsContent>

                {/* Privacy Tab */}
                <TabsContent value="privacy" className="space-y-6">
                    <PrivacySettings user={user?.data} />
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-6">
                    <AppearanceSettings user={user?.data} />
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <SecuritySettings />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;