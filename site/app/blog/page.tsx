import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "../lib/posts";

export const metadata: Metadata = {
  title: "Data Analysis Guides — Data Quality, Cleaning, SQL & BI",
  description: "Practical answers to common data analyst questions: data quality checklists, duplicates, missing values, SQL window functions, target leakage, and BI report checks.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="document-page wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">Guides</li></ol></nav>
      <div className="document-heading">
        <h1>Data analysis guides</h1>
        <p>Short, practical answers to questions analysts ask every day, with SQL, Python, and BI examples.</p>
      </div>
      <div className="document-body">
        <ul className="skills-index">
          {posts.map((post) => (
            <li key={post.slug}>
              <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p>{post.description}</p>
              <Link className="text-link" href={`/blog/${post.slug}`}>{`Read: ${post.question}`}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
