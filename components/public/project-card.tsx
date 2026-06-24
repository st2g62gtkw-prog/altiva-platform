import Link from "next/link";

import type { PublicProject } from "@/types";

type ProjectCardProps = {
  project: PublicProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group overflow-hidden rounded-lg border border-zinc-200 bg-white transition-colors hover:border-teal-700"
    >
      <div className="grid-pattern flex aspect-[16/9] items-end bg-teal-50 p-5">
        <div className="rounded-md bg-white/95 px-3 py-2 text-sm font-semibold text-zinc-950 shadow-sm">
          {project.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-500">
          <span>{project.location}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-zinc-950 group-hover:text-teal-800">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600">{project.summary}</p>
      </div>
    </Link>
  );
}
