"use client";

import type { ThesisFileMetadata } from "@/types/thesis";

type ThesisFileListProps = {
  files: ThesisFileMetadata[];
  isLoading?: boolean;
  error?: string;
  demoMode?: boolean;
};

function formatDate(value?: string) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function formatSize(value?: number | null) {
  if (!value) {
    return "Sin tamano";
  }

  if (value < 1024 * 1024) {
    return `${Math.round(value / 1024)} KB`;
  }

  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export function ThesisFileList({ files, isLoading, error, demoMode }: ThesisFileListProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-950">Archivos subidos</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {demoMode
              ? "Vista demo con archivos de referencia."
              : "Archivos registrados en thesis_files para el usuario autenticado."}
          </p>
        </div>
        <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-600">
          {files.length} archivos
        </span>
      </div>

      {error ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-800">
          {error}
        </p>
      ) : null}

      {isLoading ? <p className="mt-5 text-sm text-zinc-500">Cargando archivos...</p> : null}

      {!isLoading && files.length === 0 ? (
        <p className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
          Aun no hay archivos registrados.
        </p>
      ) : null}

      <div className="mt-5 space-y-3">
        {files.map((file) => (
          <article key={file.id || file.storagePath} className="rounded-md border border-zinc-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="break-words font-semibold text-zinc-950">{file.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {file.category} - {file.fileType}
                </p>
              </div>
              <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                {file.status}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-zinc-500">
              <span>{formatDate(file.createdAt)}</span>
              <span>{formatSize(file.sizeBytes)}</span>
            </div>
            {file.notes ? <p className="mt-3 text-sm leading-6 text-zinc-600">{file.notes}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
