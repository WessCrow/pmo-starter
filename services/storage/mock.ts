/**
 * Mock Storage — Dados em memória (sem persistência entre reloads)
 * Substitua por supabase.ts quando pronto para produção
 */

import type { StorageService } from "./index";
import type { GeneratedArtifact } from "@/services/ai";

const store = new Map<string, GeneratedArtifact[]>();

export const mockStorage: StorageService = {
  async saveArtifacts(projectId, artifacts) {
    const existing = store.get(projectId) ?? [];
    store.set(projectId, [...existing, ...artifacts]);
  },

  async getArtifacts(projectId) {
    return store.get(projectId) ?? [];
  },

  async deleteArtifact(projectId, artifactId) {
    const existing = store.get(projectId) ?? [];
    store.set(projectId, existing.filter((a) => a.id !== artifactId));
  },
};
