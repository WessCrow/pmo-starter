"use client";

import { renderSimpleInlineMarkdownLine } from "@/lib/inline-format";
import { cn } from "@/lib/utils";

/** Markdown mínimo para MVP (títulos, negrito, linhas de tabela, parágrafos). */
export function SimpleMarkdown({ content, className }: { content: string; className?: string }) {
  const lines = content.split("\n");

  return (
    <div className={cn("space-y-1 text-base text-zds-neutral-300 leading-relaxed", className)}>
      {lines.map((line, i) => {
        const trimmed = line.trimEnd();
        const t = trimmed.trim();

        if (t.startsWith("# ")) {
          return (
            <h2 key={i} className="text-xl font-bold text-zds-neutral-200 font-heading pt-4 first:pt-0">
              {t.slice(2)}
            </h2>
          );
        }
        if (t.startsWith("## ")) {
          return (
            <h3 key={i} className="text-lg font-semibold text-zds-neutral-200 pt-3">
              {t.slice(3)}
            </h3>
          );
        }
        if (t.startsWith("### ")) {
          return (
            <h4 key={i} className="text-base font-semibold text-zds-neutral-200 pt-2">
              {t.slice(4)}
            </h4>
          );
        }
        if (t.startsWith("|") && t.includes("|")) {
          return (
            <p
              key={i}
              className="overflow-x-auto py-0.5 font-mono text-[0.6875rem] leading-normal text-zds-neutral-400 whitespace-pre"
            >
              {line}
            </p>
          );
        }
        if (!t) {
          return <div key={i} className="h-2" />;
        }

        return (
          <p key={i} className="py-0.5">
            {renderSimpleInlineMarkdownLine(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
