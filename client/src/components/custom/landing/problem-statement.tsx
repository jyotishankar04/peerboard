import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Code2, Users, TrendingUp, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProblemStatement() {
    const stats = [
        { number: "5+", label: "Platforms Used" },
        { number: "3.2h", label: "Weekly Manual Tracking" },
        { number: "0", label: "Integrated Leaderboards" },
        { number: "87%", label: "Feel Isolated" }
    ]

    const problems = [
        {
            icon: <Code2 className="h-5 w-5" />,
            title: "Platform Switching Fatigue",
            description: "Constantly jumping between different coding environments and losing context"
        },
        {
            icon: <TrendingUp className="h-5 w-5" />,
            title: "Progress Tracking Overhead",
            description: "Manual logging of achievements instead of focusing on actual coding"
        },
        {
            icon: <Users className="h-5 w-5" />,
            title: "Missed Collaboration",
            description: "No team challenges or peer learning opportunities across platforms"
        },
        {
            icon: <Globe className="h-5 w-5" />,
            title: "Limited Competition Scope",
            description: "Can't see how you stack up against coders nationwide"
        }
    ]

    return (
        <section className="w-full  py-12 md:py-24 lg:py-32 bg-background">
            <div className="px-4 md:px-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                    <Badge variant="outline" className="px-3 py-1">
                        <AlertTriangle className="mr-2 h-3 w-3" />
                        The Coding Struggle
                    </Badge>

                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Your Coding Journey Shouldn't Be
                        <span className="block text-primary">This Fragmented</span>
                    </h2>

                    <p className="max-w-[900px] text-muted-foreground md:text-lg">
                        You're solving complex problems, but managing your progress across multiple platforms
                        has become a problem in itself.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
                    {stats.map((stat, index) => (
                        <Card key={index} className="text-center">
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                                <div className="text-xs text-muted-foreground">{stat.label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Problems Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:gap-8 max-w-4xl mx-auto">
                    {problems.map((problem, index) => (
                        <Card key={index} className="group hover:shadow-sm transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    <Button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                        {problem.icon}
                                    </Button>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold leading-none">{problem.title}</h3>
                                        <p className="text-sm text-muted-foreground">{problem.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}