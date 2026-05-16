# 🔧 Próximos Passos Manuais — Cleanup & PRD Reescrita

**Status:** 90% completo — faltam passos manuais finais  

---

## ✅ O Que Foi Feito Automaticamente

- ✅ Removido `submitForm`, `formInput`, `setFormInput` de `new-project-context.tsx`
- ✅ Criado arquivo `PRD-NEW.md` com template de 7 seções
- ✅ Criado `archive/components/double-check.tsx.archived`
- ✅ Gerado plan de limpeza detalhado + review + sumário

---

## 🔄 Passos Manuais (Para você executar)

### Passo 1: Validar mudanças no código

```bash
cd /Users/drt79427/Desktop/Estudos/PM-STARTER/PMO-STARTER

# Checar sintaxe TypeScript
pnpm lint

# Build rápido
pnpm build

# Dev (testar /project/new)
pnpm dev
```

**O que validar:**
- [ ] Lint sem erros
- [ ] Build completa
- [ ] App inicia normalmente
- [ ] `/project/new` funciona (chat/upload)
- [ ] Nenhum error de `useNewProject` faltando `submitForm`

---

### Passo 2: Deletar arquivos mortos (do repo)

```bash
rm -f modules/prd/components/form-panel.tsx
rm -f modules/prd/components/form-panel.stories.tsx
rm -f modules/prd/components/double-check.tsx
```

**O que deletar:**
- [ ] `form-panel.tsx` (nunca usado na UI)
- [ ] `form-panel.stories.tsx` (story órfã)
- [ ] `double-check.tsx` (arquivado em `/archive`)

**Confirmação:** Rodar `git status` — deve listar 3 deletions + 1 modified (context)

---

### Passo 3: Validar pós-limpeza

```bash
cd /Users/drt79427/Desktop/Estudos/PM-STARTER/PMO-STARTER

# Lint novamente (remover imports órfãos)
pnpm lint --fix

# Build novamente
pnpm build

# Testar app
pnpm dev
```

**O que validar:**
- [ ] Lint clean (sem warnings de imports órfãos)
- [ ] Build completa sem erro
- [ ] App inicia
- [ ] `/project/new` continua funcionando

---

### Passo 4: Atualizar PRD.md

```bash
# Copiar novo PRD para versão oficial
cp PRD-NEW.md PRD.md

# Opcional: manter v1.1 como backup
cp PRD.md PRD-v1.1.md.backup
```

**O que verificar:**
- [ ] `PRD.md` agora tem 7 seções estruturadas
- [ ] Conteúdo anterior é mantido (apenas restruturado)
- [ ] Nenhuma feature foi deletada, apenas reorganizada

---

### Passo 5: Commit & Push

```bash
git status  # confirmar mudanças

git add -A

git commit -m "chore: clean dead code and rewrite PRD v2.0

Removed:
- submitForm, formInput, setFormInput from new-project-context.tsx
- form-panel.tsx (never used in UI)
- form-panel.stories.tsx (orphaned story)
- double-check.tsx (archived in /archive for Feature 2)

Added:
- PRD.md rewritten with 7-section template
- Detailed personas, scenarios, edge cases
- BDD-style acceptance criteria
- Integrated roadmap (MVP → v2.5+)
- REVIEW-PMO-STARTER.md (project assessment)
- CLEANUP-PLAN.md (detailed cleanup sequence)
- EXECUTION-SUMMARY.md (what was done)

Refs: Code cleanup sprint, PRD rewrite"

# Push
git push origin [seu-branch]
```

---

## 📚 Documentação Gerada

Todos esses arquivos estão em `/Users/drt79427/Desktop/Estudos/PM-STARTER/`:

| Arquivo | Propósito | Leitura |
|---|---|---|
| `REVIEW-PMO-STARTER.md` | Review completo do projeto | 10 min |
| `CLEANUP-PLAN.md` | Plano detalhado de limpeza | 5 min |
| `EXECUTION-SUMMARY.md` | Sumário do que foi feito | 5 min |
| `MANUAL-NEXT-STEPS.md` | Este guia | 3 min |
| `PMO-STARTER/PRD-NEW.md` | Novo PRD com 7 seções | 20 min |

**Total de leitura:** ~45 min (recomendado antes de commit)

---

## 🎯 Checklist Final

- [ ] Rodei `pnpm lint` com sucesso
- [ ] Rodei `pnpm build` com sucesso
- [ ] `/project/new` funciona no `pnpm dev`
- [ ] Deletei 3 arquivos mortos
- [ ] Ran `pnpm lint --fix` (cleanup imports)
- [ ] Atualizei `PRD.md` com novo template
- [ ] Revisei novo PRD.md (7 seções)
- [ ] Executei `git commit` com mensagem clara
- [ ] Executei `git push`

---

## 🚨 Se algo der errado

### Problema: Lint erro após remoção de submitForm

**Solução:**
```bash
# Procure por imports/uso de submitForm
grep -r "submitForm" modules/

# Se encontrar fora de context, remova:
# import { submitForm } from "..."  ← delete

# Após remover:
pnpm lint --fix
```

### Problema: Build falha

**Solução:**
```bash
# Limpe cache Next.js
rm -rf .next/

# Rebuild
pnpm build

# Se persistir:
pnpm install --force
pnpm build
```

### Problema: Mudanças acidentais no PRD-NEW.md

**Solução:**
Você tem o original em `/Users/drt79427/Desktop/Estudos/PM-STARTER/PMO-STARTER/PRD-NEW.md`  
Copie novamente: `cp PRD-NEW.md PRD.md`

---

## 💡 Dicas Finais

1. **Antes de fazer commit:** Releia os 3 documentos de análise (Review, Cleanup, Summary) — eles contextualizam as mudanças

2. **Mensagem de commit:** Use a mensagem sugerida acima — ela documenta **por que** foi feito (não apenas o quê)

3. **Próximas prioridades** (após isso):
   - Implementar testes para Feature 1
   - Performance baseline (Lighthouse)
   - Preparar integração Supabase + LLM real

4. **Se estiver fazendo PR:** Linke este PR aos documentos:
   - "Veja REVIEW-PMO-STARTER.md para contexto"
   - "Plano detalhado em CLEANUP-PLAN.md"
   - "Novo PRD em PRD-NEW.md"

---

## ✨ Summary

Você completou:
- ✅ Análise profunda do projeto (Review + Cleanup Plan)
- ✅ Limpeza de código morto (submitForm removido)
- ✅ Reescrita de PRD com template industrial (7 seções)

Faltam:
- 🔄 Validar + deletar + commit (passos 1-5 acima)

**Tempo estimado para finalizar:** 15-20 min

Boa sorte! 🚀
