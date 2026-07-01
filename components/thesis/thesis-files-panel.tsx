"use client";

import { useEffect, useState } from "react";

import { thesisProjectFiles } from "@/data/thesis-project-mock";
import { isSupabasePublicConfigured } from "@/lib/db/supabase";
import { createSupabaseBrowserClient } from "@/lib/db/supabase-browser";
import { deleteThesisFileMetadata, listThesisFiles } from "@/lib/db/thesis-files";
import { removeThesisStorageFile } from "@/lib/db/thesis-storage";
import type { ThesisFileMetadata } from "@/types/thesis";
import { ThesisFileList } from "@/components/thesis/thesis-file-list";
import { ThesisFileUpload } from "@/components/thesis/thesis-file-upload";

type ThesisFilesPanelProps = {
  onFilesChange?: (files: ThesisFileMetadata[]) => void;
};

function getMockFiles(): ThesisFileMetadata[] {
  return thesisProjectFiles.slice(0, 3).map((file) => ({
    id: file.id,
    userId: "demo",
    name: file.name,
    category: file.category,
    fileType: file.type,
    status: file.status,
    notes: file.observations,
    storagePath: `demo/${file.id}`,
    createdAt: file.date,
    updatedAt: file.date
  }));
}

export function ThesisFilesPanel({ onFilesChange }: ThesisFilesPanelProps) {
  const supabaseEnabled = isSupabasePublicConfigured();
  const [files, setFiles] = useState<ThesisFileMetadata[]>(() =>
    supabaseEnabled ? [] : getMockFiles()
  );
  const [isLoading, setIsLoading] = useState(supabaseEnabled);
  const [deletingFileKey, setDeletingFileKey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    onFilesChange?.(files);
  }, [files, onFilesChange]);

  useEffect(() => {
    if (!supabaseEnabled) {
      return;
    }

    async function loadFiles() {
      setIsLoading(true);
      setError("");

      try {
        const supabase = createSupabaseBrowserClient();
        const {
          data: { session }
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setFiles([]);
          setError("Inicia sesion para ver archivos reales.");
          return;
        }

        const nextFiles = await listThesisFiles(supabase);
        setFiles(nextFiles);
      } catch {
        setError("No fue posible leer thesis_files. Revisa tabla, RLS y variables de Supabase.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadFiles();
  }, [supabaseEnabled]);

  function handleUploaded(file: ThesisFileMetadata) {
    setFiles((current) => [file, ...current]);
  }

  async function handleDelete(file: ThesisFileMetadata) {
    if (!supabaseEnabled) {
      setError("La eliminacion esta disponible solo con almacenamiento real configurado.");
      return;
    }

    if (!file.id) {
      setError("No fue posible eliminar: falta el id del registro en thesis_files.");
      return;
    }

    if (!file.storagePath) {
      setError("No fue posible eliminar: falta storage_path del archivo.");
      return;
    }

    const confirmed = window.confirm(
      "¿Eliminar este archivo? Esta acción quitará el archivo del almacenamiento y de la lista."
    );

    if (!confirmed) {
      return;
    }

    const fileKey = file.id || file.storagePath;
    setDeletingFileKey(fileKey);
    setError("");

    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setError("Debes iniciar sesion para eliminar archivos.");
        return;
      }

      try {
        await removeThesisStorageFile(supabase, file.storagePath);
      } catch {
        setError("No fue posible eliminar el archivo de Storage. No se elimino el registro en thesis_files.");
        return;
      }

      try {
        await deleteThesisFileMetadata(supabase, file.id);
      } catch {
        setError(
          "El archivo se elimino de Storage, pero fallo el borrado en thesis_files. Revisa RLS o la tabla."
        );
        return;
      }

      setFiles((current) => current.filter((item) => (item.id || item.storagePath) !== fileKey));
    } catch {
      setError("No fue posible eliminar el archivo. Revisa la sesion y la configuracion de Supabase.");
    } finally {
      setDeletingFileKey("");
    }
  }

  return (
    <div className="space-y-5">
      <ThesisFileUpload enabled={supabaseEnabled} onUploaded={handleUploaded} />
      <ThesisFileList
        files={files}
        isLoading={isLoading}
        error={error}
        demoMode={!supabaseEnabled}
        deletingFileKey={deletingFileKey}
        onDelete={handleDelete}
      />
    </div>
  );
}
