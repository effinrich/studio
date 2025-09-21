import { getPayments, getTenants, getProperties } from '@/lib/data';
import { RentTrackerTable } from './_components/rent-tracker-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { differenceInDays, parseISO } from 'date-fns';

export default async function RentTrackerPage() {
  const payments = await getPayments();
  const tenants = await getTenants();
  const properties = await getProperties();

  const enrichedPayments = payments.map(payment => {
    const tenant = tenants.find(t => t.id === payment.tenantId);
    const property = properties.find(p => p.id === payment.propertyId);
    const isLate = !payment.paidDate && differenceInDays(new Date(), parseISO(payment.dueDate)) > 0;
    const daysLate = isLate ? differenceInDays(new Date(), parseISO(payment.dueDate)) : 0;

    return {
      ...payment,
      tenantName: tenant?.name || 'N/A',
      avatarUrl: tenant?.avatarUrl || '',
      propertyName: property?.name || 'N/A',
      latePaymentInfo: {
        isLate,
        daysLate,
        suggestReminder: isLate,
        reason: isLate ? 'Payment is overdue.' : 'Payment is on time.',
      },
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-semibold">Rent Tracker</h1>
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Log and track all tenant rent payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <RentTrackerTable data={enrichedPayments} />
        </CardContent>
      </Card>
    </div>
  );
}
