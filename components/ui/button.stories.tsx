import type { Meta, StoryObj } from 'storybook/react';
import { expect } from 'storybook/test';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['ai-generated'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Agendar Consulta',
    variant: 'default',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /agendar consulta/i })).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    children: 'Css Check',
    variant: 'default',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /css check/i });
    // --color-primary is #1774DE which is rgb(23, 116, 222)
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(23, 116, 222)');
  },
};

export const Secondary: Story = {
  args: {
    children: 'Conheça as unidades',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Acesse',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Cancelar Agendamento',
    variant: 'destructive',
  },
};
