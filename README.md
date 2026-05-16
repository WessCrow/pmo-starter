# P.M.O-STARTER

> Da ideia ao PRD — em minutos, não em dias.

Plataforma web para **documentação e protótipo assistidos por IA** (fase atual com **serviços mock**). Fluxo principal: **`/project/new`** — chat ou upload de briefing, preview ao vivo, escolha de papéis (PM / PO / GP), geração de artefatos Markdown e preview de telas HTML.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Linguagem | TypeScript |
| UI | Tailwind CSS v4, shadcn/ui, Radix |
| Estado (MVP) | React Context (`modules/prd/context`) |
| Dados / IA (MVP) | Mocks em `services/ai`, `services/storage` |
| Documentação dev | Storybook 10 (`pnpm storybook`) |

**Planejado:** Supabase, LLM real, auth — ver `PRD.md` e `CONTEXT.md`.

---

## Como rodar

```bash
pnpm install
pnpm dev
```

- App: http://localhost:3000 (Turbopack)  
- Storybook: `pnpm storybook` → http://localhost:6006  

Build: `pnpm build` · Lint: `pnpm lint`

---

## Documentação

| Arquivo | Conteúdo |
|---|---|
| **[CONTEXT.md](./CONTEXT.md)** | Stack, DS, estado do MVP, decisões, armadilhas — **ler primeiro em cada sessão** |
| **[PRD.md](./PRD.md)** | Visão, features, critérios de aceite, rotas |
| **[skills/governance/RULES.md](./skills/governance/RULES.md)** | Regras de código, HTML, CSS, WCAG, segurança |
| **[skills/governance/Start.md](./skills/governance/Start.md)** | Orquestração de skills e governance |
| **[skills/outputs/PROJECT_BRIEF.md](./skills/outputs/PROJECT_BRIEF.md)** | Brief narrativo do produto |
| **[skills/outputs/ROADMAP.md](./skills/outputs/ROADMAP.md)** | Fases e próximos passos |
| **[skills/outputs/ARCHITECTURE.md](./skills/outputs/ARCHITECTURE.md)** | Arquitetura técnica do app |

---

## Rotas úteis (MVP)

- **`/`** — landing  
- **`/project/new`** — criação de projeto (chat + upload + preview)  
- **`/project/workspace`** — workspace (em evolução)

---

## Estrutura do repositório

```
app/              rotas e layouts
components/ui/    primitivos shadcn
modules/          prd, workspace (features)
lib/              utilitários (ex.: inline-format para texto IA seguro)
services/         integrações (mock)
skills/           governance + outputs do produto
```

---

## Contribuir / agentes de IA

1. Ler **`CONTEXT.md`** e **`skills/governance/RULES.md`**.  
2. Implementar conforme **`PRD.md`**.  
3. Ao encerrar trabalho relevante, atualizar **CONTEXT** (e PRD se escopo mudar).
