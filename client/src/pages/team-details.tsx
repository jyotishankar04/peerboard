// src/app/teams/[id]/page.tsx
import TeamDetailPage from '@/components/team-detail-page';

interface PageProps {
    params: {
        id: string;
    };
}

// Mock data - in a real app, this would come from an API
const userTeams = [
    {
        id: 1,
        name: "Algorithm Masters",
        description: "Competitive programming enthusiasts focused on algorithms and data structures",
        avatar: "",
        members: 12,
        maxMembers: 15,
        problemsSolved: 1250,
        teamRank: 1,
        lastActivity: "2 hours ago",
        isPublic: true,
        role: "admin",
        joinDate: "2024-01-15",
        activityLevel: "high" as const,
        focusAreas: ["Algorithms", "Data Structures", "DP"],
        upcomingEvents: [
            { name: "Weekly Contest", date: "2024-02-15" },
            { name: "Team Study Session", date: "2024-02-16" }
        ]
    },
    {
        id: 2,
        name: "Code Warriors",
        description: "Weekly coding challenges and collaborative learning",
        avatar: "",
        members: 8,
        maxMembers: 10,
        problemsSolved: 980,
        teamRank: 3,
        lastActivity: "1 day ago",
        isPublic: true,
        role: "member",
        joinDate: "2024-01-20",
        activityLevel: "medium" as const,
        focusAreas: ["Web Development", "JavaScript"],
        upcomingEvents: []
    },
    {
        id: 3,
        name: "Stanford CS Group",
        description: "Stanford University computer science students",
        avatar: "",
        members: 25,
        maxMembers: 50,
        problemsSolved: 3200,
        teamRank: 2,
        lastActivity: "5 minutes ago",
        isPublic: false,
        role: "member",
        joinDate: "2024-01-10",
        activityLevel: "high" as const,
        focusAreas: ["CS Fundamentals", "Research"],
        upcomingEvents: [
            { name: "Midterm Study", date: "2024-02-20" }
        ]
    }
];

export default function TeamPage({ params }: PageProps) {
    const teamId = parseInt(params.id);
    const team = userTeams.find(t => t.id === teamId);

    if (!team) {
        return (
            <div className="w-full max-w-7xl p-6 text-center">
                <h1 className="text-2xl font-bold text-card-foreground">Team not found</h1>
                <p className="text-muted-foreground mt-2">The team you're looking for doesn't exist.</p>
            </div>
        );
    }

    return <TeamDetailPage team={team} />;
}