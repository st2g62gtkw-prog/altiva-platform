import type { Metadata } from "next";

import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { documents, internalProjects } from "@/data/mock";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = createPageMetadata({
  title: "Documentos tecnicos",
  description: "Control documental tecnico por proyecto, tipo, estado y origen.",
  path: "/app/technical/documentos",
  noIndex: true
});

const documentTypeLabels = {
  contract: "Contrato",
  plan: "Plano",
  permit: "Permiso",
  report: "Reporte",
  technical: "Tecnico"
};

export default function TechnicalDocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Technical Workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Control documental</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Registros documentales clasificados por proyecto, tipo, estado y origen operativo.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>
      <DataTable
        headers={["Documento", "Proyecto", "Tipo", "Estado", "Origen", "Actualizado"]}
        rows={documents.map((document) => {
          const project = internalProjects.find((item) => item.id === document.projectId);
          return [
            <span key="name" className="font-semibold text-zinc-950">
              {document.name}
            </span>,
            project?.name || "Sin proyecto",
            documentTypeLabels[document.type],
            <StatusBadge key="status" status={document.status} />,
            document.source === "drive" ? "Archivo externo futuro" : "Repositorio demo",
            formatDate(document.updatedAt)
          ];
        })}
      />
    </div>
  );
}
