"use client";

import { FileSpreadsheet } from "lucide-react";

type ApuFileUploadProps = {
  title: string;
  description: string;
  accept: string;
  file?: File | null;
  disabled?: boolean;
  onFileSelected: (file: File) => void;
};

export function ApuFileUpload({
  title,
  description,
  accept,
  file,
  disabled,
  onFileSelected
}: ApuFileUploadProps) {
  return (
    <section className="altiva-surface-soft rounded-2xl p-5">
      <div className="flex gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700 ring-1 ring-teal-200">
          <FileSpreadsheet className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="font-semibold text-zinc-950">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-600">{description}</p>
        </div>
      </div>

      <label className="mt-4 block">
        <span className="sr-only">{title}</span>
        <input
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={(event) => {
            const selectedFile = event.target.files?.[0];
            if (selectedFile) {
              onFileSelected(selectedFile);
            }
          }}
          className="block w-full rounded-lg border border-zinc-300 bg-white/90 text-sm text-zinc-700 shadow-sm file:mr-4 file:min-h-10 file:border-0 file:bg-zinc-100 file:px-4 file:text-sm file:font-semibold file:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20 disabled:cursor-not-allowed disabled:bg-zinc-100"
        />
      </label>

      {file ? (
        <p className="mt-3 break-words text-xs font-medium text-zinc-500">Archivo: {file.name}</p>
      ) : null}
    </section>
  );
}
