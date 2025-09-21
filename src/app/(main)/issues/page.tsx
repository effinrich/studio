import { getIssues, getTenants, getProperties } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export default async function IssuesPage() {
  const issues = await getIssues();
  const tenants = await getTenants();
  const properties = await getProperties();

  const enrichedIssues = issues.map(issue => {
    const tenant = tenants.find(t => t.id === issue.tenantId);
    const property = properties.find(p => p.id === issue.propertyId);
    return {
      ...issue,
      tenantName: tenant?.name || 'N/A',
      avatarUrl: tenant?.avatarUrl || '',
      propertyName: property?.name || 'N/A',
    };
  });

  const priorityVariantMap = {
    High: 'destructive',
    Medium: 'secondary',
    Low: 'outline',
  } as const;

  const statusColorMap = {
    Open: 'bg-blue-500',
    'In Progress': 'bg-yellow-500',
    Resolved: 'bg-green-500',
  }

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Issue Tracker</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Issue
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Requests</CardTitle>
          <CardDescription>Track and manage all tenant-reported issues.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Reported</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrichedIssues.map(issue => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={issue.avatarUrl} alt={issue.tenantName} data-ai-hint="person portrait"/>
                          <AvatarFallback>
                            {issue.tenantName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{issue.tenantName}</div>
                          <div className="text-sm text-muted-foreground">
                            {issue.propertyName}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">{issue.description}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2.5 w-2.5 rounded-full", statusColorMap[issue.status])} />
                        {issue.status}
                      </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={priorityVariantMap[issue.priority]}>{issue.priority}</Badge>
                    </TableCell>
                    <TableCell>{format(parseISO(issue.reportedDate), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
