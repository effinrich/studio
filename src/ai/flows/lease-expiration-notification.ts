'use server';

/**
 * @fileOverview Lease expiration notification flow.
 *
 * - leaseExpirationNotification - A function that generates a notification when a lease is about to expire.
 * - LeaseExpirationNotificationInput - The input type for the leaseExpirationNotification function.
 * - LeaseExpirationNotificationOutput - The return type for the leaseExpirationNotification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LeaseExpirationNotificationInputSchema = z.object({
  tenantName: z.string().describe('The name of the tenant.'),
  propertyName: z.string().describe('The name of the property.'),
  leaseExpirationDate: z
    .string()
    .describe('The lease expiration date in ISO format (YYYY-MM-DD).'),
  currentDate: z.string().describe('The current date in ISO format (YYYY-MM-DD).'),
  daysUntilExpiration: z
    .number()
    .describe('The number of days until the lease expires.'),
});
export type LeaseExpirationNotificationInput = z.infer<
  typeof LeaseExpirationNotificationInputSchema
>;

const LeaseExpirationNotificationOutputSchema = z.object({
  notificationMessage: z
    .string()
    .describe('The notification message about the lease expiration.'),
  urgency: z
    .enum(['high', 'medium', 'low'])
    .describe('The urgency level of the notification.'),
});
export type LeaseExpirationNotificationOutput = z.infer<
  typeof LeaseExpirationNotificationOutputSchema
>;

export async function leaseExpirationNotification(
  input: LeaseExpirationNotificationInput
): Promise<LeaseExpirationNotificationOutput> {
  return leaseExpirationNotificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'leaseExpirationNotificationPrompt',
  input: {schema: LeaseExpirationNotificationInputSchema},
  output: {schema: LeaseExpirationNotificationOutputSchema},
  prompt: `You are a helpful assistant that crafts lease expiration notifications for landlords.

  Given the following information, generate a clear and concise notification message and determine its urgency.

  Tenant Name: {{{tenantName}}}
  Property Name: {{{propertyName}}}
  Lease Expiration Date: {{{leaseExpirationDate}}}
  Current Date: {{{currentDate}}}
  Days Until Expiration: {{{daysUntilExpiration}}}

  The notification message should inform the landlord about the upcoming lease expiration and prompt them to take action if necessary.

  The urgency should be determined as follows:
  - high: If the lease expires in 30 days or less.
  - medium: If the lease expires in 60 days or less but more than 30 days.
  - low: If the lease expires in more than 60 days.

  Output the notificationMessage and urgency fields.
  `,
});

const leaseExpirationNotificationFlow = ai.defineFlow(
  {
    name: 'leaseExpirationNotificationFlow',
    inputSchema: LeaseExpirationNotificationInputSchema,
    outputSchema: LeaseExpirationNotificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
