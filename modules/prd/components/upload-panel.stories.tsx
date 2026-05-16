import type { Meta, StoryObj } from "@storybook/react";
import { UploadPanel } from "./upload-panel";
import { withNewProject } from "../../../.storybook/decorators/with-new-project";

const meta: Meta<typeof UploadPanel> = {
  title: "Modules/PRD/UploadPanel",
  component: UploadPanel,
  decorators: [withNewProject("panel")],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UploadPanel>;

export const Default: Story = {};
