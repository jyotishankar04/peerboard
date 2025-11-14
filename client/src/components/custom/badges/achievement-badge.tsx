import type React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export interface AchievementBadgeProps {
    id: number
    name: string
    description: string
    icon: React.ReactNode
    date: string
    variant?: "default" | "bronze" | "silver" | "gold" | "platinum" | "special"
    className?: string
}

const variantStyles = {
    default:
        "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 shadow-lg hover:shadow-xl",
    bronze:
        "bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 dark:from-amber-900 dark:via-amber-800 dark:to-orange-900 text-amber-900 dark:text-amber-100 border-amber-300 dark:border-amber-600 shadow-lg hover:shadow-amber-500/20 dark:hover:shadow-amber-600/20",
    silver:
        "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 text-slate-900 dark:text-slate-100 border-slate-400 dark:border-slate-500 shadow-lg hover:shadow-slate-400/20 dark:hover:shadow-slate-500/20",
    gold: "bg-gradient-to-br from-yellow-100 via-yellow-50 to-amber-100 dark:from-yellow-800 dark:via-yellow-700 dark:to-amber-800 text-yellow-900 dark:text-yellow-100 border-yellow-400 dark:border-yellow-600 shadow-lg hover:shadow-yellow-500/20 dark:hover:shadow-yellow-600/20",
    platinum:
        "bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100 dark:from-blue-800 dark:via-cyan-700 dark:to-blue-800 text-blue-900 dark:text-blue-100 border-blue-400 dark:border-blue-600 shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-600/20",
    special:
        "bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 dark:from-purple-800 dark:via-pink-700 dark:to-purple-800 text-purple-900 dark:text-purple-100 border-purple-400 dark:border-purple-600 shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-600/20",
}

export const AchievementBadge = ({
    name,
    description,
    icon,
    date,
    variant = "default",
    className,
}: AchievementBadgeProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 group",
                            variantStyles[variant],
                            className,
                        )}
                    >
                        <div className="relative mb-3 transition-transform duration-300 group-hover:scale-125">
                            <div
                                className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background:
                                        variant === "bronze"
                                            ? "rgba(217, 119, 6, 0.3)"
                                            : variant === "silver"
                                                ? "rgba(100, 116, 139, 0.3)"
                                                : variant === "gold"
                                                    ? "rgba(202, 138, 4, 0.3)"
                                                    : variant === "platinum"
                                                        ? "rgba(59, 130, 246, 0.3)"
                                                        : variant === "special"
                                                            ? "rgba(147, 51, 234, 0.3)"
                                                            : "rgba(100, 116, 139, 0.3)",
                                }}
                            />
                            <div className="relative text-4xl drop-shadow-lg">{icon}</div>
                        </div>

                        <div className="text-sm font-bold text-center leading-tight tracking-wide">{name}</div>
                        <div className="text-xs opacity-75 text-center mt-2 font-medium">
                            {new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-0 rounded-lg shadow-xl">
                    <p className="font-bold text-sm">{name}</p>
                    <p className="text-xs opacity-90 mt-1">{description}</p>
                    <p className="text-xs opacity-75 mt-2">
                        Earned {new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const TrophyIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
    </svg>
)

const TargetIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
)

const DiamondIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2L2 7l10 15 10-15-10-5zm0 5.18L6.82 7 12 4.18 17.18 7 12 7.18z" />
    </svg>
)

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" />
    </svg>
)

const RocketIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
    </svg>
)

const CrownIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

const FlameIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 2.08 13.5.67z" />
    </svg>
)

const BoltIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
)

const SparkleIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

const MedalIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
    </svg>
)

const GraduationIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
    </svg>
)

const BrainIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
    </svg>
)

const TeamIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
)

const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
)

const HandshakeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
    </svg>
)

const GlobeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
    </svg>
)

const TrendingIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18 10 11.41l4 4 6.3-6.29L22 12v-6z" />
    </svg>
)

// Problem Solving Achievements
export const HundredProblemsBadge = () => (
    <AchievementBadge
        id={1}
        name="100 Problems"
        description="Successfully solved 100 coding problems across all platforms"
        icon={<TrophyIcon />}
        date="2024-01-15"
        variant="bronze"
    />
)

export const FiveHundredProblemsBadge = () => (
    <AchievementBadge
        id={2}
        name="500 Problems"
        description="Solved 500 coding problems demonstrating exceptional dedication"
        icon={<TargetIcon />}
        date="2024-02-20"
        variant="silver"
    />
)

