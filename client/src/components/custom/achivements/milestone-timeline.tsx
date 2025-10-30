// components/custom/achievements/milestone-timeline.tsx
import { Calendar, Trophy, Target, Users, Code, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Milestone } from '@/types/achievements';

interface MilestoneTimelineProps {
    milestones: Milestone[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
    const getMilestoneIcon = (type: string) => {
        const icons = {
            problem: <Code className="w-5 h-5 text-blue-500" />,
            contest: <Trophy className="w-5 h-5 text-yellow-500" />,
            streak: <Target className="w-5 h-5 text-green-500" />,
            team: <Users className="w-5 h-5 text-purple-500" />,
            achievement: <Star className="w-5 h-5 text-orange-500" />
        };
        return icons[type as keyof typeof icons] || <Star className="w-5 h-5" />;
    };

    const getTypeColor = (type: string) => {
        const colors = {
            problem: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            contest: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            streak: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            team: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            achievement: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
        };
        return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Your Programming Journey
                </CardTitle>
                <CardDescription>
                    Track your progress and celebrate important milestones in your coding journey
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div key={milestone.id} className="relative flex items-start gap-4">
                                {/* Timeline dot */}
                                <div className={`
                  relative z-10 shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                  ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                                    {getMilestoneIcon(milestone.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-2 pb-8">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="font-semibold text-lg text-foreground">
                                            {milestone.title}
                                        </h3>
                                        <Badge variant="secondary" className={getTypeColor(milestone.type)}>
                                            {milestone.type}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(milestone.date)}
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {milestone.description}
                                    </p>

                                    {/* Progress indicator for last item */}
                                    {index === milestones.length - 1 && (
                                        <div className="pt-4">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                Your journey continues...
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-3">Journey Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-foreground">
                                {milestones.filter(m => m.type === 'problem').length}
                            </div>
                            <div className="text-xs text-muted-foreground">Problem Milestones</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">
                                {milestones.filter(m => m.type === 'contest').length}
                            </div>
                            <div className="text-xs text-muted-foreground">Contest Milestones</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">
                                {milestones.length}
                            </div>
                            <div className="text-xs text-muted-foreground">Total Milestones</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">
                                {Math.floor((new Date().getTime() - milestones[0]?.date.getTime()) / (1000 * 60 * 60 * 24))}d
                            </div>
                            <div className="text-xs text-muted-foreground">Days Active</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}