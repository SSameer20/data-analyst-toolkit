import type { MetadataRoute } from "next";
import { SITE_URL, skills } from "./lib/skills";
import { posts } from "./lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/skills", ...skills.map((s) => `/skills/${s.slug}`), "/blog", ...posts.map((p) => `/blog/${p.slug}`), "/about", "/changelog", "/support", "/privacy"];
  return paths.map((path) => ({ url: `${SITE_URL}${path === "/" ? "/" : path}` }));
}
