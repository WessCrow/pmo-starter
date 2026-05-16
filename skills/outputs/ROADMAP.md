# ROADMAP — P.M.O-STARTER

> **Produto:** aplicação PMO-STARTER  
> **Última atualização:** 2026-05-15

---

## Visão geral de fases

| Fase | Nome | Status |
|---|---|---|
| 0 | Fundação repositório + governance | Concluída |
| 1 | MVP `/project/new` (chat, upload, preview, papéis, download, mocks) | **Concluída** |
| 1b | Higiene UX/A11y + docs (`RULES.md`, render seguro, tablists, `main`) | **Concluída** |
| 2 | Protótipo dedicado (URL, telas, compartilhamento) | Próxima |
| 3 | Workspace persistente + busca/tags | Backlog |
| 4 | Auth + multi-usuário | Backlog |
| 5 | IA produção (API + observabilidade) | Backlog |

---

## Concluído (detalhe)

- [x] Landing e rota **`/project/new`**
- [x] Modos **Chat** e **Upload** (UI sem modo formulário, conforme `Start.md`)
- [x] Preview: visão geral + abas (artefatos + overview protótipo)
- [x] Contexto `NewProjectProvider` com fases 1–3 e geração mock
- [x] Download `.md` e HTML encapsulado
- [x] Storybook 10 com stories relevantes (evolução contínua)
- [x] Passada **A11y / semântica / segurança de texto IA** (ver `CONTEXT.md`)

---

## Em progresso / próximo

| Item | Prioridade | Notas |
|---|---|---|
| Rota **`/project/prototype/[id]`** ou equivalente | Alta | PRD Feature 2; hoje só preview + download |
| Integrar ou remover **Double Check** e `artifact-selector` | Média | Evitar código/contexto divergentes |
| Persistência (Supabase) + troca mock → API | Alta | Quando validar UX |
| Testes E2E ou smoke no fluxo novo projeto | Média | |
| Resolver warnings **TypeScript** em componentes legados | Baixa | `tsc` limpo no CI |

---

## Backlog (extraído do PRD)

- Editor canvas de protótipo
- Link público somente leitura com TTL
- Busca semântica no workspace
- Onboarding auth de 3 passos
- Integrações Jira/Linear (export)

---

## Histórico

| Data | Mudança |
|---|---|
| 2026-05-15 | Roadmap reescrito para o produto PMO-STARTER; fases 1 e 1b marcadas concluídas |
| 2026-05-10 | Conteúdo anterior referia-se ao sistema STARTER de skills — arquivado/substituído |
