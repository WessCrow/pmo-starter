"use client";

import type { ElementType } from "react";
import { MessageSquare, Upload } from "lucide-react";
import { useNewProject, type InputMode } from "../context/new-project-context";
import { cn } from "@/lib/utils";

const MODES: { id: InputMode; label: string; icon: ElementType }[] = [
  { id: "chat", label: "Chat com IA", icon: MessageSquare },
  { id: "upload", label: "Upload / Arquivo", icon: Upload },
];

export function ModeSelector() {
  const { inputMode, setInputMode } = useNewProject();

  return (
    <div className="shrink-0 border-b border-zds-neutral-800 bg-white p-4">
      <div
        role="tablist"
        aria-label="Modo de entrada"
        className="flex rounded-xl border border-zds-neutral-800 bg-zds-neutral-900 p-1"
      >
        {MODES.map(({ id, label, icon: Icon }) => {
          const active = inputMode === id;
          const panelId =
            id === "chat" ? "new-project-panel-chat" : "new-project-panel-upload";
          const tabId = id === "chat" ? "new-project-tab-chat" : "new-project-tab-upload";
          return (
            <button
              key={id}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={panelId}
              tabIndex={active ? 0 : -1}
              onClick={() => setInputMode(id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[0.625rem] font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35",
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-zds-neutral-500 hover:bg-white hover:text-zds-neutral-200"
              )}
            >
              <Icon size={12} className={cn(active ? "text-white" : "text-zds-neutral-500")} aria-hidden />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
