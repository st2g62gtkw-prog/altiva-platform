import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { analyzeThesisReadiness } from "@/lib/thesis/readiness";
import type { ThesisFileMetadata } from "@/types/thesis";

type ThesisReadinessPanelProps = {
  files: ThesisFileMetadata[];
};

function CategoryList({ items, emptyLabel }: { items: string[]; emptyLabel: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-zinc-500">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.slice(0, 8).map((item) => (
        <span
          key={item}
          className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-600"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ThesisReadinessPanel({ files }: ThesisReadinessPanelProps) {
  const readiness = analyzeThesisReadiness(files);

  return (
    <section className="altiva-surface rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
            Revision inteligente
          </p>
          <h2 className="text-base font-semibold text-zinc-950">Diagnostico de archivos</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Revision V1 basada en metadata y categorias.
          </p>
        </div>
        <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
          {readiness.score}%
        </span>
      </div>

      <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-white shadow-[0_14px_35px_rgba(15,23,42,0.16)]">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-300">
          Estado general
        </p>
        <p className="mt-1 text-lg font-semibold text-white">{readiness.status}</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-teal-400"
            style={{ width: `${Math.max(0, Math.min(readiness.score, 100))}%` }}
          />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <p className="mb-2 text-sm font-semibold text-zinc-950">Encontrados</p>
          <CategoryList items={readiness.foundCategories} emptyLabel="Aun no hay categorias detectadas." />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-zinc-950">Faltantes criticos</p>
          <CategoryList
            items={readiness.criticalMissing}
            emptyLabel="No hay faltantes criticos detectados."
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-zinc-950">Faltantes</p>
          <CategoryList items={readiness.missingCategories} emptyLabel="Sin faltantes base." />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-[0_12px_35px_rgba(180,83,9,0.10)]">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-800" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-amber-950">Proximo paso recomendado</p>
            <p className="mt-1 text-sm leading-6 text-amber-900">{readiness.nextStep}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {readiness.warnings.map((warning) => (
          <div key={warning} className="flex gap-2 text-xs leading-5 text-zinc-500">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden />
            <span>{warning}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
