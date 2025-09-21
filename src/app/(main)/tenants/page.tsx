import { getTenants, getProperties } from '@/lib/data';
import { TenantsTable } from './_components/tenants-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function TenantsPage() {
  const tenants = await getTenants();
  const properties = await getProperties();

  const tenantsWithProperties = tenants.map(tenant => {
    const property = properties.find(p => p.id === tenant.propertyId);
    return {
      ...tenant,
      propertyName: property?.name || 'N/A',
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Tenants</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Tenant
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tenant Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <TenantsTable data={tenantsWithProperties} />
        </CardContent>
      </Card>
    </div>
  );
}
