import type { Metadata } from "next";

import { WorkspaceStatusStrip } from "@/components/workspace/workspace-card";
import { createPageMetadata } from "@/config/metadata";
import { habits } from "@/data/mock";

export const metadata: Metadata = createPageMetadata({
  title: "Habitos personales",
  description: "Habitos personales de estudio, seguimiento y cierre semanal.",
  path: "/app/personal/habitos",
  noIndex: true
});

export default function HabitsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Personal
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Habitos</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Rutinas de referencia para ordenar estudio, foco y seguimiento semanal.
          </p>
        </div>
        <WorkspaceStatusStrip />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {habits.map((habit) => (
          <article key={habit.id} className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-zinc-950">{habit.title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{habit.cadence}</p>
            <p className="mt-4 rounded-md bg-teal-50 p-3 text-sm font-semibold text-teal-900">
              Racha: {habit.streak}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
