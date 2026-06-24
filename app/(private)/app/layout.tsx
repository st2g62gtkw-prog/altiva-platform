import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `App interna | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`
  },
  description: "Panel interno para proyectos, documentos, presupuestos, reportes e IA.",
  robots: {
    index: false,
    follow: false
  }
};

export default function PrivateAppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
