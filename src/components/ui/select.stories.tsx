import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await userEvent.click(canvas.getByRole('combobox'));
    
    const listbox = await within(document.body).findByRole('listbox');
    await expect(listbox).toBeInTheDocument();
    
    const bananaOption = within(listbox).getByText('Banana');
    await userEvent.click(bananaOption);
    
    await expect(canvas.getByRole('combobox')).toHaveTextContent('Banana');
  },
};
