"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { aiService, type GenerateArtifactsInput, type GeneratedArtifact, type PrototypeScreen } from "@/services/ai";
import { storageService } from "@/services/storage";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type InputMode = "chat" | "upload";
export type FlowState = "input" | "generating" | "done";
export type UserRole = "PM" | "PO" | "GP";
export type ChatPhase = 0 | 1 | 2 | 3;

export type PreviewTab =
  | { kind: "overview" }
  | { kind: "artifact"; id: string }
  | { kind: "prototype" };

export interface ChatMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  phase?: ChatPhase;
  isAction?: boolean;
}

export interface ProjectInput {
  // Setup (fase 0)
  productName: string;
  mvpDeadlineWeeks: number;

  // Fase 1: Diagnóstico & Impacto
  audienceSegment: string;
  costOfInaction: string;

  // Fase 2: Proposta de Valor
  coreValueProp: string;
  northStarMetric: string;

  // Fase 3: Escopo & Restrições
  outOfScope: string;
  hardConstraints: string;
}

// ─── Perguntas do chat por fase ───────────────────────────────────────────────

interface ChatPhaseDef {
  phase: ChatPhase;
  label: string;
  questions: string[];
  mockAnswers: string[];
}

export const CHAT_PHASES: ChatPhaseDef[] = [
  {
    phase: 0,
    label: "Setup",
    questions: [
      "Olá! Vou te guiar em **6 perguntas estratégicas** para montar um termo de abertura.\n\nAntes de começar: qual o **nome do produto** e em **quantas semanas** o protótipo precisa estar pronto?\n\n_Ex.: \"PetCare, 8 semanas\"_",
    ],
    mockAnswers: [
      "PetCare, 8 semanas",
    ],
  },
  {
    phase: 1,
    label: "Diagnóstico & Impacto de Negócio",
    questions: [
      "**Diretriz 1 — Segmentação & comportamento atual**\n\nQual perfil de usuário detém a maior recorrência da dor e de que forma essa necessidade é mitigada paliativamente hoje?",
      "**Diretriz 2 — Custo da Inação**\n\nQual o impacto financeiro, operacional ou reputacional caso este problema não seja solucionado no ciclo atual?",
    ],
    mockAnswers: [
      "Tutores de pets entre 25 e 45 anos, com 1+ animais e rotina ocupada. Hoje mitigam com caderninho ou memória — 70% esquecem alguma vacina por ano.",
      "Risco de saúde animal e perda de receita por cancelamentos. Estimativa: tutores gastam 30% a mais em emergências vet quando esquecem doses; mercado de pet care SaaS perde ~R$12M/ano em retenção por falta de lembrança automatizada.",
    ],
  },
  {
    phase: 2,
    label: "Proposta de Valor & Validação",
    questions: [
      "**Diretriz 3 — Atributo de Diferenciação Crítica**\n\nQual é a capacidade central e indispensável do produto que transformará a experiência do usuário, diferenciando-o drasticamente das alternativas?",
      "**Diretriz 4 — North Star Metric do MVP**\n\nQual comportamento mensurável do usuário evidenciará que o protótipo inicial efetivamente resolveu a dor proposta?",
    ],
    mockAnswers: [
      "Agenda inteligente contextualizada por tipo de evento (vacina, medicação, check-up) com notificações automáticas multi-canal — Google Calendar genérico não entende reforço vs. primeira dose; nós entendemos.",
      "Taxa de conclusão do fluxo principal (cadastrar pet + agendar primeiro lembrete) superior a 75% sem necessidade de suporte ou onboarding presencial no primeiro acesso.",
    ],
  },
  {
    phase: 3,
    label: "Escopo de Negócio & Restrições",
    questions: [
      "**Diretriz 5 — Fronteiras de Escopo (Descarte Estratégico)**\n\nVisando garantir a agilidade na entrega em **{deadline}**, quais funcionalidades e fluxos secundários serão deliberadamente despriorizados nesta rodada?",
      "**Diretriz 6 — Hard Constraints (Restrições Inegociáveis)**\n\nQuais são os limites institucionais, orçamentários, de conformidade legal ou prazos regulatórios que balizam este projeto?",
    ],
    mockAnswers: [
      "Android, compartilhamento com vet via app dedicado, integração nativa com calendários externos e analytics avançados ficam postergados para Fase 2. Versão inicial: iOS, lembretes push, cadastro manual.",
      "Aderência total à LGPD (dados de pets podem conter dados sensíveis dos tutores), teto orçamentário de R$300k (R$250k salários + R$50k infra), prazo de auditoria interna em 30 de novembro.",
    ],
  },
];

