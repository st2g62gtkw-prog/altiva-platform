import { NextResponse } from "next/server";

import { assistantConfig, isAssistantMode } from "@/lib/ai/assistant-config";
import { getAssistantResponse } from "@/lib/ai/provider";
import type {
  AssistantApiRequest,
  AssistantApiResponse,
  AssistantResponse
} from "@/lib/ai/types";

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

function isValidAssistantResponse(response: AssistantResponse) {
  return Boolean(
    response.message &&
      response.message.role === "assistant" &&
      response.message.content.trim() &&
      response.provider &&
      response.model
  );
}

async function readAssistantRequest(request: Request): Promise<AssistantApiRequest | null> {
  try {
    return (await request.json()) as AssistantApiRequest;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = await readAssistantRequest(request);

  if (!body) {
    return NextResponse.json<AssistantApiResponse>(
      { error: "La solicitud del asistente no tiene un formato valido." },
      { status: 400 }
    );
  }

  const prompt = getPromptFromRequest(body);

  if (!prompt) {
    return NextResponse.json<AssistantApiResponse>(
      { error: "Debes enviar una consulta para el asistente." },
      { status: 400 }
    );
  }

  if (body.mode && !isAssistantMode(body.mode)) {
    return NextResponse.json<AssistantApiResponse>(
      { error: "El modo seleccionado no es valido." },
      { status: 400 }
    );
  }

  try {
    const mode = isAssistantMode(body.mode) ? body.mode : assistantConfig.defaultMode;
    const response = await getAssistantResponse({
      prompt,
      messages: body.messages,
      context: {
        ...body.context,
        mode
      }
    });

    if (!isValidAssistantResponse(response)) {
      return NextResponse.json<AssistantApiResponse>(
        { error: "El proveedor del asistente devolvio una respuesta invalida." },
        { status: 502 }
      );
    }

    return NextResponse.json<AssistantApiResponse>(response);
  } catch {
    return NextResponse.json<AssistantApiResponse>(
      { error: "No fue posible procesar la consulta del asistente." },
      { status: 500 }
    );
  }
}
