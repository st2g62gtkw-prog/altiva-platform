import type { ThesisFileMetadata, ThesisReadinessResult } from "@/types/thesis";

const REQUIRED_CATEGORIES = [
  "Instrucciones del ramo",
  "Rubricas",
  "Formatos",
  "Planos",
  "EETT",
  "Bases administrativas",
  "Bases tecnicas",
  "Contratos",
  "Itemizado",
  "Presupuestos",
  "APUs",
  "Cronograma",
  "Informes",
  "Normativa",
  "Fuentes tecnicas"
] as const;

const CRITICAL_CATEGORIES = [
  "Instrucciones del ramo",
  "Rubricas",
  "Formatos",
  "EETT",
  "Itemizado",
  "Planos",
  "Bases tecnicas"
] as const;

const CATEGORY_ALIASES: Record<string, string> = {
  rubrica: "Rubricas",
  rubricas: "Rubricas",
  "rubrica de evaluacion": "Rubricas",
  formato: "Formatos",
  formatos: "Formatos",
  "formato base": "Formatos",
  presupuesto: "Presupuestos",
  presupuestos: "Presupuestos",
  "fuente tecnica": "Fuentes tecnicas",
  "fuentes tecnica": "Fuentes tecnicas",
  "fuentes tecnicas": "Fuentes tecnicas",
  "base tecnica": "Bases tecnicas",
  "bases tecnica": "Bases tecnicas",
  "bases tecnicas": "Bases tecnicas",
  "base administrativa": "Bases administrativas",
  "bases administrativas": "Bases administrativas",
  itemizado: "Itemizado",
  itemizados: "Itemizado",
  planos: "Planos",
  plano: "Planos",
  eett: "EETT",
  "especificaciones tecnicas": "EETT"
};

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeCategory(category: string) {
  const normalized = normalizeText(category);

  if (CATEGORY_ALIASES[normalized]) {
    return CATEGORY_ALIASES[normalized];
  }

  const knownCategory = REQUIRED_CATEGORIES.find(
    (item) => normalizeText(item) === normalized
  );

  return knownCategory || category.trim();
}

function getStatus(score: number, criticalMissing: string[]): ThesisReadinessResult["status"] {
  if (criticalMissing.length >= 4) {
    return "Faltan antecedentes criticos";
  }

  if (score >= 75 && criticalMissing.length === 0) {
    return "Preparado para analisis";
  }

  if (score >= 35) {
    return "Parcial";
  }

  return "Inicial";
}

function getNextStep(criticalMissing: string[], missingCategories: string[]) {
  if (criticalMissing.includes("Rubricas")) {
    return "Subir la rubrica antes de redactar informes.";
  }

  if (criticalMissing.includes("Instrucciones del ramo")) {
    return "Subir las instrucciones oficiales antes de definir entregables.";
  }

  if (criticalMissing.includes("Formatos")) {
    return "Subir formato oficial antes de estructurar entregables.";
  }

  if (criticalMissing.includes("Itemizado")) {
    return "Subir itemizado antes de preparar presupuesto o APUs.";
  }

  if (criticalMissing.includes("EETT")) {
    return "Subir EETT antes de revisar partidas tecnicas.";
  }

  if (criticalMissing.includes("Planos")) {
    return "Subir planos si el alcance del proyecto los requiere.";
  }

  if (criticalMissing.includes("Bases tecnicas")) {
    return "Subir bases o antecedentes tecnicos antes de avanzar.";
  }

  if (missingCategories.includes("Presupuestos")) {
    return "Subir presupuesto base cuando exista para revisar coherencia.";
  }

  if (missingCategories.includes("APUs")) {
    return "Subir APUs cuando existan para revisar respaldo de precios.";
  }

  return "Revisar metadata y confirmar que cada archivo corresponde a su categoria.";
}

export function analyzeThesisReadiness(files: ThesisFileMetadata[]): ThesisReadinessResult {
  const foundSet = new Set(files.map((file) => normalizeCategory(file.category)).filter(Boolean));
  const foundCategories = REQUIRED_CATEGORIES.filter((category) => foundSet.has(category));
  const missingCategories = REQUIRED_CATEGORIES.filter((category) => !foundSet.has(category));
  const criticalMissing = CRITICAL_CATEGORIES.filter((category) => !foundSet.has(category));
  const score = Math.round((foundCategories.length / REQUIRED_CATEGORIES.length) * 100);

  return {
    status: getStatus(score, criticalMissing),
    score,
    foundCategories,
    missingCategories,
    criticalMissing,
    nextStep: getNextStep(criticalMissing, missingCategories),
    warnings: [
      "Diagnostico basado solo en metadata y categorias.",
      "Altiva todavia no lee el contenido de PDFs, Word, Excel ni planos.",
      "No generar entregables si faltan antecedentes criticos."
    ]
  };
}