const TOTAL_QUESTIONS = CHAT_PHASES.reduce((acc, p) => acc + p.questions.length, 0); // 7

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseSetupAnswer(raw: string): { productName: string; mvpDeadlineWeeks: number } {
  // Tenta extrair "Nome, N semanas" ou variações
  const weekMatch = raw.match(/(\d+)\s*(semanas?|sem|weeks?|w)\b/i);
  const mvpDeadlineWeeks = weekMatch ? parseInt(weekMatch[1], 10) : 4;

  // Nome = tudo antes da primeira vírgula, ou antes do número, ou string completa
  let productName = raw;
  if (raw.includes(",")) {
    productName = raw.split(",")[0].trim();
  } else if (weekMatch) {
    productName = raw.slice(0, weekMatch.index).trim().replace(/[,;:.]$/, "");
  }
  productName = productName.slice(0, 80) || "Meu Produto";

  return { productName, mvpDeadlineWeeks };
}

function renderQuestion(template: string, data: Partial<ProjectInput>): string {
  const deadline = data.mvpDeadlineWeeks
    ? `${data.mvpDeadlineWeeks} semana${data.mvpDeadlineWeeks > 1 ? "s" : ""}`
    : "X semanas";
  return template.replace("{deadline}", deadline);
}

// ─── Context type ─────────────────────────────────────────────────────────────

interface NewProjectContextType {
  flowState: FlowState;
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;

