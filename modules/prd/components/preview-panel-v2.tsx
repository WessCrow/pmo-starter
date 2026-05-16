"use client";

import React, { useMemo } from "react";
import { useNewProject } from "@/modules/prd/context/new-project-context";

// ─── Ícones ──────────────────────────────────────────────────────────────────

const IconDiagnostico = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 5.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconValor = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconEscopo = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type SectionStatus = "pending" | "filling" | "complete";

interface SectionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: SectionStatus;
  preview?: string;
  accentClass: string;
  iconColorClass: string;
}

// ─── Status Badge ────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: SectionStatus }) => {
  const config = {
    pending: { icon: "○", text: "Pendente", bg: "bg-slate-100", fg: "text-slate-600" },
    filling: { icon: "●", text: "Em curso", bg: "bg-blue-100", fg: "text-blue-700" },
    complete: { icon: "✓", text: "Chancelado", bg: "bg-green-100", fg: "text-green-700" },
  };
  const c = config[status];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${c.bg} ${c.fg}`}>
      <span>{c.icon}</span>
      <span>{c.text}</span>
    </div>
  );
};

// ─── Section Card ────────────────────────────────────────────────────────────

const SectionCard = ({ title, subtitle, icon, status, preview, accentClass, iconColorClass }: SectionCardProps) => (
  <div className={`border-l-4 rounded-lg p-4 ${accentClass} bg-white shadow-sm hover:shadow-md transition-shadow`}>
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className={`mt-1 flex-shrink-0 ${iconColorClass}`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          {preview && status === "complete" && (
            <p className="text-slate-600 text-xs mt-2 line-clamp-3">{preview}</p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        <StatusBadge status={status} />
      </div>
    </div>
  </div>
);

// ─── Progress Bar ────────────────────────────────────────────────────────────

const ProgressBar = ({ completed, total }: { completed: number; total: number }) => {
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-medium text-slate-700">Coleta estratégica</span>
        <span className="text-slate-500">{completed} de {total} perguntas</span>
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

// ─── Componente Principal ────────────────────────────────────────────────────

export function PreviewPanelV2() {
  const { collectedData, currentPhase, totalQuestions } = useNewProject();

  const sections = useMemo(() => {
    const phaseStatus = (phase: 1 | 2 | 3): SectionStatus => {
      if (phase < currentPhase) return "complete";
      if (phase === currentPhase) return "filling";
      return "pending";
    };

    return [
      {
        id: "diagnostico",
        title: "Fase 1 — Diagnóstico & Impacto",
        subtitle: "Quem sofre · Custo da inação",
        icon: <IconDiagnostico />,
        status: phaseStatus(1),
        preview: [collectedData.audienceSegment, collectedData.costOfInaction].filter(Boolean).join(" · "),
        accentClass: "border-l-red-500",
        iconColorClass: "text-red-600",
      },
      {
        id: "valor",
        title: "Fase 2 — Proposta de Valor",
        subtitle: "Diferenciação · North Star",
        icon: <IconValor />,
        status: phaseStatus(2),
        preview: [collectedData.coreValueProp, collectedData.northStarMetric].filter(Boolean).join(" · "),
        accentClass: "border-l-blue-500",
        iconColorClass: "text-blue-600",
      },
      {
        id: "escopo",
        title: "Fase 3 — Escopo & Restrições",
        subtitle: "Descarte · Hard constraints",
        icon: <IconEscopo />,
        status: phaseStatus(3),
        preview: [collectedData.outOfScope, collectedData.hardConstraints].filter(Boolean).join(" · "),
        accentClass: "border-l-orange-500",
        iconColorClass: "text-orange-600",
      },
    ];
  }, [collectedData, currentPhase]);

  const completedFields = [
    collectedData.productName,
    collectedData.mvpDeadlineWeeks,
    collectedData.audienceSegment,
    collectedData.costOfInaction,
    collectedData.coreValueProp,
    collectedData.northStarMetric,
    collectedData.outOfScope,
    collectedData.hardConstraints,
  ].filter((v) => v !== undefined && v !== "").length;

  const completedSections = sections.filter((s) => s.status === "complete").length;
  const phaseLabel = currentPhase === 0 ? "Setup" : `Fase ${currentPhase} de 3`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 pb-6 border-b border-slate-200">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Termo de Abertura — pré-visualização</h2>
            <p className="text-xs text-slate-500 mt-1">{phaseLabel}</p>
          </div>
          <ProgressBar completed={completedFields} total={totalQuestions} />
        </div>
      </div>

      {/* Setup card (productName + prazo) */}
      {(collectedData.productName || collectedData.mvpDeadlineWeeks) && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span>
              <span className="font-semibold text-slate-700">Produto: </span>
              <span className="text-slate-600">{collectedData.productName || "—"}</span>
            </span>
            <span>
              <span className="font-semibold text-slate-700">Prazo MVP: </span>
              <span className="text-slate-600">
                {collectedData.mvpDeadlineWeeks ? `${collectedData.mvpDeadlineWeeks} semanas` : "—"}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Section Cards */}
      <div className="grid grid-cols-1 gap-3">
        {sections.map((s) => (
          <SectionCard key={s.id} {...s} />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{completedSections}/3</div>
          <div className="text-xs text-slate-500 mt-1">Fases chanceladas</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{completedFields}/{totalQuestions}</div>
          <div className="text-xs text-slate-500 mt-1">Campos preenchidos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-700">
            {currentPhase === 0 ? "—" : currentPhase}
          </div>
          <div className="text-xs text-slate-500 mt-1">Fase atual</div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-600">
          Termo de abertura estratégico em <strong>1 página</strong> · substitui PRDs longos · co-criação Eng/UX sob restrições claras
        </p>
      </div>
    </div>
  );
}
