export interface SocialInfo {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
}
export interface UserExtraInfo {
    bio: string;
    location: string;
    primaryProgrammingLanguage: string;
}
export interface UserPreference {
    emailNotifications: boolean;
    pushNotifications: boolean;
    profileVisibility: string;
    theme: string;
}


export interface UserProfile extends User {
    userExtraInfo: UserExtraInfo;
    socialInfo: SocialInfo;
    userPreference: UserPreference;
    isOnboarded: boolean;
    username: string;
    emailVerifiedAt: Date | null;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateUserSchema {
    name?: string;
    username?: string;
    bio?: string;
    location?: string;
    socialInfo?: Partial<SocialInfo>;
    userPreference?: Partial<UserPreference>;
}