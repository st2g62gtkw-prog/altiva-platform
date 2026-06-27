import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  FileText,
  FolderOpen,
  Upload
} from "lucide-react";
import type { Metadata } from "next";

import { FloatingAssistant } from "@/components/chat/floating-assistant";
import { createPageMetadata } from "@/config/metadata";
import {
  thesisAlerts,
  thesisDeliverables,
  thesisFileCategories,
  thesisProjectFiles,
  thesisProjectSummary,
  thesisSources
} from "@/data/thesis-project-mock";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = createPageMetadata({
  title: "Proyecto de Título",
  description:
    "Centro de trabajo para organizar archivos, fuentes, entregables y apoyo IA del Proyecto de Título.",
  path: "/"
});

function StatusPill({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-zinc-950">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-100 pb-28">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <StatusPill>Base inicial / modo demo</StatusPill>
                <span className="inline-flex w-fit rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600">
                  Sin almacenamiento real todavia
                </span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                Proyecto de Título
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 md:text-lg">
                Centro de trabajo para organizar archivos, fuentes, entregables y apoyo IA.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-900 lg:max-w-md">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                <p>
                  No subir informacion sensible hasta implementar login y almacenamiento real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <SectionTitle
            eyebrow="Resumen"
            title="Resumen del proyecto"
            description="Datos iniciales de referencia para mantener una vision clara del estado del Proyecto de Título."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["Nombre provisional", thesisProjectSummary.provisionalName],
              ["Estado", thesisProjectSummary.status],
              ["Fecha de inicio estimada", formatDate(thesisProjectSummary.estimatedStartDate)],
              ["Etapa actual", thesisProjectSummary.currentStage],
              ["Proximo hito", thesisProjectSummary.nextMilestone],
              ["Observaciones", thesisProjectSummary.observations]
            ].map(([label, value]) => (
              <article key={label} className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  {label}
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-zinc-900">{value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {thesisAlerts.map((alert) => (
            <article
              key={alert.id}
              className="rounded-lg border border-zinc-200 bg-white p-5"
            >
              <div className="flex gap-3">
                {alert.tone === "warning" ? (
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-700" aria-hidden />
                ) : (
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden />
                )}
                <div>
                  <h2 className="font-semibold text-zinc-950">{alert.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{alert.description}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <SectionTitle
              eyebrow="Archivos"
              title="Archivos del proyecto"
              description="Espacio visual para ordenar archivos por categoria. En esta version no se guardan archivos reales."
            />
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                disabled
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white opacity-70"
              >
                <Upload className="h-4 w-4" aria-hidden />
                Subir archivo
              </button>
              <span className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold leading-5 text-amber-900">
                Demo: no persistente
              </span>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {thesisFileCategories.map((category) => (
              <span
                key={category}
                className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase tracking-[0.08em] text-zinc-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Nombre del archivo</th>
                    <th className="px-4 py-3 font-semibold">Tipo</th>
                    <th className="px-4 py-3 font-semibold">Categoria</th>
                    <th className="px-4 py-3 font-semibold">Estado</th>
                    <th className="px-4 py-3 font-semibold">Fecha</th>
                    <th className="px-4 py-3 font-semibold">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white">
                  {thesisProjectFiles.map((file) => (
                    <tr key={file.id}>
                      <td className="px-4 py-4 font-semibold text-zinc-950">{file.name}</td>
                      <td className="px-4 py-4 text-zinc-700">{file.type}</td>
                      <td className="px-4 py-4 text-zinc-700">{file.category}</td>
                      <td className="px-4 py-4 text-zinc-700">{file.status}</td>
                      <td className="px-4 py-4 text-zinc-700">{formatDate(file.date)}</td>
                      <td className="px-4 py-4 text-zinc-700">{file.observations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <SectionTitle
            eyebrow="Fuentes"
            title="Fuentes del proyecto"
            description="Registro mock de fuentes que despues podran vincularse a documentos autorizados y entregables."
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {thesisSources.map((source) => (
              <article key={source.id} className="rounded-lg border border-zinc-200 p-4">
                <div className="flex gap-3">
                  <FileText className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-zinc-950">{source.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {source.sourceType} - {source.status}
                    </p>
                    <dl className="mt-4 space-y-3 text-sm leading-6">
                      <div>
                        <dt className="font-semibold text-zinc-950">Uso esperado</dt>
                        <dd className="text-zinc-600">{source.expectedUse}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-zinc-950">Relacion con entregables</dt>
                        <dd className="text-zinc-600">{source.relatedDeliverables}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-zinc-950">Observaciones</dt>
                        <dd className="text-zinc-600">{source.observations}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <SectionTitle
            eyebrow="Entregables"
            title="Entregables proximos"
            description="Vista simple para identificar prioridad, informacion faltante y observaciones antes de trabajar con archivos reales."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {thesisDeliverables.map((deliverable) => (
              <article key={deliverable.id} className="rounded-lg border border-zinc-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-zinc-950">{deliverable.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{deliverable.status}</p>
                  </div>
                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-700">
                    {deliverable.priority}
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-sm leading-6">
                  <div>
                    <p className="font-semibold text-zinc-950">Informacion faltante</p>
                    <p className="text-zinc-600">{deliverable.missingInformation}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-950">Observacion</p>
                    <p className="text-zinc-600">{deliverable.observation}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-zinc-950 p-5 text-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <FolderOpen className="mt-1 h-5 w-5 shrink-0 text-teal-300" aria-hidden />
              <div>
                <h2 className="text-lg font-semibold">Base preparada para crecer</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
                  La arquitectura mantiene IA, base de datos, Drive y Notion como capas futuras,
                  pero la experiencia visible queda concentrada solo en Proyecto de Título.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
              <CalendarDays className="h-4 w-4" aria-hidden />
              Proximo paso: login y almacenamiento real
            </div>
          </div>
        </section>
      </div>

      <FloatingAssistant />
    </main>
  );
}
