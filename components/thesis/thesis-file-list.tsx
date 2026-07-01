"use client";

import { Trash2 } from "lucide-react";

import type { ThesisFileMetadata } from "@/types/thesis";

type ThesisFileListProps = {
  files: ThesisFileMetadata[];
  isLoading?: boolean;
  error?: string;
  demoMode?: boolean;
  deletingFileKey?: string;
  onDelete?: (file: ThesisFileMetadata) => Promise<void> | void;
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

export function ThesisFileList({
  files,
  isLoading,
  error,
  demoMode,
  deletingFileKey,
  onDelete
}: ThesisFileListProps) {
  return (
    <section className="altiva-surface rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
            Evidencia cargada
          </p>
          <h2 className="text-xl font-semibold text-zinc-950">Archivos subidos</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {demoMode
              ? "Vista demo con archivos de referencia."
              : "Archivos registrados en thesis_files para el usuario autenticado."}
          </p>
        </div>
        <span className="w-fit rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800">
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
        <p className="mt-5 rounded-xl border border-dashed border-zinc-300 bg-white/70 p-4 text-sm text-zinc-600">
          Aun no hay archivos registrados.
        </p>
      ) : null}

      <div className="mt-5 space-y-3">
        {files.map((file) => {
          const fileKey = file.id || file.storagePath;
          const isDeleting = deletingFileKey === fileKey;

          return (
            <article
              key={fileKey}
              className="rounded-xl border border-zinc-200/80 bg-white/80 p-4 shadow-[0_10px_25px_rgba(15,23,42,0.04)] transition hover:border-teal-200 hover:bg-white"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="break-words font-semibold text-zinc-950">{file.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {file.category} - {file.fileType}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-700">
                    {file.status}
                  </span>
                  {demoMode ? (
                    <button
                      type="button"
                      disabled
                      className="inline-flex min-h-8 items-center rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 text-xs font-semibold text-zinc-500 disabled:cursor-not-allowed"
                    >
                      Disponible con almacenamiento real
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!onDelete || isDeleting}
                      onClick={() => {
                        void onDelete?.(file);
                      }}
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-50 disabled:text-zinc-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      {isDeleting ? "Eliminando..." : "Eliminar"}
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-zinc-500">
                <span>{formatDate(file.createdAt)}</span>
                <span>{formatSize(file.sizeBytes)}</span>
              </div>
              {file.notes ? <p className="mt-3 text-sm leading-6 text-zinc-600">{file.notes}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
