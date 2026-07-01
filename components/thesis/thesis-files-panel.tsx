"use client";

import { useEffect, useState } from "react";

import { thesisProjectFiles } from "@/data/thesis-project-mock";
import { isSupabasePublicConfigured } from "@/lib/db/supabase";
import { createSupabaseBrowserClient } from "@/lib/db/supabase-browser";
import { listThesisFiles } from "@/lib/db/thesis-files";
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

  return (
    <div className="space-y-5">
      <ThesisFileUpload enabled={supabaseEnabled} onUploaded={handleUploaded} />
      <ThesisFileList
        files={files}
        isLoading={isLoading}
        error={error}
        demoMode={!supabaseEnabled}
      />
    </div>
  );
}
