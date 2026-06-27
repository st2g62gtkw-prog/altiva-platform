import {
  AlertTriangle,
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  FolderKanban
} from "lucide-react";
import type { Metadata } from "next";

import { AlertList } from "@/components/dashboard/alert-list";
import { ProjectSummary } from "@/components/dashboard/project-summary";
import { WorkspaceCard, WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { alerts, budgets, documents, internalProjects, reports } from "@/data/mock";

export const metadata: Metadata = createPageMetadata({
  title: "Technical Workspace",
  description: "Espacio tecnico de Altiva para proyectos, documentos, presupuestos y reportes.",
  path: "/app/technical",
  noIndex: true
});

export default function TechnicalWorkspacePage() {
  const averageProgress = Math.round(
    internalProjects.reduce((total, project) => total + project.progress, 0) / internalProjects.length
  );
  const activeRisks = alerts.filter((alert) => alert.severity !== "info").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Technical Workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Trabajo tecnico</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Espacio para ordenar proyectos de construccion, documentos, presupuestos, reportes,
            riesgos y estados de avance con datos de referencia.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <WorkspaceCard
          title="Proyectos"
          description="Seguimiento de obras, estado, avance, presupuesto y nivel de riesgo."
          href="/app/technical/proyectos"
          icon={<FolderKanban className="h-5 w-5" aria-hidden />}
          status="Modo demo"
          meta={`${internalProjects.length} proyectos`}
        />
        <WorkspaceCard
          title="Documentos"
          description="Control documental por proyecto, tipo, estado y origen operativo."
          href="/app/technical/documentos"
          icon={<FileText className="h-5 w-5" aria-hidden />}
          status="Preparado para datos reales"
          meta={`${documents.length} documentos`}
        />
        <WorkspaceCard
          title="Presupuestos"
          description="Revision de montos, estados de aprobacion y actualizacion."
          href="/app/technical/presupuestos"
          icon={<BriefcaseBusiness className="h-5 w-5" aria-hidden />}
          status="Modo demo"
          meta={`${budgets.length} presupuestos`}
        />
        <WorkspaceCard
          title="Reportes"
          description="Reportabilidad de avance, riesgos, bloqueos y proximas acciones."
          href="/app/technical/reportes"
          icon={<BarChart3 className="h-5 w-5" aria-hidden />}
          status="Preparado para IA"
          meta={`${reports.length} reportes`}
        />
        <WorkspaceCard
          title="Riesgos"
          description="Alertas operativas y temas que requieren seguimiento tecnico."
          icon={<AlertTriangle className="h-5 w-5" aria-hidden />}
          status="Datos mock"
          meta={`${activeRisks} alertas activas`}
        />
        <WorkspaceCard
          title="Estados de avance"
          description="Resumen de progreso promedio para lectura rapida del portafolio."
          icon={<ClipboardList className="h-5 w-5" aria-hidden />}
          status="Referencia"
          meta={`${averageProgress}% avance promedio`}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <ProjectSummary />
        <AlertList />
      </div>
    </div>
  );
}
