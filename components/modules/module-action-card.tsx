import { ArrowRight, ClipboardList, FileSpreadsheet, FileText, Ruler } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import type { ModuleId, ProjectModule } from "@/types/modules";

const moduleIcons = {
  apus: FileSpreadsheet,
  cubicar: Ruler,
  "documentacion-tecnica": FileText,
  "documentacion-administrativa": ClipboardList
} satisfies Record<ModuleId, LucideIcon>;

const statusStyles = {
  available: {
    card: "border-teal-200/80 bg-white shadow-[0_18px_50px_rgba(15,118,110,0.12)]",
    icon: "bg-teal-500/10 text-teal-700 ring-1 ring-teal-200",
    badge: "border-teal-200 bg-teal-50 text-teal-800",
    action: "bg-teal-700 text-white shadow-lg shadow-teal-900/10 hover:bg-teal-800"
  },
  "coming-soon": {
    card: "border-zinc-200 bg-white/90 shadow-[0_16px_45px_rgba(24,24,27,0.06)]",
    icon: "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200",
    badge: "border-zinc-200 bg-zinc-50 text-zinc-700",
    action: "border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
  },
  "prepared-for-ai": {
    card: "border-cyan-200/70 bg-white/90 shadow-[0_16px_45px_rgba(8,145,178,0.08)]",
    icon: "bg-cyan-500/10 text-cyan-800 ring-1 ring-cyan-200",
    badge: "border-cyan-200 bg-cyan-50 text-cyan-800",
    action: "border border-cyan-200 bg-white text-cyan-900 hover:bg-cyan-50"
  }
} as const;

type ModuleActionCardProps = {
  module: ProjectModule;
};

export function ModuleActionCard({ module }: ModuleActionCardProps) {
  const Icon = moduleIcons[module.id];
  const styles = statusStyles[module.status];

  return (
    <article
      className={`group flex h-full flex-col rounded-xl border p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.10)] ${styles.card}`}
    >
      <div className="flex items-start gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-zinc-950">{module.title}</h3>
            <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${styles.badge}`}>
              {module.badge}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{module.description}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-1 items-end">
        <Link
          href={module.href}
          className={`inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${styles.action}`}
        >
          {module.primaryActionLabel}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