  // Chat
  messages: ChatMessage[];
  currentPhase: ChatPhase;
  totalQuestions: number;
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
    { id: "init", role: "ai", content: CHAT_PHASES[0].questions[0], phase: 0 },
  ]);
  const [currentPhase, setCurrentPhase] = useState<ChatPhase>(0);
  const [phaseQuestionIndex, setPhaseQuestionIndex] = useState(0);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [chatComplete, setChatComplete] = useState(false);

  const [collectedData, setCollectedData] = useState<Partial<ProjectInput>>({});

  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [generatedArtifacts, setGeneratedArtifacts] = useState<GeneratedArtifact[]>([]);
  const [prototypeScreens, setPrototypeScreens] = useState<PrototypeScreen[]>([]);
  const [previewTab, setPreviewTab] = useState<PreviewTab>({ kind: "overview" });

  const currentMockAnswer =
    CHAT_PHASES[currentPhase]?.mockAnswers?.[phaseQuestionIndex] ?? "";

  const toggleRole = useCallback((role: UserRole) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  }, []);

  // ─── Coleta de dados ──────────────────────────────────────────────────────────

  const collectData = (content: string, phase: ChatPhase, questionIndex: number) => {
    setCollectedData((prev) => {
      const next = { ...prev };

      if (phase === 0 && questionIndex === 0) {
        const parsed = parseSetupAnswer(content);
        next.productName = parsed.productName;
        next.mvpDeadlineWeeks = parsed.mvpDeadlineWeeks;
      } else if (phase === 1) {
        if (questionIndex === 0) next.audienceSegment = content;
        else if (questionIndex === 1) next.costOfInaction = content;
      } else if (phase === 2) {
        if (questionIndex === 0) next.coreValueProp = content;
        else if (questionIndex === 1) next.northStarMetric = content;
      } else if (phase === 3) {
        if (questionIndex === 0) next.outOfScope = content;
        else if (questionIndex === 1) next.hardConstraints = content;
      }

      return next;
    });
  };

  // Mapa de campos por (fase, questionIndex) — para invalidação no edit
  const fieldFor = (phase: ChatPhase, qIdx: number): (keyof ProjectInput)[] => {
    if (phase === 0 && qIdx === 0) return ["productName", "mvpDeadlineWeeks"];
    if (phase === 1 && qIdx === 0) return ["audienceSegment"];
    if (phase === 1 && qIdx === 1) return ["costOfInaction"];
    if (phase === 2 && qIdx === 0) return ["coreValueProp"];
    if (phase === 2 && qIdx === 1) return ["northStarMetric"];
    if (phase === 3 && qIdx === 0) return ["outOfScope"];
    if (phase === 3 && qIdx === 1) return ["hardConstraints"];
    return [];
  };

  const fieldsAfter = (phase: ChatPhase, qIdx: number): (keyof ProjectInput)[] => {
    const all: { phase: ChatPhase; qIdx: number }[] = [];
    for (const p of CHAT_PHASES) {
      for (let q = 0; q < p.questions.length; q++) {
        all.push({ phase: p.phase, qIdx: q });
      }
    }
    const startIndex = all.findIndex((x) => x.phase === phase && x.qIdx === qIdx);
    return all
      .slice(startIndex + 1)
      .flatMap((x) => fieldFor(x.phase, x.qIdx));
  };

  // ─── Avançar conversa ────────────────────────────────────────────────────────

  const advanceConversation = (fromPhase: ChatPhase, fromQIdx: number, data: Partial<ProjectInput>) => {
    const phaseDef = CHAT_PHASES[fromPhase];
    const nextQIdx = fromQIdx + 1;
    const hasMoreInPhase = nextQIdx < phaseDef.questions.length;

    if (hasMoreInPhase) {
      const aiContent = renderQuestion(phaseDef.questions[nextQIdx], data);
      setPhaseQuestionIndex(nextQIdx);
      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "ai", content: aiContent, phase: fromPhase },
      ]);
      return;
    }

    if (fromPhase < 3) {
      const nextPhase = (fromPhase + 1) as ChatPhase;
      const aiContent = renderQuestion(CHAT_PHASES[nextPhase].questions[0], data);
      setPhaseQuestionIndex(0);
      setCurrentPhase(nextPhase);
      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "ai", content: aiContent, phase: nextPhase },
      ]);
      return;
    }

    // Conversa completa
    setChatComplete(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        role: "ai",
        content: "Termo de abertura coletado! Selecione os papéis e clique em **Gerar documentos** quando estiver pronto.",
        phase: 3,
        isAction: false,
      },
    ]);
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

      // Calcula próximo estado fora do setTimeout para evitar staleness
      const phase = currentPhase;
      const qIdx = phaseQuestionIndex;

      setTimeout(() => {
        // Recupera dados atualizados via functional set
        setCollectedData((latest) => {
          advanceConversation(phase, qIdx, latest);
          return latest;
        });
        setIsAiTyping(false);
      }, 800);
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
        const msgPhase = (targetMsg.phase ?? 0) as ChatPhase;
        const userMsgsBefore = prev.slice(0, idx).filter(
          (m) => m.role === "user" && m.phase === msgPhase
        ).length;

        setCurrentPhase(msgPhase);
        setPhaseQuestionIndex(userMsgsBefore);
        setChatComplete(false);

        setCollectedData((old) => {
          const next = { ...old };
          // Limpa campos da pergunta editada + posteriores
          const toClear = [
            ...fieldFor(msgPhase, userMsgsBefore),
            ...fieldsAfter(msgPhase, userMsgsBefore),
          ];
          for (const f of toClear) delete next[f];
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

          const msgPhase = (lastUser.phase ?? 0) as ChatPhase;
          const userMsgsInPhase = prev.filter(
            (m) => m.role === "user" && m.phase === msgPhase
          ).length;
          const qIdx = userMsgsInPhase - 1;

          collectData(newContent, msgPhase, qIdx);

          setCollectedData((latest) => {
            advanceConversation(msgPhase, qIdx, latest);
            return latest;
          });
          setIsAiTyping(false);
          return prev;
        });
      }, 800);
    },
    []
  );

  // ─── Upload ──────────────────────────────────────────────────────────────────

  const submitUpload = useCallback(async (text: string) => {
    setIsAiTyping(true);
    const parsed = await aiService.parseDocument(text);
    const partial: Partial<ProjectInput> = {
      productName: parsed.productName,
      mvpDeadlineWeeks: parsed.mvpDeadlineWeeks,
      audienceSegment: parsed.audienceSegment,
      costOfInaction: parsed.costOfInaction,
      coreValueProp: parsed.coreValueProp,
      northStarMetric: parsed.northStarMetric,
      outOfScope: parsed.outOfScope,
      hardConstraints: parsed.hardConstraints,
    };
    setCollectedData(partial);
    setIsAiTyping(false);
    generateArtifactsFrom(partial);
  }, []); // eslint-disable-line

  // ─── Gerar ───────────────────────────────────────────────────────────────────

  const generateArtifactsFrom = async (data: Partial<ProjectInput>) => {
    setFlowState("generating");
    setPreviewTab({ kind: "overview" });
    setPrototypeScreens([]);

    const base: Omit<GenerateArtifactsInput, "role"> = {
      productName: data.productName ?? "Meu Produto",
      mvpDeadlineWeeks: data.mvpDeadlineWeeks ?? 4,
      audienceSegment: data.audienceSegment ?? "",
      costOfInaction: data.costOfInaction ?? "",
      coreValueProp: data.coreValueProp ?? "",
      northStarMetric: data.northStarMetric ?? "",
      outOfScope: data.outOfScope ?? "",
      hardConstraints: data.hardConstraints ?? "",
    };

    const roles: UserRole[] = selectedRoles.length > 0 ? selectedRoles : ["PO"];
    const results = await Promise.all(
      roles.map((role) => aiService.generateArtifacts({ ...base, role }))
    );
    const all = results.flat();
    await storageService.saveArtifacts(projectId, all);
    setGeneratedArtifacts(all);

    let screens: PrototypeScreen[] = [];
    try {
      const prd = all.find((a) => /prd|termo/i.test(a.title));
      const prdBody =
        prd?.content ??
        [
          base.audienceSegment,
          base.costOfInaction,
          base.coreValueProp,
          base.northStarMetric,
          base.outOfScope,
          base.hardConstraints,
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
        totalQuestions: TOTAL_QUESTIONS,
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
