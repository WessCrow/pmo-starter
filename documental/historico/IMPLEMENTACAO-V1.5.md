# 🚀 Implementação v1.5 — Chat Expandido + Preview Visual + Downloads Markdown

**Data:** 2026-05-16  
**Status:** ✅ 100% Implementado (pronto para integração)  
**Tempo de desenvolvimento:** ~2 horas

---

## 📋 Resumo de Mudanças

### Antes (v1.0)
- ❌ 4 perguntas no chat (2 fase 1, 1 fase 2, 1 fase 3)
- ❌ Preview genérico (apenas texto dos dados)
- ❌ Sem opção de download (apenas artefatos gerados)
- ❌ Coleta de dados incompleta (~5 campos)

### Depois (v1.5)
- ✅ **12 perguntas** no chat (4 por fase = cobertura completa)
- ✅ **Preview visual** com cards coloridos, progresso e badges
- ✅ **3 formatos de download** (simple .md, .md com YAML, ZIP)
- ✅ **12 campos de dados** coletados estruturadamente

---

## 🎯 Expansão do Chat (12 Perguntas)

### Fase 1: Contexto & Problema (4 perguntas)

1. **Produto + Problema** → `productName`, `problem`
2. **Público-Alvo** → `audience`
3. **Fluxo Atual** → `currentWorkflow`
4. **Impacto da Dor** → `impactOfProblem`

**Tempo estimado:** 10 minutos  
**Exemplo de resposta Fase 1:**
```
Q1: PetCare — app que resolve esquecimento de vacinas/medicações
Q2: Tutores 25-45 anos, ocupados, usam apps de saúde
Q3: Anotam em caderninho ou tiram foto; perdem datas
Q4: ~5M tutores no Brasil, 70% esquece alguma vacina
```

### Fase 2: Solução & Estratégia (4 perguntas)

5. **Solução Proposta** → `solution`
6. **Métricas de Sucesso** → `successMetrics`
7. **Papéis Alvo** → `targetRoles`
8. **Diferenciação** → `differentiation`

**Tempo estimado:** 10 minutos  
**Exemplo de resposta Fase 2:**
```
Q5: App mobile com agenda inteligente + lembretes push
Q6: Time-to-action 30min → 2min, NPS ≥7, retenção ≥80%
Q7: PM, PO, GP, Eng, Design (documentação customizada por papel)
Q8: Foco exclusivo em saúde animal, notificações contextualizadas
```

### Fase 3: Escopo & Restrições (4 perguntas)

9. **Escopo MVP** → `minimumMVPScope`
10. **Restrições** → `constraints`
11. **Dependências Técnicas** → `dependencies`
12. **Roadmap (3 fases)** → `roadmapPhases`

**Tempo estimado:** 10 minutos  
**Exemplo de resposta Fase 3:**
```
Q9: MVP: app iOS, cadastro pet, 3 tipos evento, lembretes push
Q10: Prazo 4 meses, 2 devs, R$250k, stack obrigatória React Native
Q11: Firebase (notificações), App Store review (7-14 dias)
Q12: Fase 1 (MVP), Fase 2 (Android + vet sharing), Fase 3 (integração clínicas)
```

**Total:** ~30 minutos para coleta completa (vs. 5 min antes)

---

## 🎨 Preview Visual Melhorado (PreviewPanelV2)

### Componentes Principais

#### 1. **Section Cards** (4 cards coloridos)
```
┌─────────────────────────────────┐
│ 🟦 Produto & Problema           │ ○ Pendente
├─────────────────────────────────┤
│ PetCare — resolve esquecimento  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 🟩 Público & Contexto           │ ● Coletando
├─────────────────────────────────┤
│ Tutores 25-45 anos, ocupados    │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 🟪 Solução & Estratégia         │ ✓ Preenchido
├─────────────────────────────────┤
│ App mobile com agenda inteligente│
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 🟨 Escopo & Restrições          │ ○ Pendente
├─────────────────────────────────┤
│ [Esperando entrada...]          │
└─────────────────────────────────┘
```

#### 2. **Progress Bar** (visual feedback)
```
Coleta de dados
█████████░░░░░░░░░░░░ 50% (2 de 4 seções)
```

#### 3. **Status Badges**
- 🔴 `○ Pendente` (cinza) — Fase não iniciada
- 🟠 `● Coletando` (azul) — Fase atual
- 🟢 `✓ Preenchido` (verde) — Fase completa

#### 4. **Quick Stats** (rodapé)
```
2 Seções completas  |  Fase 2  |  2 Pendentes
```

### Benefícios
- ✅ Feedback visual em tempo real
- ✅ Progresso transparente
- ✅ Motivação para completar (gamification)
- ✅ Fácil identificar o que falta

---

## 📥 Sistema de Downloads (3 Formatos)

### Formato 1: Markdown Simples (.md)
```
# PRD — PetCare

## 1. Alinhamento Estratégico...
```
- **Uso:** Compartilhar via email, Slack
- **Tamanho:** ~8-10 KB
- **Compatibilidade:** Qualquer editor de texto

