// components/notifications/NotificationDropdown.tsx
import  { useState } from 'react';
import { Bell, BellRing, Check, X, Clock, Users, Trophy, UserPlus, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Notification } from '@/types/notifications';

const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'contest_reminder',
        title: 'Contest Starting Soon',
        description: 'Weekly Contest 395 starts in 1 hour',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        isRead: false,
        actionUrl: '/contest/395',
        metadata: { contestId: '395' }
    },
    {
        id: '2',
        type: 'team_invite',
        title: 'Team Invitation',
        description: 'You have been invited to join "Code Masters" team',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: false,
        actionUrl: '/teams/1',
        metadata: { teamId: '1' }
    },
    {
        id: '3',
        type: 'achievement',
        title: 'Achievement Unlocked!',
        description: 'You earned the "Problem Solver" badge',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        isRead: true,
        actionUrl: '/profile/achievements',
        metadata: { achievementId: 'problem-solver' }
    },
    {
        id: '4',
        type: 'friend_request',
        title: 'Friend Request',
        description: 'John Doe sent you a friend request',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isRead: true,
        actionUrl: '/profile/friends',
        metadata: { userId: '123' }
    }
];

export function NotificationDropdown() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const getNotificationIcon = (type: Notification['type']) => {
        const icons = {
            contest_reminder: Clock,
            team_invite: Users,
            achievement: Trophy,
            friend_request: UserPlus,
            system: Settings
        };
        const IconComponent = icons[type];
        return <IconComponent className="w-4 h-4" />;
    };

    const getNotificationColor = (type: Notification['type']) => {
        const colors = {
            contest_reminder: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
            team_invite: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
            achievement: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400',
            friend_request: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
            system: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400'
        };
        return colors[type];
    };

    const markAsRead = (notificationId: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, isRead: true }))
        );
    };

    const clearAll = () => {
        setNotifications([]);
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
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    {unreadCount > 0 ? (
                        <BellRing className="w-5 h-5" />
                    ) : (
                        <Bell className="w-5 h-5" />
                    )}
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <div className="flex items-center gap-1">
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={markAllAsRead}
                                className="h-8 text-xs"
                            >
                                <Check className="w-3 h-3 mr-1" />
                                Mark all read
                            </Button>
                        )}
                        {notifications.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearAll}
                                className="h-8 text-xs"
                            >
                                <X className="w-3 h-3 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                <ScrollArea className="h-80">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <Bell className="w-12 h-12 text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground">No notifications</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                You're all caught up!
                            </p>
                        </div>
                    ) : (
                        <div className="p-2 flex flex-col gap-2">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`
                    flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer
                    ${notification.isRead
                                            ? 'bg-transparent'
                                            : 'bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-800'
                                        }
                    hover:bg-muted/50
                  `}
                                    onClick={() => {
                                        markAsRead(notification.id);
                                        if (notification.actionUrl) {
                                            window.location.href = notification.actionUrl;
                                        }
                                    }}
                                >
                                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                                        {getNotificationIcon(notification.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <p className="font-medium text-sm text-foreground line-clamp-1">
                                                {notification.title}
                                            </p>
                                            {!notification.isRead && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1 ml-2" />
                                            )}
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                                            {notification.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">
                                                {formatTimeAgo(notification.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                <div className="p-3 border-t">
                    <Button
                        variant="outline"
                        className="w-full"
                        asChild
                        onClick={() => setIsOpen(false)}
                    >
                        <a href="/notifications">
                            View All Notifications
                        </a>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}