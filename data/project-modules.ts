import type { ModuleId, ProjectModule } from "@/types/modules";

export const projectModules: ProjectModule[] = [
  {
    id: "apus",
    title: "Generar APUs con Itemizado",
    href: "/apus",
    description: "Crea APUs base desde un itemizado y un formato Excel.",
    status: "Disponible",
    isAvailable: true,
    ctaLabel: "Abrir modulo",
    requiredInputs: ["Itemizado .xlsx, .xls o .csv", "Formato APU .xlsx opcional"],
    relatedSources: ["Itemizado", "Formato APU", "Observaciones de partidas"],
    steps: [
      { title: "Subir itemizado" },
      { title: "Subir formato APU" },
      { title: "Mapear columnas y revisar vista previa" },
      { title: "Excluir filas que no correspondan" },
      { title: "Generar Excel con APUs base" }
    ],
    futureOutputs: [
      { title: "APUs base sin recursos" },
      { title: "Resumen de partidas generadas" }
    ],
    expectedOutputs: ["Archivo Excel descargable", "Una hoja Resumen", "Una hoja por APU"]
  },
  {
    id: "cubicar",
    title: "Cubicar",
    href: "/cubicar",
    description: "Sube planos y prepara cubicaciones automaticas. Proximamente con IA.",
    status: "Proximamente",
    isAvailable: false,
    ctaLabel: "Ver arquitectura",
    requiredInputs: ["Planos", "Criterios de medicion", "Partidas del itemizado", "EETT"],
    relatedSources: ["Planos PDF/DWG futuros", "Itemizado", "EETT", "Criterios de cubicacion"],
    steps: [
      { title: "Subir planos" },
      { title: "Detectar elementos y partidas" },
      { title: "Revisar criterios de medicion" },
      { title: "Generar cubicacion" },
      { title: "Exportar respaldo" }
    ],
    futureOutputs: [
      { title: "Cubicaciones automaticas" },
      { title: "Respaldo de mediciones" },
      { title: "Trazabilidad plano-partida" }
    ],
    expectedOutputs: ["Tabla de cubicaciones", "Respaldo por partida", "Exportacion futura"],
    warning:
      "Esta version todavia no lee planos ni calcula cantidades. Es una base visual y tecnica para la futura integracion de IA."
  },
  {
    id: "documentacion-tecnica",
    title: "Crear documentacion tecnica",
    href: "/documentacion-tecnica",
    description:
      "Genera EETT, informes tecnicos, memorias y respaldos tecnicos. Proximamente con IA.",
    status: "Preparado para IA",
    isAvailable: false,
    ctaLabel: "Ver arquitectura",
    requiredInputs: ["Planos", "EETT", "Itemizados", "Normativa", "Rubricas", "Criterios del proyecto"],
    relatedSources: ["Fuentes tecnicas", "Normativa", "Rubrica", "Formatos", "Antecedentes del proyecto"],
    steps: [
      { title: "Seleccionar fuentes del proyecto" },
      { title: "Revisar requisitos tecnicos" },
      { title: "Detectar faltantes" },
      { title: "Generar borrador tecnico" },
      { title: "Validar fuentes y exportar" }
    ],
    futureOutputs: [
      { title: "Especificaciones tecnicas" },
      { title: "Informes tecnicos" },
      { title: "Memorias descriptivas" },
      { title: "Procedimientos constructivos" },
      { title: "Respaldos normativos" },
      { title: "Anexos tecnicos" }
    ],
    expectedOutputs: ["Borradores tecnicos", "Checklist de fuentes", "Exportacion futura"],
    warning:
      "Esta version no genera documentos todavia. La futura version debera citar fuentes y separar datos reales, supuestos y faltantes."
  },
  {
    id: "documentacion-administrativa",
    title: "Crear documentacion administrativa",
    href: "/documentacion-administrativa",
    description:
      "Genera formularios, antecedentes administrativos y documentos para licitacion. Proximamente con IA.",
    status: "Preparado para IA",
    isAvailable: false,
    ctaLabel: "Ver arquitectura",
    requiredInputs: ["Bases", "Formularios", "Antecedentes administrativos", "Requisitos de entrega"],
    relatedSources: ["Bases administrativas", "Formularios", "Antecedentes del proyecto", "Checklists"],
    steps: [
      { title: "Seleccionar bases, formularios y antecedentes" },
      { title: "Detectar campos requeridos" },
      { title: "Identificar documentos faltantes" },
      { title: "Generar borrador administrativo" },
      { title: "Revisar y exportar" }
    ],
    futureOutputs: [
      { title: "Formularios de licitacion publica" },
      { title: "Declaraciones" },
      { title: "Cartas" },
      { title: "Antecedentes administrativos" },
      { title: "Checklist documental" },
      { title: "Resumenes ejecutivos" },
      { title: "Anexos administrativos" }
    ],
    expectedOutputs: ["Borradores administrativos", "Checklist documental", "Exportacion futura"],
    warning:
      "Esta version no rellena formularios ni reemplaza revision profesional. Es una base para la futura automatizacion con IA."
  }
];

export const projectModulesById = projectModules.reduce(
  (modules, module) => ({
    ...modules,
    [module.id]: module
  }),
  {} as Record<ModuleId, ProjectModule>
);
