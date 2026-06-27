import type { Metadata } from "next";

import { WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { personalTests } from "@/data/mock";

export const metadata: Metadata = createPageMetadata({
  title: "Tests personales",
  description: "Tests de estudio PMP e ITO preparados como datos mock.",
  path: "/app/personal/tests",
  noIndex: true
});

const statusLabels: Record<string, string> = {
  draft: "Borrador",
  ready: "Listo"
};

export default function TestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Personal
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Tests</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Banco inicial de evaluaciones para estudio PMP/ITO y repaso tecnico.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {personalTests.map((test) => (
          <article key={test.id} className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-zinc-950">{test.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{test.questions} preguntas referenciales</p>
            <p className="mt-4 rounded-md bg-zinc-50 p-3 text-sm font-semibold text-zinc-700">
              Estado: {statusLabels[test.status] || test.status}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
