import Features from "@/components/custom/landing/features-section"
import HeroSection from "@/components/custom/landing/hero-section"
import IntegrationsSection from "@/components/custom/landing/integration-section"
import ProblemStatement from "@/components/custom/landing/problem-statement"
import StatsSection from "@/components/custom/landing/stat-section"

const Landing = () => {
    return (
        <div className="min-h-screen w-full relative">
            {/* Your Content/Components */}
            <HeroSection />
            <ProblemStatement />
            <Features />
            <StatsSection />
            <IntegrationsSection />
        </div>
    )
}

export default Landing