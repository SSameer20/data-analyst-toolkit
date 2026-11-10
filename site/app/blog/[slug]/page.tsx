import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../lib/json-ld";
import { getPost, posts, type Block } from "../../lib/posts";
import { SITE_URL, getSkill } from "../../lib/skills";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title: post.title, description: post.description, publishedTime: post.published },
  };
}

function Render({ block }: { block: Block }) {
  if (block.type === "p") return <p>{block.text}</p>;
  if (block.type === "code") return <pre className="code-block"><code data-lang={block.lang}>{block.code}</code></pre>;
  const items = block.items.map((i) => <li key={i}>{i}</li>);
  return block.type === "ol" ? <ol>{items}</ol> : <ul>{items}</ul>;
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const skills = post.skills.map(getSkill).filter((s) => s !== undefined);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="document-page wrap">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "TechArticle",
            headline: post.title,
            description: post.description,
            datePublished: post.published,
            dateModified: post.published,
            mainEntityOfPage: url,
            url,
            publisher: { "@type": "Organization", name: "Data Analyst Toolkit", url: `${SITE_URL}/` },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ],
      }} />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol><li><Link href="/">Home</Link></li><li><Link href="/blog">Guides</Link></li><li aria-current="page">{post.title}</li></ol>
      </nav>
      <article>
        <header className="document-heading post-heading">
          <h1>{post.title}</h1>
          <p><time dateTime={post.published}>{new Date(post.published + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time></p>
        </header>
        <div className="document-body">
          <section className="quick-answer">
            <h2>{post.question}</h2>
            <p>{post.answer}</p>
          </section>
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <div>{s.blocks.map((b, i) => <Render key={i} block={b} />)}</div>
            </section>
          ))}
          <section>
            <h2>Related skills</h2>
            <div>
              <p>Data Analyst Toolkit includes AI-agent skills that follow this method:</p>
              <div className="skill-links">{skills.map((s) => <Link className="text-link" key={s.slug} href={`/skills/${s.slug}`}>{s.name}</Link>)}</div>
            </div>
          </section>
          <section>
            <h2>More guides</h2>
            <ul>{more.map((p) => <li key={p.slug}><Link className="text-link" href={`/blog/${p.slug}`}>{p.title}</Link></li>)}</ul>
          </section>
        </div>
      </article>
    </main>
  );
}
