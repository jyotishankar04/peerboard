// components/friends/FriendSuggestions.tsx
import  { useState } from 'react';
import { UserPlus, Users, Target, Trophy, School, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Friend } from '@/types/friends';

const mockSuggestions = [
    {
        id: '1',
        username: 'python_dev',
        stats: {
            problemsSolved: 203,
            contestRank: 15,
            currentStreak: 21
        },
        platforms: ['leetcode', 'codeforces', 'hackerrank'],
        mutualFriends: 3,
        commonInterests: ['dynamic-programming', 'graphs'],
        location: 'San Francisco, CA',
        college: 'Stanford University',
        similarityScore: 0.85
    },
    {
        id: '2',
        username: 'java_master',
        stats: {
            problemsSolved: 156,
            contestRank: 42,
            currentStreak: 14
        },
        platforms: ['leetcode', 'codechef'],
        mutualFriends: 2,
        commonInterests: ['arrays', 'strings'],
        location: 'New York, NY',
        college: 'MIT',
        similarityScore: 0.72
    },
    {
        id: '3',
        username: 'cpp_expert',
        stats: {
            problemsSolved: 89,
            contestRank: 89,
            currentStreak: 7
        },
        platforms: ['codeforces', 'atcoder'],
        mutualFriends: 1,
        commonInterests: ['data-structures', 'algorithms'],
        location: 'Seattle, WA',
        college: 'University of Washington',
        similarityScore: 0.68
    },
    {
        id: '4',
        username: 'js_ninja',
        stats: {
            problemsSolved: 178,
            contestRank: 33,
            currentStreak: 28
        },
        platforms: ['leetcode', 'hackerrank'],
        mutualFriends: 4,
        commonInterests: ['javascript', 'web-development'],
        location: 'Austin, TX',
        college: 'UT Austin',
        similarityScore: 0.91
    }
];

export function FriendSuggestions() {
    const [suggestions, setSuggestions] = useState(mockSuggestions);

    const sendFriendRequest = (userId: string) => {
        setSuggestions(prev => prev.filter(user => user.id !== userId));
        // Add API call here
        console.log('Sent friend request to:', userId);
    };

    const getSimilarityColor = (score: number) => {
        if (score >= 0.8) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300';
        if (score >= 0.6) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300';
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300';
    };

    const getSimilarityText = (score: number) => {
        if (score >= 0.8) return 'Very High Match';
        if (score >= 0.6) return 'High Match';
        return 'Good Match';
    };

    return (
        <div className="space-y-6">
            {/* Header with Stats */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-primary" />
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    Personalized Suggestions
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Based on your coding style, interests, and mutual connections
                                </p>
                            </div>
                        </div>
                        <Badge variant="outline" className="text-sm">
                            {suggestions.length} suggestions
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Suggestions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestions.map((user) => (
                    <Card key={user.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            {/* User Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                            {user.username.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            {user.username}
                                        </h3>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Star className="w-3 h-3" />
                                            Rank #{user.stats.contestRank}
                                        </div>
                                    </div>
                                </div>

                                <Badge className={getSimilarityColor(user.similarityScore)}>
                                    {getSimilarityText(user.similarityScore)}
                                </Badge>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="text-center p-2 bg-muted rounded">
                                    <div className="font-bold text-foreground">{user.stats.problemsSolved}</div>
                                    <div className="text-xs text-muted-foreground">Solved</div>
                                </div>
                                <div className="text-center p-2 bg-muted rounded">
                                    <div className="font-bold text-foreground">{user.stats.currentStreak}</div>
                                    <div className="text-xs text-muted-foreground">Streak</div>
                                </div>
                                <div className="text-center p-2 bg-muted rounded">
                                    <div className="font-bold text-foreground">{user.mutualFriends}</div>
                                    <div className="text-xs text-muted-foreground">Mutual</div>
                                </div>
                            </div>

                            {/* Platforms */}
                            <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                    {user.platforms.map(platform => (
                                        <Badge key={platform} variant="secondary" className="text-xs">
                                            {platform}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Common Interests */}
                            {user.commonInterests && user.commonInterests.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs text-muted-foreground mb-1">Common Interests:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {user.commonInterests.slice(0, 3).map(interest => (
                                            <Badge key={interest} variant="outline" className="text-xs">
                                                {interest}
                                            </Badge>
                                        ))}
                                        {user.commonInterests.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{user.commonInterests.length - 3} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Location & Education */}
                            <div className="space-y-1 mb-4">
                                {user.college && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <School className="w-3 h-3" />
                                        {user.college}
                                    </div>
                                )}
                                {user.location && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <MapPin className="w-3 h-3" />
                                        {user.location}
                                    </div>
                                )}
                            </div>

                            {/* Action Button */}
                            <Button
                                className="w-full"
                                onClick={() => sendFriendRequest(user.id)}
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Add Friend
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* No More Suggestions */}
            {suggestions.length === 0 && (
                <Card>
                    <CardContent className="p-8 text-center">
                        <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            No more suggestions
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            We'll show you more friend suggestions based on your activity and connections.
                        </p>
                        <Button variant="outline">
                            <Users className="w-4 h-4 mr-2" />
                            Explore Community
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* How Suggestions Work */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        How Suggestions Work
                    </CardTitle>
                    <CardDescription>
                        We suggest friends based on various factors to help you build your coding network
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                        <div className="space-y-2">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                                <Trophy className="w-4 h-4" />
                            </div>
                            <div className="text-sm font-medium">Similar Skill Level</div>
                            <div className="text-xs text-muted-foreground">Based on contest rankings</div>
                        </div>

                        <div className="space-y-2">
                            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <Users className="w-4 h-4" />
                            </div>
                            <div className="text-sm font-medium">Mutual Friends</div>
                            <div className="text-xs text-muted-foreground">People your friends know</div>
                        </div>

                        <div className="space-y-2">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                                <Target className="w-4 h-4" />
                            </div>
                            <div className="text-sm font-medium">Common Interests</div>
                            <div className="text-xs text-muted-foreground">Similar problem-solving topics</div>
                        </div>

                        <div className="space-y-2">
                            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                                <School className="w-4 h-4" />
                            </div>
                            <div className="text-sm font-medium">Education & Location</div>
                            <div className="text-xs text-muted-foreground">Same college or location</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}