// components/contest-calendar/RemindersSection.tsx
import  { useState } from 'react';
import { Bell, BellOff, Mail, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type{ Contest } from '@/types/contest';

interface RemindersSectionProps {
    contests: Contest[];
}

export function RemindersSection({ contests }: RemindersSectionProps) {
    const [reminders, setReminders] = useState({
        enabled: true,
        email: true,
        push: true,
        leadTime: 60 // minutes
    });

    const upcomingContestsWithReminders = contests.slice(0, 3);

    return (
        <div className="space-y-6">
            {/* Reminder Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notification Settings
                    </CardTitle>
                    <CardDescription>
                        Configure how you want to be reminded about upcoming contests
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Global Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="reminders-enabled" className="text-base">
                                Enable Contest Reminders
                            </Label>
                            <div className="text-sm text-muted-foreground">
                                Receive notifications for upcoming contests
                            </div>
                        </div>
                        <Switch
                            id="reminders-enabled"
                            checked={reminders.enabled}
                            onCheckedChange={(checked) => setReminders(prev => ({ ...prev, enabled: checked }))}
                        />
                    </div>

                    {reminders.enabled && (
                        <>
                            {/* Notification Methods */}
                            <div className="space-y-4">
                                <Label>Notification Methods</Label>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center space-x-2 flex-1 p-4 border rounded-lg">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <div className="flex-1 space-y-0.5">
                                            <Label htmlFor="email-reminders" className="text-sm font-normal">
                                                Email Notifications
                                            </Label>
                                            <div className="text-xs text-muted-foreground">
                                                Receive contest reminders via email
                                            </div>
                                        </div>
                                        <Switch
                                            id="email-reminders"
                                            checked={reminders.email}
                                            onCheckedChange={(checked) => setReminders(prev => ({ ...prev, email: checked }))}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2 flex-1 p-4 border rounded-lg">
                                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                                        <div className="flex-1 space-y-0.5">
                                            <Label htmlFor="push-reminders" className="text-sm font-normal">
                                                Push Notifications
                                            </Label>
                                            <div className="text-xs text-muted-foreground">
                                                Receive browser push notifications
                                            </div>
                                        </div>
                                        <Switch
                                            id="push-reminders"
                                            checked={reminders.push}
                                            onCheckedChange={(checked) => setReminders(prev => ({ ...prev, push: checked }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Lead Time */}
                            <div className="space-y-2">
                                <Label htmlFor="lead-time">Reminder Lead Time</Label>
                                <Select
                                    value={reminders.leadTime.toString()}
                                    onValueChange={(value) => setReminders(prev => ({ ...prev, leadTime: parseInt(value) }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="15">15 minutes before</SelectItem>
                                        <SelectItem value="30">30 minutes before</SelectItem>
                                        <SelectItem value="60">1 hour before</SelectItem>
                                        <SelectItem value="1440">1 day before</SelectItem>
                                        <SelectItem value="10080">1 week before</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Upcoming Reminders */}
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Reminders</CardTitle>
                    <CardDescription>
                        Contests you'll be reminded about
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {upcomingContestsWithReminders.map(contest => (
                            <div key={contest.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <div>
                                        <div className="font-medium text-sm">
                                            {contest.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {contest.startTime.toLocaleDateString()} • {contest.startTime.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">
                                        Reminder set
                                    </Badge>
                                    <Button variant="ghost" size="sm">
                                        <BellOff className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}