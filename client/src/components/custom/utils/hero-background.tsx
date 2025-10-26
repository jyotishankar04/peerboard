<div className="min-h-screen w-full bg-[#f9fafb] relative">
    {/* Diagonal Fade Center Grid Background */}
    <div
        className="absolute inset-0 z-0"
        style={{
            backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
            maskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
    />
    {/* Your Content/Components */}
</div>