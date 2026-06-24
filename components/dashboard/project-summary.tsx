import Link from "next/link";

import { internalProjects } from "@/data/mock";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";

export function ProjectSummary() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-950">Proyectos activos</h2>
        <Link href="/app/proyectos" className="text-sm font-semibold text-teal-800 hover:text-teal-900">
          Ver todos
        </Link>
      </div>
      <div className="mt-5 space-y-5">
        {internalProjects.map((project) => (
          <div key={project.id} className="rounded-md border border-zinc-200 p-4">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-zinc-950">{project.name}</p>
                <p className="mt-1 text-sm text-zinc-500">{project.location}</p>
              </div>
              <StatusBadge status={project.status} />
            </div>
            <ProgressBar value={project.progress} />
          </div>
        ))}
      </div>
    </div>
  );
}
