# 🧹 Plano de Limpeza de Código Morto — PMO-STARTER

**Data:** 2026-05-16  
**Status:** Planejamento  
**Impacto:** Reduz complexidade, melhora manutenibilidade  

---

## 1. Código Morto Identificado

### 1.1 `submitForm` — Modo Formulário (MORTO)

**Localização:**
- `modules/prd/context/new-project-context.tsx` (linhas 92, 94, 322-325, 393)
- `modules/prd/components/form-panel.tsx` — componente órfão

**Status:**
- ❌ Não há UI correspondente (conforme CONTEXT.md)
- ❌ Nunca é chamado no fluxo atual
- ⚠️ Ainda mantido no contexto e Props

**Impacto:**
- Confusão para novos desenvolvedores
- TypeScript lint warnings potenciais
- Aumenta surface area do contexto

**Ação recomendada:**
- **Remover** `submitForm` do contexto
- **Remover** `formInput` e `setFormInput` do contexto
- **Remover** ou **arquivar** `form-panel.tsx`
- **Atualizar** `new-project-context.tsx`

**Esforço:** 30 min

---

### 1.2 `double-check.tsx` — Componente não integrado (PARCIALMENTE MORTO)

**Localização:**
- `modules/prd/components/double-check.tsx` (150+ linhas)

**Status:**
- ❌ Importado em nenhum lugar ativo
- ⚠️ Referenciado em CONTEXT.md e PRD.md como "backlog"
- ❌ Não está no fluxo atual (Feature 1 → papéis → gerar → preview direto)

**Propósito original:**
- Exibir resumo do contexto coletado
- Mostrar "completude" (confidence score)
- Permitir edição antes de gerar artefatos
- Indicar campos faltantes

**Decisão de produto:**
- PRD.md linha 81: "Double Check dedicada com resumo revisável... não integrada ao fluxo atual"
- CONTEXT.md: "Double Check... podem exigir alinhamento com new-project-context"

**Opções:**

#### Opção A: Remover (Recomendado para MVP)
- ❌ **Perde:** screen de confirmação visual
- ✅ **Ganha:** reduz complexidade, acelera iteração
- 📋 **Trade-off:** Usuário não vê "confidence score" antes de gerar

#### Opção B: Integrar (Futuro — Feature 2)
- ✅ **Mantém:** UX mais segura e educativa
- ❌ **Custo:** 2-3 dias de integração
- 📅 **Timeline:** Depois de Feature 1 estabilizada

#### Opção C: Arquivar (Meio termo)
- ✅ **Mantém:** código se precisar voltar
- ✅ **Limpa:** não interfere no fluxo atual
- 🗂️ **Local:** `archive/components/double-check.tsx.archived`

**Ação recomendada:**
- **Arquivar** por enquanto (Opção C)
- Documentar em `CONTEXT.md` que está em backlog
- Revisitar após Feature 1 estabilizada

**Esforço:** 15 min (copiar para archive, remover import)

---

### 1.3 `artifact-selector.tsx` — Status incerto (INVESTIGAR)

**Localização:**
- `modules/prd/components/artifact-selector.tsx`

**Status:**
- ⚠️ Importado em algum lugar?
- ⚠️ Propósito não claro

**Ação recomendada:**
- Verificar se é usado
- Se morto: remover ou arquivar
- Se ativo: documentar propósito

**Esforço:** 10 min

---

### 1.4 Imports não utilizados

**Identificado em:**
- `modules/prd/components/form-panel.tsx` (se for remover)
- Potencialmente em outros componentes

**Ação recomendada:**
- Rodar `next lint` após limpeza
- Remover imports cegos

**Esforço:** 5 min

---

## 2. Plano de Execução (Fase 1 — MVP Cleanup)

### Sequência

1. **Audit** — Confirmar o que é realmente morto (15 min)
   - Grep por imports de `form-panel`, `double-check`, `artifact-selector`
   - Rodar `next lint` para listar avisos

2. **Decisão de Double Check** — Arquivo vs. Remove (10 min)
   - **Decisão:** Arquivar (Opção C) — permite reverter sem git history
   - **Raciocínio:** Backlog explícito, não interfere no MVP

3. **Remove submitForm** — Limpar contexto (30 min)
   - Remover `formInput`, `setFormInput`, `submitForm` de `new-project-context.tsx`
   - Remover `form-panel.tsx` ou arquivar
   - Atualizar tipos em `new-project-context.tsx`
   - Testar que o app ainda inicia sem erro

4. **Arquivar Double Check** — Mover para backlog (15 min)
   - Criar pasta `archive/` na raiz ou em `skills/`
   - Mover `double-check.tsx` para `archive/components/double-check.tsx.archived`
   - Remover imports em any Component
   - Documentar em `CONTEXT.md` (seção "Backlog / Archived")

5. **Verify artifact-selector** — Decidir sorte (10 min)
   - Se morto: remover ou arquivar
   - Se ativo: documentar

6. **Lint & Verify** — Garantir sem erros (10 min)
   - `pnpm lint`
   - `pnpm build` (quick check)
   - Abrir em dev (`pnpm dev`), testar `/project/new`

### Timeline
- **Total:** ~1.5 horas
- **Opportunity:** Fazer junto com reescrita do PRD

---

## 3. O Que NÃO Remover

✅ **Manter:**
- `services/ai` (mock, funcional)
- `services/storage` (mock, funcional)
- `modules/prd/components/chat-panel.tsx` (ativo)
- `modules/prd/components/upload-panel.tsx` (ativo)
- `modules/prd/components/preview-panel.tsx` (ativo)
- `modules/prd/components/simple-markdown.tsx` (ativo, seguro)
- `components/ui/*` (shadcn, deixar como está)

❌ **Remover:**
- `submitForm` context method
- `form-panel.tsx` component
- `double-check.tsx` (ou arquivar)
- Imports/Props cegos

---

## 4. Documentação Pós-Cleanup

**Arquivo:** `CONTEXT.md`

**Adicionar seção:**

```markdown
## Componentes Arquivados (Backlog)

| Componente | Motivo | Data | Status |
|---|---|---|---|
| `double-check.tsx` | Backlog Feature 2 (Double Check flow) | 2026-05-16 | Arquivado em `archive/` |

**Onde:** `/archive/components/double-check.tsx.archived`  
**Razão:** UI não integrada ao MVP. Revisitar após Feature 1 estabilizada.
```

---

## 5. Checklist de Execução

- [ ] Confirmar imports de componentes mortos (grep)
- [ ] Remover `submitForm`, `formInput`, `setFormInput` de context
- [ ] Remover/arquivar `form-panel.tsx`
- [ ] Arquivar `double-check.tsx`
- [ ] Verificar `artifact-selector.tsx` — remover ou documentar
- [ ] Rodar `pnpm lint`
- [ ] Rodar `pnpm build`
- [ ] Testar `/project/new` no dev
- [ ] Atualizar `CONTEXT.md` com seção "Archived"
- [ ] Commit com mensagem clara

---

## 6. Commit Message

```
chore: remove dead code and archive backlog components

- Remove submitForm, formInput, setFormInput from new-project-context
- Remove form-panel.tsx (no UI mode in MVP)
- Archive double-check.tsx component (backlog for Feature 2)
- Update CONTEXT.md with archived components section

Refs: Review #1 — Code cleanup before PRD rewrite
```

---

## Próximas Etapas

Após limpeza:
1. Reescrever `PRD.md` conforme novo template
2. Atualizar `CONTEXT.md` com estado pós-limpeza
3. Implementar testes para Feature 1
4. Performance baseline (Lighthouse)
