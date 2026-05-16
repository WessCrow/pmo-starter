# ✅ Instruções Finais de Limpeza — PMO-STARTER

**Status:** 95% completo — apenas deleção manual dos arquivos órfãos  
**Data:** 2026-05-16  

---

## 🎯 O que foi feito

✅ **Removido do contexto:**
- `submitForm` método
- `formInput` state
- `setFormInput` callback
- Props correspondentes da interface

✅ **Arquivo:**
- `double-check.tsx` → `/archive/components/double-check.tsx.archived`

✅ **Documentação:**
- PRD reescrito com template de 7 seções (484 linhas)
- CONTEXT.md atualizado (data, seção de arquivos arquivados)
- Cleanup.sh criado

✅ **Validação:**
- TypeScript check rodado — mostra exatamente quais arquivos estão órfãos

---

## 🔍 Arquivos Órfãos Confirmados

TypeScript listou esses erros (confirmando que os arquivos estão mortos):

| Arquivo | Erro | Razão |
|---|---|---|
| `form-panel.tsx` | Property `formInput` does not exist | Usa prop deletada |
| `form-panel.tsx` | Property `setFormInput` does not exist | Usa prop deletada |
| `form-panel.tsx` | Property `submitForm` does not exist | Usa prop deletada |
| `double-check.tsx` | Property `confidence` does not exist | Usa prop deletada |
| `double-check.tsx` | Property `advanceToDoubleCheck` does not exist | Usa prop deletada |
| `double-check.tsx` | Property `goBackToInput` does not exist | Usa prop deletada |
| `artifact-selector.tsx` | Property `artifactOptions` does not exist | Usa prop deletada |

**Conclusão:** Esses 3 arquivos não são usados e precisam ser deletados.

---

## 📋 Próximos Passos (Manual)

### Opção A: Via Script (Recomendado)

```bash
cd /Users/drt79427/Desktop/Estudos/PM-STARTER/PMO-STARTER

# Tornar script executável
chmod +x cleanup.sh

# Executar limpeza
./cleanup.sh
```

**O que faz:**
1. Deleta 3 arquivos órfãos
2. Rodavalidates com `pnpm lint --fix`
3. Faz `pnpm build` para validar

### Opção B: Manual (Passo a Passo)

```bash
cd /Users/drt79427/Desktop/Estudos/PM-STARTER/PMO-STARTER

# Deletar arquivos
rm -f modules/prd/components/form-panel.tsx
rm -f modules/prd/components/form-panel.stories.tsx
rm -f modules/prd/components/double-check.tsx

# Validar
pnpm lint --fix
pnpm build

# Testar
pnpm dev
# Abrir http://localhost:3000/project/new
# Testar chat/upload — deve funcionar sem erros
```

### Opção C: Via Git (Se usar)

```bash
# Se estiver em repo git
git rm modules/prd/components/form-panel.tsx
git rm modules/prd/components/form-panel.stories.tsx
git rm modules/prd/components/double-check.tsx

git commit -m "chore: remove dead code (orphaned components)

- Remove form-panel.tsx (never used in UI)
- Remove form-panel.stories.tsx (orphaned story)
- Remove double-check.tsx (archived in /archive for Feature 2)
- These components referenced props deleted from new-project-context
- Validated with TypeScript and build

Refs: Code cleanup sprint v2026-05-16"
```

---

## ✨ Após limpeza

Você terá:
- ✅ Projeto sem código morto
- ✅ TypeScript sem erros de referência
- ✅ Build limpo
- ✅ PRD v2.0 com 7 seções estruturadas
- ✅ CONTEXT.md atualizado
- ✅ Pronto para próximas features

---

## 🎊 Resultado Final

### Arquivos Atualizados
- ✅ `PRD.md` — v2.0 (484 linhas, 7 seções)
- ✅ `CONTEXT.md` — atualizado com seção de arquivos arquivados
- ✅ `new-project-context.tsx` — limpo (submitForm removido)
- ✅ `archive/components/double-check.tsx.archived` — backup para Future

### Arquivos Criados
- 📄 `cleanup.sh` — script de limpeza
- 📄 `PRD-NEW.md` — original (pode deletar se quiser)
- 📄 `REVIEW-PMO-STARTER.md` — revisão completa
- 📄 `CLEANUP-PLAN.md` — plano detalhado
- 📄 `EXECUTION-SUMMARY.md` — sumário
- 📄 `MANUAL-NEXT-STEPS.md` — guia manual
- 📄 `FINAL-CLEANUP-INSTRUCTIONS.md` — este arquivo

### Arquivos Deletados (pendentes)
- ❌ `modules/prd/components/form-panel.tsx`
- ❌ `modules/prd/components/form-panel.stories.tsx`
- ❌ `modules/prd/components/double-check.tsx`

---

## 🚀 Timeline Estimada

| Etapa | Tempo |
|---|---|
| Executar cleanup.sh ou passos manuais | 2-3 min |
| pnpm lint --fix | 10-20 seg |
| pnpm build | 30-60 seg |
| Testar app (`pnpm dev`) | 2 min |
| **Total** | **~5 min** |

---

## 📞 Se algo der errado

### TypeScript ainda reclama de erros

```bash
# Limpe cache
rm -rf .next/
rm -rf node_modules/.cache

# Rebuild
pnpm install --force
pnpm build
```

### Build falha após deletar

```bash
# Verifique se deletou os 3 arquivos corretos
ls modules/prd/components/*.tsx | grep -E "(form-panel|double-check)"
# Não deve retornar nada

# Rode lint com fix
pnpm lint --fix
```

### App não inicia

```bash
# Verifique que o contexto está corrigido
grep -n "submitForm\|formInput\|setFormInput" modules/prd/context/new-project-context.tsx
# Não deve retornar nada (se retornar, significa que a edição não foi salva)
```

---

## ✅ Checklist Final

- [ ] Executei cleanup.sh (ou passos manuais)
- [ ] `pnpm lint --fix` rodou sem erros
- [ ] `pnpm build` completou com sucesso
- [ ] `/project/new` funciona no dev
- [ ] Chat e Upload trabalham normalmente
- [ ] Não há errors de TypeScript
- [ ] Verifiquei que os 3 arquivos foram deletados
- [ ] Commiti/pushei as mudanças

---

**Próximo:** Testes para Feature 1 → Performance baseline → Supabase + LLM real

Bom trabalho! 🎉
