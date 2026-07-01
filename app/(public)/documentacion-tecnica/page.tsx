import type { Metadata } from "next";

import { ComingSoonModule } from "@/components/modules/coming-soon-module";
import { createPageMetadata } from "@/config/metadata";
import { projectModulesById } from "@/data/project-modules";

export const metadata: Metadata = createPageMetadata({
  title: "Crear documentacion tecnica",
  description:
    "Modulo futuro para generar documentacion tecnica a partir de fuentes, requisitos y criterios del proyecto.",
  path: "/documentacion-tecnica"
});

export default function DocumentacionTecnicaPage() {
  return (
    <ComingSoonModule
      module={projectModulesById["documentacion-tecnica"]}
      intro="Este modulo permitira generar documentacion tecnica a partir de planos, EETT, itemizados, normativa, rubricas y criterios del proyecto."
      disabledActionLabel="Generar borrador tecnico"
    />
  );
}
