import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { documents, internalProjects } from "@/data/mock";
import { formatDate } from "@/lib/utils/format";

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
          La fuente ya distingue datos mock y Drive, para que la futura integracion no cambie
          el flujo de la pantalla.
        </p>
      </div>
      <DataTable
        headers={["Documento", "Proyecto", "Tipo", "Estado", "Fuente", "Actualizado"]}
        rows={documents.map((document) => {
          const project = internalProjects.find((item) => item.id === document.projectId);
          return [
            <span key="name" className="font-semibold text-zinc-950">{document.name}</span>,
            project?.name || "Sin proyecto",
            documentTypeLabels[document.type],
            <StatusBadge key="status" status={document.status} />,
            document.source === "drive" ? "Google Drive futuro" : "Mock",
            formatDate(document.updatedAt)
          ];
        })}
      />
    </div>
  );
}
