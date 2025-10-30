// src/pages/profile.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
    const [profileVisibility, setProfileVisibility] = useState("public");

    // Mock data
    const userData = {
        name: "Shadcn User",
        username: "shadcn",
        email: "shadcn@example.com",
        avatar: "https://github.com/shadcn.png",
        bio: "Passionate coder | Competitive programmer | Team lead",
        location: "San Francisco, CA",
        institution: "Stanford University",
        isVerified: true,
        socialLinks: {
            github: "https://github.com/shadcn",
            linkedin: "https://linkedin.com/in/shadcn",
            website: "https://shadcn.com"
        }
    };

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

    return (
        <div className="w-full max-w-7xl p-6 space-y-6">
            {/* User Summary Header */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={userData.avatar} />
                                <AvatarFallback>SU</AvatarFallback>
                            </Avatar>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                                    >
                                        ✏️
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Avatar</DialogTitle>
                                        <DialogDescription>
                                            Upload a new profile picture
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <Input type="file" accept="image/*" />
                                        <Button>Save Changes</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <h1 className="text-3xl font-bold">{userData.name}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">@{userData.username}</span>
                                    {userData.isVerified && (
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <p className="text-lg text-muted-foreground">{userData.bio}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span>📍 {userData.location}</span>
                                <span>🎓 {userData.institution}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" asChild>
                                    <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                                        GitHub
                                    </a>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                        LinkedIn
                                    </a>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={userData.socialLinks.website} target="_blank" rel="noopener noreferrer">
                                        Website
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <Dialog open={isEditing} onOpenChange={setIsEditing}>
                            <DialogTrigger asChild>
                                <Button>Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>
                                        Update your profile information and preferences
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" defaultValue={userData.name} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Username</Label>
                                            <Input id="username" defaultValue={userData.username} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input id="bio" defaultValue={userData.bio} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input id="location" defaultValue={userData.location} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="institution">Institution</Label>
                                            <Input id="institution" defaultValue={userData.institution} />
                                        </div>
                                    </div>
                                    <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
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
        </div>
    );
};

export default ProfilePage;