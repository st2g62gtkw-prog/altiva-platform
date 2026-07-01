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
    <main className="min-h-screen bg-zinc-100 pb-32">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600">
              Base inicial
            </span>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                Proyecto de Titulo
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                Sube archivos del proyecto, revisa metadata y usa apoyo IA sin activar modulos
                avanzados todavia.
              </p>
            </div>
            {!supabaseConfigured ? (
              <p className="text-sm text-amber-800">
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
