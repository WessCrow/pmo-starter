# 📖 Como Usar o Template de PRD

**Versão:** 1.0  
**Data:** 2026-05-16  
**Para:** PMs, Product Leads, Stakeholders

---

## 🎯 O que é este template?

Este é um **template estruturado de PRD** com 7 seções que funciona para **qualquer tipo de produto, feature ou iniciativa** que você esteja documentando.

**Baseado em:** Melhores práticas de Product Management (Reforge, SVPG, Lenny's PM)  
**Testado em:** PMO-STARTER (v2.0)  
**Extensível:** Você pode customizar conforme a complexidade do seu projeto

---

## 🏗️ As 7 Seções Explicadas

### **Seção 1: Alinhamento Estratégico & Outcomes**

Responde: **"Por quê estamos fazendo isso?"**

- Conecta à estratégia da empresa
- Define OKRs e KPIs (métrica primária + secundárias)
- Ajuda stakeholders a entender o "por quê"

**Quando preencher:**
- Sempre (mesmo em features pequenas)

**O que colocar:**
- Visão clara (2-3 linhas)
- Objetivos de negócio (3-5 items)
- Métrica primária (1 main metric)
- Métricas secundárias (3-5 guardrails)

**Exemplo ruim:**
> "Vamos melhorar a navegação"

**Exemplo bom:**
> "Queremos reduzir o tempo-para-conclusão de 45 min para ≤15 min, movendo a métrica de eficiência operacional e aumentando NPS de usabilidade para ≥8/10."

---

### **Seção 2: O Problema sob a Ótica do Usuário**

Responde: **"Qual é a dor real?"**

- Descreve o problema com evidências
- Inclui personas reais (não ficcionais)
- Usa dados qualitativos + quantitativos

**Quando preencher:**
- Sempre (validação é crítica)

**O que colocar:**
- Descrição do fluxo atual
- Persona principal (nome, contexto, dor)
- Persona secundária (se houver)
- Dados que validam a dor

**Exemplo ruim:**
> "Usuários acham difícil usar o sistema"

**Exemplo bom:**
> "Rafael, PM Sênior, passa 30-40% do seu tempo alternando entre 4 ferramentas (Notion, Figma, Jira, Google Docs). 35% dos PRDs são revisados/refeitos, indicando falta de clareza estrutural."

---

### **Seção 3: Escopo da Solução (Thin Slice / MVP)**

Responde: **"O que vamos construir? E o que NÃO vamos?"**

- Define escopo MIN para validar hipóteses
- Deixa explícito o que fica fora
- Formula hipóteses de valor

**Quando preencher:**
- MVP → sim (tudo aqui é essencial)
- Feature expandida → sim (delimita expansões)

**O que colocar:**
- Features dentro do MVP (tabela com ✅/❌)
- Features fora (com razão da deferência)
- Hipótese principal (GIVEN-WHEN-THEN format)
- Hipóteses secundárias (suposições a validar)

**Exemplo ruim:**
> "Vamos fazer chat, upload, preview, download e protótipo"

**Exemplo bom:**
> "Vamos fazer chat (3 fases) + upload + preview (abas) + download (MD + HTML). FORA: protótipo clicável (v2.0), autenticação (Supabase), versionamento (backlog). Hipótese: reduzir tempo-para-doc se oferecermos chat guiado."

---

### **Seção 4: Jornada do Usuário & Requisitos**

Responde: **"Como o usuário vai usar isso?"**

- Descreve o fluxo passo-a-passo
- Inclui cenários alternativos
- Define regras de negócio

**Quando preencher:**
- Sempre (especialmente para features interativas)

**O que colocar:**
- Happy path (13 passos no máx)
- Colunas: Passo, Ação do usuário, Resposta do sistema, Tela
- 2-3 cenários alternativos (upload, múltiplos papéis, etc)
- Regras de negócio ("se X, então Y")

**Exemplo ruim:**
> "Usuário coloca dados, clica gerar, vê resultado"

**Exemplo bom:**
> "Usuário clica Chat → Responde pergunta 1 (fase 1) → Sistema exibe pergunta 2 → Avança para fase 2 → Completa fase 3 → Seleciona papéis (PM/PO/GP) → Clica Gerar → Sistema mostra abas (Visão Geral, Documentos, Protótipo)"

---

### **Seção 5: Casos de Borda & Tratamento de Erros**

Responde: **"E quando as coisas não dão certo?"**

- Descreve empty states
- Define mensagens de erro amigáveis
- Explica como usuário se recupera

**Quando preencher:**
- MVP → sim (erros quebram UX)
- Feature simples → sim (edge cases importam)

**O que colocar:**
- 3-5 empty states (primeira vez, sem dados, etc)
- 4-6 error scenarios (timeout, input inválido, etc)
- Mensagens em linguagem simples (sem jargão técnico)
- Ação de recuperação (retry, fallback, etc)

**Exemplo ruim:**
> "Se der erro, mostrar mensagem"

**Exemplo bom:**
> "Timeout de IA: Exibir 'Demorou demais gerar. Tente novamente.' com botão Retry (contexto mantido). Upload inválido: Rejeitar no client com 'Apenas TXT, MD, PDF. Você selecionou DOCX.'"

---

### **Seção 6: Lógica de Sistemas & Impacto Operacional**

Responde: **"Quais são as dependências técnicas?"**

- Lista APIs, serviços, DBs necessárias
- Define fluxo de dados
- Menciona compliance/políticas

**Quando preencher:**
- MVP → sim (arquitetura importa cedo)
- Planejamento → sim (prepara para produção)

**O que colocar:**
- Dependências (tabela: tipo, status, notas)
- Fluxo de dados (diagrama simples)
- Políticas (WCAG, LGPD, SOC2, etc)

**Exemplo ruim:**
> "Usar API de IA"

**Exemplo bom:**
> "Mock AI Service (pronto), Mock Storage (pronto), React Context (estado), Next.js 16 (framework), renderização segura com simple-markdown.tsx. Planejado: Supabase (auth + DB), LLM real (OpenAI/Claude API)."

---

### **Seção 7: Critérios de Aceite Técnicos**

Responde: **"Como sabemos que ficou pronto?"**

- BDD-style (GIVEN-WHEN-THEN)
- Cobertura: funcional + performance + a11y + etc
- Rastreável (QA consegue validar)

**Quando preencher:**
- Sempre (antes de passar para eng)
- MVP → todos os critérios
- Feature expandida → sim

**O que colocar:**
- 5-8 critérios BDD
- Mínimo 1 funcional + 1 performance + 1 a11y
- Checklist dentro de cada critério (QA marca)

**Exemplo ruim:**
> "Critério 1: Chat deve funcionar"

**Exemplo bom:**
> "Critério 1: DADO que usuário clica em Chat, QUANDO responde pergunta 1, ENTÃO (☐ mensagem aparece, ☐ pergunta 2 exibe após 1s, ☐ preview atualiza com dados). Aceitação: 3/3 checkboxes marcados, zero erros no console."

---

## 📋 Passo a Passo para Preencher

### **Passo 1: Copiar Template**
```bash
cp PRD-TEMPLATE.md PRD-[seu-projeto].md
```

### **Passo 2: Preencher Seção 1 (15 min)**
- [ ] Visão geral (1-2 linhas)
- [ ] OKRs (3-5 items)
- [ ] Métrica primária
- [ ] Métricas secundárias (3-5)

### **Passo 3: Preencher Seção 2 (30 min)**
- [ ] Persona principal (nome, contexto, dor)
- [ ] Fluxo atual (5-7 passos)
- [ ] Evidências quantitativas (3+)
- [ ] Evidências qualitativas (3+)

### **Passo 4: Preencher Seção 3 (20 min)**
- [ ] Features in-scope (5-10 items)
- [ ] Features out-of-scope (3-5 items + razão)
- [ ] Hipótese principal
- [ ] Hipóteses secundárias (2-3)

### **Passo 5: Preencher Seção 4 (45 min)**
- [ ] Happy path (8-15 passos)
- [ ] 2-3 cenários alternativos
- [ ] Regras de negócio (3-5)

### **Passo 6: Preencher Seção 5 (30 min)**
- [ ] 3-5 empty states
- [ ] 4-6 error scenarios
- [ ] Mensagens amigáveis

### **Passo 7: Preencher Seção 6 (20 min)**
- [ ] Dependências (tabela)
- [ ] Fluxo de dados
- [ ] Políticas

### **Passo 8: Preencher Seção 7 (40 min)**
- [ ] 5-8 critérios BDD
- [ ] Cobertura (funcional, perf, a11y)
- [ ] Checklist em cada critério

### **Total:** ~3 horas para PRD completo

---

## ✅ Checklist de Qualidade

Antes de finalizar, verifique:

- [ ] **Seção 1:** Métrica primária é mensurável?
- [ ] **Seção 2:** Personas têm nomes reais (não "usuário")?
- [ ] **Seção 3:** Há dados para validar cada hipótese?
- [ ] **Seção 4:** Happy path tem ≤15 passos?
- [ ] **Seção 5:** Mensagens de erro são amigáveis?
- [ ] **Seção 6:** Todas as APIs/DBs estão listadas?
- [ ] **Seção 7:** Critérios são BDD-style (GIVEN-WHEN-THEN)?
- [ ] **Geral:** PRD é legível para alguém novo no projeto?

---

## 🎨 Customizações por Tipo de Projeto

### Para Backend/API
- Seção 4: Inclua exemplos de requisição/resposta
- Seção 6: Detalhe schema de banco de dados
- Seção 7: Adicione critério de latência + throughput

### Para Mobile
- Seção 4: Inclua mockups de cada tela
- Seção 5: Adicione offline behavior
- Seção 7: Adicione critério de battery/data usage

### Para Infra/DevOps
- Seção 2: Descreva problema operacional (não user)
- Seção 3: Defina SLOs (não features)
- Seção 6: Detalhe arquitetura técnica
- Seção 7: Adicione critério de uptime/latency

### Para Feature Pequena
- Seção 1: Simplifique (1 métrica primária)
- Seção 3: In/out scope pode ser lista simples
- Seção 7: 3-4 critérios é suficiente

---

## 🚀 Dicas de Ouro

1. **Comece pela Seção 2** — Se você entender o problema, o resto flui
2. **Use dados, não opinião** — "Acho que" não é estratégia; "dados mostram" é
3. **Mantenha métrica primária simples** — 1 número principal > 10 métricas vagas
4. **Happy path ≤15 passos** — Se ultrapassar, feature é muito grande
5. **Revise com engenharia** — Seção 7 é feita COM eng, não PARA eng
6. **Atualize conforme aprende** — PRD é vivo, não documento estático

---

## 📞 Perguntas Frequentes

**P: Preciso preencher TODAS as seções?**  
R: Sim. Mesmo features pequenas precisam de contexto completo. Adapte a profundidade conforme necessário.

**P: E se o projeto for muito grande?**  
R: Divida em multiple PRDs (um por feature). Use roadmap da Seção 7 para conectar.

**P: Posso usar este template para um projeto existente?**  
R: Sim! Preencha baseado em realidade atual. Será documento de "como estamos" vs. "como queremos".

**P: Quanto tempo leva preencher?**  
R: ~3 horas para PRD completo. Feature pequena: ~1.5h. Feature grande: ~4-5h.

**P: Quem deve preencher?**  
R: PM/Product Lead (com input de eng + design + stakeholders).

---

## 📚 Referências

- **Reforge Product Management** — Estrutura de seções
- **Inspired by Marty Cagan** — Hipóteses de valor
- **SVPG** — Critérios de aceite
- **Lenny's Product Newsletter** — Exemplo de PRDs reais

---

**Status:** ✅ Pronto para usar  
**Última atualização:** 2026-05-16  
**Mantido por:** [SEU NOME]
