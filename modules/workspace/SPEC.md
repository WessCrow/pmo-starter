# SPEC.md — Workspace Semântico

> **Feature:** Flat Workspace & Semantic Tagging  
> **Módulo:** `workspace`  
> **Criado em:** 2026-05-15  
> **Última atualização:** 2026-05-15  
> **Contexto global:** ver `CONTEXT.md` na raiz do projeto

---

## 📦 Entidades

> Modelos de dados para o workspace plano guiado por IA.

```ts
type Project = {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  createdAt: Date;
};

type ArtifactStatus = 'draft' | 'stable' | 'archived';

type Tag = {
  id: string;
  label: string;
  type: 'ai-generated' | 'manual';
  color?: string;
};

type Artifact = {
  id: string;
  projectId: string;
  name: string;
  type: 'PRD' | 'PROTOTYPE' | 'MISC';
  content: string; // Markdown ou JSON
  status: ArtifactStatus;
  tags: Tag[];
  lastModified: Date;
  createdAt: Date;
};
```

---

## 🖥️ Estados de UI

> Estados da lista de artefatos.

| Estado | Descrição | Trigger |
|---|---|---|
| `empty` | Projeto recém-criado | Nenhum artefato gerado no projeto. |
| `loaded` | Grid/Lista de artefatos | Exibe cards com tags e status visíveis. |
| `searching` | Estado de busca ativa | O usuário digita na barra de busca semântica. |
| `filtering` | Filtro por tag/status aplicado | A lista é reduzida com base nos chips selecionados. |

---

## 🗺️ Fluxos

### Happy Path — Organização via Tags

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | Gera um novo PRD via Chat | IA gera o documento e sugere 3 tags baseadas no conteúdo. |
| 2 | Visualiza o Workspace | O PRD aparece com as tags aplicadas (ex: `#Auth`, `#RegraDeNegocio`). |
| 3 | Clica em uma Tag no Sidebar | A lista filtra instantaneamente todos os artefatos com aquela tag. |
| 4 | Altera status para "Archived" | O artefato desaparece da visão principal e vai para o filtro de arquivados. |

### Happy Path — Busca Semântica

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | Digita "Como funciona o login?" | Sistema busca no conteúdo de todos os PRDs do projeto. |
| 2 | Clica no resultado | Abre o editor de PRD na seção específica de autenticação. |

---

## 🧩 Componentes desta feature

| Componente | Arquivo | Propósito |
|---|---|---|
| `ArtifactGrid` | `modules/workspace/components/artifact-grid.tsx` | Lista principal de cards de artefatos |
| `SemanticSearchBar` | `modules/workspace/components/search-bar.tsx` | Input de busca com IA / Fuzzy search |
| `TagCloud` | `modules/workspace/components/tag-cloud.tsx` | Filtros rápidos de tags no sidebar |
| `StatusFilter` | `modules/workspace/components/status-filter.tsx` | Tabs para alternar entre Draft/Stable/Archived |

---

## 📐 Decisões locais

| Decisão | Motivo |
|---|---|
| Abolição de Pastas | Pastas aninhadas são rígidas. Tags permitem que um arquivo pertença a múltiplos "contextos" simultaneamente. |
| IA-First Tagging | Reduz o trabalho manual do PM. A organização acontece como um "subproduto" da criação. |
| Flat Navigation | Mantém a UI limpa e focada em busca, seguindo o padrão de apps modernos de produtividade (Linear, Raycast). |

---

## 📍 Estado atual

**Fase:** Especificação técnica concluída.  
**Último trabalho:** Pivot de lógica de pastas para Workspace Semântico no PRD e SPEC.  
**Próximo passo:** Desenvolver o layout da `ArtifactGrid` e `TagCloud`.  
**Bloqueios:** Nenhum.
