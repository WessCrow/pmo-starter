/**
 * Markdown Generator Service
 *
 * Converte dados coletados no chat em PRD estruturado em Markdown
 * com suporte para múltiplos formatos de download:
 * - Simple MD (.md)
 * - MD com YAML frontmatter (.md)
 * - ZIP com todos os artefatos (.zip)
 */

import type { ProjectInput } from "@/modules/prd/context/new-project-context";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface MarkdownGeneratorInput extends Partial<ProjectInput> {
  role?: "PM" | "PO" | "GP";
  projectId?: string;
  generatedAt?: Date;
}

export interface MarkdownOutput {
  simple: string; // Markdown simples
  withFrontmatter: string; // Markdown com YAML frontmatter
  filename: string; // Nome sugerido para o arquivo
}

// ─── Gerador de PRD em Markdown ────────────────────────────────────────────

export class MarkdownGenerator {
  /**
   * Gera PRD estruturado em Markdown baseado nos dados coletados
   */
  static generatePRD(input: MarkdownGeneratorInput): MarkdownOutput {
    const filename = `PRD-${input.productName?.replace(/\s+/g, "-") || "Produto"}-${Date.now()}.md`;
    const timestamp = input.generatedAt || new Date();
    const role = input.role || "PM";

    // Conteúdo principal em Markdown
    const content = this.buildPRDContent(input);

    // Markdown simples (sem frontmatter)
    const simple = content;

    // Markdown com YAML frontmatter
    const frontmatter = this.buildYAMLFrontmatter(input, timestamp, role);
    const withFrontmatter = `${frontmatter}\n\n${content}`;

    return {
      simple,
      withFrontmatter,
      filename,
    };
  }

