import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { budgets, internalProjects } from "@/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
          Presupuestos
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Control presupuestario</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          Vista preparada para consolidar partidas, aprobaciones y comparativos cuando exista
          base de datos real.
        </p>
      </div>
      <DataTable
        headers={["Presupuesto", "Proyecto", "Monto", "Estado", "Actualizado"]}
        rows={budgets.map((budget) => {
          const project = internalProjects.find((item) => item.id === budget.projectId);
          return [
            <span key="name" className="font-semibold text-zinc-950">{budget.name}</span>,
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
