import type { Metadata } from "next";

import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { budgets, internalProjects } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export const metadata: Metadata = createPageMetadata({
  title: "Presupuestos tecnicos",
  description: "Control presupuestario tecnico por proyecto y estado de revision.",
  path: "/app/technical/presupuestos",
  noIndex: true
});

export default function TechnicalBudgetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Technical Workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Control presupuestario</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Consolidado de presupuestos para revisar montos, estados de aprobacion y fecha de
            actualizacion por proyecto.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>
      <DataTable
        headers={["Presupuesto", "Proyecto", "Monto", "Estado", "Actualizado"]}
        rows={budgets.map((budget) => {
          const project = internalProjects.find((item) => item.id === budget.projectId);
          return [
            <span key="name" className="font-semibold text-zinc-950">
              {budget.name}
            </span>,
            project?.name || "Sin proyecto",
            formatCurrency(budget.amount),
            <StatusBadge key="status" status={budget.status} />,
            formatDate(budget.updatedAt)
          ];
        })}
      />
    </div>
  );
}
