// src/pages/profile.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import {
    HundredProblemsBadge,
    ContestMasterBadge,
    WeekStreakBadge,
    TeamPlayerBadge,
    RisingStarBadge,
    FiveHundredProblemsBadge,
    TopPerformerBadge,
    MonthStreakBadge,
    TeamLeaderBadge,
    ExpertCoderBadge,
    AllPlatformsBadge,
    SpeedDemonBadge,
    CommunityHelperBadge
} from "@/components/custom/badges/achievement-badge";
import { AchievementsGrid } from "@/components/custom/badges/achievements-grid";
import { useUpdateUserMutation, useUserProfileQuery } from "@/lib/query";
import Loader from "@/components/custom/utils/loader-component";
import { Edit, Github, Instagram, Linkedin, MapPin, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import type { UpdateUserSchema } from "@/types";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const achievementComponents = [
    <HundredProblemsBadge key={1} />,
    <ContestMasterBadge key={2} />,
    <WeekStreakBadge key={3} />,
    <TeamPlayerBadge key={4} />,
    <RisingStarBadge key={5} />,
    <FiveHundredProblemsBadge key={6} />,
    <TopPerformerBadge key={7} />,
    <MonthStreakBadge key={8} />,
    <TeamLeaderBadge key={9} />,
    <ExpertCoderBadge key={10} />,
    <AllPlatformsBadge key={11} />,
    <SpeedDemonBadge key={12} />,
    <CommunityHelperBadge key={13} />
];



const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { data: user, isLoading: userLoading, isSuccess: userSuccess } = useUserProfileQuery();
    const { mutateAsync: updateUser, isPending: updateUserLoading, isSuccess: updateUserSuccess } = useUpdateUserMutation()
    const [profileVisibility, setProfileVisibility] = useState("public");

    const { register, handleSubmit, } = useForm({
        defaultValues: {
            name: user?.data?.name,
            username: user?.data?.username,
            bio: user?.data?.userExtraInfo?.bio,
            location: user?.data?.userExtraInfo?.location,
            socialInfo: {
                github: user?.data?.socialInfo?.github,
                linkedin: user?.data?.socialInfo?.linkedin,
                twitter: user?.data?.socialInfo?.twitter,
                instagram: user?.data?.socialInfo?.instagram,
            },
            userPreference: {
                profileVisibility: user?.data?.userPreference?.profileVisibility,
                emailNotifications: user?.data?.userPreference?.emailNotifications,
                pushNotifications: user?.data?.userPreference?.pushNotifications,
                theme: user?.data?.userPreference?.theme
            }
        } as UpdateUserSchema
    });

    const stats = {
        totalProblems: 1250,
        contestsParticipated: 45,
        currentRating: 1850,
        highestRating: 1950,
        codingStreak: 67,
        teamsJoined: 8,
        achievements: 23
    };

    const platforms = [
        {
            id: 1,
            name: "LeetCode",
            logo: "💡",
            username: "shadcn_lc",
            problemsSolved: 450,
            rating: 1850,
            rank: "Top 5%",
            status: "linked"
        },
        {
            id: 2,
            name: "Codeforces",
            logo: "⚡",
            username: "shadcn_cf",
            problemsSolved: 620,
            rating: 1950,
            rank: "Expert",
            status: "linked"
        },
        {
            id: 3,
            name: "HackerRank",
            logo: "💻",
            username: "shadcn_hr",
            problemsSolved: 180,
            rating: null,
            rank: "5 Stars",
            status: "syncing"
        }
    ];

    const achievements = [
        { id: 1, name: "100 Problems", description: "Solved 100 problems", icon: "🏆", date: "2024-01-15", color: "bg-yellow-100" },
        { id: 2, name: "Contest Master", description: "Participated in 10 contests", icon: "⭐", date: "2024-01-10", color: "bg-blue-100" },
        { id: 3, name: "Streak King", description: "30-day coding streak", icon: "🔥", date: "2024-01-05", color: "bg-red-100" },
        { id: 4, name: "Team Player", description: "Joined 5 teams", icon: "👥", date: "2024-01-01", color: "bg-green-100" },
        { id: 5, name: "Rising Star", description: "Reached 1800 rating", icon: "🚀", date: "2023-12-28", color: "bg-purple-100" }
    ];

    const activities = [
        { id: 1, type: "submission", platform: "LeetCode", problem: "Two Sum", status: "Accepted", timestamp: "2024-01-15 14:30" },
        { id: 2, type: "contest", platform: "Codeforces", problem: "Round #845", status: "Rank 150", timestamp: "2024-01-14 10:15" },
        { id: 3, type: "team", platform: "Team", problem: "Joined 'Algorithm Masters'", status: "Joined", timestamp: "2024-01-13 16:45" },
        { id: 4, type: "submission", platform: "LeetCode", problem: "Reverse Linked List", status: "Accepted", timestamp: "2024-01-12 09:20" },
        { id: 5, type: "contest", platform: "LeetCode", problem: "Weekly Contest 385", status: "Rank 85", timestamp: "2024-01-11 12:30" }
    ];

    const teams = [
        { id: 1, name: "Algorithm Masters", members: 12, rank: 1, problemsSolved: 1200 },
        { id: 2, name: "Code Warriors", members: 8, rank: 3, problemsSolved: 980 },
        { id: 3, name: "Dynamic Programmers", members: 15, rank: 2, problemsSolved: 1100 }
    ];

    const getStatusColor = (status: string) => {
        const colors = {
            linked: "bg-green-100 text-green-800",
            syncing: "bg-blue-100 text-blue-800",
            error: "bg-red-100 text-red-800"
        };
        return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
    };

    const getActivityIcon = (type: string) => {
        const icons = {
            submission: "✅",
            contest: "🏆",
            team: "👥"
        };
        return icons[type as keyof typeof icons] || "📝";
    };
    useEffect(()=>{
        if(updateUserSuccess){
            toast.success("User updated successfully")
        } 
    },[updateUserSuccess])
    const submitUpdate = async (data: UpdateUserSchema) => {
        await updateUser({
            name: data.name,
            username: data.username,
            bio: data.bio,
            location: data.location
        });
        setIsEditing(false);
    }
    if (userLoading) {
        return <Loader text="Your profile is loading..." />;
    }

    return (
        userSuccess && (<div className="w-full max-w-7xl p-6 space-y-6">
            {/* User Summary Header */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <Avatar className="h-24 w-24 border-2 border-background">
                                <AvatarImage src={user?.data?.avatar} />
                                <AvatarFallback className="text-lg font-semibold">
                                    {user?.data?.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-md"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Update Profile Picture</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <Input type="file" accept="image/*" />
                                        <Button className="w-full">Upload</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h1 className="text-2xl font-bold">{user?.data?.name}</h1>
                                    <span className="text-muted-foreground">@{user?.data?.username}</span>
                                    {user?.data?.isVerified && (
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                            Verified
                                        </Badge>
                                    )}
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                    {user?.data?.userExtraInfo?.bio || "No bio yet"}
                                </p>
                            </div>

                            {/* Location */}
                            {user?.data?.userExtraInfo?.location && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {user?.data?.userExtraInfo?.location}
                                </div>
                            )}

                            {/* Social Links */}
                            <div className="flex flex-wrap gap-2">
                                {user?.data?.socialInfo?.github && (
                                    <Button variant="outline" size="icon" className="gap-2">
                                        <Github className="h-4 w-4" />
                                    </Button>
                                )}
                                {user?.data?.socialInfo?.linkedin && (
                                    <Button variant="outline" size="icon" className="gap-2">
                                        <Linkedin className="h-4 w-4" />
                                    </Button>
                                )}
                                {user?.data?.socialInfo?.twitter && (
                                    <Button variant="outline" size="icon" className="gap-2">
                                        <Twitter className="h-4 w-4" />
                                    </Button>
                                )}
                                {user?.data?.socialInfo?.instagram && (
                                    <Button variant="outline" size="icon" className="gap-2">
                                        <Instagram className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Edit Profile Dialog */}
                        <Dialog open={isEditing} onOpenChange={setIsEditing}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="lg:self-start">
                                    Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input
                                                {...register("name")}
                                                defaultValue={user?.data?.name} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Username</Label>
                                            <Input
                                                {...register("username")}
                                                defaultValue={user?.data?.username} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Bio</Label>
                                        <Input
                                            {...register("bio")}
                                            defaultValue={user?.data?.userExtraInfo?.bio} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Location</Label>
                                        <Input
                                            {...register("location")}
                                            defaultValue={user?.data?.userExtraInfo?.location} />
                                    </div>
                                    <Button
                                        disabled={updateUserLoading}
                                        onClick={handleSubmit(submitUpdate)}
                                        className="w-full">
                                        {updateUserLoading && <Spinner />}
                                        Update Profile
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
            {/* Statistics Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{stats.totalProblems}</div>
                        <div className="text-sm text-muted-foreground">Problems Solved</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{stats.contestsParticipated}</div>
                        <div className="text-sm text-muted-foreground">Contests</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{stats.currentRating}</div>
                        <div className="text-sm text-muted-foreground">Current Rating</div>
                        <div className="text-xs text-muted-foreground">Max: {stats.highestRating}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{stats.codingStreak}</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-indigo-600">{stats.teamsJoined}</div>
                        <div className="text-sm text-muted-foreground">Teams</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">{stats.achievements}</div>
                        <div className="text-sm text-muted-foreground">Badges</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">85%</div>
                        <div className="text-sm text-muted-foreground">Progress</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="progress" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="progress">Platform Progress</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="teams">Teams</TabsTrigger>
                </TabsList>

                {/* Platform Progress */}
                <TabsContent value="progress" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {platforms.map((platform) => (
                            <Card key={platform.id} className="relative">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl">{platform.logo}</span>
                                            <div>
                                                <CardTitle className="text-lg">{platform.name}</CardTitle>
                                                <CardDescription>@{platform.username}</CardDescription>
                                            </div>
                                        </div>
                                        <Badge className={getStatusColor(platform.status)}>
                                            {platform.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <div className="font-medium">{platform.problemsSolved}</div>
                                            <div className="text-muted-foreground">Solved</div>
                                        </div>
                                        <div>
                                            <div className="font-medium">{platform.rating || "N/A"}</div>
                                            <div className="text-muted-foreground">Rating</div>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">{platform.rank}</div>
                                        <div className="text-muted-foreground">Rank</div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Achievements and Badges */}
                <TabsContent value="achievements" className="space-y-4">
                    <AchievementsGrid
                        achievements={achievementComponents}
                        title="Your Coding Achievements"
                        description="Badges earned through your coding journey and accomplishments"
                        showFilters={true}
                    />
                </TabsContent>

                {/* Activity History */}
                <TabsContent value="activity" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <CardTitle>Activity History</CardTitle>
                                    <CardDescription>
                                        Your recent submissions and activities
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <Input placeholder="Search activities..." className="w-full sm:w-auto" />
                                    <Button variant="outline" size="sm">
                                        Filter
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px]">
                                <div className="space-y-4">
                                    {activities.map((activity) => (
                                        <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                            <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                                            <div className="flex-1">
                                                <div className="font-medium">{activity.problem}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {activity.platform} • {new Date(activity.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                            <Badge variant={
                                                activity.status.includes('Accepted') || activity.status.includes('Rank') && parseInt(activity.status.split(' ')[1]) < 1000
                                                    ? "default"
                                                    : "secondary"
                                            }>
                                                {activity.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Teams */}
                <TabsContent value="teams" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Teams</CardTitle>
                            <CardDescription>
                                Teams and groups you're participating in
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {teams.map((team) => (
                                    <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <div className="font-medium">{team.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {team.members} members • {team.problemsSolved} problems solved
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={team.rank === 1 ? "default" : "secondary"}>
                                                Rank #{team.rank}
                                            </Badge>
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full">
                                    Discover More Teams
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Privacy & Sharing Controls */}
            <Card>
                <CardHeader>
                    <CardTitle>Privacy & Sharing</CardTitle>
                    <CardDescription>
                        Control your profile visibility and sharing options
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Profile Visibility</Label>
                            <div className="text-sm text-muted-foreground">
                                Who can see your profile and activity
                            </div>
                        </div>
                        <Select

                            value={profileVisibility}
                        >
                            <SelectTrigger aria-readonly>Privacy</SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                                <SelectItem value="team-only">Team Only</SelectItem>
                                <SelectItem value="college-only">College Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2">
                            <Label>Share Your Profile</Label>
                            <div className="text-sm text-muted-foreground">
                                Share your coding progress with others
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">
                                📋 Copy Link
                            </Button>
                            <Button variant="outline">
                                📄 Export PDF
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Feedback & Support */}
            <Card>
                <CardHeader>
                    <CardTitle>Feedback & Support</CardTitle>
                    <CardDescription>
                        Need help with your profile or data syncing?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="flex-1">
                            Report Sync Issue
                        </Button>
                        <Button variant="outline" className="flex-1">
                            View Help Center
                        </Button>
                        <Button variant="outline" className="flex-1">
                            Contact Support
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>)
    );
};

export default ProfilePage;