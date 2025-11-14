// components/friends/FriendRequests.tsx
import  { useState } from 'react';
import { UserCheck, UserX, Clock, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { FriendRequest } from '@/types/friends';

interface FriendRequestsProps {
    requests: {
        incoming: FriendRequest[];
        outgoing: FriendRequest[];
    };
}

export function FriendRequests({ requests }: FriendRequestsProps) {
    const [incomingRequests, setIncomingRequests] = useState<FriendRequest[]>(requests.incoming);
    const [outgoingRequests, setOutgoingRequests] = useState<FriendRequest[]>(requests.outgoing);

    const acceptRequest = (requestId: string) => {
        setIncomingRequests(prev => prev.filter(req => req.id !== requestId));
        // Add API call here
        console.log('Accepted request:', requestId);
    };

    const declineRequest = (requestId: string) => {
        setIncomingRequests(prev => prev.filter(req => req.id !== requestId));
        // Add API call here
        console.log('Declined request:', requestId);
    };

    const cancelRequest = (requestId: string) => {
        setOutgoingRequests(prev => prev.filter(req => req.id !== requestId));
        // Add API call here
        console.log('Cancelled request:', requestId);
    };

    const formatTimeAgo = (date: Date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    return (
        <div className="space-y-6">
            {/* Incoming Requests */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-blue-500" />
                        Incoming Requests
                        {incomingRequests.length > 0 && (
                            <Badge variant="default" className="ml-2">
                                {incomingRequests.length}
                            </Badge>
                        )}
                    </CardTitle>
                    <CardDescription>
                        People who want to be your friends
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {incomingRequests.length === 0 ? (
                        <div className="text-center py-8">
                            <UserCheck className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                No incoming requests
                            </h3>
                            <p className="text-muted-foreground">
                                When someone sends you a friend request, it will appear here
                            </p>
                        </div>
                    ) : (
                        incomingRequests.map((request) => (
                            <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4 flex-1">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                                            {request.fromUser.username.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-foreground">
                                                {request.fromUser.username}
                                            </h3>
                                            <Badge variant="outline" className="text-xs">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {formatTimeAgo(request.sentAt)}
                                            </Badge>
                                        </div>

                                        {request.message && (
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                "{request.message}"
                                            </p>
                                        )}

                                        {!request.message && (
                                            <p className="text-sm text-muted-foreground">
                                                Wants to be your friend
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Button
                                        size="sm"
                                        onClick={() => acceptRequest(request.id)}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <UserCheck className="w-4 h-4 mr-1" />
                                        Accept
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => declineRequest(request.id)}
                                    >
                                        <UserX className="w-4 h-4 mr-1" />
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Outgoing Requests */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-orange-500" />
                        Sent Requests
                        {outgoingRequests.length > 0 && (
                            <Badge variant="outline" className="ml-2">
                                {outgoingRequests.length}
                            </Badge>
                        )}
                    </CardTitle>
                    <CardDescription>
                        Your pending friend requests
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {outgoingRequests.length === 0 ? (
                        <div className="text-center py-8">
                            <UserCheck className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                No sent requests
                            </h3>
                            <p className="text-muted-foreground">
                                When you send friend requests, they will appear here
                            </p>
                        </div>
                    ) : (
                        outgoingRequests.map((request) => (
                            <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4 flex-1">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                                            {request.fromUser.username.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-foreground">
                                                {request.fromUser.username}
                                            </h3>
                                            <Badge variant="outline" className="text-xs">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {formatTimeAgo(request.sentAt)}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            Waiting for response...
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => cancelRequest(request.id)}>
                                                <UserX className="w-4 h-4 mr-2" />
                                                Cancel Request
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Quick Stats */}
            {(incomingRequests.length > 0 || outgoingRequests.length > 0) && (
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                <div className="text-xl font-bold text-blue-600">{incomingRequests.length}</div>
                                <div className="text-xs text-muted-foreground">Incoming</div>
                            </div>
                            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                                <div className="text-xl font-bold text-orange-600">{outgoingRequests.length}</div>
                                <div className="text-xs text-muted-foreground">Outgoing</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}