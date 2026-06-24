import type { Metadata } from "next";

import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { createPageMetadata } from "@/config/metadata";
import { documents, internalProjects } from "@/data/mock";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = createPageMetadata({
  title: "Documentos",
  description: "Control documental interno por proyecto, tipo, estado y origen.",
  path: "/app/documentos",
  noIndex: true
});

const documentTypeLabels = {
  contract: "Contrato",
  plan: "Plano",
  permit: "Permiso",
  report: "Reporte",
  technical: "Tecnico"
};

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
          Documentos
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Control documental</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          Registros documentales clasificados por proyecto, tipo, estado y origen operativo.
        </p>
      </div>
      <DataTable
        headers={["Documento", "Proyecto", "Tipo", "Estado", "Origen", "Actualizado"]}
        rows={documents.map((document) => {
          const project = internalProjects.find((item) => item.id === document.projectId);
          return [
            <span key="name" className="font-semibold text-zinc-950">{document.name}</span>,
            project?.name || "Sin proyecto",
            documentTypeLabels[document.type],
            <StatusBadge key="status" status={document.status} />,
            document.source === "drive" ? "Archivo externo" : "Repositorio interno",
            formatDate(document.updatedAt)
          ];
        })}
      />
    </div>
  );
}