export const ThousandProblemsBadge = () => (
    <AchievementBadge
        id={3}
        name="1K Problems"
        description="Milestone achievement of solving 1000 coding problems"
        icon={<DiamondIcon />}
        date="2024-03-10"
        variant="gold"
    />
)

// Contest Achievements
export const ContestMasterBadge = () => (
    <AchievementBadge
        id={4}
        name="Contest Master"
        description="Participated in 10+ coding contests across different platforms"
        icon={<StarIcon />}
        date="2024-01-10"
        variant="silver"
    />
)

export const TopPerformerBadge = () => (
    <AchievementBadge
        id={5}
        name="Top Performer"
        description="Achieved top 100 rank in a competitive programming contest"
        icon={<RocketIcon />}
        date="2024-02-05"
        variant="gold"
    />
)

export const ContestChampionBadge = () => (
    <AchievementBadge
        id={6}
        name="Contest Champion"
        description="Won first place in a coding competition"
        icon={<CrownIcon />}
        date="2024-03-01"
        variant="platinum"
    />
)

// Streak Achievements
export const WeekStreakBadge = () => (
    <AchievementBadge
        id={7}
        name="7-Day Streak"
        description="Maintained a coding streak for 7 consecutive days"
        icon={<FlameIcon />}
        date="2024-01-08"
        variant="bronze"
    />
)

export const MonthStreakBadge = () => (
    <AchievementBadge
        id={8}
        name="30-Day Streak"
        description="Consistently coded for 30 days without break"
        icon={<BoltIcon />}
        date="2024-02-01"
        variant="silver"
    />
)

export const QuarterStreakBadge = () => (
    <AchievementBadge
        id={9}
        name="90-Day Streak"
        description="Amazing dedication with 90 days of continuous coding"
        icon={<SparkleIcon />}
        date="2024-03-15"
        variant="gold"
    />
)

// Rating Achievements
export const RisingStarBadge = () => (
    <AchievementBadge
        id={10}
        name="Rising Star"
        description="Reached 1800 rating on any competitive programming platform"
        icon={<MedalIcon />}
        date="2023-12-28"
        variant="silver"
    />
)

export const ExpertCoderBadge = () => (
    <AchievementBadge
        id={11}
        name="Expert Coder"
        description="Achieved expert level with 2000+ rating"
        icon={<GraduationIcon />}
        date="2024-01-25"
        variant="gold"
    />
)

export const MasterCoderBadge = () => (
    <AchievementBadge
        id={12}
        name="Master Coder"
        description="Reached master level with 2200+ rating"
        icon={<BrainIcon />}
        date="2024-02-18"
        variant="platinum"
    />
)

// Team & Social Achievements
export const TeamPlayerBadge = () => (
    <AchievementBadge
        id={13}
        name="Team Player"
        description="Joined and actively participated in 5 different teams"
        icon={<TeamIcon />}
        date="2024-01-01"
        variant="bronze"
    />
)

export const TeamLeaderBadge = () => (
    <AchievementBadge
        id={14}
        name="Team Leader"
        description="Led a team to victory in team-based competitions"
        icon={<ShieldIcon />}
        date="2024-02-12"
        variant="silver"
    />
)

export const CommunityHelperBadge = () => (
    <AchievementBadge
        id={15}
        name="Community Helper"
        description="Helped others by providing solutions and guidance"
        icon={<HandshakeIcon />}
        date="2024-03-05"
        variant="special"
    />
)

// Special Achievements
export const AllPlatformsBadge = () => (
    <AchievementBadge
        id={16}
        name="Platform Master"
        description="Connected and solved problems on 3+ different coding platforms"
        icon={<GlobeIcon />}
        date="2024-01-20"
        variant="special"
    />
)

export const SpeedDemonBadge = () => (
    <AchievementBadge
        id={17}
        name="Speed Demon"
        description="Solved 10 problems in under 30 minutes total"
        icon={<BoltIcon />}
        date="2024-02-08"
        variant="gold"
    />
)

export const ConsistencyKingBadge = () => (
    <AchievementBadge
        id={18}
        name="Consistency King"
        description="Maintained 60+ day coding streak with daily submissions"
        icon={<TrendingIcon />}
        date="2024-03-20"
        variant="platinum"
    />
)
