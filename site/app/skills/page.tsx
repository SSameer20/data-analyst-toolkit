import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, REPOSITORY, skills } from "../lib/skills";
import { JsonLd } from "../lib/json-ld";

export const metadata: Metadata = {
  title: "AI Skills for Data Analysis — All Skills",
  description: "Browse six reusable AI-agent skills for data analysts: data quality, data cleaning, feature engineering, SQL, BI reporting, and an end-to-end analysis workflow.",
  alternates: { canonical: "/skills" },
  openGraph: { url: "/skills", title: "AI Skills for Data Analysis | Data Analyst Toolkit" },
};

export default function SkillsPage() {
  return (
    <main className="document-page wrap">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Skills", item: `${SITE_URL}/skills` },
        ],
      }} />
      <nav className="breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">Skills</li></ol></nav>
      <div className="document-heading">
        <h1>AI skills for data analysis</h1>
        <p>Six reusable agent skills. Install all of them as a plugin, or add only the ones you need.</p>
      </div>
      <div className="document-body">
        <ul className="skills-index">
          {skills.map((skill) => (
            <li key={skill.slug}>
              <h2><Link href={`/skills/${skill.slug}`}>{skill.name}</Link></h2>
              <p>{skill.short} {skill.detail}</p>
              <Link className="text-link" href={`/skills/${skill.slug}`}>{`Learn about ${skill.name}`}</Link>
            </li>
          ))}
        </ul>
        <section>
          <h2>Install</h2>
          <p>See the <Link className="text-link" href="/#install">installation steps</Link> for Claude Code and Codex, or browse every skill’s source on <a className="text-link" href={REPOSITORY}>GitHub</a>.</p>
        </section>
      </div>
    </main>
  );
}
