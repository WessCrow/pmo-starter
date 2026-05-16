# PMO-STARTER — Especificação Completa do Produto

> **Versão:** 1.6 (pós-redesign /start)
> **Última atualização:** 2026-05-16
> **Repositório:** https://github.com/WessCrow/pmo-starter
> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript estrito · Tailwind v4 · Turbopack

---

## 1. Sumário Executivo

**PMO-STARTER** é uma ferramenta de bootstrap estratégico para iniciativas de produto digital. Em vez de produzir PRDs descritivos longos de 20–40 páginas (que envelhecem mal e prematuramente travam decisões técnicas), o produto gera um **Termo de Abertura Estratégico** de **uma única página**, focado em decisões de negócio e trade-offs.

A ferramenta substitui semanas de redação por uma conversa guiada de ~10 minutos com 7 perguntas decisórias, organizadas em 4 fases: Setup, Diagnóstico, Proposta de Valor e Escopo.

### 1.1 Proposta de valor em uma frase

> **"Pare de escrever PRDs longos. Decida em 1 página."**

### 1.2 Tese de fundo

PRDs longos são um anti-padrão por três motivos:

1. **Envelhecem antes de serem lidos.** Especificações detalhadas escritas antes da co-criação com Eng/UX se tornam obsoletas no primeiro sprint.
2. **Carregam viés técnico prematuro.** PMs descrevem soluções específicas no documento, fechando o espaço de design.
3. **Tornam Engenharia e UX consumidores de spec, não co-autores.** Isso destrói qualidade de produto.

O termo de abertura compacto inverte essa dinâmica: define os objetivos de negócio e restrições inegociáveis, deixando o "como" para os times técnicos co-criarem.

---

## 2. Personas & Público-Alvo

### 2.1 Persona Primária — Product Manager Sênior

- **Contexto:** Lidera 2–5 iniciativas paralelas, reporta a diretoria/VP, precisa alinhar Eng e UX rapidamente.
- **Dor:** Gasta 15–30h por iniciativa redigindo PRDs que ninguém lê inteiro. Após o kickoff, o documento vira artefato morto.
- **Objetivo com PMO-STARTER:** Ter um termo decisório em <30 min para chancela executiva e kickoff técnico.

### 2.2 Persona Secundária — Product Owner / Tech Lead atuando como PO

- **Contexto:** Foco em sprint zero e descoberta técnica. Precisa de clareza de escopo e restrições para validar arquitetura.
- **Dor:** Recebe PRDs vagos onde "tudo é must-have" e ninguém quantificou o custo da inação.
- **Objetivo:** Termo com **fronteiras de escopo explícitas** (Diretriz 5) e **hard constraints** (Diretriz 6).

### 2.3 Persona Terciária — Gerente de Projetos (GP)

- **Contexto:** Coordena cronograma, orçamento, dependências interdepartamentais.
- **Dor:** PRDs descritivos não falam de prazo, orçamento, conformidade — informação que ele precisa garimpar.
- **Objetivo:** Documento que já vem com **Custo da Inação** (Diretriz 2), **prazo do MVP** (Setup), e **Hard Constraints** (Diretriz 6) explícitos.

---

## 3. Arquitetura do Fluxo `/start`

O fluxo de criação está sob a rota **`/project/new`** (a entrada `/start` será adicionada como alias na v1.7 — ver Roadmap).

### 3.1 Estrutura de 4 fases · 7 perguntas

```
┌─────────────────────────────────────────────────────────────┐
│ FASE 0 — Setup (1 pergunta)                                 │
│ • Nome do produto + prazo-alvo do MVP em semanas            │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ FASE 1 — Diagnóstico & Impacto de Negócio (2 perguntas)     │
│ • D1: Segmentação & comportamento atual                     │
│ • D2: Custo da Inação                                       │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ FASE 2 — Proposta de Valor & Validação (2 perguntas)        │
│ • D3: Atributo de Diferenciação Crítica                     │
│ • D4: North Star Metric do MVP                              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ FASE 3 — Escopo & Restrições (2 perguntas)                  │
│ • D5: Fronteiras de Escopo (com prazo injetado)             │
│ • D6: Hard Constraints (legais, orçamentárias, regulatórias)│
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Schema de dados — `ProjectInput`

```ts
interface ProjectInput {
  // Setup
  productName: string;
  mvpDeadlineWeeks: number;

