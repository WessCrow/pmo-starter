"use client";

import React, { useMemo } from "react";
import { useNewProject, type ProjectInput } from "@/modules/prd/context/new-project-context";

// ─── Ícones simples inline (Lucide-style) ────────────────────────────────────

const IconProduct = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
  </svg>
);

const IconProblem = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M12 3a9 9 0 110 18 9 9 0 010-18z" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.656v2.656" />
  </svg>
);

const IconTarget = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconCheckCircle = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const IconClock = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-2.828 2.829a1 1 0 101.415 1.415L9 10.414V6z" clipRule="evenodd" />
  </svg>
);

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type SectionStatus = "pending" | "filling" | "complete";

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  status: SectionStatus;
  data?: string;
  colorClass: string;
}

// ─── Status Badge ───────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: SectionStatus }) => {
  const config = {
    pending: {
      icon: "○",
      text: "Pendente",
      bgClass: "bg-slate-100",
      textClass: "text-slate-600",
    },
    filling: {
      icon: "●",
      text: "Coletando",
      bgClass: "bg-blue-100",
      textClass: "text-blue-600",
    },
    complete: {
      icon: "✓",
      text: "Preenchido",
      bgClass: "bg-green-100",
      textClass: "text-green-600",
    },
  };

  const c = config[status];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${c.bgClass} ${c.textClass}`}>
      <span>{c.icon}</span>
      <span>{c.text}</span>
    </div>
  );
};

// ─── Section Card ───────────────────────────────────────────────────────────

const SectionCard = ({ title, icon, status, data, colorClass }: SectionCardProps) => {
  return (
    <div className={`border-l-4 rounded-lg p-4 ${colorClass} bg-white shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`mt-1 flex-shrink-0 ${colorClass.includes("border-blue") ? "text-blue-600" : colorClass.includes("border-green") ? "text-green-600" : colorClass.includes("border-purple") ? "text-purple-600" : colorClass.includes("border-orange") ? "text-orange-600" : "text-pink-600"}`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
            {data && status === "complete" && (
              <p className="text-slate-600 text-xs mt-2 line-clamp-2">{data}</p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};

// ─── Progress Bar ───────────────────────────────────────────────────────────

const ProgressBar = ({ completed, total }: { completed: number; total: number }) => {
  const percentage = (completed / total) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-medium text-slate-700">Coleta de dados</span>
        <span className="text-slate-500">
          {completed} de {total} seções
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────

export function PreviewPanelV2() {
  const { collectedData, currentPhase } = useNewProject();

  // Determinar status de cada seção
  const sections = useMemo(() => {
    const getSectionStatus = (phase: number): SectionStatus => {
      if (phase < currentPhase) return "complete";
      if (phase === currentPhase) return "filling";
      return "pending";
    };

    return [
      {
        id: "product",
        title: "Produto & Problema",
        icon: <IconProduct />,
        phase: 1,
        status: getSectionStatus(1),
        data: collectedData.productName || collectedData.problem,
        colorClass: "border-l-blue-500",
      },
      {
        id: "audience",
        title: "Público & Contexto",
        icon: <IconUsers />,
        phase: 1,
        status: getSectionStatus(1),
        data: collectedData.audience || collectedData.currentWorkflow,
        colorClass: "border-l-green-500",
      },
      {
        id: "solution",
        title: "Solução & Estratégia",
        icon: <IconTarget />,
        phase: 2,
        status: getSectionStatus(2),
        data: collectedData.solution || collectedData.successMetrics,
        colorClass: "border-l-purple-500",
      },
      {
        id: "scope",
        title: "Escopo & Restrições",
        icon: <IconProblem />,
        phase: 3,
        status: getSectionStatus(3),
        data: collectedData.minimumMVPScope || collectedData.constraints,
        colorClass: "border-l-orange-500",
      },
    ];
  }, [collectedData, currentPhase]);

  const completedSections = sections.filter((s) => s.status === "complete").length;

  return (
    <div className="space-y-6">
      {/* Header com progresso */}
      <div className="sticky top-0 bg-white z-10 pb-6 border-b border-slate-200">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Resumo do PRD</h2>
            <p className="text-xs text-slate-500 mt-1">
              Fase {currentPhase} de 3 — Respondendo pergunta {((currentPhase - 1) * 4) + 1} de 12
            </p>
          </div>
          <ProgressBar completed={completedSections} total={sections.length} />
        </div>
      </div>

      {/* Cards de seções */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            title={section.title}
            icon={section.icon}
            status={section.status}
            data={section.data}
            colorClass={section.colorClass}
          />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{completedSections}</div>
          <div className="text-xs text-slate-500 mt-1">Seções completas</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{currentPhase}</div>
          <div className="text-xs text-slate-500 mt-1">Fase atual</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{sections.length - completedSections}</div>
          <div className="text-xs text-slate-500 mt-1">Pendentes</div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-600">
          Continue respondendo as perguntas para completar o PRD. Você pode editar suas respostas a qualquer momento.
        </p>
      </div>
    </div>
  );
}
