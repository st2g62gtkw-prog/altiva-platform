import { siteConfig } from "@/config/site";

export function PublicFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-zinc-950">{siteConfig.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600">
            Pagina unica para organizar archivos, fuentes, entregables y apoyo IA del Proyecto de
            Titulo.
          </p>
        </div>
      </div>
      <div className="border-t border-zinc-200 px-4 py-4 text-center text-xs text-zinc-500">
        Copyright {new Date().getFullYear()} {siteConfig.name}. Base demo sin almacenamiento real.
      </div>
    </footer>
  );
}
