# 📋 Especificação de Melhorias — Chat & Preview Visual

**Versão:** 1.0  
**Data:** 2026-05-16  
**Status:** Planejamento (v1.5)  
**Owner:** PM  

---

## 🎯 Objetivos

1. **Expandir coleta de dados** — Fazer perguntas mais detalhadas para capturar contexto completo
2. **Melhorar preview visual** — Apresentação mais profissional e estruturada
3. **Suportar downloads em markdown** — Usuário pode baixar PRD em `.md` formatado

---

## 1. Expansão do Chat — Mais Perguntas, Melhor Contexto

### Estado Atual

**Fase 1 (2 perguntas):**
1. Nome do produto + problema
2. Público-alvo

**Fase 2 (1 pergunta):**
1. Solução proposta

**Fase 3 (1 pergunta):**
1. Restrições

**Total: 4 perguntas**

---

### Estado Novo (Proposto)

**Fase 1 — Contexto & Problema (4 perguntas)**
1. "Qual é o **nome do produto** e qual **problema principal** ele resolve?"
2. "Quem são os **usuários principais**? Descreva o perfil deles."
3. "**Como usuários resolvem isso hoje?** Qual é o fluxo atual?"
4. "Qual é o **impacto/dor** deste problema? (Tempo gasto, frustração, custo?)"

**Fase 2 — Solução & Estratégia (4 perguntas)**
1. "Qual é a **solução proposta**? Como o produto resolve esse problema?"
2. "Como você **mede sucesso**? Quais são as métricas principais?"
3. "Quem são as **personas principais**? (Nome, contexto, objetivos)"
4. "Qual é o **diferencial/moat**? Por que os usuários escolheriam você?"

**Fase 3 — Escopo & Restrições (4 perguntas)**
1. "Qual é o **MVP mínimo**? O que não pode faltar?"
2. "Existem **restrições importantes**? (Prazo, tecnologia, orçamento, escopo)"
3. "Quais são as **dependências externas**? (APIs, serviços, equipes?)"
4. "Qual é o **roadmap** para 3-6 meses à frente?"

**Total: 12 perguntas (3x mais contexto)**

---

### Benefícios

| Métrica | Antigo | Novo | Ganho |
|---------|--------|------|-------|
| Perguntas | 4 | 12 | +200% |
| Contexto capturado | 30% | 80% | +166% |
| Tempo de coleta | ~3 min | ~8-10 min | +170% |
| Qualidade PRD gerado | Média | Alta | ⬆️ |
| Necessidade de edição pós-gerar | Alto | Baixo | ⬇️ |

---

### Implementação Técnica

**Arquivo:** `modules/prd/context/new-project-context.tsx`

```typescript
// ANTES
export const CHAT_PHASES = [
  {
    phase: 1,
    label: "Contexto & Problema",
    questions: [
      "Qual é o nome do produto...",
      "E quem são os usuários..."
    ],
  },
  // ... 2 mais fases com 1 pergunta cada
];

// DEPOIS
export const CHAT_PHASES = [
  {
    phase: 1,
    label: "Contexto & Problema",
    questions: [
      "Qual é o nome do produto e qual problema resolve?",
      "Quem são os usuários principais? Descreva o perfil.",
      "Como usuários resolvem isso hoje? Qual é o fluxo atual?",
      "Qual é o impacto/dor deste problema?"
    ],
  },
  // ... 2 mais fases com 4 perguntas cada
];
```

---

## 2. Melhoria do Preview Visual

### Estado Atual

**Problema:**
- Preview simples com apenas texto
- Sem estrutura visual clara
- Difícil de ler durante coleta
- Sem destaque visual de campos

**Aparência:**
```
[Painel direito simples]
Nome do Produto: [texto]
Problema: [texto]
Público-Alvo: [texto]
...
```

---

### Estado Novo (Proposto)

**Solução:**
- Cards/seções com cores
- Ícones para cada campo
- Progress visual (fases)
- Badges para status

**Aparência:**

