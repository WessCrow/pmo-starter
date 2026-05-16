"use client";

import { useRouter } from "next/navigation";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { NewProjectProvider, useNewProject } from "@/modules/prd/context/new-project-context";
import { ModeSelector } from "@/modules/prd/components/mode-selector";
import { ChatPanel } from "@/modules/prd/components/chat-panel";
import { UploadPanel } from "@/modules/prd/components/upload-panel";
import { PreviewPanel } from "@/modules/prd/components/preview-panel";
import { PreviewPanelV2 } from "@/modules/prd/components/preview-panel-v2";
import { DownloadOptions } from "@/modules/prd/components/download-options";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, CheckCircle2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildDocumentationMarkdown(projectId: string, artifacts: { title: string; content: string }[]) {
  const header = `# Documentação gerada — PMO Starter\nProjeto: \`${projectId}\`\n\n`;
  const body = artifacts
    .map((a) => `---\n\n# ${a.title}\n\n${a.content.trim()}\n`)
    .join("\n");
  return header + body;
}

function buildPrototypeHtml(
  projectId: string,
  screens: { id: string; title: string; order: number; html: string }[]
) {
  const sorted = [...screens].sort((a, b) => a.order - b.order);
  const sections = sorted
    .map(
      (s) => `  <section class="proto-screen">
    <h2>${escapeHtml(s.title)} <span class="order">#${s.order}</span></h2>
    <div class="proto-frame">${s.html}</div>
  </section>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Protótipo — ${escapeHtml(projectId)}</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 24px; background: #f6f7f9; color: #16171a; }
    h1 { font-size: 1.25rem; margin: 0 0 24px; }
    .proto-screen { margin-bottom: 48px; background: #fff; border: 1px solid #dce0e8; border-radius: 12px; padding: 20px; }
    .proto-screen h2 { font-size: 1rem; margin: 0 0 16px; }
    .order { color: #1774de; font-weight: 600; font-size: 0.75rem; }
    .proto-frame { border: 1px solid #eceef2; border-radius: 8px; overflow: auto; min-height: 200px; }
  </style>
</head>
<body>
  <h1>Protótipo encapsulado</h1>
${sections}
</body>
</html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function downloadGeneratedPackage(
  projectId: string,
  artifacts: { title: string; content: string }[],
  prototypeScreens: { id: string; title: string; order: number; html: string }[]
) {
  const md = buildDocumentationMarkdown(projectId, artifacts);
  triggerBlobDownload(new Blob([md], { type: "text/markdown;charset=utf-8" }), `documentacao-${projectId}.md`);

  if (prototypeScreens.length > 0) {
    window.setTimeout(() => {
      const html = buildPrototypeHtml(projectId, prototypeScreens);
      triggerBlobDownload(new Blob([html], { type: "text/html;charset=utf-8" }), `prototipo-${projectId}.html`);
    }, 400);
  }
}

function LeftPanel() {
  const { flowState, inputMode } = useNewProject();

  if (flowState === "generating") return <GeneratingPanel />;
  if (flowState === "done") return <DonePanel />;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <ModeSelector />
      {inputMode === "chat" && (
        <div
          role="tabpanel"
          id="new-project-panel-chat"
          aria-labelledby="new-project-tab-chat"
          className="flex min-h-0 flex-1 flex-col"
        >
          <ChatPanel />
        </div>
      )}
      {inputMode === "upload" && (
        <div
          role="tabpanel"
          id="new-project-panel-upload"
          aria-labelledby="new-project-tab-upload"
          className="flex min-h-0 flex-1 flex-col"
        >
          <UploadPanel />
        </div>
      )}
    </div>
  );
}

function GeneratingPanel() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 bg-zds-neutral-900 px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 bg-zds-blue-400/10 blur-[100px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="size-20 rounded-3xl bg-white border border-zds-neutral-800 flex items-center justify-center shadow-premium">
          <Loader2 size={32} className="text-zds-blue-400 animate-spin" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-zds-neutral-200 font-heading tracking-tight">
            Sincronizando modelos
          </h2>
          <p className="text-sm text-zds-neutral-500 max-w-[280px]">
            A IA está estruturando o contexto e redigindo seus documentos estratégicos.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mt-2">
          {["PRD.md", "CONTEXT.md", "RULES.md"].map((label, i) => (
            <div
              key={label}
              className="px-4 py-2 rounded-xl text-[10px] font-bold text-zds-blue-400 uppercase tracking-widest bg-white border border-zds-neutral-800 shadow-sm animate-pulse"
              style={{ animationDelay: `${i * 400}ms` }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonePanel() {
  const { generatedArtifacts, prototypeScreens, projectId } = useNewProject();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 bg-zds-neutral-900 px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 bg-zds-green-400/15 blur-[100px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">
        <div className="size-20 rounded-3xl bg-white border border-zds-neutral-800 flex items-center justify-center shadow-premium">
          <CheckCircle2 size={32} className="text-zds-green-400" />
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-zds-neutral-200 font-heading tracking-tight">
            Prototipação concluída
          </h2>
          <p className="text-sm font-medium text-primary">
            Navegue nos artefatos nas abas ao lado
          </p>
          <p className="text-[12px] text-zds-neutral-500 leading-relaxed">
            Baixe toda a documentação e o protótipo ou comece outro projeto.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full pt-2">
          <Button
            type="button"
            onClick={() =>
              downloadGeneratedPackage(projectId, generatedArtifacts, prototypeScreens)
            }
            className="w-full font-bold h-12 rounded-xl gap-2 shadow-sm"
          >
            <Download size={18} />
            Baixar documentação gerada
          </Button>
          <div className="w-full rounded-xl border border-zds-neutral-800 bg-white p-4">
            <DownloadOptions />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/project/new")}
            className="w-full font-bold h-12 rounded-xl border-zds-neutral-700 bg-white text-zds-neutral-200 hover:bg-zds-neutral-900 hover:text-white"
          >
            <Sparkles size={18} className="text-primary" />
            Criar novo projeto
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProjectPageHeader() {
  const { flowState, currentPhase } = useNewProject();

  const isDone = flowState === "done";
  const isGenerating = flowState === "generating";

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 py-4 border-b border-zds-neutral-800 bg-white shrink-0 z-20">
      <div className="flex items-center gap-4 min-w-0 justify-self-start">
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-sm shrink-0">
          <Sparkles size={20} className="text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-zds-neutral-200 text-base leading-tight truncate">
            P.M.O - STARTER
          </span>
          <span className="text-[11px] sm:text-xs text-zds-neutral-500 font-medium leading-snug mt-0.5">
            Documentação inicial em minutos
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 justify-self-center text-center min-w-0 px-2">
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-widest leading-none",
            isDone ? "text-zds-green-600" : "text-zds-neutral-500"
          )}
        >
          {isDone ? "Protótipo concluído" : "Status da coleta"}
        </span>
        {!isDone && (
          <div className="flex gap-1 items-center justify-center">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1 w-6 rounded-full transition-all duration-500",
                  isGenerating
                    ? "bg-primary/40 animate-pulse"
                    : s <= currentPhase
                      ? "bg-primary shadow-[0_0_8px_rgba(23,116,222,0.35)]"
                      : "bg-zds-neutral-800"
                )}
              />
            ))}
          </div>
        )}
        {isDone && (
          <div className="flex gap-1 items-center justify-center" aria-hidden>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="h-1 w-6 rounded-full bg-zds-green-500 shadow-[0_0_6px_rgba(18,185,58,0.35)]"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end justify-self-end">
        <div className="px-3 py-1.5 bg-zds-neutral-900 rounded-lg border border-zds-neutral-800">
          <span className="text-[10px] font-bold text-zds-neutral-500">MVP · Coleta de contexto</span>
        </div>
      </div>
    </header>
  );
}

function RightPanel() {
  const { flowState } = useNewProject();
  if (flowState === "input") {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-y-auto p-6">
        <PreviewPanelV2 />
      </div>
    );
  }
  return <PreviewPanel />;
}

function NewProjectContent() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-zds-neutral-900">
      <ProjectPageHeader />

      <main className="flex min-h-0 flex-1 flex-col">
        <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
        <ResizablePanel
          defaultSize={40}
          minSize={32}
          className="flex flex-col overflow-hidden border-r border-zds-neutral-800 bg-white"
        >
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle withHandle className="w-px bg-zds-neutral-800" />
        <ResizablePanel defaultSize={60} minSize={38} className="flex min-h-0 flex-col overflow-hidden bg-white">
          <RightPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
      </main>
    </div>
  );
}

export default function NewProjectPage() {
  return (
    <NewProjectProvider>
      <NewProjectContent />
    </NewProjectProvider>
  );
}
