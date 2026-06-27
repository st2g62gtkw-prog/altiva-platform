import type { Metadata } from "next";

import { StatusBadge } from "@/components/ui/status-badge";
import { WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { internalProjects, reports } from "@/data/mock";

export const metadata: Metadata = createPageMetadata({
  title: "Reportes tecnicos",
  description: "Reportabilidad tecnica de avance, riesgos y acciones por proyecto.",
  path: "/app/technical/reportes",
  noIndex: true
});

export default function TechnicalReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Technical Workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Reportabilidad</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Reportes de avance y riesgos para comunicar estado, bloqueos y proximas acciones
            por proyecto.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {reports.map((report) => {
          const project = internalProjects.find((item) => item.id === report.projectId);
          return (
            <article key={report.id} className="rounded-lg border border-zinc-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-950">{report.title}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{project?.name || "Sin proyecto"}</p>
                </div>
                <StatusBadge status={report.status} />
              </div>
              <p className="mt-4 text-sm font-medium text-zinc-600">{report.period}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-700">
                {report.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
