import type { ReactNode } from "react";

function splitBoldSegments(text: string): ReactNode {
  const chunks = text.split(/(\*\*.+?\*\*)/g);
  return chunks.map((chunk, i) => {
    const m = chunk.match(/^\*\*(.+?)\*\*$/);
    if (m) {
      return (
        <strong key={i} className="font-semibold text-primary">
          {m[1]}
        </strong>
      );
    }
    return <span key={i}>{chunk}</span>;
  });
}

function splitCodeAndText(line: string): ReactNode {
  const segments: { type: "text" | "code"; value: string }[] = [];
  let rest = line;
  while (rest.length > 0) {
    const start = rest.indexOf("`");
    if (start === -1) {
      segments.push({ type: "text", value: rest });
      break;
    }
    if (start > 0) segments.push({ type: "text", value: rest.slice(0, start) });
    const end = rest.indexOf("`", start + 1);
    if (end === -1) {
      segments.push({ type: "text", value: rest.slice(start) });
      break;
    }
    segments.push({ type: "code", value: rest.slice(start + 1, end) });
    rest = rest.slice(end + 1);
  }

  return segments.map((seg, i) => {
    if (seg.type === "code") {
      return (
        <code
          key={i}
          className="rounded bg-zds-neutral-900 px-1 py-0.5 font-mono text-xs text-zds-neutral-200"
        >
          {seg.value}
        </code>
      );
    }
    return <span key={i}>{splitBoldSegments(seg.value)}</span>;
  });
}

/** Linha única com `**negrito**` e `code` — sem HTML bruto (adequado a conteúdo da IA). */
export function renderSimpleInlineMarkdownLine(line: string): ReactNode {
  return splitCodeAndText(line);
}

export function ChatFormattedContent({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <p key={i} className={i === 0 ? undefined : "mt-2"}>
          {line.length > 0 ? renderSimpleInlineMarkdownLine(line) : "\u00a0"}
        </p>
      ))}
    </>
  );
}
