import type { Property, Tenant, Payment, Issue } from './types';
import { subDays, addDays, formatISO } from 'date-fns';

export const properties: Property[] = [
  { id: 'prop-1', name: 'Oak View Apartments', address: '123 Oak Avenue, Springfield, IL' },
  { id: 'prop-2', name: 'Maple Creek Complex', address: '456 Maple Lane, Shelbyville, IL' },
  { id: 'prop-3', name: 'Willow Creek Estates', address: '789 Willow Way, Capital City, IL' },
];

export const tenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: "Liam O'Connor",
    email: 'liam.oconnor@example.com',
    phone: '555-0101',
    avatarUrl: 'https://picsum.photos/seed/p1/100/100',
    propertyId: 'prop-1',
    leaseStartDate: '2023-08-01',
    leaseEndDate: formatISO(addDays(new Date(), 25), { representation: 'date' }),
    rentAmount: 1200,
  },
  {
    id: 'tenant-2',
    name: 'Olivia Chen',
    email: 'olivia.chen@example.com',
    phone: '555-0102',
    avatarUrl: 'https://picsum.photos/seed/p2/100/100',
    propertyId: 'prop-1',
    leaseStartDate: '2023-06-15',
    leaseEndDate: formatISO(addDays(new Date(), 55), { representation: 'date' }),
    rentAmount: 1250,
  },
  {
    id: 'tenant-3',
    name: 'Benjamin Carter',
    email: 'ben.carter@example.com',
    phone: '555-0103',
    avatarUrl: 'https://picsum.photos/seed/p3/100/100',
    propertyId: 'prop-2',
    leaseStartDate: '2023-09-01',
    leaseEndDate: '2024-08-31',
    rentAmount: 1400,
  },
  {
    id: 'tenant-4',
    name: 'Sophia Rodriguez',
    email: 'sophia.r@example.com',
    phone: '555-0104',
    avatarUrl: 'https://picsum.photos/seed/p4/100/100',
    propertyId: 'prop-2',
    leaseStartDate: '2022-11-01',
    leaseEndDate: formatISO(addDays(new Date(), 85), { representation: 'date' }),
    rentAmount: 1450,
  },
  {
    id: 'tenant-5',
    name: 'Ava Nguyen',
    email: 'ava.nguyen@example.com',
    phone: '555-0105',
    avatarUrl: 'https://picsum.photos/seed/p5/100/100',
    propertyId: 'prop-3',
    leaseStartDate: '2024-01-01',
    leaseEndDate: '2024-12-31',
    rentAmount: 1600,
  },
    {
    id: 'tenant-6',
    name: 'Noah Williams',
    email: 'noah.w@example.com',
    phone: '555-0106',
    avatarUrl: 'https://picsum.photos/seed/p6/100/100',
    propertyId: 'prop-3',
    leaseStartDate: '2023-05-01',
    leaseEndDate: '2025-04-30',
    rentAmount: 1650,
  },
];

const now = new Date();
const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
const firstOfTwoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

export const payments: Payment[] = [
  // Liam O'Connor: One late, one upcoming
  { id: 'pay-1', tenantId: 'tenant-1', propertyId: 'prop-1', amount: 1200, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: formatISO(addDays(firstOfLastMonth, 5), { representation: 'date' }), method: 'Bank Transfer' },
  { id: 'pay-2', tenantId: 'tenant-1', propertyId: 'prop-1', amount: 1200, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: null, method: null },
  
  // Olivia Chen: Paid on time
  { id: 'pay-3', tenantId: 'tenant-2', propertyId: 'prop-1', amount: 1250, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: formatISO(firstOfLastMonth, { representation: 'date' }), method: 'Credit Card' },
  { id: 'pay-4', tenantId: 'tenant-2', propertyId: 'prop-1', amount: 1250, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: formatISO(subDays(firstOfThisMonth, 1), { representation: 'date' }), method: 'Credit Card' },
  
  // Benjamin Carter: Not paid this month yet (late)
  { id: 'pay-5', tenantId: 'tenant-3', propertyId: 'prop-2', amount: 1400, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: formatISO(firstOfLastMonth, { representation: 'date' }), method: 'Bank Transfer' },
  { id: 'pay-6', tenantId: 'tenant-3', propertyId: 'prop-2', amount: 1400, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: null, method: null },

  // Sophia Rodriguez: Consistently on time
  { id: 'pay-7', tenantId: 'tenant-4', propertyId: 'prop-2', amount: 1450, dueDate: formatISO(firstOfTwoMonthsAgo, { representation: 'date' }), paidDate: formatISO(firstOfTwoMonthsAgo, { representation: 'date' }), method: 'Bank Transfer' },
  { id: 'pay-8', tenantId: 'tenant-4', propertyId: 'prop-2', amount: 1450, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: formatISO(firstOfLastMonth, { representation: 'date' }), method: 'Bank Transfer' },
  { id: 'pay-9', tenantId: 'tenant-4', propertyId: 'prop-2', amount: 1450, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: formatISO(firstOfThisMonth, { representation: 'date' }), method: 'Bank Transfer' },
  
  // Ava Nguyen: Very late payment
  { id: 'pay-10', tenantId: 'tenant-5', propertyId: 'prop-3', amount: 1600, dueDate: formatISO(firstOfLastMonth, { representation: 'date' }), paidDate: null, method: null },
  { id: 'pay-11', tenantId: 'tenant-5', propertyId: 'prop-3', amount: 1600, dueDate: formatISO(firstOfThisMonth, { representation: 'date' }), paidDate: null, method: null },
];

export const issues: Issue[] = [
  { id: 'issue-1', tenantId: 'tenant-2', propertyId: 'prop-1', title: 'Leaky Faucet', description: 'The kitchen faucet has been dripping for the last two days.', status: 'Open', priority: 'Medium', reportedDate: formatISO(subDays(now, 3), { representation: 'date' }) },
  { id: 'issue-2', tenantId: 'tenant-4', propertyId: 'prop-2', title: 'Broken Garage Door', description: 'The garage door opener is not responding.', status: 'In Progress', priority: 'High', reportedDate: formatISO(subDays(now, 1), { representation: 'date' }) },
  { id: 'issue-3', tenantId: 'tenant-1', propertyId: 'prop-1', title: 'AC not cooling', description: 'The air conditioning unit is running but not cooling the apartment.', status: 'Resolved', priority: 'High', reportedDate: formatISO(subDays(now, 30), { representation: 'date' }) },
  { id: 'issue-4', tenantId: 'tenant-5', propertyId: 'prop-3', title: 'Pest Control', description: 'Seeing some ants in the kitchen area.', status: 'Open', priority: 'Low', reportedDate: formatISO(subDays(now, 5), { representation: 'date' }) },
];


export const getProperties = async () => properties;
export const getTenants = async () => tenants;
export const getPayments = async () => payments;
export const getIssues = async () => issues;

export const getTenantById = async (id: string) => tenants.find(t => t.id === id);
export const getPropertyById = async (id: string) => properties.find(p => p.id === id);
