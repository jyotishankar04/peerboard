// components/friends/FriendsPage.tsx
import  { useState } from 'react';
import { Search, UserPlus, Users, UserCheck,  Trophy,  Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FriendList } from "@/components/custom/friends/friends-list";
import { FriendRequests } from '@/components/custom/friends/friend-requests';
import { FriendSuggestions } from '@/components/custom/friends/friend-suggestions';

const mockFriends = [
    {
        id: '1',
        username: 'coder123',
        isOnline: true,
        stats: {
            problemsSolved: 156,
            contestRank: 42,
            currentStreak: 7
        },
        platforms: ['leetcode', 'codeforces'],
        mutualFriends: 3
    },
    {
        id: '2',
        username: 'alice_dev',
        isOnline: false,
        lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        stats: {
            problemsSolved: 89,
            contestRank: 125,
            currentStreak: 3
        },
        platforms: ['leetcode', 'hackerrank'],
        mutualFriends: 1
    }
];

const mockFriendRequests = {
    incoming: [
        {
            id: '1',
            fromUser: {
                id: '3',
                username: 'bob_coder',
                avatar: null
            },
            sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            message: 'Hey, let\'s practice together!'
        }
    ],
    outgoing: [
        {
            id: '2',
            fromUser: {
                id: '4',
                username: 'charlie_dev',
                avatar: null
            },
            sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        }
    ]
};

export function FriendsPage() {
    const [activeTab, setActiveTab] = useState('friends');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Friends</h1>
                        <p className="text-muted-foreground mt-1">
                            Connect with fellow programmers and track your progress together
                        </p>
                    </div>
                </div>

                <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Friend
                </Button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search friends by username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Friends Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-blue-500" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{mockFriends.length}</div>
                                <div className="text-sm text-muted-foreground">Total Friends</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <UserCheck className="w-8 h-8 text-green-500" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">
                                    {mockFriends.filter(f => f.isOnline).length}
                                </div>
                                <div className="text-sm text-muted-foreground">Online Now</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <Trophy className="w-8 h-8 text-yellow-500" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">42</div>
                                <div className="text-sm text-muted-foreground">Best Friend Rank</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="friends" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Friends
                    </TabsTrigger>
                    <TabsTrigger value="requests" className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Requests
                        {mockFriendRequests.incoming.length > 0 && (
                            <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                                {mockFriendRequests.incoming.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="suggestions" className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4" />
                        Suggestions
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Activity
                    </TabsTrigger>
                </TabsList>

                {/* Friends Tab */}
                <TabsContent value="friends">
                    <FriendList friends={mockFriends} searchQuery={searchQuery} />
                </TabsContent>

                {/* Requests Tab */}
                <TabsContent value="requests">
                    <FriendRequests requests={mockFriendRequests} />
                </TabsContent>

                {/* Suggestions Tab */}
                <TabsContent value="suggestions">
                    <FriendSuggestions />
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Friend Activity</CardTitle>
                            <CardDescription>
                                Recent achievements and activities from your friends
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 border rounded-lg">
                                    <Avatar>
                                        <AvatarFallback className="bg-blue-100 text-blue-600">C1</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="font-medium">coder123</div>
                                        <div className="text-sm text-muted-foreground">
                                            Solved 3 problems in Weekly Contest 395
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            2 hours ago
                                        </div>
                                    </div>
                                    <Badge variant="secondary">Rank #42</Badge>
                                </div>

                                <div className="flex items-center gap-3 p-3 border rounded-lg">
                                    <Avatar>
                                        <AvatarFallback className="bg-green-100 text-green-600">AD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="font-medium">alice_dev</div>
                                        <div className="text-sm text-muted-foreground">
                                            Unlocked "Problem Solver Level 2" achievement
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            5 hours ago
                                        </div>
                                    </div>
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}