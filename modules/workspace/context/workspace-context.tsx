"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { storageService } from "@/services/storage";
import type { GeneratedArtifact } from "@/services/ai";

export interface Artifact {
  id: string;
  title: string;
  type: string;
  tags: string[];
  updatedAt: string;
  status: "stable" | "draft" | "archived";
}

interface WorkspaceContextType {
  artifacts: Artifact[];
  isLoading: boolean;
  projectId: string | null;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  filteredArtifacts: Artifact[];
  allTags: string[];
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const MOCK_ARTIFACTS: Artifact[] = [
  {
    id: "1",
    title: "PRD: Sistema de Autenticação",
    type: "Document",
    tags: ["#Auth", "#Backend", "#MVP"],
    updatedAt: "10 min atrás",
    status: "stable",
  },
  {
    id: "2",
    title: "User Stories: Checkout Flow",
    type: "Document",
    tags: ["#Checkout", "#UX", "#Mobile"],
    updatedAt: "2 horas atrás",
    status: "draft",
  },
  {
    id: "3",
    title: "API Docs: Gateway de Pagamentos",
    type: "Technical",
    tags: ["#Pagamentos", "#API", "#Backend"],
    updatedAt: "Ontem",
    status: "stable",
  },
  {
    id: "4",
    title: "Protótipo: Dashboard Médico",
    type: "Prototype",
    tags: ["#UX", "#Mobile", "#Dashboard"],
    updatedAt: "3 dias atrás",
    status: "archived",
  },
];

function mapGeneratedToWorkspaceArtifact(g: GeneratedArtifact): Artifact {
  return {
    id: g.id,
    title: g.title,
    type: g.type,
    tags: g.tags,
    updatedAt: "Recém-gerado",
    status: "draft",
  };
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!projectId) {
        if (!cancelled) {
          setArtifacts(MOCK_ARTIFACTS);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      const list = await storageService.getArtifacts(projectId);
      if (cancelled) return;
      setArtifacts(list.map(mapGeneratedToWorkspaceArtifact));
      setIsLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    artifacts.forEach((a) => a.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [artifacts]);

  const filteredArtifacts = useMemo(() => {
    if (!selectedTag) return artifacts;
    return artifacts.filter((a) => a.tags.includes(selectedTag));
  }, [artifacts, selectedTag]);

  return (
    <WorkspaceContext.Provider
      value={{
        artifacts,
        isLoading,
        projectId,
        selectedTag,
        setSelectedTag,
        filteredArtifacts,
        allTags,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
