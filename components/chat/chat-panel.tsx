"use client";

import { SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";

import { assistantMessages } from "@/data/mock";
import { assistantModes } from "@/lib/ai/assistant-config";
import { assistantSuggestedPrompts } from "@/lib/ai/assistant-prompts";
import type {
  AssistantApiResponse,
  AssistantMessage,
  AssistantMode,
  AssistantResponse
} from "@/lib/ai/types";
import { cn } from "@/lib/utils/cn";

function createMessage(role: AssistantMessage["role"], content: string): AssistantMessage {
  return {
    id: typeof crypto !== "undefined" ? crypto.randomUUID() : `${role}-${Date.now()}`,
    role,
    content,
    createdAt: new Date().toISOString()
  };
}

function isAssistantResponse(response: AssistantApiResponse): response is AssistantResponse {
  return "message" in response;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<AssistantMessage[]>(assistantMessages);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<AssistantMode>("general");
  const [isThinking, setIsThinking] = useState(false);

  async function sendPrompt(prompt: string, selectedMode = mode) {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    const userMessage = createMessage("user", trimmedPrompt);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setMode(selectedMode);
    setIsThinking(true);

    try {
      const apiResponse = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: trimmedPrompt,
          messages: nextMessages,
          mode: selectedMode,
          context: {
            route: "/app/asistente"
          }
        })
      });

      const response = (await apiResponse.json()) as AssistantApiResponse;

      if (!apiResponse.ok || !isAssistantResponse(response)) {
        throw new Error("Assistant request failed");
      }

      setMessages((current) => [...current, response.message]);
    } catch {
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "No fue posible procesar la consulta en este momento. Revisa la informacion ingresada e intenta nuevamente."
        )
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendPrompt(input);
  }

  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="min-w-0 rounded-lg border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-950">Asistente IA</h1>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Altiva Assistant V1 puede operar con modo demo o con OpenAI real segun las
                variables del entorno. La UI nunca recibe claves ni llama proveedores externos.
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
              Mock u OpenAI por entorno
            </span>
          </div>
        </div>

        <div className="border-b border-zinc-200 p-5">
          <p className="mb-3 text-sm font-semibold text-zinc-950">Enfoque del asistente</p>
          <div className="flex flex-wrap gap-2">
            {assistantModes.map((assistantMode) => (
              <button
                key={assistantMode.id}
                type="button"
                onClick={() => setMode(assistantMode.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  mode === assistantMode.id
                    ? "border-teal-700 bg-teal-700 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-teal-700"
                )}
                title={assistantMode.description}
              >
                {assistantMode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[520px] space-y-4 overflow-y-auto p-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] overflow-hidden whitespace-pre-line rounded-lg px-4 py-3 text-sm leading-6",
                  message.role === "user"
                    ? "bg-teal-700 text-white"
                    : "border border-zinc-200 bg-zinc-50 text-zinc-800"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isThinking ? (
            <div className="text-sm font-medium text-zinc-500">Preparando respuesta...</div>
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 border-t border-zinc-200 p-4 sm:flex-row"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Escribe una consulta tecnica..."
            className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-300 px-4 text-sm outline-none focus:border-teal-700"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800 sm:w-auto"
          >
            <SendHorizontal className="h-4 w-4" aria-hidden />
            Enviar
          </button>
        </form>
      </section>

      <aside className="min-w-0 space-y-5">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-zinc-950">Consultas sugeridas</h2>
          <div className="mt-4 space-y-2">
            {assistantSuggestedPrompts.map((item) => (
              <button
                key={item.prompt}
                type="button"
                onClick={() => void sendPrompt(item.prompt, item.mode)}
                className="w-full rounded-md border border-zinc-200 px-3 py-2 text-left text-sm leading-6 text-zinc-700 hover:border-teal-700 hover:bg-teal-50"
              >
                <span className="block font-semibold text-zinc-950">{item.label}</span>
                <span>{item.prompt}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-zinc-950">Preparado para IA real</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            La conexion real se activa solo desde backend con `AI_PROVIDER=openai` y
            `OPENAI_API_KEY`. Si falta configuracion, Altiva conserva el proveedor mock.
          </p>
        </section>
      </aside>
    </div>
  );
}
