import { DataTable } from "@/components/dashboard/data-table";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { internalProjects } from "@/data/mock";
import { formatCurrency } from "@/lib/utils/format";

export default function InternalProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
          Proyectos
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Proyectos internos</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          Datos centralizados en mocks. La siguiente fase puede migrar esta vista a Supabase
          manteniendo los mismos tipos.
        </p>
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
