# PRD — P.M.O-STARTER

> **Arquivo:** `PRD.md` — raiz do projeto P.M.O-STARTER  
> **Versão:** 2.0 (Reescrita com novo template estruturado)  
> **Status:** MVP em andamento  
> **Última atualização:** 2026-05-16  

---

## 1. Alinhamento Estratégico & Outcomes (Sucesso)

### Visão Geral

O **P.M.O-STARTER** conecta-se ao objetivo estratégico de acelerar a **documentação de produto** dentro de times de PM/PO/GP. Hoje, esse processo é fragmentado, repetitivo e consome 30-40% do tempo dessas personas. A plataforma reduz esse tempo significativamente ao consolidar criação de PRDs, prototipagem e documentação em um único workspace assistido por IA.

**Trimestre:** Q2 2026  
**Unidade de negócio:** Product & Design Tooling  
**Impacto esperado:** Reduzir time-to-document em 40%, aumentar clareza na comunicação entre times.

### Objetivos de Negócio

| Objetivo | Métrica | Target |
|---|---|---|
| **Eficiência operacional** | % redução do tempo em documentação | ≥ 40% |
| **Clareza e comunicação** | NPS de usabilidade entre PMs | ≥ 8/10 |
| **Adoção** | # de projetos criados em primeiras 4 semanas | ≥ 50 |
| **Retenção** | % de usuários que criam 2+ projetos | ≥ 60% |

### Métricas de Sucesso (KPIs)

#### Métrica Primária
- **Nome:** Time-to-Complete PRD
- **Definição:** Tempo decorrido do upload/início do chat até download do PRD completo (em minutos)
- **Target MVP:** Média ≤ 15 min (vs. 45-60 min no fluxo manual)
- **Coleta:** Telemetry no app, timestamp início/fim de projeto

#### Métricas Secundárias
| Métrica | Definição | Target | Tipo |
|---|---|---|---|
| Taxa de conclusão (completion rate) | % de usuários que atingem "gerar projeto" | ≥ 75% | Guardrail |
| Taxa de erro na UI | % de ações que geram erro | ≤ 5% | Qualidade |
| Confiança do usuário (self-reported) | "Quão confiante você está no PRD gerado?" (1-5) | ≥ 4.0 | Satisfação |
| Volume de downloads | # de PRDs + protótipos baixados | ≥ 40/semana | Engajamento |
| Feedback loops | # de edições post-gerar (indicador de iteração) | ≥ 2.5 médio | Engajamento |

---

## 2. O Problema sob a Ótica do Usuário

### Contexto da Dor

**Persona:** Rafael, 34, Product Manager Sênior em startup de tech

- **Realidade hoje:** Trabalha em 2-3 produtos simultâneos. Usa Notion (backlog), Figma (design), Jira (dev), Google Docs (PRD) — sem integração.
- **Fluxo atual:** 
  1. Briefing do stakeholder (reunião)
  2. Anota em Google Docs enquanto pensa em estrutura
  3. Cria outline em Notion
  4. Monta prototipo rápido em Figma (ou papel)
  5. Consolida tudo em Markdown para engenharia
  6. Itera com feedback → volta ao passo 2
- **Tempo total:** 45-60 minutos por PRD (small feature), 3-4 horas (feature média)
- **Dor principal:** 
  - Alternância de ferramentas = perda de contexto
  - Documentação fica desatualizada após sprint inicial
  - Time de eng. recebe PRD genérico, pede clarificações
  - Protótipos de baixa fidelidade = falta de alinhamento visual com design

**Persona secundária:** Camila, 28, Product Owner em time Scrum

- **Realidade:** Responsible por backlog e cerimônias. Precisa validar hipóteses rapidamente.
- **Dor:** Sem protótipo rápido, fica dependente do time de design para cada validação. Prototipagem demora 2-3 dias (não encaixa em sprint planning que é 1x/semana).

### Evidências Disponíveis

#### Dados Quantitativos
- **Tempo medio de criação de PRD** (via surveys internas): 45-60 min (feature pequena), 3-4h (média)
- **Taxa de re-trabalho de documentação:** 35% (PRD é revisado/completo após primeira iteração)
- **Ferramentas usadas por PM:** Média 4.2 ferramentas por workflow de documentação

