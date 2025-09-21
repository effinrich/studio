import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import { ToastAction } from './toast';
import { Button } from './button';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from './toaster';

const ToastExample = () => {
    const { toast } = useToast()
  
    return (
        <>
        <Button
            variant="outline"
            onClick={() => {
            toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
                action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
            }}
        >
            Add to calendar
        </Button>
        <Toaster/>
      </>
    )
  }

const meta: Meta<typeof ToastExample> = {
  title: 'UI/Toast',
  component: ToastExample,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ToastExample>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await userEvent.click(canvas.getByRole('button', { name: 'Add to calendar' }));
    
    const toast = await within(document.body).findByRole('status');
    await expect(toast).toBeInTheDocument();
    
    await expect(within(toast).getByText('Scheduled: Catch up')).toBeVisible();

    const undoButton = within(toast).getByRole('button', { name: 'Undo' });
    await userEvent.click(undoButton);
  },
};
