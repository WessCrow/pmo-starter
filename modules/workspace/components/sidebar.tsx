"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, FolderKanban, Settings, Plus, Rocket, ChevronRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "../context/workspace-context";
import { cn } from "@/lib/utils";

export function WorkspaceSidebar() {
  const { allTags, selectedTag, setSelectedTag } = useWorkspace();

  return (
    <div className="w-72 border-r border-zds-neutral-700 bg-zds-neutral-1000 flex flex-col h-full shadow-sm">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="size-10 bg-zds-blue-400 rounded-zds-200 flex items-center justify-center text-white shadow-lg shadow-zds-blue-400/20">
            <Rocket size={22} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-zds-neutral-200 tracking-tight text-lg leading-none font-heading">PM.O</span>
            <span className="text-[10px] font-bold text-zds-blue-400 tracking-[0.2em] uppercase mt-1">Starter</span>
          </div>
        </div>

        <nav className="space-y-1.5">
          <p className="text-[10px] font-bold text-zds-neutral-400 uppercase tracking-widest mb-4 px-2">Menu Principal</p>
          <Button 
            variant="ghost" 
            onClick={() => setSelectedTag(null)}
            className={cn(
              "w-full justify-start gap-3 transition-all",
              !selectedTag ? "text-zds-blue-400 bg-zds-blue-700/30 font-semibold" : "text-zds-neutral-400"
            )}
          >
            <LayoutDashboard size={18} />
            <span>Workspace</span>
            {!selectedTag && <ChevronRight size={14} className="ml-auto opacity-40" />}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-zds-neutral-400 hover:text-zds-blue-400 hover:bg-zds-neutral-900">
            <FolderKanban size={18} />
            <span className="font-medium">Meus Projetos</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-zds-neutral-400 hover:text-zds-blue-400 hover:bg-zds-neutral-900">
            <Settings size={18} />
            <span className="font-medium">Configurações</span>
          </Button>
        </nav>
      </div>

      <Separator className="bg-zds-neutral-800" />

      <ScrollArea className="flex-1 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-zds-blue-400" />
            <h4 className="text-[10px] font-bold text-zds-neutral-400 uppercase tracking-widest">Tags Semânticas</h4>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge 
              key={tag} 
              variant={selectedTag === tag ? "default" : "outline"} 
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={cn(
                "cursor-pointer transition-all text-[10px] py-1 font-semibold border-zds-neutral-700",
                selectedTag !== tag && "text-zds-neutral-400 bg-transparent hover:bg-zds-neutral-900"
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </ScrollArea>

      <div className="p-8 mt-auto">
        <div className="bg-zds-neutral-900 border border-zds-neutral-800 rounded-zds-200 p-5 relative overflow-hidden group">
          <p className="text-[10px] font-bold text-zds-neutral-400 uppercase tracking-widest mb-1">Empresa</p>
          <p className="text-sm font-bold text-zds-neutral-200 mb-4 font-heading italic">Albert Einstein</p>
          <Button size="sm" variant="outline" className="w-full text-[10px] h-8 font-bold uppercase tracking-wider border-zds-neutral-700 hover:bg-zds-blue-400 hover:text-white transition-all bg-white">Suporte TI</Button>
        </div>
      </div>
    </div>
  );
}
