import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { Textarea } from './textarea';
import { Label } from './label';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('Type your message here.');
    
    await userEvent.type(textarea, 'This is a test message.');
    
    await expect(textarea).toHaveValue('This is a test message.');
  },
};
