import type { ReactElement } from "react";
import { NewProjectProvider } from "@/modules/prd/context/new-project-context";

type Layout = "panel" | "wide";

/**
 * Chat / Upload / Preview usam `useNewProject()` — precisam do provider e de altura definida
 * (`h-full` não funciona com layout "centered" sem ancestral com height).
 */
export function withNewProject(layout: Layout = "panel") {
  const wrapperClass =
    layout === "wide"
      ? "min-h-[640px] h-[85vh] w-full max-w-4xl bg-zds-neutral-900 border border-zds-neutral-800 rounded-xl overflow-hidden mx-auto"
      : "min-h-[640px] h-[720px] w-full max-w-[440px] bg-zds-neutral-900 border border-zds-neutral-800 rounded-xl overflow-hidden";

  return function StoryDecorator(Story: () => ReactElement) {
    return (
      <div className={wrapperClass}>
        <NewProjectProvider>
          <div className="h-full flex flex-col min-h-0">
            <Story />
          </div>
        </NewProjectProvider>
      </div>
    );
  };
}
