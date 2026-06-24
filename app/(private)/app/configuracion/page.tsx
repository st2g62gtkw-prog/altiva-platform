import { CheckCircle2, CircleDashed } from "lucide-react";
import type { Metadata } from "next";

import { createPageMetadata } from "@/config/metadata";
import { databaseStatus } from "@/lib/db/schema";
import { getSupabaseEnvironment } from "@/lib/db/supabase";

export const metadata: Metadata = createPageMetadata({
  title: "Configuracion",
  description: "Estado de variables de entorno y modelo tecnico previsto para Altiva.",
  path: "/app/configuracion",
  noIndex: true
});

const integrations = [
  {
    name: "Supabase",
    description: "Base de datos, autenticacion y persistencia de proyectos.",
    configured: Boolean(getSupabaseEnvironment().url && getSupabaseEnvironment().anonKey)
  },
  {
    name: "Google Drive",
    description: "Gestion de documentos, metadata y asociacion a proyectos.",
    configured: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  },
  {
    name: "Notion",
    description: "Tareas, bases de datos y sincronizacion operativa.",
    configured: Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)
  },
  {
    name: "OpenAI",
    description: "Asistencia tecnica, analisis documental y reportes automaticos.",
    configured: Boolean(process.env.OPENAI_API_KEY)
  }
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
          Configuracion
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Configuracion tecnica</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
          Esta pantalla no muestra secretos. Solo indica si existen variables de entorno
          para activar integraciones cuando corresponda.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {integrations.map((integration) => (
          <article key={integration.name} className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-zinc-950">{integration.name}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{integration.description}</p>
              </div>
              {integration.configured ? (
                <CheckCircle2 className="h-5 w-5 text-teal-700" aria-hidden />
              ) : (
                <CircleDashed className="h-5 w-5 text-zinc-400" aria-hidden />
              )}
            </div>
            <p className="mt-4 rounded-md bg-zinc-50 p-3 text-sm font-medium text-zinc-700">
              Estado: {integration.configured ? "Variable detectada" : "No configurado"}
            </p>
          </article>
        ))}
      </div>

      <section className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-zinc-950">Modelo de datos previsto</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {databaseStatus.tables.map((table) => (
            <span key={table} className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700">
              {table}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
