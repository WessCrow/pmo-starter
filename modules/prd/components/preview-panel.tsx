"use client";

import type { ElementType } from "react";
import type { GeneratedArtifact, PrototypeScreen } from "@/services/ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Sparkles, ChevronRight, LayoutTemplate } from "lucide-react";
import { useNewProject, type PreviewTab } from "../context/new-project-context";
import { cn } from "@/lib/utils";
import { SimpleMarkdown } from "./simple-markdown";

const PROTOTYPE_TAB_LABEL = "Overview do protótipo encapsulado";

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div className={cn("h-4 bg-zds-neutral-800/80 rounded-lg animate-pulse w-full", className)} />
  );
}

function DraftTab() {
  const { collectedData, currentPhase } = useNewProject();

  const cardClass =
    "rounded-2xl border border-zds-neutral-800 bg-white p-6 text-base text-zds-neutral-300 leading-relaxed shadow-sm";

  return (
    <ScrollArea className="flex-1 px-8 py-10">
      <div className="max-w-2xl mx-auto space-y-12 pb-20">
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-widest border border-primary/20">
              Documento em construção
            </div>
            <ChevronRight size={12} className="text-zds-neutral-500" />
            <span className="text-[10px] font-bold text-zds-neutral-500 uppercase tracking-widest">
              PMO-STARTER
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-zds-neutral-200 font-heading tracking-tight">
            {collectedData.productName ?? "Título do produto"}
          </h1>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zds-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <div
                className={cn(
                  "size-2 rounded-full",
                  collectedData.problem
                    ? "bg-zds-green-400 shadow-[0_0_10px_rgba(18,185,58,0.5)]"
                    : "bg-zds-neutral-800 animate-pulse"
                )}
              />
              <span className="text-zds-neutral-500">1. O problema</span>
            </h3>
            {collectedData.problem && <Sparkles size={14} className="text-primary animate-pulse" />}
          </div>
          {collectedData.problem ? (
            <div className={cardClass}>{collectedData.problem}</div>
          ) : (
            <div className="space-y-3 px-6 py-4 border border-dashed border-zds-neutral-800 rounded-2xl bg-zds-neutral-900/50">
              <SkeletonLine />
              <SkeletonLine className="max-w-[83%]" />
              <SkeletonLine className="max-w-[66%]" />
            </div>
          )}
        </section>

        <section
          className={cn(
            "space-y-4 transition-all duration-700",
            currentPhase >= 1 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-4"
          )}
        >
          <h3 className="text-sm font-bold text-zds-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <div
              className={cn(
                "size-2 rounded-full",
                collectedData.audience ? "bg-zds-green-400 shadow-[0_0_10px_rgba(18,185,58,0.5)]" : "bg-zds-neutral-800"
              )}
            />
            <span className="text-zds-neutral-500">2. Público-alvo</span>
          </h3>
          {collectedData.audience ? (
            <div className={cardClass}>{collectedData.audience}</div>
          ) : (
            <div className="space-y-3 px-6 py-4 border border-dashed border-zds-neutral-800 rounded-2xl opacity-60 bg-zds-neutral-900/30">
              <SkeletonLine className="max-w-[75%]" />
              <SkeletonLine className="max-w-[50%]" />
            </div>
          )}
        </section>

        <section
          className={cn(
            "space-y-4 transition-all duration-700 delay-150",
            currentPhase >= 2 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-4"
          )}
        >
          <h3 className="text-sm font-bold text-zds-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <div
              className={cn(
                "size-2 rounded-full",
                collectedData.solution ? "bg-zds-green-400 shadow-[0_0_10px_rgba(18,185,58,0.5)]" : "bg-zds-neutral-800"
              )}
            />
            <span className="text-zds-neutral-500">3. Proposta de valor</span>
          </h3>
          {collectedData.solution ? (
            <div className={cn(cardClass, "bg-primary/5 border-primary/20")}>
              <p className="text-zds-neutral-200 font-medium">{collectedData.solution}</p>
            </div>
          ) : (
            <div className="space-y-3 px-6 py-4 border border-dashed border-zds-neutral-800 rounded-2xl opacity-50 bg-zds-neutral-900/20">
              <SkeletonLine />
              <SkeletonLine className="max-w-[83%]" />
            </div>
          )}
        </section>

        <section
          className={cn(
            "space-y-4 transition-all duration-700 delay-300",
            currentPhase >= 3 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-4"
          )}
        >
          <h3 className="text-sm font-bold text-zds-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <div
              className={cn(
                "size-2 rounded-full",
                collectedData.constraints
                  ? "bg-zds-green-400 shadow-[0_0_10px_rgba(18,185,58,0.5)]"
                  : "bg-zds-neutral-800"
              )}
            />
            <span className="text-zds-neutral-500">4. Restrições e escopo</span>
          </h3>
          {collectedData.constraints ? (
            <div className={cardClass}>{collectedData.constraints}</div>
          ) : (
            <div className="h-32 border border-dashed border-zds-neutral-800 rounded-2xl flex items-center justify-center bg-zds-neutral-900/50">
              <p className="text-[10px] font-bold text-zds-neutral-500 uppercase tracking-widest">
                Aguardando coleta de dados...
              </p>
            </div>
          )}
        </section>
      </div>
    </ScrollArea>
  );
}

