// src/pages/progress-tracker.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import {
    CalendarIcon,
    DownloadIcon,
    ShareIcon,
    RefreshCwIcon,
    FilterIcon,
    TargetIcon,
    TrendingUpIcon,
    TrophyIcon,
    ClockIcon,
    CodeIcon,
    BarChart3Icon,
    SparklesIcon,
    CheckCircleIcon,
    XCircleIcon,
    AlertCircleIcon,
    ZapIcon,
    StarIcon,
    AwardIcon,
    EyeIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    PlusIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock chart components - replace with actual chart library implementations
const ProblemsSolvedChart = ({ data }: { data: any[] }) => (
    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Problems Solved Over Time</p>
            <p className="text-sm">Daily counts with difficulty breakdown</p>
        </div>
    </div>
);

const TopicMasteryChart = ({ data }: { data: any[] }) => (
    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Topic Mastery Distribution</p>
            <p className="text-sm">Pie chart showing topic coverage</p>
        </div>
    </div>
);

const SubmissionAccuracyChart = ({ data }: { data: any[] }) => (
    <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Submission Accuracy</p>
            <p className="text-sm">Accepted vs rejected submissions</p>
        </div>
    </div>
);

const ContestPerformanceChart = ({ data }: { data: any[] }) => (
    <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Contest Performance</p>
            <p className="text-sm">Rating progression over time</p>
        </div>
    </div>
);

const LanguageUsageChart = ({ data }: { data: any[] }) => (
    <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Language Usage</p>
            <p className="text-sm">Programming language distribution</p>
        </div>
    </div>
);

