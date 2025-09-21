'use server';

/**
 * @fileOverview This file defines a Genkit flow for highlighting late rent payments
 * in a batch and suggesting whether to send reminder messages to the tenants.
 *
 * - `highlightLatePaymentsBatch` - A function that determines if rent payments are late and suggests sending reminders.
 * - `HighlightLatePaymentsBatchInput` - The input type for the `highlightLatePaymentsBatch` function.
 * - `HighlightLatePaymentsBatchOutput` - The return type for the `highlightLatePaymentsBatch` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { HighlightLatePaymentInput, highlightLatePayment } from './rent-tracker-late-payments';

const HighlightLatePaymentBatchResultSchema = z.object({
  isLate: z.boolean().describe('Whether the rent payment is late.'),
  daysLate: z.number().optional().describe('The number of days the rent is late, only if late.'),
  suggestReminder: z.boolean().describe('Whether a reminder message should be sent to the tenant.'),
  reason: z.string().describe('The reason for the suggestion.'),
});

const HighlightLatePaymentsBatchInputSchema = z.array(HighlightLatePaymentInput);
export type HighlightLatePaymentsBatchInput = z.infer<typeof HighlightLatePaymentsBatchInputSchema>;

const HighlightLatePaymentsBatchOutputSchema = z.object({
    results: z.array(HighlightLatePaymentBatchResultSchema),
});
export type HighlightLatePaymentsBatchOutput = z.infer<typeof HighlightLatePaymentsBatchOutputSchema>;

export async function highlightLatePaymentsBatch(input: HighlightLatePaymentsBatchInput): Promise<HighlightLatePaymentsBatchOutput> {
  return highlightLatePaymentsBatchFlow(input);
}

const highlightLatePaymentsBatchFlow = ai.defineFlow(
  {
    name: 'highlightLatePaymentsBatchFlow',
    inputSchema: HighlightLatePaymentsBatchInputSchema,
    outputSchema: HighlightLatePaymentsBatchOutputSchema,
  },
  async (payments) => {
    const results = await Promise.all(
      payments.map((payment) => highlightLatePayment(payment))
    );
    return { results };
  }
);
