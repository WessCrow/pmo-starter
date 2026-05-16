# 🎯 INDEX — Navegação Rápida

> **Versão:** 3.0 — Specialist Asks Protocol + Start-ops runtime  
> **Última atualização:** 2026-05-15

Guia de acesso rápido a todos os documentos do sistema.

---

## 🛡️ Governance & Protocolos

| Documento | Propósito | Leia quando... |
|---|---|---|
| [`governance/Start-ops.md`](governance/Start-ops.md) | **Runtime** — protocolo "Especialista que Pergunta", roteamento compacto, contexto obrigatório | **Carregar toda sessão — substitui Start.md no runtime** |
| [`governance/Start.md`](governance/Start.md) | **Referência completa** — arquitetura do sistema, decisões, filosofia | Entender o sistema ou onboarding |
| [`governance/RULES.md`](governance/RULES.md) | **Regras invioláveis** — código, HTML/W3C, CSS, Design System, acessibilidade | **Antes de qualquer execução — toda sessão** |
| [`governance/context-scoping.md`](governance/context-scoping.md) | **Protocolo V2** — o que é global vs feature-level, guardrails de qualidade, comparativo de tokens | Configurar novo projeto ou revisar o que carregar por tarefa |
| [`governance/project-start.md`](governance/project-start.md) | Protocolo de inicialização de novos projetos | Criar um projeto novo |
| [`governance/gitprotocol.md`](governance/gitprotocol.md) | Checklist de segurança antes de deploy | Fazer commit, push ou deploy |
| [`governance/prompt-engineering.md`](governance/prompt-engineering.md) | **Regras de prompt** — estrutura 4 blocos, zero persona trigger, filosofia de uso | Antes de escrever ou usar qualquer prompt de design |

---

## 📖 Diretrizes & Padrões

| Documento | Propósito | Leia quando... |
|---|---|---|
| [`guidelines/designer2627.md`](guidelines/designer2627.md) | 5 pilares de design + framework de resposta | Trabalhar com design, UX, acessibilidade |

---

## 🎨 Templates Prontos

| Documento | Propósito | Leia quando... |
|---|---|---|
| [`templates/context-template.md`](templates/context-template.md) | **Template do CONTEXT.md por projeto** — fonte global (deve ficar ≤50 linhas) | Iniciar qualquer novo projeto |
| [`templates/prd-template.md`](templates/prd-template.md) | **Template do PRD.md por projeto** — visão, personas, features, critérios de aceite, fluxos | Iniciar qualquer novo projeto |
| [`templates/feature-spec-template.md`](templates/feature-spec-template.md) | **Template do SPEC.md por feature** — entidades, fluxos, estados, decisões e estado atual da feature | Criar ou documentar uma feature | 
| [`templates/briefing-template.md`](templates/briefing-template.md) | Template para PROJECT_BRIEF (histórico) | Documentação complementar |
| [`templates/roadmap-template.md`](templates/roadmap-template.md) | Template para ROADMAP (histórico) | Documentação complementar |
| [`templates/architecture-template.md`](templates/architecture-template.md) | Template para ARCHITECTURE (histórico) | Documentação complementar |
| [`templates/herobanner-prompt.md`](templates/herobanner-prompt.md) | Template estruturado para hero banners | Criar ou revisar hero banner |
| [`templates/particle-text-effect-shadcn.md`](templates/particle-text-effect-shadcn.md) | Particle text (canvas) + shadcn/ui + TS | Integrar efeito 21st-style |
| [`templates/asmr-background-shadcn.md`](templates/asmr-background-shadcn.md) | ASMR canvas + cn, lib/utils | Fundo cinético interativo |

---

## 🏗️ Skills de Estrutura — Camada 1 (executada antes de qualquer skill funcional)

