# PRD — [NOME DO PRODUTO]

> **Arquivo:** `PRD.md` — raiz do projeto  
> **Versão:** 1.0  
> **Status:** [Em planejamento / MVP / Produção]  
> **Última atualização:** [DATA]  
> **Owner:** [NOME DO PM]

---

## 1. Alinhamento Estratégico & Outcomes (Sucesso)

### Visão Geral

[Breve descrição de como esta iniciativa se conecta aos objetivos macro da companhia ou da unidade de negócios neste trimestre. Contextualize o "por quê" estratégico.]

**Trimestre:** [Q1/Q2/Q3/Q4 2026]  
**Unidade de negócio:** [Produto / Growth / Infra]  
**Impacto esperado:** [Descrição do resultado estratégico]

### Objetivos de Negócio

[O que a empresa ganha ou qual indicador estratégico estamos movendo com o lançamento desta funcionalidade? Ex: eficiência operacional, retenção, receita, redução de churn.]

| Objetivo | Métrica | Target |
|---|---|---|
| **[Objetivo 1]** | [Indicador] | [Valor esperado] |
| **[Objetivo 2]** | [Indicador] | [Valor esperado] |
| **[Objetivo 3]** | [Indicador] | [Valor esperado] |

### Métricas de Sucesso (KPIs)

#### Métrica Primária
- **Nome:** [Nome do indicador principal]
- **Definição:** [Descrição precisa do que estamos medindo]
- **Target:** [Valor esperado]
- **Coleta:** [Como vamos medir isso?]
- **Baseline:** [Estado atual, se aplicável]

#### Métricas Secundárias

| Métrica | Definição | Target | Tipo |
|---|---|---|---|
| [Métrica 2] | [O que mede] | [Target] | [Guardrail/Engajamento/Satisfação] |
| [Métrica 3] | [O que mede] | [Target] | [Guardrail/Engajamento/Satisfação] |
| [Métrica 4] | [O que mede] | [Target] | [Guardrail/Engajamento/Satisfação] |

---

## 2. O Problema sob a Ótica do Usuário

### Contexto da Dor

[Descrição detalhada do cenário atual baseado em evidências de pesquisas ou dados comportamentais. Quem é o usuário afetado (Persona) e qual obstáculo ele enfrenta hoje?]

**Persona:** [Nome, idade, contexto]

- **Realidade hoje:** [Descrição do fluxo atual]
- **Fluxo atual:** 
  1. [Passo 1]
  2. [Passo 2]
  3. [Passo 3]
- **Tempo gasto:** [Quanto tempo leva?]
- **Dor principal:** 
  - [Dor A]
  - [Dor B]
  - [Dor C]

**Persona secundária:** [Nome, contexto diferente]

- **Realidade:** [Contexto específico]
- **Dor:** [O que os impacta]

### Evidências Disponíveis

#### Dados Quantitativos
- [Métrica 1]: [Valor] (fonte: [onde veio])
- [Métrica 2]: [Valor] (fonte: [onde veio])
- [Métrica 3]: [Valor] (fonte: [onde veio])

#### Dados Qualitativos
- [Pesquisa 1]: "Citação de usuário"
- [Feedback Slack]: "Mensagem no #channel"
- [Entrevista]: "Descoberta do user testing"

---

## 3. Escopo da Solução (Thin Slice / MVP)

### O Que Está Dentro (Escopo Recomendado)

[Definição estrita do recorte da jornada ou blueprint que será atacado nesta versão para validar as hipóteses de valor com o menor esforço possível.]

| Item | Descrição | Status |
|---|---|---|
| **[Feature 1]** | [O que faz] | [✅ MVP / 🔄 v2.0 / ❌ Fora] |
| **[Feature 2]** | [O que faz] | [✅ MVP / 🔄 v2.0 / ❌ Fora] |
| **[Feature 3]** | [O que faz] | [✅ MVP / 🔄 v2.0 / ❌ Fora] |

### O Que Está Fora (Escopo Fora do MVP)

| Item | Motivo da Deferência | Versão Prevista |
|---|---|---|
| [Feature A] | [Não é crítico para validar hipótese] | [v2.0 / Q3] |
| [Feature B] | [Dependência externa não pronta] | [v3.0 / Q4] |
| [Feature C] | [Escopo grande, pode iterar depois] | [Backlog] |

### Hipóteses de Valor

**Hipótese Principal:**
> "Acreditamos que, ao oferecer **[SOLUÇÃO]**, resolveremos **[PROBLEMA]** para a persona **[X]**, e saberemos que fomos bem-sucedidos quando observarmos **[MÉTRICA PRIMÁRIA]**."

**Hipóteses Secundárias:**
1. "[Acreditamos que...] porque [razão]"
2. "[Acreditamos que...] porque [razão]"

---

## 4. Jornada do Usuário & Requisitos de Interação (Frontstage)

### Fluxo Principal (Happy Path)

[Sequência lógica e linear de passos que o usuário realiza para concluir o objetivo com sucesso.]

**Ator:** [Quem faz]

| Passo | Ação do Usuário | Resposta do Sistema | Tela/Component |
|---|---|---|---|
| 1 | [Ação 1] | [Resposta 1] | [Tela/Component] |
| 2 | [Ação 2] | [Resposta 2] | [Tela/Component] |
| 3 | [Ação 3] | [Resposta 3] | [Tela/Component] |

**Duração total:** [Tempo estimado]  
**Resultado:** [O que o usuário consegue no final]

