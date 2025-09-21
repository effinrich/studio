
export type Property = {
  id: string;
  name: string;
  address: string;
};

export type Tenant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  propertyId: string;
  leaseStartDate: string;
  leaseEndDate: string;
  rentAmount: number;
};

export type Payment = {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  method: 'Credit Card' | 'Bank Transfer' | 'Cash' | null;
};

export type Issue = {
  id: string;
  tenantId: string;
  propertyId: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  reportedDate: string;
};
