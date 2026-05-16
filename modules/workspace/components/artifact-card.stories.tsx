import type { Meta, StoryObj } from "@storybook/react";
import { ArtifactCard } from "./artifact-card";

const meta: Meta<typeof ArtifactCard> = {
  title: "Einstein/Workspace/ArtifactCard",
  component: ArtifactCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "Zera Neutral 900",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArtifactCard>;

export const Stable: Story = {
  args: {
    artifact: {
      id: "1",
      title: "PRD: Sistema de Autenticação",
      type: "Document",
      tags: ["#Auth", "#Backend", "#MVP"],
      updatedAt: "10 min atrás",
      status: "stable",
    },
  },
};

export const Draft: Story = {
  args: {
    artifact: {
      id: "2",
      title: "User Stories: Checkout Flow",
      type: "Document",
      tags: ["#Checkout", "#UX", "#Mobile"],
      updatedAt: "2 horas atrás",
      status: "draft",
    },
  },
};

export const Archived: Story = {
  args: {
    artifact: {
      id: "3",
      title: "Protótipo: Dashboard Médico",
      type: "Prototype",
      tags: ["#UX", "#Mobile", "#Dashboard"],
      updatedAt: "3 dias atrás",
      status: "archived",
    },
  },
};

export const Technical: Story = {
  args: {
    artifact: {
      id: "4",
      title: "API Docs: Gateway de Pagamentos",
      type: "Technical",
      tags: ["#Pagamentos", "#API", "#Backend"],
      updatedAt: "Ontem",
      status: "stable",
    },
  },
};

export const LongTitle: Story = {
  args: {
    artifact: {
      id: "5",
      title: "PRD: Sistema de Notificações em Tempo Real para Usuários Externos do Portal",
      type: "Document",
      tags: ["#Notificações", "#Realtime", "#Backend"],
      updatedAt: "5 min atrás",
      status: "draft",
    },
  },
};
