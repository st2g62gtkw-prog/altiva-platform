import { BarChart3, ClipboardList, FileText, FolderKanban, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";

import { ServiceCard } from "@/components/public/service-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Servicios",
  description:
    "Servicios potenciales de gestion de proyectos, presupuestos, control documental, reportes y coordinacion tecnica.",
  path: "/servicios"
});

const services = [
  {
    title: "Gestion de proyectos",
    description: "Orden de hitos, responsables, riesgos y trazabilidad de avance.",
    icon: <FolderKanban className="h-5 w-5" aria-hidden />,
    items: ["Plan de trabajo", "Seguimiento semanal", "Matriz de riesgos"]
  },
  {
    title: "Presupuestos",
    description: "Preparacion y revision de partidas para decisiones tecnicas y comerciales.",
    icon: <BarChart3 className="h-5 w-5" aria-hidden />,
    items: ["Cubicaciones", "Comparativos", "Control de desviaciones"]
  },
  {
    title: "Documentos tecnicos",
    description: "Clasificacion de planos, permisos, informes, contratos y respaldos.",
    icon: <FileText className="h-5 w-5" aria-hidden />,
    items: ["Inventario documental", "Versionamiento", "Revision de pendientes"]
  },
  {
    title: "Reportabilidad",
    description: "Reportes de avance fisico, financiero y de riesgos para mandantes.",
    icon: <ClipboardList className="h-5 w-5" aria-hidden />,
    items: ["Resumen ejecutivo", "Indicadores", "Proximas acciones"]
  },
  {
    title: "Coordinacion",
    description: "Apoyo para ordenar acuerdos, minutas y seguimiento de especialidades.",
    icon: <Users className="h-5 w-5" aria-hidden />,
    items: ["Minutas", "Acuerdos", "Responsables"]
  },
  {
    title: "Preparacion digital",
    description: "Base para integrar informacion con sistemas reales sin improvisar.",
    icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
    items: ["Supabase", "Drive", "Notion e IA"]
  }
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Servicios"
        title="Servicios potenciales para operacion tecnica"
        description="La plataforma esta preparada para que estos servicios pasen desde contenido publico a gestion real con datos, permisos e integraciones."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}
