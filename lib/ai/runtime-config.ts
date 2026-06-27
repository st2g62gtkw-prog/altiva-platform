import { DEFAULT_OPENAI_MODEL } from "@/lib/ai/assistant-config";
import type { AssistantProviderId } from "@/lib/ai/types";

export function getAssistantRuntimeConfig() {
  return {
    provider: (process.env.AI_PROVIDER || "mock") as AssistantProviderId,
    model: process.env.AI_MODEL || "",
    openaiApiKey: process.env.OPENAI_API_KEY || ""
  };
}

export function getOpenAIModelFromEnvironment() {
  return getAssistantRuntimeConfig().model || DEFAULT_OPENAI_MODEL;
}
