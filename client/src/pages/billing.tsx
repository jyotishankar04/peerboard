// src/pages/billing.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BillingPage = () => {
    const [autoRenewal, setAutoRenewal] = useState(true);
    const [billingReminders, setBillingReminders] = useState(true);
    const [promoCode, setPromoCode] = useState("");

    // Mock data
    const currentSubscription = {
        tier: "Premium",
        cycle: "Monthly",
        nextBillingDate: "2024-02-15",
        amount: 9.99,
        currency: "USD"
    };

    const paymentMethods = [
        { id: 1, type: "card", last4: "4242", brand: "Visa", expiry: "12/24", isDefault: true },
        { id: 2, type: "paypal", email: "user@example.com", isDefault: false }
    ];

    const invoices = [
        { id: "INV-001", date: "2024-01-15", amount: 9.99, status: "paid" },
        { id: "INV-002", date: "2023-12-15", amount: 9.99, status: "paid" },
        { id: "INV-003", date: "2023-11-15", amount: 9.99, status: "paid" },
        { id: "INV-004", date: "2023-10-15", amount: 9.99, status: "failed" }
    ];

    const planFeatures = [
        "Up to 10 platforms linked",
        "Advanced analytics & insights",
        "Team collaboration features",
        "Priority email support",
        "Custom notification settings",
        "Export data to PDF/Excel"
    ];

    const activePromotions = [
        { code: "WELCOME10", description: "10% off first 3 months", validUntil: "2024-03-31" }
    ];

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            paid: "default",
            failed: "destructive",
            pending: "secondary"
        } as const;

        return (
            <Badge variant={variants[status as keyof typeof variants]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const handleApplyPromo = () => {
        // Handle promo code application
        console.log("Applying promo code:", promoCode);
        setPromoCode("");
    };

    return (
        <div className="w-full max-w-6xl p-6 space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
                <p className="text-muted-foreground">
                    Manage your subscription, payment methods, and billing history
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Current Subscription & Plan Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Current Subscription */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Subscription</CardTitle>
                            <CardDescription>
                                Your active plan and billing information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="text-2xl font-bold">{currentSubscription.tier} Plan</div>
                                    <div className="text-muted-foreground">
                                        {formatCurrency(currentSubscription.amount, currentSubscription.currency)} per {currentSubscription.cycle.toLowerCase()}
                                    </div>
                                </div>
                                <Badge variant="secondary" className="w-fit">
                                    {currentSubscription.cycle}
                                </Badge>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-medium">Next Billing Date</div>
                                    <div className="text-muted-foreground">
                                        {formatDate(currentSubscription.nextBillingDate)}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-medium">Billing Amount</div>
                                    <div className="text-muted-foreground">
                                        {formatCurrency(currentSubscription.amount, currentSubscription.currency)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button className="sm:flex-1">Upgrade Plan</Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="sm:flex-1">
                                            Cancel Subscription
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Cancel Subscription</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to cancel your subscription? This action cannot be undone.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <Alert variant="destructive">
                                                <AlertDescription>
                                                    Upon cancellation, you will lose access to premium features at the end of your current billing period.
                                                </AlertDescription>
                                            </Alert>
                                            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                                <li>Advanced analytics will be disabled</li>
                                                <li>Team collaboration features will be restricted</li>
                                                <li>Platform linking limit will be reduced to 3</li>
                                                <li>Export functionality will be limited</li>
                                            </ul>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline">Keep Subscription</Button>
                                            <Button variant="destructive">Cancel Subscription</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Plan Details & Features */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Plan Features</CardTitle>
                            <CardDescription>
                                Benefits included in your current plan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {planFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="shrink-0 w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" className="sm:flex-1">
                                    Compare Plans
                                </Button>
                                <Button variant="outline" className="sm:flex-1">
                                    View FAQ
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Billing History */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing History</CardTitle>
                            <CardDescription>
                                Your recent invoices and payment history
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <Input
                                        placeholder="Search invoices..."
                                        className="sm:max-w-xs"
                                    />
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            This Year
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            All Status
                                        </Button>
                                    </div>
                                </div>

                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Invoice</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {invoices.map((invoice) => (
                                                <TableRow key={invoice.id}>
                                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                                    <TableCell>{formatDate(invoice.date)}</TableCell>
                                                    <TableCell>{formatCurrency(invoice.amount, currentSubscription.currency)}</TableCell>
                                                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm">
                                                            Download
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Payment Methods & Settings */}
                <div className="space-y-6">
                    {/* Payment Methods */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>
                                Your saved payment methods
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {paymentMethods.map((method) => (
                                <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        {method.type === 'card' ? (
                                            <>
                                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                                    <span className="text-xs font-medium">💳</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{method.brand} •••• {method.last4}</div>
                                                    <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                                    <span className="text-xs font-medium">🔵</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium">PayPal</div>
                                                    <div className="text-sm text-muted-foreground">{method.email}</div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {method.isDefault && (
                                        <Badge variant="secondary">Default</Badge>
                                    )}
                                </div>
                            ))}

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        Add Payment Method
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add Payment Method</DialogTitle>
                                        <DialogDescription>
                                            Securely add a new payment method to your account
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <Input id="expiry" placeholder="MM/YY" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvc">CVC</Label>
                                                <Input id="cvc" placeholder="123" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name on Card</Label>
                                            <Input id="name" placeholder="John Doe" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button>Add Payment Method</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    {/* Promotions & Coupons */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Promotions & Credits</CardTitle>
                            <CardDescription>
                                Apply promo codes and manage credits
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex space-x-2">
                                <Input
                                    placeholder="Enter promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <Button onClick={handleApplyPromo}>Apply</Button>
                            </div>

                            {activePromotions.length > 0 && (
                                <div className="space-y-2">
                                    <Label>Active Promotions</Label>
                                    {activePromotions.map((promo, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 rounded">
                                            <div>
                                                <div className="font-medium">{promo.code}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {promo.description} • Valid until {formatDate(promo.validUntil)}
                                                </div>
                                            </div>
                                            <Badge variant="secondary">Active</Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Auto-Renewal & Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing Preferences</CardTitle>
                            <CardDescription>
                                Manage your subscription settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="auto-renewal">Auto-Renewal</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Automatically renew subscription
                                    </div>
                                </div>
                                <Switch
                                    id="auto-renewal"
                                    checked={autoRenewal}
                                    onCheckedChange={setAutoRenewal}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="billing-reminders">Billing Reminders</Label>
                                    <div className="text-sm text-muted-foreground">
                                        Receive reminders before charges
                                    </div>
                                </div>
                                <Switch
                                    id="billing-reminders"
                                    checked={billingReminders}
                                    onCheckedChange={setBillingReminders}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security & Compliance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Security & Support</CardTitle>
                            <CardDescription>
                                Your billing security and support options
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm space-y-2">
                                <p className="text-muted-foreground">
                                    All payments are securely processed and PCI DSS compliant.
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <span>🔒</span>
                                    <span>256-bit SSL encryption</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Button variant="outline" className="w-full" asChild>
                                    <a href="/privacy-policy">Privacy Policy</a>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <a href="/terms-of-service">Terms of Service</a>
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Contact Billing Support
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;