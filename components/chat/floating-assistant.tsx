"use client";

import { Bot, SendHorizontal, X } from "lucide-react";
import { FormEvent, useState } from "react";

import {
  thesisAssistantMessages,
  thesisAssistantSuggestedQuestions,
  thesisProjectSummary
} from "@/data/thesis-project-mock";
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

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>(thesisAssistantMessages);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<AssistantMode>("general");
  const [isThinking, setIsThinking] = useState(false);

  async function sendPrompt(prompt: string, selectedMode = mode) {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isThinking) {
      return;
    }

    const userMessage = createMessage("user", trimmedPrompt);
    const nextMessages = [...messages, userMessage];

    setIsOpen(true);
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
            route: "/",
            projectName: thesisProjectSummary.provisionalName
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
          "No fue posible procesar la consulta ahora. Como esta base aun es demo, revisa el texto ingresado y vuelve a intentar sin incluir informacion sensible."
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
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-5">
      {isOpen ? (
        <section className="ml-auto flex max-h-[calc(100vh-2rem)] w-full max-w-[430px] flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl">
          <header className="flex items-start justify-between gap-3 border-b border-zinc-200 bg-zinc-950 p-4 text-white">
            <div>
              <p className="text-sm font-semibold">Altiva Assistant - Proyecto de Título</p>
              <p className="mt-1 text-xs leading-5 text-zinc-300">
                Demo con mock u OpenAI segun entorno. No ingreses datos sensibles.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-zinc-300 hover:bg-white/10 hover:text-white"
              aria-label="Cerrar chat"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </header>

          <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              Preguntas sugeridas
            </p>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {thesisAssistantSuggestedQuestions.slice(0, 4).map((question) => (
                <button
                  key={question.prompt}
                  type="button"
                  onClick={() => void sendPrompt(question.prompt, question.mode)}
                  className="shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-teal-700 hover:text-teal-800"
                >
                  {question.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[86%] whitespace-pre-line rounded-lg px-3 py-2 text-sm leading-6",
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
              <p className="text-sm font-medium text-zinc-500">Preparando respuesta...</p>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-zinc-200 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Pregunta sobre pauta, rubrica o entregables..."
              className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-300 px-3 text-sm outline-none focus:border-teal-700"
            />
            <button
              type="submit"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-teal-700 text-white hover:bg-teal-800"
              aria-label="Enviar consulta"
            >
              <SendHorizontal className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-2xl transition hover:bg-teal-800"
          aria-label="Abrir Altiva Assistant"
        >
          <Bot className="h-6 w-6" aria-hidden />
        </button>
      )}
    </div>
  );
}