```
┌─ VISÃO GERAL DO PROJETO ────────────────────┐
│                                              │
│ 📱 PRODUTO                                   │
│ ├─ Nome: PetCare                           │
│ └─ Status: ✅ Coletando...                  │
│                                              │
│ 🎯 PROBLEMA                                  │
│ ├─ Descrição: Tutores esquecem vacinas... │
│ ├─ Impacto: Alto                           │
│ └─ Dados: 35% dos pets fora de agenda     │
│                                              │
│ 👥 PÚBLICO-ALVO                              │
│ ├─ Persona: Tutores 25-45 anos             │
│ ├─ Perfil: Ocupados, tech-savvy            │
│ └─ Comportamento: Usam apps de saúde       │
│                                              │
│ 💡 SOLUÇÃO PROPOSTA                          │
│ ├─ Tipo: App mobile com agenda inteligente │
│ ├─ Features: Lembretes, histórico, sharing │
│ └─ Status: 🔄 Pendente                     │
│                                              │
│ 📊 MÉTRICAS DE SUCESSO                       │
│ ├─ Primária: Reduzir atrasos em 40%       │
│ ├─ Secundárias: NPS ≥8, Retenção ≥70%    │
│ └─ Status: ⏳ Aguardando...                 │
│                                              │
└──────────────────────────────────────────────┘

PROGRESSO: [■■■■■□□□□□] 50% (Fase 2 de 3)
```

---

### Elementos Visuais Detalhados

#### Card de Seção
```tsx
<Card className="bg-gradient-to-br from-zds-neutral-900 to-zds-neutral-800 border-zds-blue-400">
  <CardHeader>
    <Icon size={24} className="text-zds-blue-400" />
    <h3 className="text-lg font-bold">Título da Seção</h3>
  </CardHeader>
  <CardContent>
    {/* Conteúdo com ícones de status */}
  </CardContent>
</Card>
```

#### Progressão Visual
```tsx
<div className="space-y-2">
  <div className="flex items-center gap-2">
    <div className="h-2 flex-1 bg-zds-neutral-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-zds-blue-400 to-zds-blue-300"
        style={{ width: `${progress}%` }}
      />
    </div>
    <span className="text-xs font-bold text-zds-blue-300">{progress}%</span>
  </div>
  <p className="text-xs text-zds-neutral-400">
    Fase 2 de 3 completa • 8 min 23 seg
  </p>
</div>
```

#### Status Badges
```tsx
const statusMap = {
  "coletando": <Badge variant="outline" className="bg-zds-blue-900">🔵 Coletando...</Badge>,
  "preenchido": <Badge variant="outline" className="bg-zds-green-900">✅ Preenchido</Badge>,
  "pendente": <Badge variant="outline" className="bg-zds-yellow-900">⏳ Pendente</Badge>,
  "erro": <Badge variant="outline" className="bg-zds-red-900">❌ Erro</Badge>,
};
```

---

### Componente Melhorado

**Arquivo:** `modules/prd/components/preview-panel-v2.tsx`

```tsx
export function PreviewPanelV2() {
  const { collectedData, currentPhase, messages } = useNewProject();

  return (
    <div className="flex-1 overflow-y-auto bg-zds-neutral-900 p-6 space-y-4">
      {/* Header */}
      <div className="sticky top-0 bg-zds-neutral-900 pb-4 border-b border-zds-neutral-700">
        <h2 className="text-xl font-bold text-white mb-2">📋 Visão Geral do Projeto</h2>
        <ProgressBar phase={currentPhase} total={3} />
      </div>

      {/* Cards de Seções */}
      {collectedData.productName && (
        <SectionCard 
          icon={<Package2 />}
          title="Produto"
          items={[
            { label: "Nome", value: collectedData.productName },
            { label: "Status", value: "✅ Coletado" }
          ]}
        />
      )}

      {collectedData.problem && (
        <SectionCard 
          icon={<AlertCircle />}
          title="Problema"
          items={[
            { label: "Descrição", value: collectedData.problem },
            { label: "Impacto", value: "Alto" }
          ]}
        />
      )}

      {collectedData.audience && (
        <SectionCard 
          icon={<Users />}
          title="Público-Alvo"
          items={[
            { label: "Personas", value: collectedData.audience }
          ]}
        />
      )}

      {collectedData.solution && (
        <SectionCard 
          icon={<Lightbulb />}
          title="Solução"
          items={[
            { label: "Proposta", value: collectedData.solution }
          ]}
        />
      )}

      {collectedData.constraints && (
        <SectionCard 
          icon={<Lock />}
          title="Restrições"
          items={[
            { label: "Limitações", value: collectedData.constraints }
          ]}
        />
      )}

      {/* Footer com timestamp */}
      <div className="sticky bottom-0 bg-gradient-to-t from-zds-neutral-900 pt-4 text-xs text-zds-neutral-500">
        Última atualização: {new Date().toLocaleTimeString('pt-BR')}
      </div>
    </div>
  );
}
```

