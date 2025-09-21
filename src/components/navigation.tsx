'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Wrench,
  FileText,
  CircleDollarSign,
  Building2
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tenants', label: 'Tenants', icon: Users },
  { href: '/rent-tracker', label: 'Rent Tracker', icon: CreditCard },
  { href: '/issues', label: 'Issues', icon: Wrench },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/expenses', label: 'Expenses', icon: CircleDollarSign },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(link.href)}
              tooltip={link.label}
            >
              <Link href={link.href}>
                <link.icon />
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
