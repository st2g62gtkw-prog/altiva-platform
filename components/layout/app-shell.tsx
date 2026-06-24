import Link from "next/link";
import type { ReactNode } from "react";

import { appNavigation, quickActions } from "@/config/navigation";
import { siteConfig } from "@/config/site";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-zinc-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-zinc-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          <Link href="/" className="flex items-center gap-3 border-b border-zinc-200 px-6 py-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-700 text-lg font-bold text-white">
              A
            </span>
            <span>
              <span className="block text-base font-semibold text-zinc-950">{siteConfig.name}</span>
              <span className="block text-xs text-zinc-500">Sistema interno</span>
            </span>
          </Link>

          <nav className="flex-1 space-y-1 px-4 py-5" aria-label="Navegacion privada">
            {appNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-teal-50 hover:text-teal-900"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-zinc-200 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              Acciones rapidas
            </p>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:border-teal-700"
                  >
                    <Icon className="h-4 w-4 text-teal-700" aria-hidden />
                    {action.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-zinc-950">{siteConfig.name}</p>
              <p className="text-xs text-zinc-500">Panel interno V1</p>
            </div>
            <div className="flex gap-2 overflow-x-auto lg:hidden">
              {appNavigation.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/login"
              className="hidden rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 hover:border-teal-700 sm:inline-flex"
            >
              Acceso
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
