import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { Progress } from './progress';
import { useEffect, useState } from 'react';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => {
    const [progress, setProgress] = useState(13)
 
    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])
    
    return <Progress {...args} value={progress} className="w-[60%]" />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressbar = await canvas.findByRole('progressbar');
    await expect(progressbar).toBeInTheDocument();
    await expect(progressbar).toHaveAttribute('aria-valuenow', '66');
  },
};
