
'use client';

import { useState } from 'react';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { properties, tenants, payments, issues } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const { toast } = useToast();

  const seedDatabase = async () => {
    setLoading(true);
    try {
      const batch = writeBatch(db);

      // Seed Properties
      const propertyIds = properties.map((_, index) => `prop-${index + 1}`);
      properties.forEach((prop, index) => {
        const propRef = doc(db, 'properties', propertyIds[index]);
        batch.set(propRef, prop);
      });

      // Seed Tenants
      const tenantIds = tenants.map((_, index) => `tenant-${index + 1}`);
      tenants.forEach((tenant, index) => {
        const tenantRef = doc(db, 'tenants', tenantIds[index]);
        batch.set(tenantRef, tenant);
      });
      
      // Seed Payments
      const paymentIds = payments.map((_, index) => `pay-${index + 1}`);
      payments.forEach((payment, index) => {
        const paymentRef = doc(db, 'payments', paymentIds[index]);
        batch.set(paymentRef, payment);
      });

      // Seed Issues
      const issueIds = issues.map((_, index) => `issue-${index + 1}`);
      issues.forEach((issue, index) => {
        const issueRef = doc(db, 'issues', issueIds[index]);
        batch.set(issueRef, issue);
      });

      await batch.commit();

      setSeeded(true);
      toast({
        title: 'Database Seeded!',
        description: 'Your Firestore database has been populated with mock data.',
      });
    } catch (error) {
      console.error("Error seeding database: ", error);
      toast({
        variant: 'destructive',
        title: 'Error Seeding Database',
        description: 'Could not seed the database. Check the console for more information.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Seed Firestore Database</CardTitle>
          <CardDescription>
            Populate your Cloud Firestore database with the initial set of mock data. This will overwrite any existing data in the 'properties', 'tenants', 'payments', and 'issues' collections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {seeded ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-green-50 p-6 text-green-700 dark:bg-green-950 dark:text-green-300">
              <CheckCircle className="h-10 w-10" />
              <p className="font-medium">Database successfully seeded!</p>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-yellow-50 p-6 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400">
                <AlertTriangle className="h-10 w-10" />
                <p className="text-center font-medium">Warning: This is a destructive action and cannot be undone.</p>
            </div>
          )}
        </CardContent>
        <CardContent>
          <Button onClick={seedDatabase} disabled={loading || seeded} className="w-full">
            {loading ? 'Seeding...' : 'Seed Database'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
