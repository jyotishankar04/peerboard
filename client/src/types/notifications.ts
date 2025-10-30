// types/notification.ts
export interface Notification {
    id: string;
    type: 'contest_reminder' | 'team_invite' | 'achievement' | 'friend_request' | 'system';
    title: string;
    description: string;
    timestamp: Date;
    isRead: boolean;
    actionUrl?: string;
    metadata?: {
        contestId?: string;
        teamId?: string;
        achievementId?: string;
        userId?: string;
    };
}

export interface Referral {
    id: string;
    email: string;
    status: 'pending' | 'accepted' | 'joined';
    joinedAt?: Date;
    rewardEarned: boolean;
}