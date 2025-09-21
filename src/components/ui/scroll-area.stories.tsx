import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { ScrollArea } from './scroll-area';
import { Separator } from './separator';

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <ScrollArea className="h-72 w-48 rounded-md border" {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i, a) => (
          <>
            <div key={i} className="text-sm">
              {`Tag ${i + 1}`}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  ),
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const scrollArea = canvas.getByText('Tags').parentElement?.parentElement;
    await expect(scrollArea).toBeInTheDocument();
  },
};
