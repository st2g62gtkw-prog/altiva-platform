import type { Metadata } from "next";

import { ProgressBar } from "@/components/ui/progress-bar";
import { WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { studyTopics } from "@/data/mock";

export const metadata: Metadata = createPageMetadata({
  title: "Estudio personal",
  description: "Seguimiento de estudio PMP, ITO y oficina tecnica.",
  path: "/app/personal/estudio",
  noIndex: true
});

export default function StudyPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Personal
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Estudio</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Espacio para preparar rutinas de aprendizaje, preguntas situacionales y repasos.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {studyTopics.map((topic) => (
          <article key={topic.id} className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-zinc-950">{topic.title}</h2>
            <div className="mt-5">
              <ProgressBar value={topic.progress} label="Progreso referencial" />
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">{topic.nextAction}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
