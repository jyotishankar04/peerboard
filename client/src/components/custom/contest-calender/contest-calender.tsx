// components/contest-calendar/ContestCalendar.tsx
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Contest } from '@/types/contest';
import { CalendarDayPopover } from './calender-day-popover';

interface ContestCalendarProps {
    contests: Contest[];
}

export function ContestCalendar({ contests }: ContestCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getContestsForDate = (date: Date) => {
        return contests.filter(contest =>
            isSameDay(contest.startTime, date)
        );
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const getPlatformIcon = (platform: string) => {
        const icons = {
            leetcode: 'LC',
            codeforces: 'CF',
            codechef: 'CC',
            hackerrank: 'HR',
            atcoder: 'AC',
            topcoder: 'TC'
        };
        return icons[platform as keyof typeof icons] || platform.slice(0, 2).toUpperCase();
    };

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                        {format(currentDate, 'MMMM yyyy')}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigateMonth('prev')}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setCurrentDate(new Date())}
                        >
                            Today
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigateMonth('next')}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                    {days.map(day => {
                        const dayContests = getContestsForDate(day);
                        const isCurrentMonth = isSameMonth(day, currentDate);
                        const isToday = isSameDay(day, new Date());
                        const isSelected = selectedDate && isSameDay(day, selectedDate);

                        return (
                            <CalendarDayPopover
                                key={day.toISOString()}
                                date={day}
                                contests={dayContests}
                                onSelect={() => setSelectedDate(day)}
                            >
                                <div
                                    className={`
                    min-h-24 p-2 border rounded-lg text-sm cursor-pointer transition-colors
                    ${isCurrentMonth ? 'bg-background' : 'bg-muted/30 text-muted-foreground'}
                    ${isToday ? 'border-primary ring-2 ring-primary/20' : 'border-border'}
                    ${isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'}
                  `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`
                      font-medium
                      ${isToday ? 'text-primary' : isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                    `}>
                                            {format(day, 'd')}
                                        </span>
                                        {dayContests.length > 0 && (
                                            <Badge variant="secondary" className="text-xs h-5">
                                                {dayContests.length}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Contest Indicators */}
                                    <div className="space-y-1">
                                        {dayContests.slice(0, 2).map(contest => (
                                            <div
                                                key={contest.id}
                                                className={`
                          text-xs px-1 py-0.5 rounded text-left truncate
                          ${contest.platform === 'leetcode' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' : ''}
                          ${contest.platform === 'codeforces' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                          ${contest.platform === 'codechef' ? 'bg-brown-100 text-brown-800 dark:bg-brown-900/30 dark:text-brown-300' : ''}
                          ${contest.platform === 'hackerrank' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                        `}
                                            >
                                                {getPlatformIcon(contest.platform)}: {contest.name}
                                            </div>
                                        ))}
                                        {dayContests.length > 2 && (
                                            <div className="text-xs text-muted-foreground text-center">
                                                +{dayContests.length - 2} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CalendarDayPopover>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}