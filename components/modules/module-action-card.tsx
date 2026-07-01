import { ClipboardList, FileSpreadsheet, FileText, Ruler } from "lucide-react";
import Link from "next/link";

import type { ModuleId, ProjectModule } from "@/types/modules";

const moduleIcons = {
  apus: FileSpreadsheet,
  cubicar: Ruler,
  "documentacion-tecnica": FileText,
  "documentacion-administrativa": ClipboardList
} satisfies Record<ModuleId, typeof FileSpreadsheet>;

type ModuleActionCardProps = {
  module: ProjectModule;
};

export function ModuleActionCard({ module }: ModuleActionCardProps) {
  const Icon = moduleIcons[module.id];

  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <span
          className={
            module.isAvailable
              ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal-700"
              : "flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-600"
          }
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-zinc-950">{module.title}</h3>
            <span
              className={
                module.isAvailable
                  ? "rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800"
                  : "rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-semibold text-zinc-600"
              }
            >
              {module.status}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{module.description}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-1 items-end">
        <Link
          href={module.href}
          className={
            module.isAvailable
              ? "inline-flex min-h-10 w-full items-center justify-center rounded-md bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800"
              : "inline-flex min-h-10 w-full items-center justify-center rounded-md border border-zinc-200 px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          }
        >
          {module.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