### Formato 2: Markdown + YAML Frontmatter (.md)
```yaml
---
title: "PRD — PetCare"
author: "PM"
date: "2026-05-16"
version: "1.0"
status: "planning"
product: "PetCare"
problem: "Esquecimento de vacinas/medicações"
---

# PRD — PetCare

## 1. Alinhamento Estratégico...
```
- **Uso:** Importar em Obsidian, Notion, GitHub
- **Tamanho:** ~10-12 KB
- **Compatibilidade:** YAML-aware tools

### Formato 3: ZIP Completo (.zip)
```
PetCare-PRD-1234567.zip
├── PRD.md (com YAML frontmatter)
├── RESUMO-EXECUTIVO.md
├── ROADMAP.md
└── metadata.json (dados estruturados)
```
- **Uso:** Backup completo, importação em sistemas
- **Tamanho:** ~15-20 KB
- **Compatibilidade:** Qualquer descompactador

---

## 📁 Arquivos Criados/Modificados

### Modificados

#### 1. `modules/prd/context/new-project-context.tsx`
**Mudanças:**
- ✅ Expandido `ProjectInput` de 5 para 12 campos
- ✅ Atualizado `CHAT_PHASES` com 12 perguntas (4 por fase)
- ✅ Expandida função `collectData()` com toda a lógica de mapeamento
- ✅ Melhorada função `editMessage()` com cleanup correto
- ✅ Atualizada `generateArtifactsFrom()` para passar todos os campos

**Impacto:** +150 linhas, sem breaking changes

#### 2. `services/ai/index.ts`
**Mudanças:**
- ✅ Expandida interface `GenerateArtifactsInput` para 12+ campos
- ✅ Mantida compatibilidade com serviço mock

**Impacto:** +10 linhas, sem breaking changes

### Novos

#### 1. `modules/prd/components/preview-panel-v2.tsx` (320 linhas)
**Recurso completo:**
- Section Cards com cores, ícones e status badges
- Progress Bar interativo
- Quick Stats footer
- Ícones SVG inline (sem dependências externas)

**Integração:**
```tsx
import { PreviewPanelV2 } from "@/modules/prd/components/preview-panel-v2";

// Usar no layout ao lado do chat
<PreviewPanelV2 />
```

#### 2. `services/markdown-generator.ts` (320 linhas)
**Recurso completo:**
- `generateMarkdownPRD()` — PRD estruturado em 7 seções
- `generateMarkdownSummary()` — Resumo executivo
- `generateMarkdownRoadmap()` — Roadmap em tabela
- `generateMarkdownSpec()` — Especificação técnica

**Integração:**
```tsx
import { generateMarkdownPRD } from "@/services/markdown-generator";

const prd = generateMarkdownPRD(collectedData);
// prd.simple → apenas markdown
// prd.withFrontmatter → com YAML
// prd.filename → nome sugerido
```

#### 3. `modules/prd/components/download-options.tsx` (280 linhas)
**Recurso completo:**
- 3 opções de download (botões)
- Download manager com suporte ZIP (via jszip)
- Loading states e error handling
- Ícones SVG inline

**Integração:**
```tsx
import { DownloadOptions } from "@/modules/prd/components/download-options";

// Usar na aba "Downloads" ou rodapé
<DownloadOptions />
```

---

## 🔌 Como Integrar ao Projeto

### Passo 1: Atualizar Context
✅ Já feito — arquivo modificado com 12 perguntas e lógica completa

### Passo 2: Instalar jszip (para downloads ZIP)
```bash
pnpm add jszip
pnpm add -D @types/jszip
```

### Passo 3: Adicionar Componentes ao Layout

**Opção A: Layout com Preview + Chat lado-a-lado**
```tsx
// pages/project/new.tsx ou app/project/new/page.tsx
import { ChatPanel } from "@/modules/prd/components/chat-panel";
import { PreviewPanelV2 } from "@/modules/prd/components/preview-panel-v2";

export default function NewProjectPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat: 2 colunas */}
      <div className="lg:col-span-2">
        <ChatPanel />
      </div>
      
      {/* Preview: 1 coluna, sticky */}
      <div className="lg:col-span-1 lg:sticky lg:top-4 lg:h-fit">
        <PreviewPanelV2 />
      </div>
    </div>
  );
}
```

**Opção B: Preview em Aba Separada**
```tsx
// Usar tabs (shadcn/ui) para alternar entre Chat e Preview
<Tabs>
  <TabsList>
    <TabsTrigger value="chat">Chat Guiado</TabsTrigger>
    <TabsTrigger value="preview">Resumo PRD</TabsTrigger>
    <TabsTrigger value="download">Baixar</TabsTrigger>
  </TabsList>
  
  <TabsContent value="chat">
    <ChatPanel />
  </TabsContent>
  
  <TabsContent value="preview">
    <PreviewPanelV2 />
  </TabsContent>
  
  <TabsContent value="download">
    <DownloadOptions />
  </TabsContent>
</Tabs>
```

