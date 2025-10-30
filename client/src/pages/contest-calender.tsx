// components/contest-calendar/ContestCalendarPage.tsx
import  { useState } from 'react';
import { Calendar, Filter, Search, Bell, Clock, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContestCalendar } from '@/components/custom/contest-calender/contest-calender';
import { ContestList } from '@/components/custom/contest-calender/contest-list';
import { RemindersSection } from '@/components/custom/contest-calender/reminder-section';
import { PastContests } from '@/components/custom/contest-calender/past-contests';
import type { Contest } from '@/types/contest';

const mockContests: Contest[] = [
    {
        id: '1',
        name: 'Weekly Contest 395',
        platform: 'leetcode',
        startTime: new Date('2024-12-15T10:30:00'),
        endTime: new Date('2024-12-15T12:00:00'),
        duration: 90,
        description: 'Weekly algorithm contest with 4 problems',
        type: 'weekly',
        registrationStatus: 'open',
        url: 'https://leetcode.com/contest/weekly-contest-395',
        difficulty: 'medium',
        participants: 15000
    },
    {
        id: '2',
        name: 'Codeforces Round 987 (Div. 2)',
        platform: 'codeforces',
        startTime: new Date('2024-12-16T14:00:00'),
        endTime: new Date('2024-12-16T16:30:00'),
        duration: 150,
        description: 'Regular codeforces round with 5 problems',
        type: 'contest',
        registrationStatus: 'open',
        url: 'https://codeforces.com/contest/987',
        difficulty: 'hard',
        participants: 25000
    },
    {
        id: '3',
        name: 'December Long Challenge 2024',
        platform: 'codechef',
        startTime: new Date('2024-12-01T15:00:00'),
        endTime: new Date('2024-12-11T15:00:00'),
        duration: 14400,
        description: '10-day long programming challenge',
        type: 'challenge',
        registrationStatus: 'open',
        url: 'https://www.codechef.com/DEC24',
        participants: 50000
    }
];

export function ContestCalendarPage() {
    const [activeTab, setActiveTab] = useState('calendar');
    const [dateRange, setDateRange] = useState('month');
    const [searchQuery, setSearchQuery] = useState('');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const filteredContests = mockContests.filter(contest => {
        const matchesSearch = contest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contest.platform.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPlatform = platformFilter === 'all' || contest.platform === platformFilter;
        const matchesType = typeFilter === 'all' || contest.type === typeFilter;

        return matchesSearch && matchesPlatform && matchesType;
    });

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-primary" />
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Contest Calendar</h1>
                            <p className="text-muted-foreground mt-1">
                                Stay updated with all upcoming coding contests across your linked platforms
                            </p>
                        </div>
                    </div>
                </div>

                {/* Date Range Selector */}
                <div className="flex items-center gap-3">
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search contests by name or platform..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2">
                    <Select value={platformFilter} onValueChange={setPlatformFilter}>
                        <SelectTrigger className="w-32">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Platforms</SelectItem>
                            <SelectItem value="leetcode">LeetCode</SelectItem>
                            <SelectItem value="codeforces">Codeforces</SelectItem>
                            <SelectItem value="codechef">CodeChef</SelectItem>
                            <SelectItem value="hackerrank">HackerRank</SelectItem>
                            <SelectItem value="atcoder">AtCoder</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Contest Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="challenge">Challenge</SelectItem>
                            <SelectItem value="contest">Contest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="calendar" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Calendar
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Upcoming
                    </TabsTrigger>
                    <TabsTrigger value="reminders" className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Reminders
                    </TabsTrigger>
                    <TabsTrigger value="past" className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Past Contests
                    </TabsTrigger>
                </TabsList>

                {/* Calendar View */}
                <TabsContent value="calendar" className="space-y-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3">
                            <ContestCalendar contests={filteredContests} />
                        </div>
                        <div className="lg:col-span-1">
                            <ContestList contests={filteredContests} view="agenda" />
                        </div>
                    </div>
                </TabsContent>

                {/* Upcoming List View */}
                <TabsContent value="upcoming">
                    <ContestList contests={filteredContests} view="detailed" />
                </TabsContent>

                {/* Reminders View */}
                <TabsContent value="reminders">
                    <RemindersSection contests={filteredContests} />
                </TabsContent>

                {/* Past Contests View */}
                <TabsContent value="past">
                    <PastContests />
                </TabsContent>
            </Tabs>
        </div>
    );
}