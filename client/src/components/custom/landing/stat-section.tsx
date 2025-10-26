export default function StatsSection() {
    return (
        <section className="py-12 md:py-20 ">
            <div className="mx-auto max-w-6xl space-y-12 px-6">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        Loved by{' '}
                        <span className="text-primary">
                            5000+ Developers
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From 50+ colleges and coding clubs across the country. Join the community transforming how developers learn and compete.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="text-center space-y-3 p-6 rounded-lg bg-background border">
                        <div className="text-3xl md:text-4xl font-bold text-primary">5000+</div>
                        <div className="font-semibold">Active Users</div>
                        <p className="text-sm text-muted-foreground">From 50+ institutions</p>
                    </div>
                    <div className="text-center space-y-3 p-6 rounded-lg bg-background border">
                        <div className="text-3xl md:text-4xl font-bold text-primary">100+</div>
                        <div className="font-semibold">Teams & Clubs</div>
                        <p className="text-sm text-muted-foreground">Active collaborations</p>
                    </div>
                    <div className="text-center space-y-3 p-6 rounded-lg bg-background border">
                        <div className="text-3xl md:text-4xl font-bold text-primary">50K+</div>
                        <div className="font-semibold">Problems Solved</div>
                        <p className="text-sm text-muted-foreground">And counting</p>
                    </div>
                </div>
            </div>
        </section>
    )
}