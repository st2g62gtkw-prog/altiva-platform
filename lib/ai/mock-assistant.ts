import {
  DEFAULT_MOCK_MODEL,
  assistantConfig
} from "@/lib/ai/assistant-config";
import { modePrompts } from "@/lib/ai/assistant-prompts";
import type {
  AssistantMessage,
  AssistantProvider,
  AssistantRequest,
  AssistantResponse
} from "@/lib/ai/types";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `msg-${Date.now()}`;
}

function buildModeIntro(mode: AssistantResponse["mode"]) {
  const prompt = modePrompts[mode];
  return prompt ? `${prompt}\n\n` : "";
}

function buildMockAnswer(request: AssistantRequest) {
  const prompt = request.prompt.toLowerCase();
  const mode = request.context?.mode || assistantConfig.defaultMode;
  const intro = buildModeIntro(mode);

  if (prompt.includes("rubrica") || prompt.includes("pauta") || prompt.includes("instrucciones")) {
    return `${intro}Para interpretar instrucciones del Proyecto de Titulo, primero separa requisitos obligatorios, formato de entrega, criterios de evaluacion, restricciones, fechas y evidencias exigidas. Si aun no tienes la pauta real, no conviene redactar conclusiones; conviene crear una matriz de requisitos y preguntas pendientes.`;
  }

  if (prompt.includes("faltan") || prompt.includes("listo") || prompt.includes("empezar")) {
    return `${intro}Antes de generar entregables, revisa si ya tienes instrucciones del ramo, rubrica, formato base, EETT, itemizado, planos o bases tecnicas segun aplique. Si falta alguno de esos antecedentes criticos, Altiva debe pedirlo antes de redactar o calcular. Este diagnostico todavia se basa en metadata y categorias, no en lectura del contenido de archivos.`;
  }

  if (prompt.includes("apu") || prompt.includes("presupuesto") || mode === "presupuestos") {
    return `${intro}Para preparar APUs y presupuesto necesitas partidas definidas, unidad de medida, cubicaciones, rendimientos, mano de obra, materiales, equipos, costos indirectos, fuente de precios y supuestos. Sin esos datos, solo se puede armar una estructura de trabajo, no calcular valores confiables.`;
  }

  if (prompt.includes("cronograma") || prompt.includes("ms project")) {
    return `${intro}Para un cronograma en MS Project necesitas WBS, actividades, duraciones, dependencias, calendario, restricciones, recursos si aplica e hitos de entrega. Primero arma la secuencia logica y luego carga actividades en la herramienta.`;
  }

  if (prompt.includes("informe") || mode === "reportes") {
    return `${intro}Estructura no generica sugerida: contexto del Proyecto de Titulo, requisitos de la pauta, objetivo especifico, alcance, fuentes usadas, metodologia, desarrollo de entregables, brechas de informacion, supuestos, riesgos y proximas acciones. Ajustala contra la rubrica antes de redactar.`;
  }

  if (prompt.includes("entregable") || mode === "gestion_proyectos") {
    return `${intro}Ordena los entregables por prioridad, requisito de la rubrica, informacion faltante, fuente asociada y fecha objetivo. Recomiendo empezar por informe inicial, presupuesto, APUs y cronograma, porque condicionan los demas respaldos.`;
  }

  if (prompt.includes("fuente") || prompt.includes("documento") || mode === "documentos") {
    return `${intro}Clasifica fuentes por tipo, estado, uso esperado, entregable relacionado y observaciones. Distingue instrucciones oficiales, rubrica, formatos, apuntes, normativa y bibliografia para evitar mezclar criterios obligatorios con referencias de apoyo.`;
  }

  return `${intro}Puedo ayudarte a ordenar el Proyecto de Titulo: instrucciones, fuentes, entregables, informacion faltante, estructura de informe, APUs, presupuesto y cronograma. Para una respuesta precisa, pega la pauta, la rubrica o el fragmento del entregable que quieres revisar.`;
}

export const mockAssistantProvider: AssistantProvider = {
  id: "mock",
  model: DEFAULT_MOCK_MODEL,
  async sendMessage(request) {
    const mode = request.context?.mode || assistantConfig.defaultMode;
    const message: AssistantMessage = {
      id: createId(),
      role: "assistant",
      content: buildMockAnswer(request),
      createdAt: new Date().toISOString()
    };

    return {
      message,
      mode,
      provider: "mock",
      model: DEFAULT_MOCK_MODEL
    };
  }
};

export async function generateAssistantReply(
  request: AssistantRequest
): Promise<AssistantResponse> {
  return mockAssistantProvider.sendMessage(request);
}
