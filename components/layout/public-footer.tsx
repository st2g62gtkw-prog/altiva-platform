import Link from "next/link";

import { publicNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function PublicFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold text-zinc-950">{siteConfig.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600">
            Plataforma base para gestionar portafolio profesional, proyectos internos,
            documentos, presupuestos, reportes e integraciones futuras.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {publicNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-zinc-600 hover:text-teal-800">
              {item.label}
            </Link>
          ))}
          <Link href="/app" className="text-zinc-600 hover:text-teal-800">
            App interna
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-200 px-4 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {siteConfig.name}. Base preparada para produccion.
      </div>
    </footer>
  );
}
