"use client";

import { SendHorizontal } from "lucide-react";
import { FormEvent, useState } from "react";

import { assistantMessages } from "@/data/mock";
import { generateAssistantReply } from "@/lib/ai/mock-assistant";
import type { AssistantMessage } from "@/lib/ai/types";
import { cn } from "@/lib/utils/cn";

const suggestedPrompts = [
  "Resume los documentos pendientes.",
  "Revisa riesgos del proyecto.",
  "Ayudame a preparar una minuta.",
  "Analiza un presupuesto.",
  "Busca inconsistencias en antecedentes tecnicos.",
  "Prepara un reporte de avance."
];

function createUserMessage(content: string): AssistantMessage {
  return {
    id: typeof crypto !== "undefined" ? crypto.randomUUID() : `user-${Date.now()}`,
    role: "user",
    content,
    createdAt: new Date().toISOString()
  };
}

export function ChatPanel() {
  const [messages, setMessages] = useState<AssistantMessage[]>(assistantMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  async function sendPrompt(prompt: string) {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    const userMessage = createUserMessage(trimmedPrompt);
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsThinking(true);

    const response = await generateAssistantReply({ prompt: trimmedPrompt });
    setMessages((current) => [...current, response.message]);
    setIsThinking(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendPrompt(input);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <section className="rounded-lg border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 p-5">
          <h1 className="text-2xl font-semibold text-zinc-950">Asistente IA</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Chat simulado orientado a construccion civil. La interfaz ya separa la UI de la
            logica para conectar una API real despues.
          </p>
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
                  "max-w-[85%] rounded-lg px-4 py-3 text-sm leading-6",
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

        <form onSubmit={handleSubmit} className="flex gap-3 border-t border-zinc-200 p-4">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Escribe una consulta tecnica..."
            className="min-h-11 flex-1 rounded-md border border-zinc-300 px-4 text-sm outline-none focus:border-teal-700"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800"
          >
            <SendHorizontal className="h-4 w-4" aria-hidden />
            Enviar
          </button>
        </form>
      </section>

      <aside className="rounded-lg border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-zinc-950">Consultas sugeridas</h2>
        <div className="mt-4 space-y-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void sendPrompt(prompt)}
              className="w-full rounded-md border border-zinc-200 px-3 py-2 text-left text-sm leading-6 text-zinc-700 hover:border-teal-700 hover:bg-teal-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
