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
        title="Conversemos sobre el proximo modulo"
        description="Esta version deja la base lista para conectar formularios reales, CRM, automatizaciones o notificaciones cuando se defina el flujo operativo."
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
                <p className="text-sm text-zinc-600">Pendiente de definir</p>
              </div>
            </div>
          </div>
        </div>

        <form className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-zinc-950">Formulario preparado</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Por ahora no envia datos. Esta listo para conectarse despues a una API route,
            Supabase o un servicio externo.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-zinc-700">
              Nombre
              <input className="min-h-11 rounded-md border border-zinc-300 px-3 outline-none focus:border-teal-700" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-zinc-700">
              Correo
              <input className="min-h-11 rounded-md border border-zinc-300 px-3 outline-none focus:border-teal-700" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-zinc-700 sm:col-span-2">
              Mensaje
              <textarea className="min-h-32 rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-teal-700" />
            </label>
          </div>
          <button
            type="button"
            className="mt-5 rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Envio pendiente de conectar
          </button>
        </form>
      </div>
    </section>
  );
}
