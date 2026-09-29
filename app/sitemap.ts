import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { absoluteUrl } from "@/config/site";
import { getPublishedProjects } from "@/data/projects";
import type { SiteRoute } from "@/types";

/**
 * sitemap.xml — uniquement les pages réellement développées (`ready`)
 * et les réalisations réelles (jamais les projets d'illustration).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.values(routes) as SiteRoute[])
    .filter((route) => route.ready)
    .map((route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: route.sitemap?.changeFrequency,
      priority: route.sitemap?.priority,
    }));

  const projectPages = routes.projects.ready
    ? getPublishedProjects().map((project) => ({
        url: absoluteUrl(`${routes.projects.path}/${project.slug}`),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      }))
    : [];

  return [...pages, ...projectPages];
}
