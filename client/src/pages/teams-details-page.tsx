// components/teams/TeamDetailsPage.tsx
import { Users, Trophy, Activity, MessageSquare, Share2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const mockTeamDetails = {
    id: '1',
    name: 'Code Masters',
    description: 'Solving complex problems together, one line at a time',
    memberCount: 24,
    problemsSolved: 156,
    ranking: 42,
    privacy: 'public',
    type: 'public',
    achievements: [
        { id: '1', name: '100 Problems Solved', unlockedAt: new Date('2024-02-01') },
        { id: '2', name: 'Team Streak - 30 days', unlockedAt: new Date('2024-02-15') },
    ],
    members: [
        { id: '1', name: 'John Doe', problemsSolved: 45, isOnline: true },
        { id: '2', name: 'Jane Smith', problemsSolved: 38, isOnline: true },
        { id: '3', name: 'Mike Johnson', problemsSolved: 32, isOnline: false },
    ],
    activities: [
        { id: '1', type: 'problem_solved', userName: 'John Doe', description: 'solved "Two Sum"', timestamp: new Date() },
        { id: '2', type: 'contest_joined', userName: 'Jane Smith', description: 'joined Weekly Contest', timestamp: new Date() },
    ],
    goals: {
        current: 75,
        target: 100,
        description: 'Problems solved this month'
    }
};

export function TeamDetailsPage() {
    const team = mockTeamDetails;

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-6">
            {/* Team Header */}
            <Card className="bg-card border-primary/20">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
                            <AvatarFallback className="text-2xl bg-primary/10 text-primary font-semibold">
                                {team.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground">{team.name}</h1>
                                    <p className="text-muted-foreground mt-2 text-lg">{team.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Invite
                                    </Button>
                                    <Button variant="destructive" className="flex items-center gap-2">
                                        <LogOut className="w-4 h-4" />
                                        Leave
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 mt-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="w-5 h-5" />
                                    <span className="font-semibold text-foreground">{team.memberCount} members</span>
                                </div>
                                <Badge variant="secondary" className="text-sm">
                                    #{team.ranking} Global Ranking
                                </Badge>
                                <Badge variant={team.privacy === 'public' ? 'default' : 'secondary'}>
                                    {team.privacy}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="members" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Members
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Activity
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Team Chat
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stats Card */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-primary" />
                                    Team Stats
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Problems Solved</span>
                                    <span className="font-bold text-2xl text-primary">{team.problemsSolved}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Global Rank</span>
                                    <span className="font-bold text-2xl text-green-600 dark:text-green-400">#{team.ranking}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Active Members</span>
                                    <span className="font-bold text-2xl text-purple-600 dark:text-purple-400">
                                        {team.members.filter(m => m.isOnline).length}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Goals Card */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Team Goals</CardTitle>
                                <CardDescription>Monthly progress</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">{team.goals.description}</span>
                                        <span className="font-semibold text-foreground">
                                            {team.goals.current}/{team.goals.target}
                                        </span>
                                    </div>
                                    <Progress value={(team.goals.current / team.goals.target) * 100} />
                                </div>
                                <div className="pt-4">
                                    <Button className="w-full">
                                        Set New Goal
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Achievements Card */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Recent Achievements</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {team.achievements.map((achievement) => (
                                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                        <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                        <div>
                                            <div className="font-medium text-foreground">{achievement.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {achievement.unlockedAt.toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Members Tab */}
                <TabsContent value="members">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Members ({team.members.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {team.members.map((member) => (
                                    <div key={member.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="relative">
                                            <Avatar>
                                                <AvatarFallback className="bg-secondary text-secondary-foreground">
                                                    {member.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            {member.isOnline && (
                                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-foreground">{member.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {member.problemsSolved} problems solved
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {team.activities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                                                {activity.userName.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="font-medium text-foreground">{activity.userName}</div>
                                            <div className="text-muted-foreground">{activity.description}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {activity.timestamp.toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Chat Tab */}
                <TabsContent value="chat">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Chat</CardTitle>
                            <CardDescription>Real-time communication with your team</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center py-12">
                            <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">Team Chat</h3>
                            <p className="text-muted-foreground mb-4">Start a conversation with your team members</p>
                            <Button>
                                Open Team Chat
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}