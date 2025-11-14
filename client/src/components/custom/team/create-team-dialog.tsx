// components/teams/CreateTeamDialog.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CreateTeamDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    team?: any; // For edit mode
}

export function CreateTeamDialog({ open, onOpenChange, team }: CreateTeamDialogProps) {
    const [formData, setFormData] = useState({
        name: team?.name || '',
        description: team?.description || '',
        privacy: team?.privacy || 'public',
        type: team?.type || 'public',
        maxMembers: team?.maxMembers || 50,
    });

    const isFormValid = formData.name.trim().length > 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Handle create/update logic here
        console.log('Team data:', formData);
        onOpenChange(false);

        // Show success message
        alert(team ? 'Team updated successfully!' : 'Team created successfully!');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{team ? 'Edit Team' : 'Create New Team'}</DialogTitle>
                    <DialogDescription>
                        {team ? 'Update your team information' : 'Create a new team to collaborate with others'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Team Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Team Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter team name"
                            maxLength={50}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief description or motto of your team"
                            rows={3}
                            maxLength={200}
                        />
                    </div>

                    {/* Privacy Setting */}
                    <div className="space-y-3">
                        <Label>Privacy Setting</Label>
                        <RadioGroup
                            value={formData.privacy}
                            onValueChange={(value: 'public' | 'private') =>
                                setFormData({ ...formData, privacy: value })
                            }
                            className="flex flex-col space-y-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="public" id="public" />
                                <Label htmlFor="public" className="font-normal cursor-pointer">
                                    <div className="font-medium text-foreground">Public</div>
                                    <div className="text-sm text-muted-foreground">Anyone can join directly</div>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="private" id="private" />
                                <Label htmlFor="private" className="font-normal cursor-pointer">
                                    <div className="font-medium text-foreground">Private</div>
                                    <div className="text-sm text-muted-foreground">Join by invite or request approval</div>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Team Type */}
                    <div className="space-y-2">
                        <Label htmlFor="type">Team Type</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value: string) => setFormData({ ...formData, type: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select team type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">Public Group</SelectItem>
                                <SelectItem value="college">College Team</SelectItem>
                                <SelectItem value="study">Study Group</SelectItem>
                                <SelectItem value="professional">Professional</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Max Members */}
                    <div className="space-y-2">
                        <Label htmlFor="maxMembers">Maximum Members</Label>
                        <Select
                            value={formData.maxMembers.toString()}
                            onValueChange={(value) => setFormData({ ...formData, maxMembers: parseInt(value) })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select maximum members" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10 members</SelectItem>
                                <SelectItem value="25">25 members</SelectItem>
                                <SelectItem value="50">50 members</SelectItem>
                                <SelectItem value="100">100 members</SelectItem>
                                <SelectItem value="250">250 members</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={!isFormValid}
                        >
                            {team ? 'Save Changes' : 'Create Team'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}