import Link from "next/link";
import { generateMarkdownPRD } from "@/services/markdown-generator";

const SAMPLE = {
  productName: "ConciliaPay",
  mvpDeadlineWeeks: 8,
  audienceSegment:
    "Diretores financeiros de médias empresas (50–500 colaboradores) que operam com 3+ adquirentes simultaneamente. Hoje mitigam a falta de consolidação exportando relatórios fragmentados para planilhas manuais — processo que consome 12h/semana de analistas seniors.",
  costOfInaction:
    "Risco de sanções regulatórias por inconformidade fiscal (multa estimada em R$200k/ano), perda de 8% na margem operacional por retrabalho técnico e exposição reputacional perante auditorias externas (impacto direto em rating de crédito).",
  coreValueProp:
    "Automação e conciliação de recebíveis multi-adquirentes em interface unificada, com acionamento em comando único — elimina o pivoteamento entre planilhas e portais distintos que hoje fragmenta o trabalho do financeiro.",
  northStarMetric:
    "Taxa de conclusão do fluxo principal de conciliação superior a 75% sem necessidade de suporte ou acionamento de help desk no primeiro acesso, medida no D+7 após onboarding.",
  outOfScope:
    "O processamento será simulado em lote (batch) internamente; integrações automatizadas via API com adquirentes, notificações push em tempo real e dashboards customizáveis ficam postergados para a Fase 2. Versão inicial: web desktop, conciliação manual assistida.",
  hardConstraints:
    "Prazo limite para lançamento em conformidade com a janela de auditoria interna (30 de Novembro), teto orçamentário de Capex de R$150k, total aderência às diretrizes da LGPD e exigência de auditoria SOC 2 Type I antes do go-live com clientes corporativos.",
  role: "PM" as const,
  generatedAt: new Date("2026-05-16"),
};

export default function PreviewTermoPage() {
  const output = generateMarkdownPRD(SAMPLE);

  return (
    <div className="min-h-dvh bg-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
            ← Voltar
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Exemplo · ConciliaPay
          </span>
          <Link
            href="/project/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white font-semibold hover:bg-blue-700"
          >
            Criar o meu
          </Link>
        </div>
      </header>

      {/* Documento renderizado */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <article className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
          <Rendered markdown={output.simple} />
        </article>

        {/* Markdown bruto (collapse-style) */}
        <details className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-700">
            Ver markdown bruto
          </summary>
          <pre className="mt-4 max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100 font-mono whitespace-pre-wrap">
            {output.withFrontmatter}
          </pre>
        </details>
      </main>
    </div>
  );
}

// ─── Mini renderer markdown → JSX (sem libs) ────────────────────────────────
// Suporta H1/H2/H3, hr, blockquote, tabelas simples, parágrafos e bold inline.

function Rendered({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={key++} className="text-3xl font-bold text-slate-900 mb-4">
          {inline(line.slice(2))}
        </h1>
      );
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="mt-8 text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">
          {inline(line.slice(3))}
        </h2>
      );
      i++;
    } else if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="mt-6 text-lg font-semibold text-blue-700">
          {inline(line.slice(4))}
        </h3>
      );
      i++;
    } else if (line.startsWith("> ")) {
      blocks.push(
        <blockquote key={key++} className="my-4 border-l-4 border-blue-500 bg-blue-50 px-4 py-2 text-sm text-slate-700">
          {inline(line.slice(2))}
        </blockquote>
      );
      i++;
    } else if (line.startsWith("---")) {
      blocks.push(<hr key={key++} className="my-8 border-slate-200" />);
      i++;
    } else if (line.startsWith("|")) {
      // Tabela: coleta linhas consecutivas com |
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      blocks.push(renderTable(tableLines, key++));
    } else if (line.trim() === "") {
      i++;
    } else {
      blocks.push(
        <p key={key++} className="my-3 text-slate-700 leading-relaxed">
          {inline(line)}
        </p>
      );
      i++;
    }
  }

  return <div className="prose-like">{blocks}</div>;
}

function inline(text: string): React.ReactNode {
  // **bold** e _italic_
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  const boldRegex = /\*\*(.+?)\*\*/;

  while (remaining.length > 0) {
    const m = remaining.match(boldRegex);
    if (!m || m.index === undefined) {
      parts.push(remaining);
      break;
    }
    if (m.index > 0) parts.push(remaining.slice(0, m.index));
    parts.push(
      <strong key={key++} className="font-semibold text-slate-900">
        {m[1]}
      </strong>
    );
    remaining = remaining.slice(m.index + m[0].length);
  }
  return parts;
}

function renderTable(lines: string[], key: number) {
  const rows = lines
    .map((l) => l.split("|").slice(1, -1).map((c) => c.trim()))
    .filter((r) => !r.every((c) => /^-+$/.test(c)));

  if (rows.length === 0) return null;
  const [header, ...body] = rows;

  return (
    <div key={key} className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100">
            {header.map((h, idx) => (
              <th key={idx} className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="border border-slate-200 px-3 py-2 text-slate-600">
                  {inline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
