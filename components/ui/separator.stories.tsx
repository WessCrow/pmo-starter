import type { Meta, StoryObj } from 'storybook/react';
import { Separator } from './separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['ai-generated'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Story />
        <div>Docs</div>
        <Story />
        <div>Source</div>
      </div>
    ),
  ],
};
