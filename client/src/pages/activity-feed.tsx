// src/pages/activity-feed.tsx
import { useState } from "react";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, isWithinInterval } from "date-fns";
import {
    SearchIcon,
    RefreshCwIcon,
    FilterIcon,
    CalendarIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ExternalLinkIcon,
    UsersIcon,
    TrophyIcon,
    CodeIcon,
    ClockIcon,
    ThumbsUpIcon,
    MessageSquareIcon,
    ShareIcon,
    UserPlusIcon,
    SparklesIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const ActivityFeedPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    });
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Mock activity data
    const activities = [
        {
            id: 1,
            user: {
                name: "Shadcn User",
                username: "shadcn",
                avatar: "https://github.com/shadcn.png",
                isVerified: true
            },
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            platform: "LeetCode",
            platformIcon: "💡",
            type: "submission",
            description: "Solved 'Longest Increasing Subsequence'",
            problemName: "Longest Increasing Subsequence",
            problemUrl: "https://leetcode.com/problems/longest-increasing-subsequence",
            status: "Accepted",
            difficulty: "Medium",
            language: "Python",
            team: null,
            details: {
                runtime: "45 ms",
                memory: "16.4 MB",
                codeSnippet: "def lengthOfLIS(self, nums: List[int]) -> int:\n    dp = [1] * len(nums)\n    for i in range(1, len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp) if dp else 0"
            },
            likes: 12,
            comments: 3,
            isLiked: false
        },
        {
            id: 2,
            user: {
                name: "Alice Chen",
                username: "alice_chen",
                avatar: "",
                isVerified: false
            },
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
            platform: "Codeforces",
            platformIcon: "⚡",
            type: "contest",
            description: "Participated in Round #845",
            problemName: "Round #845",
            problemUrl: "https://codeforces.com/contest/845",
            status: "Rank 150",
            difficulty: null,
            language: null,
            team: null,
            details: {
                problemsSolved: 4,
                totalProblems: 6,
                ratingChange: "+25",
                newRating: 1975
            },
            likes: 8,
            comments: 2,
            isLiked: true
        },
        {
            id: 3,
            user: {
                name: "Team Algorithm Masters",
                username: "algorithm_masters",
                avatar: "",
                isVerified: true
            },
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            platform: "Team",
            platformIcon: "👥",
            type: "team",
            description: "Completed weekly team challenge",
            problemName: "Dynamic Programming Set",
            problemUrl: "#",
            status: "Completed",
            difficulty: null,
            language: null,
            team: "Algorithm Masters",
            details: {
                membersParticipated: 8,
                totalProblems: 10,
                averageScore: "85%",
                topPerformer: "shadcn"
            },
            likes: 24,
            comments: 5,
            isLiked: false
        },
        {
            id: 4,
            user: {
                name: "Bob Wilson",
                username: "bob_wilson",
                avatar: "",
                isVerified: false
            },
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            platform: "CodeChef",
            platformIcon: "🍳",
            type: "submission",
            description: "Solved 'SUBARR'",
            problemName: "SUBARR",
            problemUrl: "https://www.codechef.com/problems/SUBARR",
            status: "Accepted",
            difficulty: "Hard",
            language: "C++",
            team: null,
            details: {
                runtime: "0.8s",
                memory: "45.2 MB",
                codeSnippet: "#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    // Solution code here\n    return 0;\n}"
            },
            likes: 5,
            comments: 1,
            isLiked: false
        },
        {
            id: 5,
            user: {
                name: "Shadcn User",
                username: "shadcn",
                avatar: "https://github.com/shadcn.png",
                isVerified: true
            },
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            platform: "LeetCode",
            platformIcon: "💡",
            type: "achievement",
            description: "Earned '100 Problems' badge",
            problemName: "100 Problems Solved",
            problemUrl: "#",
            status: "Achieved",
            difficulty: null,
            language: null,
            team: null,
            details: {
                badgeDescription: "Solved 100 problems across all platforms",
                progress: "100/100",
                dateEarned: "3 days ago"
            },
            likes: 15,
            comments: 4,
            isLiked: true
        }
    ];

    const platforms = [
        { value: "all", label: "All Platforms" },
        { value: "leetcode", label: "LeetCode" },
        { value: "codeforces", label: "Codeforces" },
        { value: "codechef", label: "CodeChef" },
        { value: "hackerrank", label: "HackerRank" },
        { value: "atcoder", label: "AtCoder" },
        { value: "team", label: "Team Activities" }
    ];

    const activityTypes = [
        { value: "all", label: "All Activities" },
        { value: "submission", label: "Submissions" },
        { value: "contest", label: "Contests" },
        { value: "team", label: "Team Events" },
        { value: "achievement", label: "Achievements" }
    ];

    const dateRanges = [
        { value: "24h", label: "Last 24 hours" },
        { value: "week", label: "Last week" },
        { value: "month", label: "Last month" },
        { value: "custom", label: "Custom range" }
    ];

    const filteredActivities = activities.filter(activity => {
        // Search filter
        const matchesSearch = searchQuery === "" ||
            activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.problemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Platform filter
        const matchesPlatform = selectedPlatform === "all" ||
            activity.platform.toLowerCase().includes(selectedPlatform.toLowerCase());

        // Type filter
        const matchesType = selectedType === "all" || activity.type === selectedType;

        // Date filter
        const matchesDate = !dateRange || isWithinInterval(activity.timestamp, {
            start: dateRange.from,
            end: dateRange.to
        });

        return matchesSearch && matchesPlatform && matchesType && matchesDate;
    });

    const toggleExpand = (id: number) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleLoadMore = () => {
        setIsLoading(true);
        // Simulate loading more data
        setTimeout(() => {
            setHasMore(false); // For demo, set to false after first load
            setIsLoading(false);
        }, 1500);
    };

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            "Accepted": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            "Completed": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            "Achieved": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
            "Wrong Answer": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
            "Time Limit Exceeded": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
            "Runtime Error": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        };
        return colors[status] || "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    };

    const getDifficultyColor = (difficulty: string) => {
        const colors: { [key: string]: string } = {
            "Easy": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            "Medium": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
            "Hard": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        };
        return colors[difficulty] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    };

    const formatTimeAgo = (timestamp: Date) => {
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            return "Just now";
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        }
    };

    return (
        <div className="w-full max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-card-foreground">Activity Feed</h1>
                    <p className="text-muted-foreground mt-1">
                        Recent coding activities and achievements from the community
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                        <RefreshCwIcon className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
                        Refresh
                    </Button>
                    <Button>
                        <UserPlusIcon className="h-4 w-4 mr-2" />
                        Find Friends
                    </Button>
                </div>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search activities, users, or problems..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                                <SelectTrigger className="w-[180px]">
                                    <FilterIcon className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    {platforms.map(platform => (
                                        <SelectItem key={platform.value} value={platform.value}>
                                            {platform.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="w-[180px]">
                                    <CodeIcon className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Activity Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {activityTypes.map(type => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-[180px] justify-start">
                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                        {dateRange ? (
                                            `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
                                        ) : (
                                            "Select date range"
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <Calendar
                                        mode="range"
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Feed */}
                <div className="lg:col-span-3 space-y-4">
                    {filteredActivities.length === 0 ? (
                        /* Empty State */
                        <Card className="text-center py-12">
                            <CardContent>
                                <SparklesIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                                    No recent activity to show
                                </h3>
                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                    Try linking a new coding platform or join a team to see collaborative updates here.
                                </p>
                                <div className="flex gap-2 justify-center">
                                    <Button>
                                        Link Platforms
                                    </Button>
                                    <Button variant="outline">
                                        Find Teams
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        /* Activity Feed */
                        <div className="space-y-4">
                            {filteredActivities.map((activity) => (
                                <Card key={activity.id} className="hover:border-primary/50 transition-colors">
                                    <CardContent className="p-4">
                                        {/* Activity Header */}
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-primary/10">
                                                <AvatarImage src={activity.user.avatar} />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {activity.user.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-card-foreground hover:text-primary cursor-pointer">
                                                        {activity.user.name}
                                                    </span>
                                                    {activity.user.isVerified && (
                                                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                                                            Verified
                                                        </Badge>
                                                    )}
                                                    <span className="text-muted-foreground text-sm">
                                                        @{activity.user.username}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                    <ClockIcon className="h-3 w-3" />
                                                    <span title={activity.timestamp.toLocaleString()}>
                                                        {formatTimeAgo(activity.timestamp)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        {activity.platformIcon} {activity.platform}
                                                    </span>
                                                    {activity.team && (
                                                        <Badge variant="outline" className="text-xs">
                                                            <UsersIcon className="h-3 w-3 mr-1" />
                                                            {activity.team}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Activity Content */}
                                        <div className="ml-12 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-card-foreground mb-1">
                                                        {activity.description}
                                                    </p>
                                                    <a
                                                        href={activity.problemUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                                                    >
                                                        {activity.problemName}
                                                        <ExternalLinkIcon className="h-3 w-3" />
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {activity.difficulty && (
                                                        <Badge variant="secondary" className={getDifficultyColor(activity.difficulty)}>
                                                            {activity.difficulty}
                                                        </Badge>
                                                    )}
                                                    <Badge className={getStatusColor(activity.status)}>
                                                        {activity.status}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Expandable Details */}
                                            {expandedItems.has(activity.id) && activity.details && (
                                                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                                    {activity.type === "submission" && (
                                                        <>
                                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                                <div>
                                                                    <span className="text-muted-foreground">Runtime:</span>
                                                                    <span className="font-medium ml-2">{activity.details.runtime}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-muted-foreground">Memory:</span>
                                                                    <span className="font-medium ml-2">{activity.details.memory}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-muted-foreground">Language:</span>
                                                                    <span className="font-medium ml-2">{activity.language}</span>
                                                                </div>
                                                            </div>
                                                            {activity.details.codeSnippet && (
                                                                <div className="bg-background rounded border p-3">
                                                                    <pre className="text-sm overflow-x-auto">
                                                                        <code>{activity.details.codeSnippet}</code>
                                                                    </pre>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}

                                                    {activity.type === "contest" && (
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-muted-foreground">Problems Solved:</span>
                                                                <span className="font-medium ml-2">{activity.details.problemsSolved}/{activity.details.totalProblems}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-muted-foreground">Rating Change:</span>
                                                                <span className="font-medium ml-2 text-green-600">{activity.details.ratingChange}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-muted-foreground">New Rating:</span>
                                                                <span className="font-medium ml-2">{activity.details.newRating}</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activity.type === "team" && (
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-muted-foreground">Members Participated:</span>
                                                                <span className="font-medium ml-2">{activity.details.membersParticipated}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-muted-foreground">Problems:</span>
                                                                <span className="font-medium ml-2">{activity.details.totalProblems}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-muted-foreground">Average Score:</span>
                                                                <span className="font-medium ml-2">{activity.details.averageScore}</span>
                                                            </div>
                                                            <div className="md:col-span-3">
                                                                <span className="text-muted-foreground">Top Performer:</span>
                                                                <span className="font-medium ml-2">{activity.details.topPerformer}</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activity.type === "achievement" && (
                                                        <div className="text-sm space-y-2">
                                                            <div>
                                                                <span className="text-muted-foreground">Description:</span>
                                                                <span className="font-medium ml-2">{activity.details.badgeDescription}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-muted-foreground">Progress:</span>
                                                                <span className="font-medium ml-2">{activity.details.progress}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Activity Actions */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className={cn("gap-2", activity.isLiked && "text-red-600")}
                                                    >
                                                        <ThumbsUpIcon className="h-4 w-4" />
                                                        {activity.likes}
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="gap-2">
                                                        <MessageSquareIcon className="h-4 w-4" />
                                                        {activity.comments}
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="gap-2">
                                                        <ShareIcon className="h-4 w-4" />
                                                        Share
                                                    </Button>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-muted-foreground hover:text-primary"
                                                    >
                                                        <UserPlusIcon className="h-4 w-4 mr-1" />
                                                        Follow
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toggleExpand(activity.id)}
                                                    >
                                                        {expandedItems.has(activity.id) ? (
                                                            <>
                                                                <ChevronUpIcon className="h-4 w-4 mr-1" />
                                                                Less
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ChevronDownIcon className="h-4 w-4 mr-1" />
                                                                Details
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Load More */}
                            {hasMore && (
                                <div className="text-center">
                                    <Button
                                        variant="outline"
                                        onClick={handleLoadMore}
                                        disabled={isLoading}
                                        className="gap-2"
                                    >
                                        {isLoading ? (
                                            <RefreshCwIcon className="h-4 w-4 animate-spin" />
                                        ) : null}
                                        Load More Activities
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Filters */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <UsersIcon className="h-4 w-4 mr-2" />
                                My Activity
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <UsersIcon className="h-4 w-4 mr-2" />
                                My Teams
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <UserPlusIcon className="h-4 w-4 mr-2" />
                                Friends & Followed
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="font-medium text-sm text-card-foreground">
                                    Team Invite: Code Warriors
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    Invited by Bob Wilson
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" className="flex-1">Accept</Button>
                                    <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                                </div>
                            </div>

                            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                                <div className="font-medium text-sm text-card-foreground">
                                    Weekly Challenge Starts Tomorrow
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    Dynamic Programming focused
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Leaderboard Snapshot */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Top Coders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { rank: 1, name: "Tourist", rating: 3400 },
                                    { rank: 2, name: "Benq", rating: 3300 },
                                    { rank: 3, name: "Um_nik", rating: 3250 },
                                    { rank: 4, name: "Errichto", rating: 3200 },
                                    { rank: 5, name: "Petr", rating: 3150 }
                                ].map((user) => (
                                    <div key={user.rank} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-6 h-6 flex items-center justify-center text-xs rounded-full",
                                                user.rank === 1 && "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
                                                user.rank === 2 && "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
                                                user.rank === 3 && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
                                                user.rank > 3 && "bg-muted text-muted-foreground"
                                            )}>
                                                {user.rank}
                                            </div>
                                            <span className="font-medium text-sm">{user.name}</span>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {user.rating}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-4 gap-2">
                                <TrophyIcon className="h-4 w-4" />
                                View Full Leaderboard
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ActivityFeedPage;