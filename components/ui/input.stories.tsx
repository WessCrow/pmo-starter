import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Einstein/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Digite aqui seu contexto ou dor...",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Placeholder",
    defaultValue: "Texto de exemplo no Input premium",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Input desativado",
  },
};
