import type { Meta, StoryObj } from "@storybook/react";
import { ChatPanel } from "./chat-panel";
import { withNewProject } from "../../../.storybook/decorators/with-new-project";

const meta: Meta<typeof ChatPanel> = {
  title: "Modules/PRD/ChatPanel",
  component: ChatPanel,
  decorators: [withNewProject("panel")],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatPanel>;

/** Fluxo inicial: primeira mensagem da IA e campo de resposta */
export const Default: Story = {};
