import type { Metadata } from "next";

import { ApuGeneratorWorkspace } from "@/components/apus/apu-generator-workspace";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Generar APUs con Itemizado",
  description:
    "Herramienta V1 para generar APUs base desde un itemizado y un formato Excel, sin IA ni precios.",
  path: "/apus"
});

export default function ApusPage() {
  return <ApuGeneratorWorkspace />;
}
