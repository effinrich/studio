import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import {useState} from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar {...args} mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
  }
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const today = new Date();
        const day = today.getDate();
        
        await expect(canvas.getByText(day)).toHaveClass('bg-primary');
    }
};

export const SelectDate: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const today = new Date();
        const dayToSelect = today.getDate() === 1 ? 2 : 1;

        await userEvent.click(canvas.getByText(dayToSelect));
        await expect(canvas.getByText(dayToSelect)).toHaveClass('bg-primary');
    }
}