**Link do Protótipo/User Flow:** [URL do Figma/Miro]

### Cenários Alternativos e Regras de Negócio

#### Cenário A: [Condição especial]

| Passo | Ação do Usuário | Resposta do Sistema |
|---|---|---|
| 1 | [Ação alternativa] | [Resposta diferente] |
| 2 | [Continua...] | [...] |

**Regra:** [Se X então Y]

#### Cenário B: [Outra condição especial]

| Passo | Ação do Usuário | Resposta do Sistema |
|---|---|---|
| 1 | [Ação alternativa] | [Resposta diferente] |

**Regra:** [Comportamento esperado]

---

## 5. Casos de Borda e Tratamento de Erros (Exceções)

### Estados Vazios (Empty States)

#### Empty State 1: [Situação]

**Contexto:** [Quando acontece?]  
**Comportamento:** [O que a UI mostra]  
**UX:** [Descrição da experiência]

#### Empty State 2: [Outra situação]

**Contexto:** [Quando acontece?]  
**Comportamento:** [O que a UI mostra]

### Mensagens e Recuperação de Erros

#### Erro 1: [Tipo de erro]

**Trigger:** [O que causa]  
**Comportamento:** [Como o sistema reage]  
**Mensagem:** "[Texto amigável que o usuário vê]"  
**Ação do usuário:** [O que ele pode fazer]

**Recuperação:** [Como se recupera do erro]

#### Erro 2: [Outro tipo de erro]

**Trigger:** [O que causa]  
**Comportamento:** [Como o sistema reage]  
**Mensagem:** "[Texto amigável]"  
**Recuperação:** [Como se recupera]

---

## 6. Lógica de Sistemas & Impacto Operacional (Backstage)

### Dependências Tecnológicas

| Dependência | Tipo | Status | Nota |
|---|---|---|---|
| **[API X]** | Serviço externo | ✅ Pronto / 🔄 Futuro | [Detalhes] |
| **[Banco Y]** | Data | ✅ Pronto / 🔄 Futuro | [Detalhes] |
| **[Serviço Z]** | Terceiro | ✅ Pronto / 🔄 Futuro | [Detalhes] |

### Fluxo de dados (simplificado)

```
[Input] 
  ↓
[Processamento] 
  ↓
[Output/Persistência] 
  ↓
[Visualização]
```

### Políticas e Compliance

| Política | Aplicação | Status |
|---|---|---|
| **WCAG 2.1 AA** | [Como aplicamos] | ✅ MVP |
| **LGPD** | [Como protegemos dados] | ✅ MVP |
| **[Outro requerimento]** | [Como atendemos] | ✅ Futuro |

---

## 7. Critérios de Aceite Técnicos (Handoff)

### Critério 1 — [Descrição funcional]

**Dado que** [Estado inicial]  
**Quando** [O que o usuário faz]  
**Então:**
- [ ] [Resultado esperado 1]
- [ ] [Resultado esperado 2]
- [ ] [Resultado esperado 3]

**Aceitação:** [O que torna este critério "pronto"]

---

### Critério 2 — [Descrição funcional]

**Dado que** [Estado inicial]  
**Quando** [O que o usuário faz]  
**Então:**
- [ ] [Resultado esperado]
- [ ] [Comportamento esperado]

**Aceitação:** [O que torna este critério "pronto"]

---

### Critério 3 — Performance (Não Funcional)

**Dado que** [Condição de teste]  
**Quando** [Ação realizada]  
**Então:**
- [ ] Tempo de resposta < [X]ms
- [ ] Taxa de erro < [Y]%
- [ ] Throughput > [Z] requisições/s

**Aceitação:** [Validação via ferramenta de performance]

---

### Critério 4 — Acessibilidade (Não Funcional)

**Dado que** [Elemento X está na página]  
**Quando** [Navegação ou interação]  
**Então:**
- [ ] Contraste WCAG AA ≥ 4.5:1
- [ ] Elemento tem `aria-label` ou texto visível
- [ ] Teclado consegue acessar (Tab order lógico)

**Aceitação:** [Validação via Lighthouse/axe]

---

### Critério 5 — [Outro aspecto importante]

**Dado que** [...]  
**Quando** [...]  
**Então:**
- [ ] [...]

**Aceitação:** [...]

---

## Roadmap & Sequência de Desenvolvimento

### MVP (Agora até [DATA])
- 🔲 [Feature 1]
- 🔲 [Feature 2]
- 🔲 [Testes]
- 🔲 [Deploy]

### v1.5 ([PERÍODO])
- 🔲 [Feature 3]
- 🔲 [Melhorias]

### v2.0 ([PERÍODO])
- 🔲 [Features maiores]
- 🔲 [Integrações]

### Roadmap aberto
- 🔲 [Futuro distante]

---

## Referências & Links

| Recurso | URL | Propósito |
|---|---|---|
| Documentação técnica | [Link] | [O quê] |
| Protótipo | [Link Figma/Miro] | [User flows] |
| Pesquisa | [Link Doc/Notion] | [Dados qualitativos] |
| Ticket | [Link Jira/Linear] | [Rastreamento] |

---

## Histórico de Versões

| Versão | Data | Mudanças |
|---|---|---|
| 1.0 | [DATA] | Versão inicial |
| [1.1] | [DATA] | [O que mudou] |

---

**Última revisão:** [DATA]  
**Revisão por:** [NOME]  
**Status:** ✅ Pronto para desenvolvimento / 🔄 Em revisão / ❌ Rascunho
