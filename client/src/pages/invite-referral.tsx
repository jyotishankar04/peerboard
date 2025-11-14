// components/referral/InviteReferralPage.tsx
import  { useState } from 'react';
import { Copy, Share2, Mail, Twitter, Linkedin, MessageCircle, Gift, Users, Star, HelpCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const mockReferrals = [
    { id: '1', email: 'friend1@example.com', status: 'accepted', joinedAt: new Date('2024-01-15'), rewardEarned: true },
    { id: '2', email: 'friend2@example.com', status: 'pending', rewardEarned: false },
    { id: '3', email: 'friend3@example.com', status: 'joined', joinedAt: new Date('2024-01-20'), rewardEarned: true },
];

export function InviteReferralPage() {
    const [emails, setEmails] = useState(['']);
    const [copied, setCopied] = useState(false);

    const referralLink = 'https://peerboard.com/join?ref=ABC123XYZ';
    const earnedRewards = 2; // months of premium
    const pendingInvites = mockReferrals.filter(r => r.status === 'pending').length;

    const addEmailField = () => {
        setEmails(prev => [...prev, '']);
    };

    const updateEmail = (index: number, value: string) => {
        setEmails(prev => prev.map((email, i) => i === index ? value : email));
    };

    const removeEmailField = (index: number) => {
        setEmails(prev => prev.filter((_, i) => i !== index));
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const shareOnSocial = (platform: string) => {
        const text = `Join me on Peer Board - the best platform for coding practice and contests! Use my referral link: ${referralLink}`;
        const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`
        };

        window.open(urls[platform as keyof typeof urls], '_blank');
    };

    const sendEmailInvites = () => {
        const validEmails = emails.filter(email => email.includes('@'));
        console.log('Sending invites to:', validEmails);
        // Implement email sending logic here
        alert(`Invites sent to ${validEmails.length} friends!`);
        setEmails(['']);
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <Gift className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-foreground">Invite Friends & Earn Rewards</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Grow the Peer Board community and unlock premium features with every successful referral!
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Referral Stats */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Rewards Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                Your Rewards
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center p-4 bg-primary/10 rounded-lg">
                                <div className="text-3xl font-bold text-primary">{earnedRewards}</div>
                                <div className="text-sm text-muted-foreground">Months of Premium Earned</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="p-3 bg-muted rounded-lg">
                                    <div className="text-xl font-bold text-foreground">{mockReferrals.length}</div>
                                    <div className="text-xs text-muted-foreground">Total Invites</div>
                                </div>
                                <div className="p-3 bg-muted rounded-lg">
                                    <div className="text-xl font-bold text-foreground">{pendingInvites}</div>
                                    <div className="text-xs text-muted-foreground">Pending</div>
                                </div>
                            </div>

                            <Progress value={(earnedRewards / 5) * 100} className="h-2" />
                            <div className="text-xs text-muted-foreground text-center">
                                {5 - earnedRewards} more referrals needed for annual premium
                            </div>
                        </CardContent>
                    </Card>

                    {/* How It Works */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="w-5 h-5" />
                                How It Works
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Badge variant="secondary" className="mt-1">1</Badge>
                                <div>
                                    <div className="font-medium">Share your referral link</div>
                                    <div className="text-sm text-muted-foreground">Send to friends via email or social media</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Badge variant="secondary" className="mt-1">2</Badge>
                                <div>
                                    <div className="font-medium">Friends join Peer Board</div>
                                    <div className="text-sm text-muted-foreground">They sign up using your referral link</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Badge variant="secondary" className="mt-1">3</Badge>
                                <div>
                                    <div className="font-medium">Earn rewards</div>
                                    <div className="text-sm text-muted-foreground">Get 1 month premium for each friend who joins</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Invitation Methods */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="link" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="link" className="flex items-center gap-2">
                                <Share2 className="w-4 h-4" />
                                Referral Link
                            </TabsTrigger>
                            <TabsTrigger value="email" className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Invites
                            </TabsTrigger>
                            <TabsTrigger value="social" className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Social Share
                            </TabsTrigger>
                        </TabsList>

                        {/* Referral Link Tab */}
                        <TabsContent value="link">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Referral Link</CardTitle>
                                    <CardDescription>
                                        Share this link with friends to earn rewards when they join
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            value={referralLink}
                                            readOnly
                                            className="font-mono text-sm"
                                        />
                                        <Button onClick={copyToClipboard} className="shrink-0">
                                            {copied ? (
                                                <>
                                                    <Check className="w-4 h-4 mr-2" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4 mr-2" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Quick Share</h4>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => shareOnSocial('twitter')}>
                                                <Twitter className="w-4 h-4 mr-2" />
                                                Twitter
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => shareOnSocial('linkedin')}>
                                                <Linkedin className="w-4 h-4 mr-2" />
                                                LinkedIn
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => shareOnSocial('whatsapp')}>
                                                <MessageCircle className="w-4 h-4 mr-2" />
                                                WhatsApp
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Email Invites Tab */}
                        <TabsContent value="email">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Invite by Email</CardTitle>
                                    <CardDescription>
                                        Send personalized invitations to your friends via email
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {emails.map((email, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                type="email"
                                                placeholder="friend@example.com"
                                                value={email}
                                                onChange={(e) => updateEmail(index, e.target.value)}
                                                className="flex-1"
                                            />
                                            {emails.length > 1 && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => removeEmailField(index)}
                                                    className="shrink-0"
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    ))}

                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={addEmailField}>
                                            Add Another Email
                                        </Button>
                                        <Button onClick={sendEmailInvites} className="flex-1">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Send Invites
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Social Share Tab */}
                        <TabsContent value="social">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Share on Social Media</CardTitle>
                                    <CardDescription>
                                        Spread the word about Peer Board on your social networks
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <Button
                                            variant="outline"
                                            className="h-20 flex-col"
                                            onClick={() => shareOnSocial('twitter')}
                                        >
                                            <Twitter className="w-6 h-6 mb-2" />
                                            Twitter
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-20 flex-col"
                                            onClick={() => shareOnSocial('linkedin')}
                                        >
                                            <Linkedin className="w-6 h-6 mb-2" />
                                            LinkedIn
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-20 flex-col"
                                            onClick={() => shareOnSocial('whatsapp')}
                                        >
                                            <MessageCircle className="w-6 h-6 mb-2" />
                                            WhatsApp
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-20 flex-col"
                                            onClick={() => {
                                                const text = `Join me on Peer Board! ${referralLink}`;
                                                window.open(`mailto:?subject=Join me on Peer Board&body=${encodeURIComponent(text)}`);
                                            }}
                                        >
                                            <Mail className="w-6 h-6 mb-2" />
                                            Email
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Referral Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Referral Status</CardTitle>
                            <CardDescription>
                                Track your invited friends and earned rewards
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockReferrals.map((referral) => (
                                    <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${referral.status === 'accepted' ? 'bg-green-500' :
                                                    referral.status === 'joined' ? 'bg-blue-500' : 'bg-yellow-500'
                                                }`} />
                                            <div>
                                                <div className="font-medium">{referral.email}</div>
                                                <div className="text-sm text-muted-foreground capitalize">
                                                    {referral.status} {referral.joinedAt && `• ${referral.joinedAt.toLocaleDateString()}`}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {referral.rewardEarned && (
                                                <Badge variant="default">
                                                    <Star className="w-3 h-3 mr-1" />
                                                    Reward Earned
                                                </Badge>
                                            )}
                                            <Badge variant={
                                                referral.status === 'accepted' ? 'default' :
                                                    referral.status === 'joined' ? 'secondary' : 'outline'
                                            }>
                                                {referral.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* FAQ Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>How do I earn referral rewards?</AccordionTrigger>
                                    <AccordionContent>
                                        You earn 1 month of premium access for each friend who signs up using your referral link and becomes an active user.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>When will I receive my rewards?</AccordionTrigger>
                                    <AccordionContent>
                                        Rewards are applied immediately after your friend becomes an active user (completes their profile and solves their first problem).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Is there a limit to how many people I can refer?</AccordionTrigger>
                                    <AccordionContent>
                                        No! You can refer unlimited friends. Earn up to 12 months of premium access through referrals.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>What counts as an active user?</AccordionTrigger>
                                    <AccordionContent>
                                        An active user is someone who has completed their profile and solved at least one coding problem on the platform.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}