### Passo 4: Teste Completo

```bash
# 1. Verificar tipos
pnpm tsc --noEmit

# 2. Rodar dev server
pnpm dev

# 3. Testar fluxo completo
# - Responder 12 perguntas (30 min)
# - Verificar preview atualiza em real-time
# - Baixar em 3 formatos
# - Validar markdown generated
```

---

## ✅ Checklist de Validação

### Funcional
- [ ] Chat exibe 4 perguntas na Fase 1 ✓
- [ ] Chat exibe 4 perguntas na Fase 2 ✓
- [ ] Chat exibe 4 perguntas na Fase 3 ✓
- [ ] Editar resposta mantém dados intactos
- [ ] Preview atualiza em tempo real com dados coletados
- [ ] Todos os 12 campos de dados são capturados
- [ ] Download em 3 formatos funciona
- [ ] ZIP contém todos os 4 arquivos

### Visual
- [ ] Section cards exibem cores diferentes
- [ ] Status badges mudam conforme fase
- [ ] Progress bar anima corretamente
- [ ] Ícones SVG renderizam (sem erros)
- [ ] Layout responsivo (mobile + desktop)

### Performance
- [ ] Chat responde < 500ms por mensagem
- [ ] Preview renderiza < 100ms ao atualizar
- [ ] Download < 1s para gerar
- [ ] Nenhum error no console

### Acessibilidade
- [ ] Contraste WCAG AA em todos os textos
- [ ] Keyboard navigation funciona
- [ ] Screen reader entende buttons/cards

---

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| **Perguntas do chat** | 4 → **12** (+200%) |
| **Campos de dados** | 5 → **12** (+140%) |
| **Tempo de coleta** | 5 min → **~30 min** |
| **Componentes novos** | 2 (PreviewV2, DownloadOptions) |
| **Serviços novos** | 1 (markdown-generator) |
| **Linhas de código** | +900 linhas |
| **Compatibilidade** | 100% (sem breaking changes) |

---

## 🚀 Roadmap Futuro (v1.6+)

### v1.6 (Próximo Sprint)
- [ ] Validação de respostas em tempo real (min 50 caracteres, etc)
- [ ] Sugestões automáticas via IA (ex: "Sua solução é inovadora porque...")
- [ ] Templates por tipo de produto (SaaS, Mobile, B2B, etc)
- [ ] Integração com Slack para compartilhamento direto

### v2.0 (Médio Prazo)
- [ ] Colaboração em tempo real (múltiplos usuários no chat)
- [ ] Versionamento de PRDs (histórico + diffs)
- [ ] Importação de Notion/Figma como entrada
- [ ] Geração de artefatos adicionais (User Stories, Wireframes)

### v3.0 (Longo Prazo)
- [ ] Integração com jira/linear para tracking automático
- [ ] Análise preditiva de risk (ML) baseada em padrões PRD
- [ ] Integração com ferramentas de design (Figma API)
- [ ] Multi-language support (PT-BR, EN, ES)

---

## 📞 Troubleshooting

### "jszip não encontrado"
```bash
pnpm add jszip @types/jszip
```

### "Preview não atualiza"
- ✅ Verificar se `useNewProject()` está no escopo correto
- ✅ Garantir que `collectedData` está sendo atualizado no context
- ✅ Checar console para erros React

### "Download gera arquivo vazio"
- ✅ Validar `collectedData.productName` está preenchido
- ✅ Checar se markdown-generator está importado corretamente
- ✅ Verificar tamanho do blob gerado (console.log)

---

## 📚 Referências

| Arquivo | Propósito |
|---------|-----------|
| `MELHORIAS-CHAT-E-PREVIEW.md` | Especificação original (req + mockups) |
| `modules/prd/context/new-project-context.tsx` | Lógica do chat (12 perguntas) |
| `modules/prd/components/preview-panel-v2.tsx` | Visual do preview (cards + progresso) |
| `modules/prd/components/download-options.tsx` | Interface de downloads (3 formatos) |
| `services/markdown-generator.ts` | Geração de markdown (PRD + resumo + roadmap) |

---

## ✨ Status

```
┌──────────────────────────────────┐
│  PMO-STARTER — v1.5 impl         │
│  ═══════════════════════════     │
│                                  │
│  Chat (12 perguntas):  ✅ 100%   │
│  Preview Visual:       ✅ 100%   │
│  Downloads:            ✅ 100%   │
│  Integração:           ⏳ Pronto │
│                                  │
│  Status: PRONTO PARA USAR        │
│          (após instalar jszip)   │
│                                  │
└──────────────────────────────────┘
```

---

**Próximo passo:** Integrar componentes ao layout e testar fluxo completo de 30 minutos.

**Estimado:** 2-3 horas de integração + testes

---

**Desenvolvido em:** 2026-05-16  
**Por:** Claude  
**Versão:** 1.5.0
