// components/contest-calendar/PastContests.tsx
import  { useState } from 'react';
import { format } from 'date-fns';
import { ExternalLink, Trophy, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const mockPastContests = [
    {
        id: '1',
        name: 'Weekly Contest 394',
        platform: 'leetcode',
        date: new Date('2024-12-08'),
        participation: 'participated',
        rank: 1245,
        totalParticipants: 15000,
        score: 3,
        totalProblems: 4,
        url: 'https://leetcode.com/contest/weekly-contest-394'
    },
    {
        id: '2',
        name: 'Codeforces Round 986 (Div. 2)',
        platform: 'codeforces',
        date: new Date('2024-12-01'),
        participation: 'participated',
        rank: 567,
        totalParticipants: 20000,
        score: 2,
        totalProblems: 5,
        url: 'https://codeforces.com/contest/986'
    },
    {
        id: '3',
        name: 'November Long Challenge 2024',
        platform: 'codechef',
        date: new Date('2024-11-20'),
        participation: 'not-participated',
        url: 'https://www.codechef.com/NOV24'
    }
];

export function PastContests() {
    const [platformFilter, setPlatformFilter] = useState('all');
    const [participationFilter, setParticipationFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContests = mockPastContests.filter(contest => {
        const matchesSearch = contest.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPlatform = platformFilter === 'all' || contest.platform === platformFilter;
        const matchesParticipation = participationFilter === 'all' || contest.participation === participationFilter;

        return matchesSearch && matchesPlatform && matchesParticipation;
    });

    const getPlatformColor = (platform: string) => {
        const colors = {
            leetcode: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
            codeforces: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            codechef: 'bg-brown-100 text-brown-800 dark:bg-brown-900/30 dark:text-brown-300',
        };
        return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Past Contests</CardTitle>
                <CardDescription>
                    Review your past contest performances and results
                </CardDescription>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search past contests..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <Select value={platformFilter} onValueChange={setPlatformFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Platforms</SelectItem>
                            <SelectItem value="leetcode">LeetCode</SelectItem>
                            <SelectItem value="codeforces">Codeforces</SelectItem>
                            <SelectItem value="codechef">CodeChef</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={participationFilter} onValueChange={setParticipationFilter}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Participation" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="participated">Participated</SelectItem>
                            <SelectItem value="not-participated">Not Participated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {filteredContests.map(contest => (
                    <div key={contest.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="shrink-0 w-20 text-center">
                            <div className="text-sm font-semibold text-foreground">
                                {format(contest.date, 'MMM d')}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {format(contest.date, 'yyyy')}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className={getPlatformColor(contest.platform)}>
                                    {contest.platform}
                                </Badge>
                                <Badge variant={contest.participation === 'participated' ? 'default' : 'outline'}>
                                    {contest.participation === 'participated' ? 'Participated' : 'Not Participated'}
                                </Badge>
                            </div>

                            <h3 className="font-semibold text-lg mb-2">
                                {contest.name}
                            </h3>

                            {contest.participation === 'participated' && (
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Trophy className="w-4 h-4 text-yellow-600" />
                                        Rank: {contest.rank?.toLocaleString()}/{contest.totalParticipants?.toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-blue-600" />
                                        Score: {contest.score}/{contest.totalProblems}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <Button variant="outline" size="sm" asChild>
                                <a href={contest.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {contest.participation === 'participated' ? 'Review' : 'View'}
                                </a>
                            </Button>

                            {contest.participation === 'participated' && (
                                <div className="text-xs text-muted-foreground text-center">
                                    Top {((contest.rank! / contest.totalParticipants!) * 100).toFixed(1)}%
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}