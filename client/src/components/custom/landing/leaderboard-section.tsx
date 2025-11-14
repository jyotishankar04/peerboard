import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Globe, Building2, TrendingUp, Zap, Crown, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface TopPerformer {
    rank: number
    name: string
    college: string
    points: number
    change: number
}

interface RankingLevel {
    level: string
    icon: React.ReactNode
    description: string
    topRank: string
    participants: string
}

export default function LeaderboardsSection() {
    const leaderboardStats = [
        { number: "50K+", label: "Coders" },
        { number: "500+", label: "Colleges" },
        { number: "2K+", label: "Teams" },
        { number: "1M+", label: "Problems" },
    ]

    const rankingLevels: RankingLevel[] = [
        {
            level: "Global",
            icon: <Globe className="h-4 w-4" />,
            description: "Worldwide rankings",
            topRank: "CodingWizard",
            participants: "50K+",
        },
        {
            level: "National",
            icon: <TrendingUp className="h-4 w-4" />,
            description: "India-wide rankings",
            topRank: "CodeNinja",
            participants: "35K+",
        },
        {
            level: "College",
            icon: <Building2 className="h-4 w-4" />,
            description: "Your college",
            topRank: "IIT Delhi Team",
            participants: "2K+",
        },
        {
            level: "Team",
            icon: <Users className="h-4 w-4" />,
            description: "Team competitions",
            topRank: "Algorithm Avengers",
            participants: "500+",
        },
    ]

    const topPerformers: TopPerformer[] = [
        { rank: 1, name: "CodingWizard", college: "IIT Delhi", points: 2845, change: 2 },
        { rank: 2, name: "CodeNinja", college: "BIT Mesra", points: 2789, change: -1 },
        { rank: 3, name: "AlgoMaster", college: "NIT Trichy", points: 2654, change: 3 },
        { rank: 4, name: "DataStructPro", college: "IIIT Hyderabad", points: 2598, change: 0 },
        { rank: 5, name: "PythonDev", college: "BITS Pilani", points: 2543, change: 1 },
    ]

    return (
        <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="text-center space-y-3 mb-14">
                    <Badge variant="default" className="px-3 py-1 text-xs inline-flex items-center gap-1.5">
                        <Zap className="h-3 w-3" />
                        Live Rankings
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-tight">
                        Join India's <span className="text-primary">#1 Competitive</span>
                        <br />
                        Coding Network
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto text-balance">
                        Compete across global, national, college, and team rankings with thousands of passionate coders.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-14">
                    {leaderboardStats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-4 rounded-lg border border-border/40 hover:border-border/80 transition-colors bg-muted"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                            <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-bold">Global Leaderboard</h3>
                            <Badge variant="default" className="ml-auto text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                Live
                            </Badge>
                        </div>

                        <div className="border border-border/40 rounded-lg overflow-hidden bg-muted">
                            <div className="flex items-center gap-3 px-3 py-2.5 border-b border-border/30 bg-muted/40 text-xs font-medium text-muted-foreground">
                                <div className="w-6 text-center">#</div>
                                <div className="flex-1">Coder</div>
                                <div className="w-16 text-right">Points</div>
                                <div className="w-8 text-right">Δ</div>
                            </div>

                            {topPerformers.map((performer, index) => (
                                <div
                                    key={performer.rank}
                                    className={`flex items-center gap-3 px-3 py-2.5 hover:bg-primary/10  border-b border-border/20   ${index === 0 ? "bg-primary/20" : ""
                                        }`}
                                >
                                    <div className="w-6 text-center">
                                        {performer.rank === 1 ? (
                                            <Crown className="h-3.5 w-3.5 text-primary mx-auto" />
                                        ) : (
                                            <span
                                                className={`font-bold text-xs ${performer.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}
                                            >
                                                {performer.rank}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-xs truncate">{performer.name}</div>
                                        <div className="text-xs text-muted-foreground truncate">{performer.college}</div>
                                    </div>
                                    <div className="w-16 text-right font-bold text-xs text-primary">{performer.points}</div>
                                    <div
                                        className={`w-8 text-right text-xs font-medium flex items-center justify-end ${performer.change > 0
                                                ? "text-green-600 dark:text-green-400"
                                                : performer.change < 0
                                                    ? "text-red-600 dark:text-red-400"
                                                    : "text-muted-foreground"
                                            }`}
                                    >
                                        {performer.change > 0 && <ArrowUpRight className="h-3 w-3" />}
                                        {performer.change < 0 && <ArrowDownRight className="h-3 w-3" />}
                                        {Math.abs(performer.change) > 0 && <span>{Math.abs(performer.change)}</span>}
                                    </div>
                                </div>
                            ))}

                            <div className="p-2.5 text-center border-t border-border/30">
                                <Button
                                    
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-7 text-primary hover:text-primary hover:bg-primary/10"
                                >
                                    View Full Leaderboard →
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-bold">Ranking Tiers</h3>
                        </div>

                        <div className="space-y-2.5">
                            {rankingLevels.map((level, index) => (
                                <div
                                    key={index}
                                    className="group p-3.5 rounded-lg bg-muted hover:bg-muted/50 border border-border/40 hover:border-primary/50  transition-all cursor-pointer"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary text-xs shrink-0 group-hover:scale-110 transition-transform">
                                            {level.icon}
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-sm">{level.level}</h4>
                                                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                                    {level.participants}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{level.description}</p>
                                            <div className="flex items-center gap-1.5 text-xs pt-1">
                                                <Trophy className="h-3 w-3 text-primary shrink-0" />
                                                <span className="font-medium text-foreground truncate">{level.topRank}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <div className="mt-6 p-4 rounded-lg bg-primary text-primary-foreground border border-primary/80 text-center space-y-2.5">
                            <h4 className="font-semibold text-sm">Ready to Compete?</h4>
                            <p className="text-xs text-primary-foreground/80">Start climbing the ranks today</p>
                            <Button variant="secondary" size="sm" className="w-full h-8 text-xs">
                                <Trophy className="h-3 w-3 mr-1.5" />
                                Join Now
                            </Button>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