const ProgressTrackerPage = () => {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: subDays(new Date(), 30),
        to: new Date(),
    });
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["all"]);
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(["all"]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSynced, setLastSynced] = useState<Date>(new Date());
    const [activeTab, setActiveTab] = useState("overview");

    // Mock data
    const summaryStats = {
        totalProblems: 347,
        previousPeriodProblems: 285,
        averageDifficulty: 2.4,
        currentStreak: 28,
        improvement: 21.8,
        contestParticipation: 12,
        accuracy: 76.5,
        weakAreas: ["Dynamic Programming", "Graph Theory"],
        strongAreas: ["Arrays", "Strings", "Sorting"]
    };

    const platforms = [
        { id: "leetcode", name: "LeetCode", color: "text-orange-500", solved: 187 },
        { id: "codeforces", name: "Codeforces", color: "text-red-500", solved: 95 },
        { id: "codechef", name: "CodeChef", color: "text-brown-500", solved: 45 },
        { id: "hackerrank", name: "HackerRank", color: "text-green-500", solved: 20 }
    ];

    const difficulties = [
        { id: "easy", name: "Easy", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300", count: 145 },
        { id: "medium", name: "Medium", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300", count: 162 },
        { id: "hard", name: "Hard", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300", count: 40 }
    ];

    const topics = [
        { name: "Arrays & Hashing", solved: 85, total: 120, mastery: 71, strength: "strong" },
        { name: "Dynamic Programming", solved: 45, total: 100, mastery: 45, strength: "weak" },
        { name: "Graphs", solved: 38, total: 80, mastery: 48, strength: "weak" },
        { name: "Trees", solved: 52, total: 70, mastery: 74, strength: "strong" },
        { name: "Sorting", solved: 48, total: 55, mastery: 87, strength: "strong" },
        { name: "Greedy", solved: 35, total: 65, mastery: 54, strength: "medium" },
        { name: "Backtracking", solved: 28, total: 50, mastery: 56, strength: "medium" },
        { name: "Math", solved: 65, total: 85, mastery: 76, strength: "strong" }
    ];

    const submissions = [
        {
            id: 1,
            date: new Date(Date.now() - 2 * 60 * 60 * 1000),
            platform: "LeetCode",
            problemName: "Longest Increasing Subsequence",
            difficulty: "Medium",
            verdict: "Accepted",
            timeTaken: "45 min",
            contest: null,
            topic: "Dynamic Programming"
        },
        {
            id: 2,
            date: new Date(Date.now() - 5 * 60 * 60 * 1000),
            platform: "Codeforces",
            problemName: "Array Transformation",
            difficulty: "Hard",
            verdict: "Wrong Answer",
            timeTaken: "60 min",
            contest: "Round #845",
            topic: "Arrays"
        },
        {
            id: 3,
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            platform: "LeetCode",
            problemName: "Binary Tree Level Order Traversal",
            difficulty: "Medium",
            verdict: "Accepted",
            timeTaken: "25 min",
            contest: null,
            topic: "Trees"
        },
        {
            id: 4,
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            platform: "CodeChef",
            problemName: "Chef and Strings",
            difficulty: "Easy",
            verdict: "Accepted",
            timeTaken: "15 min",
            contest: "Weekly Contest",
            topic: "Strings"
        },
        {
            id: 5,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            platform: "LeetCode",
            problemName: "Course Schedule",
            difficulty: "Medium",
            verdict: "Time Limit Exceeded",
            timeTaken: "50 min",
            contest: null,
            topic: "Graphs"
        }
    ];

    const goals = [
        {
            id: 1,
            title: "Solve 50 Medium Problems",
            description: "Focus on medium difficulty problems this month",
            current: 32,
            target: 50,
            progress: 64,
            deadline: "2024-02-28",
            category: "problems"
        },
        {
            id: 2,
            title: "Maintain 30-day Streak",
            description: "Code every day for 30 consecutive days",
            current: 28,
            target: 30,
            progress: 93,
            deadline: "2024-02-15",
            category: "streak"
        },
        {
            id: 3,
            title: "Participate in 8 Contests",
            description: "Join weekly programming contests",
            current: 5,
            target: 8,
            progress: 63,
            deadline: "2024-02-29",
            category: "contests"
        }
    ];

    const milestones = [
        { id: 1, name: "100 Problems Solved", achieved: true, date: "2024-01-15", icon: "🏆" },
        { id: 2, name: "30-Day Streak", achieved: true, date: "2024-01-20", icon: "🔥" },
        { id: 3, name: "1800 Rating", achieved: false, progress: 85, icon: "⭐" },
        { id: 4, name: "Master Dynamic Programming", achieved: false, progress: 45, icon: "⚡" }
    ];

    const handlePlatformToggle = (platformId: string) => {
        if (platformId === "all") {
            setSelectedPlatforms(["all"]);
        } else {
            const newPlatforms = selectedPlatforms.includes("all")
                ? [platformId]
                : selectedPlatforms.includes(platformId)
                    ? selectedPlatforms.filter(p => p !== platformId)
                    : [...selectedPlatforms, platformId];

            setSelectedPlatforms(newPlatforms.length === 0 ? ["all"] : newPlatforms);
        }
    };

    const handleDifficultyToggle = (difficultyId: string) => {
        if (difficultyId === "all") {
            setSelectedDifficulties(["all"]);
        } else {
            const newDifficulties = selectedDifficulties.includes("all")
                ? [difficultyId]
                : selectedDifficulties.includes(difficultyId)
                    ? selectedDifficulties.filter(d => d !== difficultyId)
                    : [...selectedDifficulties, difficultyId];

            setSelectedDifficulties(newDifficulties.length === 0 ? ["all"] : newDifficulties);
        }
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setLastSynced(new Date());
        }, 2000);
    };

    const handleExport = (format: string) => {
        console.log(`Exporting progress as ${format}`);
        // Actual export logic would go here
    };

    const getVerdictIcon = (verdict: string) => {
        const icons = {
            "Accepted": <CheckCircleIcon className="h-4 w-4 text-green-600" />,
            "Wrong Answer": <XCircleIcon className="h-4 w-4 text-red-600" />,
            "Time Limit Exceeded": <ClockIcon className="h-4 w-4 text-orange-600" />,
            "Runtime Error": <AlertCircleIcon className="h-4 w-4 text-red-600" />
        };
        return icons[verdict as keyof typeof icons] || <AlertCircleIcon className="h-4 w-4 text-gray-600" />;
    };

    const getVerdictColor = (verdict: string) => {
        const colors = {
            "Accepted": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            "Wrong Answer": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
            "Time Limit Exceeded": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
            "Runtime Error": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        };
        return colors[verdict as keyof typeof colors] || "bg-gray-100 text-gray-800";
    };

    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            "Easy": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            "Medium": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
            "Hard": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        };
        return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800";
    };

    const getStrengthColor = (strength: string) => {
        const colors = {
            "strong": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            "medium": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
            "weak": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        };
        return colors[strength as keyof typeof colors] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="w-full max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-card-foreground">Progress Tracker</h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor your coding journey and track improvement over time
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">
                        Last synced: {format(lastSynced, "MMM d, h:mm a")}
                    </div>
                    <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
                        <RefreshCwIcon className={cn("h-4 w-4 mr-2", isSyncing && "animate-spin")} />
                        Sync Now
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <DownloadIcon className="h-4 w-4 mr-2" />
                                Export
                                <ChevronDownIcon className="h-4 w-4 ml-2" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48">
                            <div className="space-y-1">
                                <Button variant="ghost" className="w-full justify-start" onClick={() => handleExport("pdf")}>
                                    PDF Report
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => handleExport("csv")}>
                                    CSV Data
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => handleExport("share")}>
                                    Share Snapshot
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Date Range */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-[240px] justify-start">
                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                        {dateRange ? (
                                            `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                                        ) : (
                                            "Select date range"
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        selected={dateRange}
                                        onSelect={(range: any) => setDateRange(range)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            {/* Quick Date Presets */}
                            <div className="flex gap-1">
                                {[
                                    { label: "7D", days: 7 },
                                    { label: "30D", days: 30 },
                                    { label: "90D", days: 90 },
                                    { label: "1Y", days: 365 }
                                ].map(preset => (
                                    <Button
                                        key={preset.label}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDateRange({
                                            from: subDays(new Date(), preset.days),
                                            to: new Date()
                                        })}
                                    >
                                        {preset.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Platform Filter */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <FilterIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Platforms</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant={selectedPlatforms.includes("all") ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => handlePlatformToggle("all")}
                                >
                                    All Platforms
                                </Badge>
                                {platforms.map(platform => (
                                    <Badge
                                        key={platform.id}
                                        variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                                        className={cn("cursor-pointer", platform.color)}
                                        onClick={() => handlePlatformToggle(platform.id)}
                                    >
                                        {platform.name} ({platform.solved})
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Filter */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <FilterIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Difficulty</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant={selectedDifficulties.includes("all") ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => handleDifficultyToggle("all")}
                                >
                                    All Levels
                                </Badge>
                                {difficulties.map(difficulty => (
                                    <Badge
                                        key={difficulty.id}
                                        variant={selectedDifficulties.includes(difficulty.id) ? "default" : "outline"}
                                        className={cn("cursor-pointer", difficulty.color)}
                                        onClick={() => handleDifficultyToggle(difficulty.id)}
                                    >
                                        {difficulty.name} ({difficulty.count})
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    {
                        label: "Problems Solved",
                        value: summaryStats.totalProblems,
                        trend: summaryStats.improvement,
                        icon: TargetIcon,
                        color: "text-blue-600",
                        description: `${summaryStats.previousPeriodProblems} last period`
                    },
                    {
                        label: "Avg Difficulty",
                        value: summaryStats.averageDifficulty,
                        trend: 0,
                        icon: StarIcon,
                        color: "text-purple-600",
                        description: "Out of 5.0 scale"
                    },
                    {
                        label: "Current Streak",
                        value: `${summaryStats.currentStreak} days`,
                        trend: 0,
                        icon: ZapIcon,
                        color: "text-orange-600",
                        description: "Daily coding streak"
                    },
                    {
                        label: "Improvement",
                        value: `${summaryStats.improvement}%`,
                        trend: summaryStats.improvement,
                        icon: TrendingUpIcon,
                        color: "text-green-600",
                        description: "Vs previous period"
                    },
                    {
                        label: "Contests",
                        value: summaryStats.contestParticipation,
                        trend: 25,
                        icon: TrophyIcon,
                        color: "text-yellow-600",
                        description: "Participated"
                    },
                    {
                        label: "Accuracy",
                        value: `${summaryStats.accuracy}%`,
                        trend: 5.2,
                        icon: CheckCircleIcon,
                        color: "text-green-600",
                        description: "Accepted submissions"
                    }
                ].map((stat, index) => (
                    <Card key={index} className="bg-card hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <stat.icon className={cn("h-5 w-5", stat.color)} />
                                {stat.trend > 0 && (
                                    <div className="flex items-center gap-1 text-green-600">
                                        <TrendingUpIcon className="h-3 w-3" />
                                        <span className="text-xs font-medium">+{stat.trend}%</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                            <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                        <BarChart3Icon className="h-4 w-4" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="topics" className="flex items-center gap-2">
                        <CodeIcon className="h-4 w-4" />
                        Topics
                    </TabsTrigger>
                    <TabsTrigger value="submissions" className="flex items-center gap-2">
                        <EyeIcon className="h-4 w-4" />
                        Submissions
                    </TabsTrigger>
                    <TabsTrigger value="goals" className="flex items-center gap-2">
                        <TargetIcon className="h-4 w-4" />
                        Goals
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Problems Solved Over Time */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Problems Solved Over Time</CardTitle>
                                <CardDescription>Daily problem-solving activity with difficulty breakdown</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProblemsSolvedChart data={[]} />
                            </CardContent>
                        </Card>

                        {/* Topic Mastery */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Topic Mastery</CardTitle>
                                <CardDescription>Distribution across problem categories</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TopicMasteryChart data={[]} />
                                <div className="mt-4 space-y-3">
                                    {topics.slice(0, 4).map(topic => (
                                        <div key={topic.name} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{topic.name}</span>
                                                <Badge variant="secondary" className={getStrengthColor(topic.strength)}>
                                                    {topic.mastery}%
                                                </Badge>
                                            </div>
                                            <Progress value={topic.mastery} className="h-2" />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>{topic.solved} solved</span>
                                                <span>{topic.total} total</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Performance Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Metrics</CardTitle>
                                <CardDescription>Key performance indicators</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Submission Accuracy</span>
                                            <span>{summaryStats.accuracy}%</span>
                                        </div>
                                        <Progress value={summaryStats.accuracy} className="h-2" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Average Solve Time</span>
                                            <span>32 min</span>
                                        </div>
                                        <Progress value={65} className="h-2" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Contest Performance</span>
                                            <span>Top 15%</span>
                                        </div>
                                        <Progress value={85} className="h-2" />
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-center p-2 bg-muted/50 rounded">
                                        <div className="font-semibold">28</div>
                                        <div className="text-muted-foreground">Active Days</div>
                                    </div>
                                    <div className="text-center p-2 bg-muted/50 rounded">
                                        <div className="font-semibold">11.2</div>
                                        <div className="text-muted-foreground">Daily Avg</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Charts Row */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Submission Accuracy</CardTitle>
                                <CardDescription>Accepted vs rejected submissions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SubmissionAccuracyChart data={[]} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Language Usage</CardTitle>
                                <CardDescription>Programming languages distribution</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <LanguageUsageChart data={[]} />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Topics Tab */}
                <TabsContent value="topics" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Topic Mastery Detailed */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Detailed Topic Analysis</CardTitle>
                                <CardDescription>Comprehensive breakdown of your performance across all topics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-96">
                                    <div className="space-y-4">
                                        {topics.map(topic => (
                                            <div key={topic.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-32">
                                                        <span className="font-medium">{topic.name}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <Progress value={topic.mastery} className="h-2" />
                                                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                            <span>{topic.solved} of {topic.total} problems solved</span>
                                                            <span>{topic.mastery}% mastery</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className={getStrengthColor(topic.strength)}>
                                                        {topic.strength}
                                                    </Badge>
                                                    <Button variant="outline" size="sm">
                                                        Practice
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>

                        {/* Strength & Weakness */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Strengths</CardTitle>
                                <CardDescription>Your strongest areas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {topics.filter(t => t.strength === "strong").slice(0, 3).map(topic => (
                                        <div key={topic.name} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-sm">{topic.name}</span>
                                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                    {topic.mastery}%
                                                </Badge>
                                            </div>
                                            <Progress value={topic.mastery} className="h-1 mt-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Areas to Improve</CardTitle>
                                <CardDescription>Focus on these topics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {topics.filter(t => t.strength === "weak").slice(0, 3).map(topic => (
                                        <div key={topic.name} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-sm">{topic.name}</span>
                                                <Badge variant="secondary" className="bg-red-100 text-red-800">
                                                    {topic.mastery}%
                                                </Badge>
                                            </div>
                                            <Progress value={topic.mastery} className="h-1 mt-2" />
                                            <Button variant="outline" size="sm" className="w-full mt-2">
                                                Start Practice
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Submissions Tab */}
                <TabsContent value="submissions" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Submission History</CardTitle>
                            <CardDescription>Detailed log of all your problem submissions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-96">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date & Time</TableHead>
                                            <TableHead>Platform</TableHead>
                                            <TableHead>Problem</TableHead>
                                            <TableHead>Difficulty</TableHead>
                                            <TableHead>Topic</TableHead>
                                            <TableHead>Verdict</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Contest</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {submissions.map((submission) => (
                                            <TableRow key={submission.id} className="hover:bg-accent/50 transition-colors">
                                                <TableCell className="font-medium">
                                                    {format(submission.date, "MMM d, yyyy")}
                                                    <div className="text-xs text-muted-foreground">
                                                        {format(submission.date, "h:mm a")}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{submission.platform}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium hover:text-primary cursor-pointer">
                                                        {submission.problemName}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className={getDifficultyColor(submission.difficulty)}>
                                                        {submission.difficulty}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm">{submission.topic}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {getVerdictIcon(submission.verdict)}
                                                        <Badge variant="secondary" className={getVerdictColor(submission.verdict)}>
                                                            {submission.verdict}
                                                        </Badge>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm">{submission.timeTaken}</span>
                                                </TableCell>
                                                <TableCell>
                                                    {submission.contest ? (
                                                        <Badge variant="outline">{submission.contest}</Badge>
                                                    ) : (
                                                        <span className="text-muted-foreground text-sm">-</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Goals Tab */}
                <TabsContent value="goals" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Current Goals */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Current Goals</CardTitle>
                                <CardDescription>Track your progress towards active goals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {goals.map(goal => (
                                        <div key={goal.id} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <TargetIcon className="h-4 w-4 text-primary" />
                                                    <span className="font-semibold">{goal.title}</span>
                                                </div>
                                                <Badge variant="secondary">
                                                    {goal.progress}%
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Progress</span>
                                                    <span>{goal.current}/{goal.target}</span>
                                                </div>
                                                <Progress value={goal.progress} className="h-2" />
                                                <div className="flex justify-between text-xs text-muted-foreground">
                                                    <span>Deadline: {goal.deadline}</span>
                                                    <span>{goal.target - goal.current} remaining</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-4 gap-2">
                                    <PlusIcon className="h-4 w-4" />
                                    Set New Goal
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Milestones */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Milestones & Achievements</CardTitle>
                                <CardDescription>Celebrate your coding journey milestones</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {milestones.map(milestone => (
                                        <div key={milestone.id} className={cn(
                                            "p-4 border rounded-lg transition-colors",
                                            milestone.achieved
                                                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                                : "hover:bg-accent/50"
                                        )}>
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">{milestone.icon}</div>
                                                <div className="flex-1">
                                                    <div className="font-semibold">{milestone.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {milestone.achieved
                                                            ? `Achieved on ${milestone.date}`
                                                            : milestone.progress
                                                                ? `${milestone.progress}% complete`
                                                                : "Not started"
                                                        }
                                                    </div>
                                                </div>
                                                {milestone.achieved ? (
                                                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                                ) : (
                                                    <div className="w-8 h-8 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center">
                                                        <span className="text-xs text-muted-foreground">
                                                            {milestone.progress || 0}%
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {!milestone.achieved && milestone.progress && (
                                                <Progress value={milestone.progress} className="h-1 mt-2" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contest Performance */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Contest Performance Trend</CardTitle>
                                <CardDescription>Your rating progression in programming contests</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContestPerformanceChart data={[]} />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProgressTrackerPage;