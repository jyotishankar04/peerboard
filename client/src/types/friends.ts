// types/friends.ts
export interface Friend {
    id: string;
    username: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: Date;
    stats: {
        problemsSolved: number;
        contestRank: number;
        currentStreak: number;
    };
    platforms: string[];
    mutualFriends: number;
}

export interface FriendRequest {
    id: string;
    fromUser: {
        id: string;
        username: string;
        avatar?: string;
    };
    sentAt: Date;
    message?: string;
}

export interface FriendSuggestion {
    id: string;
    username: string;
    stats: {
        problemsSolved: number;
        contestRank: number;
        currentStreak: number;
    };
    platforms: string[];
    mutualFriends: number;
    commonInterests?: string[];
    location?: string;
    college?: string;
    similarityScore: number;
}