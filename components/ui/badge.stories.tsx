import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Einstein/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Stable",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "AI Generated",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Error",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Archived",
    variant: "outline",
  },
};
