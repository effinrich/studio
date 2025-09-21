import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { PlusCircle } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    ...Default.args,
    children: 'Link',
    variant: 'link',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusCircle className="mr-2 h-4 w-4" /> Add New
      </>
    ),
    variant: 'default',
    size: 'default',
  },
};

export const Icon: Story = {
    args: {
      children: <PlusCircle className="h-4 w-4" />,
      variant: 'outline',
      size: 'icon',
    },
  };
