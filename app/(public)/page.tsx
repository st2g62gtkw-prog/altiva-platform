import type { Metadata } from "next";

import { ProjectAuthGate } from "@/components/auth/project-auth-gate";
import { FloatingAssistant } from "@/components/chat/floating-assistant";
import { ThesisProjectWorkspace } from "@/components/thesis/thesis-project-workspace";
import { createPageMetadata } from "@/config/metadata";
import { isSupabasePublicConfigured } from "@/lib/db/supabase";

export const metadata: Metadata = createPageMetadata({
  title: "Proyecto de Titulo",
  description:
    "Centro de trabajo para subir archivos, revisar metadata y usar apoyo IA del Proyecto de Titulo.",
  path: "/"
});

export default function HomePage() {
  return (
    <ProjectAuthGate>
      <ThesisProjectPage />
    </ProjectAuthGate>
  );
}

function ThesisProjectPage() {
  const supabaseConfigured = isSupabasePublicConfigured();

  return (
    <main className="altiva-page min-h-screen pb-32">
      <header className="altiva-hero border-b border-white/10">
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex max-w-4xl flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              {["Proyecto de Titulo", "Oficina tecnica", "IA futura", "APUs V1 disponible"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-100"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-200">
                Altiva
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white md:text-6xl">
                Sistema tecnico para Proyecto de Titulo
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300 md:text-lg">
                Organiza antecedentes, detecta faltantes y prepara entregables tecnicos con una
                arquitectura lista para IA.
              </p>
            </div>
            {!supabaseConfigured ? (
              <p className="w-fit rounded-lg border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-sm font-medium text-amber-100">
                Modo demo: configura Supabase para activar subida real de archivos.
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <ThesisProjectWorkspace />

      <FloatingAssistant />
    </main>
  );
}
