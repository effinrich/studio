import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { ThemeToggle } from './theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Story />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open theme toggle dropdown', async () => {
        await userEvent.click(canvas.getByRole('button', { name: /toggle theme/i }));
    });

    const lightModeButton = await within(document.body).findByRole('menuitem', { name: /light/i });
    const darkModeButton = await within(document.body).findByRole('menuitem', { name: /dark/i });

    await step('Switch to Dark Mode', async () => {
        await userEvent.click(darkModeButton);
        await expect(document.documentElement).toHaveClass('dark');
    });
    
    await step('Open theme toggle dropdown again', async () => {
        // Need to re-open the dropdown
        await userEvent.click(canvas.getByRole('button', { name: /toggle theme/i }));
    });

    const lightModeButton2 = await within(document.body).findByRole('menuitem', { name: /light/i });
    
    await step('Switch to Light Mode', async () => {
        await userEvent.click(lightModeButton2);
        await expect(document.documentElement).not.toHaveClass('dark');
        await expect(document.documentElement).toHaveClass('light');
    });
  },
};
