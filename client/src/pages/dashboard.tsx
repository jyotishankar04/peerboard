// src/pages/dashboard.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { 
  TrendingUpIcon, 
  UsersIcon, 
  BellIcon, 
  ShareIcon, 
  ChevronRightIcon,
  PlusIcon,
  TargetIcon,
  SparklesIcon,
  WifiSyncIcon
} from "lucide-react";

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState("global");
    const [syncStatus, setSyncStatus] = useState<{ [key: string]: string }>({});
    
    // Mock user data
    const userData = {
        name: "Shadcn User",
        username: "shadcn",
        avatar: "https://github.com/shadcn.png",
        isVerified: true
    };

    // Welcome messages based on time of day
    const getWelcomeMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    // Main KPIs
    const kpis = {
        weeklyProblems: 57,
        totalProblems: 1250,
        contestsParticipated: 45,
        currentStreak: 67,
        badgesEarned: 23,
        globalRank: 845,
        collegeRank: 12,
        teamRank: 3
    };

    // Connected platforms
    const platforms = [
        {
            id: 1,
            name: "LeetCode",
            logo: "💡",
            username: "shadcn_lc",
            problemsSolved: 450,
            rating: 1850,
            rank: "Top 5%",
            status: "synced",
            lastSynced: "2 min ago"
        },
        {
            id: 2,
            name: "Codeforces",
            logo: "⚡",
            username: "shadcn_cf",
            problemsSolved: 620,
            rating: 1950,
            rank: "Expert",
            status: "synced",
            lastSynced: "5 min ago"
        },
        {
            id: 3,
            name: "CodeChef",
            logo: "🍳",
            username: "shadcn_cc",
            problemsSolved: 180,
            rating: 1800,
            rank: "4 Stars",
            status: "syncing",
            lastSynced: "Syncing..."
        }
    ];

    // Recent activities
    const activities = [
        { id: 1, type: "submission", platform: "LeetCode", problem: "Two Sum", status: "Accepted", timestamp: "2024-01-15 14:30", difficulty: "Easy" },
        { id: 2, type: "contest", platform: "Codeforces", problem: "Round #845", status: "Rank 150", timestamp: "2024-01-14 10:15" },
        { id: 3, type: "team", platform: "Team", problem: "Joined 'Algorithm Masters'", status: "Joined", timestamp: "2024-01-13 16:45" },
        { id: 4, type: "submission", platform: "LeetCode", problem: "Reverse Linked List", status: "Accepted", timestamp: "2024-01-12 09:20", difficulty: "Medium" },
        { id: 5, type: "submission", platform: "CodeChef", problem: "SUBARR", status: "Accepted", timestamp: "2024-01-11 12:30", difficulty: "Hard" }
    ];

    // Upcoming contests
    const upcomingContests = [
        { id: 1, platform: "LeetCode", name: "Weekly Contest 385", time: "2024-01-20 14:30", duration: "1.5h", registered: true },
        { id: 2, platform: "Codeforces", name: "Round #846", time: "2024-01-21 11:05", duration: "2h", registered: false },
        { id: 3, platform: "CodeChef", name: "January Cook-Off", time: "2024-01-22 21:30", duration: "2.5h", registered: false }
    ];

    // Leaderboard data
    const leaderboards = {
        global: [
            { rank: 1, name: "Tourist", problems: 2840, rating: 3400 },
            { rank: 2, name: "Benq", problems: 2750, rating: 3300 },
            { rank: 3, name: "Um_nik", problems: 2680, rating: 3250 },
            { rank: 4, name: "Errichto", problems: 2600, rating: 3200 },
            { rank: 845, name: "shadcn", problems: 1250, rating: 1950 }
        ],
        college: [
            { rank: 1, name: "Alice Chen", problems: 1560, rating: 2100 },
            { rank: 2, name: "Bob Wilson", problems: 1480, rating: 2050 },
            { rank: 11, name: "Jane Smith", problems: 1320, rating: 1980 },
            { rank: 12, name: "shadcn", problems: 1250, rating: 1950 },
            { rank: 13, name: "John Doe", problems: 1180, rating: 1900 }
        ],
        team: [
            { rank: 1, name: "Algorithm Masters", problems: 1200, members: 12 },
            { rank: 2, name: "Dynamic Programmers", problems: 1100, members: 15 },
            { rank: 3, name: "Code Warriors", problems: 980, members: 8 }
        ]
    };

    // Teams data
    const teams = [
        { id: 1, name: "Algorithm Masters", members: 12, rank: 1, problemsSolved: 1200 },
        { id: 2, name: "Code Warriors", members: 8, rank: 3, problemsSolved: 980 }
    ];

    // Analytics data
    const activityData = {
        daily: [5, 8, 7, 10, 6, 12, 9], // Last 7 days
        byDifficulty: { easy: 45, medium: 35, hard: 20 },
        byTopic: { arrays: 25, strings: 20, dp: 15, graphs: 20, math: 20 }
    };

    // Sync platform data
    const syncPlatform = (platformId: number) => {
        setSyncStatus(prev => ({ ...prev, [platformId]: "syncing" }));
        setTimeout(() => {
            setSyncStatus(prev => ({ ...prev, [platformId]: "synced" }));
        }, 2000);
    };

    const getStatusColor = (status: string) => {
        const colors = {
            synced: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            syncing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
            error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        };
        return colors[status as keyof typeof colors] || "bg-muted text-muted-foreground";
    };

    const getActivityIcon = (type: string) => {
        const icons = {
            submission: "✅",
            contest: "🏆",
            team: "👥"
        };
        return icons[type as keyof typeof icons] || "📝";
    };

    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
            Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        };
        return colors[difficulty as keyof typeof colors] || "bg-muted text-muted-foreground";
    };

    const getRankColor = (rank: number) => {
        if (rank === 1) return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
        if (rank === 2) return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300";
        if (rank === 3) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
        return "bg-muted text-muted-foreground";
    };

    return (
        <div className="w-full max-w-7xl p-6 space-y-6">
            {/* Welcome and Overview Card */}
            <Card className="bg-card border-border">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-primary/10">
                                <AvatarImage src={userData.avatar} />
                                <AvatarFallback className="bg-primary/10 text-primary">SU</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold text-card-foreground">
                                    {getWelcomeMessage()}, {userData.name}! 👋
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    You've solved <span className="font-semibold text-primary">{kpis.weeklyProblems} questions</span> this week. Keep it up!
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2">
                                <ShareIcon className="h-4 w-4" />
                                Share Progress
                            </Button>
                            <Button className="gap-2">
                                <TrendingUpIcon className="h-4 w-4" />
                                View Analytics
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Unified Progress Panel - KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                    { value: kpis.totalProblems, label: "Total Solved", color: "text-primary" },
                    { value: kpis.contestsParticipated, label: "Contests", color: "text-green-600 dark:text-green-400" },
                    { value: kpis.currentStreak, label: "Day Streak", color: "text-orange-600 dark:text-orange-400" },
                    { value: kpis.badgesEarned, label: "Badges", color: "text-purple-600 dark:text-purple-400" },
                    { value: `#${kpis.globalRank}`, label: "Global Rank", color: "text-red-600 dark:text-red-400" },
                    { value: `#${kpis.collegeRank}`, label: "College Rank", color: "text-indigo-600 dark:text-indigo-400" },
                    { value: `#${kpis.teamRank}`, label: "Team Rank", color: "text-cyan-600 dark:text-cyan-400" }
                ].map((kpi, index) => (
                    <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                        <CardContent className="p-4 text-center">
                            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                            <div className="text-sm text-muted-foreground">{kpi.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Platforms & Activity */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Connected Platform Widgets */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <div>
                                <CardTitle className="text-card-foreground">Connected Platforms</CardTitle>
                                <CardDescription>Your coding progress across platforms</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                                <PlusIcon className="h-4 w-4" />
                                Add Platform
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {platforms.map((platform) => (
                                    <div key={platform.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{platform.logo}</span>
                                            <div>
                                                <div className="font-semibold text-card-foreground">{platform.name}</div>
                                                <div className="text-sm text-muted-foreground">@{platform.username}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-card-foreground">{platform.problemsSolved}</div>
                                            <div className="text-sm text-muted-foreground">solved</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge 
                                                    variant="secondary" 
                                                    className={`text-xs ${getStatusColor(syncStatus[platform.id] || platform.status)}`}
                                                >
                                                    {syncStatus[platform.id] || platform.status}
                                                </Badge>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 w-6 p-0 hover:bg-accent"
                                                    onClick={() => syncPlatform(platform.id)}
                                                    disabled={syncStatus[platform.id] === "syncing"}
                                                >
                                                    <WifiSyncIcon className={`h-3 w-3 ${syncStatus[platform.id] === "syncing" ? "animate-spin" : ""}`} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity Feed */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
                                    <CardDescription>Your latest submissions and activities</CardDescription>
                                </div>
                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Filter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Platforms</SelectItem>
                                            <SelectItem value="leetcode">LeetCode</SelectItem>
                                            <SelectItem value="codeforces">Codeforces</SelectItem>
                                            <SelectItem value="codechef">CodeChef</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px]">
                                <div className="space-y-3">
                                    {activities.map((activity) => (
                                        <div key={activity.id} className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors group">
                                            <div className="text-xl shrink-0">{getActivityIcon(activity.type)}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-card-foreground truncate">{activity.problem}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {activity.platform} • {new Date(activity.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {activity.difficulty && (
                                                    <Badge variant="secondary" className={getDifficultyColor(activity.difficulty)}>
                                                        {activity.difficulty}
                                                    </Badge>
                                                )}
                                                <Badge variant={
                                                    activity.status.includes('Accepted') || 
                                                    (activity.status.includes('Rank') && parseInt(activity.status.split(' ')[1]) < 1000)
                                                        ? "default"
                                                        : "secondary"
                                                }>
                                                    {activity.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Contests & Leaderboard */}
                <div className="space-y-6">
                    {/* Upcoming Contests */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-card-foreground">Upcoming Contests</CardTitle>
                            <CardDescription>Register for upcoming coding challenges</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {upcomingContests.map((contest) => (
                                    <div key={contest.id} className="p-3 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium text-card-foreground">{contest.name}</div>
                                            <Badge variant={contest.registered ? "default" : "outline"}>
                                                {contest.registered ? "Registered" : "Register"}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-muted-foreground mb-2">
                                            {contest.platform} • {contest.duration}
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">{new Date(contest.time).toLocaleString()}</span>
                                            <Button variant="ghost" size="sm" className="h-6 text-muted-foreground hover:text-card-foreground">
                                                <BellIcon className="h-3 w-3 mr-1" />
                                                Remind
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full gap-2">
                                    <TargetIcon className="h-4 w-4" />
                                    View All Contests
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Leaderboard Quickview */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-card-foreground">Leaderboard</CardTitle>
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="global" className="text-xs">Global</TabsTrigger>
                                        <TabsTrigger value="college" className="text-xs">College</TabsTrigger>
                                        <TabsTrigger value="team" className="text-xs">Team</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[200px]">
                                <div className="space-y-2">
                                    {(leaderboards[activeTab as keyof typeof leaderboards] || []).map((item, index) => (
                                        <div 
                                            key={index} 
                                            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                                                item.name === "shadcn" 
                                                    ? "bg-primary/10 border border-primary/20" 
                                                    : "hover:bg-accent/50"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 flex items-center justify-center text-xs rounded-full ${getRankColor(item.rank)}`}>
                                                    {item.rank}
                                                </div>
                                                <div className={`font-medium text-sm ${
                                                    item.name === "shadcn" ? "text-primary font-semibold" : "text-card-foreground"
                                                }`}>
                                                    {item.name}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-semibold text-card-foreground">{item.problems}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.rating ? `Rating: ${item.rating}` : `${item.members} members`}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <Button variant="outline" className="w-full mt-3 gap-2">
                                View Full Leaderboard
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Team & Group Panel */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-card-foreground">Your Teams</CardTitle>
                            <CardDescription>Collaborate and compete with teams</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {teams.map((team) => (
                                    <div key={team.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                                        <div>
                                            <div className="font-medium text-card-foreground">{team.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {team.members} members • {team.problemsSolved} solved
                                            </div>
                                        </div>
                                        <Badge variant={team.rank === 1 ? "default" : "secondary"} className={getRankColor(team.rank)}>
                                            Rank #{team.rank}
                                        </Badge>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full gap-2">
                                    <UsersIcon className="h-4 w-4" />
                                    Discover More Teams
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Visual Analytics Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-card-foreground">Progress Analytics</CardTitle>
                    <CardDescription>Your coding activity and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Activity Heatmap */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-card-foreground">7-Day Activity</h3>
                            <div className="flex gap-1">
                                {activityData.daily.map((count, index) => (
                                    <div key={index} className="flex-1 text-center">
                                        <div 
                                            className={`h-8 rounded mb-1 transition-all ${
                                                count >= 10 ? "bg-primary" :
                                                count >= 7 ? "bg-primary/70" :
                                                count >= 5 ? "bg-primary/40" :
                                                "bg-muted"
                                            }`}
                                        ></div>
                                        <div className="text-xs text-muted-foreground">
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Distribution */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-card-foreground">Problems by Difficulty</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Easy", value: activityData.byDifficulty.easy, color: "bg-green-500" },
                                    { label: "Medium", value: activityData.byDifficulty.medium, color: "bg-yellow-500" },
                                    { label: "Hard", value: activityData.byDifficulty.hard, color: "bg-red-500" }
                                ].map((item, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-card-foreground">{item.label}</span>
                                            <span className="font-medium text-card-foreground">{item.value}%</span>
                                        </div>
                                        <Progress value={item.value} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Suggested Actions & Prompts */}
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <SparklesIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-card-foreground mb-1">Complete Your Profile</h3>
                                <p className="text-muted-foreground">
                                    Link more accounts and complete onboarding for better recommendations and insights.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">
                                Link Accounts
                            </Button>
                            <Button>
                                Complete Setup
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;