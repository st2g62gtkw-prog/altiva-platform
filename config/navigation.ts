import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  FileText,
  FolderKanban,
  Home,
  Settings
} from "lucide-react";

export const publicNavigation = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mi", href: "/sobre-mi" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Contacto", href: "/contacto" }
] as const;

export const appNavigation = [
  { label: "Dashboard", href: "/app", icon: Home },
  { label: "Proyectos", href: "/app/proyectos", icon: FolderKanban },
  { label: "Presupuestos", href: "/app/presupuestos", icon: BriefcaseBusiness },
  { label: "Documentos", href: "/app/documentos", icon: FileText },
  { label: "Asistente", href: "/app/asistente", icon: Bot },
  { label: "Reportes", href: "/app/reportes", icon: BarChart3 },
  { label: "Configuracion", href: "/app/configuracion", icon: Settings }
] as const;

export const quickActions = [
  { label: "Nuevo proyecto", href: "/app/proyectos", icon: Building2 },
  { label: "Preparar reporte", href: "/app/reportes", icon: ClipboardList },
  { label: "Analizar presupuesto", href: "/app/asistente", icon: Bot }
] as const;
