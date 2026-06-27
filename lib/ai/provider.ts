import { mockAssistantProvider } from "@/lib/ai/mock-assistant";
import { isOpenAIConfigured, openAIAssistantProvider } from "@/lib/ai/openai-provider";
import { getAssistantRuntimeConfig } from "@/lib/ai/runtime-config";
import type { AssistantProvider, AssistantRequest, AssistantResponse } from "@/lib/ai/types";

function getAssistantProvider(): AssistantProvider {
  const runtimeConfig = getAssistantRuntimeConfig();

  if (runtimeConfig.provider === "openai" && isOpenAIConfigured()) {
    return openAIAssistantProvider;
  }

  return mockAssistantProvider;
}

export async function sendMessage(request: AssistantRequest): Promise<AssistantResponse> {
  const provider = getAssistantProvider();

  try {
    return await provider.sendMessage(request);
  } catch {
    const fallbackResponse = await mockAssistantProvider.sendMessage(request);
    return {
      ...fallbackResponse,
      fallback: provider.id !== "mock"
    };
  }
}

export async function getAssistantResponse(
  request: AssistantRequest
): Promise<AssistantResponse> {
  return sendMessage(request);
}
