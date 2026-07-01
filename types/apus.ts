export const apuColumnKeys = [
  "company",
  "project",
  "code",
  "activity",
  "unit",
  "quantity",
  "observations"
] as const;

export type ApuColumnKey = (typeof apuColumnKeys)[number];

export type ApuColumnMapping = Partial<Record<ApuColumnKey, string>>;

export type ItemizedRawRow = {
  id: string;
  sourceRowNumber: number;
  values: Record<string, string>;
};

export type ParsedItemized = {
  fileName: string;
  sheetName: string;
  headers: string[];
  rows: ItemizedRawRow[];
  detectedMapping: ApuColumnMapping;
  warnings: string[];
};

export type ApuPreviewItem = {
  id: string;
  sourceRowNumber: number;
  number: number;
  company?: string;
  project?: string;
  code?: string;
  activity: string;
  unit?: string;
  quantity?: string;
  observations?: string;
  included: boolean;
  status: "Listo" | "Sin actividad";
};

export type ApuGenerationInput = {
  items: ApuPreviewItem[];
  templateFile?: File | null;
};

export type ApuGenerationResult = {
  blob: Blob;
  fileName: string;
  generatedCount: number;
  warnings: string[];
};

export const apuColumnLabels: Record<ApuColumnKey, string> = {
  company: "Empresa",
  project: "Proyecto",
  code: "Codigo / item",
  activity: "Actividad",
  unit: "Unidad",
  quantity: "Cantidad",
  observations: "Observaciones"
};

export const apuPlaceholders = [
  "{{EMPRESA}}",
  "{{PROYECTO}}",
  "{{CODIGO}}",
  "{{ITEM}}",
  "{{ACTIVIDAD}}",
  "{{UNIDAD}}",
  "{{CANTIDAD}}",
  "{{OBSERVACIONES}}",
  "{{FECHA}}",
  "{{NUMERO_APU}}"
] as const;
