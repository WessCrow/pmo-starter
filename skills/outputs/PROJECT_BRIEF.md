# PROJECT_BRIEF — P.M.O-STARTER

> **Produto:** P.M.O-STARTER (aplicação — não confundir com o sistema de skills STARTER)  
> **Tipo:** Documento vivo do produto  
> **Última atualização:** 2026-05-15

---

## Visão em uma frase

Dar a PMs e POs um **único lugar** para transformar contexto de produto em **PRD, artefatos por papel e um protótipo HTML navegável**, com IA — hoje validado com **fluxo real e dados mockados**.

---

## Problema

Documentação e protótipo nascem em ferramentas diferentes; o contexto se perde e o retrabalho é alto.

## Proposta de valor

1. **Coleta guiada** (chat em 3 fases ou upload de texto) com **preview espelhado** do que será o documento.  
2. **Papéis** (PM, PO, GP) definem quais artefatos a “IA” gera.  
3. **Entrega:** Markdown no preview + download; telas de protótipo em **iframe** e pacote HTML.  
4. **Qualidade:** interface alinhada a **WCAG / semântica / segurança de conteúdo** (`skills/governance/RULES.md`).

## Para quem é

- **Primário:** Product Managers que precisam documentar rápido e alinhar time.  
- **Secundário:** Product Owners que precisam de backlog/PRD e algo visual cedo.

## O que já provamos (MVP)

- Rota **`/project/new`** usável ponta a ponta com mocks.  
- Split view, abas de preview, download.  
- Base técnica Next.js 16 + Tailwind v4 + shadcn.

## O que falta para o “PRD clássico”

- Tela **Double Check** explícita no fluxo.  
- **Persistência real** e **IA real** via `services/*`.  
- **Protótipo** com rota pública dedicada e editor, se seguir roadmap estendido.

## Restrições atuais

- Sem login; sem banco em produção.  
- Alguns componentes legados podem estar **desalinhados** com o contexto até uma passada de refino.

## Métrica de sucesso imediata

Time interno consegue **demo convincente** do fluxo novo projeto em menos de 10 minutos, sem erro de UX crítico em leitores de tela nos fluxos principais.

---

## Histórico

| Data | Nota |
|---|---|
| 2026-05-15 | Brief reescrito para o **produto** PMO-STARTER; alinhado ao MVP em código |
| 2026-05-10 | (Arquivo herdado descrevia o sistema STARTER de skills — substituído) |
