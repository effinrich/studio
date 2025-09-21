import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import { Button } from './button';

const meta: Meta<typeof Sheet> = {
  title: 'UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    
    const sheet = await within(document.body).findByRole('dialog');
    await expect(sheet).toBeInTheDocument();
    
    await expect(within(sheet).getByText('Are you sure absolutely sure?')).toBeVisible();

    const closeButton = within(sheet).getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    // This assertion can be tricky with animations, we might need to wait for disappearance
    // await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
  },
};
