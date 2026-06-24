import Link from "next/link";

import { publicNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button-link";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-700 text-lg font-bold text-white">
            A
          </span>
          <span>
            <span className="block text-base font-semibold text-zinc-950">{siteConfig.name}</span>
            <span className="block text-xs text-zinc-500">Construccion civil</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegacion publica">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/app" variant="secondary" className="hidden sm:inline-flex">
            Acceso interno
          </ButtonLink>
          <ButtonLink href="/contacto">Contactar</ButtonLink>
        </div>
      </div>
    </header>
  );
}
