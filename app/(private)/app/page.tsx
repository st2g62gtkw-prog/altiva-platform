import { Bot, Building2, ClipboardList, Lock, Users } from "lucide-react";
import type { Metadata } from "next";

import { WorkspaceCard, WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard interno",
  description: "Inicio interno de Altiva organizado por espacios de trabajo.",
  path: "/app",
  noIndex: true
});

export default function AppDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Workspaces
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Altiva interna</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Panel V1 organizado por espacios: trabajo personal, gestion tecnica y una base
            preparada para colaboracion externa mas adelante.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <WorkspaceCard
          title="Personal Workspace"
          description="Notas, tareas, estudio, tests, habitos e ideas personales con apoyo de IA."
          href="/app/personal"
          icon={<ClipboardList className="h-5 w-5" aria-hidden />}
          status="Modo demo"
          meta="Uso personal"
        />
        <WorkspaceCard
          title="Technical Workspace"
          description="Proyectos de construccion, documentos, presupuestos, reportes, riesgos y avance."
          href="/app/technical"
          icon={<Building2 className="h-5 w-5" aria-hidden />}
          status="Preparado para datos reales"
          meta="Uso tecnico"
        />
        <WorkspaceCard
          title="Altiva Assistant"
          description="Asistente para consultas personales, tecnicas, PMP/ITO, reportes y presupuestos."
          href="/app/asistente"
          icon={<Bot className="h-5 w-5" aria-hidden />}
          status="Mock u OpenAI por entorno"
          meta="IA opcional"
        />
        <WorkspaceCard
          title="Future External Workspace"
          description="Espacio reservado para clientes, empresas, permisos, colaboracion y roles."
          icon={<Users className="h-5 w-5" aria-hidden />}
          status="No implementado"
          meta="Requiere login futuro"
        />
      </div>

      <section className="rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex gap-3">
          <Lock className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden />
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Privacidad y crecimiento</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Esta version usa datos de referencia. Antes de ingresar informacion privada se
              debe activar autenticacion real, permisos, persistencia y politicas de acceso.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
