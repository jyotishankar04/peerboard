"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
    BarChart3,
    Users,
    Trophy,
    TrendingUp,
    Activity,
    Award,
    Download,
    Shield,
    Smartphone,
    Megaphone,
    Code,
    Headphones,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PeerBoardFeatures() {
    type FeatureKey = "dashboard" | "leaderboards" | "teams" | "analytics" | "social" | "privacy"
    const [activeFeature, setActiveFeature] = useState<FeatureKey>("dashboard")

    const features = {
        dashboard: {
            icon: BarChart3,
            title: "Unified Progress Dashboard",
            description: "Track your coding journey across all major platforms in one place",
            highlights: [
                "LeetCode, CodeChef, Codeforces, TUF integration",
                "One-click profile sharing with combined stats",
                "Achievement badges and milestone tracking",
                "Real-time progress updates",
            ],
        },
        leaderboards: {
            icon: Trophy,
            title: "Multi-Level Leaderboards",
            description: "Compete and collaborate at every level of your coding community",
            highlights: [
                "Global, country, and locality rankings",
                "College-specific leaderboards",
                "Team-based competitive rankings",
                "Dynamic filtering and search",
            ],
        },
        teams: {
            icon: Users,
            title: "Collaborative Teams",
            description: "Learn together, grow together with team-based features",
            highlights: [
                "Create or join teams for group learning",
                "Track collective team progress",
                "Team chat and collaboration tools",
                "Shared problem lists and resources",
            ],
        },
        analytics: {
            icon: TrendingUp,
            title: "Advanced Analytics",
            description: "Deep insights into your coding progress and improvement areas",
            highlights: [
                "Visual charts for problem-solving patterns",
                "Contest rating trends over time",
                "Strength and weakness analysis",
                "Personalized improvement suggestions",
            ],
        },
        social: {
            icon: Activity,
            title: "Social & Community",
            description: "Connect with peers and build your coding network",
            highlights: [
                "Activity feeds with submissions and contests",
                "Peer groups and coding clubs",
                "Contest calendar with reminders",
                "Public/private profile controls",
            ],
        },
        privacy: {
            icon: Shield,
            title: "Security & Privacy",
            description: "Your data, your control with enterprise-grade security",
            highlights: [
                "OAuth with GitHub/Google/LinkedIn",
                "Granular privacy controls",
                "Data opt-in/out preferences",
                "Secure authentication protocols",
            ],
        },
    }

    const additionalFeatures = [
        { icon: Award, text: "Achievement & Streak System" },
        { icon: Download, text: "Export Progress Reports" },
        { icon: Smartphone, text: "Mobile Responsive Design" },
        { icon: Megaphone, text: "College Ambassador Program" },
        { icon: Code, text: "API Access (Premium)" },
        { icon: Headphones, text: "Dedicated Customer Support" },
    ]

    const currentFeature = features[activeFeature]
    const Icon = currentFeature.icon

    return (
        <section className="relative py-16 px-6 overflow-hidden bg-background">
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 space-y-3">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Everything You Need</h2>
                        <p className="text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
                            A comprehensive platform to track, compete, and collaborate on your coding journey
                        </p>
                    </motion.div>
                </div>

                {/* Main Feature Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Feature Selector */}
                    <div className="space-y-2">
                        {Object.entries(features).map(([key, feature], index) => {
                            const FeatureIcon = feature.icon
                            const isActive = activeFeature === key

                            return (
                                <motion.button
                                    key={key}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setActiveFeature(key as FeatureKey)}
                                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${isActive
                                        ? "bg-card border-primary/50 shadow-md"
                                        : "bg-muted/50 border-border hover:bg-muted hover:border-border/80"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-lg bg-primary/10 text-primary transition-transform duration-300 ${isActive ? "scale-105" : "scale-100"}`}
                                        >
                                            <FeatureIcon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-semibold text-foreground mb-1">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            )
                        })}
                    </div>

                    {/* Feature Display */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                            >
                                <Card className="p-6 md:p-8 border-primary/20 bg-card">
                                    {/* Icon */}
                                    <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-foreground mb-3">{currentFeature.title}</h3>

                                    {/* Description */}
                                    <p className="text-muted-foreground text-base mb-6">{currentFeature.description}</p>

                                    {/* Highlights */}
                                    <div className="space-y-3">
                                        {currentFeature.highlights.map((highlight, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 + 0.2 }}
                                                className="flex items-start gap-2"
                                            >
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                <p className="text-foreground/80 text-sm">{highlight}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Additional Features Grid */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-center text-foreground mb-8">And Much More...</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {additionalFeatures.map((feature, index) => {
                            const FeatureIcon = feature.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 + 0.3 }}
                                    className="group relative p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted hover:border-primary/50 transition-all duration-300"
                                >
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                                            <FeatureIcon className="w-5 h-5" />
                                        </div>
                                        <p className="text-xs text-foreground font-medium leading-tight">{feature.text}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <Button size="lg" className="rounded-full text-sm">
                        Start Your Journey Today
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}