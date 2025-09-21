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
import {highlightLatePayment} from './rent-tracker-late-payments';

export const HighlightLatePaymentInputSchema = z.object({
  paymentDueDate: z
    .string()
    .describe('The due date of the rent payment (ISO format).'),
  paymentDate: z
    .string()
    .nullable()
    .describe('The date the rent was paid (ISO format), null if not paid.'),
  rentAmount: z.number().describe('The amount of rent due.'),
  tenantName: z.string().describe('The name of the tenant.'),
  propertyName: z.string().describe('The name of the property.'),
});
export type HighlightLatePaymentInput = z.infer<
  typeof HighlightLatePaymentInputSchema
>;

export const HighlightLatePaymentOutputSchema = z.object({
  isLate: z.boolean().describe('Whether the rent payment is late.'),
  daysLate: z
    .number()
    .optional()
    .describe('The number of days the rent is late, only if late.'),
  suggestReminder: z
    .boolean()
    .describe('Whether a reminder message should be sent to the tenant.'),
  reason: z.string().describe('The reason for the suggestion.'),
});
export type HighlightLatePaymentOutput = z.infer<
  typeof HighlightLatePaymentOutputSchema
>;

const HighlightLatePaymentsBatchInputSchema = z.array(
  HighlightLatePaymentInputSchema
);
export type HighlightLatePaymentsBatchInput = z.infer<
  typeof HighlightLatePaymentsBatchInputSchema
>;

const HighlightLatePaymentsBatchOutputSchema = z.object({
  results: z.array(HighlightLatePaymentOutputSchema),
});
export type HighlightLatePaymentsBatchOutput = z.infer<
  typeof HighlightLatePaymentsBatchOutputSchema
>;

export async function highlightLatePaymentsBatch(
  input: HighlightLatePaymentsBatchInput
): Promise<HighlightLatePaymentsBatchOutput> {
  return highlightLatePaymentsBatchFlow(input);
}

const highlightLatePaymentsBatchFlow = ai.defineFlow(
  {
    name: 'highlightLatePaymentsBatchFlow',
    inputSchema: HighlightLatePaymentsBatchInputSchema,
    outputSchema: HighlightLatePaymentsBatchOutputSchema,
  },
  async payments => {
    const results = await Promise.all(
      payments.map(payment => highlightLatePayment(payment))
    );
    return {results};
  }
);
