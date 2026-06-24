import type { Metadata } from "next";

import { ProjectCard } from "@/components/public/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/config/metadata";
import { publicProjects } from "@/data/mock";

export const metadata: Metadata = createPageMetadata({
  title: "Proyectos",
  description:
    "Portafolio publico de proyectos demostrativos de construccion civil, gestion documental y reportabilidad.",
  path: "/proyectos"
});

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Proyectos"
        title="Portafolio profesional"
        description="Estos casos son ejemplos realistas sin datos sensibles. La estructura permite migrarlos despues a una tabla public_projects en Supabase."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {publicProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
