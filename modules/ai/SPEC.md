# SPEC.md — AI Chat Onboarding & Generator

> **Feature:** AI Chat & Document Generator  
> **Módulo:** `ai`  
> **Criado em:** 2026-05-15  
> **Última atualização:** 2026-05-15  
> **Contexto global:** ver `CONTEXT.md` na raiz do projeto

---

## 📦 Entidades

> Modelos de dados que esta feature cria, lê ou manipula.

```ts
type ChatPhase = 'context' | 'solution' | 'restrictions' | 'double-check' | 'generation';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type DocumentType = 
  // PM
  | 'lean_canvas' | 'risk_matrix' | 'kpis' | 'rice_matrix'
  // PO
  | 'prd' | 'backlog' | 'acceptance_criteria' | 'user_journey' | 'dod' | 'feature_detail'
  // GP
  | 'project_charter' | 'roadmap' | 'communication_plan' | 'raci';

type GeneratedDocument = {
  id: string;
  projectId: string;
  type: DocumentType;
  content: string; // Markdown
  status: 'draft' | 'final';
  createdAt: Date;
};
```

---

## 🖥️ Estados de UI

> Estados que os componentes desta feature podem assumir.

| Estado | Descrição | Trigger |
|---|---|---|
| `empty` | Chat inicial, pronto para começar | O usuário acessa a tela de "Novo Projeto via IA". |
| `partial` | Chat em andamento (Split View) | O usuário está respondendo às perguntas das Fases 1 a 3. |
| `loading` | IA analisando / gerando rascunho | O usuário enviou a mensagem e aguarda retorno. |
| `double-check`| Tela de revisão final | Todas as fases foram preenchidas e a IA retornou o resumo. |
| `generation`| Seleção de artefatos por papel | O usuário aprovou o resumo e escolhe quais arquivos exportar. |

---

## 🗺️ Fluxos

### Happy Path — Coleta e Geração Guiada

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | Acessa o gerador de IA | Exibe "Intent Preview" e primeira pergunta do Contexto. |
| 2 | Responde as perguntas (Fase 1-3) | O Chat avança, enquanto o painel direito atualiza o rascunho. |
| 3 | Finaliza respostas | O sistema renderiza a tela de **Double Check** com confiança da IA. |
| 4 | Clica em "Gerar Documentos" | O sistema exibe o checklist de papéis (PM, PO, GP). |
| 5 | Seleciona e clica em "Salvar" | O sistema escreve os arquivos `.md` e finaliza o onboarding. |

### Alternative Path — Upload de Documento / Rascunho

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | Faz upload de arquivo ou cola texto livre | IA analisa e pula as perguntas do chat inicial. |
| 2 | Revisa o parser no Double Check | Vai direto para a tela de aprovação de resumo e seleção de artefatos. |

### Exception Path — Baixa Completude de Dados

| Passo | Ação do usuário | Resposta do sistema |
|---|---|---|
| 1 | Chega no Double Check com respostas vagas | O painel exibe "Confidence Signal: Baixa" e destaca as áreas sem resposta. |
| 2 | Tenta gerar sem corrigir | O sistema emite alerta visual "Documento pode ficar genérico. Deseja complementar?". |

---

## 🧩 Componentes desta feature

> Apenas componentes criados especificamente para esta feature.

| Componente | Arquivo | Propósito |
|---|---|---|
| `ChatInterface` | `modules/ai/components/chat-interface.tsx` | Painel esquerdo do chat iterativo |
| `DraftPreview` | `modules/ai/components/draft-preview.tsx` | Painel direito em formato de split-view (Rascunho) |
| `DoubleCheckView` | `modules/ai/components/double-check-view.tsx` | Tela de revisão final |
| `ArtifactSelector` | `modules/ai/components/artifact-selector.tsx` | Modal/Card listando os documentos por PM, PO e GP |

---

## 📐 Decisões locais

| Decisão | Motivo |
|---|---|
| Split View com shadcn/ui Resizable | Garante que o usuário possa ver a construção do documento sem perder o chat. |
| Exportação strictly in `.md` | Facilita portabilidade e integra com o ecossistema de devs (GitHub). |
| Agrupamento por Papel (PM/PO/GP) | Reduz a carga cognitiva na hora de escolher quais dos 14 artefatos gerar. |

---

## 📍 Estado atual

**Fase:** Especificação concluída.  
**Último trabalho:** Adição da feature ao PRD global e criação desta documentação de módulo (SPEC).  
**Próximo passo:** Implementar o layout estrutural (Split View) usando `Resizable` do shadcn.  
**Bloqueios:** Nenhum.
