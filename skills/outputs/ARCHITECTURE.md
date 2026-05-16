# ARCHITECTURE — P.M.O-STARTER

> **Escopo:** aplicação web P.M.O-STARTER  
> **Última atualização:** 2026-05-15

---

## Visão geral

- **Tipo:** SPA/MPA híbrida com **Next.js 16 App Router**.  
- **Padrão:** UI em **Client Components** onde há estado (chat, painéis); servidor padrão para layouts e páginas estáticas quando aplicável.  
- **Fronteira de domínio:** pastas **`modules/*`** por feature; **HTTP e persistência** encapsulados em **`services/*`** (hoje **implementações mock**).

---

## Camadas

```
┌─────────────────────────────────────────┐
│ app/ (rotas, layouts)                    │
├─────────────────────────────────────────┤
│ modules/prd (UI + NewProjectProvider)    │
│ modules/workspace                        │
├─────────────────────────────────────────┤
│ components/ui (shadcn) · lib/ (utils)  │
├─────────────────────────────────────────┤
│ services/ai · services/storage (mock)   │
└─────────────────────────────────────────┘
```

---

## Fluxo: novo projeto (`/project/new`)

1. **`NewProjectProvider`** mantém: modo de entrada (`chat` | `upload`), mensagens, fase, `collectedData`, papéis selecionados, `flowState`, artefatos, telas de protótipo, aba de preview.  
2. **Chat:** `sendMessage` / `editMessage` avançam perguntas mock e preenchem `collectedData`.  
3. **Upload:** `submitUpload` chama `aiService.parseDocument` (mock) e dispara `generateArtifactsFrom`.  
4. **Geração:** `generateArtifactsFrom` chama `aiService.generateArtifacts` por papel, `storageService.saveArtifacts`, opcionalmente `aiService.generatePrototype`.  
5. **UI:** `ResizablePanelGroup` (esquerda entrada / direita `PreviewPanel`); estados `generating` / `done` substituem o painel esquerdo.

---

## Renderização de conteúdo rico

- **`lib/inline-format.tsx`** — interpreta `**negrito**` e trechos entre acento grave (código inline) sem injeção HTML (mensagens da IA no chat).  
- **`modules/prd/components/simple-markdown.tsx`** — markdown mínimo para artefatos no preview, reutilizando o mesmo parser de linha.

Objetivo: cumprir **`skills/governance/RULES.md`** (sem `dangerouslySetInnerHTML` não sanitizado para conteúdo dinâmico da IA).

---

## Acessibilidade e layout (decisões recentes)

- Página novo projeto: **`<header>`** + **`<main>`** envolvendo o split.  
- Seletor de modo: **`role="tablist"`** + **`tab`/`tabpanel`** com ids estáveis.  
- Preview (pós-geração): **tablist** para documentos; **tabpanel** único com `aria-labelledby` dinâmico.  
- Chat: **`role="log"`** + **`aria-live="polite"`**; botões apenas-ícone com **`aria-label`**.  
- Viewport: **`h-dvh`** e **`min-h-0`** em cadeias flex para scroll correto em mobile.  
- **Tipografia:** `text-base` no `body` (`globals.css`).

---

## Dados e contratos (MVP)

- **`services/ai`:** tipos `GeneratedArtifact`, `PrototypeScreen`, funções async simuladas.  
- **`services/storage`:** persistência simulada (ex.: memória/local).  
- Substituição futura: manter **assinaturas** ou camada fina `api/*` para não refatorar componentes.

---

## Tooling

- **ESLint** (`next lint`)  
- **Storybook** 10 + addon a11y  
- **Turbopack** em `next dev`  
- **TypeScript** estrito no código novo; existem pendências em arquivos legados não usados no fluxo principal.

---

## Histórico

| Data | Mudança |
|---|---|
| 2026-05-15 | Documento reescrito para PMO-STARTER; stack atualizada (Next 16, camada segura de texto, A11y) |
| 2026-05-10 | Conteúdo anterior descrevia sistema de skills STARTER — substituído |
