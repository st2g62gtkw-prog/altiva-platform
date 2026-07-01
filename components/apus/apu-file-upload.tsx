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
    <section className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700">
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
          className="block w-full rounded-md border border-zinc-300 bg-white text-sm text-zinc-700 file:mr-4 file:min-h-10 file:border-0 file:bg-zinc-100 file:px-4 file:text-sm file:font-semibold file:text-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-100"
        />
      </label>

      {file ? (
        <p className="mt-3 break-words text-xs font-medium text-zinc-500">Archivo: {file.name}</p>
      ) : null}
    </section>
  );
}
