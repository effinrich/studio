'use server';

/**
 * @fileOverview This file defines a Genkit flow for highlighting late rent payments
 * and suggesting whether to send a reminder message to the tenant.
 *
 * - `highlightLatePayment` -  A function that determines if a rent payment is late and suggests sending a reminder.
 */

import {ai} from '@/ai/genkit';
import type {
  HighlightLatePaymentInput,
  HighlightLatePaymentOutput,
} from './rent-tracker-late-payments-batch';
import {
  HighlightLatePaymentInputSchema,
  HighlightLatePaymentOutputSchema,
} from './rent-tracker-late-payments-batch';

export async function highlightLatePayment(
  input: HighlightLatePaymentInput
): Promise<HighlightLatePaymentOutput> {
  return highlightLatePaymentFlow(input);
}

const highlightLatePaymentPrompt = ai.definePrompt({
  name: 'highlightLatePaymentPrompt',
  input: {schema: HighlightLatePaymentInputSchema},
  output: {schema: HighlightLatePaymentOutputSchema},
  prompt: `You are a helpful assistant for landlords, helping them manage rent payments.

You are provided with the due date, payment date (if any), rent amount, tenant name, and property name.

Determine if the rent payment is late. If it is, calculate how many days late it is.

Based on the number of days late, tenant name, and property name, suggest whether a reminder message should be sent to the tenant.  Consider whether the tenant has a history of late payments and be more lenient if the tenant is usually punctual.

Payment Due Date: {{{paymentDueDate}}}
Payment Date: {{#if paymentDate}}{{{paymentDate}}}{{else}}Not Paid{{/if}}
Rent Amount: {{{rentAmount}}}
Tenant Name: {{{tenantName}}}
Property Name: {{{propertyName}}}

Output should be in JSON format.
`,
});

const highlightLatePaymentFlow = ai.defineFlow(
  {
    name: 'highlightLatePaymentFlow',
    inputSchema: HighlightLatePaymentInputSchema,
    outputSchema: HighlightLatePaymentOutputSchema,
  },
  async input => {
    const now = new Date();
    const dueDate = new Date(input.paymentDueDate);

    let isLate = false;
    let daysLate: number | undefined = undefined;

    if (!input.paymentDate) {
      if (dueDate < now) {
        isLate = true;
        daysLate = Math.floor(
          (now.getTime() - dueDate.getTime()) / (1000 * 3600 * 24)
        );
      }
    } else {
      const paymentDate = new Date(input.paymentDate);
      if (dueDate < paymentDate) {
        isLate = true;
        daysLate = Math.floor(
          (paymentDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24)
        );
      }
    }

    if (!isLate) {
      return {
        isLate: false,
        suggestReminder: false,
        reason: 'Payment is not late.',
      };
    }

    const {output} = await highlightLatePaymentPrompt({
      ...input,
    });
    return {...output!, isLate, daysLate};
  }
);
