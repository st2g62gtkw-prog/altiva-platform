import type { MetadataRoute } from "next";

import { publicProjects } from "@/data/mock";
import { getAbsoluteUrl } from "@/lib/utils/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/sobre-mi", "/servicios", "/proyectos", "/contacto"];
  const projectRoutes = publicProjects.map((project) => `/proyectos/${project.slug}`);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: getAbsoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}
