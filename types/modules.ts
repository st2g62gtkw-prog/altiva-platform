export type ModuleStatus = "Disponible" | "Proximamente" | "Preparado para IA";

export type ModuleId =
  | "apus"
  | "cubicar"
  | "documentacion-tecnica"
  | "documentacion-administrativa";

export type ModuleStep = {
  title: string;
  description?: string;
};

export type FutureDocumentType = {
  title: string;
  description?: string;
};

export type ProjectModule = {
  id: ModuleId;
  title: string;
  href: string;
  description: string;
  status: ModuleStatus;
  isAvailable: boolean;
  ctaLabel: string;
  requiredInputs: string[];
  relatedSources: string[];
  steps: ModuleStep[];
  futureOutputs: FutureDocumentType[];
  expectedOutputs: string[];
  warning?: string;
};
