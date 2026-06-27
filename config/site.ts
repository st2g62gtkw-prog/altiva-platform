export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "Altiva",
  legalName: "Altiva",
  description:
    "Centro de trabajo para organizar archivos, fuentes, entregables y apoyo IA del Proyecto de Título.",
  contactEmail: "contacto@altiva.cl",
  location: "Chile",
  locale: "es_CL",
  keywords: [
    "proyecto de título",
    "archivos del proyecto",
    "fuentes academicas",
    "entregables",
    "asistente IA",
    "Chile"
  ],
  social: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/"
  }
} as const;
