import { Bot, Lock } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ProjectAuthGate } from "@/components/auth/project-auth-gate";
import { FloatingAssistant } from "@/components/chat/floating-assistant";
import { ThesisFilesPanel } from "@/components/thesis/thesis-files-panel";
import { createPageMetadata } from "@/config/metadata";
import { thesisProjectSummary } from "@/data/thesis-project-mock";
import { isSupabasePublicConfigured } from "@/lib/db/supabase";

export const metadata: Metadata = createPageMetadata({
  title: "Proyecto de Titulo",
  description:
    "Centro de trabajo para subir archivos, revisar metadata y usar apoyo IA del Proyecto de Titulo.",
  path: "/"
});

const nextSteps = [
  "Subir instrucciones oficiales del proyecto.",
  "Subir rubrica y formato base.",
  "Identificar entregables obligatorios.",
  "Ordenar fuentes tecnicas iniciales."
];

function SmallCard({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5">
      <h2 className="text-base font-semibold text-zinc-950">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-zinc-600">{children}</div>
    </section>
  );
}

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

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <section className="min-w-0">
          <ThesisFilesPanel />
        </section>

        <aside className="space-y-5">
          <SmallCard title="Proximo paso">
            <ol className="space-y-3">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </SmallCard>

          <SmallCard title="Estado del proyecto">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  Etapa actual
                </p>
                <p className="mt-1 font-medium text-zinc-900">
                  {thesisProjectSummary.currentStage}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  Proximo hito
                </p>
                <p className="mt-1 font-medium text-zinc-900">
                  {thesisProjectSummary.nextMilestone}
                </p>
              </div>
            </div>
          </SmallCard>

          <SmallCard title="Seguridad">
            <div className="flex gap-3">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
              <p>
                El bucket debe ser privado y cada usuario debe ver solo sus archivos mediante
                politicas RLS.
              </p>
            </div>
          </SmallCard>

          <SmallCard title="Asistente IA">
            <div className="flex gap-3">
              <Bot className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden />
              <p>
                El chat flotante sigue disponible. Por ahora no lee contenido de archivos, solo
                trabaja con lo que escribas.
              </p>
            </div>
          </SmallCard>
        </aside>
      </div>

      <FloatingAssistant />
    </main>
  );
}
