import CallToAction from "@/components/custom/landing/cta-section"
import FAQsSection from "@/components/custom/landing/faq-section"
import Features from "@/components/custom/landing/features-section"
import FooterSection from "@/components/custom/landing/footer"
import FullFeaturesSection from "@/components/custom/landing/full-features-section"
import HeroSection from "@/components/custom/landing/hero-section"
import IntegrationsSection from "@/components/custom/landing/integration-section"
import LeaderboardsSection from "@/components/custom/landing/leaderboard-section"
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
            <LeaderboardsSection />
            <FullFeaturesSection />
            <FAQsSection />
            <CallToAction />
            <FooterSection />
        </div>
    )
}

export default Landing