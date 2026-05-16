import { AlertCircle, Beaker, FileText } from "lucide-react";

export function SimulationFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background font-sans">
      {/* Simulation Banner */}
      <div className="bg-amber-100 text-amber-900 border-b border-amber-300 px-6 py-3 text-sm flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-8 font-medium">
          <span className="flex items-center gap-2">
            <Beaker className="w-4 h-4 text-amber-700" />
            <span className="font-bold">PROTÓTIPO VISUAL</span>
          </span>
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            Não é um Handoff (Go to Dev)
          </span>
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-700" />
            Para início das discussões estratégicas de negócio
          </span>
        </div>
      </div>
      
      {/* Prototype Content Container */}
      <div className="flex-1 overflow-hidden relative border-[12px] border-amber-50 rounded-b-xl">
        {children}
      </div>
    </div>
  );
}
