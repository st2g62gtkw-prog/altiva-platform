export type ModuleStatus = "available" | "coming-soon" | "prepared-for-ai";

export type ModuleId =
  | "apus"
  | "cubicar"
  | "documentacion-tecnica"
  | "documentacion-administrativa";

export type ModuleStep = {
  title: string;
  description?: string;
};

export type FutureOutput = {
  title: string;
  description?: string;
};

export type ModuleRequirement = {
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
  badge: string;
  primaryActionLabel: string;
  requirements: ModuleRequirement[];
  relatedSources: string[];
  steps: ModuleStep[];
  futureOutputs: FutureOutput[];
  expectedOutputs: string[];
  warning?: string;
};
