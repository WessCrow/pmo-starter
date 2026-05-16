"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, FilterX, ArrowRight, Loader2 } from "lucide-react";
import { ArtifactCard } from "./artifact-card";
import { useWorkspace } from "../context/workspace-context";

export function ArtifactGrid() {
  const {
    artifacts,
    filteredArtifacts,
    selectedTag,
    setSelectedTag,
    isLoading,
    projectId,
  } = useWorkspace();

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-zds-neutral-900">
      {/* Search Header */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 max-w-3xl">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zds-neutral-400 group-focus-within:text-zds-blue-400 transition-colors" size={20} />
            <Input 
              placeholder="O que você está procurando hoje?" 
              className="pl-12 bg-white border-zds-neutral-700 shadow-sm focus-visible:ring-zds-blue-400/5 focus-visible:border-zds-blue-400"
            />
          </div>
          <Button variant="outline" className="gap-2 border-zds-neutral-700 text-zds-neutral-400 hover:text-zds-blue-400 hover:bg-white font-bold h-12 px-6 transition-all uppercase text-[10px] tracking-widest">
            Pesquisar
          </Button>
        </div>
        
        {selectedTag && (
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs font-bold text-zds-neutral-400 uppercase tracking-widest">Filtrando por:</span>
            <div className="flex items-center gap-2 bg-zds-blue-700/40 px-3 py-1.5 rounded-zds-100 border border-zds-blue-400/20 animate-in fade-in slide-in-from-left-2">
               <span className="text-xs font-bold text-zds-blue-400">{selectedTag}</span>
               <button onClick={() => setSelectedTag(null)} className="text-zds-blue-400 hover:text-zds-blue-300 ml-1">
                 <FilterX size={14} />
               </button>
            </div>
          </div>
        )}
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-4">
        {isLoading ? (
          <div className="h-[40vh] flex flex-col items-center justify-center gap-3 text-zds-neutral-500">
            <Loader2 className="size-10 animate-spin text-zds-blue-400" aria-hidden />
            <p className="text-sm font-medium">
              {projectId ? "Carregando artefatos do projeto…" : "Carregando workspace…"}
            </p>
          </div>
        ) : filteredArtifacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArtifacts.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="size-16 bg-zds-neutral-800 rounded-full flex items-center justify-center text-zds-neutral-400">
               <FilterX size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zds-neutral-200 font-heading">Nenhum artefato encontrado</h3>
              <p className="text-sm text-zds-neutral-400 max-w-xs mt-1">
                {selectedTag ? (
                  <>
                    Não encontramos nada com a tag{" "}
                    <span className="text-zds-blue-400 font-bold">{selectedTag}</span>.
                  </>
                ) : projectId && artifacts.length === 0 ? (
                  "Este projeto ainda não tem artefatos. Gere documentos em Novo Projeto e abra o workspace pelo botão ao final."
                ) : (
                  "Nenhum artefato para exibir no momento."
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* IA Interaction Bar - CTA DESTAQUE */}
      <div className="p-8 pt-0 mt-auto">
        <div className="relative group max-w-4xl mx-auto">
          <Sparkles className="absolute left-6 top-1/2 -translate-y-1/2 text-zds-blue-400 animate-pulse" size={24} />
          <Input 
            placeholder="Diga à IA o que criar ou ajustar agora..." 
            className="pl-16 pr-32 h-16 bg-white border-zds-blue-400/40 shadow-2xl shadow-zds-blue-400/10 focus-visible:ring-zds-blue-400/20 focus-visible:border-zds-blue-400 font-semibold text-lg text-zds-blue-400 placeholder:text-zds-neutral-400 rounded-zds-200"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button className="bg-zds-blue-400 hover:bg-zds-blue-300 text-white font-bold rounded-zds-100 h-12 px-6 flex items-center gap-2 shadow-lg shadow-zds-blue-400/30 transition-all active:scale-95 group">
               <span>Gerar</span>
               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        <p className="text-center text-[10px] text-zds-neutral-500 mt-4 uppercase tracking-[0.2em] font-bold">
          AI-Powered Workflow • Albert Einstein Design System
        </p>
      </div>
    </div>
  );
}
