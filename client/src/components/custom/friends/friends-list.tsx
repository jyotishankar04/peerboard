// components/friends/FriendList.tsx
import { UserX, Trophy, Target, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback} from '@/components/ui/avatar';
import type { Friend } from '@/types/friends';

interface FriendListProps {
    friends: Friend[];
    searchQuery: string;
}

export function FriendList({ friends, searchQuery }: FriendListProps) {
    const filteredFriends = friends.filter(friend =>
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const removeFriend = (friendId: string) => {
        // Implement remove friend logic
        console.log('Remove friend:', friendId);
    };

    const challengeFriend = (friendId: string) => {
        // Implement challenge friend logic
        console.log('Challenge friend:', friendId);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Friends ({filteredFriends.length})</CardTitle>
                <CardDescription>
                    Connect and compete with your programming friends
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {filteredFriends.length === 0 ? (
                    <div className="text-center py-8">
                        <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            {searchQuery ? 'No friends found' : 'No friends yet'}
                        </h3>
                        <p className="text-muted-foreground">
                            {searchQuery ? 'Try adjusting your search terms' : 'Start by adding some friends to see them here!'}
                        </p>
                    </div>
                ) : (
                    filteredFriends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="relative">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                            {friend.username.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {friend.isOnline && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-foreground truncate">
                                            {friend.username}
                                        </h3>
                                        {friend.isOnline ? (
                                            <Badge variant="default" className="text-xs">Online</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-xs">
                                                Last seen {friend.lastSeen && formatTimeAgo(friend.lastSeen)}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Target className="w-3 h-3" />
                                            {friend.stats.problemsSolved} solved
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Trophy className="w-3 h-3" />
                                            Rank #{friend.stats.contestRank}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {friend.stats.currentStreak} day streak
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2">
                                        {friend.platforms.map(platform => (
                                            <Badge key={platform} variant="secondary" className="text-xs">
                                                {platform}
                                            </Badge>
                                        ))}
                                        {friend.mutualFriends > 0 && (
                                            <Badge variant="outline" className="text-xs">
                                                {friend.mutualFriends} mutual friends
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <Button variant="outline" size="sm" asChild>
                                    <a href={`/profile/${friend.username}`}>
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        Profile
                                    </a>
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => challengeFriend(friend.id)}>
                                    Challenge
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => removeFriend(friend.id)}>
                                    <UserX className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}

function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
}