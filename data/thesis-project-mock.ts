import type { AssistantMessage, AssistantMode } from "@/lib/ai/types";

export const thesisProjectSummary = {
  provisionalName: "Centro de costos y control tecnico para proyecto de construccion",
  status: "Base inicial / modo demo",
  estimatedStartDate: "2026-07-01",
  currentStage: "Ordenamiento de antecedentes",
  nextMilestone: "Definir pauta, rubrica, alcance y entregables obligatorios",
  observations:
    "La informacion es referencial. Antes de subir archivos reales se debe implementar login y almacenamiento persistente."
};

export const thesisFileCategories = [
  "Instrucciones del ramo",
  "Rubricas",
  "Formatos",
  "Presupuestos",
  "APUs",
  "Cronograma",
  "Informes",
  "Normativa",
  "Fuentes tecnicas",
  "Otros"
];

export const thesisProjectFiles = [
  {
    id: "file-001",
    name: "Instrucciones generales del proyecto",
    type: "PDF",
    category: "Instrucciones del ramo",
    status: "Pendiente de carga real",
    date: "2026-07-01",
    observations: "Usar para definir alcance, formato y restricciones."
  },
  {
    id: "file-002",
    name: "Rubrica de evaluacion",
    type: "PDF",
    category: "Rubricas",
    status: "Mock",
    date: "2026-07-01",
    observations: "Debe transformarse en checklist cuando exista almacenamiento real."
  },
  {
    id: "file-003",
    name: "Formato informe inicial",
    type: "DOCX",
    category: "Formatos",
    status: "Mock",
    date: "2026-07-03",
    observations: "Plantilla base para estructura y estilo."
  },
  {
    id: "file-004",
    name: "Presupuesto preliminar",
    type: "XLSX",
    category: "Presupuestos",
    status: "Por preparar",
    date: "2026-07-08",
    observations: "Faltan partidas, cubicaciones y precios unitarios."
  },
  {
    id: "file-005",
    name: "Base APU partida ejemplo",
    type: "XLSX",
    category: "APUs",
    status: "Por completar",
    date: "2026-07-10",
    observations: "Requiere rendimiento, mano de obra, materiales y equipos."
  },
  {
    id: "file-006",
    name: "Cronograma base MS Project",
    type: "MPP",
    category: "Cronograma",
    status: "Pendiente",
    date: "2026-07-12",
    observations: "Faltan actividades, duraciones, dependencias y calendario."
  }
];

export const thesisSources = [
  {
    id: "source-001",
    title: "Instrucciones del Proyecto de Titulo",
    sourceType: "Pauta academica",
    status: "Pendiente de carga real",
    expectedUse: "Definir alcance minimo, formato y condiciones de entrega.",
    relatedDeliverables: "Informe inicial, presentacion, anexos",
    observations: "Debe ser la primera fuente autorizada para el asistente."
  },
  {
    id: "source-002",
    title: "Rubrica de evaluacion",
    sourceType: "Criterio de evaluacion",
    status: "Mock",
    expectedUse: "Convertir criterios en checklist de revision.",
    relatedDeliverables: "Todos los entregables",
    observations: "No generar conclusiones sin comparar contra esta pauta."
  },
  {
    id: "source-003",
    title: "Formatos base",
    sourceType: "Plantilla",
    status: "Mock",
    expectedUse: "Mantener estructura, orden y nombres de secciones.",
    relatedDeliverables: "Informe inicial, reporte tecnico",
    observations: "Falta validar si hay formato oficial actualizado."
  },
  {
    id: "source-004",
    title: "Apuntes de clases",
    sourceType: "Apuntes",
    status: "Por ordenar",
    expectedUse: "Respaldar decisiones y criterios de desarrollo.",
    relatedDeliverables: "Informe inicial, APUs, cronograma",
    observations: "Separar conceptos, ejemplos y requisitos obligatorios."
  },
  {
    id: "source-005",
    title: "Normativa o manuales",
    sourceType: "Referencia tecnica",
    status: "Pendiente",
    expectedUse: "Respaldar criterios tecnicos cuando corresponda.",
    relatedDeliverables: "Reporte tecnico, anexos",
    observations: "Verificar version, vigencia y pertinencia antes de citar."
  },
  {
    id: "source-006",
    title: "Bibliografia tecnica y links de referencia",
    sourceType: "Bibliografia",
    status: "Por clasificar",
    expectedUse: "Apoyar marco teorico, definiciones y criterios.",
    relatedDeliverables: "Informe, presentacion, anexos",
    observations: "Registrar autor, fecha, enlace y uso esperado."
  }
];

