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
    "Altiva integra portafolio profesional y gestion interna para proyectos, documentos, presupuestos, reportes y asistencia tecnica.",
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
      "Ordenamiento de partidas, trazabilidad de montos y comparativos para decisiones tecnicas.",
    icon: <BarChart3 className="h-5 w-5" aria-hidden />,
    items: ["Cubicaciones", "Revision de precios", "Control de desviaciones"]
  },
  {
    title: "Documentos y reportes",
    description:
      "Centralizacion de antecedentes, reportes de avance y respaldos tecnicos.",
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
              Altiva organiza experiencia profesional, seguimiento interno y criterios de
              control para proyectos de construccion civil.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/proyectos">Ver proyectos</ButtonLink>
              <ButtonLink href="/app" variant="secondary">
                Entrar al panel interno
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
                  <p className="text-sm text-zinc-500">Vista de control para operacion V1</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ["Proyectos", "3 activos"],
                  ["Documentos", "4 registros"],
                  ["Reportes", "2 en preparacion"],
                  ["Asistente", "Apoyo tecnico guiado"]
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
            label="Stack tecnico"
            value="Next.js"
            description="App Router, TypeScript, Tailwind y estructura lista para Vercel."
            icon={<ShieldCheck className="h-5 w-5" aria-hidden />}
          />
          <StatCard
            label="Capas preparadas"
            value="4 capas"
            description="Datos, documentos, tareas y asistencia tecnica separados por modulo."
            icon={<Bot className="h-5 w-5" aria-hidden />}
          />
          <StatCard
            label="Operacion V1"
            value="Referencial"
            description="Datos de referencia centralizados para revisar flujos sin informacion sensible."
            icon={<ClipboardCheck className="h-5 w-5" aria-hidden />}
          />
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Servicios"
            title="Gestion con criterio tecnico"
            description="Altiva ordena informacion critica para planificar, controlar avances y comunicar decisiones con mayor claridad."
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
          title="Proyectos seleccionados"
          description="Casos referenciales de gestion tecnica, control documental y coordinacion de obra sin informacion sensible."
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
