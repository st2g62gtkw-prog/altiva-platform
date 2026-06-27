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
  { label: "Personal", href: "/app/personal", icon: ClipboardList },
  { label: "Notas", href: "/app/personal/notas", icon: FileText },
  { label: "Tareas", href: "/app/personal/tareas", icon: ClipboardList },
  { label: "Estudio", href: "/app/personal/estudio", icon: BarChart3 },
  { label: "Tests", href: "/app/personal/tests", icon: BriefcaseBusiness },
  { label: "Habitos", href: "/app/personal/habitos", icon: Home },
  { label: "Tecnico", href: "/app/technical", icon: Building2 },
  { label: "Proyectos", href: "/app/technical/proyectos", icon: FolderKanban },
  { label: "Documentos", href: "/app/technical/documentos", icon: FileText },
  { label: "Presupuestos", href: "/app/technical/presupuestos", icon: BriefcaseBusiness },
  { label: "Reportes", href: "/app/technical/reportes", icon: BarChart3 },
  { label: "Asistente", href: "/app/asistente", icon: Bot },
  { label: "Configuracion", href: "/app/configuracion", icon: Settings }
] as const;

export const appNavigationGroups = [
  {
    label: "Inicio",
    items: [{ label: "Inicio", href: "/app", icon: Home }]
  },
  {
    label: "Personal",
    items: [
      { label: "Dashboard personal", href: "/app/personal", icon: ClipboardList },
      { label: "Notas", href: "/app/personal/notas", icon: FileText },
      { label: "Tareas", href: "/app/personal/tareas", icon: ClipboardList },
      { label: "Estudio", href: "/app/personal/estudio", icon: BarChart3 },
      { label: "Tests", href: "/app/personal/tests", icon: BriefcaseBusiness },
      { label: "Habitos", href: "/app/personal/habitos", icon: Home }
    ]
  },
  {
    label: "Tecnico",
    items: [
      { label: "Dashboard tecnico", href: "/app/technical", icon: Building2 },
      { label: "Proyectos", href: "/app/technical/proyectos", icon: FolderKanban },
      { label: "Documentos", href: "/app/technical/documentos", icon: FileText },
      { label: "Presupuestos", href: "/app/technical/presupuestos", icon: BriefcaseBusiness },
      { label: "Reportes", href: "/app/technical/reportes", icon: BarChart3 }
    ]
  },
  {
    label: "Asistente",
    items: [{ label: "Altiva Assistant", href: "/app/asistente", icon: Bot }]
  },
  {
    label: "Configuracion",
    items: [{ label: "Configuracion", href: "/app/configuracion", icon: Settings }]
  }
] as const;

export const quickActions = [
  { label: "Espacio personal", href: "/app/personal", icon: ClipboardList },
  { label: "Espacio tecnico", href: "/app/technical", icon: Building2 },
  { label: "Analizar presupuesto", href: "/app/asistente", icon: Bot }
] as const;
