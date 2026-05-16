import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              PM
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight">P.M.O — STARTER</div>
              <div className="text-[11px] text-slate-500 leading-tight">Termo de abertura em minutos</div>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/preview-termo" className="text-slate-600 hover:text-slate-900">
              Ver exemplo
            </Link>
            <Link
              href="/project/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
            >
              Iniciar termo
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Termo de Abertura Estratégico
            </span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Pare de escrever PRDs longos.
              <span className="block text-blue-600">Decida em 1 página.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              6 diretrizes estratégicas guiam você por <strong>diagnóstico</strong>,
              <strong> proposta de valor</strong> e <strong>escopo</strong>. Em ~10
              minutos você tem um termo de abertura pronto para chancela — Engenharia e UX
              co-criam sob restrições claras.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/project/new"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 shadow-sm"
              >
                Iniciar termo agora
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/preview-termo"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ver exemplo de termo
              </Link>
            </div>
          </div>

          {/* Visual right column */}
          <div className="lg:pl-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
                <span className="ml-auto text-xs text-slate-400 font-mono">termo-abertura.md</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <PreviewLine color="text-blue-600">## 🎯 Fase 1 — Diagnóstico</PreviewLine>
                <PreviewLine>Diretores financeiros de médias empresas...</PreviewLine>
                <PreviewLine>Perda de 8% margem operacional por retrabalho</PreviewLine>
                <PreviewLine color="text-purple-600">## 💡 Fase 2 — Proposta de Valor</PreviewLine>
                <PreviewLine>Conciliação multi-adquirentes em 1 clique</PreviewLine>
                <PreviewLine>Taxa de conclusão {">"}75% sem suporte</PreviewLine>
                <PreviewLine color="text-orange-600">## 🔧 Fase 3 — Escopo</PreviewLine>
                <PreviewLine>API automatizada postergada p/ Fase 2</PreviewLine>
                <PreviewLine>LGPD, R$150k Capex, prazo 30/Nov</PreviewLine>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diretrizes grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 text-center">As 6 Diretrizes Estratégicas</h2>
        <p className="text-center text-slate-600 mt-2">Coleta analítica focada em trade-offs de negócio</p>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <DirectiveCard
            phase="1"
            color="red"
            title="Diagnóstico & Impacto"
            items={["Segmentação de alta prioridade", "Custo da Inação"]}
          />
          <DirectiveCard
            phase="2"
            color="blue"
            title="Proposta de Valor"
            items={["Atributo de diferenciação crítica", "North Star Metric do MVP"]}
          />
          <DirectiveCard
            phase="3"
            color="orange"
            title="Escopo & Restrições"
            items={["Descarte estratégico", "Hard Constraints"]}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500 flex flex-wrap items-center justify-between gap-4">
          <span>© 2026 PMO-STARTER · MVP</span>
          <div className="flex gap-6">
            <Link href="/project/new" className="hover:text-slate-900">Iniciar termo</Link>
            <Link href="/preview-termo" className="hover:text-slate-900">Ver exemplo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PreviewLine({ children, color = "text-slate-600" }: { children: React.ReactNode; color?: string }) {
  return <div className={`${color} truncate`}>{children}</div>;
}

function DirectiveCard({
  phase,
  color,
  title,
  items,
}: {
  phase: string;
  color: "red" | "blue" | "orange";
  title: string;
  items: string[];
}) {
  const styles = {
    red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  }[color];

  return (
    <div className={`rounded-xl border-2 ${styles.border} ${styles.bg} p-6`}>
      <div className={`text-xs font-bold uppercase tracking-wider ${styles.text}`}>Fase {phase}</div>
      <h3 className="mt-2 text-xl font-bold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
            <span className={styles.text}>›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
