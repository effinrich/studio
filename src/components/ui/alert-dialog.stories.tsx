import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button } from './button';

const meta: Meta<typeof AlertDialog> = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    
    await step('Open dialog', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /show dialog/i }));
      const dialog = await within(document.body).findByRole('alertdialog');
      await expect(dialog).toBeInTheDocument();
    });

    await step('Check content', async () => {
        const dialog = await within(document.body).findByRole('alertdialog');
        await expect(within(dialog).getByText('Are you absolutely sure?')).toBeInTheDocument();
    });

    await step('Click cancel', async () => {
        const dialog = await within(document.body).findByRole('alertdialog');
        await userEvent.click(within(dialog).getByText('Cancel'));
        await expect(canvas.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

  },
};
