// components/teams/TeamsPage.tsx
import { useState } from 'react';
import { Search, Plus, Users, Building, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CreateTeamDialog } from '@/components/custom/team/create-team-dialog';
import  type { Team } from '@/types/teams';
import { Link } from 'react-router-dom';

const mockTeams: Team[] = [
    {
        id: '1',
        name: 'Code Masters',
        description: 'Solving problems together',
        memberCount: 24,
        problemsSolved: 156,
        privacy: 'public',
        type: 'public',
        isMember: true,
        isAdmin: false,
        createdAt: new Date('2024-01-15'),
    },
    {
        id: '2',
        name: 'MIT Coders',
        description: 'MIT students competitive programming',
        memberCount: 42,
        problemsSolved: 289,
        privacy: 'private',
        type: 'college',
        college: 'MIT',
        isMember: true,
        isAdmin: true,
        createdAt: new Date('2024-02-01'),
    },
];

export function TeamsPage() {
    const [activeTab, setActiveTab] = useState('my-teams');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    const filteredTeams = mockTeams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const myTeams = filteredTeams.filter(team => team.isMember);
    const discoverTeams = filteredTeams.filter(team => !team.isMember);

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Teams & Groups</h1>
                    <p className="text-muted-foreground mt-2">Collaborate and solve problems together</p>
                </div>
                <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Team
                </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="my-teams" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        My Teams
                    </TabsTrigger>
                    <TabsTrigger value="discover" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Discover
                    </TabsTrigger>
                    <TabsTrigger value="college" className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        College
                    </TabsTrigger>
                    <TabsTrigger value="public" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Public
                    </TabsTrigger>
                </TabsList>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search teams by name or interest..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* My Teams Tab */}
                <TabsContent value="my-teams" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myTeams.map((team) => (
                            <TeamCard key={team.id} team={team} isMember={true} />
                        ))}
                    </div>
                    {myTeams.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed rounded-lg">
                            <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground">No teams yet</h3>
                            <p className="text-muted-foreground mt-2">Join or create a team to get started!</p>
                            <Button
                                onClick={() => setShowCreateDialog(true)}
                                className="mt-4"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Create Your First Team
                            </Button>
                        </div>
                    )}
                </TabsContent>

                {/* Discover Tab */}
                <TabsContent value="discover" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {discoverTeams.map((team) => (
                            <TeamCard key={team.id} team={team} isMember={false} />
                        ))}
                    </div>
                </TabsContent>

                {/* College Teams Tab */}
                <TabsContent value="college">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeams
                            .filter(team => team.type === 'college')
                            .map((team) => (
                                <TeamCard key={team.id} team={team} isMember={team.isMember} />
                            ))}
                    </div>
                </TabsContent>

                {/* Public Groups Tab */}
                <TabsContent value="public">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeams
                            .filter(team => team.type === 'public')
                            .map((team) => (
                                <TeamCard key={team.id} team={team} isMember={team.isMember} />
                            ))}
                    </div>
                </TabsContent>
            </Tabs>

            <CreateTeamDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
            />
        </div>
    );
}

interface TeamCardProps {
    team: Team;
    isMember: boolean;
}

function TeamCard({ team, isMember }: TeamCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow group">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12 border-2 border-background group-hover:border-primary/20 transition-colors">
                            <AvatarImage src={team.logo} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {team.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{team.name}</CardTitle>
                            <Badge
                                variant={team.privacy === 'public' ? 'default' : 'secondary'}
                                className="mt-1"
                            >
                                {team.privacy}
                            </Badge>
                        </div>
                    </div>
                </div>
                <CardDescription className="mt-2 line-clamp-2">
                    {team.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{team.memberCount} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-foreground">{team.problemsSolved}</span>
                        <span>solved</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                    <Link to={`/app/teams/${team.id}`}>
                        View Team
                    </Link>
                </Button>
                {isMember ? (
                    <Button variant="destructive" size="sm">
                        Leave
                    </Button>
                ) : (
                    <Button variant="default" size="sm">
                        Join
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}