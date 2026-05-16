/**
 * Storage Service — Persistência de artefatos
 *
 * USE_MOCK_DB=true  → dados em memória (padrão MVP)
 * USE_MOCK_DB=false → Supabase
 */

import { mockStorage } from "./mock";
// import { supabaseStorage } from "./supabase"; // descomente quando pronto

import type { GeneratedArtifact } from "@/services/ai";

export interface StorageService {
  saveArtifacts(projectId: string, artifacts: GeneratedArtifact[]): Promise<void>;
  getArtifacts(projectId: string): Promise<GeneratedArtifact[]>;
  deleteArtifact(projectId: string, artifactId: string): Promise<void>;
}

const useMock = process.env.USE_MOCK_DB !== "false";

export const storageService: StorageService = useMock
  ? mockStorage
  : mockStorage; // substituir por supabaseStorage quando USE_MOCK_DB=false
