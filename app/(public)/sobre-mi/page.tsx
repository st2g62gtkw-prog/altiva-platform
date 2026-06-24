import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre mi",
  description:
    "Perfil profesional de Constructor Civil enfocado en gestion tecnica, control documental y plataformas de apoyo a proyectos.",
  path: "/sobre-mi"
});

const strengths = [
  "Mirada tecnica para ordenar alcance, costos, riesgos y antecedentes.",
  "Experiencia en coordinacion de partidas, documentos y reportes.",
  "Uso de herramientas digitales para mejorar trazabilidad y seguimiento.",
  "Criterio practico para avanzar por fases sin comprometer seguridad ni calidad."
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Sobre mi"
        title="Constructor Civil con foco en gestion tecnica y transformacion digital"
        description="Altiva combina experiencia profesional en construccion con herramientas digitales para ordenar proyectos, documentos, presupuestos y decisiones."
        as="h1"
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid-pattern min-h-80 rounded-lg border border-zinc-200 bg-teal-50 p-6">
          <div className="flex h-full flex-col justify-end rounded-lg bg-white/95 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
              Perfil profesional
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-zinc-950">
              Gestion, trazabilidad y criterio constructivo.
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              El enfoque es construir una plataforma sobria, ordenada y util para el trabajo
              tecnico diario.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-zinc-950">Enfoque de trabajo</h2>
          <p className="mt-4 leading-7 text-zinc-600">
            La construccion requiere informacion clara, responsabilidades visibles y control
            sobre cambios. Por eso Altiva separa informacion publica, operacion interna y
            capas tecnicas, permitiendo crecer por etapas sin perder trazabilidad.
          </p>
          <div className="mt-6 space-y-4">
            {strengths.map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden />
                <p className="leading-7 text-zinc-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
