import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://picsum.photos/seed/storybook/100/100" alt="@storybook" />
      <AvatarFallback>SB</AvatarFallback>
    </Avatar>
  ),
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatarImage = canvas.getByAltText('@storybook');
    await expect(avatarImage).toBeInTheDocument();
  },
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://invalid-url.com/image.png" alt="@storybook" />
      <AvatarFallback>SB</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fallback = await canvas.findByText('SB');
    await expect(fallback).toBeInTheDocument();
  },
};
