import type { Metadata } from "next";

import { ChatPanel } from "@/components/chat/chat-panel";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Asistente IA",
  description: "Asistente tecnico V1 para documentos, riesgos, minutas, presupuestos y reportes.",
  path: "/app/asistente",
  noIndex: true
});

export default function AssistantPage() {
  return <ChatPanel />;
}