| Skill | Stack alvo |
|---|---|
| [`structure/react-vite-structure.skill`](structure/react-vite-structure.skill) | React + Vite (SPA, dashboard) |
| [`structure/nextjs-structure.skill`](structure/nextjs-structure.skill) | Next.js App Router (SSR, fullstack) |
| [`structure/frontend-structure.skill`](structure/frontend-structure.skill) | Frontend genérico (fallback) |
| [`structure/backend-structure.skill`](structure/backend-structure.skill) | API / backend / microserviço |
| [`structure/monorepo-structure.skill`](structure/monorepo-structure.skill) | Monorepo (Turborepo, Nx, pnpm) |
| [`structure/design-system-structure.skill`](structure/design-system-structure.skill) | Design System + Storybook |
| [`structure/clean-architecture.skill`](structure/clean-architecture.skill) | Clean Architecture + DDD |

---

## 🔧 Skills Locais — Camada 2 (skills funcionais)

| Skill | Domínio | Propósito |
|---|---|---|
| [`local-skills/project-starter.skill`](local-skills/project-starter.skill) | documentation | Inicializar projetos com estrutura e outputs |
| [`local-skills/web-design-cloner.skill`](local-skills/web-design-cloner.skill) | ui-visual | Clonar/decompor designs web |
| [`local-skills/ux-audit.skill`](local-skills/ux-audit.skill) | critique-audit | Auditar UX e gerar relatório priorizado |
| [`local-skills/lenis-scroll.skill`](local-skills/lenis-scroll.skill) | scroll-animation | Scroll suave controlado via Lenis + integração GSAP |
| [`local-skills/responsive-craft.skill`](local-skills/responsive-craft.skill) | responsive-layout | Responsividade sistemática — audit, build e preview multi-breakpoint |
| [`local-skills/emil-design-eng.skill`](local-skills/emil-design-eng.skill) | animation-craftsmanship | Framework de decisão de animação e polish de UI |
| [`local-skills/prompt-library.skill`](local-skills/prompt-library.skill) | prompt-structure | **20 prompts prontos** em 5 categorias — pesquisa, escrita, crítica, ideação, carreira |
| [`local-skills/figma-implement-design.skill`](local-skills/figma-implement-design.skill) | figma-to-code | Figma → código com fidelidade 1:1 — workflow 7 passos, token mapping, validação visual |
| [`local-skills/interface-design.skill`](local-skills/interface-design.skill) | ui-visual | Craft + memória de decisões + consistência sistemática por componente — design directions + system.md |
| [`local-skills/figma-make.skill`](local-skills/figma-make.skill) | prompt-structure | Guia de prompting para Figma Make — 8 práticas, template de prompt, diagnóstico de outputs ruins |

---

## 🔗 Skills Linked (Externas)

Todas em [`linked-skills/`](linked-skills/):

| Skill | Domínio |
|---|---|
| `redesign-existing-projects` | ux-product |
| `high-end-visual-design` | ui-visual |
| `kickoff-doc` | documentation |
| `design-taste-frontend` | frontend |
| `full-output-enforcement` | documentation |
| `industrial-brutalist-ui` | ui-visual |
| `minimalist-ui` | ui-visual |
| `stitch-design-taste` | ui-visual |
| `firecrawl-scrape` | research-discovery |

---

## 📤 Outputs do Projeto (Documentação Viva)

| Documento | Propósito | Atualizar quando... |
|---|---|---|
| [`outputs/PROJECT_BRIEF.md`](outputs/PROJECT_BRIEF.md) | Visão geral, objetivo, contexto | Escopo ou objetivo mudar |
| [`outputs/ROADMAP.md`](outputs/ROADMAP.md) | Fases, prioridades, próximos passos | A cada sessão significativa |
| [`outputs/ARCHITECTURE.md`](outputs/ARCHITECTURE.md) | Decisões técnicas e estrutura | Nova decisão arquitetural |

---

## 🗄️ Cache

| Pasta | Propósito |
|---|---|
| [`cache/remote-skills/`](cache/remote-skills/) | Skills baixadas de skills.sh para execução local |

---

> **Roteamento de skills:** ver [`governance/Start-ops.md`](governance/Start-ops.md) — única fonte de verdade para decisão de qual skill usar.

**Última atualização:** 2026-05-15 — v3.0 Specialist Asks Protocol
