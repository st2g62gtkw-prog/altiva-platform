import { BarChart3, FileText, FolderKanban, ListTodo } from "lucide-react";

import { AlertList } from "@/components/dashboard/alert-list";
import { ProjectSummary } from "@/components/dashboard/project-summary";
import { StatCard } from "@/components/ui/stat-card";
import { budgets, documents, internalProjects, tasks } from "@/data/mock";
import { formatCurrency } from "@/lib/utils/format";

export default function AppDashboardPage() {
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const pendingDocs = documents.filter((document) => document.status === "pending").length;
  const pendingTasks = tasks.filter((task) => task.status !== "done").length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Operacion interna</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          Vista inicial con datos simulados. El objetivo es validar estructura, navegacion y
          responsabilidades antes de conectar autenticacion y base de datos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Proyectos"
          value={String(internalProjects.length)}
          description="Proyectos internos de ejemplo."
          icon={<FolderKanban className="h-5 w-5" aria-hidden />}
        />
        <StatCard
          label="Presupuesto controlado"
          value={formatCurrency(totalBudget)}
          description="Monto consolidado mock."
          icon={<BarChart3 className="h-5 w-5" aria-hidden />}
        />
        <StatCard
          label="Documentos pendientes"
          value={String(pendingDocs)}
          description="Preparado para Drive."
          icon={<FileText className="h-5 w-5" aria-hidden />}
        />
        <StatCard
          label="Tareas abiertas"
          value={String(pendingTasks)}
          description="Preparado para Notion."
          icon={<ListTodo className="h-5 w-5" aria-hidden />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ProjectSummary />
        <AlertList />
      </div>
    </div>
  );
}
