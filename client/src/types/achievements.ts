export interface Achievement {
    id: string;
    name: string;
    description: string;
    category: 'problems' | 'contests' | 'streaks' | 'teams' | 'social';
    level: number;
    maxLevel: number;
    icon: string;
    earned: boolean;
    earnedAt?: Date;
    progress: number;
    criteria: {
        type: string;
        target: number;
        current: number;
    };
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Milestone {
    id: string;
    title: string;
    description: string;
    date: Date;
    type: 'problem' | 'contest' | 'streak' | 'team' | 'achievement';
    icon: string;
}
