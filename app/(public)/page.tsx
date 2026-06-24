import {
  BarChart3,
  Bot,
  Building2,
  ClipboardCheck,
  FileSearch,
  ShieldCheck
} from "lucide-react";
import type { Metadata } from "next";

import { ProjectCard } from "@/components/public/project-card";
import { ServiceCard } from "@/components/public/service-card";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { createPageMetadata } from "@/config/metadata";
import { publicProjects } from "@/data/mock";

export const metadata: Metadata = createPageMetadata({
  title: "Gestion tecnica para proyectos de construccion",
  description:
    "Altiva integra portafolio profesional y base de sistema interno para proyectos, documentos, presupuestos, reportes e IA.",
  path: "/"
});

const services = [
  {
    title: "Gestion de proyectos",
    description:
      "Seguimiento de hitos, riesgos, tareas y documentacion tecnica desde una mirada constructiva.",
    icon: <Building2 className="h-5 w-5" aria-hidden />,
    items: ["Planificacion inicial", "Control de avance", "Matriz de pendientes"]
  },
  {
    title: "Presupuestos y control",
    description:
      "Ordenamiento de partidas, trazabilidad de montos y preparacion para comparativos futuros.",
    icon: <BarChart3 className="h-5 w-5" aria-hidden />,
    items: ["Cubicaciones", "Revision de precios", "Control de desviaciones"]
  },
  {
    title: "Documentos y reportes",
    description:
      "Base preparada para centralizar antecedentes, reportes de avance y respaldos tecnicos.",
    icon: <FileSearch className="h-5 w-5" aria-hidden />,
    items: ["Informes", "Planos", "Permisos y minutas"]
  }
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
              Construccion civil + plataforma digital
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold text-zinc-950 md:text-5xl">
              Gestion tecnica seria para proyectos, documentos, presupuestos y reportes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Altiva nace como una base profesional para mostrar experiencia publica y
              operar una futura plataforma interna conectada a Supabase, Drive, Notion e IA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/proyectos">Ver proyectos</ButtonLink>
              <ButtonLink href="/app" variant="secondary">
                Entrar a demo interna
              </ButtonLink>
            </div>
          </div>

          <div className="grid-pattern rounded-lg border border-zinc-200 bg-teal-50 p-5">
            <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-700 text-white">
                  <ClipboardCheck className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="font-semibold text-zinc-950">Panel tecnico</p>
                  <p className="text-sm text-zinc-500">Vista inicial preparada para produccion</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ["Proyectos", "3 activos"],
                  ["Documentos", "4 registros"],
                  ["Reportes", "2 en preparacion"],
                  ["IA", "Simulada, lista para API real"]
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-md border border-zinc-200 px-4 py-3"
                  >
                    <span className="text-sm text-zinc-600">{label}</span>
                    <span className="text-sm font-semibold text-zinc-950">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Base tecnica"
            value="Next.js"
            description="App Router, TypeScript, Tailwind y estructura lista para Vercel."
            icon={<ShieldCheck className="h-5 w-5" aria-hidden />}
          />
          <StatCard
            label="Integraciones futuras"
            value="4 capas"
            description="Supabase, Google Drive, Notion e IA separadas por carpeta y contrato."
            icon={<Bot className="h-5 w-5" aria-hidden />}
          />
          <StatCard
            label="Operacion inicial"
            value="Mocks"
            description="Datos realistas centralizados para avanzar sin exponer informacion sensible."
            icon={<ClipboardCheck className="h-5 w-5" aria-hidden />}
          />
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Servicios"
            title="Una base para operar con criterio tecnico"
            description="El foco de esta primera version es ordenar la arquitectura y dejar preparada la evolucion hacia datos reales e integraciones."
            actions={<ButtonLink href="/servicios" variant="secondary">Ver servicios</ButtonLink>}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos publicos de ejemplo"
          description="Casos demostrativos sin informacion sensible, pensados para reemplazarse por antecedentes reales cuando corresponda."
          actions={<ButtonLink href="/proyectos" variant="secondary">Ver portafolio</ButtonLink>}
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {publicProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
