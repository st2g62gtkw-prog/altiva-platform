import { AlertTriangle, ArrowLeft, ClipboardList, FileText, Ruler } from "lucide-react";
import Link from "next/link";

import { ModuleStepList } from "@/components/modules/module-step-list";
import type { ModuleId, ProjectModule } from "@/types/modules";

const moduleIcons = {
  apus: FileText,
  cubicar: Ruler,
  "documentacion-tecnica": FileText,
  "documentacion-administrativa": ClipboardList
} satisfies Record<ModuleId, typeof FileText>;

type ComingSoonModuleProps = {
  module: ProjectModule;
  intro: string;
  disabledActionLabel?: string;
};

function InfoList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5">
      <h2 className="font-semibold text-zinc-950">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function ComingSoonModule({
  module,
  intro,
  disabledActionLabel = "Continuar"
}: ComingSoonModuleProps) {
  const Icon = moduleIcons[module.id];

  return (
    <main className="min-h-screen bg-zinc-100 pb-16">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-950"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Volver a Proyecto de Titulo
          </Link>

          <div className="mt-5 flex max-w-3xl gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-700">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600">
                {module.status}
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                {module.title}
              </h1>
              <p className="mt-3 text-base leading-7 text-zinc-600">{intro}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <section className="min-w-0 space-y-5">
          <section className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-zinc-950">Arquitectura del flujo</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Esta pantalla deja ordenados los pasos y salidas esperadas para conectar IA y datos
              reales mas adelante.
            </p>
            <div className="mt-5">
              <ModuleStepList steps={module.steps} />
            </div>
          </section>

          {module.warning ? (
            <p className="flex gap-2 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{module.warning}</span>
            </p>
          ) : null}
        </section>

        <aside className="space-y-5">
          <section className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold text-zinc-950">Accion futura</h2>
            <button
              type="button"
              disabled
              className="mt-4 inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-md bg-zinc-300 px-4 text-sm font-semibold text-zinc-600"
            >
              {disabledActionLabel}
            </button>
            <p className="mt-3 text-sm leading-6 text-zinc-600">Disponible en una proxima version.</p>
          </section>

          <InfoList title="Entradas requeridas futuras" items={module.requiredInputs} />
          <InfoList title="Fuentes relacionadas" items={module.relatedSources} />

          <section className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold text-zinc-950">Salidas futuras</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
              {module.futureOutputs.map((output) => (
                <li key={output.title}>{output.title}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