  // Fase 1
  audienceSegment: string;
  costOfInaction: string;

  // Fase 2
  coreValueProp: string;
  northStarMetric: string;

  // Fase 3
  outOfScope: string;
  hardConstraints: string;
}
```

**Total:** 8 campos (vs. 13 do PRD descritivo legado).

### 3.3 As 6 Diretrizes em detalhe

| # | Nome | Objetivo | Exemplo de boa resposta |
|---|---|---|---|
| **D1** | Segmentação & comportamento atual | Identificar o detentor do problema e validar a existência de "gambiarras" — prova social da relevância da demanda. | "Diretores financeiros de médias empresas (50–500 colaboradores) que operam com 3+ adquirentes; mitigam exportando relatórios fragmentados para planilhas manuais — 12h/semana de analistas seniors." |
| **D2** | Custo da Inação | Quantificar o prejuízo da inércia para justificar o custo de oportunidade. | "Multa fiscal estimada de R$200k/ano, perda de 8% na margem operacional por retrabalho técnico, exposição reputacional perante auditorias externas." |
| **D3** | Atributo de Diferenciação Crítica | Isolar a proposta de valor central que guia a arquitetura de informação. | "Automação de conciliação multi-adquirentes em interface unificada com acionamento em comando único — elimina pivoteamento entre planilhas e portais." |
| **D4** | North Star Metric do MVP | Definir critério de sucesso do teste de conceito, evitando métricas tardias (churn, NPS). | "Taxa de conclusão do fluxo principal >75% sem acionamento de help desk no primeiro acesso, medida no D+7." |
| **D5** | Fronteiras de Escopo | Mitigar scope creep delimitando o que está fora do MVP — com prazo injetado dinamicamente no enunciado. | "Em 8 semanas, integrações via API com adquirentes, notificações push em tempo real e dashboards customizáveis ficam postergados para Fase 2." |
| **D6** | Hard Constraints | Mapear riscos macro de compliance e negócio. | "Aderência total à LGPD; teto Capex de R$150k; auditoria SOC 2 Type I antes do go-live; janela regulatória até 30/Nov." |

### 3.4 Injeção dinâmica de prazo na D5

O enunciado da D5 contém o placeholder `{deadline}`, substituído em runtime pelo valor de `mvpDeadlineWeeks` capturado no Setup. Implementação em [modules/prd/context/new-project-context.tsx](../modules/prd/context/new-project-context.tsx):

```ts
function renderQuestion(template: string, data: Partial<ProjectInput>): string {
  const deadline = data.mvpDeadlineWeeks
    ? `${data.mvpDeadlineWeeks} semana${data.mvpDeadlineWeeks > 1 ? "s" : ""}`
    : "X semanas";
  return template.replace("{deadline}", deadline);
}
```

---

## 4. Mapa de Telas

| Rota | Arquivo | Função |
|---|---|---|
| `/` | [app/(marketing)/page.tsx](../app/(marketing)/page.tsx) | Landing com hero, CTA, mock visual de termo, grid das 6 diretrizes |
| `/preview-termo` | [app/preview-termo/page.tsx](../app/preview-termo/page.tsx) | Termo de abertura renderizado (exemplo ConciliaPay) com markdown→JSX inline |
| `/project/new` | [app/project/new/page.tsx](../app/project/new/page.tsx) | Fluxo principal: chat à esquerda + preview ao vivo à direita |
| `/project/workspace` | [app/project/workspace/page.tsx](../app/project/workspace/page.tsx) | Placeholder — workspace de artefatos gerados (v1.7) |

### 4.1 Layout de `/project/new`

```
┌──────────────────────────────────────────────────────────────┐
│ HEADER: Logo · Status pills (Setup/D1/D2/D3) · Versão       │
├────────────────────────┬─────────────────────────────────────┤
│                        │                                     │
│   LEFT PANEL           │   RIGHT PANEL                       │
│   ────────────         │   ──────────────                    │
│   ┌──────────────────┐ │   PreviewPanelV2                    │
│   │ ModeSelector     │ │   ──────────────                    │
│   │ [Chat] [Upload]  │ │   • Setup card (produto + prazo)   │
│   └──────────────────┘ │   • Fase 1 card (vermelho)          │
│                        │   • Fase 2 card (azul)              │
│   ChatPanel ou         │   • Fase 3 card (laranja)           │
│   UploadPanel          │   • Progress bar (7 perguntas)      │
│                        │   • Quick stats (3 colunas)         │
│                        │                                     │
└────────────────────────┴─────────────────────────────────────┘
```

Quando `flowState === "generating"`, o painel esquerdo vira `GeneratingPanel` (loader animado).
Quando `flowState === "done"`, vira `DonePanel` com `DownloadOptions` embutido.

### 4.2 Estados do fluxo

| `flowState` | Painel esquerdo | Painel direito |
|---|---|---|
| `input` | Chat ou Upload | `PreviewPanelV2` (live) |
| `generating` | Loader "Estruturando termo de abertura" | `PreviewPanel` (legacy, mostra dados coletados) |
| `done` | "Termo concluído" + `DownloadOptions` | `PreviewPanel` com artefatos gerados |

---

## 5. Features Atuais (v1.6)

### 5.1 Coleta conversacional

- **Chat guiado** com 7 perguntas estratégicas em 4 fases.
- **Sugestão de resposta-mock** disponível em cada pergunta (acelera demos).
- **Edição retroativa**: clicar em uma resposta antiga abre edição inline — `editMessage()` invalida dados subsequentes via `fieldsAfter()` (regra: alterar uma pergunta zera as fases posteriores).
- **Modo Upload** (alternativo): cola um briefing em texto livre e a IA mock extrai os 7 campos via `parseDocument()`.

### 5.2 Preview ao vivo

- 3 cards de fase com status `Pendente` / `Em curso` / `Chancelado`.
- Bloco de setup separado (nome + prazo) renderizado no topo, fora dos cards.
- Progress bar baseada em 7 campos preenchidos.
- Quick stats: fases chanceladas / campos preenchidos / fase atual.

### 5.3 Geração de artefatos

- Mock AI em [services/ai/mock.ts](../services/ai/mock.ts) retorna 1–2 artefatos por role selecionado (PM / PO / GP).
- Geração de protótipo (HTML estático) via `generatePrototype()` — 3 telas exemplo (Login, Dashboard, Workspace).
- Armazenamento em memória via [services/storage/mock.ts](../services/storage/mock.ts) (sem persistência entre reloads).

### 5.4 Download em Markdown

Componente: [modules/prd/components/download-options.tsx](../modules/prd/components/download-options.tsx)

| Formato | Descrição |
|---|---|
| **Markdown Simples** | `.md` puro, sem frontmatter |
| **Markdown + Metadados** | `.md` com YAML frontmatter (compatível com Obsidian / Notion) |

Gerador em [services/markdown-generator.ts](../services/markdown-generator.ts).

### 5.5 Página de exemplo `/preview-termo`

- Renderiza um termo completo usando dados de exemplo (fintech **ConciliaPay**).
- Mini-renderer markdown→JSX inline (sem dependência de `react-markdown` ou similares) — suporta H1/H2/H3, hr, blockquote, tabelas, **bold**.
- `<details>` com markdown bruto + frontmatter expansível.

### 5.6 Build estático

- `next.config.ts` configurado com `output: "export"` para deploy em GitHub Pages.
- `basePath` e `assetPrefix` condicionais por ambiente.
- Workflow GitHub Actions em `.github/workflows/deploy.yml` (criado via UI por restrição de OAuth scope).

---

## 6. Use Cases Detalhados

### UC-01 — Kickoff de iniciativa interna (persona: PM Sênior)

**Trigger:** Comitê executivo aprovou orçamento para nova feature. PM tem 1 semana para alinhar Eng/UX e iniciar discovery.

**Fluxo:**
1. PM acessa `/`, lê o pitch, clica **"Iniciar termo"**.
2. Em `/project/new`, responde Setup: *"FacilitaCheckout, 6 semanas"*.
3. Responde D1–D6 com base em research prévio (15 min).
4. Preview ao vivo mostra cards de cada fase ficando "Chancelado" (verde).
5. Clica **"Gerar documentos"** com role = PM.
6. Em `flowState=done`, baixa o termo em Markdown + Metadados.
7. Cola no Notion da equipe, marca como agendado para revisão na sprint 0.

**Saída:** Termo de 1 página com 6 diretrizes preenchidas + matriz de governança. Pronto para chancela em <30 min.

### UC-02 — Validação de escopo antes de chancela (persona: PO/Tech Lead)

**Trigger:** PM apresentou um draft de PRD vago. Tech Lead questiona o que é must-have vs. nice-to-have.

**Fluxo:**
1. Tech Lead abre `/project/new` em paralelo durante reunião.
2. Pula direto para Setup → Fase 3 mentalmente, focando em D5 (descarte) e D6 (constraints).
3. Provoca o PM com perguntas: *"Em 8 semanas o que fica fora? Quais constraints regulatórias temos?"*.
4. Preenche o chat com as respostas combinadas.
5. Gera termo, projeta na tela, todos validam em conjunto.

**Saída:** Acordo explícito sobre fronteiras técnicas. Evita retrabalho de sprint 3.

### UC-03 — Discovery rápida com stakeholder externo (persona: GP)

**Trigger:** Cliente B2B pediu cotação. GP precisa de um doc estratégico para circular interno antes do orçamento.

**Fluxo:**
1. GP usa o modo **Upload**: cola transcript da reunião com cliente.
2. Mock AI extrai os 7 campos via `parseDocument()` (na v2.0 será IA real).
3. GP revisa cada campo, edita o que ficou ambíguo.
4. Gera termo com role = GP — recebe Project Charter + Matriz RACI auxiliares.
5. Baixa em formato ZIP para anexar à proposta.

**Saída:** Pacote de discovery em 5 min. (Nota: ZIP foi removido em v1.5; GP usaria markdown + frontmatter no v1.6.)

### UC-04 — Comparativo de iniciativas (persona: VP de Produto)

**Trigger:** VP precisa decidir entre 3 iniciativas concorrentes para o próximo trimestre.

**Fluxo:** *(Roadmap v1.8)*
1. VP solicita aos 3 PMs que rodem o `/start` para suas iniciativas.
2. Recebe 3 termos de 1 página cada.
3. Compara lado-a-lado: Custo da Inação (D2), Diferenciação (D3), Hard Constraints (D6).
4. Decisão baseada em trade-offs explícitos, não em quem escreveu o PRD mais bonito.

**Saída:** Decisão executiva em comitê de 30 min com base em artefatos comparáveis.

### UC-05 — Sprint Zero pós-chancela (persona: Time de Engenharia)

**Trigger:** Termo foi chancelado. Engenharia precisa elaborar architecture decision records (ADRs).

**Fluxo:**
1. Eng lê D3 (diferenciação) → entende o que NÃO pode ser comprometido na arquitetura.
2. Lê D5 (out-of-scope) → sabe o que **não precisa** suportar inicialmente.
3. Lê D6 (constraints) → sabe os limites de compliance e budget.
4. Co-cria arquitetura **sob restrições claras**, sem PM micromanaging especificações.

**Saída:** ADRs alinhados com a estratégia. Eng como co-autor, não consumidor.

---

## 7. Exemplos de Termos Gerados

### 7.1 Exemplo curto — App de Saúde Animal (PetCare)

```markdown
# Termo de Abertura Estratégico — PetCare

