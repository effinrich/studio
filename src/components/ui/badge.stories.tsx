import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Badge')).toBeInTheDocument();
  },
};

export const Secondary: Story = {
    args: {
        ...Default.args,
        variant: 'secondary'
    }
}

export const Destructive: Story = {
    args: {
        ...Default.args,
        variant: 'destructive'
    }
}

export const Outline: Story = {
    args: {
        ...Default.args,
        variant: 'outline'
    }
}
