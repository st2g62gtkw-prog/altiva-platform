"use client";

import { Upload } from "lucide-react";
import { FormEvent, useState } from "react";

import { thesisFileCategories } from "@/data/thesis-project-mock";
import { createSupabaseBrowserClient } from "@/lib/db/supabase-browser";
import { insertThesisFileMetadata } from "@/lib/db/thesis-files";
import { getThesisStorageBucket, prepareThesisFileMetadata } from "@/lib/db/thesis-storage";
import type { ThesisFileMetadata } from "@/types/thesis";

type ThesisFileUploadProps = {
  enabled: boolean;
  onUploaded: (file: ThesisFileMetadata) => void;
};

function getFileType(file: File) {
  if (file.type) {
    return file.type;
  }

  const extension = file.name.split(".").pop();
  return extension ? extension.toLowerCase() : "unknown";
}

export function ThesisFileUpload({ enabled, onUploaded }: ThesisFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState(thesisFileCategories[0]);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!enabled) {
      setMessage("Subida real pendiente: configura Supabase para activar almacenamiento.");
      return;
    }

    if (!file) {
      setMessage("Selecciona un archivo antes de subir.");
      return;
    }

    setMessage("");
    setIsUploading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const userId = session?.user.id;

      if (!userId) {
        setMessage("Debes iniciar sesion para subir archivos.");
        return;
      }

      const metadata = prepareThesisFileMetadata({
        userId,
        fileName: file.name,
        category,
        fileType: getFileType(file),
        status: "uploaded",
        notes: notes.trim() || undefined,
        sizeBytes: file.size
      });

      const { error: uploadError } = await supabase.storage
        .from(getThesisStorageBucket())
        .upload(metadata.storagePath, file, {
          upsert: false,
          contentType: file.type || undefined
        });

      if (uploadError) {
        throw uploadError;
      }

      try {
        const savedFile = await insertThesisFileMetadata(supabase, metadata);
        onUploaded(savedFile);
        setFile(null);
        setNotes("");
        setMessage("Archivo subido y metadata guardada.");
      } catch (metadataError) {
        await supabase.storage.from(getThesisStorageBucket()).remove([metadata.storagePath]);
        throw metadataError;
      }
    } catch {
      setMessage("No fue posible subir el archivo. Revisa bucket, tabla thesis_files y politicas RLS.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-zinc-950">Subir archivo</h2>
        <p className="text-sm leading-6 text-zinc-600">
          Guarda archivos del Proyecto de Titulo en Supabase Storage cuando el login esta activo.
        </p>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="block">
          <span className="text-sm font-semibold text-zinc-700">Archivo</span>
          <input
            type="file"
            disabled={!enabled || isUploading}
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            className="mt-2 block w-full rounded-md border border-zinc-300 bg-white text-sm text-zinc-700 file:mr-4 file:min-h-10 file:border-0 file:bg-zinc-100 file:px-4 file:text-sm file:font-semibold file:text-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-zinc-700">Categoria</span>
          <select
            value={category}
            disabled={!enabled || isUploading}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-700 outline-none focus:border-teal-700 disabled:cursor-not-allowed disabled:bg-zinc-100"
          >
            {thesisFileCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-zinc-700">Observacion opcional</span>
          <textarea
            value={notes}
            disabled={!enabled || isUploading}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 outline-none focus:border-teal-700 disabled:cursor-not-allowed disabled:bg-zinc-100"
            placeholder="Ejemplo: pauta oficial, version, uso esperado..."
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!enabled || isUploading}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-600 sm:w-auto"
        >
          <Upload className="h-4 w-4" aria-hidden />
          {isUploading ? "Subiendo..." : "Subir archivo"}
        </button>
        {!enabled ? (
          <p className="text-sm leading-6 text-zinc-600">
            Subida real pendiente: configura Supabase para activar almacenamiento.
          </p>
        ) : null}
      </div>

      {message ? <p className="mt-4 text-sm leading-6 text-zinc-600">{message}</p> : null}
    </form>
  );
}
