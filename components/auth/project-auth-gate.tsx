"use client";

import type { Session } from "@supabase/supabase-js";
import { FormEvent, type ReactNode, useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/db/supabase-browser";
import { isSupabasePublicConfigured } from "@/lib/db/supabase";

type ProjectAuthGateProps = {
  children: ReactNode;
};

export function ProjectAuthGate({ children }: ProjectAuthGateProps) {
  const supabaseEnabled = isSupabasePublicConfigured();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(supabaseEnabled);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabaseEnabled) {
      return;
    }

    const supabase = createSupabaseBrowserClient();

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseEnabled]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const supabase = createSupabaseBrowserClient();
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (loginError) {
      setError(
        "No fue posible iniciar sesion. Revisa el correo, la clave o el usuario en Supabase."
      );
    }
  }

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
  }

  if (!supabaseEnabled) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Revisando acceso...
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-10">
        <section className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            Acceso privado
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-zinc-950">Proyecto de Titulo</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Inicia sesion para acceder al area del proyecto cuando Supabase esta configurado.
            No se crean roles ni clientes en esta etapa.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-zinc-700">Correo</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                className="mt-2 min-h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none focus:border-teal-700"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-zinc-700">Clave</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
                className="mt-2 min-h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none focus:border-teal-700"
              />
            </label>
            {error ? <p className="text-sm leading-6 text-red-700">{error}</p> : null}
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Entrar
            </button>
          </form>

          <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
            Si Supabase no esta configurado, Altiva funciona en modo demo con datos mock.
          </p>
        </section>
      </main>
    );
  }

  return (
    <>
      <div className="fixed right-4 top-4 z-50">
        <button
          type="button"
          onClick={() => void handleLogout()}
          className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 shadow-sm hover:border-teal-700"
        >
          Salir
        </button>
      </div>
      {children}
    </>
  );
}