#### Dados Qualitativos (Pesquisa com usuários — Sprint anterior)
- Rafael: *"Perco 30-40% do meu tempo alternando entre Notion, Figma, Google Docs e Jira. Sempre esqueço algo."*
- Camila: *"Quando preciso validar uma ideia rápida com prototipo, demora mais fazer no Figma do que no Miro ou papel. Desisti de prototipagem rápida."*
- Feedback Slack (#product): *"Às vezes entrego PRD e perguntam: 'Qual é exatamente o problema que resolve?'"* — indica falta de clareza estrutural

---

## 3. Escopo da Solução (Thin Slice / MVP)

### O Que Está Dentro (Escopo Recomendado)

**Feature 1 — AI Chat Onboarding & Generator** (MVP)

**Objetivo:** Reduzir o tempo de coleta de contexto e geração de PRD inicial de 45 min para ≤ 15 min através de um chat assistido + geração de artefatos Markdown + protótipo HTML básico.

**Scope explícito:**

| Item | Descrição | Status |
|---|---|---|
| **Chat guiado** | 3 fases: contexto/problema, solução, restrições. Mensagens IA mock. | ✅ MVP |
| **Upload de arquivo** | Ingestão de txt, md, pdf (parsing mock). | ✅ MVP |
| **Split view** | Painel esquerdo (entrada) + direito (preview progressivo). | ✅ MVP |
| **Seleção de papéis** | PM, PO, GP — cada um gera artefatos específicos. | ✅ MVP |
| **Artefatos gerados** | PRD, Product Vision, Matriz de Riscos, Roadmap (conforme papel). | ✅ MVP |
| **Protótipo HTML** | 3-5 telas estáticas em HTML gerado (não navegável no MVP). | ✅ MVP |
| **Preview das abas** | Visão Geral, Documentos, Protótipo (iframes). | ✅ MVP |
| **Download** | `.md` agregado (PRD) + `.html` com telas. | ✅ MVP |
| **Armazenamento** | Mock (local ou session storage — sem persistência real). | ✅ MVP |

**Artefatos por papel:**

| Papel | Artefatos gerados |
|---|---|
| **PM** | Product Vision Board, Lean Canvas, Matriz de Riscos, Critérios de Sucesso (KPIs), Matriz de Priorização (RICE/MoSCoW) |
| **PO** | PRD, Product Backlog, Critérios de Aceite, Jornada do Usuário (User Journey Map), Definition of Done (DoD), Detalhamento de Feature |
| **GP** | Project Charter, Cronograma/Roadmap, Plano de Comunicação, Matriz de Responsabilidades (RACI) |

### O Que Está Fora (Escopo Fora do MVP)

| Item | Motivo da Deferência | Versão Prevista |
|---|---|---|
| Autenticação & Login | Backend fora do escopo MVP | v2.0 (Jun) |
| Persistência real (DB) | Usar Supabase depois; mock por enquanto | v2.0 (Jun) |
| LLM real (OpenAI/Claude) | Usar mock até estabilizar UX | v1.5 (final maio) |
| Double Check flow | UI bem desenhada, mas não prioritária; usuário pula direto para papéis | Backlog (Feature 2) |
| Protótipo navegável | Apenas HTML estático no MVP; prototipo clicável é iteração | v2.0 (jul) |
| Integração com Jira | Exportação manual por enquanto | v2.5+ |
| Versionamento com diff | Visão de mudanças entre versões do PRD | Backlog |
| Multi-idioma | MVP = português apenas | v3.0 |
| App mobile nativo | Web responsivo apenas | v2.5+ |

### Hipóteses de Valor

**Hipótese Principal:**
> "Acreditamos que, ao oferecer um **chat guiado assistido + geração automática de PRD**, resolveremos o problema de **alternância de ferramentas e falta de contexto estruturado** para **PMs e POs**, e saberemos que fomos bem-sucedidos quando observarmos **redução de ≥40% no time-to-document** (45 min → ≤15 min) e **NPS de usabilidade ≥8/10**."

**Hipóteses Secundárias:**
1. "O chat por **3 fases** é suficiente para coletar contexto relevante (vs. formulário estruturado)"
2. "**Papéis PM/PO/GP** geram artefatos distintos e valiosos (vs. PRD único genérico)"
3. "Usuários acreditam em **artefatos gerados por IA mock** o suficiente para iterar (vs. descartar)"
4. "Protótipos **estáticos em HTML** transmitem valor visual (vs. sem protótipo no MVP)"

---

## 4. Jornada do Usuário & Requisitos de Interação (Frontstage)

### Fluxo Principal (Happy Path)

**Ator:** Rafael (PM Sênior), criando um novo projeto

| Passo | Ação do Usuário | Resposta do Sistema | Tela/Component |
|---|---|---|---|
| 1 | Acessa `/project/new` | Exibe modo seletor (Chat ou Upload) + preview vazio | `new-project-context` + `mode-selector` |
| 2 | Seleciona **Chat com IA** | Inicia fase 1, pergunta 1: *"Qual é o nome do produto e qual problema resolve?"* | `chat-panel` (phase 1, q1) |
| 3 | Digita resposta | Sistema aguarda 1s, exibe pergunta 2 da fase 1 + sugestão mock | `chat-panel` (phase 1, q2) |
| 4 | Completa fase 1 | Avança para fase 2, pergunta 1: *"Qual é a solução proposta?"* | `chat-panel` (phase 2, q1) |
| 5 | Completa fase 2 | Avança para fase 3, pergunta 1: *"Quais são as restrições?"* | `chat-panel` (phase 3, q1) |
| 6 | Completa fase 3 | Chat termina. Exibe chips de papéis (PM, PO, GP) + botão **Gerar documentos** | `new-project-context` (chatComplete = true) |
| 7 | Seleciona ≥1 papel (ex: PO) | Chips selecionados mudam cor/estado (visual) | `role-selector` / context state |
| 8 | Clica **Gerar documentos** | State → "generating", exibe skeleton loaders no preview | `preview-panel` (skeleton state) |
| 9 | IA gera artefatos (mock, ~2s) | Estado → "done". Abas aparecem: Visão Geral, Documentos (PRD, Backlog, etc.), Protótipo | `preview-panel` (done state) |
| 10 | Visualiza PRD na aba "Documentos" | Markdown renderizado com `simple-markdown.tsx`, sem `dangerouslySetInnerHTML` | `preview-panel` (artifact tab) |
| 11 | Visualiza protótipo em iframe | HTML com 3-5 telas estáticas | `preview-panel` (prototype tab) |
| 12 | Clica **Download PRD** | Browser baixa `projeto-[id].md` (agregado de todos os artefatos do papel) | Native `<a href="data:..." download>` |
| 13 | Clica **Download Protótipo** | Browser baixa `projeto-[id].html` (file encapsulado) | Native `<a href="data:..." download>` |

**Duração total:** ~3-5 min (no MVP com mock IA)  
**Resultado:** Usuário tem PRD + protótipo rápido em mãos para compartilhar com design/eng.

### Cenários Alternativos e Regras de Negócio

#### Cenário A: Upload de arquivo (sem chat)

| Passo | Ação do Usuário | Resposta do Sistema |
|---|---|---|
| 1 | Clica em **Upload / arquivo** na seleção de modo | Exibe drag-drop ou file picker (txt, md, pdf) |
| 2 | Envia arquivo de 2KB com descrição do produto | Sistema faz parsing mock, extrai campos (problema, solução, restrições) |
| 3 | Parsing completa em ~1s | Pula direto para seleção de papéis + gerar (sem fase de chat) |
| 4 | Resto do fluxo é idêntico ao Happy Path (passo 7+) | - |

**Validação:** Arquivo não pode ser > 5MB, tipos aceitos: `.txt`, `.md`, `.pdf`

#### Cenário B: Usuário seleciona múltiplos papéis (PM + PO)

| Passo | Ação do Usuário | Resposta do Sistema |
|---|---|---|
| 1 | Chat completa | Chips PM, PO, GP aparecem deselecionados |
| 2 | Clica em PM + PO | Ambos mudam para estado "selected" (visual distinto) |
| 3 | Clica **Gerar documentos** | Sistema gera artefatos **para cada papel** (2 chamadas em paralelo) |
| 4 | Preview exibe abas | **Abas separadas por papel** (ou dropdown "Papel: PM / PO") |

**Regra:** Se nenhum papel for selecionado, default = PO (silencioso, sem notificação)

#### Cenário C: Usuário edita suas respostas no chat

| Passo | Ação do Usuário | Resposta do Sistema |
|---|---|---|
| 1 | Dentro do chat, clica botão **Editar** em mensagem anterior | Mensagem fica em modo edit (textarea) |
| 2 | Modifica texto da resposta | Preview atualiza em real-time |
| 3 | Confirma edição (Enter ou botão ✓) | Sistema recalcula dados coletados, marca fase como revisitada |
| 4 | Chat avança a partir do ponto onde editou (ou reinicia fase) | Depend da implementação, mas contexto deve ser limpo de dados "abaixo" da edição |

**Regra:** Edições são permitidas enquanto `chatComplete = false`. Após gerar, não há volta ao chat (nova sessão = novo projeto).

---

## 5. Casos de Borda e Tratamento de Erros (Exceções)

### Estados Vazios (Empty States)

#### Empty State 1: Primeira vez no app (sem projetos)

**Contexto:** Usuário acessa `/project/new` pela primeira vez  
**Comportamento:**
- Chat painel exibe pergunta initial de fase 1
- Preview painel direito mostra "Nenhum dado coletado ainda" (skeleton ou placeholder)
- Nenhum chip de papel visível

**UX:** Entrada clara, nada desorienta (sem clutter)

#### Empty State 2: Upload de arquivo vazio

**Contexto:** Usuário envia arquivo `.txt` em branco ou com <10 chars  
**Comportamento:**
- Sistema retorna erro: *"Arquivo muito curto. Por favor, forneça uma descrição com pelo menos 50 caracteres."*
- Preview não muda, usuário pode reenviar

**Mensagem:** Coral/warning, sem jargão técnico

#### Empty State 3: Chat com respostas mínimas

**Contexto:** Usuário responde apenas "test" ou "sim" sem contexto  
**Comportamento:**
- Sistema aceita e avança (não valida semântica no MVP)
- Preview preenche campo com o texto literal
- Ao gerar, IA cria artefatos "vazios" ou placeholders (sinaliza baixa confiança)
- Usuário pode editar ou iniciar novo projeto

**Aviso:** Opcional — pode exibir "Confiança baixa nesta resposta" em amarelo

### Mensagens e Recuperação de Erros

#### Erro 1: Timeout na geração de artefatos

**Trigger:** IA mock leva > 5s para responder  
**Comportamento:**
- Preview mostra spinner indefinidamente, depois erro: *"Demorou demais gerar. Tente novamente."*
- Botão **Tentar novamente** aparece
- Contexto é mantido (usuário não perde dados)

**Ação do usuário:** Clica retry → sistem

a tenta novamente (sem recolher contexto)

#### Erro 2: Arquivo corrompido ou tipo inválido

**Trigger:** Usuário tenta fazer upload de `.docx` ou `.xlsx`  
**Comportamento:**
- File picker rejeita (validação no client)
- Mensagem: *"Apenas TXT, MD e PDF são aceitos. Você selecionou DOCX."*
- Usuário pode reselecionar

#### Erro 3: Falha ao fazer download do PRD

**Trigger:** Browser não suporta `data:` URL ou arquivo > limite  
**Comportamento:**
- Botão **Download** mostra erro: *"Não foi possível baixar. Tente novamente ou copie o conteúdo manualmente."*
- Preview exibe PRD completo (usuário pode copiar/colar como fallback)

#### Erro 4: Navegação acidental (back/refresh)

**Trigger:** Usuário clica back no browser ou refresh durante chat/geração  
**Comportamento:**
- Estado é perdido (sessionStorage não é garantido no MVP)
- Usuário volta a `/project/new` vazio
- Mensagem educativa no landing: *"Seus dados de projeto não são salvos nesta versão. Baixe seu PRD antes de sair."*

**Mitigação v2.0:** Supabase + localStorage para persistência

---

## 6. Lógica de Sistemas & Impacto Operacional (Backstage)

### Dependências Tecnológicas

| Dependência | Tipo | Status | Nota |
|---|---|---|---|
| **Mock AI Service** | Interno (`services/ai`) | ✅ Implementado | Simula geração de artefatos. Trade-off: respostas previsíveis. |
| **Mock Storage Service** | Interno (`services/storage`) | ✅ Implementado | SessionStorage ou memory. Sem persistência real. |
| **React Context** | State Management | ✅ Ativo | `new-project-context.tsx`. Contém todo fluxo. |
| **Next.js Server Components** | Framework | ✅ Ativo | App Router. Layout em servidor. |
| **Markdown Parser** | `simple-markdown.tsx` | ✅ Ativo | Renderização segura (sem HTML cru). |
| **Supabase (v2.0)** | Backend | 🔄 Planejado | Auth (OAuth), DB (PostgreSQL), realtime. |
| **OpenAI / Claude API (v1.5)** | LLM real | 🔄 Planejado | Substituir mock. Streaming responses. |

### Fluxo de dados (simplificado)

```
[Chat / Upload] 
  ↓
[Context State: collectedData] 
  ↓
[AI Service: generateArtifacts()] 
  ↓
[GeneratedArtifacts[] + PrototypeScreens[]] 
  ↓
[Storage Service: saveArtifacts()] 
  ↓
[Preview Panel: Render]
  ↓
[Download: data: URLs]
```

### Políticas e Compliance

| Política | Aplicação | Status |
|---|---|---|
| **WCAG 2.1 AA** | Acessibilidade (contraste, labels, aria-live) | ✅ MVP |
| **Sem dados sensíveis em localStorage** | Não salvar API keys, emails em plaintext | ✅ Segue |
| **Renderização segura** | Sem `dangerouslySetInnerHTML`, usar `simple-markdown.tsx` | ✅ Implementado |
| **Rate limiting (v2.0)** | Limitar requisições por usuário/IP | 🔄 Futuro |
| **GDPR (v2.0)** | Quando tiver DB real: política de retenção de dados | 🔄 Futuro |
| **SOC 2 (v2.0)** | Se produto for comercial | 🔄 Futuro |

---

## 7. Critérios de Aceite Técnicos (Handoff)

### Critério 1 — Chat Funcional (Fluxo Principal)

**Dado que** o usuário clica em **Chat com IA** em `/project/new`  
**Quando** ele responde à pergunta 1 da fase 1  
**Então:**
- [ ] Mensagem do usuário aparece no painel esquerdo
- [ ] Sistema exibe pergunta 2 da fase 1 (após ~1s)
- [ ] Campo de input fica pronto para nova resposta
- [ ] Preview direito atualiza com `collectedData.productName` (first line da resposta)

**Aceitação:** Chat completa 3 fases sem erro, Preview mostra dados coletados

---

### Critério 2 — Upload Funcional

**Dado que** o usuário seleciona **Upload / arquivo**  
**Quando** envia um `.md` com 200+ chars  
**Então:**
- [ ] Sistema exibe "Analisando arquivo..." (skeleton)
- [ ] Mock IA extrai campos (problema, solução, etc.)
- [ ] State avança para seleção de papéis (skip chat)
- [ ] Preview mostra dados extraídos

**Aceitação:** Upload → parsing → papéis → gerar, tudo sem erro

---

### Critério 3 — Geração de Artefatos (Seleção de Papéis)

**Dado que** o usuário completou chat/upload  
**Quando** seleciona 1+ papel (PM/PO/GP) e clica **Gerar documentos**  
**Então:**
- [ ] State → `flowState = "generating"`
- [ ] Preview exibe skeleton loaders
- [ ] IA gera artefatos específicos por papel
- [ ] Após ~2-3s, abas aparecem: **Visão Geral**, **Documentos**, **Protótipo**
- [ ] Cada aba contém dados corretos (PRD contém "Problema", "Solução", etc.)

**Aceitação:** Gerar completa, abas renderizam sem erro, nenhum `dangerouslySetInnerHTML`

---

### Critério 4 — Download Funcional

**Dado que** artefatos foram gerados  
**Quando** usuário clica **Download PRD**  
**Então:**
- [ ] Browser inicia download automático de arquivo `.md`
- [ ] Nome do arquivo: `projeto-[projectId].md`
- [ ] Conteúdo é agregado (todos os artefatos do papel selecionado)
- [ ] Markdown é válido e legível

**Aceitação:** Download completa sem erro, arquivo é funcional

---

### Critério 5 — Segurança & Renderização (Não Funcional)

**Dado que** artefatos contêm markup ou HTML  
**Quando** renderizados no preview  
**Então:**
- [ ] Nenhuma tag HTML é executada (`<script>`, `<iframe>`, etc.)
- [ ] `simple-markdown.tsx` escapa corretamente
- [ ] Não há warnings de `dangerouslySetInnerHTML` no console
- [ ] User input (respostas do chat) não injeta código

**Aceitação:** Storybook audit + manual inspection de HTML renderizado

---

### Critério 6 — Acessibilidade (Não Funcional)

**Dado que** app está em `/project/new`  
**Quando** usuário navega com teclado (Tab, Enter, Shift+Tab)  
**Então:**
- [ ] Tabindex é lógico (inputs → buttons → links)
- [ ] Botões têm `aria-label` ou texto visível claro
- [ ] Chat painel tem `aria-live="polite"` para novas mensagens
- [ ] Cores têm contraste ≥ 4.5:1 (WCAG AA)
- [ ] Labels estão associadas a inputs (`htmlFor`, `aria-labelledby`)

**Aceitação:** Lighthouse acessibilidade ≥ 90, sem warnings de ARIA

---

### Critério 7 — Performance (Não Funcional)

**Dado que** usuário acessa `/project/new`  
**Quando** página carrega  
**Então:**
- [ ] First Paint < 1s (com Turbopack)
- [ ] TTI < 2s
- [ ] Chat response feedback < 200ms (input → AI resposta)
- [ ] Preview atualiza em < 100ms (sem jank)

**Aceitação:** Lighthouse performance ≥ 80, DevTools throttling = nenhuma queixa visual

---

### Critério 8 — Responsividade (Não Funcional)

**Dado que** app está em diferentes viewport sizes  
**Quando** usuário acessa em mobile, tablet, desktop  
**Então:**
- [ ] Layout adapta sem overflow horizontal
- [ ] Chat panel é 100% width em mobile (stack vertical)
- [ ] Preview esconde em mobile < 768px (ou alterna com chat)
- [ ] Botões são ≥ 44px em height (tap targets)

**Aceitação:** Testado em 3 resoluções (mobile 375px, tablet 768px, desktop 1440px)

---

## Roadmap & Sequência de Desenvolvimento

### MVP (Agora até 2026-05-31)
- ✅ Feature 1 — Chat + Upload + Gerar (funcional)
- 🔲 Testes unitários (chat-panel, preview-panel)
- 🔲 Limpeza de código morto (submitForm, double-check)
- 🔲 Performance baseline (Lighthouse)

### v1.5 (Junho 2026)
- 🔲 Integração com LLM real (Claude/OpenAI)
- 🔲 Suporte para streaming (typed effect no preview)
- 🔲 Double Check flow (Feature 2)
- 🔲 Testes e2e

### v2.0 (Julho 2026)
- 🔲 Autenticação (Supabase OAuth)
- 🔲 Persistência real (Supabase DB)
- 🔲 Protótipo navegável (Feature 3)
- 🔲 Multi-usuário / workspaces

### v2.5+ (Roadmap aberto)
- 🔲 Integração com Jira/Linear
- 🔲 Versionamento com diff
- 🔲 Suporte multi-idioma
- 🔲 App mobile nativo

---

## Referências & Links

| Recurso | URL | Propósito |
|---|---|---|
| Documentação técnica | `./CONTEXT.md` | Stack, DS, decisões |
| Governança de código | `./skills/governance/RULES.md` | Regras, acessibilidade |
| Protótipo/User Flow | [Link verificado do Figma / Miro] | Wireframes das telas |
| Project Brief | `./skills/outputs/PROJECT_BRIEF.md` | Narrativa do produto |

---

**Versão anterior:** `PRD.md` (v1.1, 2026-05-15)  
**Revisão:** 2026-05-16 (reescrita com novo template estruturado)  
**Mantém-se:** Funcionalidades ativas e décisions não mudam. PRD agora é mais estruturado para handoff técnico.
