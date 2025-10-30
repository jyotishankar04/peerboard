// components/contest/ContestDetailsPage.tsx
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Users, Trophy, FileText, ExternalLink, CheckCircle, XCircle, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import type { ContestDetails } from '@/types/contest';

const mockContestDetails: ContestDetails = {
    id: '395',
    name: 'Weekly Contest 395',
    platform: 'leetcode',
    description: 'Weekly algorithm contest featuring 4 problems of varying difficulty. Perfect for practicing your coding skills and competing with programmers worldwide.',
    rules: [
        '4 problems, 90 minutes',
        'Points decrease with time',
        'Ties broken by submission time',
        'No external help allowed'
    ],
    startTime: new Date('2024-12-15T10:30:00'),
    endTime: new Date('2024-12-15T12:00:00'),
    duration: 90,
    registrationStatus: 'open',
    userStatus: 'not_registered',
    problems: [
        {
            id: '1',
            name: 'Two Sum',
            difficulty: 'easy',
            points: 3,
            status: 'not_attempted',
            tags: ['array', 'hash-table']
        },
        {
            id: '2',
            name: 'Reverse Linked List',
            difficulty: 'easy',
            points: 3,
            status: 'not_attempted',
            tags: ['linked-list', 'recursion']
        },
        {
            id: '3',
            name: 'Container With Most Water',
            difficulty: 'medium',
            points: 5,
            status: 'not_attempted',
            tags: ['array', 'two-pointers']
        },
        {
            id: '4',
            name: 'Merge k Sorted Lists',
            difficulty: 'hard',
            points: 8,
            status: 'not_attempted',
            tags: ['linked-list', 'heap', 'divide-and-conquer']
        }
    ],
    totalParticipants: 15000,
    discussionUrl: 'https://leetcode.com/discuss/weekly-contest-395',
    editorialUrl: 'https://leetcode.com/editorials/weekly-contest-395'
};

export function ContestDetailsPage() {
    const { contestId } = useParams();
    const contest = mockContestDetails;

    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        };
        return colors[difficulty as keyof typeof colors];
    };

    const getStatusIcon = (status: string) => {
        const icons = {
            solved: <CheckCircle className="w-4 h-4 text-green-500" />,
            attempted: <PlayCircle className="w-4 h-4 text-yellow-500" />,
            not_attempted: <XCircle className="w-4 h-4 text-gray-400" />
        };
        return icons[status as keyof typeof icons];
    };

    const formatTimeRemaining = (startTime: Date) => {
        const now = new Date();
        const diff = startTime.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    };

    const isUpcoming = contest.startTime > new Date();
    const isOngoing = contest.startTime <= new Date() && contest.endTime > new Date();
    const isFinished = contest.endTime <= new Date();

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            {/* Contest Header */}
            <Card className="bg-card border-primary/20">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge variant="secondary" className="text-sm">
                                    {contest.platform.toUpperCase()}
                                </Badge>
                                <Badge variant={
                                    contest.registrationStatus === 'open' ? 'default' :
                                        contest.registrationStatus === 'closed' ? 'destructive' : 'secondary'
                                }>
                                    {contest.registrationStatus.toUpperCase()}
                                </Badge>
                                {isUpcoming && (
                                    <Badge variant="outline" className="text-sm">
                                        <Clock className="w-3 h-3 mr-1" />
                                        Starts in {formatTimeRemaining(contest.startTime)}
                                    </Badge>
                                )}
                                {isOngoing && (
                                    <Badge variant="default" className="text-sm">
                                        <PlayCircle className="w-3 h-3 mr-1" />
                                        LIVE
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                {contest.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {contest.startTime.toLocaleDateString()} • {contest.startTime.toLocaleTimeString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {contest.duration} minutes
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {contest.totalParticipants.toLocaleString()} participants
                                </div>
                            </div>

                            <p className="text-muted-foreground">
                                {contest.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 w-full lg:w-auto">
                            {contest.userStatus === 'not_registered' && contest.registrationStatus === 'open' && (
                                <Button className="bg-green-600 hover:bg-green-700">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Register Now
                                </Button>
                            )}
                            {contest.userStatus === 'registered' && (
                                <Button>
                                    <PlayCircle className="w-4 h-4 mr-2" />
                                    Join Contest
                                </Button>
                            )}
                            {isFinished && (
                                <Button variant="outline">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    View Results
                                </Button>
                            )}

                            <Button variant="outline">
                                <FileText className="w-4 h-4 mr-2" />
                                View Leaderboard
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="problems" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="problems" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Problems
                    </TabsTrigger>
                    <TabsTrigger value="rules" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Rules & Format
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Resources
                    </TabsTrigger>
                </TabsList>

                {/* Problems Tab */}
                <TabsContent value="problems">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contest Problems</CardTitle>
                            <CardDescription>
                                {contest.problems.length} problems • Total points: {
                                    contest.problems.reduce((sum, problem) => sum + problem.points, 0)
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {contest.problems.map((problem, index) => (
                                    <div
                                        key={problem.id}
                                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-lg font-mono text-sm">
                                                {String.fromCharCode(65 + index)}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    {problem.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className={getDifficultyColor(problem.difficulty)}>
                                                        {problem.difficulty}
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        {problem.points} points
                                                    </Badge>
                                                    {problem.tags.map(tag => (
                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {getStatusIcon(problem.status)}
                                            <Button variant="outline" size="sm">
                                                <ExternalLink className="w-4 h-4 mr-1" />
                                                Solve
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Rules Tab */}
                <TabsContent value="rules">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contest Rules</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {contest.rules.map((rule, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                                            <span className="text-muted-foreground">{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Scoring Format</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Time-based scoring</span>
                                        <span className="font-medium">Points decrease over time</span>
                                    </div>
                                    <Progress value={65} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tie-breaking</span>
                                        <span className="font-medium">Submission time</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Penalties</span>
                                        <span className="font-medium">10 minutes per wrong submission</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Resources Tab */}
                <TabsContent value="resources">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Learning Resources</CardTitle>
                                <CardDescription>
                                    Prepare for the contest with these resources
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {contest.editorialUrl && (
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href={contest.editorialUrl} target="_blank" rel="noopener noreferrer">
                                            <FileText className="w-4 h-4 mr-2" />
                                            Contest Editorial
                                        </a>
                                    </Button>
                                )}

                                <Button variant="outline" className="w-full justify-start">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Preparation Guide
                                </Button>

                                <Button variant="outline" className="w-full justify-start">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Common Patterns
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Discussion & Community</CardTitle>
                                <CardDescription>
                                    Join the conversation with other participants
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {contest.discussionUrl && (
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href={contest.discussionUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Contest Discussion
                                        </a>
                                    </Button>
                                )}

                                <Button variant="outline" className="w-full justify-start">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Share Solutions
                                </Button>

                                <Button variant="outline" className="w-full justify-start">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Ask Questions
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}