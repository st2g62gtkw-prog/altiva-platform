import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Acceso",
  description: "Pantalla de acceso reservada para el panel interno de Altiva.",
  path: "/login",
  noIndex: true
});

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-zinc-100 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-700 text-lg font-bold text-white">
            A
          </span>
          <div>
            <h1 className="text-xl font-semibold text-zinc-950">Acceso Altiva</h1>
            <p className="text-sm text-zinc-500">Panel interno V1</p>
          </div>
        </div>
        <div className="space-y-4">
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Correo
            <input
              type="email"
              disabled
              placeholder="usuario@empresa.cl"
              className="min-h-11 rounded-md border border-zinc-300 px-3 disabled:bg-zinc-100"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Contrasena
            <input
              type="password"
              disabled
              placeholder="********"
              className="min-h-11 rounded-md border border-zinc-300 px-3 disabled:bg-zinc-100"
            />
          </label>
        </div>
        <p className="mt-5 rounded-md bg-amber-50 p-3 text-sm leading-6 text-amber-900">
          El panel V1 se puede revisar sin credenciales. La capa de autenticacion quedo
          reservada para una etapa posterior.
        </p>
        <div className="mt-5 flex gap-3">
          <ButtonLink href="/app">Entrar al panel</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Volver
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
