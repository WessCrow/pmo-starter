"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { aiService, type GenerateArtifactsInput, type GeneratedArtifact, type PrototypeScreen } from "@/services/ai";
import { storageService } from "@/services/storage";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type InputMode = "chat" | "upload";
export type FlowState = "input" | "generating" | "done";
export type UserRole = "PM" | "PO" | "GP";

export type PreviewTab =
  | { kind: "overview" }
  | { kind: "artifact"; id: string }
  | { kind: "prototype" };

export interface ChatMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  phase?: 1 | 2 | 3;
  isAction?: boolean; // mensagem especial com botão de gerar
}

export interface ProjectInput {
  // Fase 1: Contexto & Problema
  productName: string;
  problem: string;
  audience: string;
  currentWorkflow: string;
  impactOfProblem: string;

  // Fase 2: Solução & Estratégia
  solution: string;
  successMetrics: string;
  targetRoles: string;
  differentiation: string;

  // Fase 3: Escopo & Restrições
  minimumMVPScope: string;
  constraints: string;
  dependencies: string;
  roadmapPhases: string;
}

// ─── Perguntas do chat por fase ───────────────────────────────────────────────

export const CHAT_PHASES = [
  {
    phase: 1 as const,
    label: "Contexto & Problema",
    questions: [
      "Olá! Vou guiar você em algumas perguntas rápidas para montar um PRD estruturado.\n\nPrimeiro: qual é o **nome do produto** e qual **problema principal** ele resolve?",
      "E quem são os **usuários principais**? Descreva o perfil deles (idade, ocupação, contexto, necessidades).",
      "Como os usuários **resolvem esse problema hoje**? Descreva o fluxo atual passo-a-passo.",
      "Qual é o **impacto dessa dor**? Quantos usuários são afetados? Quanto custa? Qual a criticidade?",
    ],
    mockAnswers: [
      "PetCare — app que resolve o problema de tutores esquecerem vacinas, consultas e medicações dos seus pets. Hoje isso é feito em caderninho ou na memória, gerando atrasos e riscos de saúde.",
      "Tutores de pets entre 25 e 45 anos, com 1 ou mais animais. Perfil: pessoas ocupadas, já usam apps de saúde pessoal, querem praticidade e não querem depender de lembretes manuais.",
      "Fluxo atual: (1) Tutor leva pet ao vet e recebe recomendação verbal ou papel; (2) Anota em caderninho ou tira foto; (3) Precisa lembrar manualmente da data; (4) Se esquecer, perde a data ou vai consultar o histórico em papel desorganizado.",
      "~5M tutores no Brasil usam apps de pet. 70% esquece alguma vacina por falta de lembrança. Quando esquecem, gastam 30% a mais em emergências vet. Criticidade: Alta para saúde do pet, média para receita (market SaaS de pet vale $2B globalmente).",
    ],
  },
  {
    phase: 2 as const,
    label: "Solução & Estratégia",
    questions: [
      "Qual é a **solução proposta**? Como o produto resolve esse problema? Seja específico sobre features principais.",
      "Quais são as **métricas de sucesso**? Como você saberá que resolveu o problema? (ex: time-to-action, retenção, NPS)",
      "Para quantos e quais **papéis** será necessário criar documentação? (PM, PO, GP, Eng, Design, etc?) Explique por quê.",
      "Como você se **diferencia da concorrência** ou soluções atuais? Quais as vantagens competitivas?",
    ],
    mockAnswers: [
      "App mobile (iOS + Android) com: (1) Agenda inteligente de saúde — lembretes automáticos de vacinas, medicações, check-ups; (2) Histórico veterinário centralizado com documentos; (3) Compartilhamento seguro com veterinário via link; (4) Notificações push 7 dias antes e 1 dia antes do evento.",
      "Métrica primária: Time-to-action (usuário agendar dose de vacina) reduz de 30 min para 2 min. Métricas secundárias: Retenção M1 ≥80%, NPS ≥7/10, engagement (3+ eventos cadastrados) em 7 dias ≥60%, taxa de agendamento (lembretes → ação) ≥40%.",
      "PM: PRD estruturado, roadmap, strategy. PO: Especificação técnica, backlog, testes. GP: Validação de mercado, feedback, priorização. Eng: API, mobile, integração vet. Design: Mockups, design system, prototipo.",
      "Diferencial: (1) Foco exclusivo em saúde animal (não genérico como Google Calendar); (2) Notificações contextualizadas (sabe se é primeira dose ou reforço); (3) Integração com vet (readonly — vet vê histórico sem app); (4) MVP sem pagamento (crescimento por word-of-mouth em tutores).",
    ],
  },
  {
    phase: 3 as const,
    label: "Escopo & Restrições",
    questions: [
      "Qual é o **escopo mínimo (MVP)** para validar a hipótese? O que é \"must have\" vs. \"nice to have\"?",
      "Existem **restrições importantes** — prazo, orçamento, stack tecnológico, tamanho da equipe? Sejam específicos.",
      "Quais são as **dependências técnicas ou externas**? (APIs, serviços, integrações, conhecimento de domínio)",
      "Como você imagina a **evolução do produto em 3 fases**? (próximos 6-12 meses). Roadmap de alto nível.",
    ],
    mockAnswers: [
      "MVP — Must have: App mobile básico (iOS), cadastro de pet, agenda com 3 tipos de evento (vacina, medicação, check-up), lembretes via notificação. Nice to have: Android, compartilhamento com vet, integração com calendários, análise de compliance vacinação.",
      "Prazo: MVP em 4 meses (2 sprints de prep + 6 sprints de dev). Equipe: 1 PM, 2 devs mobile (React Native), 1 design, 1 QA part-time. Orçamento: R$250k (salários) + R$50k (infra + tools). Stack obrigatório: React Native, Firebase para notificações, PostgreSQL.",
      "Dependências: (1) Firebase Cloud Messaging (notificações) — setup 1 dia; (2) App Store + Google Play — review 7-14 dias; (3) Legal — LGPD compliance check — 2 semanas; (4) Conhecimento: ninguém no time tem experiência com saúde de pets — user research crítica.",
      "Fase 1 (MVP — meses 1-4): App mobile, agenda, lembretes. Fase 2 (v1.5 — meses 5-8): Android, compartilhamento vet, autenticação social. Fase 3 (v2.0 — meses 9-12): Integração clínicas veterinárias, analytics, premium features (compartilhamento com múltiplos vets, documentos).",
    ],
  },
];

