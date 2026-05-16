import type { Meta, StoryObj } from "@storybook/react";
import { WorkspaceSidebar } from "./sidebar";
import { WorkspaceProvider } from "../context/workspace-context";

const meta: Meta<typeof WorkspaceSidebar> = {
  title: "Einstein/Workspace/Sidebar",
  component: WorkspaceSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "Zera Neutral 1000",
    },
  },
  decorators: [
    (Story) => (
      <WorkspaceProvider>
        <div className="h-screen flex">
          <Story />
        </div>
      </WorkspaceProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WorkspaceSidebar>;

export const Default: Story = {};
