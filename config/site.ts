export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "Altiva",
  legalName: "Altiva",
  description:
    "Plataforma profesional para gestion tecnica de proyectos de construccion civil.",
  contactEmail: "contacto@altiva.cl",
  location: "Chile",
  locale: "es_CL",
  keywords: [
    "constructor civil",
    "gestion de proyectos",
    "presupuestos",
    "documentos tecnicos",
    "reportes de obra",
    "Chile"
  ],
  social: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/"
  }
} as const;