// ─── Context type ─────────────────────────────────────────────────────────────

interface NewProjectContextType {
  flowState: FlowState;
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;

  // Chat
  messages: ChatMessage[];
  currentPhase: 1 | 2 | 3;
  isAiTyping: boolean;
  chatComplete: boolean;
  currentMockAnswer: string;
  sendMessage: (content: string) => void;
  editMessage: (messageId: string, newContent: string) => void;

  // Papéis selecionados (toggle inline no chat)
  selectedRoles: UserRole[];
  toggleRole: (role: UserRole) => void;

  // Upload
  submitUpload: (text: string) => void;

  // Preview
  collectedData: Partial<ProjectInput>;

  // Gerar
  generateArtifacts: () => void;

  // Done
  generatedArtifacts: GeneratedArtifact[];
  prototypeScreens: PrototypeScreen[];
  projectId: string;
  previewTab: PreviewTab;
  setPreviewTab: (tab: PreviewTab) => void;
}

const NewProjectContext = createContext<NewProjectContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function NewProjectProvider({ children }: { children: React.ReactNode }) {
  const [projectId] = useState(() => `project-${Date.now()}`);

  const [flowState, setFlowState] = useState<FlowState>("input");
  const [inputMode, setInputMode] = useState<InputMode>("chat");

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "init", role: "ai", content: CHAT_PHASES[0].questions[0], phase: 1 },
  ]);
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(1);
  const [phaseQuestionIndex, setPhaseQuestionIndex] = useState(0);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [chatComplete, setChatComplete] = useState(false);

  const [collectedData, setCollectedData] = useState<Partial<ProjectInput>>({});

  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [generatedArtifacts, setGeneratedArtifacts] = useState<GeneratedArtifact[]>([]);
  const [prototypeScreens, setPrototypeScreens] = useState<PrototypeScreen[]>([]);
  const [previewTab, setPreviewTab] = useState<PreviewTab>({ kind: "overview" });

  // Sugestão mock para a pergunta atual
  const currentMockAnswer =
    CHAT_PHASES[currentPhase - 1]?.mockAnswers?.[phaseQuestionIndex] ?? "";

  // ─── Toggle papel ────────────────────────────────────────────────────────────

  const toggleRole = useCallback((role: UserRole) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  }, []);

  // ─── Chat ────────────────────────────────────────────────────────────────────

  const collectData = (content: string, phase: 1 | 2 | 3, questionIndex: number) => {
    setCollectedData((prev) => {
      const next = { ...prev };

      // Fase 1: Contexto & Problema
      if (phase === 1) {
        if (questionIndex === 0) {
          // Pergunta 1: Produto + Problema
          next.productName = content.split(" ").slice(0, 5).join(" ");
          next.problem = content;
        } else if (questionIndex === 1) {
          // Pergunta 2: Usuários principais
          next.audience = content;
        } else if (questionIndex === 2) {
          // Pergunta 3: Fluxo atual
          next.currentWorkflow = content;
        } else if (questionIndex === 3) {
          // Pergunta 4: Impacto da dor
          next.impactOfProblem = content;
        }
      }
      // Fase 2: Solução & Estratégia
      else if (phase === 2) {
        if (questionIndex === 0) {
          // Pergunta 5: Solução proposta
          next.solution = content;
        } else if (questionIndex === 1) {
          // Pergunta 6: Métricas de sucesso
          next.successMetrics = content;
        } else if (questionIndex === 2) {
          // Pergunta 7: Papéis
          next.targetRoles = content;
        } else if (questionIndex === 3) {
          // Pergunta 8: Diferenciação
          next.differentiation = content;
        }
      }
      // Fase 3: Escopo & Restrições
      else if (phase === 3) {
        if (questionIndex === 0) {
          // Pergunta 9: Escopo MVP
          next.minimumMVPScope = content;
        } else if (questionIndex === 1) {
          // Pergunta 10: Restrições
          next.constraints = content;
        } else if (questionIndex === 2) {
          // Pergunta 11: Dependências
          next.dependencies = content;
        } else if (questionIndex === 3) {
          // Pergunta 12: Roadmap
          next.roadmapPhases = content;
        }
      }

      return next;
    });
  };

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isAiTyping) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        phase: currentPhase,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsAiTyping(true);

      collectData(content, currentPhase, phaseQuestionIndex);

      setTimeout(() => {
        const phaseIdx = currentPhase - 1;
        const phase = CHAT_PHASES[phaseIdx];
        const nextQIdx = phaseQuestionIndex + 1;
        const hasMoreQ = nextQIdx < phase.questions.length;

        let aiContent = "";
        let nextPhase = currentPhase;
        let nextQ = nextQIdx;

        if (hasMoreQ) {
          aiContent = phase.questions[nextQIdx];
        } else if (currentPhase < 3) {
          const next = CHAT_PHASES[currentPhase];
          aiContent = next.questions[0];
          nextPhase = (currentPhase + 1) as 2 | 3;
          nextQ = 0;
        } else {
          // Conversa completa — mensagem de ação inline
          aiContent = "Contexto coletado! Selecione os papéis e clique em **Gerar documentos** quando estiver pronto.";
          setChatComplete(true);
          setIsAiTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: `ai-${Date.now()}`, role: "ai", content: aiContent, phase: currentPhase, isAction: false },
          ]);
          return;
        }

        setPhaseQuestionIndex(nextQ);
        setCurrentPhase(nextPhase);

        setMessages((prev) => [
          ...prev,
          { id: `ai-${Date.now()}`, role: "ai", content: aiContent, phase: nextPhase as 1 | 2 | 3 },
        ]);
        setIsAiTyping(false);
      }, 1000);
    },
    [currentPhase, phaseQuestionIndex, isAiTyping]
  );

  // ─── Editar mensagem ──────────────────────────────────────────────────────────

  const editMessage = useCallback(
    (messageId: string, newContent: string) => {
      if (!newContent.trim()) return;

      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === messageId);
        if (idx === -1) return prev;

        const targetMsg = prev[idx];
        const msgPhase = targetMsg.phase ?? 1;
        const userMsgsBefore = prev.slice(0, idx).filter(
          (m) => m.role === "user" && m.phase === msgPhase
        ).length;

        setCurrentPhase(msgPhase);
        setPhaseQuestionIndex(userMsgsBefore);
        setChatComplete(false);

        setCollectedData((old) => {
          const next = { ...old };

          // Limpar dados da fase editada e posteriores
          if (msgPhase === 1) {
            // Fase 1
            if (userMsgsBefore === 0) {
              delete next.productName;
              delete next.problem;
            } else if (userMsgsBefore === 1) {
              delete next.audience;
            } else if (userMsgsBefore === 2) {
              delete next.currentWorkflow;
            } else if (userMsgsBefore === 3) {
              delete next.impactOfProblem;
            }
            // Limpar fases posteriores
            delete next.solution;
            delete next.successMetrics;
            delete next.targetRoles;
            delete next.differentiation;
            delete next.minimumMVPScope;
            delete next.constraints;
            delete next.dependencies;
            delete next.roadmapPhases;
          } else if (msgPhase === 2) {
            // Fase 2
            if (userMsgsBefore === 0) {
              delete next.solution;
            } else if (userMsgsBefore === 1) {
              delete next.successMetrics;
            } else if (userMsgsBefore === 2) {
              delete next.targetRoles;
            } else if (userMsgsBefore === 3) {
              delete next.differentiation;
            }
            // Limpar fases posteriores
            delete next.minimumMVPScope;
            delete next.constraints;
            delete next.dependencies;
            delete next.roadmapPhases;
          } else if (msgPhase === 3) {
            // Fase 3
            if (userMsgsBefore === 0) {
              delete next.minimumMVPScope;
            } else if (userMsgsBefore === 1) {
              delete next.constraints;
            } else if (userMsgsBefore === 2) {
              delete next.dependencies;
            } else if (userMsgsBefore === 3) {
              delete next.roadmapPhases;
            }
          }

          return next;
        });

        const updated = [...prev.slice(0, idx), { ...targetMsg, content: newContent }];
        return updated;
      });

      setIsAiTyping(true);

      setTimeout(() => {
        setMessages((prev) => {
          const lastUser = [...prev].reverse().find((m) => m.role === "user");
          if (!lastUser) return prev;

          const msgPhase = lastUser.phase ?? 1;
          const userMsgsInPhase = prev.filter(
            (m) => m.role === "user" && m.phase === msgPhase
          ).length;

          collectData(newContent, msgPhase, userMsgsInPhase - 1);

          const phaseData = CHAT_PHASES[msgPhase - 1];
          const nextQIdx = userMsgsInPhase;
          const hasMore = nextQIdx < phaseData.questions.length;

          let aiContent = "";
          let nextPhase = msgPhase as 1 | 2 | 3;
          let nextQ = nextQIdx;

          if (hasMore) {
            aiContent = phaseData.questions[nextQIdx];
          } else if (msgPhase < 3) {
            const next = CHAT_PHASES[msgPhase];
            aiContent = next.questions[0];
            nextPhase = (msgPhase + 1) as 2 | 3;
            nextQ = 0;
          } else {
            aiContent = "Contexto atualizado! Selecione os papéis e clique em **Gerar documentos** quando estiver pronto.";
            setChatComplete(true);
            setIsAiTyping(false);
            setPhaseQuestionIndex(nextQ);
            setCurrentPhase(nextPhase);
            setMessages((p) => [
              ...p,
              { id: `ai-${Date.now()}`, role: "ai", content: aiContent, phase: nextPhase },
            ]);
            return prev;
          }

          setPhaseQuestionIndex(nextQ);
          setCurrentPhase(nextPhase);
          setIsAiTyping(false);

          return [
            ...prev,
            { id: `ai-${Date.now()}`, role: "ai" as const, content: aiContent, phase: nextPhase },
          ];
        });
      }, 1000);
    },
    []
  );

  // ─── Upload ──────────────────────────────────────────────────────────────────

  const submitUpload = useCallback(async (text: string) => {
    setIsAiTyping(true);
    const parsed = await aiService.parseDocument(text);
    setCollectedData(parsed);
    setIsAiTyping(false);
    generateArtifactsFrom(parsed);
  }, []); // eslint-disable-line

  // ─── Gerar ───────────────────────────────────────────────────────────────────

  const generateArtifactsFrom = async (data: Partial<ProjectInput>) => {
    setFlowState("generating");
    setPreviewTab({ kind: "overview" });
    setPrototypeScreens([]);
    const base = {
      productName: data.productName ?? "Meu Produto",
      problem: data.problem ?? "",
      audience: data.audience ?? "",
      currentWorkflow: data.currentWorkflow ?? "",
      impactOfProblem: data.impactOfProblem ?? "",
      solution: data.solution ?? "",
      successMetrics: data.successMetrics ?? "",
      targetRoles: data.targetRoles ?? "",
      differentiation: data.differentiation ?? "",
      minimumMVPScope: data.minimumMVPScope ?? "",
      constraints: data.constraints ?? "",
      dependencies: data.dependencies ?? "",
      roadmapPhases: data.roadmapPhases ?? "",
    };
    const roles: UserRole[] =
      selectedRoles.length > 0 ? selectedRoles : ["PO"];
    const results = await Promise.all(
      roles.map((role) => aiService.generateArtifacts({ ...base, role }))
    );
    const all = results.flat();
    await storageService.saveArtifacts(projectId, all);
    setGeneratedArtifacts(all);

    let screens: PrototypeScreen[] = [];
    try {
      const prd = all.find((a) => /prd/i.test(a.title));
      const prdBody =
        prd?.content ??
        [
          base.problem,
          base.audience,
          base.currentWorkflow,
          base.impactOfProblem,
          base.solution,
          base.successMetrics,
          base.minimumMVPScope,
          base.constraints,
        ]
          .filter(Boolean)
          .join("\n\n");
      screens = await aiService.generatePrototype(prdBody);
    } catch {
      screens = [];
    }
    setPrototypeScreens(screens);
    setFlowState("done");
  };

  const generateArtifacts = useCallback(() => {
    generateArtifactsFrom(collectedData);
  }, [collectedData, selectedRoles]); // eslint-disable-line

  return (
    <NewProjectContext.Provider
      value={{
        flowState,
        inputMode,
        setInputMode,
        messages,
        currentPhase,
        isAiTyping,
        chatComplete,
        currentMockAnswer,
        sendMessage,
        editMessage,
        selectedRoles,
        toggleRole,
        submitUpload,
        collectedData,
        generateArtifacts,
        generatedArtifacts,
        prototypeScreens,
        projectId,
        previewTab,
        setPreviewTab,
      }}
    >
      {children}
    </NewProjectContext.Provider>
  );
}

export function useNewProject() {
  const ctx = useContext(NewProjectContext);
  if (!ctx) throw new Error("useNewProject must be used within NewProjectProvider");
  return ctx;
}
