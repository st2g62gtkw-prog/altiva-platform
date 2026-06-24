import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto",
  description:
    "Contacto profesional para conversar sobre proyectos de construccion civil, gestion tecnica y evolucion de Altiva.",
  path: "/contacto"
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contacto"
        title="Conversemos sobre gestion tecnica de proyectos"
        description="Usa este canal para consultas sobre coordinacion tecnica, control documental, presupuestos o reportes de avance."
        as="h1"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-zinc-950">Canales</h2>
          <div className="mt-6 space-y-5">
            <div className="flex gap-3">
              <Mail className="mt-1 h-5 w-5 text-teal-700" aria-hidden />
              <div>
                <p className="font-semibold text-zinc-950">Correo</p>
                <p className="text-sm text-zinc-600">{siteConfig.contactEmail}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 text-teal-700" aria-hidden />
              <div>
                <p className="font-semibold text-zinc-950">Ubicacion</p>
                <p className="text-sm text-zinc-600">{siteConfig.location}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-1 h-5 w-5 text-teal-700" aria-hidden />
              <div>
                <p className="font-semibold text-zinc-950">Telefono</p>
                <p className="text-sm text-zinc-600">Disponible previa coordinacion por correo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-zinc-950">Informacion sugerida</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Para una primera conversacion, conviene incluir ubicacion del proyecto, etapa,
            alcance esperado, documentos disponibles y principales restricciones.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
            {[
              "Tipo de proyecto",
              "Ubicacion y etapa",
              "Documentos disponibles",
              "Presupuesto o rango",
              "Plazos relevantes",
              "Riesgos conocidos"
            ].map((item) => (
              <div key={item} className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2">
                {item}
              </div>
            ))}
          </div>
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=Consulta%20Altiva`}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Enviar correo
          </a>
        </div>
      </div>
    </section>
  );
}