> Prazo do MVP: 8 semanas · Gerado em 2026-05-16

## 🎯 Fase 1 — Diagnóstico & Impacto de Negócio

### Diretriz 1 · Segmentação & comportamento atual
Tutores de pets entre 25 e 45 anos, com 1+ animais e rotina ocupada.
Hoje mitigam com caderninho ou memória — 70% esquecem alguma vacina por ano.

### Diretriz 2 · Custo da Inação
Risco de saúde animal e perda de receita por cancelamentos. Tutores gastam
30% a mais em emergências vet quando esquecem doses; mercado pet care SaaS
perde ~R$12M/ano em retenção por falta de lembrança automatizada.

## 💡 Fase 2 — Proposta de Valor

### Diretriz 3 · Diferenciação Crítica
Agenda inteligente contextualizada por tipo de evento (vacina, medicação,
check-up) com notificações multi-canal — Google Calendar genérico não
entende reforço vs. primeira dose; nós entendemos.

### Diretriz 4 · North Star Metric do MVP
Taxa de conclusão do fluxo (cadastrar pet + agendar primeiro lembrete) >75%
sem suporte no primeiro acesso.

## 🔧 Fase 3 — Escopo & Restrições

### Diretriz 5 · Fronteiras de Escopo
Para entregar em 8 semanas: Android, compartilhamento com vet via app dedicado,
integração nativa com calendários externos e analytics avançados → Fase 2.

