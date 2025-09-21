import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { Navigation } from './navigation';
import { Sidebar, SidebarContent, SidebarProvider } from './ui/sidebar';
import { NextRouter } from 'next/router';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      router: {
        pathname: '/dashboard',
      },
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <Story />
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);
    const router = parameters.nextjs.router as NextRouter;
    
    // Check that Dashboard is active by default
    const dashboardLink = canvas.getByRole('link', { name: /dashboard/i });
    await expect(dashboardLink.parentElement).toHaveAttribute('data-active', 'true');
    
    // Click on Tenants link
    const tenantsLink = canvas.getByRole('link', { name: /tenants/i });
    await userEvent.click(tenantsLink);

    // The router pathname should be updated
    await expect(router.pathname).toBe('/tenants');
  },
};

export const ActiveTenants: Story = {
    parameters: {
        nextjs: {
          router: {
            pathname: '/tenants',
          },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const tenantsLink = canvas.getByRole('link', { name: /tenants/i });
        await expect(tenantsLink.parentElement).toHaveAttribute('data-active', 'true');
    }
}
