import type { Metadata } from "next";

import { ComingSoonModule } from "@/components/modules/coming-soon-module";
import { createPageMetadata } from "@/config/metadata";
import { projectModulesById } from "@/data/project-modules";

export const metadata: Metadata = createPageMetadata({
  title: "Cubicar",
  description:
    "Modulo futuro para subir planos, identificar partidas y preparar cubicaciones automaticas con apoyo de IA.",
  path: "/cubicar"
});

export default function CubicarPage() {
  return (
    <ComingSoonModule
      module={projectModulesById.cubicar}
      intro="Este modulo estara orientado a subir planos, identificar partidas y preparar cubicaciones automaticas con apoyo de IA."
      disabledActionLabel="Subir planos"
    />
  );
}
