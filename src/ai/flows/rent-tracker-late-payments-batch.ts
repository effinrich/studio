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
import { highlightLatePayment, HighlightLatePaymentInputSchema, type HighlightLatePaymentInput, type HighlightLatePaymentOutput } from './rent-tracker-late-payments';

const HighlightLatePaymentsBatchInputSchema = z.array(HighlightLatePaymentInputSchema);
export type HighlightLatePaymentsBatchInput = z.infer<typeof HighlightLatePaymentsBatchInputSchema>;

const HighlightLatePaymentsBatchOutputSchema = z.object({
    results: z.array(z.custom<HighlightLatePaymentOutput>()),
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
      payments.map((payment) => highlightLatePayment(payment as HighlightLatePaymentInput))
    );
    return { results };
  }
);
