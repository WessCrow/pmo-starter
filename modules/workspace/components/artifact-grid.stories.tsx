import type { Meta, StoryObj } from "@storybook/react";
import { ArtifactGrid } from "./artifact-grid";
import { WorkspaceProvider } from "../context/workspace-context";

const meta: Meta<typeof ArtifactGrid> = {
  title: "Einstein/Workspace/ArtifactGrid",
  component: ArtifactGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "Zera Neutral 900",
    },
  },
  decorators: [
    (Story) => (
      <WorkspaceProvider>
        <div className="h-screen flex flex-col">
          <Story />
        </div>
      </WorkspaceProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArtifactGrid>;

export const Default: Story = {};
