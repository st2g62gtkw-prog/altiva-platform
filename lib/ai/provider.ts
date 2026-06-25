import { getAssistantRuntimeConfig } from "@/lib/ai/assistant-config";
import { mockAssistantProvider } from "@/lib/ai/mock-assistant";
import type { AssistantProvider, AssistantRequest, AssistantResponse } from "@/lib/ai/types";

function getAssistantProvider(): AssistantProvider {
  const runtimeConfig = getAssistantRuntimeConfig();

  if (runtimeConfig.provider === "mock") {
    return mockAssistantProvider;
  }

  // Future integration point:
  // Add an OpenAI provider here and return it when AI_PROVIDER=openai.
  // Keep API keys server-side only. Never call external AI providers from client components.
  return mockAssistantProvider;
}

export async function sendMessage(request: AssistantRequest): Promise<AssistantResponse> {
  return getAssistantProvider().sendMessage(request);
}

export async function getAssistantResponse(
  request: AssistantRequest
): Promise<AssistantResponse> {
  return sendMessage(request);
}
