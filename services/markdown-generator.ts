/**
 * Markdown Generator — Termo de Abertura Estratégico
 *
 * Gera um documento de 1 página com 3 fases (Diagnóstico, Valor, Escopo)
 * a partir dos 7 campos estratégicos coletados no chat /start.
 */

import type { ProjectInput } from "@/modules/prd/context/new-project-context";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface MarkdownGeneratorInput extends Partial<ProjectInput> {
  role?: "PM" | "PO" | "GP";
  projectId?: string;
  generatedAt?: Date;
}

export interface MarkdownOutput {
  simple: string;
  withFrontmatter: string;
  filename: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safe(value: string | number | undefined, fallback = "_a preencher_"): string {
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
}

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "produto";
}

function formatISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// ─── Gerador ─────────────────────────────────────────────────────────────────

export class MarkdownGenerator {
  static generatePRD(input: MarkdownGeneratorInput): MarkdownOutput {
    const timestamp = input.generatedAt ?? new Date();
    const role = input.role ?? "PM";
    const slug = slugify(input.productName ?? "produto");
    const filename = `termo-abertura-${slug}-${formatISO(timestamp)}.md`;

    const content = this.buildContent(input, timestamp);
    const frontmatter = this.buildFrontmatter(input, timestamp, role);

    return {
      simple: content,
      withFrontmatter: `${frontmatter}\n\n${content}`,
      filename,
    };
  }

  private static buildContent(input: MarkdownGeneratorInput, timestamp: Date): string {
    const deadline = input.mvpDeadlineWeeks
      ? `${input.mvpDeadlineWeeks} semana${input.mvpDeadlineWeeks > 1 ? "s" : ""}`
      : "_prazo a definir_";

    return `# Termo de Abertura Estratégico — ${safe(input.productName, "Produto")}

> **Prazo do MVP:** ${deadline} · **Gerado em:** ${formatISO(timestamp)}

Documento de página única que substitui PRDs descritivos longos. Atua como termo de abertura, conferindo autonomia consultiva a UX e Engenharia para desenharem a melhor solução a partir dos objetivos de negócio chancelados.

---

## 🎯 Fase 1 — Diagnóstico & Impacto de Negócio

### Diretriz 1 · Segmentação de alta prioridade e comportamento atual
**Quem detém a dor e como ela é mitigada hoje?**

${safe(input.audienceSegment)}

### Diretriz 2 · Custo da Inação
**Impacto financeiro, operacional ou reputacional de não resolver no ciclo atual:**

${safe(input.costOfInaction)}

---

## 💡 Fase 2 — Proposta de Valor & Validação

### Diretriz 3 · Atributo de Diferenciação Crítica
**Capacidade central e indispensável que diferencia o produto:**

${safe(input.coreValueProp)}

### Diretriz 4 · North Star Metric do MVP
**Comportamento mensurável que evidencia a resolução da dor:**

${safe(input.northStarMetric)}

---

## 🔧 Fase 3 — Escopo de Negócio & Restrições

### Diretriz 5 · Fronteiras de Escopo (Descarte Estratégico)
**Para entregar em ${deadline}, o que fica deliberadamente fora desta rodada:**

${safe(input.outOfScope)}

### Diretriz 6 · Hard Constraints (Restrições Inegociáveis)
**Limites institucionais, orçamentários, de conformidade legal ou prazos regulatórios:**

${safe(input.hardConstraints)}

---

## 📊 Matriz de Eficiência Corporativa

| Dimensão | PRD Tradicional | Termo de Abertura Compacto |
|---|---|---|
| Tempo de elaboração | Extenso (propenso a obsolescência) | Ágil, focado em tomada de decisão |
| Natureza do input | Descritiva, viés técnico prematuro | Analítica, foco em trade-offs |
| Dinâmica interfuncional | Eng e UX recebem specs prontas | Eng e UX co-criam sob restrições claras |

---

## 📑 Nota de Governança

Este artefato confere autonomia consultiva aos líderes de UX e Tecnologia para desenharem a melhor solução técnica e de usabilidade a partir dos objetivos de negócio previamente chancelados. Não substitui specs técnicas detalhadas — atua como guarda-corpo decisório de alto nível.

**Responsável (${input.role ?? "PM"}):** _a designar_
**Próxima revisão:** ao fim do ciclo de ${deadline}
`;
  }

  private static buildFrontmatter(
    input: MarkdownGeneratorInput,
    timestamp: Date,
    role: string
  ): string {
    const lines = [
      "---",
      `title: "Termo de Abertura — ${safe(input.productName, "Produto")}"`,
      `type: termo-de-abertura`,
      `role: ${role}`,
      `mvp_deadline_weeks: ${input.mvpDeadlineWeeks ?? "null"}`,
      `generated_at: ${timestamp.toISOString()}`,
    ];
    if (input.projectId) lines.push(`project_id: ${input.projectId}`);
    lines.push("tags: [pmo-starter, termo-abertura, mvp]");
    lines.push("---");
    return lines.join("\n");
  }
}

// ─── Exportações ────────────────────────────────────────────────────────────

export function generateMarkdownPRD(input: MarkdownGeneratorInput): MarkdownOutput {
  return MarkdownGenerator.generatePRD(input);
}
