import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "App interna",
  description: "Dashboard interno preparado para proyectos, documentos, presupuestos, reportes e IA.",
  path: "/app",
  noIndex: true
});

export default function PrivateAppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