### Diretriz 6 · Hard Constraints
LGPD (dados de pets contém dados sensíveis dos tutores), teto orçamentário
R$300k, prazo de auditoria interna em 30 de novembro.
```

### 7.2 Exemplo longo — Fintech (ConciliaPay)

Renderizado em https://wesscrow.github.io/pmo-starter/preview-termo (após deploy) ou em [/preview-termo](../app/preview-termo/page.tsx) localmente. Inclui matriz de eficiência corporativa e nota de governança no rodapé.

---

## 8. Arquitetura Técnica

### 8.1 Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| UI | React + TypeScript estrito | 19 / 6.0 |
| Estilização | Tailwind CSS | v4 |
| Componentes base | shadcn/ui | latest |
| Bundler | Turbopack (default Next 16) | — |
| Storage (mock) | In-memory `Map<string, GeneratedArtifact[]>` | — |
| AI (mock) | Funções com `setTimeout` simulando latência | — |
| Storybook | v10 | (opt-in, fora do build) |
| MSW | v2 | (mocks de rede em dev) |
| Prisma | configurado mas não usado no MVP | — |

### 8.2 Organização de pastas

```
PMO-STARTER/
├── app/                            # Rotas (App Router)
│   ├── (marketing)/                # Route group para landing
│   ├── preview-termo/              # Exemplo renderizado
│   ├── project/new/                # Fluxo principal
│   ├── globals.css
│   └── layout.tsx
├── components/ui/                  # shadcn primitives (Button, Resizable, etc.)
├── modules/prd/
│   ├── context/                    # NewProjectProvider (state machine)
│   └── components/                 # ChatPanel, PreviewPanelV2, DownloadOptions
├── services/
│   ├── ai/                         # Gateway mock|openai|anthropic
│   ├── storage/                    # Gateway mock|supabase
│   └── markdown-generator.ts       # Geração do termo
├── documental/
│   ├── SPEC.md                     # Este arquivo
│   ├── historico/                  # Docs legadas
│   └── mvp-scope.png
├── .github/workflows/deploy.yml    # Static export → GitHub Pages
└── next.config.ts                  # output: "export" em produção
```

### 8.3 Padrão de Service Gateways

Cada service externo (`ai`, `storage`) tem 3 arquivos:
- `index.ts` — interface pública + seletor `useMock` por env var
- `mock.ts` — implementação local sem dependências
- `<provider>.ts` — implementação real (a criar: openai, anthropic, supabase)

Flag: `USE_MOCK_AI` e `USE_MOCK_DB`. Default true (MVP). Trocar para `false` quando provider real estiver pronto.

### 8.4 State Machine do chat

```ts
type FlowState = "input" | "generating" | "done";
type ChatPhase = 0 | 1 | 2 | 3;

