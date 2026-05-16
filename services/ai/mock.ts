/**
 * Mock AI — Dados simulados para o MVP
 * Substitua por openai.ts ou anthropic.ts quando pronto para produção
 */

import type { AIService, GenerateArtifactsInput, GeneratedArtifact, PrototypeScreen } from "./index";

function delay(ms = 1200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_ARTIFACTS_BY_ROLE: Record<string, GeneratedArtifact[]> = {
  PM: [
    {
      id: "mock-vision-board",
      title: "Product Vision Board",
      type: "Document",
      tags: ["#PM", "#Estratégia", "#Vision"],
      content: `# Product Vision Board\n\n## Visão\nDescrição da visão do produto gerada pela IA.\n\n## Segmento de Clientes\n- Persona primária\n- Persona secundária\n\n## Proposta de Valor\nBeneficios principais para o usuário.\n\n## Objetivos de Negócio\n- Métrica 1\n- Métrica 2`,
    },
    {
      id: "mock-rice",
      title: "Matriz de Priorização (RICE)",
      type: "Document",
      tags: ["#PM", "#Priorização", "#RICE"],
      content: `# Matriz RICE\n\n| Feature | Reach | Impact | Confidence | Effort | Score |\n|---|---|---|---|---|---|\n| Feature A | 1000 | 3 | 80% | 2 | 1200 |\n| Feature B | 500 | 2 | 60% | 1 | 600 |`,
    },
  ],
  PO: [
    {
      id: "mock-prd",
      title: "PRD: Documento de Requisitos",
      type: "Document",
      tags: ["#PO", "#PRD", "#MVP"],
      content: `# PRD — Produto Mock\n\n## Problema\nDescrição do problema identificado.\n\n## Solução\nDescrição da solução proposta.\n\n## Critérios de Aceite\n- [ ] Critério 1\n- [ ] Critério 2\n\n## User Stories\n- Como usuário, quero...\n- Como admin, quero...`,
    },
    {
      id: "mock-backlog",
      title: "Product Backlog",
      type: "Document",
      tags: ["#PO", "#Backlog", "#Agile"],
      content: `# Product Backlog\n\n## Épico 1 — Autenticação\n- [ ] US-01: Login com email\n- [ ] US-02: Recuperação de senha\n\n## Épico 2 — Dashboard\n- [ ] US-03: Visualizar projetos\n- [ ] US-04: Criar novo projeto`,
    },
  ],
  GP: [
    {
      id: "mock-charter",
      title: "Project Charter",
      type: "Document",
      tags: ["#GP", "#Charter", "#Projeto"],
      content: `# Project Charter\n\n## Objetivo\nDescrição do objetivo do projeto.\n\n## Escopo\nO que está dentro e fora do escopo.\n\n## Cronograma\n- Fase 1: Semanas 1-2\n- Fase 2: Semanas 3-4\n\n## Stakeholders\n| Nome | Papel | Responsabilidade |\n|---|---|---|\n| Wess | PM | Estratégia |`,
    },
    {
      id: "mock-raci",
      title: "Matriz RACI",
      type: "Document",
      tags: ["#GP", "#RACI", "#Responsabilidades"],
      content: `# Matriz RACI\n\n| Atividade | PM | Dev | Design | QA |\n|---|---|---|---|---|\n| Definição de requisitos | R | C | C | I |\n| Desenvolvimento | I | R | C | I |\n| Testes | I | C | I | R |`,
    },
  ],
};

const MOCK_PROTOTYPE_SCREENS: PrototypeScreen[] = [
  {
    id: "screen-login",
    title: "Tela de Login",
    order: 1,
    html: `<div style="font-family:sans-serif;max-width:400px;margin:80px auto;padding:32px;border:1px solid #DCE0E8;border-radius:8px;background:#fff">
  <h2 style="margin:0 0 8px;color:#16171A">Entrar</h2>
  <p style="color:#8387C0;font-size:14px;margin:0 0 24px">Acesse seu workspace</p>
  <label style="font-size:12px;font-weight:600;color:#484B52">Email</label>
  <input type="email" placeholder="voce@empresa.com" style="display:block;width:100%;margin:6px 0 16px;padding:10px 12px;border:1px solid #DCE0E8;border-radius:6px;font-size:14px;box-sizing:border-box"/>
  <label style="font-size:12px;font-weight:600;color:#484B52">Senha</label>
  <input type="password" placeholder="••••••••" style="display:block;width:100%;margin:6px 0 24px;padding:10px 12px;border:1px solid #DCE0E8;border-radius:6px;font-size:14px;box-sizing:border-box"/>
  <a href="#screen-dashboard" style="display:block;text-align:center;background:#1774DE;color:white;padding:12px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px">Entrar</a>
</div>`,
  },
  {
    id: "screen-dashboard",
    title: "Dashboard",
    order: 2,
    html: `<div style="font-family:sans-serif;padding:32px;background:#F6F7F9;min-height:100vh">
  <h1 style="color:#16171A;margin:0 0 4px">Meus Projetos</h1>
  <p style="color:#8387C0;font-size:14px;margin:0 0 24px">3 projetos ativos</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
    <a href="#screen-workspace" style="background:white;border:1px solid #DCE0E8;border-radius:8px;padding:20px;text-decoration:none;display:block">
      <div style="font-size:12px;color:#1774DE;font-weight:700;margin-bottom:8px">PRD</div>
      <div style="font-weight:700;color:#16171A;margin-bottom:4px">Sistema de Auth</div>
      <div style="font-size:12px;color:#8387C0">Atualizado há 10 min</div>
    </a>
    <div style="background:white;border:1px solid #DCE0E8;border-radius:8px;padding:20px">
      <div style="font-size:12px;color:#1774DE;font-weight:700;margin-bottom:8px">DRAFT</div>
      <div style="font-weight:700;color:#16171A;margin-bottom:4px">Checkout Flow</div>
      <div style="font-size:12px;color:#8387C0">Atualizado há 2h</div>
    </div>
    <div style="background:white;border:1px dashed #DCE0E8;border-radius:8px;padding:20px;display:flex;align-items:center;justify-content:center;color:#8387C0;font-size:14px">+ Novo Projeto</div>
  </div>
</div>`,
  },
  {
    id: "screen-workspace",
    title: "Workspace — Artefatos",
    order: 3,
    html: `<div style="font-family:sans-serif;display:flex;min-height:100vh">
  <div style="width:220px;background:white;border-right:1px solid #DCE0E8;padding:24px;flex-shrink:0">
    <div style="font-weight:800;color:#16171A;margin-bottom:4px">PM.O</div>
    <div style="font-size:10px;color:#1774DE;font-weight:700;letter-spacing:.1em;margin-bottom:24px">STARTER</div>
    <div style="font-size:12px;color:#1774DE;font-weight:700;background:#DFECFB;padding:8px 12px;border-radius:6px;margin-bottom:8px">Workspace</div>
    <a href="#screen-dashboard" style="font-size:12px;color:#8387C0;padding:8px 12px;display:block;text-decoration:none">← Projetos</a>
  </div>
  <div style="flex:1;padding:32px;background:#F6F7F9">
    <h2 style="margin:0 0 20px;color:#16171A">Sistema de Auth — Artefatos</h2>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
      <div style="background:white;border:1px solid #DCE0E8;border-radius:8px;padding:20px">
        <div style="font-size:11px;color:#1774DE;font-weight:700;margin-bottom:8px">Document</div>
        <div style="font-weight:700;color:#16171A">PRD: Sistema de Auth</div>
        <div style="font-size:11px;color:#8387C0;margin-top:4px">Stable · há 10 min</div>
      </div>
      <div style="background:white;border:1px solid #DCE0E8;border-radius:8px;padding:20px">
        <div style="font-size:11px;color:#1774DE;font-weight:700;margin-bottom:8px">Document</div>
        <div style="font-weight:700;color:#16171A">Product Backlog</div>
        <div style="font-size:11px;color:#8387C0;margin-top:4px">Draft · há 10 min</div>
      </div>
    </div>
  </div>
</div>`,
  },
];

export const mockAI: AIService = {
  async generateArtifacts(input: GenerateArtifactsInput): Promise<GeneratedArtifact[]> {
    await delay(1500);
    const base = MOCK_ARTIFACTS_BY_ROLE[input.role] ?? MOCK_ARTIFACTS_BY_ROLE.PO;
    return base.map((a) => ({
      ...a,
      id: `${a.id}-${Date.now()}`,
      title: a.title.replace("Mock", input.productName || "Produto"),
    }));
  },

  async generatePrototype(_prdContent: string): Promise<PrototypeScreen[]> {
    await delay(2000);
    return MOCK_PROTOTYPE_SCREENS;
  },

  async parseDocument(text: string): Promise<GenerateArtifactsInput> {
    await delay(800);
    return {
      productName: "Produto Extraído",
      mvpDeadlineWeeks: 8,
      audienceSegment: text.slice(0, 120) + "...",
      costOfInaction: "Impacto identificado no briefing",
      coreValueProp: "Proposta de valor extraída automaticamente pela IA",
      northStarMetric: "Métrica de sucesso a definir",
      outOfScope: "Fora do escopo a refinar",
      hardConstraints: "Restrições identificadas no briefing",
      role: "PO",
    };
  },
};
