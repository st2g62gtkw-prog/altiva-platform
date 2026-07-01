"use client";

import { Bot } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";

import { ModuleGrid } from "@/components/modules/module-grid";
import { ThesisFilesPanel } from "@/components/thesis/thesis-files-panel";
import { ThesisReadinessPanel } from "@/components/thesis/thesis-readiness-panel";
import { projectModules } from "@/data/project-modules";
import { thesisProjectSummary } from "@/data/thesis-project-mock";
import type { ThesisFileMetadata } from "@/types/thesis";

const nextSteps = [
  "Subir instrucciones oficiales del proyecto.",
  "Subir rubrica y formato base.",
  "Identificar entregables obligatorios.",
  "Ordenar fuentes tecnicas iniciales."
];

function SmallCard({
  title,
  eyebrow,
  children
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="altiva-surface-soft rounded-xl p-5">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-base font-semibold text-zinc-950">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-zinc-600">{children}</div>
    </section>
  );
}

export function ThesisProjectWorkspace() {
  const [files, setFiles] = useState<ThesisFileMetadata[]>([]);
  const handleFilesChange = useCallback((nextFiles: ThesisFileMetadata[]) => {
    setFiles(nextFiles);
  }, []);

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
      <section className="min-w-0">
        <section className="altiva-surface mb-5 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
                Suite tecnica
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
                Entregables y herramientas
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                APUs ya esta disponible como generador base. Los demas modulos quedan preparados
                como arquitectura para IA futura.
              </p>
            </div>
            <span className="w-fit rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
              Arquitectura modular
            </span>
          </div>
          <div className="mt-5">
            <ModuleGrid modules={projectModules} />
          </div>
        </section>
        <ThesisFilesPanel onFilesChange={handleFilesChange} />
      </section>

      <aside className="space-y-5">
        <SmallCard title="Proximo paso" eyebrow="Control">
          <ol className="space-y-3">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white shadow-sm">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </SmallCard>

        <ThesisReadinessPanel files={files} />

        <SmallCard title="Estado del proyecto" eyebrow="Resumen">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                Etapa actual
              </p>
              <p className="mt-1 font-medium text-zinc-900">
                {thesisProjectSummary.currentStage}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                Proximo hito
              </p>
              <p className="mt-1 font-medium text-zinc-900">
                {thesisProjectSummary.nextMilestone}
              </p>
            </div>
          </div>
        </SmallCard>

        <SmallCard title="Asistente IA" eyebrow="Apoyo">
          <div className="flex gap-3">
            <Bot className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden />
            <p>
              El chat flotante no lee archivos todavia. Puede ayudarte a decidir que falta segun
              metadata y categorias.
            </p>
          </div>
        </SmallCard>
      </aside>
    </div>
  );
}