// Transições:
input(phase=0) → input(phase=1) → input(phase=2) → input(phase=3) → chatComplete=true
chatComplete → generateArtifacts() → generating → done
done → router.push("/project/new") → input(phase=0) [reset]
```

Edge case tratado: `editMessage()` durante `chatComplete` retorna estado para `input(phase=msgPhase)` e invalida todos os campos posteriores.

### 8.5 Bug fix histórico — pergunta duplicada

**Causa:** `advanceConversation()` (chama `setMessages`) era invocado dentro do updater de `setCollectedData`. Em React 18+ strict mode, updaters rodam 2x para detectar impurezas — duplicava mensagens.

**Solução:** `applyAnswer()` puro que **retorna** novo estado em vez de chamar `setState`. Side-effects movidos para fora do updater. Commit `22f2a80`.

---

## 9. Plano de Features Futuras

### 9.1 v1.7 — Persistência & Multi-projeto (curto prazo · ~2 semanas)

| Feature | Detalhes | Esforço |
|---|---|---|
| **Auth com Sign in with Vercel** | OAuth via Vercel ID provider para identificar usuário | M |
| **Persistência Supabase** | Substitui mock storage; tabela `termos_abertura` com RLS | M |
| **Página `/workspace`** | Lista de termos criados pelo usuário (já em [app/project/workspace](../app/project/workspace/)) | S |
| **Rota canônica `/start`** | Alias de `/project/new` para alinhamento com naming externo | XS |
| **Exportação para PDF** | Renderização server-side via Puppeteer/headless Chrome em route handler | M |

### 9.2 v1.8 — IA Real & Co-criação (médio prazo · ~1 mês)

| Feature | Detalhes | Esforço |
|---|---|---|
| **Vercel AI SDK + AI Gateway** | Substitui `mockAI` por Anthropic/OpenAI via Gateway com routing automático | M |
| **Sugestões inline** | Após resposta da D1, IA sugere refinamentos para D2 baseado em coerência | L |
| **Streaming de geração** | Termo aparece sendo "digitado" em tempo real ao gerar | M |
| **Comparativo de iniciativas** | UC-04 — visualização lado-a-lado de N termos (matriz priorização) | L |
| **Validação semântica** | Detecta respostas vazias, genéricas ("a definir") ou contraditórias | M |

### 9.3 v2.0 — Colaboração em tempo real (longo prazo · ~2 meses)

| Feature | Detalhes | Esforço |
|---|---|---|
| **Multi-usuário no mesmo termo** | Yjs/Liveblocks para co-edição síncrona | XL |
| **Comentários por diretriz** | Threads no estilo Figma/Notion ancorados em D1–D6 | L |
| **Versionamento** | Snapshots automáticos a cada chancela; diff visual entre versões | M |
| **Workflow de aprovação** | Estados: rascunho → revisão → chancelado; assinatura digital opcional | L |
| **Webhooks de integração** | Disparar eventos para Slack/Linear/Jira quando um termo é chancelado | M |

### 9.4 v2.5 — Inteligência sobre portfólio (longo prazo · ~3 meses)

| Feature | Detalhes | Esforço |
|---|---|---|
| **Dashboard de portfólio** | VP visualiza todos os termos da organização; filtros por fase, custo, prazo | L |
| **Análise de hard constraints comuns** | Agrupa termos com mesmos blockers regulatórios para priorização cruzada | M |
| **Recomendação de descarte** | IA sugere itens de "out-of-scope" baseado em padrões de outros termos | L |
| **Templates por vertical** | Fintech, healthcare, edtech — perguntas e exemplos adaptados | M |
| **Export para Linear/Jira** | Cada D5 (out-of-scope) vira backlog item automaticamente | M |

### 9.5 Backlog técnico (sem versão atribuída)

- Migrar storybook ou removê-lo (atualmente excluído do build, ocupa espaço sem retorno).
- Remover Prisma se persistência for via Supabase direto (evitar dupla camada).
- Adicionar testes E2E (Playwright) cobrindo o fluxo /start completo.
- Adicionar Vercel Web Analytics + Speed Insights após mover para Vercel.
- Substituir o mini-renderer markdown→JSX por `react-markdown` se features adicionais (links, listas aninhadas, code blocks) forem necessárias.
- Implementar dark mode (Tailwind v4 + CSS variables já suporta — só falta toggle).
- Internacionalização (PT/EN) — atualmente só PT-BR.

---

## 10. Métricas de Sucesso do Produto

### 10.1 Métricas primárias (North Star do próprio PMO-STARTER)

| Métrica | Meta v1.7 | Como medir |
|---|---|---|
| Tempo médio de criação de um termo | <15 min | Telemetria `started_at` → `completed_at` |
| Taxa de conclusão das 7 perguntas | >70% | `completed / started` por dia |
| Termos baixados em Markdown | >50% dos completos | Click no botão de download |

### 10.2 Métricas secundárias

- NPS pós-criação (>40)
- Taxa de retorno em 7 dias (criar 2º termo) >25%
- Tempo médio na D5 (descarte) >2 min — indica reflexão real, não preenchimento mecânico

### 10.3 Anti-métricas (sinais de uso errado)

- Termos com >3 campos preenchidos como "a definir" — pessoa pulou perguntas
- Tempo médio total <3 min — sinaliza que está sendo usado como formulário, não reflexão estratégica
- Taxa de edição retroativa >50% — pode indicar que as perguntas estão mal ordenadas

---

## 11. Decisões de Design (ADRs)

### ADR-01 — Termo de 1 página em vez de PRD descritivo
**Contexto:** O paradigma "PRD compacto + autonomia consultiva" é mais aderente a times maduros.
**Decisão:** Substituir 12 perguntas descritivas por 6 estratégicas + 1 setup.
**Consequência:** Quebra de compatibilidade com termos gerados antes de v1.5 (sem usuários reais ainda).

### ADR-02 — Service Gateway para AI e Storage
**Contexto:** Precisamos validar UX antes de pagar por API real.
**Decisão:** Mock injetado por env var; assinaturas idênticas; troca em uma linha de código.
**Consequência:** Adiciona um nível de indireção, mas torna o MVP testável offline.

### ADR-03 — Static export para GitHub Pages
**Contexto:** Demo gratuita sem servidor; iteração rápida.
**Decisão:** `output: "export"` + `basePath`. Sem API routes ativas.
**Consequência:** Storage in-memory perde dados no reload — aceitável para demo, exige Supabase em v1.7.

### ADR-04 — Mini-renderer markdown→JSX em vez de `react-markdown`
**Contexto:** Página `/preview-termo` precisa renderizar markdown gerado.
**Decisão:** Renderer inline de ~80 linhas suportando H1/H2/H3, hr, blockquote, tabela, bold.
**Consequência:** Zero dependência adicional; precisa estender se quiser code blocks ou listas aninhadas (ver Backlog técnico).

### ADR-05 — `applyAnswer()` puro em vez de side-effects em setState
**Contexto:** React 18+ strict mode re-executa updaters; side-effects causaram duplicação de mensagens.
**Decisão:** Funções de mutação retornam novo estado; chamadas a `setMessages` ficam fora de qualquer updater.
**Consequência:** Padrão a ser seguido em todo o módulo `prd/context`.

---

## 12. Riscos Conhecidos & Mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Mock AI gera artefatos genéricos | Alto (UX percebida) | Trocar por AI real em v1.8 (já planejado) |
| Storage in-memory perde dados | Médio | Aviso visível na landing + Supabase em v1.7 |
| Token OAuth sem scope `workflow` impede CI automático | Baixo | Workflow `deploy.yml` criado via UI manualmente |
| GitHub Pages quebra com symlinks `skills/linked-skills/` | Médio (já resolvido) | Symlinks removidos + `.nojekyll` na raiz |
| Falta de testes automatizados | Alto a longo prazo | Adicionar Playwright em sprint dedicada (Backlog técnico) |

---

## 13. Apêndice — Comandos Úteis

```bash
# Dev server
pnpm dev                 # ou: ./node_modules/.bin/next dev --turbopack

# Build estático (produção)
NODE_ENV=production ./node_modules/.bin/next build
# Saída: ./out/

# Typecheck
npx tsc --noEmit

# Lint
pnpm lint

# Storybook (opt-in)
pnpm storybook
```

### URLs do projeto

- **Repo:** https://github.com/WessCrow/pmo-starter
- **Site (após deploy):** https://wesscrow.github.io/pmo-starter/
- **Dev local:** http://localhost:3000 (ou :3002 se 3000 ocupada)

---

**Autoria:** Wess Crow + Claude (sessão pareada)
**Licença:** MVP interno — sem licença explícita ainda
