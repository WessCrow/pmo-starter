import type { Meta, StoryObj } from "@storybook/react";
import { PreviewPanel } from "./preview-panel";
import { withNewProject } from "../../../.storybook/decorators/with-new-project";

const meta: Meta<typeof PreviewPanel> = {
  title: "Modules/PRD/PreviewPanel",
  component: PreviewPanel,
  decorators: [withNewProject("wide")],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PreviewPanel>;

/** Preview espelha `collectedData` do contexto — use Chat ou Upload na mesma sessão ou preencha estado no decorator */
export const Default: Story = {};
