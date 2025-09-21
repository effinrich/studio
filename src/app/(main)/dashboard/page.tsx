import { getTenants, getPayments, getIssues } from "@/lib/data";
import { leaseExpirationNotification } from "@/ai/flows/lease-expiration-notification";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CircleDollarSign, AlertTriangle, Bell, CalendarClock } from "lucide-react";
import { differenceInDays, parseISO, format } from 'date-fns';

async function LeaseAlerts() {
    const tenants = await getTenants();
    const today = new Date();
    const upcomingExpirations = tenants.filter(tenant => {
        const endDate = parseISO(tenant.leaseEndDate);
        const daysUntil = differenceInDays(endDate, today);
        return daysUntil >= 0 && daysUntil <= 90;
    });

    if (upcomingExpirations.length === 0) {
        return <p className="text-sm text-muted-foreground">No upcoming lease expirations in the next 90 days.</p>
    }

    const notifications = await Promise.all(upcomingExpirations.map(async tenant => {
        const endDate = parseISO(tenant.leaseEndDate);
        const daysUntil = differenceInDays(endDate, today);
        const notification = await leaseExpirationNotification({
            tenantName: tenant.name,
            propertyName: 'Property', // Replace with actual property name if available
            leaseExpirationDate: tenant.leaseEndDate,
            currentDate: format(today, 'yyyy-MM-dd'),
            daysUntilExpiration: daysUntil
        });
        return { ...notification, tenant };
    }));

    const urgencyVariantMap = {
        high: 'destructive',
        medium: 'secondary',
        low: 'default'
    } as const;

    return (
        <div className="space-y-4">
            {notifications.sort((a,b) => differenceInDays(parseISO(a.tenant.leaseEndDate), parseISO(b.tenant.leaseEndDate))).map((n, i) => (
                <div key={i} className="flex items-start gap-4">
                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <CalendarClock className="h-4 w-4 text-muted-foreground"/>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">{n.notificationMessage}</p>
                        <p className="text-xs text-muted-foreground">Expires on {format(parseISO(n.tenant.leaseEndDate), 'MMMM d, yyyy')}</p>
                    </div>
                    <Badge variant={urgencyVariantMap[n.urgency]}>{n.urgency}</Badge>
                </div>
            ))}
        </div>
    );
}

export default async function DashboardPage() {
    const tenants = await getTenants();
    const payments = await getPayments();
    const issues = await getIssues();

    const overduePayments = payments.filter(p => !p.paidDate && differenceInDays(new Date(), parseISO(p.dueDate)) > 0).length;
    const openIssues = issues.filter(i => i.status === 'Open').length;

    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-semibold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tenants.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rent Overdue</CardTitle>
                        <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{overduePayments}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{openIssues}</div>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        <span>Lease Expiration Alerts</span>
                    </CardTitle>
                    <CardDescription>
                        Notifications for leases expiring within the next 90 days.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LeaseAlerts />
                </CardContent>
            </Card>
        </div>
    )
}
