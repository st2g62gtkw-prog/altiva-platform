import { NextResponse } from "next/server";

import { assistantConfig, isAssistantMode } from "@/lib/ai/assistant-config";
import { getAssistantResponse } from "@/lib/ai/provider";
import type { AssistantApiRequest, AssistantApiResponse } from "@/lib/ai/types";

function getPromptFromRequest(body: AssistantApiRequest) {
  const explicitPrompt = body.prompt?.trim();

  if (explicitPrompt) {
    return explicitPrompt;
  }

  const lastUserMessage = [...(body.messages || [])]
    .reverse()
    .find((message) => message.role === "user");

  return lastUserMessage?.content.trim() || "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssistantApiRequest;
    const prompt = getPromptFromRequest(body);

    if (!prompt) {
      return NextResponse.json<AssistantApiResponse>(
        { error: "Debes enviar una consulta para el asistente." },
        { status: 400 }
      );
    }

    const mode = isAssistantMode(body.mode) ? body.mode : assistantConfig.defaultMode;
    const response = await getAssistantResponse({
      prompt,
      messages: body.messages,
      context: {
        ...body.context,
        mode
      }
    });

    return NextResponse.json<AssistantApiResponse>(response);
  } catch {
    return NextResponse.json<AssistantApiResponse>(
      { error: "No fue posible procesar la consulta del asistente." },
      { status: 500 }
    );
  }
}
