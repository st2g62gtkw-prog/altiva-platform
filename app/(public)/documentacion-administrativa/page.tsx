import type { Metadata } from "next";

import { ComingSoonModule } from "@/components/modules/coming-soon-module";
import { createPageMetadata } from "@/config/metadata";
import { projectModulesById } from "@/data/project-modules";

export const metadata: Metadata = createPageMetadata({
  title: "Crear documentacion administrativa",
  description:
    "Modulo futuro para preparar documentacion administrativa para entregas academicas, licitaciones y expedientes.",
  path: "/documentacion-administrativa"
});

export default function DocumentacionAdministrativaPage() {
  return (
    <ComingSoonModule
      module={projectModulesById["documentacion-administrativa"]}
      intro="Este modulo permitira preparar documentacion administrativa para entregas academicas, licitaciones publicas y expedientes de proyecto."
      disabledActionLabel="Generar borrador administrativo"
    />
  );
}
