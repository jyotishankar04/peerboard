// components/contest-calendar/CalendarDayPopover.tsx
import React from 'react';
import { format } from 'date-fns';
import { ExternalLink, Clock, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Contest } from '@/types/contest';

interface CalendarDayPopoverProps {
    date: Date;
    contests: Contest[];
    children: React.ReactNode;
    onSelect: () => void;
}

export function CalendarDayPopover({ date, contests, children, onSelect }: CalendarDayPopoverProps) {
    const getPlatformColor = (platform: string) => {
        const colors = {
            leetcode: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
            codeforces: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            codechef: 'bg-brown-100 text-brown-800 dark:bg-brown-900/30 dark:text-brown-300',
            hackerrank: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            atcoder: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        };
        return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    };

    return (
        <Popover>
            <PopoverTrigger asChild onClick={onSelect}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
                <div className="p-4 border-b">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {format(date, 'EEEE, MMMM d, yyyy')}
                    </div>
                    <h3 className="font-semibold mt-1">
                        {contests.length} Contest{contests.length !== 1 ? 's' : ''}
                    </h3>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {contests.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                            No contests scheduled
                        </div>
                    ) : (
                        contests.map(contest => (
                            <div key={contest.id} className="p-4 border-b last:border-b-0 hover:bg-muted/50">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="secondary" className={getPlatformColor(contest.platform)}>
                                                {contest.platform}
                                            </Badge>
                                            <Badge variant="outline">
                                                {contest.type}
                                            </Badge>
                                        </div>
                                        <h4 className="font-medium text-sm leading-tight">
                                            {contest.name}
                                        </h4>
                                    </div>
                                </div>

                                <div className="space-y-1 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {format(contest.startTime, 'h:mm a')} • {contest.duration} min
                                    </div>
                                    <p className="line-clamp-2">
                                        {contest.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <Badge variant={
                                        contest.registrationStatus === 'open' ? 'default' :
                                            contest.registrationStatus === 'closed' ? 'destructive' : 'secondary'
                                    }>
                                        {contest.registrationStatus.toUpperCase()}
                                    </Badge>

                                    <Button size="sm" variant="outline" asChild>
                                        <a href={contest.url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-3 h-3 mr-1" />
                                            Join
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}