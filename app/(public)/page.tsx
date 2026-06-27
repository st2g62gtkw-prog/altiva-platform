import { Lock, Upload } from "lucide-react";
import type { Metadata } from "next";

import { ProjectAuthGate } from "@/components/auth/project-auth-gate";
import { FloatingAssistant } from "@/components/chat/floating-assistant";
import { createPageMetadata } from "@/config/metadata";
import {
  thesisDeliverables,
  thesisFileCategories,
  thesisProjectFiles,
  thesisProjectSummary,
  thesisSources
} from "@/data/thesis-project-mock";

export const metadata: Metadata = createPageMetadata({
  title: "Proyecto de Titulo",
  description:
    "Centro de trabajo para organizar archivos, fuentes, entregables y apoyo IA del Proyecto de Titulo.",
  path: "/"
});

const nextSteps = [
  "Definir instrucciones oficiales del proyecto.",
  "Cargar rubrica y formato base.",
  "Identificar entregables obligatorios.",
  "Levantar fuentes tecnicas iniciales."
];

const visibleDeliverables = [
  "Informe inicial",
  "APUs",
  "Presupuesto",
  "Cronograma MS Project",
  "Reporte tecnico",
  "Presentacion"
];

function Label({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600">
      {children}
    </span>
  );
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <ProjectAuthGate>
      <ThesisProjectPage />
    </ProjectAuthGate>
  );
}

function ThesisProjectPage() {
  const filePreview = thesisProjectFiles.slice(0, 3);
  const sourcePreview = thesisSources.slice(0, 3);
  const deliverablePreview = thesisDeliverables.filter((deliverable) =>
    visibleDeliverables.includes(deliverable.name)
  );

  return (
    <main className="min-h-screen bg-zinc-100 pb-32">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <Label>Base inicial</Label>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                Proyecto de Titulo
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                Centro de trabajo para ordenar antecedentes, fuentes, entregables y apoyo IA.
              </p>
            </div>
            <p className="text-sm text-zinc-500">
              Funciones avanzadas se implementaran por etapas.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-8">
        <section className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <SectionHeading
              title="Estado del proyecto"
              description="Resumen base para mantener el foco antes de cargar archivos o datos reales."
            />
            <span className="inline-flex w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
              {thesisProjectSummary.status}
            </span>
          </div>

          <div className="mt-7 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                Nombre provisional
              </p>
              <p className="mt-2 text-2xl font-semibold leading-8 text-zinc-950">
                {thesisProjectSummary.provisionalName}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  Etapa actual
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-zinc-900">
                  {thesisProjectSummary.currentStage}
                </p>
              </div>
              <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  Proximo hito
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-zinc-900">
                  {thesisProjectSummary.nextMilestone}
                </p>
              </div>
            </div>

            <p className="rounded-md border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-600">
              {thesisProjectSummary.observations}
            </p>
          </div>
        </section>

        <aside className="rounded-lg border border-zinc-200 bg-white p-6">
          <SectionHeading
            title="Proximo paso"
            description="Secuencia minima para ordenar el trabajo sin abrir modulos nuevos."
          />
          <ol className="mt-5 space-y-3">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <SectionHeading
              title="Archivos y fuentes"
              description="Vista compacta. La carga real queda pendiente hasta implementar almacenamiento."
            />
            <button
              type="button"
              disabled
              className="inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 text-sm font-semibold text-zinc-500"
            >
              <Upload className="h-4 w-4" aria-hidden />
              Proximamente
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-3xl font-semibold text-zinc-950">{thesisProjectFiles.length}</p>
              <p className="mt-1 text-sm text-zinc-600">archivos mock</p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-3xl font-semibold text-zinc-950">{thesisSources.length}</p>
              <p className="mt-1 text-sm text-zinc-600">fuentes mock</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {thesisFileCategories.slice(0, 6).map((category) => (
              <span
                key={category}
                className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold text-zinc-950">Archivos base</p>
              <div className="space-y-2">
                {filePreview.map((file) => (
                  <div key={file.id} className="rounded-md border border-zinc-200 p-3">
                    <p className="text-sm font-medium text-zinc-950">{file.name}</p>
                    <p className="mt-1 text-xs text-zinc-500">{file.category}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-zinc-950">Fuentes base</p>
              <div className="space-y-2">
                {sourcePreview.map((source) => (
                  <div key={source.id} className="rounded-md border border-zinc-200 p-3">
                    <p className="text-sm font-medium text-zinc-950">{source.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{source.sourceType}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600">
            Carga real de archivos pendiente: Supabase Storage o Google Drive.
          </p>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-6">
          <SectionHeading
            title="Entregables"
            description="Resumen de entregables futuros. No son modulos activos todavia."
          />

          <div className="mt-6 space-y-3">
            {deliverablePreview.map((deliverable) => (
              <article
                key={deliverable.id}
                className="flex flex-col gap-2 rounded-md border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-zinc-950">{deliverable.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{deliverable.missingInformation}</p>
                </div>
                <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                  {deliverable.status === "Por preparar"
                    ? "Requiere instrucciones"
                    : deliverable.status}
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="flex gap-3 text-sm leading-6 text-zinc-600">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
            <p>
              Base inicial con datos mock. No subir informacion sensible hasta implementar login,
              permisos y almacenamiento real.
            </p>
          </div>
        </div>
      </section>

      <FloatingAssistant />
    </main>
  );
}
