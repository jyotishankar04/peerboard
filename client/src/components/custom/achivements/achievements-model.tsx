// components/achievements/AchievementModal.tsx
import React from 'react';
import { Trophy, Target, Calendar, Star, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import  type { Achievement } from '@/types/achievements';

interface AchievementModalProps {
    achievement: Achievement;
    children: React.ReactNode;
}

export function AchievementModal({ achievement, children }: AchievementModalProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const getRarityColor = (rarity: string) => {
        const colors = {
            common: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
            rare: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            legendary: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
        };
        return colors[rarity as keyof typeof colors];
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-4xl">{achievement.icon}</div>
                            <div>
                                <DialogTitle className="text-2xl">{achievement.name}</DialogTitle>
                                <DialogDescription>{achievement.description}</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Rarity and Status */}
                        <div className="flex items-center justify-between">
                            <Badge className={getRarityColor(achievement.rarity)}>
                                <Star className="w-3 h-3 mr-1" />
                                {achievement.rarity.toUpperCase()}
                            </Badge>
                            <Badge variant={achievement.earned ? "default" : "secondary"}>
                                {achievement.earned ? (
                                    <>
                                        <Trophy className="w-3 h-3 mr-1" />
                                        EARNED
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-3 h-3 mr-1" />
                                        LOCKED
                                    </>
                                )}
                            </Badge>
                        </div>

                        {/* Level Progress */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Level Progress</span>
                                <span className="font-medium">
                                    Level {achievement.level} of {achievement.maxLevel}
                                </span>
                            </div>
                            <Progress
                                value={(achievement.level / achievement.maxLevel) * 100}
                                className="h-2"
                            />
                        </div>

                        {/* Criteria */}
                        <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Achievement Criteria
                            </h4>
                            <div className="bg-muted p-3 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm capitalize">
                                        {achievement.criteria.type.replace('_', ' ')}
                                    </span>
                                    <span className="font-medium">
                                        {achievement.criteria.current}/{achievement.criteria.target}
                                    </span>
                                </div>
                                <Progress value={achievement.progress} className="h-2" />
                            </div>
                        </div>

                        {/* Earned Date */}
                        {achievement.earned && achievement.earnedAt && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                Earned on {achievement.earnedAt.toLocaleDateString()}
                            </div>
                        )}

                        {/* Tips for Next Level */}
                        {!achievement.earned && (
                            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                                <h5 className="font-medium text-sm mb-1">How to unlock:</h5>
                                <p className="text-sm text-muted-foreground">
                                    {achievement.criteria.type === 'problems_solved' &&
                                        `Solve ${achievement.criteria.target - achievement.criteria.current} more problems to unlock this achievement.`}
                                    {achievement.criteria.type === 'contests_joined' &&
                                        `Participate in ${achievement.criteria.target - achievement.criteria.current} more contests.`}
                                    {achievement.criteria.type === 'current_streak' &&
                                        `Maintain your streak for ${achievement.criteria.target - achievement.criteria.current} more days.`}
                                </p>
                            </div>
                        )}

                        <Button className="w-full" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}