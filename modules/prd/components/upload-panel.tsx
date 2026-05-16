"use client";

import { useState, useRef, type DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, X, FileSearch } from "lucide-react";
import { useNewProject } from "../context/new-project-context";
import { cn } from "@/lib/utils";

const FILE_INPUT_ID = "upload-file-input";

export function UploadPanel() {
  const { submitUpload, isAiTyping } = useNewProject();
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setText((e.target?.result as string) ?? "");
    reader.readAsText(file);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="shrink-0 border-b border-zds-neutral-800 bg-zds-neutral-900/40 px-6 py-6">
        <p className="mb-1.5 text-[0.625rem] font-bold uppercase tracking-widest text-primary">
          Upload / texto livre
        </p>
        <h2 className="text-lg font-bold tracking-tight text-zds-neutral-200">Ingestão de dados</h2>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-8">
        <label
          htmlFor={FILE_INPUT_ID}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed p-10 transition-all",
            isDragging
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-zds-neutral-800 bg-zds-neutral-900/50 hover:border-primary/50 hover:bg-white"
          )}
        >
          <div className="flex size-16 items-center justify-center rounded-3xl border border-zds-neutral-800 bg-white shadow-inner">
            <Upload
              size={28}
              className={cn(
                "text-primary transition-transform duration-300",
                isDragging ? "scale-110" : "scale-100"
              )}
              aria-hidden
            />
          </div>
          <div className="space-y-1 text-center">
            <p className="text-base font-bold text-zds-neutral-200">
              {fileName ? fileName : "Solte o briefing aqui"}
            </p>
            <p className="text-sm font-medium text-zds-neutral-500">
              Arraste arquivos ou clique para navegar (.txt, .md)
            </p>
          </div>
          {fileName && (
            <button
              type="button"
              aria-label="Remover arquivo selecionado"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFileName(null);
                setText("");
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-zds-red-400/10 text-zds-red-400 transition-colors hover:bg-zds-red-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zds-red-400/40"
            >
              <X size={14} aria-hidden />
            </button>
          )}
        </label>

        <input
          ref={fileRef}
          id={FILE_INPUT_ID}
          type="file"
          accept=".txt,.md,.pdf"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-zds-neutral-800" />
          <span className="text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-zds-neutral-400">
            ou entrada manual
          </span>
          <div className="h-px flex-1 bg-zds-neutral-800" />
        </div>

        <div className="group relative">
          <label htmlFor="upload-manual-text" className="mb-2 block text-base font-bold text-zds-neutral-200">
            Texto ou notas
          </label>
          <textarea
            id="upload-manual-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole aqui briefing, notas de discovery ou transcrições..."
            rows={10}
            className="w-full resize-none rounded-2xl border border-zds-neutral-800 bg-white p-5 text-base leading-relaxed text-zds-neutral-200 shadow-inner transition-all placeholder:text-zds-neutral-500 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
          />
          <div className="pointer-events-none absolute right-4 top-12 opacity-0 transition-opacity group-focus-within:opacity-100">
            <FileSearch size={16} className="text-primary/40" aria-hidden />
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-zds-neutral-800 bg-zds-neutral-900/50 px-6 py-6">
        <Button
          type="button"
          onClick={() => submitUpload(text)}
          disabled={!text.trim() || isAiTyping}
          className="h-12 min-h-11 w-full gap-2 rounded-xl font-bold disabled:opacity-40"
        >
          {isAiTyping ? "Sincronizando..." : "Analisar briefing"}
          <ArrowRight size={18} aria-hidden />
        </Button>
      </div>
    </div>
  );
}
