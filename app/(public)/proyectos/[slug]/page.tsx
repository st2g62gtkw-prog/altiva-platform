import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { createPageMetadata } from "@/config/metadata";
import { publicProjects } from "@/data/mock";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publicProjects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = publicProjects.find((item) => item.slug === slug);

  if (!project) {
    return createPageMetadata({
      title: "Proyecto no encontrado",
      description: "El proyecto solicitado no existe en el portafolio publico.",
      path: "/proyectos"
    });
  }

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/proyectos/${project.slug}`
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = publicProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            {project.category}
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-zinc-950 md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">{project.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contacto">Consultar proyecto</ButtonLink>
            <ButtonLink href="/proyectos" variant="secondary">
              Volver al portafolio
            </ButtonLink>
          </div>
        </div>

        <aside className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-zinc-950">Ficha tecnica</h2>
          <dl className="mt-5 grid gap-4">
            <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
              <dt className="text-sm text-zinc-500">Ubicacion</dt>
              <dd className="text-sm font-semibold text-zinc-950">{project.location}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
              <dt className="text-sm text-zinc-500">Ano</dt>
              <dd className="text-sm font-semibold text-zinc-950">{project.year}</dd>
            </div>
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                <dt className="text-sm text-zinc-500">{metric.label}</dt>
                <dd className="text-sm font-semibold text-zinc-950">{metric.value}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500">
            Servicios aplicados
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800"
              >
                {service}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}