---

## 3. Download em Markdown

### Estado Atual

**Opções:**
- ✅ Download de `.md` (PRD agregado)
- ✅ Download de `.html` (Protótipo)

**Problema:**
- Markdown gerado pode ser inconsistente
- Sem formatação estruturada
- Sem styling consistente

---

### Estado Novo (Proposto)

**Melhorias:**
1. **Markdown com estrutura clara** — Usa novo template de 7 seções
2. **Preenchimento automático** — Dados coletados → PRD estruturado
3. **Opções de format:**
   - ✅ Markdown puro (`.md`)
   - ✅ Markdown com frontmatter YAML (`.md`)
   - ✅ HTML estilizado (`.html`)

---

### Fluxo de Download

**Opção 1: Download PRD Simples**
```
Botão: "📥 Download PRD.md"
└─ Gera arquivo com dados preenchidos
└─ Filename: projeto-[id]-prd.md
└─ Estrutura: Seções 1-7 preenchidas
```

**Opção 2: Download PRD com Frontmatter**
```
Botão: "📥 Download PRD (com metadados)"
└─ Includes:
   ---
   title: [Nome Produto]
   version: 1.0
   status: Draft
   date: 2026-05-16
   owner: [Nome PM]
   ---
   # PRD — [Nome Produto]
   ...
```

**Opção 3: Download ZIP (Tudo)**
```
Botão: "📦 Download Pacote Completo"
└─ ZIP contém:
   ├─ projeto-prd.md
   ├─ projeto-prd.html
   ├─ projeto-prototype.html
   └─ README.md (instruções de uso)
```

---

### Implementação

**Arquivo:** `modules/prd/services/markdown-generator.ts`

```typescript
export function generateMarkdownPRD(data: ProjectData, papel: UserRole): string {
  const markdown = `# PRD — ${data.productName}

> **Versão:** 1.0  
> **Status:** Draft  
> **Data:** ${new Date().toISOString().split('T')[0]}  
> **Papel:** ${papel}  

---

## 1. Alinhamento Estratégico & Outcomes

[Preenchido com dados coletados]

## 2. O Problema sob a Ótica do Usuário

**Contexto da Dor:**
${data.problem}

**Público-Alvo:**
${data.audience}

[...]

## 3. Escopo da Solução

**Solução Proposta:**
${data.solution}

[...]

[Seções 4-7...]
`;

  return markdown;
}

export function generateYAMLFrontmatter(data: ProjectData): string {
  return `---
title: ${data.productName}
version: 1.0
status: Draft
created: ${new Date().toISOString()}
owner: ${data.owner || 'Unknown'}
roles:
  - ${data.selectedRoles?.join('\n  - ')}
---
`;
}
```

---

## 4. Apresentação das Abas — Preview Melhorado

### Abas Atuais

1. **Visão Geral** — Preview simples
2. **Documentos** — Artefatos em abas
3. **Protótipo** — HTML em iframe

---

### Abas Novas (Proposto)

1. **Visão Geral** — ✅ Melhorada (cards + cores)
2. **Documentos** — ✅ Com visualização prévia
3. **Protótipo** — ✅ Com preview clicável
4. **Resumo PRD** — 🆕 Preview em markdown renderizado

**Aba "Resumo PRD":**
```tsx
<TabsContent value="prd-preview" className="p-6">
  <div className="prose prose-invert max-w-none">
    <MarkdownRenderer content={prdMarkdown} />
  </div>
  
  <div className="mt-6 flex gap-3">
    <Button 
      onClick={() => downloadMarkdown(prdMarkdown)}
      className="gap-2"
    >
      <Download size={16} />
      Baixar .md
    </Button>
    <Button 
      onClick={() => downloadWithFrontmatter(prdMarkdown)}
      variant="outline"
      className="gap-2"
    >
      <Package size={16} />
      Baixar com Metadados
    </Button>
  </div>
</TabsContent>
```

---

## 5. Timeline de Implementação

### v1.5 (Próximo Sprint — ~2 semanas)

