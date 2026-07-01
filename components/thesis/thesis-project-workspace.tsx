"use client";

import { Bot, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";

import { ThesisFilesPanel } from "@/components/thesis/thesis-files-panel";
import { ThesisReadinessPanel } from "@/components/thesis/thesis-readiness-panel";
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
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5">
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
        <section className="mb-5 rounded-lg border border-zinc-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                <FileSpreadsheet className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">Generar APUs con Itemizado</h2>
                <p className="mt-1 text-sm leading-6 text-zinc-600">
                  Crea APUs base desde un itemizado y un formato Excel.
                </p>
              </div>
            </div>
            <Link
              href="/apus"
              className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800 sm:w-auto"
            >
              Abrir modulo
            </Link>
          </div>
        </section>
        <ThesisFilesPanel onFilesChange={handleFilesChange} />
      </section>

      <aside className="space-y-5">
        <SmallCard title="Proximo paso">
          <ol className="space-y-3">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </SmallCard>

        <ThesisReadinessPanel files={files} />

        <SmallCard title="Estado del proyecto">
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

        <SmallCard title="Asistente IA">
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
