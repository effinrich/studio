
import type { Property, Tenant, Payment, Issue } from './types';
import { subDays, addDays, formatISO } from 'date-fns';

export const properties: Omit<Property, 'id'>[] = [
  { name: 'Oak View Apartments', address: '123 Oak Avenue, Springfield, IL' },
  { name: 'Maple Creek Complex', address: '456 Maple Lane, Shelbyville, IL' },
  { name: 'Willow Creek Estates', address: '789 Willow Way, Capital City, IL' },
];

// Note: We need to define propertyIds after properties are created.
// In a real DB, these would be auto-generated.
const propertyIds = ['prop-1', 'prop-2', 'prop-3'];

export const tenants: Omit<Tenant, 'id'>[] = [
  {
    name: "Liam O'Connor",
    email: 'liam.oconnor@example.com',
    phone: '555-0101',
    avatarUrl: 'https://picsum.photos/seed/p1/100/100',
    propertyId: propertyIds[0],
    leaseStartDate: '2023-08-01',
    leaseEndDate: formatISO(addDays(new Date(), 25), { representation: 'date' }),
    rentAmount: 1200,
  },
  {
    name: 'Olivia Chen',
    email: 'olivia.chen@example.com',
    phone: '555-0102',
    avatarUrl: 'https://picsum.photos/seed/p2/100/100',
    propertyId: propertyIds[0],
    leaseStartDate: '2023-06-15',
    leaseEndDate: formatISO(addDays(new Date(), 55), { representation: 'date' }),
    rentAmount: 1250,
  },
  {
    name: 'Benjamin Carter',
    email: 'ben.carter@example.com',
    phone: '555-0103',
    avatarUrl: 'https://picsum.photos/seed/p3/100/100',
    propertyId: propertyIds[1],
    leaseStartDate: '2023-09-01',
    leaseEndDate: '2024-08-31',
    rentAmount: 1400,
  },
  {
    name: 'Sophia Rodriguez',
    email: 'sophia.r@example.com',
    phone: '555-0104',
    avatarUrl: 'https://picsum.photos/seed/p4/100/100',
    propertyId: propertyIds[1],
    leaseStartDate: '2022-11-01',
    leaseEndDate: formatISO(addDays(new Date(), 85), { representation: 'date' }),
    rentAmount: 1450,
  },
  {
    name: 'Ava Nguyen',
    email: 'ava.nguyen@example.com',
    phone: '555-0105',
    avatarUrl: 'https://picsum.photos/seed/p5/100/100',
    propertyId: propertyIds[2],
    leaseStartDate: '2024-01-01',
    leaseEndDate: '2024-12-31',
    rentAmount: 1600,
  },
    {
    name: 'Noah Williams',
    email: 'noah.w@example.com',
    phone: '555-0106',
    avatarUrl: 'https://picsum.photos/seed/p6/100/100',
    propertyId: propertyIds[2],
    leaseStartDate: '2023-05-01',
    leaseEndDate: '2025-04-30',
    rentAmount: 1650,
  },
];

const now = new Date();
const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
const firstOfTwoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

// Note: We need to define tenantIds after tenants are created.
const tenantIds = ['tenant-1', 'tenant-2', 'tenant-3', 'tenant-4', 'tenant-5', 'tenant-6'];

export const payments: Omit<Payment, 'id'>[] = [
  // Liam O'Connor: One late, one upcoming
  { tenantId: tenantIds[0], propertyId: propertyIds[0], amount: 1200, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: formatISO(addDays(firstOfLastMonth, 5), { representation: 'date' }), method: 'Bank Transfer' },
  { tenantId: tenantIds[0], propertyId: propertyIds[0], amount: 1200, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: null, method: null },
  
  // Olivia Chen: Paid on time
  { tenantId: tenantIds[1], propertyId: propertyIds[0], amount: 1250, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: formatISO(firstOfLastMonth, { representation: 'date' }), method: 'Credit Card' },
  { tenantId: tenantIds[1], propertyId: propertyIds[0], amount: 1250, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: formatISO(subDays(firstOfThisMonth, 1), { representation: 'date' }), method: 'Credit Card' },
  
  // Benjamin Carter: Not paid this month yet (late)
  { tenantId: tenantIds[2], propertyId: propertyIds[1], amount: 1400, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: formatISO(firstOfLastMonth, { representation: 'date' }), method: 'Bank Transfer' },
  { tenantId: tenantIds[2], propertyId: propertyIds[1], amount: 1400, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: null, method: null },

  // Sophia Rodriguez: Consistently on time
  { tenantId: tenantIds[3], propertyId: propertyIds[1], amount: 1450, dueDate: formatISO(firstOfTwoMonthsAgo, { representation: 'date' }), paidDate: formatISO(firstOfTwoMonthsAgo, { representation: 'date' }), method: 'Bank Transfer' },
  { tenantId: tenantIds[3], propertyId: propertyIds[1], amount: 1450, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: formatISO(firstOfLastMonth, { representation: 'date' }), method: 'Bank Transfer' },
  { tenantId: tenantIds[3], propertyId: propertyIds[1], amount: 1450, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: formatISO(firstOfThisMonth, { representation: 'date' }), method: 'Bank Transfer' },
  
  // Ava Nguyen: Very late payment
  { tenantId: tenantIds[4], propertyId: propertyIds[2], amount: 1600, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: null, method: null },
  { tenantId: tenantIds[4], propertyId: propertyIds[2], amount: 1600, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: null, method: null },
];

export const issues: Omit<Issue, 'id'>[] = [
  { tenantId: tenantIds[1], propertyId: propertyIds[0], title: 'Leaky Faucet', description: 'The kitchen faucet has been dripping for the last two days.', status: 'Open', priority: 'Medium', reportedDate: formatISO(subDays(now, 3), { representation: 'date' }) },
  { tenantId: tenantIds[3], propertyId: propertyIds[1], title: 'Broken Garage Door', description: 'The garage door opener is not responding.', status: 'In Progress', priority: 'High', reportedDate: formatISO(subDays(now, 1), { representation: 'date' }) },
  { tenantId: tenantIds[0], propertyId: propertyIds[0], title: 'AC not cooling', description: 'The air conditioning unit is running but not cooling the apartment.', status: 'Resolved', priority: 'High', reportedDate: formatISO(subDays(now, 30), { representation: 'date' }) },
  { tenantId: tenantIds[4], propertyId: propertyIds[2], title: 'Pest Control', description: 'Seeing some ants in the kitchen area.', status: 'Open', priority: 'Low', reportedDate: formatISO(subDays(now, 5), { representation: 'date' }) },
];
