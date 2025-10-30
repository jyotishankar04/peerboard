// components/custom/achievements/share-achievements.tsx
import React, { useState, useRef } from 'react';
import { Share2, Download, Copy, Check, Twitter, Linkedin, Mail, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Achievement, Milestone } from '@/types/achievements';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

interface ShareAchievementsProps {
    achievements: Achievement[];
    milestones: Milestone[];
}

export function ShareAchievements({ achievements, milestones }: ShareAchievementsProps) {
    const [copied, setCopied] = useState(false);
    const [shareMessage, setShareMessage] = useState('');
    const [activeTab, setActiveTab] = useState('social');
    const cardRef = useRef<HTMLDivElement>(null);

    const earnedAchievements = achievements.filter(a => a.earned);
    const totalPoints = earnedAchievements.reduce((sum, achievement) => sum + achievement.level * 10, 0);
    const rareAchievements = earnedAchievements.filter(a => a.rarity === 'rare' || a.rarity === 'epic' || a.rarity === 'legendary').length;

    const shareableText = `I've unlocked ${earnedAchievements.length} achievements on Peer Board with ${totalPoints} total points! 🏆

Check out my progress:
${earnedAchievements.slice(0, 3).map(a => `• ${a.name} (Level ${a.level})`).join('\n')}

Join me on my coding journey!`;

    const shareableLink = 'https://peerboard.com/profile/achievements?ref=share';

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`${shareMessage || shareableText}\n\n${shareableLink}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const shareOnTwitter = () => {
        const text = encodeURIComponent(shareMessage || shareableText);
        const url = encodeURIComponent(shareableLink);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    };

    const shareOnLinkedIn = () => {
        const text = encodeURIComponent(shareMessage || shareableText);
        const url = encodeURIComponent(shareableLink);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    };

    const shareViaEmail = () => {
        const subject = encodeURIComponent('My Coding Achievements on Peer Board');
        const body = encodeURIComponent(`${shareMessage || shareableText}\n\n${shareableLink}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    const exportAsImage = async () => {
        if (cardRef.current) {
            try {
                const dataUrl = await toPng(cardRef.current, {
                    quality: 0.95,
                    backgroundColor: '#ffffff'
                });

                const link = document.createElement('a');
                link.download = `peerboard-achievements-${new Date().getTime()}.png`;
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error('Failed to export image: ', err);
            }
        }
    };

    const exportAsPDF = async () => {
        if (cardRef.current) {
            try {
                const dataUrl = await toPng(cardRef.current, {
                    quality: 0.95,
                    backgroundColor: '#ffffff'
                });

                const pdf = new jsPDF('portrait', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(dataUrl);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`peerboard-achievements-${new Date().getTime()}.pdf`);
            } catch (err) {
                console.error('Failed to export PDF: ', err);
            }
        }
    };

    const AchievementCardPreview = () => (
        <div ref={cardRef} className="bg-background border rounded-lg p-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">My Coding Achievements</h2>
                <p className="text-muted-foreground">
                    {earnedAchievements.length} badges unlocked • {totalPoints} points
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{earnedAchievements.length}</div>
                    <div className="text-xs text-muted-foreground">Badges</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{rareAchievements}</div>
                    <div className="text-xs text-muted-foreground">Rare</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{totalPoints}</div>
                    <div className="text-xs text-muted-foreground">Points</div>
                </div>
            </div>

            {/* Top Achievements */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3">Top Achievements</h3>
                <div className="space-y-2">
                    {earnedAchievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-3 p-2 border rounded">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                                <div className="font-medium text-sm">{achievement.name}</div>
                                <div className="text-xs text-muted-foreground">Level {achievement.level}</div>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                                {achievement.rarity}
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Milestones */}
            <div>
                <h3 className="font-semibold mb-3">Recent Milestones</h3>
                <div className="space-y-2">
                    {milestones.slice(0, 2).map((milestone) => (
                        <div key={milestone.id} className="flex items-center gap-3 p-2">
                            <div className="text-lg">{milestone.icon}</div>
                            <div className="flex-1">
                                <div className="font-medium text-sm">{milestone.title}</div>
                                <div className="text-xs text-muted-foreground">
                                    {milestone.date.toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t text-center">
                <p className="text-sm text-muted-foreground">
                    Generated from Peer Board • {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Preview Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Achievements Preview</CardTitle>
                    <CardDescription>
                        This is how your achievements will appear when shared
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AchievementCardPreview />
                </CardContent>
            </Card>

            {/* Sharing Options */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="social" className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Social Share
                    </TabsTrigger>
                    <TabsTrigger value="export" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </TabsTrigger>
                    <TabsTrigger value="custom" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Custom Message
                    </TabsTrigger>
                </TabsList>

                {/* Social Share Tab */}
                <TabsContent value="social">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Quick Share</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Share your achievements directly to social media platforms
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <Button variant="outline" className="h-16 flex-col" onClick={shareOnTwitter}>
                                        <Twitter className="w-5 h-5 mb-1 text-blue-400" />
                                        Twitter
                                    </Button>
                                    <Button variant="outline" className="h-16 flex-col" onClick={shareOnLinkedIn}>
                                        <Linkedin className="w-5 h-5 mb-1 text-blue-600" />
                                        LinkedIn
                                    </Button>
                                    <Button variant="outline" className="h-16 flex-col" onClick={shareViaEmail}>
                                        <Mail className="w-5 h-5 mb-1 text-red-500" />
                                        Email
                                    </Button>
                                    <Button variant="outline" className="h-16 flex-col" onClick={copyToClipboard}>
                                        {copied ? (
                                            <Check className="w-5 h-5 mb-1 text-green-500" />
                                        ) : (
                                            <Copy className="w-5 h-5 mb-1" />
                                        )}
                                        {copied ? 'Copied!' : 'Copy Text'}
                                    </Button>
                                </div>

                                <div className="pt-4 border-t">
                                    <Label htmlFor="share-link" className="text-sm font-medium">
                                        Shareable Link
                                    </Label>
                                    <div className="flex gap-2 mt-2">
                                        <Input
                                            id="share-link"
                                            value={shareableLink}
                                            readOnly
                                            className="flex-1"
                                        />
                                        <Button onClick={copyToClipboard}>
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Export Tab */}
                <TabsContent value="export">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Export Achievements</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Download your achievements for resumes, portfolios, or personal tracking
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Button variant="outline" className="h-16 flex-col" onClick={exportAsImage}>
                                        <Image className="w-6 h-6 mb-2" />
                                        Export as Image
                                        <span className="text-xs text-muted-foreground font-normal mt-1">PNG format</span>
                                    </Button>
                                    <Button variant="outline" className="h-16 flex-col" onClick={exportAsPDF}>
                                        <FileText className="w-6 h-6 mb-2" />
                                        Export as PDF
                                        <span className="text-xs text-muted-foreground font-normal mt-1">Document format</span>
                                    </Button>
                                </div>

                                <div className="pt-4 border-t">
                                    <h5 className="font-medium mb-2">Export Options</h5>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p>• High-quality image suitable for social media</p>
                                        <p>• PDF document for professional portfolios</p>
                                        <p>• Includes all your achievements and milestones</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Custom Message Tab */}
                <TabsContent value="custom">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Custom Share Message</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Personalize the message that will be shared with your achievements
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="custom-message">Your Message</Label>
                                    <Textarea
                                        id="custom-message"
                                        placeholder="Share your coding journey with a personalized message..."
                                        value={shareMessage}
                                        onChange={(e) => setShareMessage(e.target.value)}
                                        rows={4}
                                    />
                                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                                        <span>Character count: {shareMessage.length}/280</span>
                                        <Button variant="ghost" size="sm" onClick={() => setShareMessage(shareableText)}>
                                            Use Default
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button onClick={copyToClipboard} className="flex-1">
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2" />
                                                Copied to Clipboard
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 mr-2" />
                                                Copy with Message
                                            </>
                                        )}
                                    </Button>
                                    <Button variant="outline" onClick={shareOnTwitter}>
                                        <Twitter className="w-4 h-4 mr-2" />
                                        Share on Twitter
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Achievement Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Sharing Statistics</CardTitle>
                    <CardDescription>
                        Your achievements at a glance
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-foreground">{earnedAchievements.length}</div>
                            <div className="text-sm text-muted-foreground">Total Badges</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-foreground">{rareAchievements}</div>
                            <div className="text-sm text-muted-foreground">Rare+ Badges</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-foreground">
                                {Math.round((earnedAchievements.length / achievements.length) * 100)}%
                            </div>
                            <div className="text-sm text-muted-foreground">Completion</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-foreground">{milestones.length}</div>
                            <div className="text-sm text-muted-foreground">Milestones</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}