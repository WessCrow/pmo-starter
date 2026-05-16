"use client";

import { useRef, useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Send, Pencil, Check, X, Sparkles, Wand2 } from "lucide-react";
import { useNewProject, type UserRole } from "../context/new-project-context";
import { ChatFormattedContent } from "@/lib/inline-format";
import { cn } from "@/lib/utils";

const ROLES: { id: UserRole; label: string }[] = [
  { id: "PM", label: "Product Manager" },
  { id: "PO", label: "Product Owner" },
  { id: "GP", label: "Gerente de Projeto" },
];

function UserMessage({ id, content }: { id: string; content: string }) {
  const { editMessage, isAiTyping } = useNewProject();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(content);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  const save = () => {
    if (!draft.trim() || draft === content) {
      setEditing(false);
      return;
    }
    editMessage(id, draft.trim());
    setEditing(false);
  };

  const cancel = () => {
    setDraft(content);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[88%] space-y-2 w-full">
          <label htmlFor={`edit-msg-${id}`} className="sr-only">
            Editar sua mensagem
          </label>
          <textarea
            id={`edit-msg-${id}`}
            ref={ref}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                save();
              }
              if (e.key === "Escape") cancel();
            }}
            rows={3}
            className="w-full resize-none rounded-3xl rounded-tr-none border-2 border-primary/80 bg-primary px-5 py-4 text-base leading-relaxed text-white shadow-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={cancel}
              className="min-h-11 min-w-11 flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-[0.625rem] font-bold uppercase tracking-widest text-zds-neutral-500 transition-colors hover:bg-zds-neutral-900/40 hover:text-zds-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <X size={12} /> Cancelar
            </button>
            <button
              type="button"
              onClick={save}
              className="min-h-11 flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-[0.625rem] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <Check size={12} /> Salvar alteração
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group flex justify-end" aria-label="Sua mensagem">
      <div className="relative max-w-[88%]">
        <div className="rounded-3xl rounded-tr-none bg-primary px-5 py-3.5 text-base leading-relaxed text-white shadow-premium">
          {content}
        </div>
        {!isAiTyping && (
          <button
            type="button"
            aria-label="Editar esta mensagem"
            onClick={() => {
              setDraft(content);
              setEditing(true);
            }}
            className="absolute -left-11 top-1/2 flex size-11 min-h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full border border-zds-neutral-800 bg-white text-zds-neutral-500 opacity-0 shadow-sm transition-all hover:border-primary hover:text-primary group-hover:opacity-100 focus-visible:z-20 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
          >
            <Pencil size={12} aria-hidden />
          </button>
        )}
      </div>
    </article>
  );
}

export function ChatPanel() {
  const {
    messages,
    isAiTyping,
    sendMessage,
    chatComplete,
    selectedRoles,
    toggleRole,
    generateArtifacts,
    currentMockAnswer,
  } = useNewProject();

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  const handleSend = () => {
    if (!input.trim() || isAiTyping || chatComplete) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <ScrollArea className="flex-1 px-6 py-8">
        <div
          className="space-y-6 pr-2"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Histórico do chat com a IA"
        >
          {messages.map((msg) =>
            msg.role === "user" ? (
              <UserMessage key={msg.id} id={msg.id} content={msg.content} />
            ) : (
              <article
                key={msg.id}
                className="flex justify-start"
                aria-label="Resposta da IA"
              >
                <div className="max-w-[88%] rounded-3xl rounded-tl-none border border-zds-neutral-800 bg-zds-neutral-900 px-5 py-4 text-base leading-relaxed text-zds-neutral-300 shadow-sm">
                  <ChatFormattedContent text={msg.content} />
                </div>
              </article>
            )
          )}

          {isAiTyping && (
            <div className="flex justify-start" aria-busy="true" aria-label="IA está respondendo">
              <div className="flex items-center gap-2 rounded-3xl rounded-tl-none border border-zds-neutral-800 bg-zds-neutral-900 px-6 py-4 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-2 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="shrink-0 space-y-4 border-t border-zds-neutral-800 bg-zds-neutral-900/50 px-6 py-6">
        {chatComplete && (
          <fieldset className="min-w-0 border-0 p-0">
            <legend className="sr-only">Papéis para os artefatos gerados</legend>
            <div
              className={cn(
                "flex flex-wrap items-center gap-3 transition-opacity",
                selectedRoles.length === 0 && "gap-2"
              )}
            >
              {selectedRoles.length > 0 && (
                <span className="shrink-0 text-[0.625rem] font-bold uppercase tracking-widest text-zds-neutral-500">
                  Personas dos artefatos:
                </span>
              )}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Selecione um ou mais papéis">
              {ROLES.map(({ id, label }) => {
                const active = selectedRoles.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleRole(id)}
                    className={cn(
                      "min-h-11 rounded-lg border px-3 py-2 text-left text-[0.625rem] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35",
                      active
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-zds-neutral-800 bg-white text-zds-neutral-500 hover:border-zds-neutral-700"
                    )}
                  >
                    <span className="sr-only">{active ? "Desmarcar " : "Selecionar "}</span>
                    {id} · {label}
                  </button>
                );
              })}
              </div>
            </div>
          </fieldset>
        )}

        {!chatComplete && currentMockAnswer && (
          <button
            type="button"
            onClick={() => setInput(currentMockAnswer)}
            aria-label={`Usar sugestão da IA: ${currentMockAnswer}`}
            className="flex min-h-11 max-w-full items-center gap-2 self-start rounded-full border border-zds-neutral-800 bg-white px-4 py-2 text-left text-sm font-bold text-zds-neutral-500 transition-colors hover:text-zds-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <Wand2 size={12} className="shrink-0" aria-hidden />
            <span className="min-w-0 truncate">
              Sugestão:{" "}
              {currentMockAnswer.length > 40
                ? currentMockAnswer.substring(0, 40) + "..."
                : currentMockAnswer}
            </span>
          </button>
        )}

        <div className="relative">
          <label htmlFor="chat-input-message" className="sr-only">
            Mensagem para a IA
          </label>
          <textarea
            id="chat-input-message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isAiTyping || chatComplete}
            placeholder={
              chatComplete
                ? "Contexto coletado. Revise as personas e gere o projeto."
                : isAiTyping
                  ? "IA está analisando..."
                  : "Descreva seu produto ou responda às perguntas..."
            }
            rows={3}
            className={cn(
              "w-full resize-none rounded-2xl border border-zds-neutral-800 bg-white p-4 pr-20 text-base text-zds-neutral-200 placeholder:text-zds-neutral-500 transition-all focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
              chatComplete && "cursor-not-allowed bg-zds-neutral-900 opacity-50"
            )}
          />

          {chatComplete ? (
            <Button
              onClick={generateArtifacts}
              disabled={selectedRoles.length === 0}
              size="sm"
              className="absolute bottom-3 right-3 h-11 min-h-11 gap-2 rounded-xl px-4 text-xs font-bold"
            >
              <Sparkles size={14} aria-hidden />
              Gerar projeto
            </Button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || isAiTyping}
              aria-label="Enviar mensagem"
              className="absolute bottom-3 right-3 flex size-11 min-h-12 min-w-12 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Send size={18} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
