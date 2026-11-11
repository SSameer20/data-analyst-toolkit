import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CopyCode from "../../components/copy-code";
import { JsonLd } from "../../lib/json-ld";
import { REPOSITORY, SITE_URL, getSkill, skills } from "../../lib/skills";

export function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/skills/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};
  const path = `/skills/${skill.slug}`;
  return {
    title: skill.seoTitle,
    description: skill.seoDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: `${skill.seoTitle} | Data Analyst Toolkit`, description: skill.seoDescription },
  };
}

export default async function SkillPage({ params }: PageProps<"/skills/[slug]">) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const source = `${REPOSITORY}/tree/main/skills/${skill.slug}`;
  const related = skill.related.map(getSkill).filter((s) => s !== undefined);

  return (
    <main className="document-page wrap">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Skills", item: `${SITE_URL}/skills` },
          { "@type": "ListItem", position: 3, name: skill.name, item: `${SITE_URL}/skills/${skill.slug}` },
        ],
      }} />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><Link href="/">Home</Link></li><li><Link href="/skills">Skills</Link></li><li aria-current="page">{skill.name}</li></ol>
      </nav>
      <div className="document-heading">
        <h1>{skill.h1}</h1>
        <p>{skill.intro}</p>
      </div>
      <article className="document-body">
        <section>
          <h2>Who it is for</h2>
          <p>{skill.audience}</p>
        </section>
        <section>
          <h2>Problems it helps address</h2>
          <ul>{skill.problems.map((p) => <li key={p}>{p}</li>)}</ul>
        </section>
        <section>
          <h2>Inputs and outputs</h2>
          <p><strong>You provide:</strong> {skill.inputs}</p>
          <p><strong>You get:</strong> {skill.outputs}</p>
        </section>
        <section>
          <h2>Example</h2>
          <p><strong>Prompt:</strong> “{skill.example.prompt}”</p>
          <p><strong>What the skill does:</strong> {skill.example.result}</p>
        </section>
        <section>
          <h2>How to install</h2>
          <p>Add this skill on its own:</p>
          <CopyCode text={`npx skills add SSameer20/data-analyst-toolkit --skill ${skill.slug}`} />
          <p>Or install all six skills as a plugin — see the <Link className="text-link" href="/#install">getting-started steps</Link>.</p>
        </section>
        <section>
          <h2>Limitations</h2>
          <ul>{skill.limitations.map((l) => <li key={l}>{l}</li>)}</ul>
        </section>
        <section>
          <h2>Related skills</h2>
          <div className="skill-links">
            {related.map((r) => <Link className="text-link" key={r.slug} href={`/skills/${r.slug}`}>{r.name}</Link>)}
          </div>
        </section>
        <section>
          <h2>Source</h2>
          <p>Read the full skill instructions, open an issue, or contribute improvements.</p>
          <a className="text-link" href={source}>{`View the ${skill.name} skill on GitHub`}</a>
        </section>
      </article>
    </main>
  );
}
