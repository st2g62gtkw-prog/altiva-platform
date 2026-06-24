import { cn } from "@/lib/utils/cn";
import type { ProjectStatus } from "@/types";

type StatusBadgeProps = {
  status: ProjectStatus | "draft" | "review" | "approved" | "pending" | "reviewed" | "ready" | "sent" | "done" | "in_progress";
};

const labels: Record<string, string> = {
  planning: "Planificacion",
  active: "Activo",
  paused: "Pausado",
  closed: "Cerrado",
  draft: "Borrador",
  review: "En revision",
  approved: "Aprobado",
  pending: "Pendiente",
  reviewed: "Revisado",
  ready: "Listo",
  sent: "Enviado",
  done: "Terminado",
  in_progress: "En curso"
};

const styles: Record<string, string> = {
  planning: "border-sky-200 bg-sky-50 text-sky-800",
  active: "border-teal-200 bg-teal-50 text-teal-800",
  paused: "border-amber-200 bg-amber-50 text-amber-800",
  closed: "border-zinc-200 bg-zinc-100 text-zinc-700",
  draft: "border-zinc-200 bg-zinc-100 text-zinc-700",
  review: "border-amber-200 bg-amber-50 text-amber-800",
  approved: "border-teal-200 bg-teal-50 text-teal-800",
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  reviewed: "border-sky-200 bg-sky-50 text-sky-800",
  ready: "border-teal-200 bg-teal-50 text-teal-800",
  sent: "border-zinc-200 bg-zinc-100 text-zinc-700",
  done: "border-teal-200 bg-teal-50 text-teal-800",
  in_progress: "border-sky-200 bg-sky-50 text-sky-800"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        styles[status] || styles.draft
      )}
    >
      {labels[status] || status}
    </span>
  );
}
