// src/pages/leaderboards.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    SearchIcon,
    TrophyIcon,
    UsersIcon,
    BuildingIcon,
    GlobeIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    MinusIcon,
    TargetIcon,
    ClockIcon,
    InfoIcon,
    RefreshCwIcon,
    EyeIcon,
    UserPlusIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    SparklesIcon,
    FlagIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const LeaderboardsPage = () => {
    const [activeTab, setActiveTab] = useState("users");
    const [timePeriod, setTimePeriod] = useState("all-time");
    const [category, setCategory] = useState("overall");
    const [scope, setScope] = useState("global");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("rank");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isLoading, setIsLoading] = useState(false);

    // Mock user data
    const currentUser = {
        id: "user-123",
        name: "Shadcn User",
        username: "shadcn",
        avatar: "https://github.com/shadcn.png",
        isVerified: true,
        country: "US",
        college: "Stanford University",
        team: "Algorithm Masters"
    };

    // Mock leaderboard data
    const users = [
        {
            id: 1,
            name: "Tourist",
            username: "tourist",
            avatar: "",
            isVerified: true,
            country: "RU",
            college: "ITMO University",
            score: 9850,
            rating: 3400,
            problemsSolved: 2840,
            contestParticipations: 245,
            currentStreak: 45,
            rankChange: 0,
            isFollowing: false,
            isActive: true
        },
        {
            id: 2,
            name: "Benq",
            username: "benq",
            avatar: "",
            isVerified: true,
            country: "US",
            college: "MIT",
            score: 9720,
            rating: 3300,
            problemsSolved: 2750,
            contestParticipations: 230,
            currentStreak: 32,
            rankChange: 0,
            isFollowing: false,
            isActive: true
        },
        {
            id: 3,
            name: "Um_nik",
            username: "um_nik",
            avatar: "",
            isVerified: true,
            country: "RU",
            college: "SPbSU",
            score: 9650,
            rating: 3250,
            problemsSolved: 2680,
            contestParticipations: 215,
            currentStreak: 28,
            rankChange: 1,
            isFollowing: false,
            isActive: true
        },
        {
            id: 4,
            name: "Errichto",
            username: "errichto",
            avatar: "",
            isVerified: true,
            country: "PL",
            college: "University of Warsaw",
            score: 9580,
            rating: 3200,
            problemsSolved: 2600,
            contestParticipations: 198,
            currentStreak: 35,
            rankChange: -1,
            isFollowing: true,
            isActive: true
        },
        {
            id: 845,
            ...currentUser,
            score: 4250,
            rating: 1950,
            problemsSolved: 1250,
            contestParticipations: 45,
            currentStreak: 67,
            rankChange: 3,
            isFollowing: false,
            isActive: true
        },
        // Additional users...
        ...Array.from({ length: 20 }, (_, i) => ({
            id: i + 5,
            name: `User ${i + 5}`,
            username: `user${i + 5}`,
            avatar: "",
            isVerified: Math.random() > 0.8,
            country: ["US", "IN", "CN", "RU", "JP", "KR", "DE", "FR"][Math.floor(Math.random() * 8)],
            college: ["MIT", "Stanford", "Harvard", "UC Berkeley", "CMU", "IIIT"][Math.floor(Math.random() * 6)],
            score: 4000 + Math.random() * 2000,
            rating: 1500 + Math.random() * 1500,
            problemsSolved: 800 + Math.random() * 2000,
            contestParticipations: 20 + Math.random() * 200,
            currentStreak: Math.floor(Math.random() * 100),
            rankChange: Math.floor(Math.random() * 7) - 3,
            isFollowing: Math.random() > 0.9,
            isActive: Math.random() > 0.2
        }))
    ];

    const teams = [
        {
            id: 1,
            name: "Algorithm Masters",
            avatar: "",
            members: 12,
            score: 12800,
            problemsSolved: 1200,
            rank: 1,
            rankChange: 0,
            college: "Stanford University"
        },
        {
            id: 2,
            name: "Dynamic Programmers",
            avatar: "",
            members: 15,
            score: 11500,
            problemsSolved: 1100,
            rank: 2,
            rankChange: 1,
            college: "MIT"
        },
        {
            id: 3,
            name: "Code Warriors",
            avatar: "",
            members: 8,
            score: 9800,
            problemsSolved: 980,
            rank: 3,
            rankChange: -1,
            college: "UC Berkeley"
        }
    ];

    const colleges = [
        {
            id: 1,
            name: "MIT",
            logo: "",
            score: 45200,
            activeUsers: 145,
            averageRating: 1850,
            rank: 1,
            rankChange: 0
        },
        {
            id: 2,
            name: "Stanford University",
            logo: "",
            score: 43800,
            activeUsers: 132,
            averageRating: 1820,
            rank: 2,
            rankChange: 1
        },
        {
            id: 3,
            name: "UC Berkeley",
            logo: "",
            score: 42500,
            activeUsers: 128,
            averageRating: 1780,
            rank: 3,
            rankChange: -1
        }
    ];

    const timePeriods = [
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "all-time", label: "All Time" }
    ];

    const categories = [
        { value: "overall", label: "Overall Score", icon: TrophyIcon },
        { value: "problems", label: "Problems Solved", icon: TargetIcon },
        { value: "rating", label: "Contest Rating", icon: TrendingUpIcon },
        { value: "streaks", label: "Current Streak", icon: ClockIcon }
    ];

    const scopes = [
        { value: "global", label: "Global", icon: GlobeIcon },
        { value: "country", label: "By Country", icon: FlagIcon },
        { value: "college", label: "College", icon: BuildingIcon },
        { value: "team", label: "Team", icon: UsersIcon },
        { value: "friends", label: "Friends", icon: UserPlusIcon }
    ];

    const countries = [
        { code: "US", name: "United States", flag: "🇺🇸" },
        { code: "IN", name: "India", flag: "🇮🇳" },
        { code: "CN", name: "China", flag: "🇨🇳" },
        { code: "RU", name: "Russia", flag: "🇷🇺" },
        { code: "JP", name: "Japan", flag: "🇯🇵" },
        { code: "KR", name: "South Korea", flag: "🇰🇷" },
        { code: "DE", name: "Germany", flag: "🇩🇪" },
        { code: "FR", name: "France", flag: "🇫🇷" }
    ];

    const getCurrentData = () => {
        switch (activeTab) {
            case "users": return users;
            case "teams": return teams;
            case "colleges": return colleges;
            default: return users;
        }
    };

    const getPrimaryMetric = (item: any) => {
        switch (category) {
            case "problems": return item.problemsSolved;
            case "rating": return item.rating;
            case "streaks": return item.currentStreak;
            default: return item.score;
        }
    };

    const getMetricLabel = () => {
        switch (category) {
            case "problems": return "Problems";
            case "rating": return "Rating";
            case "streaks": return "Streak";
            default: return "Score";
        }
    };

    const getRankChangeIcon = (change: number) => {
        if (change > 0) return <TrendingUpIcon className="h-4 w-4 text-green-600" />;
        if (change < 0) return <TrendingDownIcon className="h-4 w-4 text-red-600" />;
        return <MinusIcon className="h-4 w-4 text-gray-500" />;
    };

    const getRankColor = (rank: number) => {
        if (rank === 1) return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
        if (rank === 2) return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300";
        if (rank === 3) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
        if (rank <= 10) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        if (rank <= 100) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        return "bg-muted text-muted-foreground";
    };

    const getCountryFlag = (countryCode: string) => {
        const country = countries.find(c => c.code === countryCode);
        return country ? country.flag : "🏴";
    };

    const filteredData = getCurrentData()
        .filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.username?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = getPrimaryMetric(a);
            const bValue = getPrimaryMetric(b);

            if (sortOrder === "asc") {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });

    const paginatedData = filteredData.slice((currentPage - 1) * 50, currentPage * 50);
    const totalPages = Math.ceil(filteredData.length / 50);

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("desc");
        }
    };

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="w-full max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-card-foreground">Leaderboards</h1>
                    <p className="text-muted-foreground mt-1">
                        Compete with coders worldwide and track your progress
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                        <RefreshCwIcon className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
                        Refresh
                    </Button>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <InfoIcon className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Rankings are updated every hour</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {/* Filters and Controls */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={`Search ${activeTab}...`}
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Select value={timePeriod} onValueChange={setTimePeriod}>
                                <SelectTrigger className="w-[150px]">
                                    <ClockIcon className="h-4 w-4 mr-2" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {timePeriods.map(period => (
                                        <SelectItem key={period.value} value={period.value}>
                                            {period.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <TrophyIcon className="h-4 w-4 mr-2" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            <div className="flex items-center gap-2">
                                                <cat.icon className="h-4 w-4" />
                                                {cat.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={scope} onValueChange={setScope}>
                                <SelectTrigger className="w-[150px]">
                                    <GlobeIcon className="h-4 w-4 mr-2" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {scopes.map(scopeItem => (
                                        <SelectItem key={scopeItem.value} value={scopeItem.value}>
                                            <div className="flex items-center gap-2">
                                                <scopeItem.icon className="h-4 w-4" />
                                                {scopeItem.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="users" className="flex items-center gap-2">
                                <UsersIcon className="h-4 w-4" />
                                Users
                            </TabsTrigger>
                            <TabsTrigger value="teams" className="flex items-center gap-2">
                                <UsersIcon className="h-4 w-4" />
                                Teams
                            </TabsTrigger>
                            <TabsTrigger value="colleges" className="flex items-center gap-2">
                                <BuildingIcon className="h-4 w-4" />
                                Colleges
                            </TabsTrigger>
                        </TabsList>

                        {/* Users Leaderboard */}
                        <TabsContent value="users" className="space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Top Coders</CardTitle>
                                            <CardDescription>
                                                Ranked by {categories.find(c => c.value === category)?.label.toLowerCase()}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="gap-1">
                                            <SparklesIcon className="h-3 w-3" />
                                            {timePeriods.find(t => t.value === timePeriod)?.label}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[600px]">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-16">Rank</TableHead>
                                                    <TableHead>Coder</TableHead>
                                                    <TableHead
                                                        className="cursor-pointer hover:bg-accent"
                                                        onClick={() => handleSort("score")}
                                                    >
                                                        <div className="flex items-center gap-1">
                                                            {getMetricLabel()}
                                                            {sortBy === "score" && (
                                                                <TrendingUpIcon className={cn(
                                                                    "h-3 w-3",
                                                                    sortOrder === "desc" && "rotate-180"
                                                                )} />
                                                            )}
                                                        </div>
                                                    </TableHead>
                                                    <TableHead>Change</TableHead>
                                                    <TableHead>Location</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {paginatedData.map((user, index) => (
                                                    <TableRow
                                                        key={user.id}
                                                        className={cn(
                                                            "transition-colors",
                                                            user.id === currentUser.id && "bg-primary/5 border-l-4 border-l-primary",
                                                            !user.isActive && "opacity-60"
                                                        )}
                                                    >
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="secondary" className={getRankColor((currentPage - 1) * 50 + index + 1)}>
                                                                    #{(currentPage - 1) * 50 + index + 1}
                                                                </Badge>
                                                                {user.rankChange !== 0 && (
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger>
                                                                                {getRankChangeIcon(user.rankChange)}
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                <p>{Math.abs(user.rankChange)} rank{Math.abs(user.rankChange) > 1 ? 's' : ''} {user.rankChange > 0 ? 'up' : 'down'}</p>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={user.avatar} />
                                                                    <AvatarFallback className="bg-primary/10 text-primary">
                                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="min-w-0">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-medium truncate">{user.name}</span>
                                                                        {user.isVerified && (
                                                                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                                                                                Verified
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-sm text-muted-foreground truncate">
                                                                        @{user.username}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="font-semibold">
                                                                {getPrimaryMetric(user).toLocaleString()}
                                                            </div>
                                                            {category === "overall" && (
                                                                <div className="text-xs text-muted-foreground">
                                                                    {user.problemsSolved} problems
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1">
                                                                {getRankChangeIcon(user.rankChange)}
                                                                <span className={cn(
                                                                    "text-sm font-medium",
                                                                    user.rankChange > 0 && "text-green-600",
                                                                    user.rankChange < 0 && "text-red-600"
                                                                )}>
                                                                    {user.rankChange > 0 ? `+${user.rankChange}` : user.rankChange}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-lg">{getCountryFlag(user.country)}</span>
                                                                <div className="text-sm">
                                                                    <div>{user.college}</div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex justify-end gap-2">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Button variant="ghost" size="icon">
                                                                                <EyeIcon className="h-4 w-4" />
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p>View Profile</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                                {!user.isFollowing ? (
                                                                    <Button variant="outline" size="sm">
                                                                        <UserPlusIcon className="h-3 w-3 mr-1" />
                                                                        Follow
                                                                    </Button>
                                                                ) : (
                                                                    <Button variant="outline" size="sm" disabled>
                                                                        Following
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </ScrollArea>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="text-sm text-muted-foreground">
                                                Showing {((currentPage - 1) * 50) + 1}-{Math.min(currentPage * 50, filteredData.length)} of {filteredData.length} {activeTab}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                >
                                                    <ChevronLeftIcon className="h-4 w-4" />
                                                </Button>
                                                <span className="text-sm text-muted-foreground">
                                                    Page {currentPage} of {totalPages}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    <ChevronRightIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Teams and Colleges tabs would follow similar structure */}
                    </Tabs>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Current User Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Your Ranking</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center p-4 bg-primary/5 rounded-lg border">
                                <div className="text-2xl font-bold text-primary">#845</div>
                                <div className="text-sm text-muted-foreground">Global Rank</div>
                                <div className="flex items-center justify-center gap-1 mt-1 text-green-600">
                                    <TrendingUpIcon className="h-4 w-4" />
                                    <span className="text-sm">+3 this week</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="text-center p-2 bg-muted/50 rounded">
                                    <div className="font-semibold">1,250</div>
                                    <div className="text-muted-foreground">Problems</div>
                                </div>
                                <div className="text-center p-2 bg-muted/50 rounded">
                                    <div className="font-semibold">1,950</div>
                                    <div className="text-muted-foreground">Rating</div>
                                </div>
                                <div className="text-center p-2 bg-muted/50 rounded">
                                    <div className="font-semibold">67</div>
                                    <div className="text-muted-foreground">Streak</div>
                                </div>
                                <div className="text-center p-2 bg-muted/50 rounded">
                                    <div className="font-semibold">#12</div>
                                    <div className="text-muted-foreground">College</div>
                                </div>
                            </div>

                            <Button className="w-full gap-2">
                                <TargetIcon className="h-4 w-4" />
                                View Full Profile
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Top 5 Snapshot */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Top 5 {activeTab === 'users' ? 'Coders' : activeTab}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {filteredData.slice(0, 5).map((item, index) => (
                                    <div key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-6 h-6 flex items-center justify-center text-xs rounded-full",
                                                index === 0 && "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
                                                index === 1 && "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
                                                index === 2 && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
                                                index >= 3 && "bg-muted text-muted-foreground"
                                            )}>
                                                {index + 1}
                                            </div>
                                            <span className="font-medium text-sm truncate">{item.name}</span>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {getPrimaryMetric(item).toLocaleString()}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rising Stars */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Rising Stars</CardTitle>
                            <CardDescription>Fastest climbers this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {users
                                    .filter(user => user.rankChange > 2)
                                    .slice(0, 3)
                                    .map(user => (
                                        <div key={user.id} className="flex items-center justify-between p-2">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="text-xs bg-green-100 text-green-800">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium truncate">{user.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-green-600">
                                                <TrendingUpIcon className="h-3 w-3" />
                                                <span className="text-xs font-medium">+{user.rankChange}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <Card className="bg-muted/50">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h4 className="font-semibold">About Leaderboard Rankings</h4>
                            <p className="text-sm text-muted-foreground max-w-2xl">
                                Rankings are calculated based on a weighted combination of contest performance,
                                problem-solving consistency, and activity levels. Scores update hourly.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                Scoring Formula
                            </Button>
                            <Button variant="outline" size="sm">
                                Contest Leaderboards
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LeaderboardsPage;