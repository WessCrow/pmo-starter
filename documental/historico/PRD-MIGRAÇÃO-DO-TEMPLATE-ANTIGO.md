# 🔄 Migração: Template Antigo → Novo PRD

**Versão:** 1.0  
**Data:** 2026-05-16  
**Para:** Equipe de PM, PMs em transição

---

## ❌ Template Antigo (Descontinuado)

```markdown
# PRD — Produto Mock

## Problema
Descrição do problema identificado.

## Solução
Descrição da solução proposta.

## Critérios de Aceite
- [ ] Critério 1
- [ ] Critério 2

## User Stories
- Como usuário, quero...
- Como admin, quero...
```

**Problemas com este formato:**
- ❌ Sem contexto estratégico
- ❌ Sem personas definidas
- ❌ Hipóteses vagas
- ❌ Sem validação de problema
- ❌ Critérios genéricos (não BDD)
- ❌ Ambíguo para eng implementar

---

## ✅ Novo Template (2026-05-16+)

```markdown
# PRD — [NOME DO PRODUTO]

## 1. Alinhamento Estratégico & Outcomes
   - Visão + OKRs + KPIs

## 2. O Problema sob a Ótica do Usuário
   - Personas + contexto + evidências

## 3. Escopo da Solução (Thin Slice / MVP)
   - In/out scope + hipóteses

## 4. Jornada do Usuário & Requisitos
   - Happy path (13 passos) + cenários

## 5. Casos de Borda & Tratamento de Erros
   - Empty states + error scenarios

## 6. Lógica de Sistemas & Impacto Operacional
   - Dependências + fluxo de dados

## 7. Critérios de Aceite Técnicos
   - 5-8 critérios BDD
```

**Benefícios do novo:**
- ✅ Estratégia clara (OKRs + KPIs)
- ✅ Personas reais com evidências
- ✅ Hipóteses mensuráveis
- ✅ Jornada estruturada
- ✅ Edge cases documentados
- ✅ Critérios BDD (zero ambiguidade)

---

## 📊 Comparação Lado-a-Lado

| Aspecto | Antigo | Novo |
|---------|--------|-----|
| **Seções** | 4 genéricas | 7 estruturadas |
| **Personas** | Mencionadas | Descritas + contexto |
| **Evidências** | Nenhuma | Quanti + quali |
| **Critérios** | Checklist vago | BDD-style preciso |
| **Roadmap** | Não tem | Integrado |
| **Handoff** | Ambíguo | Zero ambiguidade |
| **Tempo preencher** | ~1h (incompleto) | ~3h (completo) |

---

## 🔀 Como Migrar uma PRD Antiga

### Se você TEM uma PRD antiga que precisa atualizar:

#### Passo 1: Copiar o novo template
```bash
cp PRD-TEMPLATE.md PRD-[seu-projeto]-v2.md
```

#### Passo 2: Migrar conteúdo antigo

**Do "Problema" antigo → Seção 2 (nova)**
```markdown
# Antigo
## Problema
Usuários perdem tempo alternando ferramentas.

# Novo
## 2. O Problema sob a Ótica do Usuário

### Contexto da Dor
Rafael, PM Sênior, passa 40% do tempo em 4 ferramentas...
[Descrever fluxo atual]

### Evidências Disponíveis
- Dados: 35% dos PRDs são revisados (impacto tempo)
- Feedback: "Perco contexto ao alternar..."
```

**Do "Solução" antiga → Seção 3 (nova)**
```markdown
# Antigo
## Solução
Platform que consolida criação de PRDs e prototipagem.

# Novo
## 3. Escopo da Solução

### O Que Está Dentro
- Chat guiado (3 fases)
- Upload de arquivo
- Preview ao vivo
- Geração de artefatos

### Hipóteses de Valor
Acreditamos que chat guiado reduzirá tempo-para-doc porque...
```

**Do "User Stories" antigo → Seção 4 (nova)**
```markdown
# Antigo
- Como PM, quero criar PRD rapidamente
- Como designer, quero acessar protótipo

# Novo
## 4. Jornada do Usuário

### Fluxo Principal
| Passo | Ação | Resposta | Tela |
| 1 | Clica em Chat | Exibe pergunta 1 | chat-panel |
| 2 | Responde contexto | Exibe pergunta 2 | chat-panel |
...
```

**Do "Critérios de Aceite" antigo → Seção 7 (nova)**
```markdown
# Antigo
- [ ] Chat funciona
- [ ] Download é possível

# Novo
### Critério 1 — Chat Funcional

**Dado que** usuário clica em Chat
**Quando** responde pergunta 1
**Então:**
- [ ] Mensagem aparece no painel
- [ ] Pergunta 2 exibe após 1s
- [ ] Preview atualiza com dados

**Aceitação:** 3/3 checkboxes marcados
```

#### Passo 3: Preencher seções faltantes

**Novo → Seção 1: Alinhamento Estratégico**
- Adicionar OKRs
- Definir métrica primária

**Novo → Seção 5: Edge Cases**
- Documentar empty states
- Definir mensagens de erro

**Novo → Seção 6: Backend**
- Listar dependências técnicas
- Definir políticas

**Novo → Roadmap**
- Detalhar próximas fases

#### Passo 4: Revisar & Validar
- [ ] Seção 1 tem métrica primária clara?
- [ ] Seção 2 tem personas reais com evidências?
- [ ] Seção 7 é 100% BDD?
- [ ] Nada é ambíguo?

#### Passo 5: Substitua a PRD antiga
```bash
mv PRD-[seu-projeto]-v2.md PRD-[seu-projeto].md
```

---

## 🎯 Quando Usar Qual Template?

| Situação | Usar |
|----------|------|
| **Nova feature/iniciativa** | ✅ Novo template (PRD-TEMPLATE.md) |
| **Feature pequena** (1-2 dias) | ✅ Novo template (adaptado) |
| **MVP/Produto novo** | ✅ Novo template (completo) |
| **Hotfix/Bug fix** | ❌ Não precisa PRD |
| **Documentação** | ❌ Usar outro formato |
| **Reunião de planejamento** | ✅ Novo template como agenda |

---

## 📋 Checklist: Seu Template Antigo está Obsoleto?

Se sua PRD tem:
- [ ] ❌ Só "Problema + Solução"
- [ ] ❌ Sem personas com nomes
- [ ] ❌ Sem evidências de validação
- [ ] ❌ Sem métricas de sucesso
- [ ] ❌ Critérios que não são BDD
- [ ] ❌ Sem roadmap

**Resultado:** ⚠️ Use o novo template

---

## 🔗 Relação com PMO-STARTER

A **PRD v2.0 do PMO-STARTER** é um exemplo completo do novo formato.

**Como foi usada:**
- ✅ 7 seções estruturadas
- ✅ Personas Rafael + Camila (descritivas)
- ✅ Evidências quanti + quali
- ✅ 8 critérios BDD
- ✅ Happy path com 13 passos
- ✅ 4 error scenarios
- ✅ Roadmap integrado

**Resultado:** Eng conseguiu implementar Feature 1 sem ambiguidade

---

## 🚀 Próximos Passos

1. **Hoje:**
   - [ ] Salve o novo template (`PRD-TEMPLATE.md`)
   - [ ] Leia o guia (`COMO-USAR-PRD-TEMPLATE.md`)

2. **Próxima PRD que escrever:**
   - [ ] Use o novo template
   - [ ] Compare com antigo
   - [ ] Valide com eng antes de finalizar

3. **PRDs antigas:**
   - [ ] Migre as 3 mais importantes
   - [ ] Deixe as outras como referência histórica

---

## 📞 FAQs

**P: Preciso reescrever todas as PRDs antigas?**  
R: Não. Reescreva conforme atualiza features. Novas sempre usam novo template.

**P: E se meu projeto é bem diferente?**  
R: Adapte as seções! Template é guia, não bíblia.

**P: Quanto tempo leva preencher o novo?**  
R: ~3h (vs. ~1h antigo, mas mais completo e preciso).

**P: Posso mesclar antigo + novo?**  
R: Não. Use um ou outro. Mesclar causa confusão.

---

## ✨ Status

- ✅ Novo template: `PRD-TEMPLATE.md`
- ✅ Guia de uso: `COMO-USAR-PRD-TEMPLATE.md`
- ✅ Exemplo real: `PMO-STARTER/PRD.md` (v2.0)
- ✅ Documentação migração: Este arquivo

**Próximo:** Use em sua próxima PRD!

---

**Mantido por:** [SEU NOME]  
**Última atualização:** 2026-05-16
