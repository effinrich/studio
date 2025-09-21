'use client';

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
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, MessageCircle, Send } from 'lucide-react';

export function RentTrackerTable({ data }: { data: any[] }) {
  const { toast } = useToast();

  const handleSendReminder = (tenantName: string) => {
    toast({
      title: 'Reminder Sent!',
      description: `A rent reminder has been sent to ${tenantName}.`,
    });
  };

  const getStatus = (payment: any) => {
    if (payment.paidDate) {
      return {
        text: `Paid on ${format(parseISO(payment.paidDate), 'MMM d, yyyy')}`,
        variant: 'default',
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        className: 'bg-green-500/10 text-green-700 dark:text-green-400',
      };
    }
    if (payment.latePaymentInfo.isLate) {
      return {
        text: `Overdue by ${payment.latePaymentInfo.daysLate} day(s)`,
        variant: 'destructive',
        icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
        className: 'bg-destructive/10 text-destructive',
      };
    }
    return {
      text: 'Upcoming',
      variant: 'secondary',
      icon: <CheckCircle2 className="h-4 w-4 text-muted-foreground" />,
      className: '',
    };
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>AI Suggestion</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((payment) => {
              const status = getStatus(payment);
              return (
                <TableRow key={payment.id} className={cn(payment.latePaymentInfo.isLate && !payment.paidDate && 'bg-destructive/5')}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={payment.avatarUrl} alt={payment.tenantName} data-ai-hint="person portrait"/>
                        <AvatarFallback>
                          {payment.tenantName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{payment.tenantName}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.propertyName}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(payment.amount)}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(payment.dueDate), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant as any} className={cn("gap-1.5", status.className)}>
                        {status.icon}
                        {status.text}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <MessageCircle className="h-4 w-4 shrink-0" />
                       <span className="truncate">{payment.latePaymentInfo.reason}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {payment.latePaymentInfo.suggestReminder && !payment.paidDate && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSendReminder(payment.tenantName)}
                      >
                         <Send className="mr-2 h-4 w-4" />
                        Send Reminder
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No payments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
