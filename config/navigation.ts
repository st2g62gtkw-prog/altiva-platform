import { Bot, FileText, Home } from "lucide-react";

export const publicNavigation = [
  { label: "Proyecto de Titulo", href: "/" }
] as const;

export const appNavigation = [
  { label: "Proyecto de Titulo", href: "/", icon: Home }
] as const;

export const appNavigationGroups = [
  {
    label: "Inicio",
    items: [{ label: "Proyecto de Titulo", href: "/", icon: Home }]
  }
] as const;

export const quickActions = [
  { label: "Ver proyecto", href: "/", icon: FileText },
  { label: "Abrir asistente", href: "/", icon: Bot }
] as const;