export const thesisDeliverables = [
  {
    id: "deliverable-001",
    name: "Informe inicial",
    status: "Pendiente",
    priority: "Alta",
    missingInformation: "Pauta, rubrica, alcance, indice obligatorio",
    observation: "Debe evitar estructura generica y responder a la pauta real."
  },
  {
    id: "deliverable-002",
    name: "Presupuesto",
    status: "Por preparar",
    priority: "Alta",
    missingInformation: "Partidas, cubicaciones, precios unitarios, supuestos",
    observation: "No calcular montos sin respaldo."
  },
  {
    id: "deliverable-003",
    name: "APUs",
    status: "Por preparar",
    priority: "Alta",
    missingInformation: "Rendimientos, materiales, mano de obra, equipos",
    observation: "Separar base de datos, supuestos y fuente de precios."
  },
  {
    id: "deliverable-004",
    name: "Cronograma MS Project",
    status: "Pendiente",
    priority: "Media",
    missingInformation: "Actividades, duraciones, calendario, dependencias",
    observation: "Preparar estructura WBS antes de cargar MS Project."
  },
  {
    id: "deliverable-005",
    name: "Reporte tecnico",
    status: "Pendiente",
    priority: "Media",
    missingInformation: "Criterios tecnicos, respaldo, normativa aplicable",
    observation: "Debe vincular decisiones con fuentes y evidencias."
  },
  {
    id: "deliverable-006",
    name: "Presentacion",
    status: "Futuro",
    priority: "Media",
    missingInformation: "Estructura final, resultados, conclusiones",
    observation: "Preparar despues de validar informe y entregables principales."
  },
  {
    id: "deliverable-007",
    name: "Anexos",
    status: "Futuro",
    priority: "Baja",
    missingInformation: "Respaldos, tablas, fuentes, calculos",
    observation: "Usar para trazabilidad, no para esconder informacion principal."
  }
];

export const thesisAlerts = [
  {
    id: "alert-001",
    title: "No subir informacion sensible todavia",
    description: "Esta version no tiene login ni almacenamiento real de archivos.",
    tone: "warning"
  },
  {
    id: "alert-002",
    title: "Primero cargar pauta y rubrica",
    description: "La IA debe trabajar contra instrucciones reales antes de generar informes.",
    tone: "info"
  },
  {
    id: "alert-003",
    title: "APUs y presupuesto requieren datos base",
    description: "Faltan cantidades, rendimientos, precios y supuestos verificables.",
    tone: "warning"
  }
];

export const thesisAssistantSuggestedQuestions: Array<{
  label: string;
  prompt: string;
  mode: AssistantMode;
}> = [
  {
    label: "Interpretar instrucciones",
    prompt: "Ayudame a interpretar las instrucciones del proyecto.",
    mode: "documentos"
  },
  {
    label: "Ordenar entregables",
    prompt: "Organiza los entregables segun la rubrica.",
    mode: "gestion_proyectos"
  },
  {
    label: "Informacion faltante",
    prompt: "Que informacion necesito antes de redactar el informe.",
    mode: "general"
  },
  {
    label: "Estructura de informe",
    prompt: "Crea una estructura de informe no generica.",
    mode: "reportes"
  },
  {
    label: "Datos para APUs",
    prompt: "Que datos faltan para preparar APUs.",
    mode: "presupuestos"
  },
  {
    label: "Cronograma",
    prompt: "Que informacion necesito para un cronograma en MS Project.",
    mode: "gestion_proyectos"
  },
  {
    label: "Revision contra pauta",
    prompt: "Revisa si este entregable responde a la pauta.",
    mode: "documentos"
  }
];

export const thesisAssistantMessages: AssistantMessage[] = [
  {
    id: "thesis-assistant-001",
    role: "assistant",
    content:
      "Soy Altiva Assistant - Proyecto de Titulo. Puedo ayudarte a ordenar instrucciones, fuentes, entregables, informacion faltante, APUs, presupuesto y cronograma. Por ahora no leo archivos reales; trabaja solo con lo que escribas en el chat.",
    createdAt: "2026-06-27T09:00:00.000Z"
  }
];
