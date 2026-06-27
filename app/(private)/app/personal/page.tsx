import { Bot, ClipboardList, FileText, Home, Lightbulb, BarChart3, BriefcaseBusiness } from "lucide-react";
import type { Metadata } from "next";

import { WorkspaceCard, WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { habits, personalIdeas, personalNotes, personalTasks, personalTests, studyTopics } from "@/data/mock";

export const metadata: Metadata = createPageMetadata({
  title: "Personal Workspace",
  description: "Espacio personal de Altiva para notas, tareas, estudio, tests, habitos e IA.",
  path: "/app/personal",
  noIndex: true
});

export default function PersonalWorkspacePage() {
  const pendingTasks = personalTasks.filter((task) => task.status !== "done").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Personal Workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Trabajo personal</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Espacio para ordenar notas, tareas, estudio, tests, habitos e ideas antes de
            conectar datos reales o automatizaciones.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <WorkspaceCard
          title="Notas rapidas"
          description="Captura ideas, decisiones y apuntes personales."
          href="/app/personal/notas"
          icon={<FileText className="h-5 w-5" aria-hidden />}
          status="Modo demo"
          meta={`${personalNotes.length} notas`}
        />
        <WorkspaceCard
          title="Tareas pendientes"
          description="Seguimiento personal de pendientes y compromisos."
          href="/app/personal/tareas"
          icon={<ClipboardList className="h-5 w-5" aria-hidden />}
          status="Datos mock"
          meta={`${pendingTasks} abiertas`}
        />
        <WorkspaceCard
          title="Estudio"
          description="Bloques de aprendizaje PMP, ITO y oficina tecnica."
          href="/app/personal/estudio"
          icon={<BarChart3 className="h-5 w-5" aria-hidden />}
          status="Preparado para IA"
          meta={`${studyTopics.length} temas`}
        />
        <WorkspaceCard
          title="Tests"
          description="Banco de preguntas situacionales y evaluaciones futuras."
          href="/app/personal/tests"
          icon={<BriefcaseBusiness className="h-5 w-5" aria-hidden />}
          status="Modo demo"
          meta={`${personalTests.length} tests`}
        />
        <WorkspaceCard
          title="Habitos"
          description="Rutinas personales para estudio, foco y cierre semanal."
          href="/app/personal/habitos"
          icon={<Home className="h-5 w-5" aria-hidden />}
          status="Datos mock"
          meta={`${habits.length} habitos`}
        />
        <WorkspaceCard
          title="Ideas"
          description="Ideas pendientes para evolucionar Altiva por fases."
          icon={<Lightbulb className="h-5 w-5" aria-hidden />}
          status="Referencia"
          meta={`${personalIdeas.length} ideas`}
        />
        <WorkspaceCard
          title="Asistente personal"
          description="Entrada directa para estudiar, ordenar tareas y crear preguntas."
          href="/app/asistente"
          icon={<Bot className="h-5 w-5" aria-hidden />}
          status="Mock u OpenAI"
          meta="IA opcional"
        />
      </div>
    </div>
  );
}
