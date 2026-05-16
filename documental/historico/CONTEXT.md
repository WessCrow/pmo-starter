# CONTEXT.md — P.M.O-STARTER

> **Arquivo:** `CONTEXT.md` — raiz do projeto P.M.O-STARTER  
> **Propósito:** Contexto operacional único. Lido no início de toda sessão antes de qualquer execução.  
> **Especificação do produto:** `PRD.md` (v2.0 — reescrito com 7-section template)  
> **Governança de código/UI:** `skills/governance/RULES.md` (obrigatório antes de implementar)  
> **Atualizar:** ao final de cada sessão de trabalho.  
> **Última atualização:** 2026-05-16 (sessão 4 — limpeza de código morto + PRD reescrita v2.0)

---

## Stack e estrutura

| Item | Valor |
|---|---|
| Framework | **Next.js 16** (App Router) + **React 19** |
| Linguagem | TypeScript |
| Estilos | **Tailwind CSS v4** (`@theme` em `app/globals.css`) + **shadcn/ui** |
| Structure skill | `nextjs-structure.skill` |
| Alias imports | `@/` → raiz do projeto |
| Package manager | **pnpm** (scripts também referenciam `pnpm`; usar `npx` se pnpm não estiver no PATH) |

---

## Design System

**Base:** shadcn/ui + tokens Zera/Einstein em `app/globals.css` (`--color-primary`, `--color-zds-*`, `--font-sans` Inter, `--font-heading` Work Sans, `--font-mono` Inconsolata, espaçamentos `--spacing-zds-*`, raios `--radius-zds-*`).

**Utilitários de projeto:** `shadow-premium`, `glass`, `glass-dark`, `glow-blue`, animações utilitárias.

**Componentes UI já presentes (não recriar sem checar):** Button, Card, Dialog, Input, Label, Textarea, Select, Checkbox, Switch, Table, Badge, Avatar, Separator, Skeleton, Tooltip, Tabs, DropdownMenu, Sheet, Sonner, **ScrollArea**, **ResizablePanel*** (painéis redimensionáveis no novo projeto).

**Regra:** Antes de criar componente, verificar esta lista e `components/ui/`.

**Boas práticas recentes:** corpo com **text-base (1rem)**; sem `dangerouslySetInnerHTML` para texto da IA — usar `modules/prd/components/simple-markdown.tsx` e `lib/inline-format.tsx`.

---

## Estado atual do projeto

| Campo | Valor |
|---|---|
| **Fase** | MVP — Feature 1 **funcional** em `/project/new`; Features 2–4 parciais ou fora do escopo |
| **Último trabalho** | Passagem de **governança web** (`Start.md` + `RULES.md`): acessibilidade (tablist/tabpanel, `aria-live`, labels, foco visível), semântica (`main`, `header`, `article`), tipografia móvel, renderização segura de mensagens; documentação sincronizada (`PRD`, `CONTEXT`, `README`, `skills/outputs`) |
| **Rotas ativas** | `/` (marketing), `/project/new`, `/project/workspace` |
| **Entrada novo projeto** | **Chat com IA** e **Upload / arquivo** (sem aba formulário) |
| **Fluxo** | 3 fases no chat → papéis PM/PO/GP → gerar → preview (visão geral, `.md`, protótipo em iframe) → download `.md` / HTML |
| **Double Check** | Arquivado em `/archive/components/` — Feature 2 (backlog) |
| **Dados** | `services/ai` e `services/storage` **mock** |
| **Próximo passo sugerido** | Protótipo navegável dedicado (`/project/prototype/[id]`) ou integrar/remover Double Check e componentes órfãos |
| **Bloqueios** | Nenhum crítico; auth e DB fora do MVP |

---

## Integrações

| Serviço | Uso | Status |
|---|---|---|
| Mock `services/ai` | Geração de artefatos, parsing, protótipo HTML | Ativo |
| Mock `services/storage` | Persistência local simulada | Ativo |
| Supabase | Auth + DB | Planejado |
| LLM (OpenAI / Claude) | Produção | Planejado |
| Stripe | Só se produto comercial | Backlog |

---

## Decisões (não reverter sem motivo)

| Decisão | Motivo |
|---|---|
| Next.js App Router + Server Components padrão | Performance e modelo de dados no servidor |
| Tailwind v4 + tokens em CSS | DS consistente; evitar CSS ad hoc |
| Módulos por domínio `modules/prd`, `workspace`, etc. | Baixo acoplamento |
| Contratos em `services/*` | Trocar mock por HTTP sem reescrever UI |
| `RULES.md` + renderização segura | WCAG e segurança (sem HTML cru da IA) |
| `h-dvh` + `min-h-0` em layouts com painéis | Comportamento estável em mobile |

---

## Estrutura de pastas (simplificada — ver repo para detalhe)

```
P.M.O-STARTER/
├── CONTEXT.md
├── PRD.md
├── README.md
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── (marketing)/page.tsx
│   └── project/
│       ├── new/page.tsx          ← fluxo principal MVP
│       └── workspace/page.tsx
├── components/ui/                 ← shadcn (evitar edição direta)
├── modules/prd/                   ← contexto, chat, upload, preview, markdown
├── modules/workspace/
├── lib/                           ← utils, inline-format.tsx
├── services/                      ← ai, storage (mock)
├── skills/
│   ├── governance/                ← RULES.md, Start.md
│   └── outputs/                   ← PROJECT_BRIEF, ROADMAP, ARCHITECTURE (produto)
```

**Onde colocar código novo:** feature → `modules/[feature]/`; UI reutilizável de negócio → `components/shared/`; primitivo novo → adicionar via shadcn/wrapper.

---

## Armadilhas

- Não usar `fetch` solto em Client Components sem padrão do projeto (hooks / Server Actions).
- Preferir **não** editar `components/ui/*` — usar wrapper em `components/shared/`.
- Tailwind v4: tema em CSS; não misturar convenções v3 sem motivo.
- **Código morto** — remover regularmente. Componentes não usados foram arquivados em `/archive/`.
- `pnpm` nos scripts do `package.json`; ambiente local pode precisar de `npx` para CLI.

---

## Componentes Arquivados (Backlog)

| Componente | Motivo | Data | Status |
|---|---|---|---|
| `double-check.tsx` | Feature 2 (Double Check flow) — não integrada ao MVP | 2026-05-16 | Arquivado em `archive/components/` |

**Onde encontrar:** `/archive/components/double-check.tsx.archived`  
**Quando revisitar:** Após Feature 1 estabilizada em produção  
**Como restaurar:** `cp archive/components/double-check.tsx.archived modules/prd/components/double-check.tsx`

---

## Código Removido (v2026-05-16)

| O que | Motivo |
|---|---|
| `submitForm` método | Modo formulário nunca foi implementado na UI |
| `formInput` state | Dependência de `submitForm` |
| `setFormInput` callback | Dependência de `submitForm` |
| `form-panel.tsx` | Componente órfão (nunca usado) |
| `form-panel.stories.tsx` | Story órfã |

**Impacto:** Contexto 15 linhas menor, interface mais limpa, sem código morto confundindo novos devs.
