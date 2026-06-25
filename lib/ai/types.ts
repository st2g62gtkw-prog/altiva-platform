export type AssistantRole = "user" | "assistant" | "system";

export type AssistantMode =
  | "general"
  | "oficina_tecnica"
  | "presupuestos"
  | "documentos"
  | "reportes"
  | "pmp_ito"
  | "gestion_proyectos";

export type AssistantProviderId = "mock" | "openai";

export type AssistantMessage = {
  id: string;
  role: AssistantRole;
  content: string;
  createdAt: string;
};

export type AssistantContext = {
  mode?: AssistantMode;
  projectId?: string;
  projectName?: string;
  route?: string;
};

export type AssistantRequest = {
  prompt: string;
  messages?: AssistantMessage[];
  context?: AssistantContext;
};

export type AssistantResponse = {
  message: AssistantMessage;
  mode: AssistantMode;
  provider: AssistantProviderId;
  model: string;
};

export type AssistantProvider = {
  id: AssistantProviderId;
  model: string;
  sendMessage: (request: AssistantRequest) => Promise<AssistantResponse>;
};

export type AssistantApiRequest = {
  prompt?: string;
  messages?: AssistantMessage[];
  mode?: AssistantMode;
  context?: AssistantContext;
};

export type AssistantApiResponse =
  | AssistantResponse
  | {
      error: string;
    };
