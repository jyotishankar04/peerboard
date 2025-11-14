// src/components/custom/achievements-grid.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface AchievementsGridProps {
    achievements: React.ReactNode[];
    title?: string;
    description?: string;
    showFilters?: boolean;
}

export const AchievementsGrid = ({
    achievements,
    title = "Achievements & Badges",
    description = "Milestones and accomplishments you've earned",
    showFilters = true
}: AchievementsGridProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredAchievements = achievements.filter((achievement) => {
        // Since we're dealing with React components, we'll filter based on props if needed
        // This is a simplified filter - you might want to implement more sophisticated filtering
        return true; // Remove this and implement actual filtering logic
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    {showFilters && (
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Search achievements..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full sm:w-48"
                                />
                            </div>
                            <div className="space-y-2">
                                <Select value={filter} onValueChange={setFilter}>
                                    <SelectTrigger className="w-full sm:w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="bronze">Bronze</SelectItem>
                                        <SelectItem value="silver">Silver</SelectItem>
                                        <SelectItem value="gold">Gold</SelectItem>
                                        <SelectItem value="platinum">Platinum</SelectItem>
                                        <SelectItem value="special">Special</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredAchievements.length > 0 ? (
                        filteredAchievements
                    ) : (
                        <div className="col-span-full text-center py-8 text-muted-foreground">
                            No achievements found matching your criteria
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};