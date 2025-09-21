import { getPayments, getTenants, getProperties } from '@/lib/data';
import { RentTrackerTable } from './_components/rent-tracker-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { highlightLatePaymentsBatch } from '@/ai/flows/rent-tracker-late-payments-batch';
import type { Payment } from '@/lib/types';

export default async function RentTrackerPage() {
  const payments = await getPayments();
  const tenants = await getTenants();
  const properties = await getProperties();

  const paymentsWithTenantAndProperty = payments.map(payment => {
    const tenant = tenants.find(t => t.id === payment.tenantId);
    const property = properties.find(p => p.id === payment.propertyId);
    return {
      ...payment,
      tenantName: tenant?.name || 'N/A',
      avatarUrl: tenant?.avatarUrl || '',
      propertyName: property?.name || 'N/A',
    };
  });
  
  const latePaymentInfo = await highlightLatePaymentsBatch(paymentsWithTenantAndProperty as (Payment & {tenantName: string, propertyName: string})[]);

  const enrichedPayments = paymentsWithTenantAndProperty.map((payment, index) => {
    return {
      ...payment,
      latePaymentInfo: latePaymentInfo.results[index],
    }
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
