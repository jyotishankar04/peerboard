// components/contest-calendar/ContestList.tsx
import { format } from 'date-fns';
import { ExternalLink, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Contest } from '@/types/contest';

interface ContestListProps {
    contests: Contest[];
    view: 'agenda' | 'detailed';
}

export function ContestList({ contests, view }: ContestListProps) {
    const getPlatformColor = (platform: string) => {
        const colors = {
            leetcode: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
            codeforces: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            codechef: 'bg-brown-100 text-brown-800 dark:bg-brown-900/30 dark:text-brown-300',
            hackerrank: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        };
        return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    if (view === 'agenda') {
        return (
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Upcoming Agenda</CardTitle>
                    <CardDescription>Next 7 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {contests.slice(0, 5).map(contest => (
                        <div key={contest.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <Badge variant="secondary" className={getPlatformColor(contest.platform)}>
                                    {contest.platform}
                                </Badge>
                                <div className="text-xs text-muted-foreground text-right">
                                    <div>{format(contest.startTime, 'MMM d')}</div>
                                    <div>{format(contest.startTime, 'h:mm a')}</div>
                                </div>
                            </div>
                            <h4 className="font-medium text-sm mb-1 line-clamp-2">
                                {contest.name}
                            </h4>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                    {contest.duration}m
                                </Badge>
                                <Button size="sm" variant="ghost" asChild>
                                    <a href={contest.url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Contests</CardTitle>
                <CardDescription>
                    {contests.length} contest{contests.length !== 1 ? 's' : ''} found
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {contests.map(contest => (
                    <div key={contest.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="shrink-0 w-20 text-center">
                            <div className="text-sm font-semibold text-foreground">
                                {format(contest.startTime, 'MMM d')}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {format(contest.startTime, 'EEE')}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {format(contest.startTime, 'h:mm a')}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className={getPlatformColor(contest.platform)}>
                                    {contest.platform}
                                </Badge>
                                <Badge variant="outline">
                                    {contest.type}
                                </Badge>
                                {contest.difficulty && (
                                    <Badge variant={
                                        contest.difficulty === 'easy' ? 'default' :
                                            contest.difficulty === 'medium' ? 'secondary' : 'destructive'
                                    }>
                                        {contest.difficulty}
                                    </Badge>
                                )}
                            </div>

                            <h3 className="font-semibold text-lg mb-1">
                                {contest.name}
                            </h3>

                            <p className="text-muted-foreground text-sm mb-3">
                                {contest.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {contest.duration} minutes
                                </div>
                                {contest.participants && (
                                    <div>
                                        {contest.participants.toLocaleString()} participants
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <Badge variant={
                                contest.registrationStatus === 'open' ? 'default' :
                                    contest.registrationStatus === 'closed' ? 'destructive' : 'secondary'
                            }>
                                {contest.registrationStatus.toUpperCase()}
                            </Badge>

                            <Button asChild>
                                <a href={contest.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Register
                                </a>
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}