function ArtifactDocumentPane({ artifact }: { artifact: GeneratedArtifact }) {
  return (
    <ScrollArea className="flex-1 min-h-0">
      <div className="px-8 py-10 max-w-3xl mx-auto pb-20">
        <header className="mb-8 space-y-2">
          <p className="text-[10px] font-bold text-zds-neutral-500 uppercase tracking-widest">
            {artifact.type}
          </p>
          <h2 className="text-2xl font-bold text-zds-neutral-200 font-heading tracking-tight">
            {artifact.title}
          </h2>
          {artifact.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {artifact.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-bold text-primary/90 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="rounded-2xl border border-zds-neutral-800 bg-white p-6 shadow-sm">
          <SimpleMarkdown content={artifact.content} />
        </div>
      </div>
    </ScrollArea>
  );
}

function PrototypeOverviewPane({ screens }: { screens: PrototypeScreen[] }) {
  if (screens.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
        <LayoutTemplate size={40} className="text-zds-neutral-600" />
        <p className="text-sm font-medium max-w-xs text-zds-neutral-500">
          Nenhuma tela de protótipo foi gerada. Verifique a integração com o serviço de IA.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 min-h-0">
      <div className="px-8 py-10 space-y-12 max-w-5xl mx-auto pb-24">
        <p className="text-sm text-zds-neutral-500">
          Visualização encapsulada das telas sugeridas com base no PRD. Navegação entre telas mock usa
          âncoras internas ao preview.
        </p>
        {screens
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((screen) => (
            <section key={screen.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  Tela {screen.order}
                </span>
                <h3 className="text-lg font-bold text-zds-neutral-200 font-heading">{screen.title}</h3>
              </div>
              <div className="rounded-2xl border border-zds-neutral-800 overflow-hidden bg-zds-neutral-900/30 shadow-inner">
                <iframe
                  title={screen.title}
                  srcDoc={screen.html}
                  sandbox="allow-same-origin allow-scripts"
                  className="w-full min-h-[480px] border-0 bg-white"
                />
              </div>
            </section>
          ))}
      </div>
    </ScrollArea>
  );
}

function tabIsActive(tab: PreviewTab, kind: PreviewTab["kind"], artifactId?: string) {
  if (kind === "overview") return tab.kind === "overview";
  if (kind === "prototype") return tab.kind === "prototype";
  return tab.kind === "artifact" && artifactId !== undefined && tab.id === artifactId;
}

function previewActiveTabDomId(tab: PreviewTab): string {
  if (tab.kind === "overview") return "preview-tab-overview";
  if (tab.kind === "prototype") return "preview-tab-prototype";
  return `preview-tab-artifact-${tab.id}`;
}

function PreviewTabButton({
  label,
  icon: Icon,
  active,
  onClick,
  title,
  panelId,
  tabId,
}: {
  label: string;
  icon: ElementType;
  active: boolean;
  onClick: () => void;
  title?: string;
  panelId: string;
  tabId: string;
}) {
  return (
    <button
      id={tabId}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={panelId}
      title={title ?? label}
      onClick={onClick}
      className={cn(
        "flex max-w-[200px] shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-left text-[0.625rem] font-bold uppercase tracking-widest -mb-px transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        active ? "border-primary text-primary" : "border-transparent text-zds-neutral-500 hover:text-zds-neutral-200"
      )}
    >
      <Icon size={14} className="shrink-0" aria-hidden />
      <span className="truncate">{label}</span>
    </button>
  );
}

function PreviewBody() {
  const { flowState, previewTab, generatedArtifacts, prototypeScreens } = useNewProject();

  if (flowState !== "done") {
    return <DraftTab />;
  }

  if (previewTab.kind === "overview") {
    return <DraftTab />;
  }

  if (previewTab.kind === "prototype") {
    return <PrototypeOverviewPane screens={prototypeScreens} />;
  }

  const artifact = generatedArtifacts.find((a) => a.id === previewTab.id);
  if (!artifact) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-sm text-zds-neutral-500">
        Documento não encontrado.
      </div>
    );
  }

  return <ArtifactDocumentPane artifact={artifact} />;
}

export function PreviewPanel() {
  const { flowState, previewTab, setPreviewTab, generatedArtifacts } = useNewProject();

  const showDocTabs = flowState === "done";

  return (
    <div className="flex flex-col h-full bg-white min-h-0">
      <div className="px-4 sm:px-6 bg-white border-b border-zds-neutral-800 shrink-0 sticky top-0 z-10">
        <div className="flex items-end gap-2 pt-4">
          <div
            role={showDocTabs ? "tablist" : undefined}
            aria-label={showDocTabs ? "Documentos gerados" : undefined}
            className={cn(
              "flex min-w-0 flex-1 items-end gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              showDocTabs && "pb-px"
            )}
          >
            {showDocTabs ? (
              <>
                <PreviewTabButton
                  label="Visão geral"
                  icon={FileText}
                  active={tabIsActive(previewTab, "overview")}
                  onClick={() => setPreviewTab({ kind: "overview" })}
                  tabId="preview-tab-overview"
                  panelId="preview-main-panel"
                />
                {generatedArtifacts.map((a) => (
                  <PreviewTabButton
                    key={a.id}
                    label={a.title}
                    icon={FileText}
                    active={tabIsActive(previewTab, "artifact", a.id)}
                    onClick={() => setPreviewTab({ kind: "artifact", id: a.id })}
                    tabId={`preview-tab-artifact-${a.id}`}
                    panelId="preview-main-panel"
                  />
                ))}
                <PreviewTabButton
                  label={PROTOTYPE_TAB_LABEL}
                  icon={LayoutTemplate}
                  active={tabIsActive(previewTab, "prototype")}
                  onClick={() => setPreviewTab({ kind: "prototype" })}
                  tabId="preview-tab-prototype"
                  panelId="preview-main-panel"
                />
              </>
            ) : (
              <div className="flex items-center gap-2 pb-3">
                <FileText size={14} className="text-primary" aria-hidden />
                <span className="border-b-2 border-primary pb-3 text-[0.625rem] font-bold uppercase tracking-widest text-primary -mb-px">
                  Visão geral
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        id={showDocTabs ? "preview-main-panel" : undefined}
        role={showDocTabs ? "tabpanel" : undefined}
        aria-labelledby={showDocTabs ? previewActiveTabDomId(previewTab) : undefined}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <PreviewBody />
      </div>
    </div>
  );
}
