import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => <Slider {...args} defaultValue={[50]} max={100} step={1} className="w-[60%]" />,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');
    await expect(slider).toBeInTheDocument();
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
  },
};
