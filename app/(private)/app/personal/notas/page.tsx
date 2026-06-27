import { FileText } from "lucide-react";
import type { Metadata } from "next";

import { WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { personalNotes } from "@/data/mock";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = createPageMetadata({
  title: "Notas personales",
  description: "Notas rapidas personales dentro de Altiva.",
  path: "/app/personal/notas",
  noIndex: true
});

export default function PersonalNotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Personal
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Notas rapidas</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Registro referencial para ideas, decisiones y apuntes personales.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {personalNotes.map((note) => (
          <article key={note.id} className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="flex gap-3">
              <FileText className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden />
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">{note.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{note.summary}</p>
                <p className="mt-4 text-xs font-semibold text-zinc-500">
                  Actualizada: {formatDate(note.updatedAt)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
