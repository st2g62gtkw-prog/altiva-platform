import type { AssistantMessage, AssistantRequest, AssistantResponse } from "@/lib/ai/types";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `msg-${Date.now()}`;
}

function buildMockAnswer(prompt: string) {
  const normalizedPrompt = prompt.toLowerCase();

  if (normalizedPrompt.includes("presupuesto")) {
    return "Revision preliminar: separaria partidas por obra gruesa, terminaciones, instalaciones y gastos generales. Luego compararia cantidades, precios unitarios y exclusiones antes de emitir una observacion formal.";
  }

  if (normalizedPrompt.includes("riesgo")) {
    return "Riesgos iniciales: permisos pendientes, interferencias con instalaciones existentes, atrasos de suministro y cambios de alcance. Recomiendo registrar responsable, probabilidad, impacto y accion preventiva.";
  }

  if (normalizedPrompt.includes("minuta")) {
    return "Estructura sugerida para minuta: asistentes, temas revisados, acuerdos, pendientes, responsables y fecha comprometida. Puedo convertir los puntos de una reunion en ese formato cuando conectemos documentos reales.";
  }

  if (normalizedPrompt.includes("documento")) {
    return "Para documentos pendientes, conviene separar antecedentes tecnicos, planos, permisos, contratos y respaldos fotograficos. Sugiero priorizar los documentos criticos por proyecto, responsable y fecha comprometida.";
  }

  if (normalizedPrompt.includes("reporte")) {
    return "Reporte de avance sugerido: resumen ejecutivo, avance fisico, avance financiero, hitos, bloqueos, riesgos, fotografias y proximas acciones.";
  }

  return "Como asistente tecnico V1, puedo ayudarte a ordenar informacion de proyectos, documentos, presupuestos, reportes y tareas con criterios de gestion de construccion.";
}

export async function generateAssistantReply(
  request: AssistantRequest
): Promise<AssistantResponse> {
  // Future integration point: replace this function body with an OpenAI API call.
  const message: AssistantMessage = {
    id: createId(),
    role: "assistant",
    content: buildMockAnswer(request.prompt),
    createdAt: new Date().toISOString()
  };

  return {
    message,
    model: "mock-construction-assistant"
  };
}
