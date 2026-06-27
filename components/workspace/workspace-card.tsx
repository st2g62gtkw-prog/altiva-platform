import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type WorkspaceCardProps = {
  title: string;
  description: string;
  href?: string;
  icon?: ReactNode;
  status?: string;
  meta?: string;
};

export function WorkspaceCard({
  title,
  description,
  href,
  icon,
  status,
  meta
}: WorkspaceCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
        </div>
        {icon ? <div className="rounded-md bg-teal-50 p-2 text-teal-800">{icon}</div> : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {status ? (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
            {status}
          </span>
        ) : null}
        {meta ? (
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-600">
            {meta}
          </span>
        ) : null}
      </div>
    </>
  );

  const className = cn(
    "block rounded-lg border border-zinc-200 bg-white p-5 transition-colors",
    href && "hover:border-teal-700 hover:bg-teal-50/30"
  );

  if (!href) {
    return <article className={className}>{content}</article>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function WorkspaceStatusStrip() {
  const statuses = [
    "Modo demo",
    "Preparado para datos reales",
    "Requiere login futuro para informacion privada"
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <span
          key={status}
          className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600"
        >
          {status}
        </span>
      ))}
    </div>
  );
}
