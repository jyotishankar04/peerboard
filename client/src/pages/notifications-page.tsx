// components/notifications/NotificationsPage.tsx
import  { useState } from 'react';
import { Bell, Check, Trash2, Filter, Search, Clock, Users, Trophy, UserPlus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Notification } from '@/types/notifications';

const mockAllNotifications: Notification[] = [
    // ... (same as mockNotifications from dropdown but more entries)
    {
        id: '1',
        type: 'contest_reminder',
        title: 'Contest Starting Soon',
        description: 'Weekly Contest 395 starts in 1 hour',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isRead: false,
        actionUrl: '/contest/395'
    },
    {
        id: '2',
        type: 'team_invite',
        title: 'Team Invitation',
        description: 'You have been invited to join "Code Masters" team',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
        actionUrl: '/teams/1'
    },
    // Add more notifications for testing...
];

export function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>(mockAllNotifications);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNotifications = notifications.filter(notification => {
        const matchesTab = activeTab === 'all' || notification.type === activeTab;
        const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notification.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

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

    const deleteNotification = (notificationId: string) => {
        setNotifications(prev =>
            prev.filter(notification => notification.id !== notificationId)
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const getNotificationIcon = (type: Notification['type']) => {
        const icons = {
            contest_reminder: Clock,
            team_invite: Users,
            achievement: Trophy,
            friend_request: UserPlus,
            system: Settings
        };
        const IconComponent = icons[type];
        return <IconComponent className="w-5 h-5" />;
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
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <Bell className="w-8 h-8 text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                        <p className="text-muted-foreground mt-1">
                            {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <Button variant="outline" onClick={markAllAsRead}>
                            <Check className="w-4 h-4 mr-2" />
                            Mark all as read
                        </Button>
                    )}
                    <Button variant="outline" onClick={clearAll}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear all
                    </Button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search notifications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        All
                    </TabsTrigger>
                    <TabsTrigger value="contest_reminder" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Contests
                    </TabsTrigger>
                    <TabsTrigger value="team_invite" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Teams
                    </TabsTrigger>
                    <TabsTrigger value="achievement" className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Achievements
                    </TabsTrigger>
                    <TabsTrigger value="friend_request" className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Social
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4">
                    <Card>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[600px]">
                                {filteredNotifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center p-12 text-center">
                                        <Bell className="w-16 h-16 text-muted-foreground/50 mb-4" />
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            No notifications found
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {searchQuery ? 'Try adjusting your search terms' : `You don't have any ${activeTab === 'all' ? '' : activeTab + ' '}notifications`}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {filteredNotifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`
                          flex items-start gap-4 p-4 transition-colors
                          ${notification.isRead
                                                        ? 'bg-transparent'
                                                        : 'bg-blue-50 dark:bg-blue-950/20'
                                                    }
                          hover:bg-muted/50
                        `}
                                            >
                                                <div className="p-2 rounded-lg bg-muted">
                                                    {getNotificationIcon(notification.type)}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-foreground">
                                                                {notification.title}
                                                            </h3>
                                                            <p className="text-muted-foreground mt-1">
                                                                {notification.description}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2 shrink-0 ml-4">
                                                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                                                                {formatTimeAgo(notification.timestamp)}
                                                            </span>
                                                            {!notification.isRead && (
                                                                <Badge variant="default" className="whitespace-nowrap">
                                                                    New
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {notification.actionUrl && (
                                                            <Button variant="outline" size="sm" asChild>
                                                                <a href={notification.actionUrl}>
                                                                    View Details
                                                                </a>
                                                            </Button>
                                                        )}
                                                        {!notification.isRead && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => markAsRead(notification.id)}
                                                            >
                                                                <Check className="w-4 h-4 mr-1" />
                                                                Mark read
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => deleteNotification(notification.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}