**Semana 1:**
- [ ] Expandir CHAT_PHASES (12 perguntas)
- [ ] Testar coleta de dados ampliada
- [ ] Validar com usuários

**Semana 2:**
- [ ] Implementar preview-panel-v2
- [ ] Cards com ícones e cores
- [ ] Progress visual
- [ ] Testes

### v1.6 (Sprint seguinte)

- [ ] Implementar markdown-generator
- [ ] Opções de download (3)
- [ ] Aba "Resumo PRD"
- [ ] Testes de download

### v2.0 (Roadmap)

- [ ] HTML estilizado customizado
- [ ] ZIP com tudo
- [ ] Integração com Supabase (persistência)

---

## 6. Critérios de Aceite (v1.5)

### Critério 1 — Chat Expandido

**Dado que** usuário inicia chat  
**Quando** completa as 3 fases  
**Então:**
- [ ] Sistema faz 12 perguntas (4 por fase)
- [ ] Coleta todos os dados necessários
- [ ] Tempo total ≤ 10 min

**Aceitação:** Usuário consegue gerar PRD sem necessidade de edição pós-gerar

---

### Critério 2 — Preview Visual Melhorado

**Dado que** usuário está no chat  
**Quando** responde perguntas  
**Então:**
- [ ] Preview mostra cards com cores
- [ ] Ícones estão presentes
- [ ] Progress bar atualiza
- [ ] Status badges mostram estado

**Aceitação:** Lighthouse score ≥ 85, zero console errors

---

### Critério 3 — Download Markdown

**Dado que** artefatos foram gerados  
**Quando** usuário clica "Baixar PRD"  
**Então:**
- [ ] `.md` é gerado com todas as 7 seções
- [ ] Dados coletados preenchem seções
- [ ] Markdown é válido e legível
- [ ] Arquivo é baixado automaticamente

**Aceitação:** Download completa, arquivo abre em editor de texto

---

## 7. Mockup Visual

```
┌─────────────────────────────────────────────────────────┐
│ 🚀 NOVO PROJETO — PetCare                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Chat Panel] | [Preview Melhorado V2]                  │
│              │                                          │
│ P1/Q4:       │ ┌──────────────────────────┐            │
│ "Como        │ │ 📋 VISÃO GERAL DO PROJETO│            │
│ usuários     │ │                          │            │
│ resolvem?    │ │ 📱 PRODUTO               │            │
│              │ │ ├─ Nome: PetCare      ✅  │            │
│ [Input]      │ │ └─ Status: Coletando...   │            │
│              │ │                          │            │
│ [Sugestão]   │ │ 🎯 PROBLEMA              │            │
│              │ │ ├─ Descrição: [text]  ✅  │            │
│ [Próximo]    │ │ └─ Impacto: Alto         │            │
│              │ │                          │            │
│              │ │ 👥 PÚBLICO-ALVO          │            │
│ Fase 2/3 ✅  │ │ ├─ Personas: [text]   ✅  │            │
│ [■■■■■□□□]   │ │ └─ Perfil: [text]        │            │
│ 50% - 8:23   │ │                          │            │
│              │ │ 💡 SOLUÇÃO PROPOSTA      │            │
│              │ │ └─ Tipo: [text]       ⏳   │            │
│              │ │                          │            │
│              │ │ 📊 MÉTRICAS DE SUCESSO   │            │
│              │ │ └─ Primária: [text]   ⏳   │            │
│              │ │                          │            │
│              │ │ 🔒 RESTRIÇÕES           │            │
│              │ │ └─ Prazo: [text]      ⏳   │            │
│              │ │                          │            │
│              │ └──────────────────────────┘            │
│              │                                          │
│              │ Última atualização: 14:32:45            │
│              │                                          │
└─────────────────────────────────────────────────────────┘

[Abas: Visão Geral | Documentos | Protótipo | Resumo PRD]

[Botão: 📥 Baixar PRD.md] [Botão: 📦 Pacote Completo]
```

---

## 8. Próximos Passos

- [ ] Revisar com design team (cores, ícones)
- [ ] Validar perguntas expandidas com PMs
- [ ] Implementar v1.5 (2 semanas)
- [ ] Testes com usuários reais
- [ ] Feedback & iteração

---

**Status:** ✅ Especificação completa  
**Próximo:** Implementação v1.5  
**Owner:** [NOME DO ENGENHEIRO]
