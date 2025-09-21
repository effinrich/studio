import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Type something...',
  },
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(args.placeholder as string);
    await userEvent.type(input, 'Hello, world!');
    await expect(input).toHaveValue('Hello, world!');
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await expect(input).toBeDisabled();
  }
};
