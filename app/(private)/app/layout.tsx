import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `Proyecto de Título | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`
  },
  description: "Rutas antiguas privadas redirigidas a la pagina unica del Proyecto de Titulo.",
  robots: {
    index: false,
    follow: false
  }
};

export default function PrivateAppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
