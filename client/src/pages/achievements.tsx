// components/achievements/AchievementsPage.tsx
import  { useState } from 'react';
import { Trophy, Star, Share2,  Filter, Target, Calendar, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AchievementGallery } from '@/components/custom/achivements/achievements-gallery';
import { MilestoneTimeline } from '@/components/custom/achivements/milestone-timeline';
import { ShareAchievements } from '@/components/custom/achivements/share-achievements';
import type { Achievement, Milestone } from '@/types/achievements';

const mockAchievements: Achievement[] = [
    {
        id: '1',
        name: 'Problem Solver',
        description: 'Solve coding problems across different platforms',
        category: 'problems',
        level: 2,
        maxLevel: 5,
        icon: '💻',
        earned: true,
        earnedAt: new Date('2024-01-15'),
        progress: 75,
        criteria: { type: 'problems_solved', target: 100, current: 75 },
        rarity: 'common'
    },
    {
        id: '2',
        name: 'Contest Veteran',
        description: 'Participate in multiple coding contests',
        category: 'contests',
        level: 1,
        maxLevel: 3,
        icon: '🏆',
        earned: true,
        earnedAt: new Date('2024-01-20'),
        progress: 100,
        criteria: { type: 'contests_joined', target: 10, current: 10 },
        rarity: 'rare'
    },
    {
        id: '3',
        name: 'Streak Master',
        description: 'Maintain consistent coding practice',
        category: 'streaks',
        level: 3,
        maxLevel: 5,
        icon: '🔥',
        earned: true,
        earnedAt: new Date('2024-02-01'),
        progress: 60,
        criteria: { type: 'current_streak', target: 30, current: 18 },
        rarity: 'epic'
    },
    {
        id: '4',
        name: 'Team Player',
        description: 'Collaborate effectively in team settings',
        category: 'teams',
        level: 1,
        maxLevel: 3,
        icon: '👥',
        earned: false,
        progress: 25,
        criteria: { type: 'team_contests', target: 5, current: 1 },
        rarity: 'common'
    }
];

const mockMilestones: Milestone[] = [
    {
        id: '1',
        title: 'First Problem Solved',
        description: 'Solved your very first coding problem',
        date: new Date('2024-01-01'),
        type: 'problem',
        icon: '🎯'
    },
    {
        id: '2',
        title: 'First Contest',
        description: 'Participated in first coding contest',
        date: new Date('2024-01-15'),
        type: 'contest',
        icon: '🏆'
    },
    {
        id: '3',
        title: '50 Problems Solved',
        description: 'Reached 50 problems solved across all platforms',
        date: new Date('2024-02-01'),
        type: 'problem',
        icon: '💪'
    },
    {
        id: '4',
        title: 'Top 10% Ranking',
        description: 'Achieved top 10% in weekly contest',
        date: new Date('2024-02-15'),
        type: 'contest',
        icon: '⭐'
    }
];

export function AchievementsPage() {
    const [activeTab, setActiveTab] = useState('badges');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const earnedAchievements = mockAchievements.filter(a => a.earned);
    const totalAchievements = mockAchievements.length;
    const completionRate = Math.round((earnedAchievements.length / totalAchievements) * 100);

    const filteredAchievements = categoryFilter === 'all'
        ? mockAchievements
        : mockAchievements.filter(a => a.category === categoryFilter);

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <Trophy className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-foreground">Achievements & Milestones</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Celebrate your competitive programming journey and showcase your progress
                </p>
            </div>

            {/* Achievement Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6 text-center">
                        <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-foreground">{earnedAchievements.length}</div>
                        <div className="text-sm text-muted-foreground">Badges Unlocked</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 text-center">
                        <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-foreground">{completionRate}%</div>
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 text-center">
                        <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-foreground">18</div>
                        <div className="text-sm text-muted-foreground">Current Streak</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 text-center">
                        <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-foreground">3</div>
                        <div className="text-sm text-muted-foreground">Rare Badges</div>
                    </CardContent>
                </Card>
            </div>

            {/* Progress to Next Milestone */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Next Milestone Progress
                    </CardTitle>
                    <CardDescription>
                        You're 15 problems away from unlocking "Problem Solver Level 3"
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Problem Solver Level 3</span>
                            <span className="font-medium text-foreground">75/100 problems</span>
                        </div>
                        <Progress value={75} className="h-3" />
                        <div className="text-xs text-muted-foreground text-center">
                            Solve 25 more problems to unlock the next level
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <TabsList>
                        <TabsTrigger value="badges" className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            Badges
                        </TabsTrigger>
                        <TabsTrigger value="timeline" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Timeline
                        </TabsTrigger>
                        <TabsTrigger value="share" className="flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Share
                        </TabsTrigger>
                    </TabsList>

                    {activeTab === 'badges' && (
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-40">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="problems">Problems</SelectItem>
                                <SelectItem value="contests">Contests</SelectItem>
                                <SelectItem value="streaks">Streaks</SelectItem>
                                <SelectItem value="teams">Teams</SelectItem>
                                <SelectItem value="social">Social</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </div>

                {/* Badges Tab */}
                <TabsContent value="badges">
                    <AchievementGallery achievements={filteredAchievements} />
                </TabsContent>

                {/* Timeline Tab */}
                <TabsContent value="timeline">
                    <MilestoneTimeline milestones={mockMilestones} />
                </TabsContent>

                {/* Share Tab */}
                <TabsContent value="share">
                    <ShareAchievements
                        achievements={earnedAchievements}
                        milestones={mockMilestones}
                    />
                </TabsContent>
            </Tabs>

            {/* Motivation Section */}
            <Card className="bg-muted/50">
                <CardContent className="p-6">
                    <div className="text-center space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">Keep up the great work! 🎉</h3>
                        <p className="text-muted-foreground">
                            You're making excellent progress. Try participating in the upcoming weekly contest to unlock the "Contest Regular" badge!
                        </p>
                        <Button>
                            <Code className="w-4 h-4 mr-2" />
                            View Upcoming Contests
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}