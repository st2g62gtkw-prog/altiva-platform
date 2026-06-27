import Link from "next/link";

import { siteConfig } from "@/config/site";

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
            <span className="block text-xs text-zinc-500">Proyecto de Titulo</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
