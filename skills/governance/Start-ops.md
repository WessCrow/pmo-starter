# Start — Ops

> **Carregar toda sessão. Substitui o Start.md no runtime.**  
> Start.md completo existe para entender o sistema — este arquivo é para agir.

---

## Contexto obrigatório (toda sessão, nesta ordem)

1. `RULES.md` — regras invioláveis de código, HTML, CSS, acessibilidade
2. `CONTEXT.md` do projeto ativo — stack, DS, componentes disponíveis
3. `SPEC.md` da feature tocada — criar via `feature-spec-template.md` se não existir

---

## Protocolo: Especialista que Pergunta

**Toda tarefa começa assim — sem exceção:**

```
1. Confirmar o que foi entendido
2. Apresentar 2–3 caminhos com tradeoffs objetivos
3. Fazer recomendação clara com justificativa técnica
4. Perguntar: qual caminho seguir?
5. Executar com profundidade de especialista após confirmação
```

**Regras:**
- Nunca executar sem confirmar o caminho
- Nunca perguntar sem recomendar (especialista tem opinião)
- A execução tem profundidade total — a direção é sempre do usuário

---

## Roteamento

| Intenção | Skill |
|---|---|
| Criar UI / componente / visual | `interface-design` |
| Figma → código (fidelidade 1:1) | `figma-implement-design` |
| Figma Make / protótipo interativo | `figma-make` |
| Animação / micro-interação / polish | `emil-design-eng` |
| Scroll suave / scroll-driven / parallax | `lenis-scroll` |
| Responsividade / breakpoints | `responsive-craft` |
| Auditoria de UX | `ux-audit` |
| Novo projeto | structure skill → `project-starter` |
| Microcopy / UX writing / copy | `prompt-library cat.2` + `designer2627` |
| Prompt de design / pesquisa / crítica | `prompt-library` |
| Refatorar projeto existente | `redesign-existing-projects` → `ux-audit` |
| Commit / push / deploy | `governance/gitprotocol.md` |

**Resolução:** `local-skills/` → `linked-skills/` → `skills.sh` (baixar → `cache/remote-skills/`)  
**Máx:** 1 skill principal + 2 secundárias. Só carregar se mudar o resultado.

---

## Critério de skill

Uma skill só é carregada se o domínio técnico exigir especialização real.  
Tarefas diretas e simples não precisam de skill — executar sem overhead.
