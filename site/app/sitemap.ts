import type { MetadataRoute } from "next";
import { SITE_URL, skills } from "./lib/skills";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/skills", ...skills.map((s) => `/skills/${s.slug}`), "/about", "/changelog", "/support", "/privacy"];
  return paths.map((path) => ({ url: `${SITE_URL}${path === "/" ? "/" : path}` }));
}
