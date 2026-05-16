/**
 * AI Service — Gateway de IA
 *
 * USE_MOCK_AI=true  → retorna dados mockados (padrão MVP)
 * USE_MOCK_AI=false → chama OpenAI ou Anthropic (definido por AI_PROVIDER)
 */

import { mockAI } from "./mock";
// import { openaiAI } from "./openai";   // descomente quando pronto
// import { anthropicAI } from "./anthropic"; // descomente quando pronto

export interface GenerateArtifactsInput {
  // Fase 1: Contexto & Problema
  productName: string;
  problem: string;
  audience: string;
  currentWorkflow?: string;
  impactOfProblem?: string;

  // Fase 2: Solução & Estratégia
  solution: string;
  successMetrics?: string;
  targetRoles?: string;
  differentiation?: string;

  // Fase 3: Escopo & Restrições
  minimumMVPScope?: string;
  constraints?: string;
  dependencies?: string;
  roadmapPhases?: string;

  // Papel do usuário
  role: "PM" | "PO" | "GP";
}

export interface GeneratedArtifact {
  id: string;
  title: string;
  type: string;
  content: string; // markdown
  tags: string[];
}

export interface AIService {
  generateArtifacts(input: GenerateArtifactsInput): Promise<GeneratedArtifact[]>;
  generatePrototype(prdContent: string): Promise<PrototypeScreen[]>;
  parseDocument(text: string): Promise<GenerateArtifactsInput>;
}

export interface PrototypeScreen {
  id: string;
  title: string;
  html: string;
  order: number;
}

const useMock = process.env.USE_MOCK_AI !== "false";

export const aiService: AIService = useMock
  ? mockAI
  : mockAI; // substituir por openaiAI ou anthropicAI quando USE_MOCK_AI=false
