export type AssistantRole = "user" | "assistant";

export type AssistantMessage = {
  id: string;
  role: AssistantRole;
  content: string;
  createdAt: string;
};

export type AssistantRequest = {
  prompt: string;
  projectId?: string;
};

export type AssistantResponse = {
  message: AssistantMessage;
  model: "mock-construction-assistant" | "openai";
};
