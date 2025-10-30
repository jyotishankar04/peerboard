// types/contest.ts
export interface Contest {
    id: string;
    name: string;
    platform: 'leetcode' | 'codeforces' | 'codechef' | 'hackerrank' | 'atcoder' | 'topcoder';
    startTime: Date;
    endTime: Date;
    duration: number; // in minutes
    description: string;
    type: 'weekly' | 'biweekly' | 'monthly' | 'challenge' | 'contest';
    registrationStatus: 'open' | 'closed' | 'upcoming';
    url: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    participants?: number;
}

export interface ContestReminder {
    contestId: string;
    enabled: boolean;
    leadTime: number; // in minutes
    methods: ('email' | 'push')[];
}



// types/achievements.ts


// types/contest.ts
export interface ContestProblem {
    id: string;
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    status: 'solved' | 'attempted' | 'not_attempted';
    tags: string[];
}

export interface ContestDetails {
    id: string;
    name: string;
    platform: string;
    description: string;
    rules: string[];
    startTime: Date;
    endTime: Date;
    duration: number;
    registrationStatus: 'open' | 'closed' | 'upcoming';
    userStatus: 'registered' | 'not_registered' | 'participated';
    problems: ContestProblem[];
    totalParticipants: number;
    discussionUrl?: string;
    editorialUrl?: string;
}