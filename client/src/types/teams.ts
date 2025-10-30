// types/team.ts
export interface Team {
    id: string;
    name: string;
    description: string;
    logo?: string;
    memberCount: number;
    problemsSolved: number;
    privacy: 'public' | 'private';
    type: 'college' | 'public' | 'study';
    college?: string;
    location?: string;
    createdAt: Date;
    isMember: boolean;
    isAdmin: boolean;
}

export interface TeamMember {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
    problemsSolved: number;
    joinDate: Date;
}

export interface TeamActivity {
    id: string;
    type: 'problem_solved' | 'contest_joined' | 'milestone' | 'member_joined';
    userId: string;
    userName: string;
    description: string;
    timestamp: Date;
    problemName?: string;
    contestName?: string;
    milestoneName?: string;
}