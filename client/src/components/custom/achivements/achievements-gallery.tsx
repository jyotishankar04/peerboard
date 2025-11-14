// components/achievements/AchievementGallery.tsx
import { Trophy,  Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { Achievement } from '@/types/achievements';
import { AchievementModal } from './achievements-model';

interface AchievementGalleryProps {
    achievements: Achievement[];
}

export function AchievementGallery({ achievements }: AchievementGalleryProps) {
    const getRarityColor = (rarity: string) => {
        const colors = {
            common: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
            rare: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            legendary: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
        };
        return colors[rarity as keyof typeof colors];
    };

    const getCategoryIcon = (category: string) => {
        const icons = {
            problems: '💻',
            contests: '🏆',
            streaks: '🔥',
            teams: '👥',
            social: '🤝'
        };
        return icons[category as keyof typeof icons];
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
                <AchievementModal key={achievement.id} achievement={achievement}>
                    <Card className={`
            cursor-pointer transition-all hover:scale-105 hover:shadow-lg
            ${achievement.earned
                            ? 'border-primary/20'
                            : 'border-muted opacity-60'
                        }
          `}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-2xl">{achievement.icon}</div>
                                <div className="flex items-center gap-1">
                                    <Badge variant="secondary" className={getRarityColor(achievement.rarity)}>
                                        {achievement.rarity}
                                    </Badge>
                                    {achievement.earned ? (
                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                    ) : (
                                        <Lock className="w-4 h-4 text-muted-foreground" />
                                    )}
                                </div>
                            </div>

                            <CardTitle className="text-lg">{achievement.name}</CardTitle>
                            <CardDescription className="line-clamp-2">
                                {achievement.description}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {/* Level Badge */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Level</span>
                                <Badge variant="outline">
                                    {achievement.level}/{achievement.maxLevel}
                                </Badge>
                            </div>

                            {/* Progress */}
                            {!achievement.earned && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">
                                            {achievement.criteria.current}/{achievement.criteria.target}
                                        </span>
                                    </div>
                                    <Progress value={achievement.progress} className="h-2" />
                                </div>
                            )}

                            {/* Earned Date */}
                            {achievement.earned && achievement.earnedAt && (
                                <div className="text-xs text-muted-foreground text-center">
                                    Earned on {achievement.earnedAt.toLocaleDateString()}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </AchievementModal>
            ))}
        </div>
    );
}