  /**
   * Constrói o conteúdo principal do PRD em Markdown
   */
  private static buildPRDContent(input: MarkdownGeneratorInput): string {
    return `# PRD — ${input.productName || "Produto"}

> **Gerado em:** ${new Date().toLocaleDateString("pt-BR")}
> **Versão:** 1.0
> **Status:** Em planejamento

---

## 1. Alinhamento Estratégico & Outcomes

### Visão Geral

${input.problem || "Descrição estratégica não informada"}

### O Problema

${input.impactOfProblem ? `#### Contexto & Impacto\n\n${input.impactOfProblem}\n\n` : ""}#### Fluxo Atual

${input.currentWorkflow || "Descrição do fluxo atual não informada"}

---

## 2. O Problema sob a Ótica do Usuário

### Público-Alvo

${input.audience || "Descrição do público-alvo não informada"}

### Impacto da Dor

${input.impactOfProblem || "Impacto não quantificado"}

---

## 3. Escopo da Solução (MVP)

### O Que Está Dentro

${input.minimumMVPScope || "Escopo não definido"}

### O Que Está Fora

${this.extractOutOfScope(input)}

### Hipóteses de Valor

**Hipótese Principal:**
> Acreditamos que ao implementar ${input.minimumMVPScope?.split("\n")?.[0] || "esta solução"}, conseguiremos validar se ${input.solution?.split("\n")?.[0] || "a solução funciona"}.

---

## 4. Jornada do Usuário & Requisitos

### Fluxo Principal

${input.solution || "Fluxo não descrito"}

### Cenários Alternativos

Documentar baseado em ${input.targetRoles || "papéis não informados"}

---

## 5. Casos de Borda e Tratamento de Erros

### Estados Vazios

- Primeira utilização
- Sem dados coletados
- Erro na coleta

### Recuperação de Erros

A ser documentado conforme implementação

---

## 6. Lógica de Sistemas & Impacto Operacional

### Dependências Técnicas

${input.dependencies || "Dependências não informadas"}

### Políticas e Compliance

- WCAG 2.1 AA (acessibilidade)
- LGPD (proteção de dados)

---

## 7. Critérios de Aceite Técnicos

### Critério 1 — Funcionalidade Principal

**Dado que** o usuário acessa a plataforma
**Quando** ${input.solution?.split("\n")?.[0] || "interage com o sistema"}
**Então:**
- [ ] ${input.minimumMVPScope?.split("\n")?.[0] || "Resultado esperado"}
- [ ] Sistema responde corretamente
- [ ] Dados são persistidos

**Aceitação:** Todos os itens marcados ✓

---

## Roadmap & Evolução

### MVP (Próximas semanas)

${this.buildRoadmapPhase(input.minimumMVPScope, "MVP")}

### v1.5 (Próximo mês)

A definir baseado em feedback

### v2.0+ (Futuro)

${input.roadmapPhases || "Roadmap não informado"}

---

## Referências

| Tipo | Link | Propósito |
|------|------|----------|
| Pesquisa | [A preencher] | Validação de problema |
| Protótipo | [A preencher] | User flows |
| Rastreamento | [A preencher] | Backlog de tarefas |

---

**Próximo passo:** Validar com stakeholders e engenharia antes de implementar.

> Este PRD foi gerado automaticamente. Revise, customize e aprove antes de usar como especificação técnica.
`;
  }

  /**
   * Constrói o frontmatter YAML
   */
  private static buildYAMLFrontmatter(
    input: MarkdownGeneratorInput,
    timestamp: Date,
    role: string
  ): string {
    return `---
title: "PRD — ${input.productName || "Produto"}"
author: "${role}"
date: ${timestamp.toISOString()}
version: "1.0"
status: "planning"
product: "${input.productName || "Untitled"}"
problem: "${(input.problem || "").substring(0, 100)}"
audience: "${(input.audience || "").substring(0, 100)}"
---`;
  }

  /**
   * Extrai o que está fora do escopo
   */
  private static extractOutOfScope(input: MarkdownGeneratorInput): string {
    const hasConstraints = input.constraints && input.constraints.length > 20;
    if (hasConstraints) {
      return `${input.constraints}\n\n**Motivo da deferência:** Fora do escopo MVP para validação rápida.`;
    }
    return "A ser definido conforme negociação";
  }

  /**
   * Constrói uma fase do roadmap
   */
  private static buildRoadmapPhase(scope: string | undefined, phase: string): string {
    if (!scope) return `- [ ] Funcionalidade 1\n- [ ] Funcionalidade 2\n- [ ] Testes`;
    return `- [x] ${scope.split("\n")[0] || "Feature 1"}\n- [ ] Testes\n- [ ] Deploy`;
  }

  /**
   * Gera um resumo executivo em Markdown
   */
  static generateExecutiveSummary(input: MarkdownGeneratorInput): string {
    return `# Resumo Executivo — ${input.productName}

## Em uma linha
${input.problem || "Descrição não informada"}

## O Público
${input.audience?.split("\n")?.[0] || "Público não definido"}

## A Solução
${input.solution?.split("\n")?.[0] || "Solução não descrita"}

## Métricas de Sucesso
${input.successMetrics || "Métricas não definidas"}

## Prazo & Restrições
${input.constraints || "Sem restrições informadas"}

---

*Gerado automaticamente. Revise antes de compartilhar.*
`;
  }

  /**
   * Gera um documento de roadmap em Markdown
   */
  static generateRoadmap(input: MarkdownGeneratorInput): string {
    return `# Roadmap — ${input.productName}

## Visão Geral

${input.roadmapPhases || "Roadmap não informado"}

## Timeline

| Fase | Período | Objetivos | Status |
|------|---------|-----------|--------|
| MVP | Próximas semanas | ${input.minimumMVPScope?.split("\n")?.[0] || "MVP"} | Em planejamento |
| v1.5 | Próximo mês | Melhorias baseadas em feedback | Backlog |
| v2.0+ | Futuro | Expansão de features | Futuro |

---

*Este roadmap pode ser ajustado conforme aprendemos com usuários.*
`;
  }

  /**
   * Gera arquivo de especificação técnica
   */
  static generateTechnicalSpec(input: MarkdownGeneratorInput): string {
    return `# Especificação Técnica — ${input.productName}

## Dependências

${input.dependencies || "A ser preenchido"}

## Integração com Sistemas Existentes

- [ ] API de autenticação
- [ ] Banco de dados
- [ ] Serviços de terceiros

## Performance

- Tempo de resposta: < 200ms
- Uptime: > 99.5%
- Throughput: > 1000 requisições/s

## Segurança

- HTTPS obrigatório
- Autenticação via OAuth/SAML
- Criptografia de dados sensíveis
- Conformidade LGPD

---

*A ser detalhado pelo time de engenharia.*
`;
  }
}

// ─── Exportações ────────────────────────────────────────────────────────────

export function generateMarkdownPRD(input: MarkdownGeneratorInput): MarkdownOutput {
  return MarkdownGenerator.generatePRD(input);
}

export function generateMarkdownSummary(input: MarkdownGeneratorInput): string {
  return MarkdownGenerator.generateExecutiveSummary(input);
}

export function generateMarkdownRoadmap(input: MarkdownGeneratorInput): string {
  return MarkdownGenerator.generateRoadmap(input);
}

export function generateMarkdownSpec(input: MarkdownGeneratorInput): string {
  return MarkdownGenerator.generateTechnicalSpec(input);
}
