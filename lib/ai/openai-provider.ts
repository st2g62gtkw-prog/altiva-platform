import {
  DEFAULT_OPENAI_MODEL,
  assistantConfig
} from "@/lib/ai/assistant-config";
import { altivaSystemPrompt, modePrompts } from "@/lib/ai/assistant-prompts";
import {
  getAssistantRuntimeConfig,
  getOpenAIModelFromEnvironment
} from "@/lib/ai/runtime-config";
import type {
  AssistantMessage,
  AssistantMode,
  AssistantProvider,
  AssistantRequest
} from "@/lib/ai/types";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

type OpenAIResponseOutput = {
  type?: string;
  content?: Array<{
    type?: string;
    text?: string;
  }>;
};

type OpenAIResponseBody = {
  output_text?: string;
  output?: OpenAIResponseOutput[];
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `msg-${Date.now()}`;
}

function getOpenAIModel() {
  return getOpenAIModelFromEnvironment() || DEFAULT_OPENAI_MODEL;
}

function mapRole(role: AssistantMessage["role"]) {
  return role === "system" ? "system" : role;
}

function buildInput(request: AssistantRequest) {
  const mode = request.context?.mode || assistantConfig.defaultMode;
  const modePrompt = modePrompts[mode];
  const systemContent = [altivaSystemPrompt, modePrompt].filter(Boolean).join("\n\n");
  const recentMessages = [...(request.messages || [])]
    .filter((message, index, messages) => {
      const isLastMessage = index === messages.length - 1;
      return !(isLastMessage && message.role === "user" && message.content === request.prompt);
    })
    .filter((message) => message.role !== "system")
    .slice(-8)
    .map((message) => ({
      role: mapRole(message.role),
      content: message.content
    }));

  return [
    {
      role: "system",
      content: systemContent
    },
    ...recentMessages,
    {
      role: "user",
      content: request.prompt
    }
  ];
}

function extractOutputText(body: OpenAIResponseBody) {
  if (body.output_text?.trim()) {
    return body.output_text.trim();
  }

  return (body.output || [])
    .flatMap((item) => item.content || [])
    .map((content) => content.text || "")
    .join("\n")
    .trim();
}

export function isOpenAIConfigured() {
  return Boolean(getAssistantRuntimeConfig().openaiApiKey);
}

export const openAIAssistantProvider: AssistantProvider = {
  id: "openai",
  model: getOpenAIModel(),
  async sendMessage(request) {
    const runtimeConfig = getAssistantRuntimeConfig();
    const apiKey = runtimeConfig.openaiApiKey;
    const model = getOpenAIModel();
    const mode: AssistantMode = request.context?.mode || assistantConfig.defaultMode;

    if (!apiKey) {
      throw new Error("OpenAI provider is not configured.");
    }

    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: buildInput(request)
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI provider failed with status ${response.status}.`);
    }

    const body = (await response.json()) as OpenAIResponseBody;
    const content = extractOutputText(body);

    if (!content) {
      throw new Error("OpenAI provider returned an empty response.");
    }

    return {
      message: {
        id: createId(),
        role: "assistant",
        content,
        createdAt: new Date().toISOString()
      },
      mode,
      provider: "openai",
      model
    };
  }
};
