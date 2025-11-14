// src/pages/analytics.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { format, subDays, subMonths } from "date-fns";
import {
    CalendarIcon,
    DownloadIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    TargetIcon,
    TrophyIcon,
    BarChart3Icon,
    SparklesIcon,
    LightbulbIcon,
    FilterIcon,
    RefreshCwIcon,
    ChevronDownIcon,
    StarIcon,
    ZapIcon,
    UsersIcon,
    MinusIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock chart components - replace with actual chart library implementations
const ProblemsSolvedChart = ({ data }: { data: any[] }) => (
    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Problems Solved Over Time Chart</p>
            <p className="text-sm">Line chart showing daily problem counts</p>
        </div>
    </div>
);

const TopicBreakdownChart = ({ data }: { data: any[] }) => (
    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Topic Distribution Chart</p>
            <p className="text-sm">Pie chart showing problem topics</p>
        </div>
    </div>
);

const LanguageUsageChart = ({ data }: { data: any[] }) => (
    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Language Usage Chart</p>
            <p className="text-sm">Bar chart showing programming languages</p>
        </div>
    </div>
);

const ContestPerformanceChart = ({ data }: { data: any[] }) => (
    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Contest Performance Chart</p>
            <p className="text-sm">Line chart showing rating over time</p>
        </div>
    </div>
);

const ActivityHeatmap = ({ data }: { data: any[] }) => (
    <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
            <p>Activity Heatmap</p>
            <p className="text-sm">Calendar view with activity intensity</p>
        </div>
    </div>
);

const AnalyticsPage = () => {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: subMonths(new Date(), 1),
        to: new Date(),
    });
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["all"]);
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["all"]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    // Mock data
    const kpis = {
        totalProblems: 1250,
        problemsTrend: 12.5,
        contestParticipation: 45,
        contestTrend: 8.3,
        longestStreak: 67,
        streakTrend: 5.2,
        avgDifficulty: 2.8,
        difficultyTrend: -3.1,
        avgContestRank: 85,
        rankTrend: -15.7,
        achievements: 23,
        achievementsTrend: 25.0
    };

    const platforms = [
        { id: "leetcode", name: "LeetCode", color: "text-orange-500" },
        { id: "codeforces", name: "Codeforces", color: "text-red-500" },
        { id: "codechef", name: "CodeChef", color: "text-brown-500" },
        { id: "atcoder", name: "AtCoder", color: "text-blue-500" },
        { id: "hackerrank", name: "HackerRank", color: "text-green-500" }
    ];

    const metrics = [
        { id: "problems", name: "Problems Solved" },
        { id: "contests", name: "Contest Performance" },
        { id: "streaks", name: "Activity Streaks" },
        { id: "difficulty", name: "Difficulty Levels" },
        { id: "topics", name: "Topic Analysis" },
        { id: "languages", name: "Language Usage" }
    ];

    const topics = [
        { name: "Arrays & Hashing", count: 320, percentage: 25.6, strength: "strong" },
        { name: "Dynamic Programming", count: 180, percentage: 14.4, strength: "medium" },
        { name: "Graphs", count: 150, percentage: 12.0, strength: "medium" },
        { name: "Trees", count: 140, percentage: 11.2, strength: "strong" },
        { name: "Sorting", count: 95, percentage: 7.6, strength: "strong" },
        { name: "Greedy", count: 85, percentage: 6.8, strength: "weak" },
        { name: "Backtracking", count: 75, percentage: 6.0, strength: "weak" },
        { name: "Math", count: 205, percentage: 16.4, strength: "strong" }
    ];

    const languages = [
        { name: "Python", count: 650, percentage: 52.0, trend: 5.2 },
        { name: "C++", count: 320, percentage: 25.6, trend: -2.1 },
        { name: "Java", count: 180, percentage: 14.4, trend: -1.3 },
        { name: "JavaScript", count: 100, percentage: 8.0, trend: 8.7 }
    ];

    const comparisons = {
        peerAverage: {
            problems: 980,
            rating: 1650,
            contests: 32,
            streak: 28
        },
        globalAverage: {
            problems: 750,
            rating: 1450,
            contests: 25,
            streak: 21
        }
    };

    const recommendations = [
        {
            id: 1,
            type: "practice",
            title: "Focus on Dynamic Programming",
            description: "Based on your performance, practice more DP problems to improve",
            priority: "high",
            progress: 35,
            target: 50
        },
        {
            id: 2,
            type: "contest",
            title: "Join Weekly Contests",
            description: "Regular contest participation can boost your rating",
            priority: "medium",
            progress: 3,
            target: 4
        },
        {
            id: 3,
            type: "topic",
            title: "Review Backtracking Problems",
            description: "Your backtracking success rate is below average",
            priority: "medium",
            progress: 15,
            target: 30
        }
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

    const handleMetricToggle = (metricId: string) => {
        if (metricId === "all") {
            setSelectedMetrics(["all"]);
        } else {
            const newMetrics = selectedMetrics.includes("all")
                ? [metricId]
                : selectedMetrics.includes(metricId)
                    ? selectedMetrics.filter(m => m !== metricId)
                    : [...selectedMetrics, metricId];

            setSelectedMetrics(newMetrics.length === 0 ? ["all"] : newMetrics);
        }
    };

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    const handleExport = (format: string) => {
        // Export logic would go here
        console.log(`Exporting as ${format}`);
    };

    const getTrendIcon = (trend: number) => {
        if (trend > 0) return <TrendingUpIcon className="h-4 w-4 text-green-600" />;
        if (trend < 0) return <TrendingDownIcon className="h-4 w-4 text-red-600" />;
        return <MinusIcon className="h-4 w-4 text-gray-500" />;
    };

    const getTrendColor = (trend: number) => {
        if (trend > 0) return "text-green-600";
        if (trend < 0) return "text-red-600";
        return "text-gray-500";
    };

    const getStrengthColor = (strength: string) => {
        const colors = {
            strong: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
            weak: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        };
        return colors[strength as keyof typeof colors] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="w-full max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-card-foreground">Analytics & Insights</h1>
                    <p className="text-muted-foreground mt-1">
                        Deep dive into your coding progress and performance metrics
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                        <RefreshCwIcon className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
                        Refresh Data
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
                                    Shareable Link
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
                                    <Button variant="outline" className="w-60 justify-start">
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
                                    { label: "1W", days: 7 },
                                    { label: "1M", days: 30 },
                                    { label: "3M", days: 90 },
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
                                        {platform.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Metrics Filter */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Metrics</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant={selectedMetrics.includes("all") ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => handleMetricToggle("all")}
                                >
                                    All Metrics
                                </Badge>
                                {metrics.map(metric => (
                                    <Badge
                                        key={metric.id}
                                        variant={selectedMetrics.includes(metric.id) ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => handleMetricToggle(metric.id)}
                                    >
                                        {metric.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Summary KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    {
                        label: "Problems Solved",
                        value: kpis.totalProblems,
                        trend: kpis.problemsTrend,
                        icon: TargetIcon,
                        color: "text-blue-600"
                    },
                    {
                        label: "Contests",
                        value: kpis.contestParticipation,
                        trend: kpis.contestTrend,
                        icon: TrophyIcon,
                        color: "text-purple-600"
                    },
                    {
                        label: "Longest Streak",
                        value: kpis.longestStreak,
                        trend: kpis.streakTrend,
                        icon: ZapIcon,
                        color: "text-orange-600"
                    },
                    {
                        label: "Avg Difficulty",
                        value: kpis.avgDifficulty,
                        trend: kpis.difficultyTrend,
                        icon: StarIcon,
                        color: "text-green-600"
                    },
                    {
                        label: "Avg Contest Rank",
                        value: kpis.avgContestRank,
                        trend: kpis.rankTrend,
                        icon: TrendingUpIcon,
                        color: "text-red-600"
                    },
                    {
                        label: "Achievements",
                        value: kpis.achievements,
                        trend: kpis.achievementsTrend,
                        icon: SparklesIcon,
                        color: "text-yellow-600"
                    }
                ].map((kpi, index) => (
                    <Card key={index} className="bg-card hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                                <div className="flex items-center gap-1">
                                    {getTrendIcon(kpi.trend)}
                                    <span className={cn("text-xs font-medium", getTrendColor(kpi.trend))}>
                                        {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
                                    </span>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-card-foreground">{kpi.value}</div>
                            <div className="text-sm text-muted-foreground">{kpi.label}</div>
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
                    <TabsTrigger value="performance" className="flex items-center gap-2">
                        <TrendingUpIcon className="h-4 w-4" />
                        Performance
                    </TabsTrigger>
                    <TabsTrigger value="comparison" className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4" />
                        Comparison
                    </TabsTrigger>
                    <TabsTrigger value="recommendations" className="flex items-center gap-2">
                        <LightbulbIcon className="h-4 w-4" />
                        Recommendations
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Problems Solved Over Time */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Problems Solved Over Time</CardTitle>
                                <CardDescription>Daily problem-solving activity with contest highlights</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProblemsSolvedChart data={[]} />
                            </CardContent>
                        </Card>

                        {/* Topic Breakdown */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Topic Distribution</CardTitle>
                                <CardDescription>Breakdown of problems by category and topic</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TopicBreakdownChart data={[]} />
                                <div className="mt-4 space-y-2">
                                    {topics.slice(0, 4).map(topic => (
                                        <div key={topic.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{topic.name}</span>
                                                <Badge variant="secondary" className={getStrengthColor(topic.strength)}>
                                                    {topic.strength}
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {topic.count} ({topic.percentage}%)
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Language Usage */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Language Usage</CardTitle>
                                <CardDescription>Programming languages used across platforms</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <LanguageUsageChart data={[]} />
                                <div className="mt-4 space-y-3">
                                    {languages.map(language => (
                                        <div key={language.name}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">{language.name}</span>
                                                <div className="flex items-center gap-1">
                                                    {getTrendIcon(language.trend)}
                                                    <span className={cn("text-xs", getTrendColor(language.trend))}>
                                                        {language.trend > 0 ? '+' : ''}{language.trend}%
                                                    </span>
                                                </div>
                                            </div>
                                            <Progress value={language.percentage} className="h-2" />
                                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                <span>{language.count} problems</span>
                                                <span>{language.percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Activity Heatmap */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Activity Heatmap</CardTitle>
                                <CardDescription>Daily coding activity intensity</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ActivityHeatmap data={[]} />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Contest Performance */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Contest Performance</CardTitle>
                                <CardDescription>Rating progression and contest rankings over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContestPerformanceChart data={[]} />
                            </CardContent>
                        </Card>

                        {/* Difficulty Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Difficulty Analysis</CardTitle>
                                <CardDescription>Distribution of problems by difficulty level</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { level: "Easy", count: 450, percentage: 36, color: "bg-green-500" },
                                        { level: "Medium", count: 625, percentage: 50, color: "bg-yellow-500" },
                                        { level: "Hard", count: 175, percentage: 14, color: "bg-red-500" }
                                    ].map(difficulty => (
                                        <div key={difficulty.level}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">{difficulty.level}</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {difficulty.count} ({difficulty.percentage}%)
                                                </span>
                                            </div>
                                            <Progress value={difficulty.percentage} className="h-3" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Streak Analysis */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Streak Analysis</CardTitle>
                                <CardDescription>Current and historical coding streaks</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                                        <div className="text-2xl font-bold text-primary">{kpis.longestStreak} days</div>
                                        <div className="text-sm text-muted-foreground">Current Streak</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="text-center p-2 bg-muted/50 rounded">
                                            <div className="font-semibold">45</div>
                                            <div className="text-muted-foreground">Best This Month</div>
                                        </div>
                                        <div className="text-center p-2 bg-muted/50 rounded">
                                            <div className="font-semibold">89</div>
                                            <div className="text-muted-foreground">All Time Best</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Comparison Tab */}
                <TabsContent value="comparison" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Peer Comparison */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Peer Comparison</CardTitle>
                                <CardDescription>Compared with your college and team averages</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {[
                                        { metric: "Problems Solved", user: kpis.totalProblems, peer: comparisons.peerAverage.problems, global: comparisons.globalAverage.problems },
                                        { metric: "Contest Rating", user: kpis.avgContestRank, peer: comparisons.peerAverage.rating, global: comparisons.globalAverage.rating },
                                        { metric: "Contests Joined", user: kpis.contestParticipation, peer: comparisons.peerAverage.contests, global: comparisons.globalAverage.contests },
                                        { metric: "Current Streak", user: kpis.longestStreak, peer: comparisons.peerAverage.streak, global: comparisons.globalAverage.streak }
                                    ].map((item, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium">{item.metric}</span>
                                                <span className="text-muted-foreground">You: {item.user}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-xs">
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <span>Peer Avg</span>
                                                        <span>{item.peer}</span>
                                                    </div>
                                                    <Progress
                                                        value={(item.user / item.peer) * 100}
                                                        className="h-2"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <span>Global Avg</span>
                                                        <span>{item.global}</span>
                                                    </div>
                                                    <Progress
                                                        value={(item.user / item.global) * 100}
                                                        className="h-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Strength Analysis */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Strength Analysis</CardTitle>
                                <CardDescription>Your strongest and weakest areas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-green-600">Strengths</h4>
                                        <div className="space-y-2">
                                            {topics.filter(t => t.strength === "strong").slice(0, 3).map(topic => (
                                                <div key={topic.name} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                                                    <span className="text-sm">{topic.name}</span>
                                                    <Badge variant="secondary">{topic.percentage}%</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2 text-red-600">Areas to Improve</h4>
                                        <div className="space-y-2">
                                            {topics.filter(t => t.strength === "weak").slice(0, 3).map(topic => (
                                                <div key={topic.name} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded">
                                                    <span className="text-sm">{topic.name}</span>
                                                    <Badge variant="secondary">{topic.percentage}%</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Recommendations Tab */}
                <TabsContent value="recommendations" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Practice Recommendations */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Practice Recommendations</CardTitle>
                                <CardDescription>Personalized suggestions based on your analytics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recommendations.map(rec => (
                                        <div key={rec.id} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <SparklesIcon className="h-4 w-4 text-primary" />
                                                    <span className="font-semibold">{rec.title}</span>
                                                </div>
                                                <Badge variant={rec.priority === "high" ? "destructive" : "secondary"}>
                                                    {rec.priority}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Progress</span>
                                                    <span>{rec.progress}/{rec.target}</span>
                                                </div>
                                                <Progress value={(rec.progress / rec.target) * 100} className="h-2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Goal Setting */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Goal Setting</CardTitle>
                                <CardDescription>Set and track your coding goals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 bg-primary/5 rounded-lg">
                                        <h4 className="font-semibold mb-2">Monthly Goals</h4>
                                        <div className="space-y-3">
                                            {[
                                                { goal: "Solve 50 DP problems", current: 18, target: 50 },
                                                { goal: "Maintain 30-day streak", current: 15, target: 30 },
                                                { goal: "Participate in 4 contests", current: 1, target: 4 }
                                            ].map((item, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>{item.goal}</span>
                                                        <span>{item.current}/{item.target}</span>
                                                    </div>
                                                    <Progress value={(item.current / item.target) * 100} className="h-2" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Button className="w-full gap-2">
                                        <TargetIcon className="h-4 w-4" />
                                        Set New Goal
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AnalyticsPage;