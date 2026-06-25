import type { AssistantMode, AssistantProviderId } from "@/lib/ai/types";

export const assistantConfig = {
  name: "Altiva Assistant V1",
  defaultMode: "general" as AssistantMode
};

export function getAssistantRuntimeConfig() {
  const env: Partial<Record<string, string>> =
    typeof process !== "undefined" ? process.env : {};

  return {
    provider: (env.AI_PROVIDER || "mock") as AssistantProviderId,
    model: env.AI_MODEL || "altiva-mock-v1"
  };
}

export const assistantModes: Array<{
  id: AssistantMode;
  label: string;
  description: string;
}> = [
  {
    id: "general",
    label: "General",
    description: "Orden general de consultas tecnicas y administrativas."
  },
  {
    id: "oficina_tecnica",
    label: "Oficina tecnica",
    description: "Antecedentes, RFIs, minutas, submittals y control tecnico."
  },
  {
    id: "presupuestos",
    label: "Presupuestos",
    description: "Partidas, cubicaciones, precios unitarios y desviaciones."
  },
  {
    id: "documentos",
    label: "Documentos",
    description: "Planos, permisos, informes, contratos y respaldos."
  },
  {
    id: "reportes",
    label: "Reportes",
    description: "Avance fisico, financiero, riesgos y proximas acciones."
  },
  {
    id: "pmp_ito",
    label: "PMP/ITO",
    description: "Estudio PMP, inspeccion tecnica y preguntas situacionales."
  },
  {
    id: "gestion_proyectos",
    label: "Gestion de proyectos",
    description: "Planificacion, riesgos, responsables, hitos y seguimiento."
  }
];

export function isAssistantMode(value: unknown): value is AssistantMode {
  return typeof value === "string" && assistantModes.some((mode) => mode.id === value);
}
