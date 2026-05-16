"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, CheckSquare2, Square, Check } from "lucide-react";
import { useNewProject, type UserRole } from "../context/new-project-context";
import { cn } from "@/lib/utils";

const ROLES: { id: UserRole; label: string; description: string; color: string; activeColor: string }[] = [
  {
    id: "PM",
    label: "Product Manager",
    description: "Vision Board · RICE · Riscos · KPIs",
    color: "border-purple-200 bg-purple-50 text-purple-700",
    activeColor: "border-purple-400 bg-purple-100 text-purple-800 ring-2 ring-purple-300",
  },
  {
    id: "PO",
    label: "Product Owner",
    description: "PRD · Backlog · Aceite · Jornada · DoD",
    color: "border-zds-blue-600 bg-zds-blue-700 text-zds-blue-400",
    activeColor: "border-zds-blue-400 bg-zds-blue-700 text-zds-blue-300 ring-2 ring-zds-blue-500",
  },
  {
    id: "GP",
    label: "Gerente de Projeto",
    description: "Charter · Roadmap · RACI · Comunicação",
    color: "border-green-200 bg-green-50 text-green-700",
    activeColor: "border-green-400 bg-green-100 text-green-800 ring-2 ring-green-300",
  },
];

export function ArtifactSelector() {
  const {
    selectedRoles,
    toggleRole,
    artifactOptions,
    selectedArtifactIds,
    toggleArtifact,
    generateArtifacts,
  } = useNewProject();

  // Artefatos de todos os papéis selecionados (sem duplicata)
  const visibleArtifacts = selectedRoles.flatMap((role) => artifactOptions[role]);

  const totalSelected = selectedArtifactIds.filter((id) =>
    visibleArtifacts.some((a) => a.id === id)
  ).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-white shrink-0">
        <p className="text-xs font-bold text-zds-neutral-400 uppercase tracking-widest mb-1">Etapa 2 de 2</p>
        <h2 className="font-bold text-zds-neutral-200 text-base flex items-center gap-2">
          <Sparkles size={16} className="text-zds-blue-400" />
          Selecionar Artefatos
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 bg-zds-neutral-900 space-y-5">

        {/* Role selector — multi-select */}
        <div>
          <p className="text-[10px] font-bold text-zds-neutral-500 uppercase tracking-widest mb-3">
            Selecione os papéis <span className="text-zds-neutral-600 font-normal normal-case">(pode escolher mais de um)</span>
          </p>
          <div className="space-y-2">
            {ROLES.map(({ id, label, description, color, activeColor }) => {
              const active = selectedRoles.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleRole(id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all",
                    active ? activeColor : cn("bg-white", color, "hover:opacity-90")
                  )}
                >
                  <div className={cn(
                    "size-5 rounded flex items-center justify-center shrink-0 border transition-all",
                    active ? "bg-current border-current" : "border-current opacity-40"
                  )}>
                    {active && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{id} — {label}</p>
                    <p className="text-xs opacity-70 mt-0.5">{description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Artifact list agrupada por papel */}
        {selectedRoles.length > 0 && (
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-zds-neutral-500 uppercase tracking-widest">
              Documentos disponíveis
            </p>
            {selectedRoles.map((role) => (
              <div key={role}>
                <p className="text-[10px] font-bold text-zds-neutral-600 uppercase tracking-widest mb-2 px-1">{role}</p>
                <div className="space-y-1.5">
                  {artifactOptions[role].map(({ id, label, description }) => {
                    const selected = selectedArtifactIds.includes(id);
                    return (
                      <button
                        key={id}
                        onClick={() => toggleArtifact(id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all",
                          selected
                            ? "bg-zds-blue-700 border-zds-blue-600 text-zds-blue-300"
                            : "bg-white border-zds-neutral-700 text-zds-neutral-300 hover:border-zds-neutral-600"
                        )}
                      >
                        {selected
                          ? <CheckSquare2 size={16} className="text-zds-blue-400 shrink-0" />
                          : <Square size={16} className="text-zds-neutral-600 shrink-0" />
                        }
                        <div>
                          <p className="text-sm font-bold">{label}</p>
                          <p className="text-xs text-zds-neutral-500">{description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 py-4 bg-white border-t shrink-0">
        <Button
          onClick={generateArtifacts}
          disabled={totalSelected === 0}
          className="w-full bg-zds-blue-400 hover:bg-zds-blue-300 text-white font-bold h-11 gap-2 disabled:opacity-40 shadow-lg shadow-zds-blue-400/20"
        >
          <Sparkles size={16} />
          Gerar {totalSelected} documento{totalSelected !== 1 ? "s" : ""}
          {selectedRoles.length > 1 && ` · ${selectedRoles.join(" + ")}`}
        </Button>
      </div>
    </div>
  );
}
