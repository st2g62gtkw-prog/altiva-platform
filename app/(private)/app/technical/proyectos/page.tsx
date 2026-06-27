import type { Metadata } from "next";

import { DataTable } from "@/components/dashboard/data-table";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { internalProjects } from "@/data/mock";
import { formatCurrency } from "@/lib/utils/format";

export const metadata: Metadata = createPageMetadata({
  title: "Proyectos tecnicos",
  description: "Vista tecnica de proyectos, estados, avance, presupuesto y riesgo.",
  path: "/app/technical/proyectos",
  noIndex: true
});

export default function TechnicalProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Technical Workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Proyectos tecnicos</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Registros de referencia para revisar estado, avance, presupuesto y nivel de riesgo
            por proyecto.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>
      <DataTable
        headers={["Proyecto", "Cliente", "Estado", "Avance", "Presupuesto", "Riesgo"]}
        rows={internalProjects.map((project) => [
          <div key="project">
            <p className="font-semibold text-zinc-950">{project.name}</p>
            <p className="mt-1 text-sm text-zinc-500">{project.location}</p>
          </div>,
          project.client,
          <StatusBadge key="status" status={project.status} />,
          <ProgressBar key="progress" value={project.progress} />,
          formatCurrency(project.budget),
          project.riskLevel === "high" ? "Alto" : project.riskLevel === "medium" ? "Medio" : "Bajo"
        ])}
      />
    </div>
  );
}
