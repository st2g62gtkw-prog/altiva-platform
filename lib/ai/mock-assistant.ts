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
    return "Para documentos pendientes, conviene separar antecedentes tecnicos, planos, permisos, contratos y respaldos fotograficos. En la version conectada puedo leer Drive y priorizar faltantes por proyecto.";
  }

  if (normalizedPrompt.includes("reporte")) {
    return "Reporte de avance sugerido: resumen ejecutivo, avance fisico, avance financiero, hitos, bloqueos, riesgos, fotografias y proximas acciones. Esta respuesta es simulada y lista para reemplazarse por IA real.";
  }

  return "Como asistente tecnico simulado, puedo ayudarte a ordenar informacion de proyectos, documentos, presupuestos, reportes y tareas. Cuando se conecte la API de IA, esta capa mantendra la misma interfaz.";
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
