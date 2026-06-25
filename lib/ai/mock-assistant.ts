import { assistantConfig, getAssistantRuntimeConfig } from "@/lib/ai/assistant-config";
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

  if (prompt.includes("presupuesto") || mode === "presupuestos") {
    return `${intro}Revision preliminar sugerida: separa partidas por obra gruesa, terminaciones, instalaciones, gastos generales y contingencias. Luego revisa cantidades, precios unitarios, exclusiones, supuestos y responsables antes de emitir observaciones.`;
  }

  if (prompt.includes("riesgo") || prompt.includes("atrasado")) {
    return `${intro}Riesgos iniciales: permisos pendientes, interferencias, atrasos de suministro, cambios de alcance y baja trazabilidad de acuerdos. Recomiendo registrar probabilidad, impacto, responsable, accion preventiva y fecha de revision.`;
  }

  if (prompt.includes("minuta") || mode === "oficina_tecnica") {
    return `${intro}Estructura sugerida de minuta: objetivo, asistentes, temas revisados, acuerdos, pendientes, responsables y fecha comprometida. Si falta informacion, primero conviene levantar antecedentes y restricciones.`;
  }

  if (prompt.includes("documento") || mode === "documentos") {
    return `${intro}Para documentos pendientes, separa antecedentes tecnicos, planos, permisos, contratos y respaldos fotograficos. Prioriza por criticidad, proyecto, responsable y fecha comprometida.`;
  }

  if (prompt.includes("reporte") || mode === "reportes") {
    return `${intro}Reporte de avance sugerido: resumen ejecutivo, avance fisico, avance financiero, hitos, bloqueos, riesgos, fotografias y proximas acciones. Evita conclusiones si faltan mediciones o respaldos.`;
  }

  if (prompt.includes("pmp") || prompt.includes("ito") || mode === "pmp_ito") {
    return `${intro}Pregunta situacional sugerida: durante una inspeccion se detecta una no conformidad que puede afectar plazo y costo. La mejor accion inicial es registrar evidencia, evaluar impacto, comunicar al responsable y definir una accion correctiva trazable.`;
  }

  return `${intro}Puedo ayudarte a ordenar informacion de proyectos, documentos, presupuestos, reportes y tareas con criterios de gestion de construccion. Si necesitas un analisis mas preciso, entrega alcance, etapa, antecedentes disponibles y restricciones conocidas.`;
}

export const mockAssistantProvider: AssistantProvider = {
  id: "mock",
  model: getAssistantRuntimeConfig().model,
  async sendMessage(request) {
    const mode = request.context?.mode || assistantConfig.defaultMode;
    const runtimeConfig = getAssistantRuntimeConfig();
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
      model: runtimeConfig.model
    };
  }
};

export async function generateAssistantReply(
  request: AssistantRequest
): Promise<AssistantResponse> {
  return mockAssistantProvider.sendMessage(request);
}
