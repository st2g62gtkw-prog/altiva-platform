import type { Metadata } from "next";

import { DataTable } from "@/components/dashboard/data-table";
import { WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { personalTasks } from "@/data/mock";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = createPageMetadata({
  title: "Tareas personales",
  description: "Tareas personales y pendientes de seguimiento en Altiva.",
  path: "/app/personal/tareas",
  noIndex: true
});

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  in_progress: "En curso",
  done: "Terminado"
};

export default function PersonalTasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Personal
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Tareas pendientes</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Pendientes personales de referencia para preparar una futura gestion persistente.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>

      <DataTable
        headers={["Tarea", "Area", "Estado", "Fecha objetivo"]}
        rows={personalTasks.map((task) => [
          <span key="title" className="font-semibold text-zinc-950">{task.title}</span>,
          task.area,
          statusLabels[task.status] || task.status,
          formatDate(task.dueDate)
        ])}
      />
    </div>
  );
}
