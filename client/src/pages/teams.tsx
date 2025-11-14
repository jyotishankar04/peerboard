// src/app/teams-groups/page.tsx
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    SearchIcon,
    UsersIcon,
    PlusIcon,
    SettingsIcon,
    ClockIcon,
    EyeIcon,
    LogOutIcon,
    UserPlusIcon,
    GlobeIcon,
    LockIcon,
    CheckCircleIcon
} from "lucide-react";
import CreateTeamDialog from "@/components/custom/app/team-detail-page";

// ... (keep all the existing interfaces and mock data from the original file)

const TeamsGroupsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("my-teams");
    const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
    const [isLeaveTeamOpen, setIsLeaveTeamOpen] = useState(false);
    const [teamToLeave, setTeamToLeave] = useState<Team | null>(null);

    // ... (keep all the existing helper functions)

    const handleLeaveTeam = (team: Team) => {
        setTeamToLeave(team);
        setIsLeaveTeamOpen(true);
    };

    const confirmLeaveTeam = () => {
        // API call to leave team would go here
        console.log("Leaving team:", teamToLeave?.name);
        setIsLeaveTeamOpen(false);
        setTeamToLeave(null);
    };

    return (
        <div className="w-full max-w-7xl p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-card-foreground">Teams & Groups</h1>
                    <p className="text-muted-foreground mt-1">
                        Collaborate, compete, and learn with coding communities
                    </p>
                </div>

                <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <PlusIcon className="h-4 w-4" />
                            Create Team
                        </Button>
                    </DialogTrigger>
                    <CreateTeamDialog onClose={() => setIsCreateTeamOpen(false)} />
                </Dialog>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search teams by name, college, or focus area..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">
                            {filters.map(filter => (
                                <Button
                                    key={filter.id}
                                    variant={activeFilter === filter.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setActiveFilter(filter.id)}
                                    className="gap-2"
                                >
                                    <filter.icon className="h-4 w-4" />
                                    {filter.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="joined" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="joined" className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4" />
                        My Teams ({userTeams.length})
                    </TabsTrigger>
                    <TabsTrigger value="discover" className="flex items-center gap-2">
                        <GlobeIcon className="h-4 w-4" />
                        Discover Teams
                    </TabsTrigger>
                </TabsList>

                {/* Joined Teams Tab */}
                <TabsContent value="joined" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userTeams.map(team => (
                            <Card key={team.id} className="hover:border-primary/50 transition-colors group">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                                                <AvatarImage src={team.avatar} />
                                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                    {team.name.split(' ').map(w => w[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-lg">{team.name}</CardTitle>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="secondary" className={getActivityLevelColor(team.activityLevel)}>
                                                        {team.activityLevel}
                                                    </Badge>
                                                    {!team.isPublic && (
                                                        <LockIcon className="h-3 w-3 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <SettingsIcon className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Team Settings</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                    <CardDescription className="line-clamp-2">
                                        {team.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Team Stats */}
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div className="text-center">
                                            <div className="font-semibold text-card-foreground">{team.members}/{team.maxMembers}</div>
                                            <div className="text-muted-foreground">Members</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-card-foreground">{team.problemsSolved}</div>
                                            <div className="text-muted-foreground">Solved</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-card-foreground">#{team.teamRank}</div>
                                            <div className="text-muted-foreground">Rank</div>
                                        </div>
                                    </div>

                                    {/* Focus Areas */}
                                    <div className="flex flex-wrap gap-1">
                                        {team.focusAreas.map(area => (
                                            <Badge key={area} variant="outline" className="text-xs">
                                                {area}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Last Activity */}
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <ClockIcon className="h-3 w-3" />
                                            Last activity {team.lastActivity}
                                        </div>
                                        <div className={getRoleBadge(team.role).color + " text-xs px-2 py-1 rounded"}>
                                            {getRoleBadge(team.role).label}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <Button
                                            variant="default"
                                            className="flex-1 gap-2"
                                            asChild
                                        >
                                            <Link href={`/teams/${team.id}`}>
                                                <EyeIcon className="h-4 w-4" />
                                                View Team
                                            </Link>
                                        </Button>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleLeaveTeam(team)}
                                                    >
                                                        <LogOutIcon className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Leave Team</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* ... (rest of the component remains the same) */}
                </TabsContent>

                {/* ... (rest of the component remains the same) */}
            </Tabs>

            {/* Leave Team Confirmation Dialog */}
            <Dialog open={isLeaveTeamOpen} onOpenChange={setIsLeaveTeamOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Leave Team</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to leave <strong>{teamToLeave?.name}</strong>?
                            You'll need to be re-invited to join again.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsLeaveTeamOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmLeaveTeam}>
                            Leave Team
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TeamsGroupsPage;