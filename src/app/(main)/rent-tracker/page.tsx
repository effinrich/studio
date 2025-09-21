import { getPayments, getTenants, getProperties } from '@/lib/data';
import { RentTrackerTable } from './_components/rent-tracker-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { highlightLatePayment } from '@/ai/flows/rent-tracker-late-payments';

export default async function RentTrackerPage() {
  const payments = await getPayments();
  const tenants = await getTenants();
  const properties = await getProperties();

  const enrichedPayments = await Promise.all(
    payments.map(async (payment) => {
      const tenant = tenants.find(t => t.id === payment.tenantId);
      const property = properties.find(p => p.id === payment.propertyId);

      if (!tenant || !property) return null;

      const latePaymentInfo = await highlightLatePayment({
        paymentDueDate: payment.dueDate,
        paymentDate: payment.paidDate,
        rentAmount: payment.amount,
        tenantName: tenant.name,
        propertyName: property.name,
      });

      return {
        ...payment,
        tenantName: tenant.name,
        avatarUrl: tenant.avatarUrl,
        propertyName: property.name,
        latePaymentInfo,
      };
    })
  );
  
  const validPayments = enrichedPayments.filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-semibold">Rent Tracker</h1>
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Log and track all tenant rent payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <RentTrackerTable data={validPayments} />
        </CardContent>
      </Card>
    </div>
  );
}
